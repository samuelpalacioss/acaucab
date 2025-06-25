DROP FUNCTION IF EXISTS fn_login (VARCHAR, VARCHAR);

CREATE OR REPLACE FUNCTION fn_login (
    p_email    VARCHAR,
    p_password VARCHAR
)
RETURNS TABLE (
  id_usuario INTEGER,
  direccion_correo VARCHAR,
  rol VARCHAR,
  nombre_usuario VARCHAR,
  permiso VARCHAR
)
language plpgsql
AS $$
DECLARE
    user_record RECORD;
BEGIN
    -- Primero, verificamos si el correo existe y obtenemos los datos del usuario
    SELECT u.*, c.dirección_correo
    INTO user_record
    FROM usuario u
    JOIN correo c ON u.fk_correo = c.id
    WHERE c.dirección_correo = p_email;

    -- Si no se encuentra ningún registro, el correo no existe.
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Correo no registrado.';
    END IF;

    -- Si el correo existe, pero la contraseña no coincide, lanzamos otro error.
    IF user_record.contraseña != p_password THEN
        RAISE EXCEPTION 'Contraseña incorrecta.';
    END IF;

    -- Si todo es correcto, devolvemos los datos del usuario y sus permisos.
    RETURN QUERY
    SELECT
        u.id::INTEGER,
        c.dirección_correo,
        r.nombre,
        coalesce(
            e.primer_nombre,
            cn.primer_nombre,
            cj.denominación_comercial,
            m.razón_social
        ),
        p.nombre
    FROM usuario u
    JOIN correo AS c ON u.fk_correo = c.id
    JOIN rol AS r ON u.fk_rol = r.id
    JOIN permiso_rol pr ON pr.fk_rol = r.id
    JOIN permiso p ON p.id = pr.fk_permiso
    LEFT JOIN empleado_usuario AS eu ON u.id = eu.fk_usuario
    LEFT JOIN empleado AS e ON eu.fk_empleado = e.id
    LEFT JOIN cliente_usuario AS cu ON u.id = cu.fk_usuario
    LEFT JOIN cliente_natural AS cn ON cn.id = cu.fk_cliente_natural
    LEFT JOIN cliente_juridico AS cj ON cj.id = cu.fk_cliente_juridico
    LEFT JOIN miembro_usuario AS mu ON mu.fk_usuario = u.id
    LEFT JOIN miembro m ON mu.fk_miembro_1 = m.rif AND mu.fk_miembro_2 = m.naturaleza_rif
    WHERE c.dirección_correo = p_email AND u.contraseña = p_password;
END;
$$;