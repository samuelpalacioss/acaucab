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

interface Alert {
  id: number
  producto: string
  sku: string
  ubicacion: string
  stock: number
  minimo: number
  fecha: string
  estado?: string
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
              <div key={alerta.id} className="flex items-center justify-between border rounded-md p-3 bg-amber-50">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
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
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{alerta.estado}</Badge>
                      {onEditStatus && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditStatus(alerta.id, alerta.estado!)}
                          className="text-xs border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors"
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