"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Invitado } from "@/models/evento"
import { llamarFuncion } from "@/lib/server-actions"

interface NewGuestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (invitado: Invitado) => void
}

export function NewGuestModal({ open, onOpenChange, onConfirm }: NewGuestModalProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [cedula, setCedula] = useState("")
  const [guestType, setGuestType] = useState("")
  const [nacionalidad, setNacionalidad] = useState("")
  const [tiposInvitados, setTiposInvitados] = useState<string[]>([])

  useEffect(() => {
    async function fetchTipos() {
      try {
        const tiposArray = await llamarFuncion<any>("fn_get_tipos_invitados")
        setTiposInvitados(Array.isArray(tiposArray) ? tiposArray.map((t) => t.nombre) : [])
      } catch (error: any) {
        console.error("❌ Error al obtener tipos de invitados:", error.message)
      }
    }
    if (open) fetchTipos()
  }, [open])

  const handleSubmit = () => {
    const cedulaValida = /^\d+$/.test(cedula)
    if (firstName && lastName && cedula && guestType && nacionalidad && cedulaValida) {
      const nuevoInvitado: Invitado = {
        id: Date.now(),
        primerNombre: firstName,
        primerApellido: lastName,
        cedula,
        nacionalidad,
        tipoInvitado: guestType,
        esNuevo: true,
      }
      onConfirm(nuevoInvitado)
      // Reset form
      setFirstName("")
      setLastName("")
      setCedula("")
      setGuestType("")
      setNacionalidad("")
    }
  }

  const isFormValid = firstName && lastName && cedula && guestType && nacionalidad && /^\d+$/.test(cedula)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Invitado</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Primer nombre *</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ej: Juan"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Primer apellido *</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Ej: Pérez"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cedula">Número de cédula *</Label>
            <Input
              id="cedula"
              value={cedula}
              onChange={(e) => {
                // Solo permitir números
                const value = e.target.value.replace(/[^\d]/g, "")
                setCedula(value)
              }}
              placeholder="Ej: 12345678"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nacionalidad">Nacionalidad *</Label>
            <Select value={nacionalidad} onValueChange={setNacionalidad}>
              <SelectTrigger id="nacionalidad">
                <SelectValue placeholder="Seleccionar nacionalidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="V">Venezolano (V)</SelectItem>
                <SelectItem value="E">Extranjero (E)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guestType">Tipo de invitado *</Label>
            <Select value={guestType} onValueChange={setGuestType}>
              <SelectTrigger id="guestType">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {tiposInvitados.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={!isFormValid}>
              Crear Invitado
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
