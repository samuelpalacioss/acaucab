import NuevoUsuarioClient from "@/components/usuarios/nuevo-usuario-client";
import { llamarFuncion } from "@/lib/server-actions";
import { PersonaSinUsuario } from "@/models/users";
import { Rol } from "@/models/roles";

/**
 * Página de creación de nuevo usuario (Server Component)
 *
 * Este componente servidor puede realizar operaciones del servidor
 * como autenticación, permisos, fetch de personas disponibles y roles
 * antes de pasar la información al componente cliente.
 */
export default async function NuevoUsuarioPage() {
  let personasDisponibles: PersonaSinUsuario[] = [];
  let rolesDisponibles: Rol[] = [];

  try {
    // Obtener personas sin usuario
    const personas = await llamarFuncion('fn_get_personas');
    personasDisponibles = personas || [];

    // Obtener roles disponibles
    const roles = await llamarFuncion('fn_get_roles');
    rolesDisponibles = roles || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    // TODO: Manejar el error, tal vez mostrar un mensaje al usuario
  }

  return (
    <main id="nuevo-usuario-page" className="min-h-screen">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        de la creación de usuarios y las interacciones del formulario 
      */}
      <NuevoUsuarioClient 
        personasDisponibles={personasDisponibles}
        roles={rolesDisponibles}
      />
    </main>
  );
}
