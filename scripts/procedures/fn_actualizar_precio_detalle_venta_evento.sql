CREATE OR REPLACE FUNCTION fn_actualizar_precio_detalle_venta_evento(
        p_fk_venta_evento integer,
        p_fk_presentacion integer,
        p_fk_cerveza integer,
        p_precio_unitario numeric,
        p_proveedor_id1 integer,
        p_proveedor_id2 bpchar,
        p_evento_id integer
)
RETURNS VOID AS $$
BEGIN
    /**
     * Actualiza el precio unitario de un registro específico en 'detalle_presentacion'.
     * Esta función se llama cuando se finaliza una venta para establecer los precios finales,
     * lo que a su vez, activará el trigger para recalcular el monto total de la venta.
     */
    UPDATE detalle_evento
    SET precio_unitario = p_precio_unitario
    WHERE fk_venta_evento = p_fk_venta_evento AND fk_stock_miembro_1=p_proveedor_id1 and fk_stock_miembro_2=p_proveedor_id2 and fk_stock_miembro_3=p_evento_id and fk_stock_miembro_4= p_fk_presentacion and fk_stock_miembro_5=p_fk_cerveza;
END;
$$ LANGUAGE plpgsql; 