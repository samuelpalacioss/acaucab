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
                SELECT SUM(dp.cantidad * pc.unidades)
                INTO v_cantidad_productos
                FROM detalle_presentacion dp
                LEFT JOIN presentacion pc ON pc.id = dp.fk_presentacion
                WHERE dp.fk_venta = NEW.fk_venta;

                -- Si hay productos en la venta, otorgar los puntos
                IF v_cantidad_productos > 0 THEN
                    -- Bucle para insertar un punto por cada producto
                    FOR i IN 1..v_cantidad_productos LOOP
                        
                        -- Insertar el nuevo 'punto' como un método de pago
                        INSERT INTO metodo_pago(tipo, denominación, tipo_tarjeta, número, banco, fecha_vencimiento, numero_cheque, numero_cuenta, fecha_adquisicion, fecha_canjeo) 
                        VALUES ('punto', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NULL)
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
