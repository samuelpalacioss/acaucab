/**
 * @name fn_get_role_by_id
 * @description Obtiene la información detallada de un rol específico, incluyendo sus permisos.
 *              Devuelve una fila por cada permiso asociado al rol.
 * @param p_id - El ID del rol a consultar.
 * @returns TABLE - Una tabla con los detalles del rol y sus permisos.
 *          id: Identificador único del rol.
 *          nombre: Nombre del rol.
 *          cantidad_usuarios: Número de usuarios asignados a ese rol.
 *          permiso_id: ID del permiso.
 *          permiso_nombre: Nombre del permiso.
 *          permiso_descripcion: Descripción del permiso.
 */
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
