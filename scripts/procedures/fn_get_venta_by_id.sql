DROP FUNCTION IF EXISTS fn_get_venta_by_id(INTEGER);

 
CREATE OR REPLACE FUNCTION fn_get_venta_by_id(p_venta_id INTEGER)
RETURNS TABLE (
    id INTEGER,
    monto_total DECIMAL,
    direccion_entrega VARCHAR,
    observacion VARCHAR,
    tipo_cliente VARCHAR,
    nombre_cliente VARCHAR,
    tipo_tienda VARCHAR,
    lugar_entrega VARCHAR,
    estado_entrega VARCHAR,
    fecha_ultimo_estado TIMESTAMP,
    producto_nombre VARCHAR,
    producto_cantidad INTEGER,
    producto_precio_unitario DECIMAL,
    pagos JSONB
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id,
        v.monto_total,
        CASE 
            WHEN v.fk_tienda_fisica IS NOT NULL THEN tf.direccion
            ELSE v.dirección_entrega
        END::VARCHAR as direccion_entrega,
        v.observación,
        CASE 
            WHEN v.fk_cliente_juridico IS NOT NULL THEN 'Jurídico'
            WHEN v.fk_cliente_natural IS NOT NULL THEN 'Natural'
            WHEN v.fk_usuario IS NOT NULL THEN 'Usuario'
        END::VARCHAR as tipo_cliente,
        COALESCE(
            cj.denominación_comercial, 
            cn.primer_nombre, 
            (SELECT nombre_completo FROM fn_get_user_info(v.fk_usuario))
        )::VARCHAR as nombre_cliente,
        CASE 
            WHEN v.fk_tienda_fisica IS NOT NULL THEN 'Física'
            WHEN v.fk_tienda_web IS NOT NULL THEN 'Web'
        END::VARCHAR as tipo_tienda,
        l.nombre::VARCHAR as lugar_entrega,
        s.nombre::VARCHAR as estado_entrega,
        sv_ultimo.fecha_actualización as fecha_ultimo_estado,
        -- Detalles del producto
        (c.nombre || ' - ' || p.nombre)::VARCHAR as producto_nombre,
        dp.cantidad as producto_cantidad,
        dp.precio_unitario as producto_precio_unitario,
        -- Llamada a la función de pagos para obtener un JSON agregado
        (SELECT jsonb_agg(p.*) FROM fn_get_pagos_by_venta(v.id) p) as pagos
    FROM venta v
    -- Join para obtener los detalles de los productos de la venta
    JOIN detalle_presentacion dp ON v.id = dp.fk_venta
    JOIN presentacion_cerveza pc ON dp.fk_presentacion = pc.fk_presentacion AND dp.fk_cerveza = pc.fk_cerveza
    JOIN presentacion p ON pc.fk_presentacion = p.id
    JOIN cerveza c ON pc.fk_cerveza = c.id
    -- Joins para obtener información general de la venta
    LEFT JOIN cliente_juridico cj ON v.fk_cliente_juridico = cj.id
    LEFT JOIN cliente_natural cn ON v.fk_cliente_natural = cn.id
    LEFT JOIN tienda_fisica tf ON v.fk_tienda_fisica = tf.id
    LEFT JOIN tienda_web tw ON v.fk_tienda_web = tw.id
    LEFT JOIN lugar l ON 
        CASE 
            WHEN v.fk_tienda_fisica IS NOT NULL THEN tf.fk_lugar = l.id
            ELSE v.fk_lugar = l.id
        END
    LEFT JOIN LATERAL (
        SELECT 
            sv.fk_status,
            sv.fecha_actualización
        FROM status_venta sv
        WHERE sv.fk_venta = v.id
        ORDER BY sv.fecha_actualización DESC
        LIMIT 1
    ) sv_ultimo ON true
    LEFT JOIN status s ON sv_ultimo.fk_status = s.id
    WHERE v.id = p_venta_id;
END;
$$;
