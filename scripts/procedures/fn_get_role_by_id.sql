DROP FUNCTION IF EXISTS fn_get_role_by_id(INT);

CREATE OR REPLACE FUNCTION fn_get_role_by_id(p_id INT)
RETURNS TABLE (
    id INT,
    nombre VARCHAR,
    cantidad_usuarios BIGINT,
    permiso_id INT,
    permiso_nombre VARCHAR,
    permiso_descripcion VARCHAR
) AS $$
BEGIN
    /**
     * @dev Realiza una consulta a la tabla 'rol' y la une con las tablas de permisos
     *      para obtener todos los permisos de un rol.
     *      Usa un LEFT JOIN para asegurar que el rol se devuelva incluso si no tiene permisos.
     */
    RETURN QUERY
    SELECT
        r.id,
        r.nombre,
        (SELECT COUNT(*) FROM usuario u WHERE u.fk_rol = r.id) AS cantidad_usuarios,
        p.id AS permiso_id,
        p.nombre AS permiso_nombre,
        p.descripción AS permiso_descripcion
    FROM
        rol r
    LEFT JOIN permiso_rol pr ON r.id = pr.fk_rol
    LEFT JOIN permiso p ON pr.fk_permiso = p.id
    WHERE
        r.id = p_id;
END;
$$ LANGUAGE plpgsql;
