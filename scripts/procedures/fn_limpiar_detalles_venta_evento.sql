CREATE OR REPLACE FUNCTION fn_limpiar_detalles_venta_evento(p_venta_id INTEGER)
RETURNS VOID AS $$
BEGIN
    DELETE FROM detalle_evento WHERE fk_venta_evento = p_venta_id;
END;
$$ LANGUAGE plpgsql; 