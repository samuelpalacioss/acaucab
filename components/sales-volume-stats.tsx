"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { obtenerVolumenDeVentasAction } from "@/lib/server-actions";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, RefreshCw, PackageCheck, Package } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SalesVolumeStatsProps {
  initialSalesVolume: number;
  initialStartDate: string;
  initialEndDate: string;
}

/**
 * Componente para mostrar el volumen total de unidades vendidas y seleccionar un período.
 */
export function SalesVolumeStats({ 
  initialSalesVolume, 
  initialStartDate, 
  initialEndDate 
}: SalesVolumeStatsProps) {
  
  const [salesVolume, setSalesVolume] = useState(initialSalesVolume);
  const [startDate, setStartDate] = useState(new Date(initialStartDate));
  const [endDate, setEndDate] = useState(new Date(initialEndDate));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSalesVolume = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fechaInicioStr = format(startDate, 'yyyy-MM-dd');
      const fechaFinStr = format(endDate, 'yyyy-MM-dd');
      
      const resultado = await obtenerVolumenDeVentasAction(fechaInicioStr, fechaFinStr);
      setSalesVolume(resultado);
    } catch (err: any) {
      console.error('Error al obtener el volumen de ventas:', err);
      setError(err.message || 'Error al cargar los datos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5" />
            <span>Seleccionar Período</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Fecha de Inicio</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(startDate, "dd/MM/yyyy", { locale: es })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    disabled={(date) => date > endDate || date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Fecha de Fin</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(endDate, "dd/MM/yyyy", { locale: es })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => date && setEndDate(date)}
                    disabled={(date) => date < startDate || date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button onClick={fetchSalesVolume} disabled={isLoading} className="w-full">
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Calculando...' : 'Actualizar Datos'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PackageCheck className="w-6 h-6 text-green-500" />
            <span>Volumen Total de Unidades Vendidas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-6xl font-bold text-gray-800">
            {isLoading ? (
              <div className="animate-pulse h-16 bg-gray-200 rounded-md w-1/2 mx-auto"></div>
            ) : (
              new Intl.NumberFormat('es-ES').format(salesVolume)
            )}
          </div>
          <p className="text-lg text-gray-600 mt-2">
            Unidades Totales (Botellas, Latas, etc.)
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Período del {format(startDate, "dd/MM/yyyy", { locale: es })} al {format(endDate, "dd/MM/yyyy", { locale: es })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 