import DashboardClient from "@/components/dashboard/dashboard-client";
import ProtectedRoute from "@/components/auth/protected-route";


/**
 * Página principal del dashboard (Server Component)
 * Protegida para usuarios autenticados únicamente
 */
export default async function DashboardPage() {
  return (
    <ProtectedRoute>
      <main id="dashboard-page" className="min-h-screen">
        {/* 
          Componente cliente que maneja toda la interfaz de usuario
          y las interacciones del dashboard 
        */}
        <DashboardClient />
      </main>
    </ProtectedRoute>
  );
}
