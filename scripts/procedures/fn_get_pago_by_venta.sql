/**
 * Obtiene todos los pagos asociados a una venta específica.
 *
 * @param p_venta_id - El ID de la venta a consultar.
 * @returns TABLE - Una tabla con los detalles de cada pago asociado a la venta.
 */
CREATE OR REPLACE FUNCTION fn_get_pagos_by_venta(p_venta_id INTEGER)
RETURNS TABLE (
    monto DECIMAL,
    fecha_pago TIMESTAMP,
    metodo_pago VARCHAR,
    referencia VARCHAR,
    tasa_bcv DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.monto,
        p.fecha_pago,
        (mp.tipo || COALESCE(' ' || mp.tipo_tarjeta, ''))::VARCHAR as metodo_pago,
        CASE
            WHEN mp.número IS NOT NULL THEN '**** ' || SUBSTRING(mp.número::TEXT, LENGTH(mp.número::TEXT) - 3)
            ELSE 'N/A'
        END::VARCHAR as referencia,
        t.monto_equivalencia as tasa_bcv
    FROM pago p
    LEFT JOIN cliente_metodo_pago cmp ON p.fk_cliente_metodo_pago_1 = cmp.id
    LEFT JOIN metodo_pago mp ON cmp.fk_metodo_pago = mp.id
    LEFT JOIN tasa t ON p.fk_tasa = t.id
    WHERE p.fk_venta = p_venta_id;
END;
$$; 