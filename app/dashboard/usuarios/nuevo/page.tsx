import NuevoUsuarioClient from "@/components/usuarios/nuevo-usuario-client";

/**
 * Página de creación de nuevo usuario (Server Component)
 *
 * Este componente servidor puede realizar operaciones del servidor
 * como autenticación, permisos, fetch de personas disponibles y roles
 * antes de pasar la información al componente cliente.
 */
export default async function NuevoUsuarioPage() {
  return (
    <main id="nuevo-usuario-page" className="min-h-screen">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        de la creación de usuarios y las interacciones del formulario 
      */}
      <NuevoUsuarioClient />
    </main>
  );
}
