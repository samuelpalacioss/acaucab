"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UserPlus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Tipos para los datos del formulario
interface MemberFormData {
  // Identificación primaria
  cedula: string
  nombres: string
  apellidos: string
  
  // Datos de contacto
  email: string
  telefono: string
  
  // Cargo y organización
  cargo: string
  departamentos: string
  
  // Información laboral
  fechaIngreso: string
  tipoContrato: string
  salario: string
  
  // Horarios & asistencia
  horario: string
}

export function AddMemberModal() {
  const [formData, setFormData] = useState<MemberFormData>({
    cedula: "",
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    cargo: "",
    departamentos: "",
    fechaIngreso: "",
    tipoContrato: "",
    salario: "",
    horario: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos
    console.log(formData)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPlus className="h-4 w-4 mr-2" />
          Añadir miembro
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] p-2">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Añadir nuevo miembro del equipo</DialogTitle>
          <DialogDescription>
            Complete la información requerida para añadir un nuevo miembro al equipo.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="px-8 py-4">
          <form onSubmit={handleSubmit} className="space-y-6 px-8">
            {/* Identificación primaria */}
            <div className="space-y-4">
              <h3 className="font-medium">Identificación primaria</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cedula">Cédula de identidad</Label>
                  <Input
                    id="cedula"
                    value={formData.cedula}
                    onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nombres">Nombres</Label>
                  <Input
                    id="nombres"
                    value={formData.nombres}
                    onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="apellidos">Apellidos</Label>
                  <Input
                    id="apellidos"
                    value={formData.apellidos}
                    onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Datos de contacto */}
            <div className="space-y-4">
              <h3 className="font-medium">Datos de contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico corporativo</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Cargo y organización */}
            <div className="space-y-4">
              <h3 className="font-medium">Cargo y organización</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo/Puesto</Label>
                  <Input
                    id="cargo"
                    value={formData.cargo}
                    onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departamentos">Departamento(s)</Label>
                  <Textarea
                    id="departamentos"
                    value={formData.departamentos}
                    onChange={(e) => setFormData({ ...formData, departamentos: e.target.value })}
                    placeholder="Ingrese los departamentos separados por comas"
                    required
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            {/* Información laboral */}
            <div className="space-y-4">
              <h3 className="font-medium">Información laboral</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fechaIngreso">Fecha de ingreso</Label>
                  <Input
                    id="fechaIngreso"
                    type="date"
                    value={formData.fechaIngreso}
                    onChange={(e) => setFormData({ ...formData, fechaIngreso: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoContrato">Tipo de contrato</Label>
                  <Select
                    value={formData.tipoContrato}
                    onValueChange={(value) => setFormData({ ...formData, tipoContrato: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo de contrato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fijo">Contrato fijo</SelectItem>
                      <SelectItem value="determinado">Tiempo determinado</SelectItem>
                      <SelectItem value="temporal">Temporal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
    
              </div>
            </div>
          </form>
        </ScrollArea>
        <DialogFooter className="px-6 py-4">
          <Button type="submit" onClick={handleSubmit}>Guardar miembro</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 