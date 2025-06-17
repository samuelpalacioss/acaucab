DROP FUNCTION IF EXISTS fn_get_ventas();

-- CreateStoredProcedure
CREATE OR REPLACE FUNCTION fn_get_ventas()
RETURNS TABLE (
    id INTEGER,
    monto_total DECIMAL,
    dirección_entrega VARCHAR,
    observación VARCHAR,
    tipo_cliente VARCHAR,
    nombre_cliente VARCHAR,
    tipo_tienda VARCHAR,
    lugar_entrega VARCHAR,
    estado_entrega VARCHAR,
    fecha_ultimo_estado TIMESTAMP
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id,
        v.monto_total,
        -- Mostrar dirección de tienda física cuando aplique, sino la dirección de entrega
        CASE 
            WHEN v.fk_tienda_fisica IS NOT NULL THEN tf.direccion
            ELSE v.dirección_entrega
        END::VARCHAR as dirección_entrega,
        v.observación,
        -- Información del cliente
        CASE 
            WHEN v.fk_cliente_juridico IS NOT NULL THEN 'Jurídico'
            WHEN v.fk_cliente_natural IS NOT NULL THEN 'Natural'
            WHEN v.fk_usuario IS NOT NULL THEN 'Usuario'
        END::VARCHAR as tipo_cliente,
        -- Datos del cliente según el tipo
        COALESCE(
            cj.denominación_comercial, 
            cn.primer_nombre, 
            (SELECT nombre_completo FROM fn_get_user_info(v.fk_usuario))
        )::VARCHAR as nombre_cliente,
        -- Información de la tienda
        CASE 
            WHEN v.fk_tienda_fisica IS NOT NULL THEN 'Física'
            WHEN v.fk_tienda_web IS NOT NULL THEN 'Web'
        END::VARCHAR as tipo_tienda,
        -- Información del lugar de entrega
        l.nombre::VARCHAR as lugar_entrega,
        -- Estado de entrega (último estado de la venta)
        s.nombre::VARCHAR as estado_entrega,
        -- Fecha del último estado
        sv_ultimo.fecha_actualización as fecha_ultimo_estado
    FROM venta v
    LEFT JOIN cliente_juridico cj ON v.fk_cliente_juridico = cj.id
    LEFT JOIN cliente_natural cn ON v.fk_cliente_natural = cn.id
    LEFT JOIN tienda_fisica tf ON v.fk_tienda_fisica = tf.id
    LEFT JOIN tienda_web tw ON v.fk_tienda_web = tw.id
    -- Información del lugar de entrega
    LEFT JOIN lugar l ON 
        CASE 
            WHEN v.fk_tienda_fisica IS NOT NULL THEN tf.fk_lugar = l.id
            ELSE v.fk_lugar = l.id
        END
    -- Subconsulta para obtener el último estado de cada venta
    LEFT JOIN LATERAL (
        SELECT 
            sv.fk_status,
            sv.fecha_actualización
        FROM status_venta sv
        WHERE sv.fk_venta = v.id
        ORDER BY sv.fecha_actualización DESC
        LIMIT 1
    ) sv_ultimo ON true
    -- JOIN con la tabla status para obtener el nombre del estado
    LEFT JOIN status s ON sv_ultimo.fk_status = s.id
    ORDER BY v.id DESC;
END;
$$; 