CREATE OR REPLACE FUNCTION fn_volumen_ventas(p_fecha_inicio DATE, p_fecha_fin DATE)
RETURNS BIGINT AS $$
DECLARE
    v_total_unidades_vendidas BIGINT;
BEGIN
    /**
     * Tarea: Volumen de Unidades Vendidas
     * Muestra la cantidad total de cervezas (botellas, latas, etc.) vendidas en un período.
     */
    SELECT
        COALESCE(SUM(dp.cantidad * pres.unidades), 0)::BIGINT
    INTO v_total_unidades_vendidas
    FROM detalle_presentacion dp
    JOIN presentacion pres ON dp.fk_presentacion = pres.id
    JOIN venta v ON dp.fk_venta = v.id
    JOIN pago p ON p.fk_venta = v.id
    WHERE p.fecha_pago::date BETWEEN p_fecha_inicio AND p_fecha_fin;

    RETURN v_total_unidades_vendidas;
END;
$$ LANGUAGE plpgsql;
