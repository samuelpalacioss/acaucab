DROP FUNCTION IF EXISTS fn_get_cliente_by_usuario_id(INTEGER);

CREATE OR REPLACE FUNCTION fn_get_cliente_by_usuario_id(p_usuario_id INTEGER)
RETURNS TABLE (
    id_usuario INTEGER,
    id_cliente INTEGER,
    nombre_completo VARCHAR,
    razon_social VARCHAR,
    denominacion_comercial VARCHAR,
    email VARCHAR,
    telefono VARCHAR,
    rol_nombre VARCHAR,
    id_rol INTEGER,
    tipo_cliente VARCHAR,
    identificacion VARCHAR,
    direccion VARCHAR,
    direccion_fiscal VARCHAR
) AS $$
DECLARE
    v_cliente_natural_id INT;
    v_cliente_juridico_id INT;
BEGIN
    -- Find the client associated with the user
    SELECT fk_cliente_natural, fk_cliente_juridico
    INTO v_cliente_natural_id, v_cliente_juridico_id
    FROM cliente_usuario
    WHERE fk_usuario = p_usuario_id;

    IF v_cliente_natural_id IS NOT NULL THEN
        -- It's a natural client
        RETURN QUERY
        SELECT
            u.id as id_usuario,
            cn.id as id_cliente,
            (cn.primer_nombre || ' ' || cn.primer_apellido)::VARCHAR as nombre_completo,
            NULL::VARCHAR as razon_social,
            NULL::VARCHAR as denominacion_comercial,
            c.dirección_correo::VARCHAR as email,
            (t.codigo_área || '-' || t.número)::VARCHAR as telefono,
            r.nombre::VARCHAR as rol_nombre,
            r.id as id_rol,
            'natural'::VARCHAR as tipo_cliente,
            (cn.nacionalidad || '-' || cn.ci)::VARCHAR as identificacion,
            cn.dirección,
            NULL::VARCHAR as direccion_fiscal
        FROM cliente_natural cn
        JOIN cliente_usuario cu ON cn.id = cu.fk_cliente_natural
        JOIN usuario u ON cu.fk_usuario = u.id
        JOIN correo c ON u.fk_correo = c.id
        JOIN rol r ON u.fk_rol = r.id
        LEFT JOIN telefono t ON cn.id = t.fk_cliente_natural
        WHERE u.id = p_usuario_id
        LIMIT 1;

    ELSIF v_cliente_juridico_id IS NOT NULL THEN
        -- It's a juridical client
        RETURN QUERY
        SELECT
            u.id as id_usuario,
            cj.id as id_cliente,
            pc.primer_nombre || ' ' || pc.primer_apellido AS nombre_completo,
            cj.razón_social,
            cj.denominación_comercial,
            c.dirección_correo::VARCHAR as email,
            (t.codigo_área || '-' || t.número)::VARCHAR as telefono,
            r.nombre::VARCHAR as rol_nombre,
            r.id as id_rol,
            'juridico'::VARCHAR as tipo_cliente,
            (cj.naturaleza_rif || '-' || cj.rif)::VARCHAR as identificacion,
            cj.dirección,
            cj.dirección_fiscal
        FROM cliente_juridico cj
        JOIN cliente_usuario cu ON cj.id = cu.fk_cliente_juridico
        JOIN usuario u ON cu.fk_usuario = u.id
        JOIN correo c ON u.fk_correo = c.id
        JOIN rol r ON u.fk_rol = r.id
        LEFT JOIN telefono t ON cj.id = t.fk_cliente_juridico
        LEFT JOIN persona_contacto pc on cj.id = pc.fk_cliente_juridico
        WHERE u.id = p_usuario_id
        LIMIT 1;
    END IF;
END;
$$ LANGUAGE plpgsql; 