"use client"

import { AlertTriangle, Tag, Plus, FileText, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { generarPDFOrdenReposicion } from "@/lib/pdf-generator"

/** Función para obtener las clases de color según el estado de la orden */
function getStatusBackgroundColor(estado: string): string {
  const estadoLower = estado.toLowerCase();
  
  switch (estadoLower) {
    case 'aprobada':
    case 'completada':
      return 'bg-green-50 border-green-200';
    case 'pendiente':
      return 'bg-yellow-50 border-yellow-200';
    case 'finalizado':
      return 'bg-white border-gray-200';
    case 'en proceso':
      return 'bg-blue-50 border-blue-200';
    case 'cancelada':
      return 'bg-red-50 border-red-200';
    case 'en revisión':
      return 'bg-purple-50 border-purple-200';
    default:
      return 'bg-amber-50 border-amber-200'; // Color por defecto
  }
}

/** Función para obtener el color del icono según el estado de la orden */
function getStatusIconColor(estado: string): string {
  const estadoLower = estado.toLowerCase();
  
  switch (estadoLower) {
    case 'aprobada':
    case 'completada':
      return 'text-green-500';
    case 'pendiente':
      return 'text-yellow-500';
    case 'finalizado':
      return 'text-gray-500';
    case 'en proceso':
      return 'text-blue-500';
    case 'cancelada':
      return 'text-red-500';
    case 'en revisión':
      return 'text-purple-500';
    default:
      return 'text-amber-500'; // Color por defecto
  }
}

interface Alert {
  id: number
  producto: string
  sku: string
  ubicacion: string
  stock: number
  minimo: number
  fecha: string
  estado?: string
  fechaEstado?: string | null
  empleado?: string
  observacion?: string
}

interface AlertsModalProps {
  alerts: Alert[]
  onEditStatus?: (orderId: number, currentStatus: string) => void
}

export function AlertsModal({ alerts, onEditStatus }: AlertsModalProps) {
  return (
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
              <div key={alerta.id} className={`flex items-center justify-between border rounded-md p-3 ${getStatusBackgroundColor(alerta.estado || '')}`}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`h-5 w-5 ${getStatusIconColor(alerta.estado || '')} flex-shrink-0 mt-0.5`} />
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
                    {alerta.stock} unidades solicitadas
                  </div>
                  
                  {/** Estado y botón de edición */}
                  {alerta.estado && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{alerta.estado}</Badge>
                        {alerta.fechaEstado && (
                          <span className="text-xs text-muted-foreground">
                            Actualizado: {alerta.fechaEstado}
                          </span>
                        )}
                      </div>
                      {onEditStatus && alerta.estado?.toLowerCase() !== 'finalizado' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditStatus(alerta.id, alerta.estado!)}
                          className="text-xs border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors mt-1"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Editar Estado
                        </Button>
                      )}
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-2 justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => generarPDFOrdenReposicion(alerta)}
                    >
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
  )
} 