import { obtenerEstadisticasVentasPorEmpleado } from "@/lib/server-actions";
import { EmpleadoStatsDashboard } from "@/components/empleado-stats-dashboard";
import { CustomerRetentionStats } from "@/components/customer-retention-stats";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, BarChart3, Users, TrendingUp } from "lucide-react";
import { EmpleadoStat } from "@/models/empleado-stats";

/**
 * Página de estadísticas financieras (Server Component)
 * Muestra estadísticas de ventas por empleado y retención de clientes
 */
export default async function EstadisticasFinancierasPage() {
  let stats: EmpleadoStat[] = [];
  let error: string | null = null;

  try {
    // Obtener estadísticas de empleados directamente en el servidor
    stats = await obtenerEstadisticasVentasPorEmpleado();
  } catch (err: any) {
    console.error("Error al cargar estadísticas:", err);
    error = err.message || "Error al cargar las estadísticas";
  }

  // Mostrar error si existe
  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/** Encabezado de la página */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-500 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Estadísticas Financieras</h1>
            <p className="text-gray-600">Análisis de rendimiento de empleados y métricas de clientes</p>
          </div>
        </div>

        {/** Indicador de última actualización */}
        <div className="text-sm text-gray-500">Última actualización: {new Date().toLocaleString("es-ES")}</div>
      </div>

      {/** Tabs para dividir las secciones */}
      <Tabs defaultValue="empleados" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="empleados" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Rendimiento Empleados</span>
          </TabsTrigger>
          <TabsTrigger value="clientes" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Métricas de Clientes</span>
          </TabsTrigger>
        </TabsList>

        {/** Sección de estadísticas de empleados */}
        <TabsContent value="empleados" className="space-y-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-green-500 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Rendimiento por Empleado</h2>
                <p className="text-gray-600">Análisis de ventas y productividad del equipo</p>
              </div>
            </div>
          </div>
          
          <EmpleadoStatsDashboard stats={stats} isLoading={false} />
        </TabsContent>

        {/** Sección de retención de clientes */}
        <TabsContent value="clientes" className="space-y-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-purple-500 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Métricas de Clientes</h2>
                <p className="text-gray-600">Análisis de retención y comportamiento de clientes</p>
              </div>
            </div>
          </div>
          
          <CustomerRetentionStats />
        </TabsContent>
      </Tabs>
    </div>
  );
}
