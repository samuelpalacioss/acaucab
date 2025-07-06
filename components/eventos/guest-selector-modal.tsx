"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Invitado } from "@/models/evento"
import { llamarFuncion } from "@/lib/server-actions"

interface GuestSelectorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (invitados: Invitado[]) => void
  selectedGuests: Invitado[]
}

export function GuestSelectorModal({ open, onOpenChange, onConfirm, selectedGuests }: GuestSelectorModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [tempSelected, setTempSelected] = useState<Invitado[]>(selectedGuests)
  const [invitadosData, setInvitadosData] = useState<Invitado[]>([])

  useEffect(() => {
    async function fetchInvitados() {
      try {
        const invitados = await llamarFuncion<Invitado>("fn_get_invitados")
        setInvitadosData(invitados)
      } catch (error: any) {
        console.error("❌ Error al obtener invitados:", error.message)
      }
    }
    if (open) fetchInvitados()
  }, [open])

  const filteredInvitados = invitadosData.filter(
    (invitado) =>
      invitado.primerNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitado.primerApellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (invitado.nacionalidad + '-' + invitado.cedula).includes(searchTerm) ||
      invitado.tipoInvitado.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleToggleInvitado = (invitado: Invitado) => {
    const isSelected = tempSelected.some((g) => g.id === invitado.id)
    if (isSelected) {
      setTempSelected(tempSelected.filter((g) => g.id !== invitado.id))
    } else {
      setTempSelected([...tempSelected, invitado])
    }
  }

  const handleConfirm = () => {
    onConfirm(tempSelected)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Seleccionar Invitados Existentes</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar invitados..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="border rounded-md max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Seleccionar</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Cédula</TableHead>
                  <TableHead>Tipo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvitados.map((invitado) => (
                  <TableRow key={invitado.id}>
                    <TableCell>
                      <Checkbox
                        checked={tempSelected.some((g) => g.id === invitado.id)}
                        onCheckedChange={() => handleToggleInvitado(invitado)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {invitado.primerNombre} {invitado.primerApellido}
                    </TableCell>
                    <TableCell>{invitado.nacionalidad}-{invitado.cedula}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{invitado.tipoInvitado}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">{tempSelected.length} invitados seleccionados</div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={handleConfirm}>Confirmar Selección</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
