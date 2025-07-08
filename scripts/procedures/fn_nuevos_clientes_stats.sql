CREATE OR REPLACE FUNCTION fn_nuevos_clientes_stats(p_fecha_inicio DATE, p_fecha_fin DATE)
RETURNS TABLE(nuevos BIGINT, recurrentes BIGINT) AS $$
BEGIN
    /**
     * - "Nuevos": Clientes cuya primera compra fue dentro del período especificado.
     * - "Recurrentes": Clientes que compraron en el período pero su primera compra fue antes.
     */
    RETURN QUERY
    WITH ventas_con_cliente AS (

        SELECT
            sv.fecha_actualización::date AS fecha_venta,
            COALESCE(
                'natural_' || v.fk_cliente_natural::TEXT,
                'juridico_' || v.fk_cliente_juridico::TEXT,
                'natural_' || cu.fk_cliente_natural::TEXT,
                'juridico_' || cu.fk_cliente_juridico::TEXT
            ) AS cliente_id_unificado
        FROM venta v
        JOIN status_venta sv ON v.id = sv.fk_venta
        LEFT JOIN cliente_usuario cu ON v.fk_usuario = cu.fk_usuario
        WHERE sv.fecha_actualización IS NOT NULL
          AND COALESCE(
                'natural_' || v.fk_cliente_natural::TEXT,
                'juridico_' || v.fk_cliente_juridico::TEXT,
                'natural_' || cu.fk_cliente_natural::TEXT,
                'juridico_' || cu.fk_cliente_juridico::TEXT
            ) IS NOT NULL
    ),
    primeras_compras AS (
        -- Paso 2: Encontrar la fecha de la primera compra para cada cliente
        SELECT
            cliente_id_unificado,
            MIN(fecha_venta) AS primera_fecha_compra
        FROM ventas_con_cliente
        GROUP BY cliente_id_unificado
    ),
    clientes_en_periodo AS (
        -- Paso 3: Identificar clientes que hicieron una compra en el período actual
        SELECT DISTINCT cliente_id_unificado
        FROM ventas_con_cliente
        WHERE fecha_venta BETWEEN p_fecha_inicio AND p_fecha_fin
    )
    -- Paso 4: Contar clientes nuevos y recurrentes que compraron en el período
    SELECT
        COUNT(CASE WHEN pc.primera_fecha_compra BETWEEN p_fecha_inicio AND p_fecha_fin THEN 1 END)::BIGINT AS nuevos,
        COUNT(CASE WHEN pc.primera_fecha_compra < p_fecha_inicio THEN 1 END)::BIGINT AS recurrentes
    FROM clientes_en_periodo cep
    JOIN primeras_compras pc ON cep.cliente_id_unificado = pc.cliente_id_unificado;

END;
$$ LANGUAGE plpgsql;
