DROP FUNCTION IF EXISTS fn_limpiar_detalles_venta(INTEGER);

CREATE OR REPLACE FUNCTION fn_limpiar_detalles_venta(p_venta_id INTEGER)
RETURNS VOID AS $$
BEGIN
    DELETE FROM detalle_presentacion WHERE fk_venta = p_venta_id;
END;
$$ LANGUAGE plpgsql; 