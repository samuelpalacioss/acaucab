"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { obtenerRotacionInventarioAction } from "@/lib/server-actions";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { 
  RotateCcw, 
  TrendingUp, 
  TrendingDown, 
  Calculator,
  Info,
  CalendarIcon,
  DollarSign,
  RefreshCw
} from "lucide-react";

interface InventoryTurnoverStatsProps {
  /** Valor inicial de rotación de inventario */
  initialTurnoverValue: number;
  /** Fecha de inicio inicial del período */
  initialStartDate: string;
  /** Fecha de fin inicial del período */
  initialEndDate: string;
  /** Indicador de carga inicial */
  initialLoading?: boolean;
}

/**
 * Componente para mostrar estadísticas de rotación de inventario
 * Incluye explicaciones, análisis del valor calculado y selector de fechas
 */
export function InventoryTurnoverStats({ 
  initialTurnoverValue, 
  initialStartDate, 
  initialEndDate, 
  initialLoading = false 
}: InventoryTurnoverStatsProps) {
  
  // Estados para el componente
  const [turnoverValue, setTurnoverValue] = useState(initialTurnoverValue);
  const [startDate, setStartDate] = useState<Date>(new Date(initialStartDate));
  const [endDate, setEndDate] = useState<Date>(new Date(initialEndDate));
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);

  /**
   * Función para obtener datos de rotación con las fechas seleccionadas
   */
  const fetchTurnoverData = async () => {
    setIsLoading(true);
    try {
      const fechaInicioStr = format(startDate, 'yyyy-MM-dd');
      const fechaFinStr = format(endDate, 'yyyy-MM-dd');
      
      const resultado = await obtenerRotacionInventarioAction(fechaInicioStr, fechaFinStr);
      setTurnoverValue(resultado);
    } catch (error) {
      console.error('Error al obtener datos de rotación:', error);
      // Aquí podrías mostrar un toast o mensaje de error
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Función para interpretar el valor de rotación
   * Retorna información sobre qué significa el valor calculado
   */
  const interpretarRotacion = (valor: number) => {
    if (valor === 0) {
      return {
        estado: "Sin datos",
        color: "bg-gray-500",
        descripcion: "No hay ventas registradas en el período seleccionado",
        interpretacion: "No se puede calcular la rotación sin datos de ventas."
      };
    } else if (valor < 1) {
      return {
        estado: "Rotación Baja",
        color: "bg-red-500",
        descripcion: "El inventario se mueve lentamente",
        interpretacion: "El valor del inventario es mayor que las ventas. Considera revisar estrategias de ventas o reducir stock."
      };
    } else if (valor >= 1 && valor < 3) {
      return {
        estado: "Rotación Moderada",
        color: "bg-yellow-500",
        descripcion: "El inventario tiene un movimiento aceptable",
        interpretacion: "La rotación está en un rango normal. Monitorea las tendencias para optimizar."
      };
    } else if (valor >= 3 && valor < 6) {
      return {
        estado: "Rotación Buena",
        color: "bg-green-500",
        descripcion: "El inventario se mueve eficientemente",
        interpretacion: "Excelente balance entre inventario y ventas. Mantén este nivel de rotación."
      };
    } else {
      return {
        estado: "Rotación Muy Alta",
        color: "bg-blue-500",
        descripcion: "El inventario se mueve muy rápidamente",
        interpretacion: "Rotación muy alta. Considera aumentar stock para evitar rupturas o el valor refleja ventas excepcionales."
      };
    }
  };

  const analisis = interpretarRotacion(turnoverValue);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RotateCcw className="w-5 h-5 animate-spin" />
              <span>Cargando Rotación de Inventario...</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/** Card de selector de fechas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5" />
            <span>Seleccionar Período</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/** Fecha de inicio */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Fecha de Inicio</label>
              <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(startDate, "dd/MM/yyyy", { locale: es })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      if (date) {
                        setStartDate(date);
                        setIsStartDateOpen(false);
                      }
                    }}
                    disabled={(date) => date > endDate || date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/** Fecha de fin */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Fecha de Fin</label>
              <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(endDate, "dd/MM/yyyy", { locale: es })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => {
                      if (date) {
                        setEndDate(date);
                        setIsEndDateOpen(false);
                      }
                    }}
                    disabled={(date) => date < startDate || date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/** Botón de actualizar */}
            <Button 
              onClick={fetchTurnoverData}
              disabled={isLoading}
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualizar Datos
            </Button>
          </div>
        </CardContent>
      </Card>

      {/** Card principal con el valor de rotación */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <RotateCcw className="w-5 h-5" />
            <span>Rotación de Inventario</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/** Valor principal */}
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-gray-800">
                {turnoverValue.toFixed(2)}
              </div>
              <Badge className={`${analisis.color} text-white`}>
                {analisis.estado}
              </Badge>
              <p className="text-sm text-gray-600">
                {analisis.descripcion}
              </p>
            </div>

            {/** Información del período */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Período analizado:</span>
              </div>
              <div className="text-sm">
                <div><strong>Desde:</strong> {format(startDate, "dd/MM/yyyy", { locale: es })}</div>
                <div><strong>Hasta:</strong> {format(endDate, "dd/MM/yyyy", { locale: es })}</div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/** Interpretación del resultado */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Interpretación:</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {analisis.interpretacion}
            </p>
          </div>
        </CardContent>
      </Card>

      {/** Card explicativo sobre la fórmula */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>Cómo se Calcula</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Fórmula Utilizada:</h4>
              <p className="text-blue-700 font-mono text-sm">
                Rotación = Valor Promedio del Inventario ÷ Costo de Productos Vendidos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span>Valor Promedio del Inventario</span>
                </h5>
                <p className="text-sm text-gray-600">
                  Suma del valor actual de todos los productos en almacén (cantidad × precio de venta).
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span>Costo de Productos Vendidos</span>
                </h5>
                <p className="text-sm text-gray-600">
                  Valor total de productos vendidos en el período seleccionado.
                </p>
              </div>
            </div>

           
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 