"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

// Tipos de datos para órdenes de compra
type EstadoOrden = "Enviada" | "Aprobada"

interface OrdenCompra {
  id: string
  proveedor: string
  fecha: string
  estado: EstadoOrden
  monto: number
}

// Datos de ejemplo para órdenes de compra
const ordenesDeCompra: OrdenCompra[] = [
  {
    id: "OC-12345",
    proveedor: "Distribuidora Alimentos S.A.",
    fecha: "30/04/2025",
    estado: "Enviada",
    monto: 15420.50,
  },
  {
    id: "OC-12344",
    proveedor: "Suministros Industriales C.A.",
    fecha: "28/04/2025",
    estado: "Enviada",
    monto: 8750.25,
  },
  {
    id: "OC-12343",
    proveedor: "Empaques y Envases J-789456123",
    fecha: "25/04/2025",
    estado: "Aprobada",
    monto: 4320.00,
  },
  {
    id: "OC-12342",
    proveedor: "Productos Lácteos del Valle",
    fecha: "20/04/2025",
    estado: "Enviada",
    monto: 12680.75,
  },
  {
    id: "OC-12341",
    proveedor: "Frutas y Vegetales Nacionales",
    fecha: "15/04/2025",
    estado: "Enviada",
    monto: 6540.30,
  },
  {
    id: "OC-12340",
    proveedor: "Carnes Premium J-123456789",
    fecha: "10/04/2025",
    estado: "Enviada",
    monto: 9875.45,
  },
]

// Función para descargar la orden de compra
const handleDownloadOrdenCompra = (ordenId: string) => {
  // Aquí se implementaría la lógica para generar y descargar el PDF
  console.log(`Descargando orden de compra ${ordenId}`)
  // TODO: Implementar generación de PDF y descarga
}

// Función para obtener el color del badge según el estado
const getEstadoBadgeVariant = (estado: EstadoOrden) => {
  switch (estado) {
    case "Enviada":
      return "default"
    case "Aprobada":
      return "secondary"
    default:
      return "outline"
  }
}

export function OrdenesCompraTable() {
  // Calcular el monto total de todas las órdenes
  const montoTotal = ordenesDeCompra.reduce((total, orden) => total + orden.monto, 0)
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="font-medium">Órdenes de Compra</h3>
          <p className="text-sm text-muted-foreground">Listado de órdenes de compra generadas para proveedores</p>
        </div>
      </div>

      <div className="flex justify-between gap-4 mb-4">
        <div className="border rounded-md p-4 text-center">
          <div className="text-xl font-bold">{ordenesDeCompra.length}</div>
          <div className="text-sm text-muted-foreground">Total órdenes</div>
        </div>
        <div className="border rounded-md p-4 text-center">
          <div className="text-xl font-bold">Bs. {montoTotal.toFixed(2)}</div>
          <div className="text-sm text-muted-foreground">Monto este mes</div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Número</TableHead>
            <TableHead>Proveedor</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead className="text-center">Documento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordenesDeCompra.map((orden) => (
            <TableRow key={orden.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">{orden.id}</span>
                </div>
              </TableCell>
              <TableCell>{orden.proveedor}</TableCell>
              <TableCell>{orden.fecha}</TableCell>
              <TableCell>
                <Badge variant={getEstadoBadgeVariant(orden.estado)}>{orden.estado}</Badge>
              </TableCell>
              <TableCell>Bs. {orden.monto.toFixed(2)}</TableCell>
              <TableCell className="text-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDownloadOrdenCompra(orden.id)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center pt-2">
        <div className="text-sm text-muted-foreground">Mostrando {ordenesDeCompra.length} de 36 órdenes</div>
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