/**
 * @name fn_update_user_role
 * @description Actualiza el rol de un usuario empleado.
 * @param p_id_usuario - ID del usuario a actualizar.
 * @param p_id_nuevo_rol - ID del nuevo rol a asignar.
 * @returns BOOLEAN - Verdadero si la actualización fue exitosa, falso en caso contrario.
 * @throws EXCEPTION - Si el usuario no es un empleado o si el rol de destino no está permitido.
 */
CREATE OR REPLACE FUNCTION fn_update_user_role(
    p_id_usuario INT,
    p_id_nuevo_rol INT
)
RETURNS BOOLEAN AS $$
DECLARE
    v_is_employee BOOLEAN;
    v_new_role_name VARCHAR;
BEGIN
    /**
     * @dev Verifica si el usuario a modificar es un empleado.
     *      No se permite cambiar roles de clientes o miembros directamente.
     */
    SELECT EXISTS (SELECT 1 FROM empleado_usuario WHERE fk_usuario = p_id_usuario)
    INTO v_is_employee;

    IF NOT v_is_employee THEN
        RAISE EXCEPTION 'El usuario especificado no es un empleado. Solo se pueden modificar roles de empleados.';
    END IF;

    /**
     * @dev Obtiene el nombre del nuevo rol para validar si está permitido.
     */
    SELECT nombre INTO v_new_role_name
    FROM rol
    WHERE id = p_id_nuevo_rol;

    /**
     * @dev Valida que el nuevo rol no sea uno de los roles restringidos.
     *      No se puede asignar 'Cliente', 'Miembro' o 'Administrador' a través de esta función.
     */
    IF v_new_role_name IN ('Cliente', 'Miembro', 'Administrador') THEN
        RAISE EXCEPTION 'La asignación al rol (%) no está permitida para empleados.', v_new_role_name;
    END IF;

    /**
     * @dev Si todas las validaciones pasan, actualiza el rol del usuario.
     */
    UPDATE usuario
    SET fk_rol = p_id_nuevo_rol
    WHERE id = p_id_usuario;

    RETURN TRUE;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE EXCEPTION 'El rol con ID % no existe.', p_id_nuevo_rol;
        RETURN FALSE;
    WHEN OTHERS THEN
        RAISE NOTICE 'Ocurrió un error al actualizar el rol: %', SQLERRM;
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql;
