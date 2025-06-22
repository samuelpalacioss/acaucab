/**
 * Función: fn_get_personas
 * Propósito: Obtiene todas las personas (empleados, clientes naturales, clientes jurídicos y miembros) que NO tienen un usuario asociado
 * Retorna: Tabla con información básica de las personas sin usuario
 */
CREATE OR REPLACE FUNCTION fn_get_personas()
RETURNS TABLE (
    tipo_persona VARCHAR(20),
    id INTEGER,
    documento VARCHAR(15),
    nacionalidad_naturaleza CHAR(1),
    nombre_completo VARCHAR(255),
    direccion VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    
    -- Empleados sin usuario
    SELECT 
        'Empleado'::VARCHAR(20) AS tipo_persona,
        e.id::INTEGER,
        e.ci::VARCHAR(15) AS documento,
        e.nacionalidad AS nacionalidad_naturaleza,
        CONCAT(e.primer_nombre, 
               CASE WHEN e.segundo_nombre IS NOT NULL THEN ' ' || e.segundo_nombre ELSE '' END,
               ' ', e.primer_apellido,
               CASE WHEN e.segundo_apellido IS NOT NULL THEN ' ' || e.segundo_apellido ELSE '' END
        )::VARCHAR(255) AS nombre_completo,
        NULL::VARCHAR(255) AS direccion
    FROM empleado e
    LEFT JOIN empleado_usuario eu ON e.id = eu.fk_empleado
    WHERE eu.fk_usuario IS NULL
    
    UNION ALL
    
    -- Clientes naturales sin usuario
    SELECT 
        'Cliente Natural'::VARCHAR(20) AS tipo_persona,
        cn.id::INTEGER,
        cn.ci::VARCHAR(15) AS documento,
        cn.nacionalidad AS nacionalidad_naturaleza,
        CONCAT(cn.primer_nombre,
               CASE WHEN cn.segundo_nombre IS NOT NULL THEN ' ' || cn.segundo_nombre ELSE '' END,
               ' ', cn.primer_apellido,
               CASE WHEN cn.segundo_apellido IS NOT NULL THEN ' ' || cn.segundo_apellido ELSE '' END
        )::VARCHAR(255) AS nombre_completo,
        cn.dirección::VARCHAR(255)
    FROM cliente_natural cn
    LEFT JOIN cliente_usuario cu ON cn.id = cu.fk_cliente_natural
    WHERE cu.fk_usuario IS NULL
    
    UNION ALL
    
    -- Clientes jurídicos sin usuario
    SELECT 
        'Cliente Jurídico'::VARCHAR(20) AS tipo_persona,
        cj.id::INTEGER,
        cj.rif::VARCHAR(15) AS documento,
        cj.naturaleza_rif AS nacionalidad_naturaleza,
        cj.razón_social::VARCHAR(255) AS nombre_completo,
        cj.dirección::VARCHAR(255)
    FROM cliente_juridico cj
    LEFT JOIN cliente_usuario cu ON cj.id = cu.fk_cliente_juridico
    WHERE cu.fk_usuario IS NULL
    
    UNION ALL
    
    -- Miembros sin usuario
    SELECT 
        'Miembro'::VARCHAR(20) AS tipo_persona,
        m.rif::INTEGER AS id,
        m.rif::VARCHAR(15) AS documento,
        m.naturaleza_rif AS nacionalidad_naturaleza,
        m.razón_social::VARCHAR(255) AS nombre_completo,
        m.dirección_física::VARCHAR(255) AS direccion
    FROM miembro m
    LEFT JOIN miembro_usuario mu ON m.rif = mu.fk_miembro_1 AND m.naturaleza_rif = mu.fk_miembro_2
    WHERE mu.fk_usuario IS NULL
    
    ORDER BY tipo_persona, nombre_completo;
    
END;
$$ LANGUAGE plpgsql;

/**
 * Ejemplo de uso:
 * SELECT * FROM fn_get_personas();
 * 
 * Retorna:
 * - tipo_persona: Tipo de entidad (Empleado, Cliente Natural, Cliente Jurídico, Miembro)
 * - id: ID único de la persona
 * - documento: CI o RIF según corresponda
 * - nacionalidad_naturaleza: V/E para personas naturales, J/V/P/E para jurídicas
 * - nombre_completo: Nombre completo o razón social
 * - direccion: Dirección (NULL para empleados)
 */
