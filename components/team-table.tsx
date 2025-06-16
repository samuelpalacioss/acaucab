"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, Phone } from "lucide-react"
import { AddMemberModal } from "./add-member-modal"

const teamMembers = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    role: "Gerente de Ventas",
    department: "Ventas",
    status: "Activo",
    initials: "CR",
  },
  {
    id: 2,
    name: "María González",
    role: "Jefe de Compras",
    department: "Logística",
    status: "Activo",
    initials: "MG",
  },
  {
    id: 3,
    name: "Juan Pérez",
    role: "Coordinador de Eventos",
    department: "Marketing",
    status: "Ausente",
    initials: "JP",
  },
  {
    id: 4,
    name: "Ana Martínez",
    role: "Analista de Compras",
    department: "Compras",
    status: "Activo",
    initials: "AM",
  },
  {
    id: 5,
    name: "Luis Hernández",
    role: "Especialista de Sostenibilidad",
    department: "ODS",
    status: "Vacaciones",
    initials: "LH",
  },
  {
    id: 6,
    name: "Elena Torres",
    role: "Gerente de RRHH",
    department: "Talento Humano",
    status: "Activo",
    initials: "ET",
  },
]

interface TeamTableProps {
  onRowClick?: (employee: any) => void;
  filter?: string;
}

export function TeamTable({ onRowClick, filter }: TeamTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="font-medium">Miembros del equipo</h3>
          <p className="text-sm text-muted-foreground">Gestiona los miembros del equipo y sus roles.</p>
        </div>
        <AddMemberModal />
      </div>

      <div className="flex justify-between gap-4 mb-4">
        <div className="border rounded-md p-4 text-center">
          <div className="text-xl font-bold">24</div>
          <div className="text-sm text-muted-foreground">Total miembros</div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Departamento</TableHead>
            {/* <TableHead>Estado</TableHead> */}
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{member.name}</span>
                </div>
              </TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>{member.department}</TableCell>
              {/* <TableCell>
                <Badge variant="outline">{member.status}</Badge>
              </TableCell> */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center pt-2">
        <div className="text-sm text-muted-foreground">Mostrando 6 de 24 miembros</div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm">
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
