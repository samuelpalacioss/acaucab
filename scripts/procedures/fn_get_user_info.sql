DROP FUNCTION IF EXISTS fn_get_user_info(INTEGER);

CREATE OR REPLACE FUNCTION fn_get_user_info(p_user_id INTEGER)
RETURNS TABLE (
    usuario_id INTEGER,
    correo VARCHAR,
    rol VARCHAR,
    nombre_completo VARCHAR,
    tipo_usuario VARCHAR
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id as usuario_id,
        c.dirección_correo as correo,
        r.nombre as rol,
        -- Información del empleado si existe
        COALESCE(
            e.primer_nombre || ' ' || e.primer_apellido,
            -- Información del miembro si existe
            m.razón_social,
            -- Información del cliente si existe
            COALESCE(
                cj.denominación_comercial,
                cn.primer_nombre || ' ' || cn.primer_apellido
            )
        )::VARCHAR as nombre_completo,
        -- Tipo de usuario
        CASE 
            WHEN eu.fk_empleado IS NOT NULL THEN 'Empleado'
            WHEN mu.fk_miembro_1 IS NOT NULL THEN 'Miembro'
            WHEN cu.fk_cliente_juridico IS NOT NULL THEN 'Cliente Jurídico'
            WHEN cu.fk_cliente_natural IS NOT NULL THEN 'Cliente Natural'
        END::VARCHAR as tipo_usuario
    FROM usuario u
    LEFT JOIN correo c ON u.fk_correo = c.id
    LEFT JOIN rol r ON u.fk_rol = r.id
    -- Joins para empleado
    LEFT JOIN empleado_usuario eu ON u.id = eu.fk_usuario
    LEFT JOIN empleado e ON eu.fk_empleado = e.id
    -- Joins para miembro
    LEFT JOIN miembro_usuario mu ON u.id = mu.fk_usuario
    LEFT JOIN miembro m ON mu.fk_miembro_1 = m.rif AND mu.fk_miembro_2 = m.naturaleza_rif
    -- Joins para cliente
    LEFT JOIN cliente_usuario cu ON u.id = cu.fk_usuario
    LEFT JOIN cliente_juridico cj ON cu.fk_cliente_juridico = cj.id
    LEFT JOIN cliente_natural cn ON cu.fk_cliente_natural = cn.id
    WHERE u.id = p_user_id;
END;
$$;