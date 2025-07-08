"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { obtenerTicketPromedioAction } from "@/lib/server-actions";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface AverageTicketStatsProps {
  initialAverageTicket: number;
}

/**
 * Componente para mostrar la estadística de Ticket Promedio.
 */
export function AverageTicketStats({ initialAverageTicket }: AverageTicketStatsProps) {
  const [avgTicket, setAvgTicket] = useState<number>(initialAverageTicket);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(null);
      const resultado = await obtenerTicketPromedioAction();
      setAvgTicket(resultado);
    } catch (err: any) {
      console.error("Error al cargar ticket promedio:", err);
      setError(err.message || "Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Ticket Promedio</CardTitle>
        <Button onClick={cargarDatos} disabled={loading} size="sm">
          {loading ? "Actualizando..." : "Actualizar"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-500">
          <p>
            • Representa el valor monetario promedio de cada transacción completada en todas las tiendas.
          </p>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="pt-4">
          {loading ? (
            <Skeleton className="h-12 w-48" />
          ) : (
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold text-gray-800">
                {new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'VES' }).format(avgTicket)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 