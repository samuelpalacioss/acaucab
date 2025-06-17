import EditarRolClient from "@/components/usuarios/editar-rol-client";

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
  return (
    <main id="editar-rol-page" className="min-h-screen">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        de la edición de roles y las interacciones del formulario 
      */}
      <EditarRolClient roleId={params.id} />
    </main>
  );
}
