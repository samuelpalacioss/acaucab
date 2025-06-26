"use client";

import { useState } from "react";
import { Package, Calendar, User, Building2, Hash, Edit, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { OrdenCompra } from "@/models/orden-compra";
import { actualizarEstadoOrdenCompra } from "@/lib/server-actions";
import { useUser } from "@/store/user-store";

interface OrdenCompraDetalleClientProps {
  orden: OrdenCompra;
  estadoActual?: string; // Estado actual de la orden
}

export default function OrdenCompraDetalleClient({ orden, estadoActual = "Pendiente" }: OrdenCompraDetalleClientProps) {
  const { usuario } = useUser();
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [observation, setObservation] = useState("");

  /** Función para obtener los estados disponibles según la jerarquía */
  const getAvailableStatusOptions = (currentStatus: string): string[] => {
    const estadoLower = currentStatus.toLowerCase();

    switch (estadoLower) {
      case "pendiente":
        return ["aprobado", "cancelado"];
      case "aprobado":
        return ["En Proceso", "cancelado"];
      case "en proceso":
        return ["finalizado", "cancelado"];
      default:
        return [];
    }
  };

  /** Función para obtener las clases de color según el estado de la orden */
  const getStatusBackgroundColor = (estado: string): string => {
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
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  /** Función para obtener el color del badge según el estado */
  const getStatusBadgeColor = (estado: string): "default" | "secondary" | "destructive" | "outline" => {
    const estadoLower = estado.toLowerCase();

    switch (estadoLower) {
      case "finalizado":
        return "default"; // Verde
      case "aprobado":
        return "secondary"; // Azul
      case "en proceso":
        return "outline"; // Azul claro
      case "cancelado":
        return "destructive"; // Rojo
      default:
        return "outline"; // Gris
    }
  };

  const handleEditStatus = () => {
    setNewStatus("");
    setObservation("");
    setIsEditStatusModalOpen(true);
  };

  const handleAcceptStatusChange = async () => {
    if (newStatus && usuario?.id) {
      setIsUpdatingStatus(true);
      try {
        // Solo incluir observación si el estado es "finalizado"
        const observacionFinal = newStatus.toLowerCase() === "finalizado" ? observation : undefined;
        
        await actualizarEstadoOrdenCompra(orden.orden_id, newStatus, usuario.id, observacionFinal);
        setIsEditStatusModalOpen(false);
        setNewStatus("");
        setObservation("");
        alert(`Estado actualizado a: ${newStatus}`);
        window.location.reload();
      } catch (error) {
        console.error("Error al actualizar el estado de la orden:", error);
        alert("Hubo un error al actualizar el estado de la orden. Por favor, inténtelo más tarde.");
      } finally {
        setIsUpdatingStatus(false);
      }
    }
  };

  const handleCancelStatusChange = () => {
    setIsEditStatusModalOpen(false);
    setNewStatus("");
    setObservation("");
  };

  /** Formatear fecha */
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No especificada";
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  /** Formatear moneda */
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-VE", {
      style: "currency",
      currency: "VES",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  /** Verificar si se pueden editar estados */
  const canEditStatus = getAvailableStatusOptions(estadoActual).length > 0;

  return (
    <div className="space-y-6">
      {/** Header con información principal */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orden de Compra #{orden.orden_id}</h1>
          <p className="text-muted-foreground mt-1">
            Solicitada el {formatDate(orden.fecha_solicitud)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={getStatusBadgeColor(estadoActual)} className="text-sm px-3 py-1">
            {estadoActual}
          </Badge>
          {canEditStatus && (
            <Button onClick={handleEditStatus} variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Editar Estado
            </Button>
          )}
        </div>
      </div>

      {/** Estado actual de la orden */}
      <Card className={getStatusBackgroundColor(estadoActual)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Estado de la Orden
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">Estado actual: {estadoActual}</p>
              {!canEditStatus && (
                <p className="text-sm text-muted-foreground mt-1">
                  Esta orden se encuentra en un estado terminal y no puede ser modificada.
                </p>
              )}
            </div>
            {canEditStatus && (
              <div className="text-sm text-muted-foreground">
                <p>Próximos estados disponibles:</p>
                <div className="flex gap-2 mt-1">
                  {getAvailableStatusOptions(estadoActual).map((status) => (
                    <Badge key={status} variant="outline" className="text-xs">
                      {status}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/** Información del Producto */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Información del Producto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Producto</p>
              <p className="text-lg font-semibold">{orden.nombre_cerveza}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Presentación</p>
              <p className="text-lg">{orden.nombre_presentacion}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">SKU</p>
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <p className="font-mono">{orden.sku}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Unidades Solicitadas</p>
              <p className="text-2xl font-bold text-primary">{orden.unidades_solicitadas}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Precio Unitario</p>
              <p className="text-lg">{formatCurrency(orden.precio_unitario)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Precio Total</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(orden.precio_total)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/** Información de la Orden */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/** Detalles de la Orden */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Detalles de la Orden
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Fecha de Solicitud</p>
              <p className="text-lg">{formatDate(orden.fecha_solicitud)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fecha de Entrega Estimada</p>
              <p className="text-lg">{formatDate(orden.fecha_entrega)}</p>
            </div>
            {orden.observacion && (
              <div>
                <p className="text-sm text-muted-foreground">Observaciones</p>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md">{orden.observacion}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/** Información del Solicitante y Proveedor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información de Contacto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Solicitado por</p>
              <p className="text-lg">{orden.usuario_nombre || "No especificado"}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Proveedor</p>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <p className="text-lg font-semibold">
                  {orden.proveedor_razon_social || "No especificado"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/** Modal de Edición de Estado */}
      <Dialog open={isEditStatusModalOpen} onOpenChange={setIsEditStatusModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Estado de Orden</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Orden ID:</p>
              <p className="font-medium">#{orden.orden_id}</p>
              <p className="text-sm text-muted-foreground mt-2">Estado actual:</p>
              <p className="font-medium">{estadoActual}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">Selecciona el nuevo estado:</p>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableStatusOptions(estadoActual).map((status) => (
                    <SelectItem key={status} value={status}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            status === "finalizado"
                              ? "bg-green-500"
                              : status === "En Proceso"
                              ? "bg-blue-500"
                              : status === "aprobado"
                              ? "bg-yellow-500"
                              : status === "Pendiente"
                              ? "bg-gray-500"
                              : "bg-red-500"
                          }`}
                        />
                        {status}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/** Campo de observación para estado "finalizado" */}
            {newStatus.toLowerCase() === "finalizado" && (
              <div className="space-y-2 mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-900 mb-3">Finalización de la orden:</p>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700">Observación de finalización</label>
                  <Textarea
                    placeholder="Observaciones sobre la finalización de la orden (opcional)"
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    disabled={isUpdatingStatus}
                    rows={3}
                    className="w-full"
                  />
                  <p className="text-xs text-green-600">
                    Esta observación se agregará a los detalles de la orden una vez finalizado.
                  </p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handleCancelStatusChange} className="flex-1">
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={handleAcceptStatusChange}
              className="flex-1"
              disabled={!newStatus || isUpdatingStatus}
            >
              <Check className="h-4 w-4 mr-2" />
              {isUpdatingStatus ? "Actualizando..." : "Actualizar Estado"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 