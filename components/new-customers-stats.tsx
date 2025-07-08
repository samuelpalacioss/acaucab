"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, UserCheck } from "lucide-react";
import { obtenerNuevosClientesStatsAction } from "@/lib/server-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

type CustomerStats = {
  nuevos: number;
  recurrentes: number;
};

/**
 * Componente para mostrar estadísticas de clientes nuevos vs. recurrentes
 */
export function NewCustomersStats() {
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [stats, setStats] = useState<CustomerStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hoy = new Date();
    const hace30Dias = new Date();
    hace30Dias.setDate(hace30Dias.getDate() - 30);
    
    setFechaInicio(hace30Dias.toISOString().split('T')[0]);
    setFechaFin(hoy.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (fechaInicio && fechaFin) {
      cargarDatos();
    }
  }, [fechaInicio, fechaFin]);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const resultado = await obtenerNuevosClientesStatsAction(fechaInicio, fechaFin);
      setStats(resultado);
    } catch (err: any) {
      console.error("Error al cargar estadísticas de clientes:", err);
      setError(err.message || "Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  const handleFechaInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFechaInicio(e.target.value);
  };

  const handleFechaFinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFechaFin(e.target.value);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Clientes Nuevos vs. Recurrentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md border space-y-1">
          <p>
            • <strong>Nuevos:</strong> Clientes cuya primera compra fue dentro del período especificado.
          </p>
          <p>
            • <strong>Recurrentes:</strong> Clientes que compraron en el período pero su primera compra fue antes.
          </p>
        </div>
        {/* Date selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fecha-inicio-nuevos">Fecha de inicio</Label>
            <Input
              id="fecha-inicio-nuevos"
              type="date"
              value={fechaInicio}
              onChange={handleFechaInicioChange}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fecha-fin-nuevos">Fecha de fin</Label>
            <Input
              id="fecha-fin-nuevos"
              type="date"
              value={fechaFin}
              onChange={handleFechaFinChange}
              className="w-full"
            />
          </div>
        </div>

        <Button 
          onClick={cargarDatos} 
          disabled={loading || !fechaInicio || !fechaFin}
          className="w-full md:w-auto"
        >
          Actualizar datos
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            <>
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </>
          ) : stats !== null ? (
            <>
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="p-3 bg-green-500 rounded-lg">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Clientes Nuevos</p>
                  <p className="text-2xl font-bold">{stats.nuevos}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Clientes Recurrentes</p>
                  <p className="text-2xl font-bold">{stats.recurrentes}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Selecciona un rango de fechas para ver los datos.</p>
          )}
        </div>
        {stats && !loading && (
          <p className="text-xs text-gray-500 pt-2">
            Período: {new Date(fechaInicio).toLocaleDateString('es-ES')} - {new Date(fechaFin).toLocaleDateString('es-ES')}
          </p>
        )}
      </CardContent>
    </Card>
  );
} 