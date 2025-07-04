"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, User, Building, Briefcase, Hash } from "lucide-react";
import { EmpleadoStat } from "@/models/empleado-stats";

interface EmpleadoStatsProps {
  stats: EmpleadoStat[];
  isLoading?: boolean;
}

/**
 * Componente para mostrar estadísticas de ventas por empleado
 * Muestra información detallada de cada empleado con sus ventas
 */
export function EmpleadoStatsCard({ stats, isLoading }: EmpleadoStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-white">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats || stats.length === 0) {
    return (
      <Card className="bg-white">
        <CardContent className="p-8 text-center">
          <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No se encontraron estadísticas de empleados</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((empleado, index) => {
        const iniciales = empleado.nombre_empleado
          .split(" ")
          .map((n) => n.charAt(0))
          .join("")
          .toUpperCase()
          .slice(0, 2);

        // Determinar el color del badge según el ranking
        const getBadgeColor = (index: number) => {
          if (index === 0) return "bg-yellow-500 text-white"; // Oro
          if (index === 1) return "bg-gray-400 text-white"; // Plata
          if (index === 2) return "bg-amber-600 text-white"; // Bronce
          return "bg-blue-500 text-white"; // Otros
        };

        return (
          <Card key={empleado.fk_empleado} className="bg-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-800">{empleado.nombre_empleado}</CardTitle>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Hash className="w-3 h-3 mr-1" />
                      {empleado.identificacion}
                    </p>
                  </div>
                </div>
                <Badge className={getBadgeColor(index)}>#{index + 1}</Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {/** Estadística principal de ventas */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total de Ventas</p>
                      <p className="text-2xl font-bold text-green-600 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-1" />
                        {empleado.total_ventas.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
