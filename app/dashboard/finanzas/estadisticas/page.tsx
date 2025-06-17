import EstadisticasFinancierasClient from "@/components/ventas/estadisticas-financieras-client";
/**
 * Página de estadísticas financieras (Server Component)
 *
 * Este componente servidor puede realizar operaciones del servidor
 * como autenticación, permisos y fetch de datos antes de pasar
 * la información al componente cliente.
 */
export default async function EstadisticasFinancierasPage() {
  return (
    <main id="estadisticas-financieras-page" className="min-h-screen">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        de las estadísticas financieras y las interacciones del usuario 
      */}
      <EstadisticasFinancierasClient />
    </main>
  );
}
