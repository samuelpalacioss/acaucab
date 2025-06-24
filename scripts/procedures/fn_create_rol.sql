/**
 * create_rol
 *
 * Propósito: Crear un nuevo rol y asignarle un conjunto de permisos.
 *
 * Parámetros:
 *   - p_nombre (VARCHAR): El nombre del nuevo rol (ej: 'Administrador').
 *   - p_permission_ids (INTEGER[]): Un arreglo de IDs de los permisos que se asignarán al rol.
 *
 * Retorna:
 *   - INTEGER: El ID del rol recién creado.
 */
CREATE OR REPLACE FUNCTION fn_create_rol(
    p_nombre VARCHAR(50),
    p_permission_ids INTEGER[]
)
RETURNS INTEGER AS $$
DECLARE
    new_rol_id INTEGER;
    permission_id INTEGER;
BEGIN
    /**
     * Inserta el nuevo rol en la tabla 'rol'
     * y obtiene el ID generado.
     */
    INSERT INTO rol (nombre)
    VALUES (p_nombre)
    RETURNING id INTO new_rol_id;

    /**
     * Si se proporcionó una lista de IDs de permisos,
     * itera sobre ellos y los inserta en la tabla de relación 'permiso_rol'.
     */
    IF p_permission_ids IS NOT NULL AND array_length(p_permission_ids, 1) > 0 THEN
        FOREACH permission_id IN ARRAY p_permission_ids
        LOOP
            INSERT INTO permiso_rol (fk_rol, fk_permiso)
            VALUES (new_rol_id, permission_id);
        END LOOP;
    END IF;

    /**
     * Retorna el ID del nuevo rol creado.
     */
    RETURN new_rol_id;
EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'Ya existe un rol con el nombre ''%''.', p_nombre;
    WHEN foreign_key_violation THEN
        RAISE EXCEPTION 'Uno o más IDs de permisos no son válidos.';
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error inesperado al crear el rol: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
