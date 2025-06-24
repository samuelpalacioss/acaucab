/**
 * create_permission
 *
 * Propósito: Crear un nuevo permiso en el sistema.
 *
 * Parámetros:
 *   - p_nombre (VARCHAR): El nombre del permiso (ej: 'ver_usuarios').
 *   - p_descripcion (VARCHAR): Una descripción detallada de lo que hace el permiso.
 *
 * Retorna:
 *   - INTEGER: El ID del permiso recién creado.
 */
CREATE OR REPLACE FUNCTION fn_create_permission(
    p_nombre VARCHAR(50),
    p_descripcion VARCHAR(255)
)
RETURNS INTEGER AS $$
DECLARE
    new_permission_id INTEGER;
BEGIN
    /**
     * Inserta el nuevo permiso en la tabla 'permiso'
     * y obtiene el ID generado para retornarlo.
     */
    INSERT INTO permiso (nombre, descripción)
    VALUES (p_nombre, p_descripcion)
    RETURNING id INTO new_permission_id;

    RETURN new_permission_id;
EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'Ya existe un permiso con el nombre ''%''.', p_nombre;
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error inesperado al crear el permiso: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
