import { llamarFuncion } from "@/lib/server-actions"

/**
 * Elimina un usuario y todas sus relaciones dependientes.
 * 
 * @param p_usuario_id - El ID del usuario que se va a eliminar.
 */
export async function deleteUser(p_usuario_id: number) {
    try {
      await llamarFuncion('fn_delete_usuario', { p_usuario_id })
      console.log(`Usuario con ID ${p_usuario_id} eliminado exitosamente.`)
      // Considera revalidar la ruta si es necesario para actualizar la UI
      // revalidatePath('/dashboard/usuarios')
    } catch (error) {
      console.error(`Error al eliminar el usuario:`, error)
      throw new Error('Ocurrió un error al intentar eliminar el usuario.')
    }
  }
   