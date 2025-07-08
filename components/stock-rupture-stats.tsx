'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  Calendar, 
  Calculator,
  AlertTriangle,
  BarChart3,
  Store
} from "lucide-react"

interface StockRuptureData {
  tipo_calculo: string
  tienda_id: number | null
  total_ordenes: number
  total_productos_monitoreados: number
  dias_total: number
  oportunidades_stock: number
  tasa_ruptura_global_porcentaje: number
  fecha_primera_orden: string
  fecha_ultima_orden: string
}

interface StockRuptureStatsProps {
  data: StockRuptureData[]
  isLoading: boolean
}

export function StockRuptureStats({ data, isLoading }: StockRuptureStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-3">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Card className="border-dashed border-2 border-gray-200">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Sin Datos de Tasa de Ruptura
            </h3>
            <p className="text-gray-500">
              No hay información disponible sobre la tasa de ruptura de stock
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  /** Función para determinar el color del badge basado en la tasa de ruptura */
  const getBadgeVariant = (tasa: number) => {
    if (tasa < 5) return { variant: "default" as const, icon: TrendingUp, color: "text-green-600" }
    if (tasa < 15) return { variant: "secondary" as const, icon: TrendingUp, color: "text-yellow-600" }
    return { variant: "destructive" as const, icon: AlertTriangle, color: "text-red-600" }
  }

  /** Función para formatear fechas */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/** Explicación de la fórmula */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <Calculator className="w-5 h-5" />
            <span>Tasa de Ruptura Global</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-blue-700">
              La tasa de ruptura global mide la frecuencia con que se produce una ruptura de stock 
              en relación con todas las oportunidades de tener stock disponible.
            </p>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <div className="text-center">
                <div className="text-lg font-mono font-semibold text-gray-800 mb-2">
                  Tasa<sub>global</sub> = (∑S<sub>i</sub> / N × D) × 100%
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div><strong>∑S<sub>i</sub></strong> = suma de todos los eventos de reposición en el período</div>
                  <div><strong>N</strong> = productos monitoreados en el mismo período</div>
                  <div><strong>D</strong> = días totales del período</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/** Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        {data.map((item, index) => {
          const badgeInfo = getBadgeVariant(item.tasa_ruptura_global_porcentaje)
          const IconComponent = badgeInfo.icon

          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    {item.tipo_calculo === 'global' ? (
                      <BarChart3 className="w-5 h-5" />
                    ) : (
                      <Store className="w-5 h-5" />
                    )}
                    <span>
                      {item.tipo_calculo === 'global' 
                        ? 'Tasa Global' 
                        : `Tienda ${item.tienda_id}`}
                    </span>
                  </CardTitle>
                  <Badge variant={badgeInfo.variant}>
                    <IconComponent className="w-3 h-3 mr-1" />
                    {item.tasa_ruptura_global_porcentaje.toFixed(2)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/** Tasa de ruptura principal */}
                <div className="text-center">
                  <div className={`text-3xl font-bold ${badgeInfo.color}`}>
                    {item.tasa_ruptura_global_porcentaje.toFixed(2)}%
                  </div>
                  <div className="text-sm text-gray-600">Tasa de Ruptura</div>
                </div>

                <Progress 
                  value={Math.min(item.tasa_ruptura_global_porcentaje, 100)} 
                  className="h-2"
                />

                <Separator />

                {/** Métricas detalladas */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-semibold">{item.total_ordenes.toLocaleString()}</div>
                      <div className="text-gray-500">Órdenes</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-semibold">{item.total_productos_monitoreados.toLocaleString()}</div>
                      <div className="text-gray-500">Productos</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-semibold">{item.dias_total}</div>
                      <div className="text-gray-500">Días</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-semibold">{item.oportunidades_stock.toLocaleString()}</div>
                      <div className="text-gray-500">Oportunidades</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/** Período analizado */}
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Período:</span>
                    <span>{formatDate(item.fecha_primera_orden)} - {formatDate(item.fecha_ultima_orden)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tipo:</span>
                    <span className="capitalize">{item.tipo_calculo}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 