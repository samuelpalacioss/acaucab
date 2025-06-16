-- CreateStoredProcedure
CREATE OR REPLACE PROCEDURE sp_get_ventas()
LANGUAGE plpgsql
AS $$
BEGIN
    WITH user_info AS (
        SELECT 
            u.id as usuario_id,
            COALESCE(
                e.primer_nombre || ' ' || e.primer_apellido,
                m.razón_social,
                COALESCE(
                    cj.denominación_comercial,
                    cn.primer_nombre || ' ' || cn.primer_apellido
                )
            ) as nombre_completo
        FROM usuario u
        LEFT JOIN empleado_usuario eu ON u.id = eu.fk_usuario
        LEFT JOIN empleado e ON eu.fk_empleado = e.id
        LEFT JOIN miembro_usuario mu ON u.id = mu.fk_usuario
        LEFT JOIN miembro m ON mu.fk_miembro_1 = m.rif AND mu.fk_miembro_2 = m.naturaleza_rif
        LEFT JOIN cliente_usuario cu ON u.id = cu.fk_usuario
        LEFT JOIN cliente_juridico cj ON cu.fk_cliente_juridico = cj.id
        LEFT JOIN cliente_natural cn ON cu.fk_cliente_natural = cn.id
    )
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
        END as tipo_cliente,
        -- Datos del cliente según el tipo
        COALESCE(cj.denominación_comercial, cn.primer_nombre, ui.nombre_completo) as nombre_cliente,
        -- Información de la tienda
        CASE 
            WHEN v.fk_tienda_fisica IS NOT NULL THEN 'Física'
            WHEN v.fk_tienda_web IS NOT NULL THEN 'Web'
        END as tipo_tienda,
        -- Nombre de la tienda
        COALESCE(tf.nombre, tw.nombre) as nombre_tienda,
        -- Información del lugar de entrega
        l.nombre as lugar_entrega,
        -- Fecha de la venta
        v.fecha_venta
    FROM venta v
    LEFT JOIN cliente_juridico cj ON v.fk_cliente_juridico = cj.id
    LEFT JOIN cliente_natural cn ON v.fk_cliente_natural = cn.id
    LEFT JOIN user_info ui ON v.fk_usuario = ui.usuario_id
    LEFT JOIN tienda_fisica tf ON v.fk_tienda_fisica = tf.id
    LEFT JOIN tienda_web tw ON v.fk_tienda_web = tw.id
    LEFT JOIN lugar l ON v.fk_lugar = l.id
    ORDER BY v.id DESC;
END;
$$; 