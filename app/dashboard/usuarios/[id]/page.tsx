import UsuarioDetalleClient from "@/components/usuarios/usuario-detalle-client";
import { llamarFuncionSingle, llamarFuncion } from "@/lib/server-actions";
import { UserDetail } from "@/models/users";
import { RolDetalle } from "@/models/roles";

/**
 * Página de detalle de usuario (Server Component)
 *
 * Este componente servidor puede realizar operaciones del servidor
 * como autenticación, permisos, validación de existencia del usuario
 * y fetch de datos específicos antes de pasar la información al componente cliente.
 */
export default async function UsuarioDetallePage({ params }: { params: { id: string } }) {
  /**
   * Obtenemos los datos del usuario desde PostgreSQL
   */
  const userData = await llamarFuncionSingle<UserDetail>('fn_get_user_by_id', {
    p_user_id: parseInt(params.id)
  });

  /**
   * Si el usuario es empleado, obtenemos sus permisos
   */
  let userPermissions: RolDetalle[] = [];
    const roleData = await llamarFuncion<RolDetalle>('fn_get_role_by_id', {
      p_id: userData?.id_rol || 0
    });
    userPermissions = roleData || [];

  return (
    <main id="usuario-detalle-page" className="min-h-screen">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        del detalle del usuario y las interacciones de edición 
      */}
      <UsuarioDetalleClient 
        userId={params.id} 
        userData={userData}
        userPermissions={userPermissions}
      />
    </main>
  );
}
