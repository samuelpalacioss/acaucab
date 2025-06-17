import UsuarioDetalleClient from "@/components/usuarios/usuario-detalle-client";

/**
 * Página de detalle de usuario (Server Component)
 *
 * Este componente servidor puede realizar operaciones del servidor
 * como autenticación, permisos, validación de existencia del usuario
 * y fetch de datos específicos antes de pasar la información al componente cliente.
 */
export default async function UsuarioDetallePage({ params }: { params: { id: string } }) {
  return (
    <main id="usuario-detalle-page" className="min-h-screen">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        del detalle del usuario y las interacciones de edición 
      */}
      <UsuarioDetalleClient userId={params.id} />
    </main>
  );
}
