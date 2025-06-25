DROP FUNCTION IF EXISTS fn_get_presentaciones_disponibles_tienda(INTEGER);

CREATE OR REPLACE FUNCTION fn_get_presentaciones_disponibles_tienda(
    p_id_tienda_fisica INTEGER DEFAULT 1
)
RETURNS TABLE (
    sku VARCHAR,              -- SKU de la presentación
    nombre_cerveza VARCHAR,   -- Nombre de la cerveza 
    presentacion VARCHAR,   -- Nombre de la presentación
    precio DECIMAL,            -- Precio de la presentación
    id_tipo_cerveza INTEGER,  -- ID del tipo de cerveza
    tipo_cerveza VARCHAR,     -- Nombre del tipo de cerveza
    stock_total INTEGER,      -- Stock total (cantidad en lugares de la tienda física)
    marca VARCHAR,            -- Marca (denominación comercial del miembro)
    imagen VARCHAR            -- URL de la imagen
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pc.sku, -- SKU de la presentación
        c.nombre, -- Nombre de la cerveza 
        pr.nombre, -- Nombre de la presentación
        pc.precio::DECIMAL, -- Precio de la presentación
        tc.id, -- ID del tipo de cerveza
        tc.nombre, -- Nombre del tipo de cerveza
        -- Stock total es solo la cantidad en tienda
        COALESCE(lti.cantidad, 0) AS stock_total,
        m.denominación_comercial, -- Marca (denominación comercial del miembro)
        pc.imagen -- URL de la imagen
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
        -- Stock total debe ser mayor o igual a 1
        AND COALESCE(lti.cantidad, 0) >= 1
    ORDER BY c.nombre; -- Ordenar por nombre_cerveza
END;
$$;
