import { obtenerEstadisticasVentasPorEmpleado, obtenerTasaRupturaGlobal } from "@/lib/server-actions";
import { EmpleadoStatsDashboard } from "@/components/empleado-stats-dashboard";
import { StockRuptureStats } from "@/components/stock-rupture-stats";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, BarChart3, Users, Package } from "lucide-react";
import { EmpleadoStat } from "@/models/empleado-stats";

/**
 * Página de estadísticas financieras (Server Component)
 * Muestra estadísticas divididas por secciones: empleados y productos
 */
export default async function EstadisticasFinancierasPage() {
  let stats: EmpleadoStat[] = [];
  let stockRuptureData: any[] = [];
  let error: string | null = null;

  try {
    // Obtener estadísticas directamente en el servidor
    const [empleadoStats, stockStats] = await Promise.all([
      obtenerEstadisticasVentasPorEmpleado(),
      obtenerTasaRupturaGlobal()
    ]);
    
    stats = empleadoStats;
    stockRuptureData = stockStats;
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
            <p className="text-gray-600">Análisis de rendimiento y ventas por empleado y productos</p>
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
            <span>Empleados</span>
          </TabsTrigger>
          <TabsTrigger value="productos" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Productos</span>
          </TabsTrigger>
        </TabsList>

        {/** Sección de estadísticas de empleados */}
        <TabsContent value="empleados" className="space-y-6">
          <EmpleadoStatsDashboard stats={stats} isLoading={false} />
        </TabsContent>

        {/** Sección de estadísticas de productos - Tasa de Ruptura de Stock */}
        <TabsContent value="productos" className="space-y-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Análisis de Ruptura de Stock</h2>
                <p className="text-gray-600">Monitoreo de frecuencia de rupturas de stock y oportunidades perdidas</p>
              </div>
            </div>
          </div>
          
          <StockRuptureStats data={stockRuptureData} isLoading={false} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
