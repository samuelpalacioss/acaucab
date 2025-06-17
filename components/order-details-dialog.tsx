"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Printer, Mail } from "lucide-react"

interface OrderDetailsDialogProps {
  orderId: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderDetailsDialog({ orderId, open, onOpenChange }: OrderDetailsDialogProps) {
  // En un caso real, buscaríamos los detalles del pedido basado en el ID
  // Aquí usamos datos de ejemplo
  const orderDetails = {
    id: orderId,
    date: "15/04/2025",
    customer: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    phone: "+58 412-555-1234",
    address: "Av. Principal #123, Caracas, Venezuela",
    status: "Completado",
    paymentMethod: "Tarjeta",
    cardLast4: "4321",
    items: [
      { id: 1, name: "Cerveza Premium", quantity: 2, price: 45.5, total: 91.0 },
      { id: 2, name: "Cerveza Lager", quantity: 1, price: 38.75, total: 38.75 },
      { id: 3, name: "Cerveza IPA", quantity: 3, price: 52.25, total: 156.75 },
      { id: 4, name: "Cerveza Stout", quantity: 1, price: 59.0, total: 59.0 },
    ],
    subtotal: 345.5,
    tax: 55.28,
    shipping: 15.0,
    total: 415.78,
    notes: "Entregar en horario de oficina. Llamar antes de llegar.",
    deliveryDate: "16/04/2025",
    deliveryTime: "14:00 - 16:00",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>Detalles del Pedido #{orderDetails.id}</div>
            <Badge variant="outline">{orderDetails.status}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Información del Cliente</h3>
            <div className="text-sm">
              <p className="font-medium">{orderDetails.customer}</p>
              <p>{orderDetails.email}</p>
              <p>{orderDetails.phone}</p>
              <p className="text-muted-foreground">{orderDetails.address}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Información del Pedido</h3>
            <div className="text-sm">
              <div className="flex justify-between">
                <span>Fecha del pedido:</span>
                <span>{orderDetails.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Método de pago:</span>
                <span>
                  {orderDetails.paymentMethod} **** {orderDetails.cardLast4}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Entrega programada:</span>
                <span>
                  {orderDetails.deliveryDate}, {orderDetails.deliveryTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderDetails.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">Bs. {item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">Bs. {item.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-2 mt-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>Bs. {orderDetails.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Impuestos (16%):</span>
            <span>Bs. {orderDetails.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Envío:</span>
            <span>Bs. {orderDetails.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total:</span>
            <span>Bs. {orderDetails.total.toFixed(2)}</span>
          </div>
        </div>

        {orderDetails.notes && (
          <div className="border rounded-md p-3 text-sm">
            <p className="font-medium">Notas:</p>
            <p className="text-muted-foreground">{orderDetails.notes}</p>
          </div>
        )}

        <DialogFooter>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Enviar por email
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
