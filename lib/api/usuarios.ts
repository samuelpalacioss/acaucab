'use server';

import { RolDetalle } from "@/models/roles";
import { llamarFuncion, llamarFuncionSingle } from "@/lib/server-actions";

/**
 * Obtiene los permisos y detalles de un rol por su ID.
 * @param roleId - El ID del rol.
 * @returns RolDetalle[] - Array con los detalles del rol
 */
export async function getRoleById(roleId: number): Promise<RolDetalle[]> {
  const rolePermissions = await llamarFuncion(
    'fn_get_role_by_id',
    { p_id: roleId }
  );

  return (rolePermissions as RolDetalle[]) || [];
}

/**
 * Actualiza el rol de un usuario.
 * @param userId - El ID del usuario.
 * @param newRole - El nuevo rol a asignar.
 */
export async function updateUserRole(userId: number, newRole: string): Promise<void> {
    await llamarFuncion("fn_update_user_role", {
        p_usuario_id: userId,
        p_rol_id: newRole,
    });
}

/**
 * Elimina un usuario y todas sus relaciones dependientes.
 * @param p_usuario_id - El ID del usuario que se va a eliminar.
 */
export async function deleteUser(p_usuario_id: number): Promise<void> {
    try {
      await llamarFuncion('fn_delete_usuario', { p_usuario_id })
      console.log(`Usuario con ID ${p_usuario_id} eliminado exitosamente.`)
    } catch (error) {
      console.error(`Error al eliminar el usuario:`, error)
      throw new Error('Ocurrió un error al intentar eliminar el usuario.')
    }
}

/**
 * Obtiene los puntos de un usuario.
 * @param p_id_usuario - El ID del usuario para el cual se quieren obtener los puntos.
 * @returns number - El número de puntos del usuario (0 si no se encuentra).
 */
export async function getPuntos(p_id_usuario: number): Promise<number> {
    try {
      const response = await llamarFuncion('fn_get_puntos', { p_id_usuario })
      
      // La función fn_get_puntos devuelve directamente un INTEGER, no un array.
      if (response !== null && typeof response === 'number') {
        return response
      }
      
      return 0

    } catch (error) {
      console.error(`Error al obtener los puntos:`, error)
      throw new Error('Ocurrió un error al intentar obtener los puntos del usuario.')
    }
}

