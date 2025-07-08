import { 
  obtenerEstadisticasVentasPorEmpleado,
  obtenerVentasPorEstilo,
  obtenerVolumenDeVentas
} from "@/lib/server-actions";
import { EmpleadoStatsDashboard } from "@/components/empleado-stats-dashboard";
import { CustomerRetentionStats } from "@/components/customer-retention-stats";
import { NewCustomersStats } from "@/components/new-customers-stats";
import { BeerStyleStats } from "@/components/beer-style-stats";
import { SalesVolumeStats } from "@/components/sales-volume-stats";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, BarChart3, Users, TrendingUp, UserPlus, Beer, Package } from "lucide-react";
import { EmpleadoStat } from "@/models/empleado-stats";

/**
 * Página de estadísticas financieras (Server Component)
 * Muestra estadísticas de ventas por empleado y retención de clientes
 */
export default async function EstadisticasFinancierasPage() {
  let stats: EmpleadoStat[] = [];
  let beerStyleStats: { estilo_cerveza: string; total_vendido: number }[] = [];
  let salesVolume: number = 0;
  let error: string | null = null;

  // Configurar período por defecto (último mes)
  const fechaFin = new Date();
  const fechaInicio = new Date();
  fechaInicio.setMonth(fechaInicio.getMonth() - 1);
  
  const fechaInicioStr = fechaInicio.toISOString().split('T')[0];
  const fechaFinStr = fechaFin.toISOString().split('T')[0];

  try {
    // Obtener todas las estadísticas en paralelo
    const [empleadoStats, styleStats, volumeData] = await Promise.all([
      obtenerEstadisticasVentasPorEmpleado(),
      obtenerVentasPorEstilo(),
      obtenerVolumenDeVentas(fechaInicioStr, fechaFinStr)
    ]);
    
    stats = empleadoStats;
    beerStyleStats = styleStats;
    salesVolume = volumeData;
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
            <h1 className="text-3xl font-bold text-gray-800">Estadísticas Financieras y de Ventas</h1>
            <p className="text-gray-600">Análisis de rendimiento, clientes y productos</p>
          </div>
        </div>

        {/** Indicador de última actualización */}
        <div className="text-sm text-gray-500">Última actualización: {new Date().toLocaleString("es-ES")}</div>
      </div>

      {/** Tabs para dividir las secciones */}
      <Tabs defaultValue="empleados" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="empleados" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Rendimiento Empleados</span>
          </TabsTrigger>
          <TabsTrigger value="retencion" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Retención Clientes</span>
          </TabsTrigger>
          <TabsTrigger value="adquisicion" className="flex items-center space-x-2">
            <UserPlus className="w-4 h-4" />
            <span>Adquisición Clientes</span>
          </TabsTrigger>
          <TabsTrigger value="estilos" className="flex items-center space-x-2">
            <Beer className="w-4 h-4" />
            <span>Ventas por Estilo</span>
          </TabsTrigger>
          <TabsTrigger value="volumen" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Volumen de Ventas</span>
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
        <TabsContent value="retencion" className="space-y-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-purple-500 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Retención de Clientes</h2>
                <p className="text-gray-600">Análisis de la lealtad de los clientes</p>
              </div>
            </div>
          </div>
          
          <CustomerRetentionStats />
        </TabsContent>

        {/** Sección de adquisición de clientes */}
        <TabsContent value="adquisicion" className="space-y-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-indigo-500 rounded-lg">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Adquisición de Clientes</h2>
                <p className="text-gray-600">Análisis de clientes nuevos vs. recurrentes</p>
              </div>
            </div>
          </div>
          
          <NewCustomersStats />
        </TabsContent>
        
        {/** Sección de ventas por estilo */}
        <TabsContent value="estilos" className="space-y-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-amber-500 rounded-lg">
                <Beer className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Ventas por Estilo de Cerveza</h2>
                <p className="text-gray-600">Análisis de los estilos de cerveza más populares</p>
              </div>
            </div>
          </div>
          
          <BeerStyleStats data={beerStyleStats} isLoading={false} />
        </TabsContent>

        {/** Sección de volumen de ventas */}
        <TabsContent value="volumen" className="space-y-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-teal-500 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Volumen de Unidades Vendidas</h2>
                <p className="text-gray-600">Cantidad total de cervezas (botellas, latas, etc.) vendidas.</p>
              </div>
            </div>
          </div>
          
          <SalesVolumeStats 
            initialSalesVolume={salesVolume}
            initialStartDate={fechaInicioStr}
            initialEndDate={fechaFinStr}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
