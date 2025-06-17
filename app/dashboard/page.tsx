import DashboardClient from "@/components/dashboard/dashboard-client";
/**
 * Página principal del dashboard (Server Component)
 *
 */
export default async function DashboardPage() {
  return (
    <main id="dashboard-page" className="min-h-screen">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        y las interacciones del dashboard 
      */}
      <DashboardClient />
    </main>
  );
}
