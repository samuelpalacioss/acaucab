"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { obtenerRetencionClientesAction } from "@/lib/server-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Componente para mostrar estadísticas de retención de clientes
 * Permite seleccionar un rango de fechas y muestra el porcentaje de retención
 */
export function CustomerRetentionStats() {
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [retencion, setRetencion] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Establecer fechas por defecto (último mes)
   */
  useEffect(() => {
    const hoy = new Date();
    const hace30Dias = new Date();
    hace30Dias.setDate(hace30Dias.getDate() - 30);
    
    setFechaInicio(hace30Dias.toISOString().split('T')[0]);
    setFechaFin(hoy.toISOString().split('T')[0]);
  }, []);

  /**
   * Cargar datos de retención cuando se establecen las fechas iniciales
   */
  useEffect(() => {
    if (fechaInicio && fechaFin) {
      cargarDatosRetencion();
    }
  }, [fechaInicio, fechaFin]);

  /**
   * Función para cargar datos de retención de clientes
   */
  const cargarDatosRetencion = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const resultado = await obtenerRetencionClientesAction(fechaInicio, fechaFin);
      setRetencion(resultado);
    } catch (err: any) {
      console.error("Error al cargar retención de clientes:", err);
      setError(err.message || "Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Manejar cambio de fecha de inicio
   */
  const handleFechaInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFechaInicio(e.target.value);
  };

  /**
   * Manejar cambio de fecha de fin
   */
  const handleFechaFinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFechaFin(e.target.value);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-lg">Tasa de Retención de Clientes</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/** Selectores de fecha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fecha-inicio">Fecha de inicio</Label>
            <Input
              id="fecha-inicio"
              type="date"
              value={fechaInicio}
              onChange={handleFechaInicioChange}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fecha-fin">Fecha de fin</Label>
            <Input
              id="fecha-fin"
              type="date"
              value={fechaFin}
              onChange={handleFechaFinChange}
              className="w-full"
            />
          </div>
        </div>

        {/** Botón para actualizar */}
        <Button 
          onClick={cargarDatosRetencion} 
          disabled={loading || !fechaInicio || !fechaFin}
          className="w-full md:w-auto"
        >
          Actualizar datos
        </Button>

        {/** Mostrar error si existe */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/** Mostrar resultado */}
        <div className="pt-4">
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : retencion !== null ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Porcentaje de clientes que realizaron más de una compra
              </p>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-purple-600">
                  {retencion.toFixed(2)}%
                </span>
                <span className="text-sm text-gray-500">
                  de retención
                </span>
              </div>
              <p className="text-xs text-gray-500 pt-2">
                Período: {new Date(fechaInicio).toLocaleDateString('es-ES')} - {new Date(fechaFin).toLocaleDateString('es-ES')}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Selecciona un rango de fechas para ver los datos</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 