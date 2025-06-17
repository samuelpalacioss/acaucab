"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Truck, Package, Clock, FileText } from "lucide-react"

// Tipos de datos para los pedidos
type OrderStatus = "Pendiente" | "En curso" | "Listo para entrega" | "Entregado" | "Cancelado"
type DeliveryType = "Envío a domicilio" | "Retiro en tienda" 
type PaymentMethod = "Tarjeta de crédito" | "Tarjeta de débito" | "Cheque" | "Pago móvil"

interface Order {
  id: string
  userName: string
  date: string
  paymentMethod: PaymentMethod
  totalUnits: number
  status: OrderStatus
  deliveryType: DeliveryType
  price: number
}

// Datos de ejemplo
const initialOrders: Order[] = [
  {
    id: "PED-001",
    userName: "Carlos Rodríguez",
    date: "12/05/2025 10:30",
    paymentMethod: "Tarjeta de crédito",
    totalUnits: 24,
    status: "Pendiente",
    deliveryType: "Envío a domicilio",
    price: 1250.75,
  },
  {
    id: "PED-002",
    userName: "María González",
    date: "12/05/2025 11:15",
    paymentMethod: "Tarjeta de débito",
    totalUnits: 12,
    status: "En curso",
    deliveryType: "Retiro en tienda",
    price: 780.5,
  },
  {
    id: "PED-003",
    userName: "Juan Pérez",
    date: "12/05/2025 12:45",
    paymentMethod: "Cheque",
    totalUnits: 36,
    status: "Pendiente",
    deliveryType: "Envío a domicilio",
    price: 1890.25,
  },
  {
    id: "PED-004",
    userName: "Ana Martínez",
    date: "12/05/2025 13:20",
    paymentMethod: "Pago móvil",
    totalUnits: 18,
    status: "Listo para entrega",
    deliveryType: "Retiro en tienda",
    price: 945.0,
  },
  {
    id: "PED-005",
    userName: "Luis Hernández",
    date: "12/05/2025 14:10",
    paymentMethod: "Pago móvil",
    totalUnits: 30,
    status: "En curso",
    deliveryType: "Envío a domicilio",
    price: 1575.3,
  },
  {
    id: "PED-006",
    userName: "Elena Torres",
    date: "12/05/2025 15:05",
    paymentMethod: "Tarjeta de crédito",
    totalUnits: 6,
    status: "Pendiente",
    deliveryType: "Envío a domicilio",
    price: 315.25,
  },

]

// Función para obtener el icono del tipo de entrega
const getDeliveryIcon = (type: DeliveryType) => {
  switch (type) {
    case "Envío a domicilio":
      return <Truck className="h-4 w-4" />
    case "Retiro en tienda":
      return <Package className="h-4 w-4" />
    default:
      return <Truck className="h-4 w-4" />
  }
}

// Función para obtener la variante del badge según el estado
const getStatusVariant = (status: OrderStatus) => {
  switch (status) {
    case "Pendiente":
      return "outline"
    case "En curso":
      return "outline"
    case "Listo para entrega":
      return "outline"
    case "Entregado":
      return "outline"
    case "Cancelado":
      return "outline"
    default:
      return "outline"
  }
}

// Función para descargar la orden de despacho
const handleDownloadDispatchOrder = (orderId: string) => {
  // Aquí se implementaría la lógica para descargar el documento
  console.log(`Descargando orden de despacho para el pedido ${orderId}`)
  // TODO: Implementar la lógica real de descarga
}

export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  // Función para cambiar el estado de un pedido
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Método de Pago</TableHead>
            <TableHead>Unidades</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Tipo de Entrega</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead className="text-right">Orden de despacho</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.userName}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell>{order.totalUnits}</TableCell>
              <TableCell>
                <Select
                  defaultValue={order.status}
                  onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue>
                      <Badge variant={getStatusVariant(order.status) as "default" | "destructive" | "outline" | "secondary" | null | undefined}>{order.status}</Badge>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En preparación">En preparación</SelectItem>
                    <SelectItem value="Listo para entrega">Listo para entrega</SelectItem>
                    <SelectItem value="Entregado">Entregado</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getDeliveryIcon(order.deliveryType)}
                  <span>{order.deliveryType}</span>
                </div>
              </TableCell>
              <TableCell>Bs. {order.price.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-center">
                  <Button variant="ghost" size="icon" onClick={() => handleDownloadDispatchOrder(order.id)}>
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center pt-2">
        <div className="text-sm text-muted-foreground">Mostrando 8 de 24 pedidos</div>
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
