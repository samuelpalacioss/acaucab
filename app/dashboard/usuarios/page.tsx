import UsuariosClient from "@/components/usuarios/usuarios-client";
import { llamarFuncion } from "@/lib/server-actions";
import { Rol } from "@/models/roles";
import { User } from "@/models/users";

/**
 * Página de gestión de usuarios (Server Component)
 *
 * Este componente servidor puede realizar operaciones del servidor
 * como autenticación, permisos y fetch de datos de usuarios antes
 * de pasar la información al componente cliente.
 */

// Force dynamic rendering since this page uses cookies
export const dynamic = 'force-dynamic';

export default async function UsuariosPage() {
  /** 
   * Obtener usuarios desde la base de datos usando la función PostgreSQL
   * Tipos: User[] - Array de usuarios con información completa
   */
  let users: User[] = [];
  let roles: Rol[] = [];
  
  try {
    const [usersData, rolesData] = await Promise.all([
      llamarFuncion<User>("fn_get_users"),
      llamarFuncion<Rol>("fn_get_roles"),
    ]);
    users = usersData;
    roles = rolesData;
  } catch (error) {
    console.error("Error al obtener usuarios o roles:", error);
    // En caso de error, se mostrará una lista vacía
    users = [];
    roles = [];
  }

  return (
    <main id="usuarios-page" className="min-h-screen">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        de la gestión de usuarios y las interacciones del administrador 
        Ahora recibe los usuarios reales de la base de datos
      */}
      <UsuariosClient users={users} roles={roles} />
    </main>
  );
}
