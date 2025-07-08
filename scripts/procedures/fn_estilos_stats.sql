CREATE OR REPLACE FUNCTION fn_estilos_stats()
RETURNS TABLE(
    estilo_cerveza VARCHAR,
    total_vendido BIGINT
) AS $$
BEGIN
    /**
     * Analiza qué estilos de cerveza (IPA, Lager, Stout, etc.) son los más vendidos.
     */
    RETURN QUERY
    SELECT
        tc.nombre AS estilo_cerveza,
        SUM(dp.cantidad)::BIGINT AS total_vendido
    FROM detalle_presentacion dp
    JOIN presentacion_cerveza pc
      ON dp.fk_presentacion = pc.fk_presentacion AND dp.fk_cerveza = pc.fk_cerveza
    JOIN cerveza c ON pc.fk_cerveza = c.id
    JOIN tipo_cerveza tc ON c.fk_tipo_cerveza = tc.id
    GROUP BY
        tc.nombre
    ORDER BY
        total_vendido DESC;
END;
$$ LANGUAGE plpgsql;
