DROP FUNCTION IF EXISTS fn_get_cliente_by_doc(CHAR, INTEGER);

CREATE OR REPLACE FUNCTION fn_get_cliente_by_doc(
    IN p_doc_type CHAR,
    IN p_doc_number INTEGER
)

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
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    -- Trae la tabla temporal sobre la que se va a trabajar
    WITH user_base AS (
        SELECT
            u.id as user_id,
            COALESCE(cn.id, cj.id) as id_cliente,
            cn.id as cliente_natural_id,
            cj.id as cliente_juridico_id,
      
            c.dirección_correo,
            r.nombre as rol_nombre,
            r.id as id_rol,
            CASE
                WHEN cn.id IS NOT NULL THEN 'natural'
                ELSE 'juridico'
            END as tipo_cliente_val,
            cn, cj
        FROM
            usuario u
        JOIN cliente_usuario cu ON u.id = cu.fk_usuario
        LEFT JOIN cliente_natural cn ON cu.fk_cliente_natural = cn.id
        LEFT JOIN cliente_juridico cj ON cu.fk_cliente_juridico = cj.id
        JOIN rol r ON u.fk_rol = r.id
        JOIN correo c ON u.fk_correo = c.id
        WHERE
            (cn.nacionalidad = p_doc_type AND cn.ci = p_doc_number) OR
            (cj.naturaleza_rif = p_doc_type AND cj.rif = p_doc_number)
    )
    SELECT
        ub.user_id,
        ub.id_cliente,
        -- Trae el nombre completo o la razon social del cliente (el primero que no sea null)
        COALESCE(
            (ub.cn).primer_nombre || ' ' || (ub.cn).primer_apellido,
            (ub.cj).razón_social
        )::VARCHAR,
        (ub.cj).razón_social::VARCHAR,
        (ub.cj).denominación_comercial::VARCHAR,
        ub.dirección_correo::VARCHAR,
        COALESCE(
            (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_cliente_natural = ub.cliente_natural_id LIMIT 1),
            (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_cliente_juridico = ub.cliente_juridico_id LIMIT 1)
        )::VARCHAR,
        ub.rol_nombre::VARCHAR,
        ub.id_rol::INTEGER,
        ub.tipo_cliente_val::VARCHAR,
        COALESCE(
            (ub.cn).nacionalidad || '-' || (ub.cn).ci,
            (ub.cj).naturaleza_rif || '-' || (ub.cj).rif
        )::VARCHAR,
        COALESCE(
            (ub.cn).dirección,
            (ub.cj).dirección
        )::VARCHAR,
        (ub.cj).dirección_fiscal::VARCHAR
    FROM user_base ub;
END;
$$;
