"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Check, X, Mail, Calendar } from "lucide-react"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  providerId: string
}

export function ApproveDialog({ open, onOpenChange, providerId }: DialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [affiliationDate, setAffiliationDate] = useState(getTodayDate())
  const [monthlyFee, setMonthlyFee] = useState("5000.00")

  function getTodayDate() {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const handleApprove = () => {
    setIsLoading(true)
    // Simular aprobación
    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
      // Aquí iría la lógica para aprobar la solicitud
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aprobar solicitud de proveedor</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4">
            Al aprobar esta solicitud, se creará un registro permanente del proveedor y se enviará un correo de
            bienvenida.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="affiliation-date">Fecha de afiliación</Label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <Input
                  id="affiliation-date"
                  type="date"
                  value={affiliationDate}
                  onChange={(e) => setAffiliationDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly-fee">Cuota mensual (Bs)</Label>
              <Input id="monthly-fee" type="text" value={monthlyFee} onChange={(e) => setMonthlyFee(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="welcome-note">Nota de bienvenida (opcional)</Label>
              <Textarea id="welcome-note" placeholder="Mensaje personalizado para el proveedor..." />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleApprove} disabled={isLoading}>
            <Check className="h-4 w-4 mr-2" />
            {isLoading ? "Procesando..." : "Confirmar aprobación"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function RejectDialog({ open, onOpenChange, providerId }: DialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [reason, setReason] = useState("")

  const handleReject = () => {
    setIsLoading(true)
    // Simular rechazo
    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
      // Aquí iría la lógica para rechazar la solicitud
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rechazar solicitud de proveedor</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4">
            Al rechazar esta solicitud, se notificará al proveedor y se guardará el motivo del rechazo.
          </p>
          <div className="space-y-2">
            <Label htmlFor="reject-reason">Motivo del rechazo *</Label>
            <Textarea
              id="reject-reason"
              placeholder="Ingrese el motivo del rechazo..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Este motivo será incluido en el correo al proveedor.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleReject} disabled={isLoading || !reason}>
            <X className="h-4 w-4 mr-2" />
            {isLoading ? "Procesando..." : "Confirmar rechazo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function RequestInfoDialog({ open, onOpenChange, providerId }: DialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleRequestInfo = () => {
    setIsLoading(true)
    // Simular solicitud de información
    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
      // Aquí iría la lógica para solicitar información
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Solicitar información adicional</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4">
            Se enviará un correo electrónico al proveedor solicitando la información adicional requerida.
          </p>
          <div className="space-y-2">
            <Label htmlFor="info-request">Información solicitada *</Label>
            <Textarea
              id="info-request"
              placeholder="Detalle la información adicional requerida..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Sea específico sobre qué documentos o información se necesita para continuar con el proceso.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleRequestInfo} disabled={isLoading || !message}>
            <Mail className="h-4 w-4 mr-2" />
            {isLoading ? "Enviando..." : "Enviar solicitud"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
