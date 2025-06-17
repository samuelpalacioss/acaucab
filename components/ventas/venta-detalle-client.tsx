"use client";

import { useRouter } from "next/navigation";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

/**
 * Función para obtener los detalles de una venta específica
 * TODO: Esta función debería ser reemplazada por una llamada a la API
 */
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
  };
};

/**
 * Interface para las props del componente
 */
interface VentaDetalleClientProps {
  saleId: string;
}

/**
 * Componente cliente para el detalle de una venta específica
 * Maneja toda la interfaz de usuario y las interacciones del detalle de venta
 */
export default function VentaDetalleClient({ saleId }: VentaDetalleClientProps) {
  const router = useRouter();
  const sale = getSaleDetails(saleId);

  /**
   * Función para formatear la fecha en formato español con hora
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /**
   * Función para obtener el color del badge según el estado
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregado":
        return "bg-green-100 text-green-800";
      case "En proceso":
        return "bg-blue-100 text-blue-800";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  /**
   * Función para obtener el icono del canal de venta
   */
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Web":
        return <ShoppingBag className="h-4 w-4 mr-1" />;
      case "Tienda":
        return <Store className="h-4 w-4 mr-1" />;
      case "Evento":
        return <Calendar className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  /**
   * Función para reenviar factura al cliente
   */
  const handleResendInvoice = () => {
    toast({
      title: "Factura reenviada",
      description: `La factura ${sale.id} ha sido reenviada a ${sale.client.email}`,
    });
  };

  /**
   * Función para descargar factura en PDF
   */
  const handleDownloadInvoice = () => {
    toast({
      title: "Descargando factura",
      description: `La factura ${sale.id} se está descargando`,
    });
  };

  /**
   * Función para descargar Orden de Despacho
   */
  const handleDownloadShippingOrder = () => {
    toast({
      title: "Descargando Orden de Despacho",
      description: `La orden de despacho ${sale.id} se está descargando`,
    });
  };

  return (
    <div id="venta-detalle-container" className="p-6 space-y-6">
      {/* Encabezado con navegación */}
      <div id="detalle-header" className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-1"
          id="back-button"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <h1 id="detalle-title" className="text-2xl font-bold">
          Detalle de Venta {sale.id}
        </h1>
      </div>

      {/* Resumen de información general */}
      <Card id="info-general-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg" id="info-general-title">
            Información General
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div id="info-general-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div id="factura-info">
              <p className="text-sm font-medium text-muted-foreground">Nº Factura</p>
              <p className="font-medium">{sale.id}</p>
            </div>
            <div id="fecha-info">
              <p className="text-sm font-medium text-muted-foreground">Fecha</p>
              <p>{formatDate(sale.date)}</p>
            </div>
            <div id="cliente-info">
              <p className="text-sm font-medium text-muted-foreground">Cliente</p>
              <p className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {sale.client.name}
              </p>
            </div>
            <div id="monto-info">
              <p className="text-sm font-medium text-muted-foreground">Monto neto</p>
              <p className="font-bold">{sale.amount.toLocaleString("es-ES", { style: "currency", currency: "VES" })}</p>
            </div>
            <div id="pago-info">
              <p className="text-sm font-medium text-muted-foreground">Método de Pago</p>
              <p className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                {sale.paymentMethod}
              </p>
            </div>
            <div id="canal-info">
              <p className="text-sm font-medium text-muted-foreground">Canal</p>
              <p className="flex items-center">
                {getChannelIcon(sale.channel)}
                {sale.channel}
              </p>
            </div>
            <div id="entrega-tipo-info">
              <p className="text-sm font-medium text-muted-foreground">Tipo entrega</p>
              <p className="flex items-center gap-1">
                <Truck className="h-4 w-4" />
                Envío a domicilio
              </p>
            </div>
            <div id="estado-info">
              <p className="text-sm font-medium text-muted-foreground">Estado</p>
              <Badge variant="outline" className={getStatusColor(sale.status)}>
                {sale.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs para diferentes secciones */}
      <Tabs defaultValue="products" id="detalle-tabs">
        <TabsList className="grid grid-cols-4 w-full max-w-md" id="tabs-list">
          <TabsTrigger value="products" id="productos-tab">
            Productos
          </TabsTrigger>
          <TabsTrigger value="payment" id="pagos-tab">
            Pagos
          </TabsTrigger>
          <TabsTrigger value="delivery" id="entrega-tab">
            Entrega
          </TabsTrigger>
          <TabsTrigger value="loyalty" id="puntos-tab">
            Puntos
          </TabsTrigger>
        </TabsList>

        {/* Sección de Productos */}
        <TabsContent value="products" className="mt-4" id="productos-content">
          <Card id="productos-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2" id="productos-card-title">
                <Package className="h-5 w-5" />
                Productos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table id="productos-table">
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
                    <TableRow key={item.sku} id={`producto-row-${item.sku}`}>
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
                <TableRow className="bg-muted/50" id="total-row">
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

        {/* Sección de Pagos y facturación */}
        <TabsContent value="payment" className="mt-4" id="pagos-content">
          <Card id="pagos-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2" id="pagos-card-title">
                <CreditCard className="h-5 w-5" />
                Pagos y facturación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div id="pagos-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div id="metodo-pago">
                  <p className="text-sm font-medium text-muted-foreground">Método</p>
                  <p>{sale.paymentMethod}</p>
                </div>
                <div id="referencia-pago">
                  <p className="text-sm font-medium text-muted-foreground">Referencia</p>
                  <p>{sale.paymentReference}</p>
                </div>
                <div id="fecha-pago">
                  <p className="text-sm font-medium text-muted-foreground">Fecha pago</p>
                  <p>{formatDate(sale.paymentDate)}</p>
                </div>
                <div id="tasa-bcv">
                  <p className="text-sm font-medium text-muted-foreground">Tasa BCV histórica</p>
                  <p>{sale.bcvRate.toFixed(2)} Bs/USD</p>
                </div>
              </div>

              <Separator className="my-4" />

              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleDownloadInvoice}
                id="download-invoice-button"
              >
                <Download className="h-4 w-4" />
                Descargar factura PDF
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección de Entrega */}
        <TabsContent value="delivery" className="mt-4" id="entrega-content">
          <Card id="entrega-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2" id="entrega-card-title">
                <Truck className="h-5 w-5" />
                Entrega
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div id="entrega-grid" className="grid grid-cols-1 gap-4">
                <div id="estado-entrega">
                  <p className="text-sm font-medium text-muted-foreground">Estado</p>
                  <Badge variant="outline" className={getStatusColor(sale.delivery.status)}>
                    {sale.delivery.status}
                  </Badge>
                </div>
                <div id="direccion-entrega">
                  <p className="text-sm font-medium text-muted-foreground">Dirección</p>
                  <p className="flex items-start gap-1">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{sale.delivery.address}</span>
                  </p>
                </div>
                <div id="fecha-entrega">
                  <p className="text-sm font-medium text-muted-foreground">Fecha de entrega</p>
                  <p>{formatDate(sale.delivery.timestamp)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección de Puntos de fidelidad */}
        <TabsContent value="loyalty" className="mt-4" id="puntos-content">
          <Card id="puntos-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2" id="puntos-card-title">
                <Gift className="h-5 w-5" />
                Puntos de fidelidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div id="puntos-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div id="puntos-emitidos">
                  <p className="text-sm font-medium text-muted-foreground">Puntos emitidos</p>
                  <p className="text-xl font-bold">{sale.points.earned}</p>
                </div>
                <div id="puntos-canjeados">
                  <p className="text-sm font-medium text-muted-foreground">Puntos canjeados</p>
                  <p className="text-xl font-bold">{sale.points.redeemed}</p>
                </div>
                <div className="col-span-2" id="fecha-venta">
                  <p className="text-sm font-medium text-muted-foreground">Fecha y hora de la venta</p>
                  <p>{formatDate(sale.date)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Acciones principales */}
      <div id="acciones-container" className="flex gap-2">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleResendInvoice}
          id="reenviar-factura-button"
        >
          <Mail className="h-4 w-4" />
          Re-enviar factura al cliente
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleDownloadShippingOrder}
          id="descargar-orden-button"
        >
          <Truck className="h-4 w-4" />
          Descargar Orden de Despacho
        </Button>
      </div>
    </div>
  );
}
