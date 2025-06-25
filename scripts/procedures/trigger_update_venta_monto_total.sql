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
      Actualizar la venta con el nuevo monto total.
    */
    UPDATE venta
    SET monto_total = (
        SELECT COALESCE(SUM(cantidad * precio_unitario), 0)
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