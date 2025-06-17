import RolesClient from "@/components/usuarios/roles-client";

/**
 * Página de gestión de roles (Server Component)
 *
 * Este componente servidor puede realizar operaciones del servidor como:
 * - Verificación de permisos para gestionar roles
 * - Fetch de roles existentes desde la base de datos
 * - Obtención de permisos disponibles del sistema
 * - Validación de políticas de seguridad
 * - Auditoría de cambios en roles y permisos
 * - Preparación de datos para el componente cliente
 */
export default async function RolesPage() {
  return (
    <main id="roles-page" className="min-h-screen">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        de la gestión de roles y las interacciones del formulario 
      */}
      <RolesClient />
    </main>
  );
}
