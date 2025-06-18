"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, FileText, Mail, Search, ShoppingBag, Store, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { DateRangePicker } from "@/components/date-range-picker";
import { VentaExpandida } from "@/models/venta";

/**
 * Propiedades del componente VentasClient
 */
interface VentasClientProps {
  /** Datos de ventas ya procesados y validados desde el servidor */
  ventasExpandidas: VentaExpandida[];
}

/**
 * Datos para el gráfico de ventas por canal
 */
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
};

/**
 * Componente cliente para la gestión de ventas
 * Maneja toda la interfaz de usuario y los estados locales
 * Recibe datos ya procesados y validados desde el servidor
 */
export default function VentasClient({ ventasExpandidas }: VentasClientProps) {
  const router = useRouter();

  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [currency, setCurrency] = useState("Bs");
  const [showReturnsOnly, setShowReturnsOnly] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  /**
   * Log simple de los datos recibidos en el cliente
   */
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log("📊 Ventas cargadas:", ventasExpandidas.length);
  }

  /**
   * Función para navegar al detalle de la venta
   */
  const handleRowClick = (id: string | number) => {
    router.push(`/dashboard/finanzas/ventas/${id}`);
  };

  /**
   * Función para formatear la fecha en formato español
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  /**
   * Función para obtener el color del badge según el estado
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregado":
        return "bg-green-100 text-green-800";
      case "En proceso":
        return "bg-blue-100 text-blue-800";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  /**
   * Función para obtener el icono del canal de venta
   */
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Web":
        return <ShoppingBag className="h-4 w-4 mr-1" />;
      case "Tienda":
        return <Store className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  // Filtrar datos según la búsqueda usando los datos ya procesados
  const filteredData = ventasExpandidas.filter((sale) => {
    const busquedaId = sale.id.toString().toLowerCase().includes(searchTerm.toLowerCase());
    const busquedaCliente = sale.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase());
    return busquedaId || busquedaCliente;
  });

  // Calcular totales por canal usando datos reales
  const webSales = filteredData.filter((sale) => sale.canal_venta === "Web");
  const storeSales = filteredData.filter((sale) => sale.canal_venta === "Tienda");

  const totalWebSales = webSales.reduce((sum, sale) => sum + sale.monto_total, 0);
  const totalStoreSales = storeSales.reduce((sum, sale) => sum + sale.monto_total, 0);
  const totalSales = totalWebSales + totalStoreSales;
  const totalTransactions = filteredData.length;

  return (
    <div id="ventas-container" className="p-6 space-y-6">
      {/* Encabezado de la página */}
      <div id="ventas-header" className="flex justify-between items-center">
        <h1 id="ventas-title" className="text-2xl font-bold">
          Ventas
        </h1>
      </div>

      {/* KPIs principales */}
      <div id="kpis-grid" className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card id="total-sales-card">
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
                          height: `${
                            (chartData.datasets[0].data[index] / Math.max(...chartData.datasets[0].data)) * 30
                          }px`,
                        }}
                      />
                      <div
                        className="w-6 bg-green-500 rounded-t"
                        style={{
                          height: `${
                            (chartData.datasets[1].data[index] / Math.max(...chartData.datasets[1].data)) * 30
                          }px`,
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

        <Card id="web-sales-card">
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

        <Card id="store-sales-card">
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

        <Card id="average-ticket-card">
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

      {/* Controles de filtrado - Primera fila */}
      <div id="primary-filters" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search-input"
            placeholder="Buscar por factura, cliente..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div id="date-picker-wrapper">
          <DateRangePicker />
        </div>

        <Select value={selectedChannel} onValueChange={setSelectedChannel}>
          <SelectTrigger id="channel-select">
            <SelectValue placeholder="Canal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los canales</SelectItem>
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="store">Tienda</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
          <SelectTrigger id="payment-status-select">
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

      {/* Controles de filtrado - Segunda fila */}
      <div id="secondary-filters" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
          <SelectTrigger id="payment-method-select">
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
          <SelectTrigger id="currency-select">
            <SelectValue placeholder="Moneda" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Bs">Bolívares (Bs)</SelectItem>
            <SelectItem value="USD">Dólares (USD)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabla de ventas */}
      <Card id="sales-table-card">
        <CardContent className="p-0">
          <Table id="sales-table">
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
                  id={`sale-row-${sale.id}`}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(sale.id)}
                >
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.fecha_venta ? formatDate(sale.fecha_venta) : "N/A"}</TableCell>
                  <TableCell>{sale.nombre_cliente}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getChannelIcon(sale.canal_venta)}
                      {sale.canal_venta}
                    </div>
                  </TableCell>
                  <TableCell>
                    {sale.monto_total.toLocaleString("es-ES", {
                      style: "currency",
                      currency: currency === "Bs" ? "VES" : "USD",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(sale.estado || "Pendiente")}>
                      {sale.estado || "Pendiente"}
                    </Badge>
                  </TableCell>
                  <TableCell>{sale.puntos || 0}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" id={`actions-button-${sale.id}`}>
                          <span className="sr-only">Abrir menú</span>
                          <FileText className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/dashboard/finanzas/ventas/${sale.id}`);
                          }}
                        >
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            // Lógica para reenviar factura
                          }}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Re-enviar factura
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
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
  );
}
