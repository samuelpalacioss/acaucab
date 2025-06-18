DROP FUNCTION IF EXISTS fn_get_presentaciones_by_categoria(INTEGER);

CREATE OR REPLACE FUNCTION fn_get_presentaciones_by_categoria(
    p_id_tipo_cerveza INTEGER
)
RETURNS TABLE (
    sku VARCHAR,              -- SKU de la presentación
    nombre_presentacion_cerveza VARCHAR,   -- Nombre de la cerveza (nombre de la presentación)
    monto FLOAT,            -- Precio de la presentación
    tipo_cerveza VARCHAR,     -- Tipo de cerveza
    marca VARCHAR            -- Marca (denominación comercial del miembro)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pr.sku, -- SKU de la presentación
        (c.nombre || ' (' || pr.nombre || ')')::VARCHAR, -- Nombre de la cerveza (nombre de la presentación)
        pr.monto::FLOAT, -- Precio de la presentación
        tc.nombre, -- Tipo de cerveza
        m.denominación_comercial -- Marca (denominación comercial del miembro)
    FROM presentacion_cerveza pc
    -- Unir presentacion
    JOIN presentacion pr ON pc.fk_presentacion = pr.sku
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
    WHERE tc.fk_tipo_cerveza = p_id_tipo_cerveza -- Solo filtrar por el tipo de cerveza padre (no los recursivos)
    ORDER BY 2; -- Ordenar por nombre_presentacion_cerveza
END;
$$;
