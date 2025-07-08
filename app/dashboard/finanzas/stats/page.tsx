import { 
  obtenerEstadisticasVentasPorEmpleado,
  obtenerVentasPorEstilo,
  obtenerVolumenDeVentas,
  obtenerTotalGeneradoPorTienda,
  obtenerTicketPromedio,
  obtenerCrecimientoVentas
} from "@/lib/server-actions";
import { EmpleadoStatsDashboard } from "@/components/empleado-stats-dashboard";
import { CustomerRetentionStats } from "@/components/customer-retention-stats";
import { NewCustomersStats } from "@/components/new-customers-stats";
import { BeerStyleStats } from "@/components/beer-style-stats";
import { SalesVolumeStats } from "@/components/sales-volume-stats";
import { StoreSalesStats } from "@/components/store-sales-stats";
import { AverageTicketStats } from "@/components/average-ticket-stats";
import { SalesGrowthStats } from "@/components/sales-growth-stats";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, BarChart3, Users, TrendingUp, UserPlus, Beer, Package, Store, DollarSign, LineChart } from "lucide-react";
import { EmpleadoStat } from "@/models/empleado-stats";
import { TotalGeneradoTienda, SalesGrowthData } from "@/models/stats";
import ProtectedRoute from "@/components/auth/protected-route";

/**
 * Página de estadísticas financieras (Server Component)
 * Muestra diversas métricas de rendimiento del negocio.
 */
export default async function EstadisticasFinancierasPage() {
  let stats: EmpleadoStat[] = [];
  let beerStyleStats: { estilo_cerveza: string; total_vendido: number }[] = [];
  let salesVolume: number = 0;
  let storeSalesStats: TotalGeneradoTienda[] = [];
  let averageTicket: number = 0;
  let salesGrowthData: SalesGrowthData[] = [];
  let error: string | null = null;

  // Configurar período por defecto (último mes)
  const fechaFin = new Date();
  const fechaInicio = new Date();
  fechaInicio.setMonth(fechaInicio.getMonth() - 1);
  
  const fechaInicioStr = fechaInicio.toISOString().split('T')[0];
  const fechaFinStr = fechaFin.toISOString().split('T')[0];

  try {
    // Obtener todas las estadísticas en paralelo
    const [empleadoStats, styleStats, volumeData, storeSalesData, ticketData, growthData] = await Promise.all([
      obtenerEstadisticasVentasPorEmpleado(),
      obtenerVentasPorEstilo(),
      obtenerVolumenDeVentas(fechaInicioStr, fechaFinStr),
      obtenerTotalGeneradoPorTienda(),
      obtenerTicketPromedio(),
      obtenerCrecimientoVentas(fechaFinStr, 'mensual')
    ]);
    
    stats = empleadoStats;
    beerStyleStats = styleStats;
    salesVolume = volumeData;
    storeSalesStats = storeSalesData;
    averageTicket = ticketData;
    salesGrowthData = growthData;

  } catch (err: any) {
    console.error("Error al cargar estadísticas:", err);
    error = err.message || "Error al cargar las estadísticas";
  }

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
    <ProtectedRoute requiredPermissions={['leer_venta']}>
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
        <TabsList className="grid w-full grid-cols-8 mb-6">
          <TabsTrigger value="empleados" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Empleados</span>
          </TabsTrigger>
          <TabsTrigger value="retencion" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Retención</span>
          </TabsTrigger>
          <TabsTrigger value="adquisicion" className="flex items-center space-x-2">
            <UserPlus className="w-4 h-4" />
            <span>Adquisición</span>
          </TabsTrigger>
          <TabsTrigger value="estilos" className="flex items-center space-x-2">
            <Beer className="w-4 h-4" />
            <span>Estilos</span>
          </TabsTrigger>
          <TabsTrigger value="volumen" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Volumen</span>
          </TabsTrigger>
          <TabsTrigger value="tiendas" className="flex items-center space-x-2">
            <Store className="w-4 h-4" />
            <span>Tiendas</span>
          </TabsTrigger>
          <TabsTrigger value="ticket" className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4" />
            <span>Ticket</span>
          </TabsTrigger>
          <TabsTrigger value="crecimiento" className="flex items-center space-x-2">
            <LineChart className="w-4 h-4" />
            <span>Crecimiento</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="empleados"> <EmpleadoStatsDashboard stats={stats} isLoading={false} /> </TabsContent>
        <TabsContent value="retencion"> <CustomerRetentionStats /> </TabsContent>
        <TabsContent value="adquisicion"> <NewCustomersStats /> </TabsContent>
        <TabsContent value="estilos"> <BeerStyleStats data={beerStyleStats} isLoading={false} /> </TabsContent>
        <TabsContent value="volumen"> <SalesVolumeStats initialSalesVolume={salesVolume} initialStartDate={fechaInicioStr} initialEndDate={fechaFinStr} /> </TabsContent>
        <TabsContent value="tiendas"> <StoreSalesStats data={storeSalesStats} isLoading={false} /> </TabsContent>
        <TabsContent value="ticket"> <AverageTicketStats initialAverageTicket={averageTicket} /> </TabsContent>
        
        {/** Sección de Crecimiento de Ventas */}
        <TabsContent value="crecimiento" className="space-y-6">
            <SalesGrowthStats 
                initialData={salesGrowthData}
                initialDate={fechaFinStr}
                initialComparison='mensual'
            />
        </TabsContent>
      </Tabs>
    </div>
    </ProtectedRoute>
  );
}
