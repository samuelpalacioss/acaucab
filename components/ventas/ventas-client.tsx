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
import { VentaExpandida } from "@/models/venta";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Status } from "@/models/status";

/**
 * Propiedades del componente VentasClient
 */
interface VentasClientProps {
  /** Datos de ventas ya procesados y validados desde el servidor */
  ventasExpandidas: VentaExpandida[];
  status: Status[];
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
export default function VentasClient({ ventasExpandidas, status }: VentasClientProps) {
  const router = useRouter();

  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [currency, setCurrency] = useState("Bs");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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
   * Maneja diferentes variaciones de nombres de status
   */
  const getStatusColor = (statusNombre: string) => {
    /** Normalizar el nombre del status para comparación */
    const statusLower = statusNombre.toLowerCase();
    
    if (statusLower.includes("entregado") || statusLower.includes("completado") || statusLower.includes("pagado")) {
      return "bg-green-100 text-green-800";
    }
    if (statusLower.includes("proceso") || statusLower.includes("preparación") || statusLower.includes("enviado")) {
      return "bg-blue-100 text-blue-800";
    }
    if (statusLower.includes("pendiente") || statusLower.includes("espera")) {
      return "bg-yellow-100 text-yellow-800";
    }
    if (statusLower.includes("cancelado") || statusLower.includes("rechazado") || statusLower.includes("anulado")) {
      return "bg-red-100 text-red-800";
    }
    /** Color por defecto para status no reconocidos */
    return "bg-gray-100 text-gray-800";
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

  /**
   * Función para mapear los valores del filtro de canal a los valores reales
   */
  const mapChannelFilter = (filterValue: string): string | null => {
    switch (filterValue) {
      case "web":
        return "Web";
      case "store":
        return "Tienda";
      case "all":
      case "":
        return null;
      default:
        return null;
    }
  };

  /**
   * Función para mapear los valores del filtro de estado a los valores reales
   * Usa los status dinámicos del prop status
   */
  const mapStatusFilter = (filterValue: string): string | null => {
    if (filterValue === "all" || filterValue === "") {
      return null;
    }
    
    /** Buscar el status por ID en el array de status */
    const statusEncontrado = status.find(s => s.id.toString() === filterValue);
    return statusEncontrado ? statusEncontrado.nombre : null;
  };

  // Filtrar datos según todos los filtros aplicados
  const filteredData = ventasExpandidas.filter((sale) => {
    // Filtro de búsqueda por ID o cliente
    const busquedaId = sale.id.toString().toLowerCase().includes(searchTerm.toLowerCase());
    const busquedaCliente = sale.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const cumpleBusqueda = searchTerm === "" || busquedaId || busquedaCliente;

    // Filtro por canal de venta
    const canalFiltrado = mapChannelFilter(selectedChannel);
    const cumpleCanal = canalFiltrado === null || sale.canal_venta === canalFiltrado;

    // Filtro por estado de entrega (mapeado a estado de pago)
    const estadoFiltrado = mapStatusFilter(selectedPaymentStatus);
    const cumpleEstado = estadoFiltrado === null || sale.estado === estadoFiltrado;

    // Filtro por método de pago (por ahora no tenemos esta información en los datos)
    // Se puede expandir cuando tengamos la información de método de pago
    const cumpleMetodoPago = selectedPaymentMethod === "" || selectedPaymentMethod === "all";

    return cumpleBusqueda && cumpleCanal && cumpleEstado && cumpleMetodoPago;
  });

  // Calcular paginación
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Calcular totales por canal usando datos filtrados (no paginados)
  const webSales = filteredData.filter((sale) => sale.canal_venta === "Web");
  const storeSales = filteredData.filter((sale) => sale.canal_venta === "Tienda");

  const totalWebSales = webSales.reduce((sum, sale) => sum + sale.monto_total, 0);
  const totalStoreSales = storeSales.reduce((sum, sale) => sum + sale.monto_total, 0);
  const totalSales = totalWebSales + totalStoreSales;
  const totalTransactions = filteredData.length;

  /**
   * Función para cambiar de página
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /**
   * Función para resetear filtros
   */
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedChannel("");
    setSelectedPaymentStatus("");
    setSelectedPaymentMethod("");
    setCurrentPage(1);
  };

  return (
    <div id="ventas-container" className="p-6 space-y-6">
      {/* Encabezado de la página */}
      <div id="ventas-header" className="flex justify-between items-center">
        <h1 id="ventas-title" className="text-2xl font-bold">
          Ventas
        </h1>
        <Button variant="outline" onClick={resetFilters}>
          Limpiar filtros
        </Button>
      </div>

      {/* KPIs principales */}
      <div id="kpis-grid" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card id="total-sales-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ventas Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalSales.toLocaleString("es-ES", { style: "currency", currency: "VES" })}
            </div>
            <p className="text-xs text-muted-foreground mt-2">{totalTransactions} transacciones</p>
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

      </div>

      {/* Controles de filtrado - Primera fila */}
      <div id="primary-filters" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search-input"
            placeholder="Buscar por factura, cliente..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset a la primera página al buscar
            }}
          />
        </div>

        <Select 
          value={selectedChannel} 
          onValueChange={(value) => {
            setSelectedChannel(value);
            setCurrentPage(1); // Reset a la primera página al filtrar
          }}
        >
          <SelectTrigger id="channel-select">
            <SelectValue placeholder="Canal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los canales</SelectItem>
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="store">Tienda</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={selectedPaymentStatus} 
          onValueChange={(value) => {
            setSelectedPaymentStatus(value);
            setCurrentPage(1); // Reset a la primera página al filtrar
          }}
        >
          <SelectTrigger id="payment-status-select">
            <SelectValue placeholder="Estado de entrega" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            {/** Renderizar los status dinámicamente desde el prop */}
            {status.map((estado) => (
              <SelectItem key={estado.id} value={estado.id.toString()}>
                {estado.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Controles de filtrado - Segunda fila */}
      <div id="secondary-filters" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select 
          value={selectedPaymentMethod} 
          onValueChange={(value) => {
            setSelectedPaymentMethod(value);
            setCurrentPage(1); // Reset a la primera página al filtrar
          }}
        >
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

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1}-{Math.min(endIndex, filteredData.length)} de {filteredData.length} resultados
          </span>
        </div>

        <Select 
          value={itemsPerPage.toString()} 
          onValueChange={(value) => {
            setItemsPerPage(Number(value));
            setCurrentPage(1); // Reset a la primera página al cambiar
          }}
        >
          <SelectTrigger id="items-per-page-select">
            <SelectValue placeholder="Elementos por página" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 por página</SelectItem>
            <SelectItem value="10">10 por página</SelectItem>
            <SelectItem value="20">20 por página</SelectItem>
            <SelectItem value="50">50 por página</SelectItem>
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
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((sale) => (
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No se encontraron ventas que coincidan con los filtros aplicados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      handlePageChange(currentPage - 1);
                    }
                  }}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {/* Lógica simplificada de paginación */}
              {(() => {
                const pages = [];
                const maxVisiblePages = 5;

                if (totalPages <= maxVisiblePages) {
                  // Mostrar todas las páginas si son pocas
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(i);
                          }}
                          isActive={currentPage === i}
                        >
                          {i}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                } else {
                  // Lógica para muchas páginas
                  // Siempre mostrar primera página
                  pages.push(
                    <PaginationItem key={1}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(1);
                        }}
                        isActive={currentPage === 1}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                  );

                  // Mostrar ellipsis si hay espacio
                  if (currentPage > 3) {
                    pages.push(
                      <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  // Mostrar páginas alrededor de la actual
                  const start = Math.max(2, currentPage - 1);
                  const end = Math.min(totalPages - 1, currentPage + 1);

                  for (let i = start; i <= end; i++) {
                    pages.push(
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(i);
                          }}
                          isActive={currentPage === i}
                        >
                          {i}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }

                  // Mostrar ellipsis si hay espacio
                  if (currentPage < totalPages - 2) {
                    pages.push(
                      <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  // Siempre mostrar última página
                  if (totalPages > 1) {
                    pages.push(
                      <PaginationItem key={totalPages}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(totalPages);
                          }}
                          isActive={currentPage === totalPages}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                }

                return pages;
              })()}

              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      handlePageChange(currentPage + 1);
                    }
                  }}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
