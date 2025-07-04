import { obtenerEstadisticasVentasPorEmpleado } from "@/lib/server-actions";
import { EmpleadoStatsDashboard } from "@/components/empleado-stats-dashboard";
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
  let error: string | null = null;

  try {
    // Obtener estadísticas directamente en el servidor
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

        {/** Sección de estadísticas de productos (placeholder) */}
        <TabsContent value="productos" className="space-y-6">
          <Card className="border-dashed border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-600">
                <Package className="w-5 h-5" />
                <span>Estadísticas de Productos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Sección en Desarrollo</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Las estadísticas de productos estarán disponibles próximamente. Aquí podrás ver métricas de
                  rendimiento por producto, categorías más vendidas y análisis de inventario.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
