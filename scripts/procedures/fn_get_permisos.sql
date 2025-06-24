/**
 * @name fn_get_permisos
 * @description Obtiene todos los permisos del sistema con información adicional sobre su uso.
 * @returns TABLE - Una tabla con la información de los permisos.
 *          id: Identificador único del permiso.
 *          nombre: Nombre del permiso.
 *          descripcion: Descripción detallada del permiso.
 *          cantidad_roles: Número de roles que tienen asignado este permiso.
 */
CREATE OR REPLACE FUNCTION fn_get_permisos()
RETURNS TABLE (
    id INT,
    nombre VARCHAR,
    descripcion VARCHAR,
    cantidad_roles BIGINT
) AS $$
BEGIN
    /**
     * @dev Realiza una consulta a la tabla 'permiso' y utiliza una subconsulta
     *      para contar la cantidad de roles que tienen cada permiso asignado.
     */
    RETURN QUERY
    SELECT
        p.id,
        p.nombre,
        p.descripción AS descripcion,
        (SELECT COUNT(*) FROM permiso_rol pr WHERE pr.fk_permiso = p.id) AS cantidad_roles
    FROM
        permiso p
    ORDER BY
        p.id DESC;
END;
$$ LANGUAGE plpgsql;
