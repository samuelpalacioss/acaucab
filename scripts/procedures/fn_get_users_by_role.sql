/**
 * @name fn_get_users_by_role
 * @description Obtiene todos los usuarios que tienen asignado un rol específico.
 * @param p_role_id - El ID del rol a consultar.
 * @returns TABLE - Una tabla con la información de los usuarios.
 *          id: Identificador único del usuario.
 *          correo: Correo electrónico del usuario.
 *          tipo_persona: Tipo de persona (natural, juridico, empleado, miembro).
 *          nombre_completo: Nombre completo del usuario o razón social.
 */
CREATE OR REPLACE FUNCTION fn_get_users_by_role(p_role_id INT)
RETURNS TABLE (
    id INT,
    correo VARCHAR,
    tipo_persona VARCHAR,
    nombre_completo VARCHAR
) AS $$
BEGIN
    /**
     * @dev Realiza una consulta a la tabla 'usuario' unida con las tablas de personas
     *      para obtener información completa de los usuarios con un rol específico.
     */
    RETURN QUERY
    SELECT DISTINCT
        u.id::INT,
        c.dirección_correo::VARCHAR,
        (CASE 
            WHEN cn.id IS NOT NULL THEN 'Natural'
            WHEN cj.id IS NOT NULL THEN 'Jurídico'
            WHEN e.id IS NOT NULL THEN 'Empleado'
            WHEN m.rif IS NOT NULL THEN 'Miembro'
            ELSE 'No definido'
        END)::VARCHAR AS tipo_persona,
        COALESCE(
            CASE 
                WHEN cn.id IS NOT NULL THEN 
                    CONCAT(COALESCE(cn.primer_nombre, ''), ' ', COALESCE(cn.primer_apellido, ''))
                WHEN cj.id IS NOT NULL THEN 
                    COALESCE(cj.razón_social, 'Sin razón social')
                WHEN e.id IS NOT NULL THEN 
                    CONCAT(COALESCE(e.primer_nombre, ''), ' ', COALESCE(e.primer_apellido, ''))
                WHEN m.rif IS NOT NULL THEN 
                    COALESCE(m.razón_social, 'Sin razón social')
                ELSE 'Usuario sin nombre'
            END,
            'Usuario sin nombre'
        )::VARCHAR AS nombre_completo
    FROM
        usuario u
    INNER JOIN correo c ON u.fk_correo = c.id
    LEFT JOIN cliente_usuario cu ON u.id = cu.fk_usuario
    LEFT JOIN cliente_natural cn ON cu.fk_cliente_natural = cn.id
    LEFT JOIN cliente_juridico cj ON cu.fk_cliente_juridico = cj.id
    LEFT JOIN empleado_usuario eu ON u.id = eu.fk_usuario
    LEFT JOIN empleado e ON eu.fk_empleado = e.id
    LEFT JOIN miembro_usuario mu ON u.id = mu.fk_usuario
    LEFT JOIN miembro m ON mu.fk_miembro_1 = m.rif AND mu.fk_miembro_2 = m.naturaleza_rif
    WHERE
        u.fk_rol = p_role_id
    ORDER BY
        nombre_completo;
END;
$$ LANGUAGE plpgsql; 