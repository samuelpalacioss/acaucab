
CREATE OR REPLACE FUNCTION fn_get_total_generado_tienda()
RETURNS TABLE (
    tienda_nombre VARCHAR,
    tipo_tienda VARCHAR,
    total_generado DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    -- Ventas en tiendas físicas
    SELECT
        l.nombre AS tienda_nombre,
        'Física'::VARCHAR AS tipo_tienda,
        SUM(v.monto_total) AS total_generado
    FROM venta v
    JOIN tienda_fisica tf ON v.fk_tienda_fisica = tf.id
    JOIN lugar l ON tf.fk_lugar = l.id
    GROUP BY l.nombre

    UNION ALL

    -- Ventas en tienda web
    SELECT
        tw.dominio_web AS tienda_nombre,
        'Web'::VARCHAR AS tipo_tienda,
        SUM(v.monto_total) AS total_generado
    FROM venta v
    JOIN tienda_web tw ON v.fk_tienda_web = tw.id
    GROUP BY tw.dominio_web;
END;
$$;

