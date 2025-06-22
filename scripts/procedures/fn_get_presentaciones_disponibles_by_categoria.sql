-- Function to get available beer presentations in a store filtered by category (including subcategories)
-- It uses fn_get_presentaciones_disponibles_tienda as a helper function.

DROP FUNCTION IF EXISTS fn_get_presentaciones_disponibles_by_categoria(INTEGER, INTEGER);

CREATE OR REPLACE FUNCTION fn_get_presentaciones_disponibles_by_categoria(
    p_id_tipo_cerveza INTEGER,
    p_id_tienda_fisica INTEGER DEFAULT 1
)
RETURNS TABLE (
    sku VARCHAR,
    nombre_presentacion_cerveza VARCHAR,
    precio DECIMAL,
    tipo_cerveza VARCHAR,
    stock_total INTEGER,
    marca VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    WITH RECURSIVE tipos_recursivos AS (
        -- Select the initial beer type
        SELECT id
        FROM tipo_cerveza
        WHERE id = p_id_tipo_cerveza
        UNION ALL
        -- Recursively select subtypes
        SELECT tc.id
        FROM tipo_cerveza tc
        INNER JOIN tipos_recursivos tr ON tc.fk_tipo_cerveza = tr.id
    )
    SELECT
        f.sku,
        f.nombre_presentacion_cerveza,
        f.precio,
        f.tipo_cerveza,
        f.stock_total,
        f.marca
    FROM fn_get_presentaciones_disponibles_tienda(p_id_tienda_fisica) f
    WHERE 
        f.id_tipo_cerveza IN (SELECT id FROM tipos_recursivos)
    ORDER BY f.nombre_presentacion_cerveza;
END;
$$; 