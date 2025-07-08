'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { TotalGeneradoTienda } from '@/models/stats';

interface StoreSalesStatsProps {
  data: TotalGeneradoTienda[];
  isLoading: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border rounded shadow-lg">
        <p className="font-bold">{label}</p>
        <p className="text-sm text-blue-500">{`Total Generado: $${Number(payload[0].value).toLocaleString('es-VE', { minimumFractionDigits: 2 })}`}</p>
        <p className="text-xs text-gray-500">{`Tipo: ${payload[0].payload.tipo_tienda}`}</p>
      </div>
    );
  }

  return null;
};

export function StoreSalesStats({ data, isLoading }: StoreSalesStatsProps) {
  if (isLoading) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ventas Totales por Tienda</CardTitle>
                <CardDescription>Comparación de ingresos entre tiendas físicas y la tienda web.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full flex items-center justify-center">
                    Cargando datos...
                </div>
            </CardContent>
        </Card>
    )
  }

  if (!data || data.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ventas Totales por Tienda</CardTitle>
                <CardDescription>Comparación de ingresos entre tiendas físicas y la tienda web.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full flex items-center justify-center">
                    No hay datos de ventas disponibles.
                </div>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas Totales por Tienda</CardTitle>
        <CardDescription>Comparación de ingresos entre tiendas físicas y la tienda web.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="tienda_nombre"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{paddingTop: '20px'}}/>
            <Bar dataKey="total_generado" fill="#1d4ed8" name="Total Generado (USD)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 