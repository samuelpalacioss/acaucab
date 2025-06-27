DROP FUNCTION IF EXISTS fn_get_roles();

CREATE OR REPLACE FUNCTION fn_get_roles()
RETURNS TABLE (
    id INT,
    nombre VARCHAR,
    cantidad_usuarios BIGINT,
    cantidad_permisos BIGINT
) AS $$
BEGIN
    /**
     * @dev Realiza una consulta a la tabla 'rol' y utiliza subconsultas para contar
     *      los usuarios y permisos de cada rol.
     */
    RETURN QUERY
    SELECT
        r.id,
        r.nombre,
        (SELECT COUNT(*) FROM usuario u WHERE u.fk_rol = r.id) AS cantidad_usuarios,
        (SELECT COUNT(*) FROM permiso_rol pr WHERE pr.fk_rol = r.id) AS cantidad_permisos
    FROM
        rol r
    ORDER BY
        r.id DESC;
END;
$$ LANGUAGE plpgsql;
