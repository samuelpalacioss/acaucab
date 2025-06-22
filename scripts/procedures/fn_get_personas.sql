/**
 * Función: fn_get_personas
 * Propósito: Obtiene todas las personas (empleados, clientes naturales, clientes jurídicos y miembros) que NO tienen un usuario asociado
 * Retorna: Tabla con información básica, correo y teléfono de las personas sin usuario
 */
DROP FUNCTION IF EXISTS fn_get_personas();

CREATE OR REPLACE FUNCTION fn_get_personas()
RETURNS TABLE (
    tipo_persona VARCHAR(20),
    id INTEGER,
    documento VARCHAR(15),
    nacionalidad_naturaleza CHAR(1),
    nombre_completo VARCHAR(255),
    email VARCHAR(255),
    telefono VARCHAR(20)
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
        NULL::VARCHAR(255) AS email,
        (SELECT CONCAT(t.codigo_área, '-', t.número) FROM telefono t WHERE t.fk_empleado = e.id LIMIT 1)::VARCHAR(20) as telefono
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
        NULL::VARCHAR(255) AS email,
        (SELECT CONCAT(t.codigo_área, '-', t.número) FROM telefono t WHERE t.fk_cliente_natural = cn.id LIMIT 1)::VARCHAR(20) as telefono
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
        (SELECT c.dirección_correo FROM correo c JOIN persona_contacto pc ON c.fk_persona_contacto = pc.id WHERE pc.fk_cliente_juridico = cj.id LIMIT 1)::VARCHAR(255) as email,
        (SELECT CONCAT(t.codigo_área, '-', t.número) FROM telefono t WHERE t.fk_cliente_juridico = cj.id LIMIT 1)::VARCHAR(20) as telefono
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
        (SELECT c.dirección_correo FROM correo c 
         LEFT JOIN persona_contacto pc on c.fk_persona_contacto = pc.id
         WHERE (c.fk_miembro_1 = m.rif AND c.fk_miembro_2 = m.naturaleza_rif) 
         OR (pc.fk_miembro_1 = m.rif AND pc.fk_miembro_2 = m.naturaleza_rif)
         LIMIT 1
        )::VARCHAR(255) as email,
        (SELECT CONCAT(t.codigo_área, '-', t.número) FROM telefono t WHERE t.fk_miembro_1 = m.rif AND t.fk_miembro_2 = m.naturaleza_rif LIMIT 1)::VARCHAR(20) as telefono
    FROM miembro m
    LEFT JOIN miembro_usuario mu ON m.rif = mu.fk_miembro_1 AND m.naturaleza_rif = mu.fk_miembro_2
    WHERE mu.fk_usuario IS NULL
    
    ORDER BY 
        -- Priorizar registros con email (0 si tiene email, 1 si es NULL)
        email NULLS LAST,
        -- Priorizar registros con teléfono (0 si tiene teléfono, 1 si es NULL)
        telefono NULLS LAST,
        -- Luego ordenar por tipo de persona
        tipo_persona,
        -- Luego por nombre completo
        nombre_completo,
        -- Finalmente por ID
        id;
    
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
 * - email: Correo electrónico (si existe)
 * - telefono: Número de teléfono (si existe)
 */
