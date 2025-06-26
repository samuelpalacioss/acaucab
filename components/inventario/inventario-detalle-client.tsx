"use client";

import { useState, useMemo } from "react";
import {
  ArrowUpDown,
  AlertTriangle,
  Package,
  Filter,
  Tag,
  FileText,
  Search,
  X,
  Edit,
  Check,
  XIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CriticalStockModal } from "@/components/critical-stock-modal";
import { AlertsModal } from "@/components/alerts-modal";
import { InventoryData } from "@/models/inventory";
import { OrdenesReposicionData } from "@/models/orden-reposicion";
import { generarPDFOrdenReposicion } from "@/lib/pdf-generator";
import { actualizarEstadoOrdenReposicion } from "@/lib/server-actions";
import { usePermissions, useUser } from "@/store/user-store";

interface InventarioDetalleClientProps {
  /** Datos del inventario obtenidos desde la base de datos */
  inventoryData: InventoryData;
  /** Datos de las órdenes de reposición obtenidos desde la base de datos */
  ordenesReposicion: OrdenesReposicionData;
}

export default function InventarioDetalleClient({ inventoryData, ordenesReposicion }: InventarioDetalleClientProps) {
  const { puedeVerOrdenesDeReposicion, puedeEditarOrdenesDeReposicion } = usePermissions();
  const { usuario } = useUser();

  const [isCriticalStockModalOpen, setIsCriticalStockModalOpen] = useState(false);

  /** Estados para edición de estado de órdenes */
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [quantity, setQuantity] = useState<string>("");
  const [observation, setObservation] = useState<string>("");

  /** Estados para filtros */
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStockStatus, setSelectedStockStatus] = useState<string>("all");
  const [stockLevelFilter, setStockLevelFilter] = useState<string>("all");

  /** Estados para la paginación */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  /** Opciones de estado disponibles para las órdenes */
  const statusOptions = ["Pendiente", "En Proceso", "Completada", "cancelado", "En Revisión"];

  /** Funciones para manejo de edición de estado */
  const handleEditStatus = (orderId: number, currentStatus: string) => {
    setEditingOrderId(orderId);
    setNewStatus(""); // Inicializar vacío para que el usuario seleccione
    setQuantity("");
    setObservation("");
    setIsEditStatusModalOpen(true);
  };

  const handleAcceptStatusChange = async () => {
    const currentOrder = alertasReposicion.find((orden) => orden.id === editingOrderId);
    const cantidadDisponible = currentOrder?.["Cantidad en Almacén"] || 0;
    const cantidadIngresada = parseInt(quantity, 10);

    // Validar que si el estado es "Finalizado", la cantidad sea requerida
    if (newStatus.toLowerCase() === "finalizado" && (!quantity || quantity.trim() === "")) {
      alert("La cantidad es requerida cuando el estado es 'Finalizado'");
      return;
    }

    // Validar que la cantidad no exceda el stock disponible en almacén
    if (newStatus.toLowerCase() === "finalizado" && cantidadIngresada > cantidadDisponible) {
      alert(
        `No puedes procesar ${cantidadIngresada} unidades. Solo hay ${cantidadDisponible} unidades disponibles en el almacén.`
      );
      return;
    }

    // Validar que la cantidad sea positiva
    if (newStatus.toLowerCase() === "finalizado" && cantidadIngresada <= 0) {
      alert("La cantidad debe ser mayor a 0");
      return;
    }

    if (editingOrderId && newStatus && usuario?.id) {
      setIsUpdatingStatus(true);
      try {
        const unidades = newStatus.toLowerCase() === "finalizado" ? cantidadIngresada : undefined;
        const observacionFinal = newStatus.toLowerCase() === "finalizado" ? observation : undefined;

        await actualizarEstadoOrdenReposicion(editingOrderId, newStatus, usuario.id, unidades, observacionFinal);

        setIsEditStatusModalOpen(false);
        setEditingOrderId(null);
        setNewStatus("");
        setQuantity("");
        setObservation("");
        alert(`Estado actualizado a: ${newStatus}`);
        // Idealmente aquí deberías refrescar los datos en lugar de recargar la página
        window.location.reload();
      } catch (error) {
        console.error("Error al actualizar el estado de la orden:", error);
        alert("Hubo un error al actualizar el estado de la orden. Por favor, inténtelo más tarde.");
      } finally {
        setIsUpdatingStatus(false);
      }
    } else if (!usuario?.id) {
      alert("No se pudo obtener la información del usuario. Por favor, inicie sesión nuevamente.");
    }
  };

  const handleCancelStatusChange = () => {
    setIsEditStatusModalOpen(false);
    setEditingOrderId(null);
    setNewStatus("");
    setQuantity("");
    setObservation("");
  };

  /** Obtener categorías únicas para el filtro */
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(inventoryData.map((item) => item.Categoría)));
    return uniqueCategories.sort();
  }, [inventoryData]);

  /** Aplicar filtros a los datos */
  const filteredData = useMemo(() => {
    let filtered = inventoryData;

    // Filtro de búsqueda por nombre o SKU
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) => item.Nombre.toLowerCase().includes(search) || item.SKU.toLowerCase().includes(search)
      );
    }

    // Filtro por categoría
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.Categoría === selectedCategory);
    }

    // Filtro por estado de stock
    if (selectedStockStatus !== "all") {
      filtered = filtered.filter((item) => {
        const status = getStockStatus(item["Stock Total"], 50, 100);
        return status.toLowerCase() === selectedStockStatus;
      });
    }

    // Filtro por nivel de stock
    if (stockLevelFilter !== "all") {
      switch (stockLevelFilter) {
        case "sin_stock":
          filtered = filtered.filter((item) => item["Stock Total"] === 0);
          break;
        case "bajo_stock":
          filtered = filtered.filter((item) => item["Stock Total"] > 0 && item["Stock Total"] <= 50);
          break;
        case "stock_normal":
          filtered = filtered.filter((item) => item["Stock Total"] > 50 && item["Stock Total"] <= 200);
          break;
        case "alto_stock":
          filtered = filtered.filter((item) => item["Stock Total"] > 200);
          break;
        case "solo_almacen":
          filtered = filtered.filter((item) => item["En Almacén"] > 0 && item["En Anaquel"] === 0);
          break;
        case "solo_anaquel":
          filtered = filtered.filter((item) => item["En Anaquel"] > 0 && item["En Almacén"] === 0);
          break;
      }
    }

    return filtered;
  }, [inventoryData, searchTerm, selectedCategory, selectedStockStatus, stockLevelFilter]);

  /** Resetear página cuando cambien los filtros */
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStockStatus, stockLevelFilter]);

  /** Calcular datos de paginación */
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  /** Limpiar todos los filtros */
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStockStatus("all");
    setStockLevelFilter("all");
    setCurrentPage(1);
  };

  /** Contar filtros activos */
  const activeFiltersCount = [
    searchTerm.trim() !== "",
    selectedCategory !== "all",
    selectedStockStatus !== "all",
    stockLevelFilter !== "all",
  ].filter(Boolean).length;

  /** Funciones para navegación de páginas */
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  /** Generar números de página para mostrar */
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar páginas con elipsis
      if (currentPage <= 3) {
        // Mostrar primeras páginas
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Mostrar últimas páginas
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Mostrar páginas alrededor de la actual
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  /** Transformar datos de órdenes de reposición para compatibilidad con el componente de alertas */
  const alertasReposicion = ordenesReposicion.map((orden) => ({
    id: orden["ID de Orden"],
    producto: orden["Producto"],
    sku: orden["SKU"],
    ubicacion: orden["Lugar de Reposición"],
    stock: orden["Unidades Solicitadas"], // Usando unidades solicitadas como referencia
    minimo: 20, // Valor por defecto para el mínimo
    fecha: new Date(orden["Fecha de Orden"]).toLocaleDateString("es-ES"),
    estado: orden["Estado"],
    fechaEstado: orden["Fecha de Estado"] ? new Date(orden["Fecha de Estado"]).toLocaleDateString("es-ES") : null,
    empleado: orden["Usuario"],
    observacion: orden["Observación"],
    "Cantidad en Almacén": orden["Cantidad en Almacén"], // Nueva propiedad añadida
  }));

  /** Filtrar productos con stock crítico (menos de 100 unidades) */
  const criticalStockItems = useMemo(() => {
    return inventoryData.filter((item) => item["Stock Total"] < 100);
  }, [inventoryData]);

  /** Función para obtener los estados disponibles según la jerarquía definida en la BD */
  const getAvailableStatusOptions = (currentStatus: string): string[] => {
    const estadoLower = currentStatus.toLowerCase();

    switch (estadoLower) {
      case "pendiente":
        return ["Aprobado", "Cancelado"];
      case "aprobado":
        return ["Finalizado", "Cancelado"];
      default:
        // Para estados terminales (finalizado, cancelado) u otros, no hay opciones.
        return [];
    }
  };

  return (
    <div className="space-y-4">
      {/** Header con título y botones de acción */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Inventario</h1>
      </div>

      {/** Cards de estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/** Stock total en Almacén */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock total en Almacén</CardTitle>
            <Badge variant="outline">Tiempo real</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="flex items-center justify-center h-24 w-24 rounded-full border-8">
                  <div className="text-3xl font-bold">
                    {inventoryData.reduce((total, item) => total + item["En Almacén"], 0)}
                  </div>
                </div>
                <div className="mt-2 text-sm">Unidades totales</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span className="text-sm">{inventoryData.length} Productos</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/** Stock en Anaquel */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock en Anaquel</CardTitle>
            <Badge variant="outline">Tiempo real</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="flex items-center justify-center h-24 w-24 rounded-full border-8">
                  <div className="text-3xl font-bold">
                    {inventoryData.reduce((total, item) => total + item["En Anaquel"], 0)}
                  </div>
                </div>
                <div className="mt-2 text-sm">Unidades en tienda</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span className="text-sm">
                    {inventoryData.filter((item) => item["En Anaquel"] > 0).length} Productos disponibles
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {inventoryData.length > 0
                      ? Math.round(
                          (inventoryData.reduce((total, item) => total + item["En Anaquel"], 0) /
                            inventoryData.reduce((total, item) => total + item["Stock Total"], 0)) *
                            100
                        )
                      : 0}
                    %
                  </Badge>
                  <span className="text-sm">Del inventario total</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/** Stock Crítico */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock crítico</CardTitle>
            <Badge variant="outline">Día</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="flex items-center justify-center h-24 w-24 rounded-full border-8">
                  <div className="text-3xl font-bold">{criticalStockItems.length}</div>
                </div>
                <div className="mt-2 text-sm">Productos &lt; 100 </div>
              </div>
              <div className="space-y-2">
                {criticalStockItems
                  .sort((a, b) => a["Stock Total"] - b["Stock Total"])
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">
                        {item.Nombre} - {item["Stock Total"]}{" "}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" onClick={() => setIsCriticalStockModalOpen(true)}>
                Ver lista completa
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {puedeVerOrdenesDeReposicion() && (
        <>
          {/** Sección de Alertas de Reposición */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-large">Alertas de Reposición</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Productos en anaquel con alerta de reposición física en pasillo (menos de 20 unidades)
                  </p>

                  <div className="grid grid-cols-1 gap-3">
                    {alertasReposicion.slice(0, 2).map((alerta) => (
                      <div
                        key={alerta.id}
                        className={`flex items-center justify-between border rounded-md p-3 ${getStatusBackgroundColor(
                          alerta.estado || ""
                        )}`}
                      >
                        <div className="flex items-start gap-3">
                          <AlertTriangle
                            className={`h-5 w-5 ${getStatusIconColor(alerta.estado || "")} flex-shrink-0 mt-0.5`}
                          />
                          <div>
                            <div className="font-medium">{alerta.producto}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Tag className="h-3 w-3" /> {alerta.sku}
                            </div>
                            <div className="text-sm mt-1">Ubicación: {alerta.ubicacion}</div>
                            {alerta.observacion && (
                              <div className="text-sm text-muted-foreground mt-1">
                                Observación: {alerta.observacion}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">{alerta.fecha}</div>
                          <div className="font-medium text-amber-600 mt-1">
                            {alerta.stock
                              ? alerta.stock + " unidades solicitadas"
                              : "No se han indicado las unidadades"}
                          </div>
                          {alerta.estado && (
                            <div className="mt-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{alerta.estado}</Badge>
                                {alerta.fechaEstado && (
                                  <span className="text-xs text-muted-foreground">
                                    Actualizado: {alerta.fechaEstado}
                                  </span>
                                )}
                              </div>
                              {puedeEditarOrdenesDeReposicion() &&
                                getAvailableStatusOptions(alerta.estado).length > 0 && (
                                  <div className="flex gap-2 justify-end text-right">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleEditStatus(alerta.id, alerta.estado)}
                                      className="text-xs border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors mt-1 justify-end text-right"
                                    >
                                      <Edit className="h-3 w-3 mr-1 justify-end text-right" />
                                      Editar Estado
                                    </Button>
                                  </div>
                                )}
                            </div>
                          )}
                          <div className="flex gap-2 mt-2 justify-end">
                            <Button variant="outline" size="sm" onClick={() => generarPDFOrdenReposicion(alerta)}>
                              <FileText className="h-3 w-3 mr-1" />
                              Ver PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <AlertsModal alerts={alertasReposicion} onEditStatus={handleEditStatus} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/** Tabla de Productos con Filtros Mejorados */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Registro de Inventario</CardTitle>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Limpiar ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/** Panel de Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            {/** Filtro de búsqueda */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar producto</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Nombre o SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/** Filtro de categoría */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoría</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/** Filtro de estado de stock */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Estado de stock</label>
              <Select value={selectedStockStatus} onValueChange={setSelectedStockStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="bajo">Bajo</SelectItem>
                  <SelectItem value="crítico">Crítico</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/** Filtro de nivel de stock */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Nivel de stock</label>
              <Select value={stockLevelFilter} onValueChange={setStockLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los niveles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los niveles</SelectItem>
                  <SelectItem value="sin_stock">Sin stock (0)</SelectItem>
                  <SelectItem value="bajo_stock">Bajo stock (1-50)</SelectItem>
                  <SelectItem value="stock_normal">Stock normal (51-200)</SelectItem>
                  <SelectItem value="alto_stock">Alto stock (200+)</SelectItem>
                  <SelectItem value="solo_almacen">Solo en almacén</SelectItem>
                  <SelectItem value="solo_anaquel">Solo en anaquel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/** Información de resultados filtrados */}
          {activeFiltersCount > 0 && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                Mostrando {totalItems} de {inventoryData.length} productos
                {activeFiltersCount > 0 &&
                  ` (${activeFiltersCount} filtro${activeFiltersCount > 1 ? "s" : ""} aplicado${
                    activeFiltersCount > 1 ? "s" : ""
                  })`}
              </p>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center">
                    SKU
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Nombre
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Stock Total
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>En Almacén</TableHead>
                <TableHead>En Anaquel</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <TableRow key={item.SKU}>
                    <TableCell>{item.SKU}</TableCell>
                    <TableCell className="font-medium">{item.Nombre}</TableCell>
                    <TableCell>{item.Categoría}</TableCell>
                    <TableCell>
                      <StockIndicator stock={item["Stock Total"]} threshold={100} />
                    </TableCell>
                    <TableCell>{item["En Almacén"]}</TableCell>
                    <TableCell>{item["En Anaquel"]}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{getStockStatus(item["Stock Total"], 50, 100)}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No se encontraron productos que coincidan con los filtros aplicados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/** Paginación funcional */}
          {totalItems > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Mostrando {startIndex + 1}-{Math.min(endIndex, totalItems)} de {totalItems} productos
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" onClick={goToPrevious} disabled={currentPage === 1}>
                  Anterior
                </Button>

                {getPageNumbers().map((pageNum, index) =>
                  pageNum === "..." ? (
                    <span key={index} className="px-3 py-1 text-sm">
                      ...
                    </span>
                  ) : (
                    <Button
                      key={index}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      className="px-3"
                      onClick={() => goToPage(pageNum as number)}
                    >
                      {pageNum}
                    </Button>
                  )
                )}

                <Button variant="outline" size="sm" onClick={goToNext} disabled={currentPage === totalPages}>
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/** Modal de Stock Crítico */}
      <CriticalStockModal
        open={isCriticalStockModalOpen}
        onOpenChange={setIsCriticalStockModalOpen}
        criticalStockItems={criticalStockItems}
      />

      {/** Modal de Edición de Estado de Orden */}
      <Dialog open={isEditStatusModalOpen} onOpenChange={setIsEditStatusModalOpen}>
        <DialogContent className="sm:max-w-md bg-white border shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">Editar Estado de Orden</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Orden ID:</p>
              <p className="font-medium text-gray-900">#{editingOrderId}</p>
              {editingOrderId && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Estado actual:</p>
                  <p className="font-medium text-gray-900">
                    {alertasReposicion.find((orden) => orden.id === editingOrderId)?.estado || "N/A"}
                  </p>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium mb-3 text-gray-900">Selecciona el nuevo estado para esta orden:</p>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  {editingOrderId &&
                    getAvailableStatusOptions(
                      alertasReposicion.find((orden) => orden.id === editingOrderId)?.estado || ""
                    ).map((status) => (
                      <SelectItem key={status} value={status}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              status === "Completada"
                                ? "bg-green-500"
                                : status === "En Proceso"
                                ? "bg-blue-500"
                                : status === "Pendiente"
                                ? "bg-yellow-500"
                                : status === "cancelado"
                                ? "bg-red-500"
                                : "bg-gray-500"
                            }`}
                          />
                          {status}
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/** Campos adicionales para estado "Finalizado" */}
            {newStatus.toLowerCase() === "finalizado" && (
              <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-lg border">
                <p className="text-sm font-medium text-gray-900 mb-3">Información adicional requerida:</p>

                {/** Mostrar stock disponible en almacén */}
                {editingOrderId && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Stock disponible en almacén:</span>
                      <span className="text-sm font-bold text-blue-900">
                        {alertasReposicion.find((orden) => orden.id === editingOrderId)?.["Cantidad en Almacén"] || 0}{" "}
                        unidades
                      </span>
                    </div>
                    <p className="text-xs text-blue-700 mt-1">
                      No puedes procesar más unidades de las disponibles en el almacén.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Cantidad de productos *</label>
                  <Input
                    type="number"
                    placeholder="Cantidad de productos finalizados"
                    value={quantity}
                    onChange={(e) => {
                      const valor = e.target.value;
                      setQuantity(valor);

                      // Validación en tiempo real
                      if (editingOrderId && valor) {
                        const cantidadDisponible =
                          alertasReposicion.find((orden) => orden.id === editingOrderId)?.["Cantidad en Almacén"] || 0;
                        const cantidadIngresada = parseInt(valor, 10);

                        if (cantidadIngresada > cantidadDisponible) {
                          e.target.setCustomValidity(`No puedes procesar más de ${cantidadDisponible} unidades`);
                        } else {
                          e.target.setCustomValidity("");
                        }
                      }
                    }}
                    disabled={isUpdatingStatus}
                    min="1"
                    max={
                      editingOrderId
                        ? alertasReposicion.find((orden) => orden.id === editingOrderId)?.["Cantidad en Almacén"] || 0
                        : undefined
                    }
                    className={`w-full ${
                      quantity &&
                      editingOrderId &&
                      parseInt(quantity, 10) >
                        (alertasReposicion.find((orden) => orden.id === editingOrderId)?.["Cantidad en Almacén"] || 0)
                        ? "border-red-300 bg-red-50"
                        : ""
                    }`}
                  />
                  {/** Mensaje de error en tiempo real */}
                  {quantity &&
                    editingOrderId &&
                    parseInt(quantity, 10) >
                      (alertasReposicion.find((orden) => orden.id === editingOrderId)?.["Cantidad en Almacén"] ||
                        0) && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Cantidad excede el stock disponible (
                        {alertasReposicion.find((orden) => orden.id === editingOrderId)?.["Cantidad en Almacén"] ||
                          0}{" "}
                        unidades)
                      </p>
                    )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Observación</label>
                  <Textarea
                    placeholder="Observaciones adicionales (opcional)"
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    disabled={isUpdatingStatus}
                    rows={3}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handleCancelStatusChange} className="flex-1">
              <XIcon className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={handleAcceptStatusChange}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!newStatus || isUpdatingStatus}
            >
              <Check className="h-4 w-4 mr-2" />
              Actualizar Estado
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/** Componente para mostrar indicador de stock con tipos definidos */
function StockIndicator({ stock, threshold }: { stock: number; threshold: number }) {
  let indicatorClass = "bg-gray-200";

  if (stock <= threshold) {
    indicatorClass = "bg-gray-400";
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-full ${indicatorClass}`}></div>
      <span>{stock}</span>
    </div>
  );
}

/** Función para determinar el estado del stock basado en niveles críticos */
function getStockStatus(totalStock: number, minStock: number, reorderPoint: number): string {
  if (totalStock <= minStock) {
    return "Crítico";
  } else if (totalStock <= reorderPoint) {
    return "Bajo";
  } else {
    return "Normal";
  }
}

/** Función para obtener las clases de color según el estado de la orden */
function getStatusBackgroundColor(estado: string): string {
  const estadoLower = estado.toLowerCase();

  switch (estadoLower) {
    case "aprobado":
      return "bg-green-50 border-green-200";
    case "finalizado":
      return "bg-teal-50 border-teal-200";
    case "pendiente":
      return "bg-yellow-50 border-yellow-200";
    case "en proceso":
      return "bg-blue-50 border-blue-200";
    case "cancelado":
      return "bg-red-50 border-red-200";
    case "en revisión":
      return "bg-purple-50 border-purple-200";
    default:
      return "bg-amber-50 border-amber-200";
  }
}

/** Función para obtener el color del icono según el estado de la orden */
function getStatusIconColor(estado: string): string {
  const estadoLower = estado.toLowerCase();

  switch (estadoLower) {
    case "aprobado":
      return "text-green-500";
    case "finalizado":
      return "text-teal-500";
    case "pendiente":
      return "text-yellow-500";
    case "en proceso":
      return "text-blue-500";
    case "cancelado":
      return "text-red-500";
    case "en revisión":
      return "text-purple-500";
    default:
      return "text-amber-500";
  }
}
