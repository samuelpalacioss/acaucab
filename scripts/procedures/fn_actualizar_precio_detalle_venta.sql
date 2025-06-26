DROP FUNCTION IF EXISTS fn_actualizar_precio_detalle_venta(INTEGER, INTEGER, DECIMAL);

CREATE OR REPLACE FUNCTION fn_actualizar_precio_detalle_venta(
    p_fk_venta INTEGER,
    p_fk_presentacion INTEGER,
    p_precio_unitario DECIMAL
)
RETURNS VOID AS $$
BEGIN
    /**
     * Actualiza el precio unitario de un registro específico en 'detalle_presentacion'.
     * Esta función se llama cuando se finaliza una venta para establecer los precios finales,
     * lo que a su vez, activará el trigger para recalcular el monto total de la venta.
     */
    UPDATE detalle_presentacion
    SET precio_unitario = p_precio_unitario
    WHERE fk_venta = p_fk_venta AND fk_presentacion = p_fk_presentacion;
END;
$$ LANGUAGE plpgsql; 