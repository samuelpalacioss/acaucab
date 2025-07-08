/**
 * Crea un nuevo pago en el sistema para un cliente
 * @param p_monto DECIMAL - Monto del pago
 * @param p_fecha_pago TIMESTAMP - Fecha y hora del pago
 * @param p_fk_tasa INTEGER - ID de la tasa de cambio aplicada
 * @param p_fk_venta INTEGER - ID de la venta asociada
 * @param p_fk_cliente_metodo_pago_1 INTEGER - ID del método de pago del cliente
 */
CREATE OR REPLACE FUNCTION fn_registrar_pago_venta_evento(
    p_monto DECIMAL,
    p_fecha_pago TIMESTAMP,
    p_fk_tasa INTEGER,
    p_fk_venta INTEGER,
    p_fk_cliente_metodo_pago_1 INTEGER
)
RETURNS VOID AS $$
BEGIN
    /**
     * Inserta un nuevo registro de pago de cliente en la tabla 'pago'.
     * Los valores se toman directamente de los parámetros de la función.
     * Los campos no relevantes para un pago de cliente (ej. mensualidad) se omiten.
     */
    INSERT INTO pago (
        monto,
        fecha_pago,
        fk_tasa,
        fk_venta_evento,
        fk_cliente_metodo_pago_1
    )
    VALUES (
        p_monto,
        p_fecha_pago,
        p_fk_tasa,
        p_fk_venta,
        p_fk_cliente_metodo_pago_1
    );
END;
$$ LANGUAGE plpgsql;