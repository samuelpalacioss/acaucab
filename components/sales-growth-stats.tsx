'use client'

import { useState, useTransition } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CalendarIcon, TrendingUp, TrendingDown, Minus, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { obtenerCrecimientoVentasAction } from '@/lib/server-actions'
import { SalesGrowthData } from '@/models/stats'
import { cn } from '@/lib/utils'

interface SalesGrowthStatsProps {
  initialData: SalesGrowthData[]
  initialDate: string
  initialComparison: 'mensual' | 'anual'
}

const StatCard = ({ title, value, icon, description }: { title: string, value: string, icon: React.ReactNode, description?: string }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );

export function SalesGrowthStats({ initialData, initialDate, initialComparison }: SalesGrowthStatsProps) {
  const [data, setData] = useState<SalesGrowthData[]>(initialData)
  const [date, setDate] = useState<Date | undefined>(new Date(initialDate))
  const [comparisonType, setComparisonType] = useState<'mensual' | 'anual'>(initialComparison)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleFetchData = () => {
    if (!date) return

    startTransition(async () => {
      try {
        setError(null)
        const newDate = format(date, 'yyyy-MM-dd')
        const result = await obtenerCrecimientoVentasAction(newDate, comparisonType)
        setData(result)
      } catch (err: any) {
        setError(err.message || 'Error al cargar los datos')
      }
    })
  }

  const currentPeriodData = data.find(d => d.periodo === 'Periodo Actual')
  const previousPeriodData = data.find(d => d.periodo === 'Periodo Anterior')

  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined) return 'N/A'
    return `$${value.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatPercentage = (value: number | null | undefined) => {
    if (value === null || value === undefined) return 'N/A'
    return `${value.toFixed(2)}%`
  }
  
  const growthPct = currentPeriodData?.crecimiento_pct
  const GrowthIcon = growthPct === null || growthPct === undefined ? Minus : growthPct >= 0 ? TrendingUp : TrendingDown;
  const growthColor = growthPct === null || growthPct === undefined ? 'text-gray-500' : growthPct >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis de Crecimiento de Ventas</CardTitle>
        <CardDescription>Compara las ventas totales contra períodos anteriores.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full sm:w-[280px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP', { locale: es }) : <span>Seleccione una fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={es}
              />
            </PopoverContent>
          </Popover>

          <Select
            value={comparisonType}
            onValueChange={(value: 'mensual' | 'anual') => setComparisonType(value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Tipo de Comparación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mensual">Mensual</SelectItem>
              <SelectItem value="anual">Anual</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleFetchData} disabled={isPending || !date} className="w-full sm:w-auto">
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Analizar
          </Button>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        
        {isPending ? (
            <div className="h-48 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
                title="Ventas del Período Actual"
                value={formatCurrency(currentPeriodData?.ventas_totales)}
                icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
                description={`Período: ${format(date || new Date(), comparisonType === 'mensual' ? 'MMMM yyyy' : 'yyyy', { locale: es })}`}
            />
            <StatCard 
                title="Ventas del Período Anterior"
                value={formatCurrency(previousPeriodData?.ventas_totales)}
                icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
                description={`Comparado con el ${comparisonType === 'mensual' ? 'mes' : 'año'} anterior`}
            />
            <StatCard 
                title="Crecimiento Absoluto"
                value={formatCurrency(currentPeriodData?.crecimiento_abs)}
                icon={<GrowthIcon className={cn("h-4 w-4", growthColor)} />}
                description="Diferencia en ventas"
            />
            <StatCard 
                title="Crecimiento Porcentual"
                value={formatPercentage(currentPeriodData?.crecimiento_pct)}
                icon={<GrowthIcon className={cn("h-4 w-4", growthColor)} />}
                description="Variación porcentual"
            />
            </div>
        )}

      </CardContent>
    </Card>
  )
} 