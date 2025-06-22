CREATE OR REPLACE FUNCTION fn_delete_usuario(p_usuario_id INTEGER)
RETURNS VOID AS $$
/**
 * Función para eliminar un usuario y sus relaciones dependientes.
 *
 * @param p_usuario_id El ID del usuario a eliminar.
 *
 * @dev Esta función elimina las referencias al usuario en las tablas
 *      de relación `empleado_usuario`, `cliente_usuario` y `miembro_usuario`.
 *      Posteriormente, elimina al usuario de la tabla `usuario` y, finalmente,
 *      elimina el correo electrónico asociado de la tabla `correo`.
 *      Se asume que el correo electrónico del usuario es exclusivo para ese usuario.
 */
DECLARE
    v_correo_id INTEGER;
BEGIN
    -- Eliminar relaciones del usuario en otras tablas
    DELETE FROM empleado_usuario WHERE fk_usuario = p_usuario_id;
    DELETE FROM cliente_usuario WHERE fk_usuario = p_usuario_id;
    DELETE FROM miembro_usuario WHERE fk_usuario = p_usuario_id;

    -- Obtener el ID del correo antes de eliminar el usuario
    SELECT fk_correo INTO v_correo_id FROM usuario WHERE id = p_usuario_id;

    -- Eliminar el usuario
    DELETE FROM usuario WHERE id = p_usuario_id;

    -- Eliminar el correo asociado si existe
    IF v_correo_id IS NOT NULL THEN
        DELETE FROM correo WHERE id = v_correo_id;
    END IF;

END;
$$ LANGUAGE plpgsql;
