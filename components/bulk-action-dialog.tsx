"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Check, X, Mail } from "lucide-react"

interface BulkActionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  action: "approve" | "reject" | "request-info"
  count: number
}

export function BulkActionDialog({ open, onOpenChange, action, count }: BulkActionDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleAction = () => {
    setIsLoading(true)
    // Simular acción
    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
      // Aquí iría la lógica para realizar la acción
    }, 1000)
  }

  let title = ""
  let description = ""
  let icon = null
  let buttonText = ""

  switch (action) {
    case "approve":
      title = "Aprobar solicitudes"
      description = `¿Estás seguro de que deseas aprobar ${count} solicitudes seleccionadas?`
      icon = <Check className="h-4 w-4 mr-2" />
      buttonText = "Aprobar"
      break
    case "reject":
      title = "Rechazar solicitudes"
      description = `¿Estás seguro de que deseas rechazar ${count} solicitudes seleccionadas?`
      icon = <X className="h-4 w-4 mr-2" />
      buttonText = "Rechazar"
      break
    case "request-info":
      title = "Solicitar información adicional"
      description = `Enviar solicitud de información adicional a ${count} proveedores seleccionados.`
      icon = <Mail className="h-4 w-4 mr-2" />
      buttonText = "Enviar solicitud"
      break
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4">{description}</p>
          {action === "reject" && (
            <div className="space-y-2">
              <Label htmlFor="reason">Motivo del rechazo</Label>
              <Textarea
                id="reason"
                placeholder="Ingrese el motivo del rechazo..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          )}
          {action === "request-info" && (
            <div className="space-y-2">
              <Label htmlFor="info-request">Información solicitada</Label>
              <Textarea
                id="info-request"
                placeholder="Detalle la información adicional requerida..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleAction} disabled={isLoading || (action !== "approve" && !message)}>
            {icon}
            {isLoading ? "Procesando..." : buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
