/**
 * Función: fn_delete_role
 * Propósito: Eliminar un rol del sistema.
 *
 * Parámetros:
 *   p_id: El ID del rol a eliminar.
 *
 * Comportamiento:
 *   1. Verifica si algún usuario tiene asignado el rol. Si es así, lanza una excepción
 *      para prevenir la eliminación y mantener la integridad de los datos, ya que
 *      un usuario no puede existir sin un rol.
 *   2. Si no hay usuarios asignados, elimina todas las asociaciones de permisos
 *      para ese rol en la tabla `permiso_rol`.
 *   3. Finalmente, elimina el rol de la tabla `rol`.
 *   4. Incluye manejo de errores para notificar cualquier problema durante el proceso.
 */
CREATE OR REPLACE FUNCTION fn_delete_role(p_id INTEGER)
RETURNS VOID AS $$
BEGIN
    -- Verificar si el rol está en uso por algún usuario
    IF EXISTS (SELECT 1 FROM usuario WHERE fk_rol = p_id) THEN
        RAISE EXCEPTION 'El rol está asignado a uno o más usuarios y no puede ser eliminado.';
    END IF;

    -- Eliminar las relaciones del rol en permiso_rol
    DELETE FROM permiso_rol WHERE fk_rol = p_id;

    -- Eliminar el rol
    DELETE FROM rol WHERE id = p_id;

EXCEPTION
    WHEN OTHERS THEN
        -- Manejo de cualquier otro error
        RAISE NOTICE 'Error al eliminar el rol: %', SQLERRM;
        RAISE;
END;
$$ LANGUAGE plpgsql;
