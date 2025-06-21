DROP FUNCTION IF EXISTS fn_get_presentaciones_disponibles_tienda(INTEGER);

DROP FUNCTION IF EXISTS fn_get_presentaciones_disponibles_tienda(INTEGER, INTEGER);

CREATE OR REPLACE FUNCTION fn_get_presentaciones_disponibles_tienda(
    p_id_tienda_fisica INTEGER,
    p_id_tipo_cerveza INTEGER DEFAULT NULL
)
RETURNS TABLE (
    sku VARCHAR,              -- SKU de la presentación
    nombre_presentacion_cerveza VARCHAR,   -- Nombre de la cerveza (nombre de la presentación)
    precio DECIMAL,            -- Precio de la presentación
    tipo_cerveza VARCHAR,     -- Tipo de cerveza
    stock_total INTEGER,      -- Stock total (almacén + lugares de la tienda física)
    marca VARCHAR            -- Marca (denominación comercial del miembro)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    WITH RECURSIVE tipos_recursivos AS (
        -- Selecciona el tipo de cerveza inicial
        SELECT id
        FROM tipo_cerveza
        WHERE id = p_id_tipo_cerveza
        UNION ALL
        -- Selecciona recursivamente los subtipos
        SELECT tc.id
        FROM tipo_cerveza tc
        INNER JOIN tipos_recursivos tr ON tc.fk_tipo_cerveza = tr.id
    )
    SELECT 
        pc.sku, -- SKU de la presentación
        (c.nombre || ' (' || pr.nombre || ')')::VARCHAR, -- Nombre de la cerveza (nombre de la presentación)
        pc.precio::DECIMAL, -- Precio de la presentación
        tc.nombre, -- Tipo de cerveza
        -- Stock individual de producto: cantidad en almacén + cantidad en tienda
        COALESCE(i.cantidad_almacen, 0) + COALESCE(lti.cantidad, 0) AS stock_total,
        m.denominación_comercial -- Marca (denominación comercial del miembro)
    FROM tienda_fisica tf
    -- Unir almacenes de la tienda física
    JOIN almacen a ON tf.id = a.fk_tienda_fisica
    -- Unir inventario de cada almacén
    JOIN inventario i ON a.id = i.fk_almacen
    -- Unir presentacion_cerveza
    JOIN presentacion_cerveza pc ON i.fk_presentacion_cerveza_1 = pc.fk_presentacion 
    AND i.fk_presentacion_cerveza_2 = pc.fk_cerveza
    -- Unir presentacion
    JOIN presentacion pr ON pc.fk_presentacion = pr.id
    -- Unir cerveza
    JOIN cerveza c ON pc.fk_cerveza = c.id
    -- Unir tipo_cerveza
    JOIN tipo_cerveza tc ON c.fk_tipo_cerveza = tc.id
    -- Unir miembro_presentacion_cerveza para obtener la marca
    LEFT JOIN miembro_presentacion_cerveza mpc ON 
        pc.fk_presentacion = mpc.fk_presentacion_cerveza_1 AND 
        pc.fk_cerveza = mpc.fk_presentacion_cerveza_2
    -- Unir miembro para obtener la denominación comercial
    LEFT JOIN miembro m ON mpc.fk_miembro_1 = m.rif AND mpc.fk_miembro_2 = m.naturaleza_rif
    -- Unir lugar_tienda_inventario para stock en tienda
    LEFT JOIN lugar_tienda_inventario lti ON 
        lti.fk_inventario_1 = i.fk_presentacion_cerveza_1 AND 
        lti.fk_inventario_2 = i.fk_presentacion_cerveza_2 AND 
        lti.fk_inventario_3 = i.fk_almacen
    -- Trae todas las presentaciones o solo las de un determinado tipo de cerveza
    WHERE 
        tf.id = p_id_tienda_fisica 
        AND (
            p_id_tipo_cerveza IS NULL 
            OR 
            c.fk_tipo_cerveza IN (SELECT id FROM tipos_recursivos)
        )
        -- Stock total debe ser mayor o igual a 1
        AND (COALESCE(i.cantidad_almacen, 0) + COALESCE(lti.cantidad, 0)) >= 1
    ORDER BY 2; -- Ordenar por nombre_presentacion_cerveza
END;
$$;
