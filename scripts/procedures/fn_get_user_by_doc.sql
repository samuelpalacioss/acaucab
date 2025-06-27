DROP FUNCTION IF EXISTS fn_get_user_by_doc(CHAR, INTEGER);

CREATE OR REPLACE FUNCTION fn_get_user_by_doc(
    p_doc_type CHAR,
    p_doc_number INTEGER
)
RETURNS TABLE (
    id_usuario INTEGER,
    nombre_completo VARCHAR,
    email VARCHAR,
    telefono VARCHAR,
    rol_nombre VARCHAR,
    id_rol INTEGER,
    tipo_usuario VARCHAR,
    identificacion VARCHAR,
    direccion VARCHAR,
    -- Detalles de Empleado
    cargo VARCHAR,
    departamento VARCHAR,
    salario_base DECIMAL,
    fecha_inicio_nomina DATE,
    fecha_fin_nomina DATE,
    -- Detalles de Cliente Juridico / Miembro
    razon_social VARCHAR,
    denominacion_comercial VARCHAR,
    -- Detalles de Cliente Natural
    fecha_nacimiento DATE,
    -- Persona de Contacto
    pc_nombre_completo VARCHAR,
    pc_identificacion VARCHAR,
    pc_email VARCHAR,
    pc_telefono VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    /**
     * Se crea una tabla temporal llamada found_user que almacena el ID del usuario
     * encontrado según su tipo de documento y número.
     * 
     * La tabla temporal busca el ID en:
     * - Tabla de empleados
     * - Tabla de clientes naturales  
     * - Tabla de clientes jurídicos
     * - Tabla de miembros
     * 
     * Si encuentra el usuario, llama a la función fn_get_user_by_id para obtener
     * todos sus datos. Si no lo encuentra, no retorna nada.
     */
    RETURN QUERY
    WITH found_user AS (
        SELECT COALESCE(
            (SELECT eu.fk_usuario FROM empleado e JOIN empleado_usuario eu ON e.id = eu.fk_empleado WHERE e.nacionalidad = p_doc_type AND e.ci = p_doc_number LIMIT 1),
            (SELECT cu.fk_usuario FROM cliente_natural cn JOIN cliente_usuario cu ON cn.id = cu.fk_cliente_natural WHERE cn.nacionalidad = p_doc_type AND cn.ci = p_doc_number LIMIT 1),
            (SELECT cu.fk_usuario FROM cliente_juridico cj JOIN cliente_usuario cu ON cj.id = cu.fk_cliente_juridico WHERE cj.naturaleza_rif = p_doc_type AND cj.rif = p_doc_number LIMIT 1),
            (SELECT mu.fk_usuario FROM miembro m JOIN miembro_usuario mu ON m.rif = mu.fk_miembro_1 AND m.naturaleza_rif = mu.fk_miembro_2 WHERE m.naturaleza_rif = p_doc_type AND m.rif = p_doc_number LIMIT 1)
        ) AS user_id
    )
    SELECT user_details.*
    FROM found_user fu
    -- Lateral se usa para ejecutar la función fn_get_user_by_id para la fila que trae found_user
    CROSS JOIN LATERAL fn_get_user_by_id(fu.user_id) user_details
    WHERE fu.user_id IS NOT NULL;
END;
$$;
