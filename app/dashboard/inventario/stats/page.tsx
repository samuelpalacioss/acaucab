import { obtenerTasaRupturaGlobal, obtenerRotacionInventario } from "@/lib/server-actions";
import { StockRuptureStats } from "@/components/stock-rupture-stats";
import { InventoryTurnoverStats } from "@/components/inventory-turnover-stats";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Package, TrendingDown, RotateCcw, BarChart3 } from "lucide-react";

/**
 * Página de estadísticas de inventario (Server Component)
 * Muestra estadísticas relacionadas con el inventario: ruptura de stock y rotación de inventario
 */
export default async function EstadisticasInventarioPage() {
  let stockRuptureData: any[] = [];
  let inventoryTurnoverValue: number = 0;
  let error: string | null = null;

  // Configurar período por defecto (último mes)
  const fechaFin = new Date();
  const fechaInicio = new Date();
  fechaInicio.setMonth(fechaInicio.getMonth() - 1);
  
  const fechaInicioStr = fechaInicio.toISOString().split('T')[0];
  const fechaFinStr = fechaFin.toISOString().split('T')[0];

  try {
    // Obtener estadísticas de inventario directamente en el servidor
    const [stockStats, turnoverValue] = await Promise.all([
      obtenerTasaRupturaGlobal(),
      obtenerRotacionInventario(fechaInicioStr, fechaFinStr)
    ]);
    
    stockRuptureData = stockStats;
    inventoryTurnoverValue = turnoverValue;
  } catch (err: any) {
    console.error("Error al cargar estadísticas de inventario:", err);
    error = err.message || "Error al cargar las estadísticas de inventario";
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
          <div className="p-2 bg-orange-500 rounded-lg">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Estadísticas de Inventario</h1>
            <p className="text-gray-600">Análisis de ruptura de stock y rotación de inventario</p>
          </div>
        </div>

        {/** Indicador de última actualización */}
        <div className="text-sm text-gray-500">Última actualización: {new Date().toLocaleString("es-ES")}</div>
      </div>

      {/** Tabs para dividir las secciones */}
      <Tabs defaultValue="ruptura" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="ruptura" className="flex items-center space-x-2">
            <TrendingDown className="w-4 h-4" />
            <span>Ruptura de Stock</span>
          </TabsTrigger>
          <TabsTrigger value="rotacion" className="flex items-center space-x-2">
            <RotateCcw className="w-4 h-4" />
            <span>Rotación de Inventario</span>
          </TabsTrigger>
        </TabsList>

        {/** Sección de ruptura de stock */}
        <TabsContent value="ruptura" className="space-y-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-red-500 rounded-lg">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Análisis de Ruptura de Stock</h2>
                <p className="text-gray-600">Monitoreo de frecuencia de rupturas de stock y oportunidades perdidas</p>
              </div>
            </div>
          </div>
          
          <StockRuptureStats data={stockRuptureData} isLoading={false} />
        </TabsContent>

        {/** Sección de rotación de inventario */}
        <TabsContent value="rotacion" className="space-y-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-500 rounded-lg">
                <RotateCcw className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Rotación de Inventario</h2>
                <p className="text-gray-600">Análisis de la rapidez con que se vende y reemplaza el inventario</p>
              </div>
            </div>
          </div>
          
          <InventoryTurnoverStats 
            initialTurnoverValue={inventoryTurnoverValue}
            initialStartDate={fechaInicioStr}
            initialEndDate={fechaFinStr}
            initialLoading={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
