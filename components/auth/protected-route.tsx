"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, usePermissions } from "@/store/user-store";

/**
 * Props para el componente ProtectedRoute
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Permisos requeridos (al menos uno debe coincidir) */
  requiredPermissions?: string[];
  /** Sección específica del dashboard */
  requiredSection?: 'usuarios' | 'ventas' | 'compras' | 'inventario' | 'reportes' | 'eventos';
  /** Usar validación de acceso al dashboard */
  requireDashboardAccess?: boolean;
  /** Página de redirección si no tiene permisos */
  redirectTo?: string;
  /** Mensaje de error personalizado */
  fallback?: React.ReactNode;
}

/**
 * Componente para proteger rutas basado en permisos del usuario
 * Redirige al login si no está autenticado o muestra mensaje si no tiene permisos
 */
export default function ProtectedRoute({
  children,
  requiredPermissions = [],
  requiredSection,
  requireDashboardAccess = false,
  redirectTo = "/login",
  fallback
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, _hasHydrated } = useUser();
  const { tieneAlgunPermiso, tieneAccesoSeccion, tieneAccesoDashboard } = usePermissions();

  useEffect(() => {
    if (!_hasHydrated) {
      return; // No hacer nada hasta que el store esté hidratado
    }

    /** Si no está cargando y no está autenticado, redirigir al login */
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    /** Si está autenticado pero no tiene acceso al dashboard, redirigir a homepage */
    if (isAuthenticated && !tieneAccesoDashboard()) {
      router.push("/");
      return;
    }

    /** Verificar acceso al dashboard si se requiere */
    if (isAuthenticated && requireDashboardAccess) {
      if (!tieneAccesoDashboard()) {
        router.push("/");
        return;
      }
    }

    /** Verificar permisos específicos si se proporcionan */
    if (isAuthenticated && requiredPermissions.length > 0) {
      if (!tieneAlgunPermiso(requiredPermissions)) {
        router.push("/unauthorized");
        return;
      }
    }

    /** Verificar acceso a sección específica si se proporciona */
    if (isAuthenticated && requiredSection) {
      if (!tieneAccesoSeccion(requiredSection)) {
        router.push("/unauthorized");
        return;
      }
    }
  }, [isAuthenticated, isLoading, _hasHydrated, router, requiredPermissions, requiredSection, requireDashboardAccess, redirectTo, tieneAlgunPermiso, tieneAccesoSeccion, tieneAccesoDashboard]);

  /** Mostrar loading mientras se hidrata o verifica la autenticación */
  if (!_hasHydrated || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  /** Si no está autenticado (y ya se hidrató), no mostrar nada (se redirigirá) */
  if (!isAuthenticated) {
    return null;
  }

  /** Verificar permisos específicos */
  if (requiredPermissions.length > 0 && !tieneAlgunPermiso(requiredPermissions)) {
    return fallback || (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceso Denegado</h2>
        <p className="text-gray-600 text-center">
          No tienes los permisos necesarios para acceder a esta página.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Permisos requeridos: {requiredPermissions.join(", ")}
        </p>
      </div>
    );
  }

  /** Verificar acceso a sección específica */
  if (requiredSection && !tieneAccesoSeccion(requiredSection)) {
    return fallback || (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceso Denegado</h2>
        <p className="text-gray-600 text-center">
          No tienes acceso a la sección "{requiredSection}".
        </p>
      </div>
    );
  }

  /** Si tiene todos los permisos, mostrar el contenido */
  return <>{children}</>;
} 