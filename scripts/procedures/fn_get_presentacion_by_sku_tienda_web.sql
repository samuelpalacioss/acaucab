DROP FUNCTION IF EXISTS fn_get_presentacion_by_sku_tienda_web(VARCHAR, INTEGER);

CREATE OR REPLACE FUNCTION fn_get_presentacion_by_sku_tienda_web(
    p_sku VARCHAR,
    p_id_tienda_web INTEGER DEFAULT 1
)
RETURNS TABLE (
    sku VARCHAR,
    nombre_cerveza VARCHAR,
    presentacion VARCHAR,
    precio DECIMAL,
    id_tipo_cerveza INTEGER,
    tipo_cerveza VARCHAR,
    stock_total BIGINT,
    marca VARCHAR,
    imagen VARCHAR,
    presentacion_id INTEGER,
    cerveza_id INTEGER
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pc.sku,
        c.nombre,
        pr.nombre,
        pc.precio::DECIMAL,
        tc.id,
        tc.nombre,
        SUM(COALESCE(i.cantidad_almacen, 0)),
        m.denominación_comercial,
        pc.imagen,
        pr.id,
        c.id
    FROM presentacion_cerveza pc
    JOIN presentacion pr ON pc.fk_presentacion = pr.id
    JOIN cerveza c ON pc.fk_cerveza = c.id
    JOIN tipo_cerveza tc ON c.fk_tipo_cerveza = tc.id
    LEFT JOIN miembro_presentacion_cerveza mpc ON 
        pc.fk_presentacion = mpc.fk_presentacion_cerveza_1 AND 
        pc.fk_cerveza = mpc.fk_presentacion_cerveza_2
    LEFT JOIN miembro m ON mpc.fk_miembro_1 = m.rif AND mpc.fk_miembro_2 = m.naturaleza_rif
    JOIN inventario i ON 
        pc.fk_presentacion = i.fk_presentacion_cerveza_1 AND 
        pc.fk_cerveza = i.fk_presentacion_cerveza_2
    JOIN almacen a ON i.fk_almacen = a.id
    WHERE pc.sku = p_sku AND a.fk_tienda_web = p_id_tienda_web
    GROUP BY 
        pc.sku,
        c.nombre,
        pr.nombre,
        pc.precio,
        tc.id,
        tc.nombre,
        m.denominación_comercial,
        pc.imagen,
        pr.id,
        c.id
    HAVING SUM(COALESCE(i.cantidad_almacen, 0)) >= 1;
END;
$$ LANGUAGE plpgsql;
