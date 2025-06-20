"use client";

import { useRouter } from "next/navigation";
import {
  Calendar,
  Mail,
  Package,
  ShoppingBag,
  Store,
  Truck,
  CreditCard,
  Gift,
  ArrowLeft,
  User,
  MapPin,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { VentaDetalleExpansida, PagoDetalle } from "@/models/venta";

/**
 * Interface para las props del componente
 */
interface VentaDetalleClientProps {
  venta: VentaDetalleExpansida;
}

/**
 * Componente cliente para el detalle de una venta específica
 * Maneja toda la interfaz de usuario y las interacciones del detalle de venta
 */
export default function VentaDetalleClient({ venta }: VentaDetalleClientProps) {
  const router = useRouter();
  const isPhysicalSale = venta.canal_venta === 'Tienda';

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
      description: `La factura ${venta.id} ha sido reenviada.`,
    });
  };

  /**
   * Función para descargar factura en PDF
   */
  const handleDownloadInvoice = () => {
    toast({
      title: "Descargando factura",
      description: `La factura ${venta.id} se está descargando`,
    });
  };

  /**
   * Función para descargar Orden de Despacho
   */
  const handleDownloadDispatchOrder = () => {
    toast({
      title: "Descargando Orden de Despacho",
      description: `La orden de despacho ${venta.id} se está descargando`,
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
          Detalle de Venta {venta.id}
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
              <p className="font-medium">{venta.id}</p>
            </div>
            <div id="fecha-info">
              <p className="text-sm font-medium text-muted-foreground">Fecha</p>
              <p>{venta.fecha_venta ? formatDate(venta.fecha_venta) : 'N/A'}</p>
            </div>
            <div id="cliente-info">
              <p className="text-sm font-medium text-muted-foreground">Cliente</p>
              <p className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {venta.nombre_cliente}
              </p>
            </div>
            <div id="monto-info">
              <p className="text-sm font-medium text-muted-foreground">Monto neto</p>
              <p className="font-bold">{venta.monto_total.toLocaleString("es-ES", { style: "currency", currency: "VES" })}</p>
            </div>
            <div id="pago-info">
              <p className="text-sm font-medium text-muted-foreground">Método de Pago</p>
              <p className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                No especificado
              </p>
            </div>
            <div id="canal-info">
              <p className="text-sm font-medium text-muted-foreground">Canal</p>
              <p className="flex items-center">
                {getChannelIcon(venta.canal_venta)}
                {venta.canal_venta}
              </p>
            </div>
            {!isPhysicalSale && (
            <div id="entrega-tipo-info">
              <p className="text-sm font-medium text-muted-foreground">Tipo entrega</p>
              <p className="flex items-center gap-1">
                <Truck className="h-4 w-4" />
                Envío a domicilio
              </p>
            </div>
            )}
            <div id="estado-info">
              <p className="text-sm font-medium text-muted-foreground">Estado</p>
              <Badge variant="outline" className={getStatusColor(venta.estado || 'Desconocido')}>
                {venta.estado || 'Desconocido'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs para diferentes secciones */}
      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Productos</TabsTrigger>
          <TabsTrigger value="payment">Pago</TabsTrigger>
          {!isPhysicalSale && <TabsTrigger value="delivery">Entrega</TabsTrigger>}
          <TabsTrigger value="loyalty">Puntos de fidelidad</TabsTrigger>
        </TabsList>

        {/* Sección de Productos */}
        <TabsContent value="products" className="mt-4" id="productos-content">
          <Card id="productos-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2" id="productos-card-title">
                <Package className="h-5 w-5" />
                Productos ({venta.productos.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table id="productos-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="text-right">Cantidad</TableHead>
                    <TableHead className="text-right">Precio Unitario</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {venta.productos.map((item, index) => (
                    <TableRow key={index} id={`producto-row-${index}`}>
                      <TableCell>{item.nombre}</TableCell>
                      <TableCell className="text-right">{item.cantidad}</TableCell>
                      <TableCell className="text-right">
                        {item.precio_unitario.toLocaleString("es-ES", { style: "currency", currency: "VES" })}
                      </TableCell>
                      <TableCell className="text-right">
                        {(item.cantidad * item.precio_unitario).toLocaleString("es-ES", { style: "currency", currency: "VES" })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      {venta.monto_total.toLocaleString("es-ES", { style: "currency", currency: "VES" })}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección de Pago */}
        <TabsContent value="payment" className="mt-4" id="pago-content">
          <Card id="pago-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2" id="pago-card-title">
                <CreditCard className="h-5 w-5" />
                Información de Pago
              </CardTitle>
            </CardHeader>
            <CardContent>
              {venta.pagos && venta.pagos.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead>Referencia</TableHead>
                      <TableHead>Tasa BCV</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {venta.pagos.map((pago, index) => (
                      <TableRow key={index}>
                        <TableCell>{formatDate(pago.fecha_pago)}</TableCell>
                        <TableCell>{pago.metodo_pago}</TableCell>
                        <TableCell>{pago.referencia}</TableCell>
                        <TableCell>{pago.tasa_bcv ? `${Number(pago.tasa_bcv).toFixed(2)} Bs` : 'N/A'}</TableCell>
                        <TableCell className="text-right font-medium">{pago.monto.toLocaleString("es-ES", { style: "currency", currency: "VES" })}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No se encontraron pagos para esta venta.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección de Entrega */}
        {!isPhysicalSale && (
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
                  <Badge variant="outline" className={getStatusColor(venta.estado || 'Desconocido')}>
                    {venta.estado || 'Desconocido'}
                  </Badge>
                </div>
                <div id="direccion-entrega">
                  <p className="text-sm font-medium text-muted-foreground">Dirección</p>
                  <p className="flex items-start gap-1">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{venta.direccion_entrega || 'No especificada'}</span>
                  </p>
                </div>
                <div id="fecha-entrega">
                  <p className="text-sm font-medium text-muted-foreground">Fecha de último estado</p>
                  <p>{venta.fecha_venta ? formatDate(venta.fecha_venta) : 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        )}

        {/* Sección de Puntos de fidelidad */}
        <TabsContent value="loyalty" className="mt-4" id="puntos-content">
          <Card id="puntos-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2" id="puntos-card-title">
                <Star className="h-5 w-5" />
                Puntos de Fidelidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4" id="puntos-grid">
                <div id="puntos-emitidos">
                  <p className="text-sm font-medium text-muted-foreground">Puntos emitidos</p>
                  <p className="text-xl font-bold">{venta.puntos || 0}</p>
                </div>
                <div id="puntos-canjeados">
                  <p className="text-sm font-medium text-muted-foreground">Puntos canjeados</p>
                  <p className="text-xl font-bold">0</p>
                </div>
                <div className="col-span-2" id="fecha-venta">
                  <p className="text-sm font-medium text-muted-foreground">Fecha y hora de la venta</p>
                  <p>{venta.fecha_venta ? formatDate(venta.fecha_venta) : 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
