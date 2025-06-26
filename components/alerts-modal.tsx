"use client";

import { AlertTriangle, Tag, Plus, FileText, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { generarPDFOrdenReposicion } from "@/lib/pdf-generator";
import { useState } from "react";
import { Check, XIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { actualizarEstadoOrdenReposicion } from "@/lib/server-actions";
import { usePermissions, useUser } from "@/store/user-store";

/** Función para obtener las clases de color según el estado de la orden */
function getStatusBackgroundColor(estado: string): string {
  const estadoLower = estado.toLowerCase();

  switch (estadoLower) {
    case "aprobado":
      return "bg-green-100 border-green-200";
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

/** Función para obtener los estados disponibles según la jerarquía */
function getAvailableStatusOptions(currentStatus: string): string[] {
  const estadoLower = currentStatus.toLowerCase();

  switch (estadoLower) {
    case "pendiente":
      return ["Aprobado", "Cancelado"];
    case "aprobado":
      return ["Finalizado", "Cancelado"];
    default:
      return [];
  }
}

interface Alert {
  id: number;
  producto: string;
  sku: string;
  ubicacion: string;
  stock: number;
  minimo: number;
  fecha: string;
  estado?: string;
  fechaEstado?: string | null;
  empleado?: string; // Now contains user name (could be employee, client, or member)
  observacion?: string;
}

interface AlertsModalProps {
  alerts: Alert[];
  onEditStatus?: (orderId: number, currentStatus: string) => void;
}

export function AlertsModal({ alerts, onEditStatus }: AlertsModalProps) {
  /** Estados para edición de estado de órdenes */
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [quantity, setQuantity] = useState<string>("");
  const [observation, setObservation] = useState<string>("");
  const { puedeEditarOrdenesDeReposicion } = usePermissions();
  const { usuario } = useUser();
  
  /** Manejar la edición de estado desde el modal de alertas */
  const handleEditStatus = (orderId: number, currentStatus: string) => {
    setEditingOrderId(orderId);
    setNewStatus(""); // Inicializar vacío para que el usuario seleccione
    setQuantity("");
    setObservation("");
    setIsEditStatusModalOpen(true);
  };

  /** Aceptar cambio de estado */
  const handleAcceptStatusChange = async () => {
    // Validar que si el estado es "Finalizado", la cantidad sea requerida
    if (newStatus.toLowerCase() === "finalizado" && (!quantity || quantity.trim() === "")) {
      alert("La cantidad es requerida cuando el estado es 'Finalizado'");
      return;
    }

    if (editingOrderId && newStatus && usuario?.id) {
      setIsUpdatingStatus(true);
      try {
        const unidades = newStatus.toLowerCase() === 'finalizado' ? parseInt(quantity, 10) : undefined
        const observacionFinal = newStatus.toLowerCase() === 'finalizado' ? observation : undefined

        console.log('Actualizando estado de la orden:', editingOrderId, newStatus, 'Usuario ID:', usuario.id)
        await actualizarEstadoOrdenReposicion(editingOrderId, newStatus, usuario.id, unidades, observacionFinal)
        setIsEditStatusModalOpen(false)
        setEditingOrderId(null)
        setNewStatus('')
        setQuantity('')
        setObservation('')
        alert(`Estado actualizado a: ${newStatus}`)
        // Aquí podrías llamar a una función para refrescar los datos
        window.location.reload() // Temporal - idealmente usarías un estado global o callback
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

  /** Cancelar cambio de estado */
  const handleCancelStatusChange = () => {
    setIsEditStatusModalOpen(false);
    setEditingOrderId(null);
    setNewStatus("");
    setQuantity("");
    setObservation("");
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Ver todas las alertas
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Alertas de Reposición</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Productos en anaquel con alerta de reposición física en pasillo (menos de 20 unidades)
            </p>

            <div className="grid grid-cols-1 gap-3 max-h-[500px] overflow-y-auto">
              {alerts.map((alerta) => (
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
                        <div className="text-sm text-muted-foreground mt-1">Observación: {alerta.observacion}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">{alerta.fecha}</div>
                    <div className="font-medium text-amber-600 mt-1">{alerta.stock} unidades solicitadas</div>

                    {/** Estado y botón de edición */}
                    {alerta.estado && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{alerta.estado}</Badge>
                          {alerta.fechaEstado && (
                            <span className="text-xs text-muted-foreground">Actualizado: {alerta.fechaEstado}</span>
                          )}
                        </div>
                        {onEditStatus && puedeEditarOrdenesDeReposicion() && getAvailableStatusOptions(alerta.estado!).length > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditStatus(alerta.id, alerta.estado!)}
                            className="text-xs border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors mt-1"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Editar Estado
                          </Button>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 mt-2 justify-end">
                      <Button variant="outline" size="sm" onClick={() => generarPDFOrdenReposicion(alerta)}>
                        <FileText className="h-3 w-3 mr-1" />
                        Ver Orden PDF
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {isEditStatusModalOpen && (
        <Dialog open={isEditStatusModalOpen} onOpenChange={handleCancelStatusChange}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Estado</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Estado
                </Label>
                <Select value={newStatus} onValueChange={(value) => setNewStatus(value)} disabled={isUpdatingStatus}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableStatusOptions(alerts.find((a) => a.id === editingOrderId)?.estado || "").map(
                      (status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/** Campos adicionales para estado "Finalizado" */}
              {newStatus.toLowerCase() === "finalizado" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                      Cantidad *
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Cantidad de productos"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="col-span-3"
                      disabled={isUpdatingStatus}
                      min="1"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="observation" className="text-right pt-2">
                      Observación
                    </Label>
                    <Textarea
                      id="observation"
                      placeholder="Observaciones adicionales (opcional)"
                      value={observation}
                      onChange={(e) => setObservation(e.target.value)}
                      className="col-span-3"
                      disabled={isUpdatingStatus}
                      rows={3}
                    />
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAcceptStatusChange} disabled={isUpdatingStatus}>
                {isUpdatingStatus ? "Actualizando..." : "Actualizar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
