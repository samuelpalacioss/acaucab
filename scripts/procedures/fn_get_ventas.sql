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
    lugar_entrega VARCHAR
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id,
        v.monto_total,
        v.dirección_entrega,
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
        l.nombre::VARCHAR as lugar_entrega
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
    ORDER BY v.id DESC;
END;
$$; 