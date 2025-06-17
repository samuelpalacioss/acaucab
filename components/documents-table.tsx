"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye } from "lucide-react"

const documents = [
  {
    id: 1,
    name: "Factura #12345",
    type: "Factura",
    date: "12/04/2025",
    status: "Aprobado",
  },
  {
    id: 2,
    name: "Orden de Compra #789",
    type: "Orden de Compra",
    date: "10/04/2025",
    status: "Pendiente",
  },
  {
    id: 3,
    name: "Contrato Proveedor XYZ",
    type: "Contrato",
    date: "05/04/2025",
    status: "Aprobado",
  },
  {
    id: 4,
    name: "Reporte de Ventas Marzo",
    type: "Reporte",
    date: "01/04/2025",
    status: "Aprobado",
  },
  {
    id: 5,
    name: "Presupuesto Q2",
    type: "Presupuesto",
    date: "28/03/2025",
    status: "En revisión",
  },
]

export function DocumentsTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <span className="font-medium">Documentos recientes</span>
        </div>
        <Button variant="outline" size="sm">
          Nuevo documento
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">{doc.name}</TableCell>
              <TableCell>{doc.type}</TableCell>
              <TableCell>{doc.date}</TableCell>
              <TableCell>
                <Badge variant="outline">{doc.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center pt-2">
        <div className="text-sm text-muted-foreground">Mostrando 5 de 24 documentos</div>
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
