import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Trophy, Target } from "lucide-react";
import { EmpleadoStatsCard } from "./empleado-stats-card";
import { EmpleadoStat } from "@/models/empleado-stats";

interface EmpleadoStatsDashboardProps {
  stats: EmpleadoStat[];
  isLoading?: boolean;
}

/**
 * Dashboard principal que muestra estadísticas de ventas por empleado
 * Incluye resumen general y tarjetas individuales de empleados
 */
export function EmpleadoStatsDashboard({ stats, isLoading }: EmpleadoStatsDashboardProps) {
  // Calcular métricas de resumen
  const totalEmpleados = stats.length;
  const totalVentas = stats.reduce((sum, emp) => sum + emp.total_ventas, 0);
  const promedioVentas = totalEmpleados > 0 ? Math.round(totalVentas / totalEmpleados) : 0;
  const mejorEmpleado = stats.length > 0 ? stats[0] : null;

  return (
    <div className="space-y-6">
      {/** Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Empleados</p>
                <p className="text-2xl font-bold text-blue-700">{totalEmpleados}</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-full">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Ventas</p>
                <p className="text-2xl font-bold text-green-700">{totalVentas.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-500 rounded-full">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Promedio Ventas</p>
                <p className="text-2xl font-bold text-purple-700">{promedioVentas.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-500 rounded-full">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Mejor Empleado</p>
                <p className="text-lg font-bold text-yellow-700 truncate">
                  {mejorEmpleado ? mejorEmpleado.nombre_empleado.split(" ")[0] : "N/A"}
                </p>
                {mejorEmpleado && (
                  <p className="text-sm text-yellow-600">{mejorEmpleado.total_ventas.toLocaleString()} ventas</p>
                )}
              </div>
              <div className="p-3 bg-yellow-500 rounded-full">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/** Título de la sección */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Ranking de Empleados</h2>
          <p className="text-gray-600 mt-1">Estadísticas de ventas por empleado ordenadas por rendimiento</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {totalEmpleados} empleados activos
        </Badge>
      </div>

      {/** Componente de tarjetas de empleados */}
      <EmpleadoStatsCard stats={stats} isLoading={isLoading} />
    </div>
  );
}
