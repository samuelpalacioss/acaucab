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
import { usePermissions } from "@/store/user-store";

interface OrdenCompraDetalleClientProps {
  orden: OrdenCompra;
  estadoActual?: string; // Estado actual de la orden
}

export default function OrdenCompraDetalleClient({ orden, estadoActual = "Pendiente" }: OrdenCompraDetalleClientProps) {

  const { puedeEditarOrdenesDeCompra, puedeEditarOrdenesDeCompraProveedor } = usePermissions();
  const { usuario, esMiembro, getMiembroInfo } = useUser();
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);

  const [newStatus, setNewStatus] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [observation, setObservation] = useState("");

  /** Función para verificar si el usuario es el miembro correspondiente a esta orden */
  const esElMiembroCorrespondiente = (): boolean => {
    if (!esMiembro()) return false;
    
    const miembroInfo = getMiembroInfo();
    if (!miembroInfo || !orden.proveedor_rif || !orden.proveedor_naturaleza_rif) return false;
    
    return (
      miembroInfo.rif === orden.proveedor_rif &&
      miembroInfo.naturaleza_rif === orden.proveedor_naturaleza_rif
    );
  };

  /** Función para obtener los estados disponibles según la jerarquía y permisos del usuario */
  const getAvailableStatusOptions = (currentStatus: string): string[] => {
    const estadoLower = currentStatus.toLowerCase();
    const esMiembroOrdenCorrespondiente = esElMiembroCorrespondiente();

    /** CASO 1: Usuario es un miembro (proveedor) */
    if (esMiembro()) {
      // Los miembros solo pueden editar órdenes que les corresponden
      if (!esMiembroOrdenCorrespondiente) {
        return []; // No puede editar órdenes que no le corresponden
      }
      
      // Los miembros solo pueden editar órdenes en estado "aprobado"
      if (estadoLower === "aprobado") {
        return ["En Proceso", "cancelado"];
      }
      
      return []; // No puede editar en otros estados
    }

    /** CASO 2: Usuario tiene permiso para editar órdenes de compra (empleados) */
    if (puedeEditarOrdenesDeCompra()) {
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
    }

    /** CASO 3: Usuario tiene permiso para editar órdenes de compra de proveedores */
    if (puedeEditarOrdenesDeCompraProveedor()) {
      // Solo puede editar si es el miembro correspondiente a la orden
      if (!esMiembroOrdenCorrespondiente) {
        return []; // No puede editar órdenes que no le corresponden
      }
      
      // Solo puede editar órdenes en estado "aprobado"
      if (estadoLower === "aprobado") {
        return ["En Proceso", "cancelado"];
      }
      
      return []; // No puede editar en otros estados
    }

    /** CASO 4: Usuario sin permisos relevantes */
    return [];
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

  /** Función para obtener mensaje explicativo sobre permisos de edición */
  const getPermissionMessage = (): { canEdit: boolean; message: string; type: 'info' | 'warning' | 'success' } => {
    const esMiembroOrdenCorrespondiente = esElMiembroCorrespondiente();
    const estadoLower = estadoActual.toLowerCase();

    // Si es miembro
    if (esMiembro()) {
      if (!esMiembroOrdenCorrespondiente) {
        return {
          canEdit: false,
          message: "Esta orden pertenece a otro proveedor. Solo puedes editar órdenes asignadas a tu empresa.",
          type: 'warning'
        };
      }
      if (estadoLower !== "aprobado") {
        return {
          canEdit: false,
          message: `Como proveedor, solo puedes editar órdenes en estado "Aprobado". Estado actual: ${estadoActual}`,
          type: 'info'
        };
      }
      return {
        canEdit: true,
        message: "Puedes cambiar esta orden a 'En Proceso' para comenzar a trabajar en ella, o 'Cancelado' si no puedes cumplirla.",
        type: 'success'
      };
    }

    // Si es empleado con permisos generales
    if (puedeEditarOrdenesDeCompra()) {
      if (estadoLower === "finalizado" || estadoLower === "cancelado") {
        return {
          canEdit: false,
          message: "Esta orden ya está finalizada o cancelada y no puede ser modificada.",
          type: 'info'
        };
      }
      return {
        canEdit: true,
        message: "Como empleado, puedes gestionar el flujo completo de esta orden según su estado actual.",
        type: 'success'
      };
    }

    // Si tiene permisos de proveedor pero no es miembro
    if (puedeEditarOrdenesDeCompraProveedor()) {
      return {
        canEdit: false,
        message: "Tienes permisos de proveedor pero no estás registrado como miembro. Contacta al administrador.",
        type: 'warning'
      };
    }

    return {
      canEdit: false,
      message: "No tienes permisos para editar órdenes de compra.",
      type: 'warning'
    };
  };

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

      {/** Información de permisos de edición */}
      {(() => {
        const permissionInfo = getPermissionMessage();
        const bgColor = permissionInfo.type === 'success' 
          ? 'bg-green-50 border-green-200' 
          : permissionInfo.type === 'warning' 
          ? 'bg-amber-50 border-amber-200' 
          : 'bg-blue-50 border-blue-200';
        const textColor = permissionInfo.type === 'success' 
          ? 'text-green-800' 
          : permissionInfo.type === 'warning' 
          ? 'text-amber-800' 
          : 'text-blue-800';
        
        return (
          <Card className={bgColor}>
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {permissionInfo.type === 'success' && (
                    <Check className="h-5 w-5 text-green-600" />
                  )}
                  {permissionInfo.type === 'warning' && (
                    <X className="h-5 w-5 text-amber-600" />
                  )}
                  {permissionInfo.type === 'info' && (
                    <Package className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-grow">
                  <p className={`text-sm font-medium ${textColor} mb-1`}>
                    {permissionInfo.canEdit ? 'Permisos de Edición' : 'Restricciones de Edición'}
                  </p>
                  <p className={`text-sm ${textColor}`}>
                    {permissionInfo.message}
                  </p>
                  {esMiembro() && esElMiembroCorrespondiente() && (
                    <p className="text-xs text-gray-600 mt-2">
                      • RIF de tu empresa: {getMiembroInfo()?.naturaleza_rif}-{getMiembroInfo()?.rif}
                      
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })()}

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
                  {(() => {
                    const permissionInfo = getPermissionMessage();
                    if (!permissionInfo.canEdit) {
                      return permissionInfo.message;
                    }
                    return "Esta orden se encuentra en un estado terminal y no puede ser modificada.";
                  })()}
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