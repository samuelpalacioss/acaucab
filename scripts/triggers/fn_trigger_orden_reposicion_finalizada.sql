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