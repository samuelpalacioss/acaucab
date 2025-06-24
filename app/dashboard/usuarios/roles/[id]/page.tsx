import EditarRolClient from "@/components/usuarios/editar-rol-client";
import { llamarFuncion } from "@/lib/server-actions";
import { RolDetalle, PermisoSistema, UsuarioPorRol } from "@/models/roles";
import { notFound } from "next/navigation";

/**
 * Página de edición de rol específico (Server Component)
 *
 * Este componente servidor puede realizar operaciones del servidor como:
 * - Verificación de permisos para editar roles
 * - Fetch del rol específico desde la base de datos
 * - Validación de existencia del rol
 * - Obtención de usuarios asignados al rol
 * - Verificación de políticas de seguridad
 * - Auditoría de acceso a edición de roles
 * - Preparación de datos para el componente cliente
 */
export default async function EditarRolePage({ params }: { params: { id: string } }) {
  /**
   * Obtener los detalles del rol incluyendo sus permisos
   */
  const roleDetails = await llamarFuncion<RolDetalle>('fn_get_role_by_id', { 
    p_id: parseInt(params.id) 
  });

  /**
   * Si no se encuentra el rol, mostrar página 404
   */
  if (!roleDetails || roleDetails.length === 0) {
    notFound();
  }

  /**
   * Obtener todos los permisos disponibles del sistema
   */
  const todosLosPermisos = await llamarFuncion<PermisoSistema>('fn_get_permisos');

  /**
   * Obtener los usuarios asignados a este rol
   */
  const usuariosDelRol = await llamarFuncion<UsuarioPorRol>('fn_get_users_by_role', {
    p_role_id: parseInt(params.id)
  });

  /**
   * Extraer información básica del rol (primera fila)
   */
  const rolInfo = {
    id: roleDetails[0].id,
    nombre: roleDetails[0].nombre,
    cantidad_usuarios: roleDetails[0].cantidad_usuarios,
    permisos_asignados: roleDetails
      .filter(row => row.permiso_id !== null)
      .map(row => ({
        id: row.permiso_id!,
        nombre: row.permiso_nombre!,
        descripcion: row.permiso_descripcion!
      }))
  };

  return (
    <main id="editar-rol-page" className="min-h-screen">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        de la edición de roles y las interacciones del formulario 
      */}
      <EditarRolClient 
        roleId={params.id}
        roleInfo={rolInfo}
        todosLosPermisos={todosLosPermisos}
        usuariosDelRol={usuariosDelRol}
      />
    </main>
  );
}
