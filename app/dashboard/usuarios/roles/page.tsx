import RolesClient from "@/components/usuarios/roles-client";
import { llamarFuncion } from "@/lib/server-actions";
import { Rol, PermisoSistema } from "@/models/roles";
import ProtectedRoute from "@/components/auth/protected-route";

/**
 * Página de gestión de roles (Server Component)
 */
export default async function RolesPage() {
  /**
   * Obtener los roles desde la base de datos usando la función fn_get_roles
   */
  const roles = await llamarFuncion<Rol>("fn_get_roles");

  /**
   * Obtener los permisos disponibles desde la base de datos usando la función fn_get_permisos
   */
  const permisos = await llamarFuncion<PermisoSistema>("fn_get_permisos");

  return (
    <ProtectedRoute requiredPermissions={["leer_rol", "leer_permiso"]} redirectTo="/unauthorized">
      <main id="roles-page" className="min-h-screen">
        {/* 
        Componente cliente que maneja toda la interfaz de usuario
        de la gestión de roles y las interacciones del formulario 
      */}
        <RolesClient roles={roles} permisos={permisos} />
      </main>
    </ProtectedRoute>
  );
}
