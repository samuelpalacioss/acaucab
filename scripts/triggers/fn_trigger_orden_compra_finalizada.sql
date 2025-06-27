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
