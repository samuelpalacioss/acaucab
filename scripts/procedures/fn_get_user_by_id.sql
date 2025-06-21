DROP FUNCTION IF EXISTS fn_get_user_by_id(INTEGER);

/**
 * fn_get_user_by_id
 * 
 * Propósito:
 * Esta función recupera información detallada de un usuario específico, identificado por su ID.
 * La información devuelta se adapta según el tipo de usuario (Empleado, Cliente Natural, Cliente Jurídico, Miembro).
 * 
 * Parámetros:
 * p_user_id (INTEGER): El ID del usuario que se desea consultar.
 * 
 * Retorno:
 * Una tabla con una única fila que contiene los detalles del usuario. Las columnas incluyen:
 * - Información básica: id_usuario, nombre_completo, email, telefono, rol, etc.
 * - Detalles de empleado: cargo, departamento, salario, información de la nómina.
 * - Detalles de cliente/miembro: personas de contacto (en formato JSON), razón social, etc.
 * - Detalles de cliente natural: fecha de nacimiento.
 * 
 * Lógica:
 * 1.  Identifica al usuario y sus entidades asociadas (empleado, cliente, miembro) usando el `p_user_id`.
 * 2.  Determina el `tipo_usuario` (Empleado, Cliente Juridico, etc.).
 * 3.  Recopila información básica como nombre, correo, rol y teléfono.
 * 4.  Si el usuario es un 'Empleado', busca su nómina más reciente para obtener detalles del cargo y departamento.
 * 5.  Si es 'Cliente Juridico' o 'Miembro', agrega la información de las personas de contacto en un campo JSON.
 * 6.  Combina toda la información en una única fila de respuesta, utilizando COALESCE para manejar los campos que varían según el tipo de usuario.
 */
CREATE OR REPLACE FUNCTION fn_get_user_by_id(p_user_id INTEGER)
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
    RETURN QUERY
    WITH user_base AS (
        SELECT
            u.id AS user_id,
            u.fk_rol,
            c.dirección_correo,
            r.nombre AS rol_nombre_val,
            r.id AS id_rol_val,
            e.id as empleado_id,
            cn.id as cliente_natural_id,
            cj.id as cliente_juridico_id,
            m.rif as miembro_rif,
            m.naturaleza_rif as miembro_naturaleza_rif,
            CASE
                WHEN e.id IS NOT NULL THEN 'Empleado'
                WHEN cn.id IS NOT NULL THEN 'Cliente Natural'
                WHEN cj.id IS NOT NULL THEN 'Cliente Juridico'
                WHEN m.rif IS NOT NULL THEN 'Miembro'
                ELSE 'Indefinido'
            END AS tipo_usuario_val,
            e, cn, cj, m 
        FROM usuario u
        JOIN correo c ON u.fk_correo = c.id
        JOIN rol r ON u.fk_rol = r.id
        LEFT JOIN empleado_usuario eu ON u.id = eu.fk_usuario
        LEFT JOIN empleado e ON eu.fk_empleado = e.id
        LEFT JOIN cliente_usuario cu ON u.id = cu.fk_usuario
        LEFT JOIN cliente_natural cn ON cu.fk_cliente_natural = cn.id
        LEFT JOIN cliente_juridico cj ON cu.fk_cliente_juridico = cj.id
        LEFT JOIN miembro_usuario mu ON u.id = mu.fk_usuario
        LEFT JOIN miembro m ON mu.fk_miembro_1 = m.rif AND mu.fk_miembro_2 = m.naturaleza_rif
        WHERE u.id = p_user_id
    )
    SELECT
        ub.user_id,
        COALESCE(
            (ub.e).primer_nombre || ' ' || (ub.e).primer_apellido,
            (ub.cn).primer_nombre || ' ' || (ub.cn).primer_apellido,
            (ub.cj).denominación_comercial,
            (ub.m).denominación_comercial
        )::VARCHAR,
        ub.dirección_correo::VARCHAR,
        COALESCE(
            (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_empleado = ub.empleado_id LIMIT 1),
            (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_cliente_natural = ub.cliente_natural_id LIMIT 1),
            (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_cliente_juridico = ub.cliente_juridico_id LIMIT 1),
            (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_miembro_1 = ub.miembro_rif AND t.fk_miembro_2 = ub.miembro_naturaleza_rif LIMIT 1)
        )::VARCHAR,
        ub.rol_nombre_val::VARCHAR,
        ub.id_rol_val::INTEGER,
        ub.tipo_usuario_val::VARCHAR,
        COALESCE(
            (ub.e).nacionalidad || '-' || (ub.e).ci,
            (ub.cn).nacionalidad || '-' || (ub.cn).ci,
            (ub.cj).naturaleza_rif || '-' || (ub.cj).rif,
            (ub.m).naturaleza_rif || '-' || (ub.m).rif
        )::VARCHAR,
        COALESCE(
            (ub.cn).dirección,
            (ub.cj).dirección,
            (ub.m).dirección_física
        )::VARCHAR,
        emp_info.cargo,
        emp_info.departamento,
        emp_info.salario_base,
        emp_info.fecha_inicio_nomina,
        emp_info.fecha_fin_nomina,
        COALESCE((ub.cj).razón_social, (ub.m).razón_social)::VARCHAR,
        COALESCE((ub.cj).denominación_comercial, (ub.m).denominación_comercial)::VARCHAR,
        emp_info.fecha_nacimiento,
        cp.pc_nombre_completo,
        cp.pc_identificacion,
        cp.pc_email,
        cp.pc_telefono
    FROM 
        user_base ub
    LEFT JOIN 
        fn_get_empleado_info_by_id(ub.empleado_id) emp_info ON ub.empleado_id IS NOT NULL
    LEFT JOIN (
        SELECT
            pc_details.fk_cliente_juridico,
            pc_details.fk_miembro_1,
            pc_details.fk_miembro_2,
            (array_agg(pc_details.primer_nombre || ' ' || pc_details.primer_apellido ORDER BY pc_details.id))[1]::VARCHAR as pc_nombre_completo,
            (array_agg(pc_details.nacionalidad || '-' || pc_details.ci ORDER BY pc_details.id))[1]::VARCHAR as pc_identificacion,
            (array_agg(pc_details.email ORDER BY pc_details.id))[1]::VARCHAR as pc_email,
            (array_agg(pc_details.telefono ORDER BY pc_details.id))[1]::VARCHAR as pc_telefono
        FROM (
            SELECT
                pc.*,
                (SELECT c.dirección_correo FROM correo c WHERE c.fk_persona_contacto = pc.id LIMIT 1) as email,
                (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_persona_contacto = pc.id LIMIT 1) as telefono
            FROM persona_contacto pc
        ) pc_details
        GROUP BY pc_details.fk_cliente_juridico, pc_details.fk_miembro_1, pc_details.fk_miembro_2
    ) cp ON (cp.fk_cliente_juridico = ub.cliente_juridico_id) OR (cp.fk_miembro_1 = ub.miembro_rif AND cp.fk_miembro_2 = ub.miembro_naturaleza_rif);
END;
$$;
