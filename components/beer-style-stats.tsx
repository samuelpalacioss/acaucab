"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beer } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface BeerStyleStatsProps {
  data: {
    estilo_cerveza: string;
    total_vendido: number;
  }[];
  isLoading?: boolean;
}

/**
 * Componente para mostrar un gráfico de barras con las ventas por estilo de cerveza.
 */
export function BeerStyleStats({ data, isLoading = false }: BeerStyleStatsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cargando estadísticas...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-md"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Alert>
        <Beer className="h-4 w-4" />
        <AlertTitle>Sin Datos</AlertTitle>
        <AlertDescription>
          No se encontraron datos de ventas por estilo de cerveza para mostrar.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
            <Beer className="w-5 h-5 text-amber-500" />
            <span>Ventas Totales por Estilo de Cerveza</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart 
            data={data} 
            margin={{ top: 5, right: 30, left: 20, bottom: 100 }}
            barSize={60}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="estilo_cerveza" 
              angle={-45} 
              textAnchor="end" 
              interval={0}
              height={50}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              label={{ value: 'Unidades Vendidas', angle: -90, position: 'insideLeft', offset: -10 }}
              tick={{ fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.5rem"
              }}
              labelStyle={{ fontWeight: 'bold' }}
              formatter={(value, name) => [`${value} unidades`, 'Total Vendido']}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
            <Bar 
              dataKey="total_vendido" 
              fill="hsl(var(--primary))" 
              name="Unidades Vendidas" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 