/**
 * @name fn_update_user_role
 * @description Actualiza el rol de cualquier usuario del sistema.
 * @param p_id_usuario - ID del usuario a actualizar.
 * @param p_id_nuevo_rol - ID del nuevo rol a asignar.
 * @returns BOOLEAN - Verdadero si la actualización fue exitosa, falso en caso contrario.
 * @throws EXCEPTION - Si el rol de destino no está permitido.
 */
CREATE OR REPLACE FUNCTION fn_update_user_role(
    p_id_usuario INT,
    p_id_nuevo_rol INT
)
RETURNS BOOLEAN AS $$
DECLARE
    v_new_role_name VARCHAR;
BEGIN
    /**
     * @dev Obtiene el nombre del nuevo rol para validar si está permitido.
     */
    SELECT nombre INTO v_new_role_name
    FROM rol
    WHERE id = p_id_nuevo_rol;
    /**
     * @dev Si todas las validaciones pasan, actualiza el rol del usuario.
     */
    UPDATE usuario
    SET fk_rol = p_id_nuevo_rol
    WHERE id = p_id_usuario;

    RETURN TRUE;

EXCEPTION
    WHEN no_data_found THEN
        RAISE EXCEPTION 'El rol con ID % no existe.', p_id_nuevo_rol;
    WHEN check_violation THEN
        RAISE EXCEPTION '%', SQLERRM;
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Ocurrió un error inesperado al actualizar el rol: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
