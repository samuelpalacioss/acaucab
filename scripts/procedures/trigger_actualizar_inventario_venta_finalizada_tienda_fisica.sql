DROP TRIGGER IF EXISTS trigger_actualizar_inventario_venta_finalizada_tienda_fisica ON status_venta;
DROP FUNCTION IF EXISTS fn_actualizar_inventario_venta_finalizada_tienda_fisica();

-- Función que se ejecutará con el trigger.
CREATE OR REPLACE FUNCTION fn_actualizar_inventario_venta_finalizada_tienda_fisica()
RETURNS TRIGGER AS $$
DECLARE
    v_status_nombre VARCHAR(50);
    v_tienda_id INTEGER;
    detalle RECORD;
BEGIN
    -- Obtener el nombre del status de la venta actual
    SELECT nombre INTO v_status_nombre
    FROM status
    WHERE id = NEW.fk_status;

  
    IF v_status_nombre = 'Finalizada' THEN
        -- Obtener el ID de la tienda física de la venta
        SELECT fk_tienda_fisica INTO v_tienda_id
        FROM venta 
        WHERE id = NEW.fk_venta;
        
        IF v_tienda_id IS NULL THEN
            RAISE NOTICE 'No se encontró una tienda física para la venta ID: %', NEW.fk_venta;
            RETURN NULL;
        END IF;

        -- Loop en el detalle de la venta para actualizar el inventario de la tienda física
        FOR detalle IN
            SELECT dp.fk_presentacion, dp.fk_cerveza, dp.cantidad
            FROM detalle_presentacion dp
            WHERE dp.fk_venta = NEW.fk_venta
        LOOP
            -- Actualizar la cantidad en lugar_tienda_inventario (ya que estamos en tienda fisica)
            -- solo para lugares de tipo 'anaquel'
            UPDATE lugar_tienda_inventario lti
            SET cantidad = lti.cantidad - detalle.cantidad
            WHERE 
                lti.fk_inventario_1 = detalle.fk_presentacion
                AND lti.fk_inventario_2 = detalle.fk_cerveza
                AND lti.fk_tienda_fisica = v_tienda_id
                AND EXISTS (
                    SELECT *
                    FROM lugar_tienda lt 
                    WHERE lt.id = lti.fk_lugar_tienda_1 
                      AND lt.fk_tienda_fisica = lti.fk_lugar_tienda_2
                      AND lt.tipo = 'anaquel'
                    LIMIT 1
                );
        END LOOP;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger que se ejecuta después de insertar un registro en la tabla 'status_venta'.
CREATE TRIGGER trigger_actualizar_inventario_venta_finalizada_tienda_fisica
AFTER INSERT ON status_venta
FOR EACH ROW
EXECUTE FUNCTION fn_actualizar_inventario_venta_finalizada_tienda_fisica();