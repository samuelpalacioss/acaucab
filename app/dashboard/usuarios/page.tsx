import UsuariosClient from "@/components/usuarios/usuarios-client";

/**
 * Página de gestión de usuarios (Server Component)
 *
 * Este componente servidor puede realizar operaciones del servidor
 * como autenticación, permisos y fetch de datos de usuarios antes
 * de pasar la información al componente cliente.
 */
export default async function UsuariosPage() {
  return (
    <main id="usuarios-page" className="min-h-screen">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        de la gestión de usuarios y las interacciones del administrador 
      */}
      <UsuariosClient />
    </main>
  );
}
