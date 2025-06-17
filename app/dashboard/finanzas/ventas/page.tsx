"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Download, FileText, Mail, Search, ShoppingBag, Store, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DateRangePicker } from "@/components/date-range-picker"

// Datos de ejemplo
const salesData = [
  {
    id: "FAC-2023-001",
    date: "2023-04-15",
    client: "Supermercados ABC",
    channel: "Web",
    amount: 1250.75,
    currency: "Bs",
    status: "Entregado",
    points: 125,
  },
  {
    id: "FAC-2023-002",
    date: "2023-04-16",
    client: "Distribuidora XYZ",
    channel: "Tienda",
    amount: 3450.0,
    currency: "Bs",
    status: "Entregado",
    points: 345,
  },
  {
    id: "FAC-2023-003",
    date: "2023-04-17",
    client: "Comercial 123",
    channel: "Tienda",
    amount: 875.5,
    currency: "Bs",
    status: "Entregado",
    points: 87,
  },
  {
    id: "FAC-2023-004",
    date: "2023-04-18",
    client: "Tiendas DEF",
    channel: "Web",
    amount: 2100.25,
    currency: "Bs",
    status: "Entregado",
    points: 210,
  },
  {
    id: "FAC-2023-005",
    date: "2023-04-19",
    client: "Mayorista GHI",
    channel: "Tienda",
    amount: 5600.0,
    currency: "Bs",
    status: "Entregado",
    points: 0,
  },
  {
    id: "FAC-2023-006",
    date: "2023-04-20",
    client: "Minorista JKL",
    channel: "Tienda",
    amount: 950.75,
    currency: "Bs",
    status: "Entregado",
    points: 95,
  },
  {
    id: "FAC-2023-007",
    date: "2023-04-21",
    client: "Corporación MNO",
    channel: "Web",
    amount: 4200.5,
    currency: "Bs",
    status: "En proceso",
    points: 420,
  },
  {
    id: "FAC-2023-008",
    date: "2023-04-22",
    client: "Empresa PQR",
    channel: "Tienda",
    amount: 1875.25,
    currency: "Bs",
    status: "Entregado",
    points: 187,
  },
]

// Datos para el gráfico
const chartData = {
  labels: ["15 Abr", "16 Abr", "17 Abr", "18 Abr", "19 Abr", "20 Abr", "21 Abr", "22 Abr"],
  datasets: [
    {
      label: "Web",
      data: [1250.75, 0, 0, 2100.25, 0, 0, 4200.5, 0],
      backgroundColor: "rgba(59, 130, 246, 0.5)",
    },
    {
      label: "Tienda",
      data: [0, 3450.0, 875.5, 0, 5600.0, 950.75, 0, 1875.25],
      backgroundColor: "rgba(16, 185, 129, 0.5)",
    },
  ],
}

export default function VentasPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [currency, setCurrency] = useState("Bs")
  const [showReturnsOnly, setShowReturnsOnly] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState("")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")

  // Función para navegar al detalle de la venta
  const handleRowClick = (id: string) => {
    router.push(`/dashboard/finanzas/ventas/${id}`)
  }

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Función para obtener el color del badge según el estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregado":
        return "bg-green-100 text-green-800"
      case "En proceso":
        return "bg-blue-100 text-blue-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Función para obtener el icono del canal
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Web":
        return <ShoppingBag className="h-4 w-4 mr-1" />
      case "Tienda":
        return <Store className="h-4 w-4 mr-1" />
      default:
        return null
    }
  }

  // Filtrar datos según la búsqueda
  const filteredData = salesData.filter(
    (sale) =>
      sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.client.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calcular totales por canal
  const webSales = filteredData.filter(sale => sale.channel === "Web")
  const storeSales = filteredData.filter(sale => sale.channel === "Tienda")

  const totalWebSales = webSales.reduce((sum, sale) => sum + sale.amount, 0)
  const totalStoreSales = storeSales.reduce((sum, sale) => sum + sale.amount, 0)
  const totalSales = totalWebSales + totalStoreSales
  const totalTransactions = filteredData.length

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ventas</h1>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ventas Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalSales.toLocaleString("es-ES", { style: "currency", currency: "VES" })}
            </div>
            <div className="h-[80px] mt-4 text-xs text-muted-foreground">
              <div className="flex items-end justify-between h-full">
                {chartData.labels.map((label, index) => (
                  <div key={label} className="relative flex flex-col items-center">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="w-6 bg-blue-500 rounded-t"
                        style={{
                          height: `${(chartData.datasets[0].data[index] / Math.max(...chartData.datasets[0].data)) * 30}px`,
                        }}
                      />
                      <div
                        className="w-6 bg-green-500 rounded-t"
                        style={{
                          height: `${(chartData.datasets[1].data[index] / Math.max(...chartData.datasets[1].data)) * 30}px`,
                        }}
                      />
                    </div>
                    <span className="absolute -bottom-5 text-[10px] rotate-45 origin-left">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <ShoppingBag className="h-4 w-4 mr-2 text-blue-500" />
              Ventas Web
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalWebSales.toLocaleString("es-ES", { style: "currency", currency: "VES" })}
            </div>
            <p className="text-xs text-muted-foreground mt-2">{webSales.length} transacciones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Store className="h-4 w-4 mr-2 text-green-500" />
              Ventas Tienda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalStoreSales.toLocaleString("es-ES", { style: "currency", currency: "VES" })}
            </div>
            <p className="text-xs text-muted-foreground mt-2">{storeSales.length} transacciones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ticket Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(totalSales / totalTransactions).toLocaleString("es-ES", { style: "currency", currency: "VES" })}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Periodo actual</p>
          </CardContent>
        </Card>
      </div>

      {/* Controles superiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por factura, cliente..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DateRangePicker />

        <Select value={selectedChannel} onValueChange={setSelectedChannel}>
          <SelectTrigger>
            <SelectValue placeholder="Canal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los canales</SelectItem>
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="store">Tienda</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Estado de pago" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="paid">Pagado</SelectItem>
            <SelectItem value="pending">Pendiente</SelectItem>
            <SelectItem value="cancelled">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
          <SelectTrigger>
            <SelectValue placeholder="Método de pago" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los métodos</SelectItem>
            <SelectItem value="cash">Efectivo</SelectItem>
            <SelectItem value="card">Tarjeta</SelectItem>
            <SelectItem value="transfer">Transferencia</SelectItem>
            <SelectItem value="crypto">Criptomoneda</SelectItem>
          </SelectContent>
        </Select>

        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger>
            <SelectValue placeholder="Moneda" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Bs">Bolívares (Bs)</SelectItem>
            <SelectItem value="USD">Dólares (USD)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabla de ventas */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nº Factura</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Monto neto</TableHead>
                <TableHead>Estado entrega</TableHead>
                <TableHead>Puntos emitidos</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((sale) => (
                <TableRow
                  key={sale.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(sale.id)}
                >
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{formatDate(sale.date)}</TableCell>
                  <TableCell>{sale.client}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getChannelIcon(sale.channel)}
                      {sale.channel}
                    </div>
                  </TableCell>
                  <TableCell>
                    {sale.amount.toLocaleString("es-ES", {
                      style: "currency",
                      currency: currency === "Bs" ? "VES" : "USD",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(sale.status)}>
                      {sale.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{sale.points}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <span className="sr-only">Abrir menú</span>
                          <FileText className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/finanzas/ventas/${sale.id}`)
                          }}
                        >
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            // Lógica para reenviar factura
                          }}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Re-enviar factura
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            // Lógica para exportar
                          }}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Exportar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
