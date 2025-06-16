"use client"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Download,
  Mail,
  MapPin,
  Package,
  ShoppingBag,
  Store,
  Truck,
  User,
  CreditCard,
  Gift,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

// Datos de ejemplo para una venta específica
const getSaleDetails = (id: string) => {
  return {
    id: id,
    date: "2023-04-15T14:30:00",
    client: {
      name: "Supermercados ABC",
      email: "compras@supermercadosabc.com",
      phone: "+58 212 555 1234",
    },
    channel: "Web",
    amount: 1250.75,
    currency: "Bs",
    status: "Entregado",
    paymentMethod: "Transferencia bancaria",
    paymentReference: "TRX-98765432",
    paymentDate: "2023-04-15T14:35:00",
    bcvRate: 35.62,
    points: {
      earned: 125,
      redeemed: 0,
    },
    delivery: {
      status: "Entregado",
      address: "Av. Principal, Edificio Central, Caracas, Venezuela",
      timestamp: "2023-04-16T10:15:00",
    },
    items: [
      {
        sku: "PROD-001",
        name: "Producto Premium A",
        quantity: 2,
        unitPrice: 250.5,
        total: 501.0,
      },
      {
        sku: "PROD-002",
        name: "Producto Estándar B",
        quantity: 3,
        unitPrice: 125.25,
        total: 375.75,
      },
      {
        sku: "PROD-003",
        name: "Producto Básico C",
        quantity: 5,
        unitPrice: 74.8,
        total: 374.0,
      },
    ],
  }
}

export default function VentaDetallePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const sale = getSaleDetails(params.id)

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Función para obtener el color del badge según el estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregado":
        return "bg-green-100 text-green-800"
      case "En proceso":
        return "bg-blue-100 text-blue-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Función para obtener el icono del canal
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Web":
        return <ShoppingBag className="h-4 w-4 mr-1" />
      case "Tienda":
        return <Store className="h-4 w-4 mr-1" />
      case "Evento":
        return <Calendar className="h-4 w-4 mr-1" />
      default:
        return null
    }
  }

  // Función para reenviar factura
  const handleResendInvoice = () => {
    toast({
      title: "Factura reenviada",
      description: `La factura ${sale.id} ha sido reenviada a ${sale.client.email}`,
    })
  }

  // Función para descargar factura
  const handleDownloadInvoice = () => {
    toast({
      title: "Descargando factura",
      description: `La factura ${sale.id} se está descargando`,
    })
  }

  // Función para descargar Orden de Despacho
  const handleDownloadShippingOrder = () => {
    toast({
      title: "Descargando Orden de Despacho",
      description: `La orden de despacho ${sale.id} se está descargando`,
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <h1 className="text-2xl font-bold">Detalle de Venta {sale.id}</h1>
      </div>

      {/* Resumen encabezado */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Información General</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nº Factura</p>
              <p className="font-medium">{sale.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Fecha</p>
              <p>{formatDate(sale.date)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cliente</p>
              <p className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {sale.client.name}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Monto neto</p>
              <p className="font-bold">{sale.amount.toLocaleString("es-ES", { style: "currency", currency: "VES" })}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Método de Pago</p>
              <p className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                {sale.paymentMethod}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Canal</p>
              <p className="flex items-center">
                {getChannelIcon(sale.channel)}
                {sale.channel}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tipo entrega</p>
              <p className="flex items-center gap-1">
                <Truck className="h-4 w-4" />
                Envío a domicilio
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Estado</p>
              <Badge variant="outline" className={getStatusColor(sale.status)}>
                {sale.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="products">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="products">Productos</TabsTrigger>
          <TabsTrigger value="payment">Pagos</TabsTrigger>
          <TabsTrigger value="delivery">Entrega</TabsTrigger>
          <TabsTrigger value="loyalty">Puntos</TabsTrigger>
        </TabsList>

        {/* Sección Productos */}
        <TabsContent value="products" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5" />
                Productos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="text-right">Cantidad</TableHead>
                    <TableHead className="text-right">Precio unitario</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sale.items.map((item) => (
                    <TableRow key={item.sku}>
                      <TableCell className="font-medium">{item.sku}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        {item.unitPrice.toLocaleString("es-ES", { style: "currency", currency: "VES" })}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.total.toLocaleString("es-ES", { style: "currency", currency: "VES" })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableRow className="bg-muted/50">
                  <TableCell colSpan={4} className="text-right font-bold">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {sale.amount.toLocaleString("es-ES", { style: "currency", currency: "VES" })}
                  </TableCell>
                </TableRow>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección Pagos y facturación */}
        <TabsContent value="payment" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Pagos y facturación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Método</p>
                  <p>{sale.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Referencia</p>
                  <p>{sale.paymentReference}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha pago</p>
                  <p>{formatDate(sale.paymentDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tasa BCV histórica</p>
                  <p>{sale.bcvRate.toFixed(2)} Bs/USD</p>
                </div>
              </div>

              <Separator className="my-4" />

              <Button variant="outline" className="flex items-center gap-2" onClick={handleDownloadInvoice}>
                <Download className="h-4 w-4" />
                Descargar factura PDF
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección Entrega */}
        <TabsContent value="delivery" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Entrega
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estado</p>
                  <Badge variant="outline" className={getStatusColor(sale.delivery.status)}>
                    {sale.delivery.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dirección</p>
                  <p className="flex items-start gap-1">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{sale.delivery.address}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha de entrega</p>
                  <p>{formatDate(sale.delivery.timestamp)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección Puntos de fidelidad */}
        <TabsContent value="loyalty" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Puntos de fidelidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Puntos emitidos</p>
                  <p className="text-xl font-bold">{sale.points.earned}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Puntos canjeados</p>
                  <p className="text-xl font-bold">{sale.points.redeemed}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Fecha y hora de la venta</p>
                  <p>{formatDate(sale.date)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Acciones */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex items-center gap-2" onClick={handleResendInvoice}>
          <Mail className="h-4 w-4" />
          Re-enviar factura al cliente
        </Button>
        <Button variant="outline" className="flex items-center gap-2" onClick={handleDownloadShippingOrder}>
          <Truck className="h-4 w-4" />
          Descargar Orden de Despacho
        </Button>
      </div>
    </div>
  )
}
