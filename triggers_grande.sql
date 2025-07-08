DROP FUNCTION IF EXISTS fn_actualizar_inventario_por_compra() CASCADE;
DROP TRIGGER IF EXISTS trg_compra_finalizada ON status_orden;

CREATE OR REPLACE FUNCTION fn_actualizar_inventario_por_compra()
RETURNS TRIGGER AS $$
DECLARE
    v_id_status_finalizado INTEGER;
    v_detalle INTEGER;
    v_fk_presentacion_cerveza_1 INTEGER;
    v_fk_presentacion_cerveza_2 INTEGER;

BEGIN
    SELECT id INTO v_id_status_finalizado FROM fn_get_status_by_nombre('finalizado');

    IF NEW.fk_status = v_id_status_finalizado AND (TG_OP = 'INSERT' OR NEW.fk_status IS DISTINCT FROM OLD.fk_status) THEN

        IF NEW.fk_orden_de_compra IS NULL THEN
            RAISE WARNING 'El registro de status_orden con id % no tiene una orden de compra asociada.', NEW.id;
            RETURN NEW;
        END IF;

        SELECT oc.unidades, oc.fk_presentacion_cerveza_1, oc.fk_presentacion_cerveza_2
        INTO v_detalle, v_fk_presentacion_cerveza_1, v_fk_presentacion_cerveza_2
        FROM orden_de_compra oc
        WHERE oc.id = NEW.fk_orden_de_compra;
        
            UPDATE inventario
            SET cantidad_almacen = cantidad_almacen + v_detalle
            WHERE
                fk_presentacion_cerveza_1 = v_fk_presentacion_cerveza_1 AND
                fk_presentacion_cerveza_2 = v_fk_presentacion_cerveza_2;

            IF NOT FOUND THEN
                INSERT INTO inventario (fk_presentacion_cerveza_1, fk_presentacion_cerveza_2, cantidad_almacen)
                VALUES (v_fk_presentacion_cerveza_1, v_fk_presentacion_cerveza_2, v_detalle);
            END IF;

    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_compra_finalizada
AFTER INSERT OR UPDATE ON status_orden
FOR EACH ROW
EXECUTE FUNCTION fn_actualizar_inventario_por_compra();


DROP FUNCTION IF EXISTS fn_actualizar_inventario_por_reposicion() CASCADE;
DROP TRIGGER IF EXISTS trg_reposicion_finalizada ON status_orden;

CREATE OR REPLACE FUNCTION fn_actualizar_inventario_por_reposicion()
RETURNS TRIGGER AS $$
DECLARE
    v_id_status_finalizado INTEGER;
    v_orden_reposicion RECORD;
BEGIN
    SELECT id INTO v_id_status_finalizado FROM fn_get_status_by_nombre('finalizado');

    IF NEW.fk_status = v_id_status_finalizado AND (TG_OP = 'INSERT' OR NEW.fk_status IS DISTINCT FROM OLD.fk_status) THEN

        IF NEW.fk_orden_de_reposicion IS NULL THEN
            RAISE WARNING 'El registro de status_orden con id % no tiene una orden de reposición asociada.', NEW.id;
            RETURN NEW;
        END IF;

        SELECT * INTO v_orden_reposicion
        FROM orden_de_reposicion
        WHERE id = NEW.fk_orden_de_reposicion;
        
        IF NOT FOUND THEN
            RAISE WARNING 'No se encontró la orden de reposición con id %.', NEW.fk_orden_de_reposicion;
            RETURN NEW;
        END IF;

        UPDATE lugar_tienda_inventario
        SET cantidad = COALESCE(cantidad, 0) + v_orden_reposicion.unidades
        WHERE 
            fk_lugar_tienda_1 = v_orden_reposicion.fk_lugar_tienda_1 AND
            fk_lugar_tienda_2 = v_orden_reposicion.fk_lugar_tienda_2 AND
            fk_inventario_1 = v_orden_reposicion.fk_inventario_1 AND
            fk_inventario_2 = v_orden_reposicion.fk_inventario_2 AND
            fk_inventario_3 = v_orden_reposicion.fk_inventario_3;
            
        IF NOT FOUND THEN
            RAISE WARNING 'No se encontró el registro de inventario para actualizar para la orden de reposición %.', NEW.fk_orden_de_reposicion;
        END IF;

        /**
         * Actualizamos el inventario principal (almacén), restando las unidades
         * que se movieron a la tienda.
         */
        UPDATE inventario
        SET cantidad_almacen = cantidad_almacen - v_orden_reposicion.unidades
        WHERE
            fk_presentacion_cerveza_1 = v_orden_reposicion.fk_inventario_1 AND
            fk_presentacion_cerveza_2 = v_orden_reposicion.fk_inventario_2 AND
            fk_almacen = v_orden_reposicion.fk_inventario_3;
        
        IF NOT FOUND THEN
            RAISE WARNING 'No se encontró el registro de inventario en el almacén para la orden de reposición %.', NEW.fk_orden_de_reposicion;
        END IF;

    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_reposicion_finalizada
AFTER INSERT OR UPDATE ON status_orden
FOR EACH ROW
EXECUTE FUNCTION fn_actualizar_inventario_por_reposicion();


CREATE OR REPLACE FUNCTION fn_check_lugar_tienda_tipo() RETURNS TRIGGER AS $$
DECLARE
    v_lugar_tipo VARCHAR(25);
BEGIN
    /**
     * Esta función de trigger se activa antes de un INSERT o UPDATE
     * en la tabla lugar_tienda_inventario. Su propósito es asegurar que solo
     * se puedan asignar cantidades de inventario a lugares de tipo 'anaquel'.
     */

    -- Obtener el tipo del lugar_tienda que se está referenciando
    SELECT tipo INTO v_lugar_tipo
    FROM lugar_tienda
    WHERE id = NEW.fk_lugar_tienda_1 AND fk_tienda_fisica = NEW.fk_lugar_tienda_2;

    -- Si el tipo no es 'anaquel', se lanza una excepción.
    IF v_lugar_tipo != 'anaquel' THEN
        RAISE EXCEPTION 'No se puede asignar inventario directamente a un lugar de tipo "%". Solo se permite en "anaquel".', v_lugar_tipo;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
CREATE TRIGGER trg_check_lugar_tienda_tipo
BEFORE INSERT OR UPDATE ON lugar_tienda_inventario
FOR EACH ROW EXECUTE FUNCTION fn_check_lugar_tienda_tipo();

create or replace function update_stock_tienda()
returns trigger
as $$
DECLARE
    v_cantidad_restante INT := new.cantidad;
    r_inventario RECORD;
    id_tienda_fisica int;
BEGIN
    select fk_tienda_fisica
    into id_tienda_fisica
    from venta
    where new.fk_venta=id;
    if id_tienda_fisica is not null then
      FOR r_inventario IN
          SELECT lti.cantidad as cant_inv, lti.fk_lugar_tienda_1 zona, lti.fk_inventario_3 id_almacen
          FROM lugar_tienda_inventario lti, presentacion_cerveza pc
          WHERE new.fk_presentacion=lti.fk_inventario_1 and new.fk_presentacion=pc.fk_presentacion and new.fk_cerveza=lti.fk_inventario_2 and new.fk_cerveza=pc.fk_cerveza and fk_lugar_tienda_2 = id_tienda_fisica
          FOR UPDATE -- Bloquea las filas seleccionadas
      LOOP
          IF v_cantidad_restante <= 0 THEN
              EXIT; -- Salir del bucle si ya no hay más cantidad por restar
          END IF;

          IF r_inventario.cant_inv >= v_cantidad_restante THEN
              UPDATE lugar_tienda_inventario lti
              SET cantidad = cantidad - v_cantidad_restante
              WHERE new.fk_presentacion=lti.fk_inventario_1 and new.fk_cerveza=lti.fk_inventario_2 and fk_lugar_tienda_2 = id_tienda_fisica and
              lti.fk_lugar_tienda_1= r_inventario.zona and lti.fk_inventario_3=r_inventario.id_almacen;
              
              v_cantidad_restante := 0; 
          ELSE
              v_cantidad_restante := v_cantidad_restante - r_inventario.cant_inv;
              
              UPDATE lugar_tienda_inventario lti
              SET cantidad = 0
              WHERE new.fk_presentacion=lti.fk_inventario_1 and new.fk_cerveza=lti.fk_inventario_2 and fk_lugar_tienda_2 = id_tienda_fisica and
              lti.fk_lugar_tienda_1= r_inventario.zona and lti.fk_inventario_3=r_inventario.id_almacen;
          END IF;
      END LOOP;
    end if;
    RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER stock_en_tienda
AFTER UPDATE ON detalle_presentacion
FOR EACH ROW
WHEN (OLD.precio_unitario is null AND NEW.precio_unitario is not null)
EXECUTE FUNCTION update_stock_tienda();

DROP TRIGGER IF EXISTS trigger_bajo_stock_compra ON inventario;
DROP FUNCTION IF EXISTS generar_orden_compra_automatica;

CREATE OR REPLACE FUNCTION generar_orden_compra_automatica()
RETURNS TRIGGER AS $$
DECLARE
    v_nueva_orden_id INTEGER;
    v_status_pendiente_id INTEGER;
    v_proveedor_id INTEGER;
    v_proveedor_rif_nat CHAR(1);
BEGIN
    -- This trigger only activates if the quantity drops below 100 and was previously >= 100
    IF NEW.cantidad_almacen < 100 AND OLD.cantidad_almacen >= 100 THEN

        -- Ensure that the 'Pendiente' status exists
        SELECT id INTO v_status_pendiente_id FROM status WHERE nombre = 'Pendiente' LIMIT 1;

        IF v_status_pendiente_id IS NULL THEN
            INSERT INTO status (nombre) VALUES ('Pendiente') RETURNING id INTO v_status_pendiente_id;
        END IF;

        -- Find the provider (miembro) for the specific beer presentation
        -- by looking into the `miembro_presentacion_cerveza` table.
        SELECT fk_miembro_1, fk_miembro_2
        INTO v_proveedor_id, v_proveedor_rif_nat
        FROM miembro_presentacion_cerveza
        WHERE fk_presentacion_cerveza_1 = NEW.fk_presentacion_cerveza_1
          AND fk_presentacion_cerveza_2 = NEW.fk_presentacion_cerveza_2
        LIMIT 1; -- Assuming one presentation has one main provider.

        -- If no provider is found, we cannot create the purchase order.
        IF v_proveedor_id IS NULL THEN
            RAISE NOTICE 'No provider found for presentation %-% for automatic purchase order generation.', NEW.fk_presentacion_cerveza_1, NEW.fk_presentacion_cerveza_2;
            RETURN NEW;
        END IF;

        -- Create the purchase order
        INSERT INTO orden_de_compra (
            fecha_solicitud,
            observacion,
            unidades,
            fk_presentacion_cerveza_1,
            fk_presentacion_cerveza_2,
            fk_miembro_1,
            fk_miembro_2,
            fk_usuario
        )
        VALUES (
            NOW(),
            'Orden de compra automática por bajo stock.',
            10000, -- Default quantity to order, can be adjusted
            NEW.fk_presentacion_cerveza_1,
            NEW.fk_presentacion_cerveza_2,
            v_proveedor_id,
            v_proveedor_rif_nat,
            NULL -- Default user ID for automatic purchase order
        )
        RETURNING id INTO v_nueva_orden_id;

        -- Create the initial status for the new purchase order
        IF v_nueva_orden_id IS NOT NULL THEN
            INSERT INTO status_orden (
                fecha_actualización,
                fk_status,
                fk_orden_de_compra
            )
            VALUES (
                NOW(),
                v_status_pendiente_id,
                v_nueva_orden_id
            );
        END IF;

    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger creation that executes after each update on the inventario table
CREATE TRIGGER trigger_bajo_stock_compra
AFTER UPDATE ON inventario
FOR EACH ROW
EXECUTE FUNCTION generar_orden_compra_automatica(); 

-- Asegúrate de que no haya un trigger o función con el mismo nombre
DROP TRIGGER IF EXISTS trigger_add_punto ON status_venta;
DROP FUNCTION IF EXISTS fn_trigger_add_punto();

CREATE OR REPLACE FUNCTION fn_trigger_add_punto()
RETURNS TRIGGER AS $$
DECLARE
    v_status_nombre VARCHAR;
    v_cantidad_productos INTEGER;
    v_id_metodo_pago INTEGER;
    v_fk_cliente_natural INTEGER;
    v_fk_cliente_juridico INTEGER;
BEGIN
    -- Solo actuar en inserciones o actualizaciones, no en eliminaciones
    IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
        
        -- Obtener el nombre del estado para verificar si es 'Completado'
        SELECT s.nombre
        INTO v_status_nombre
        FROM status s
        WHERE s.id = NEW.fk_status;

        -- Proceder solo si el estado es 'Completado'
        IF v_status_nombre = 'Completado' THEN

            -- Obtener los IDs de cliente (natural o jurídico) de la venta asociada
            -- y asegurarse de que la venta sea en una tienda física.
            SELECT
                v.fk_cliente_natural,
                v.fk_cliente_juridico
            INTO
                v_fk_cliente_natural,
                v_fk_cliente_juridico
            FROM venta v
            WHERE v.id = NEW.fk_venta AND v.fk_tienda_fisica IS NOT NULL;

            -- Si se encontró una venta en tienda física (y por tanto un cliente)
            IF FOUND THEN
                
                -- Calcular la cantidad total de productos en la venta, multiplicando la cantidad por las unidades de cada presentación.
                SELECT COALESCE(SUM(dp.cantidad * pc.unidades), 0)
                INTO v_cantidad_productos
                FROM detalle_presentacion dp
                JOIN presentacion pc ON pc.id = dp.fk_presentacion
                WHERE dp.fk_venta = NEW.fk_venta;

                -- Si hay productos en la venta, otorgar los puntos
                IF v_cantidad_productos > 0 THEN
                    -- Bucle para insertar un punto por cada producto
                    FOR i IN 1..v_cantidad_productos LOOP
                        
                        -- Insertar el nuevo 'punto' como un método de pago
                        INSERT INTO metodo_pago(tipo, denominación, tipo_tarjeta, número, banco, fecha_vencimiento, numero_cheque, fecha_adquisicion, fecha_canjeo) 
                        VALUES ('punto', NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NULL)
                        RETURNING id INTO v_id_metodo_pago;

                        -- Asociar el punto recién creado con el cliente
                        INSERT INTO cliente_metodo_pago(fk_metodo_pago, fk_cliente_natural, fk_cliente_juridico)
                        VALUES (v_id_metodo_pago, v_fk_cliente_natural, v_fk_cliente_juridico);
                        
                    END LOOP;
                END IF;
            END IF;
        END IF;
    END IF;

    RETURN NEW;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Ocurrió un error en el trigger trigger_add_punto: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_add_punto
AFTER INSERT OR UPDATE ON status_venta
FOR EACH ROW
EXECUTE FUNCTION fn_trigger_add_punto();

DROP TRIGGER IF EXISTS trigger_gestion_punto ON pago;
DROP FUNCTION IF EXISTS fn_trigger_delete_punto;


CREATE OR REPLACE FUNCTION fn_trigger_delete_punto()
RETURNS TRIGGER AS $$
DECLARE
    id_metodo_pago INTEGER;
BEGIN

    IF NEW.fk_cliente_metodo_pago_1 IS NULL THEN
        RETURN NEW;
    END IF;

    SELECT cmp.fk_metodo_pago INTO id_metodo_pago
    FROM cliente_metodo_pago cmp
    INNER JOIN metodo_pago mp ON cmp.fk_metodo_pago = mp.id
    WHERE cmp.id = NEW.fk_cliente_metodo_pago_1 AND mp.tipo = 'punto';

    IF FOUND THEN
        UPDATE metodo_pago
        SET fecha_canjeo = now()::date
        WHERE id = id_metodo_pago;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_gestion_punto
AFTER INSERT ON pago
FOR EACH ROW
EXECUTE FUNCTION fn_trigger_delete_punto(); 

DROP TRIGGER IF EXISTS trigger_bajo_stock_reposicion ON lugar_tienda_inventario;
DROP FUNCTION IF EXISTS generar_orden_reposicion_automatica;

CREATE OR REPLACE FUNCTION generar_orden_reposicion_automatica()
RETURNS TRIGGER AS $$
DECLARE
    nueva_orden_id INTEGER;
    status_solicitada_id INTEGER;
BEGIN
    -- Solo se activa si la cantidad baja de 20 y antes era mayor o igual a 20
    IF NEW.cantidad < 20 AND OLD.cantidad >= 20 THEN

        -- Asegurarse de que el estado 'Pendiente' exista
        SELECT id INTO status_solicitada_id FROM status WHERE nombre = 'Pendiente' LIMIT 1;

        IF status_solicitada_id IS NULL THEN
            INSERT INTO status (nombre) VALUES ('Pendiente') RETURNING id INTO status_solicitada_id;
        END IF;

        -- Crear la orden de reposición
        INSERT INTO orden_de_reposicion (
            fecha_orden,
            observacion,
            unidades,
            fk_lugar_tienda_1,
            fk_lugar_tienda_2,
            fk_inventario_1,
            fk_inventario_2,
            fk_inventario_3,
            fk_usuario
        )
        VALUES (
            NOW(),
            'Reposición automática por bajo stock.',
            NULL, -- Cantidad de unidades a reponer por defecto
            NEW.fk_lugar_tienda_1,
            NEW.fk_lugar_tienda_2,
            NEW.fk_inventario_1,
            NEW.fk_inventario_2,
            NEW.fk_inventario_3,
            NULL -- ID de usuario por defecto para la reposición automática
        )
        RETURNING id INTO nueva_orden_id;

        -- Crear el estado inicial para la nueva orden de reposición
        IF nueva_orden_id IS NOT NULL THEN
            INSERT INTO status_orden (
                fecha_actualización,
                fk_status,
                fk_orden_de_reposicion
            )
            VALUES (
                NOW(),
                status_solicitada_id,
                nueva_orden_id
            );
        END IF;

    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Creación del trigger que se ejecuta después de cada actualización en la tabla lugar_tienda_inventario
CREATE TRIGGER trigger_bajo_stock_reposicion
AFTER UPDATE ON lugar_tienda_inventario
FOR EACH ROW
EXECUTE FUNCTION generar_orden_reposicion_automatica();

-- Primero, eliminamos el trigger existente para poder modificar la función.
DROP TRIGGER IF EXISTS trigger_actualizar_monto_venta ON detalle_presentacion;

-- Luego, eliminamos la función que utiliza el trigger.
DROP FUNCTION IF EXISTS fn_actualizar_monto_total_venta();

-- Ahora, creamos la función actualizada.
CREATE OR REPLACE FUNCTION fn_actualizar_monto_total_venta()
RETURNS TRIGGER AS $$
DECLARE
    v_venta_id INTEGER;
BEGIN
    /*
     Determina el ID de la venta a actualizar.
    */
    IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
        v_venta_id := NEW.fk_venta;
    END IF;

    /*
      Actualizar la venta con el nuevo monto total, incluyendo el 16% de IVA.
    */
    UPDATE venta
    SET monto_total = (
        SELECT COALESCE(SUM(cantidad * precio_unitario), 0) * 1.16
        FROM detalle_presentacion
        WHERE fk_venta = v_venta_id
    )
    WHERE id = v_venta_id;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger cuando se inserta o actualiza un detalle de presentación.
CREATE TRIGGER trigger_actualizar_monto_venta
AFTER INSERT OR UPDATE ON detalle_presentacion
FOR EACH ROW
EXECUTE FUNCTION fn_actualizar_monto_total_venta(); 

-- Primero, eliminamos el trigger existente para poder modificar la función.
DROP TRIGGER IF EXISTS trigger_actualizar_monto_venta_evento ON detalle_evento;

-- Luego, eliminamos la función que utiliza el trigger.
DROP FUNCTION IF EXISTS fn_actualizar_monto_total_venta_evento();

-- Ahora, creamos la función actualizada.
CREATE OR REPLACE FUNCTION fn_actualizar_monto_total_venta_evento()
RETURNS TRIGGER AS $$
DECLARE
    v_venta_id INTEGER;
    v_subtotal DECIMAL;
BEGIN
    /*
     Determina el ID de la venta a actualizar.
    */
    IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
        v_venta_id := NEW.fk_venta_evento;
    END IF;

    /*
      Calcula el subtotal de todos los items en la venta.
    */
    SELECT COALESCE(SUM(cantidad * precio_unitario), 0)
    INTO v_subtotal
    FROM detalle_evento
    WHERE fk_venta_evento = v_venta_id;
    
    /*
      Actualizar la venta con el nuevo monto total,
      incluyendo el 16% de IVA sobre el subtotal.
    */
    UPDATE venta_evento
    SET monto_total = (v_subtotal * 1.16)
    WHERE id = v_venta_id;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger cuando se inserta o actualiza un detalle de presentación.
CREATE TRIGGER trigger_actualizar_monto_venta_evento
AFTER INSERT OR UPDATE ON detalle_evento
FOR EACH ROW
EXECUTE FUNCTION fn_actualizar_monto_total_venta_evento(); 

create or replace function update_stock_evento()
returns trigger
as $$
DECLARE
    v_cantidad_restante INT := new.cantidad;
BEGIN
    update stock_miembro set cantidad = cantidad - v_cantidad_restante 
    where fk_miembro_1=new.fk_stock_miembro_1 and fk_miembro_2=new.fk_stock_miembro_2 and fk_evento=new.fk_stock_miembro_3 and fk_presentacion_cerveza_1=new.fk_stock_miembro_4 and fk_presentacion_cerveza_2=new.fk_stock_miembro_5;
    RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER stock_en_evento
AFTER UPDATE ON detalle_evento
FOR EACH ROW
WHEN (OLD.precio_unitario is null AND NEW.precio_unitario is not null)
EXECUTE FUNCTION update_stock_evento();