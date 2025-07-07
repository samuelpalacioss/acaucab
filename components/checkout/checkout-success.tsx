"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Truck, Calendar, Beer } from "lucide-react";
import Link from "next/link";
import { VentaDetalleExpansida } from "@/models/venta";
import { formatDate } from "@/lib/utils";

interface CheckoutSuccessProps {
  venta: VentaDetalleExpansida;
}

export default function CheckoutSuccess({ venta }: CheckoutSuccessProps) {
  const estimatedDeliveryDate = new Date(venta.fecha_venta || Date.now());
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5); // Add 5 days for estimation

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-amber-900 mb-2">¡Salud! ¡Orden Confirmada! 🍺</h1>
          <p className="text-lg text-amber-700">
            ¡Tu selección de cervezas artesanales ya está en camino!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-amber-200 shadow-lg">
              <CardHeader className="bg-amber-100/50">
                <CardTitle className="flex items-center gap-2 text-amber-900">
                  <Package className="w-5 h-5" />
                  Detalles del Pedido
                </CardTitle>
                <CardDescription>Pedido #{venta.id}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {venta.productos.map((producto, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-amber-200 rounded-lg flex items-center justify-center">
                          <Beer className="w-6 h-6 text-amber-700" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-amber-900">{producto.nombre}</h3>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-amber-900">
                          {(producto.precio_unitario * producto.cantidad).toLocaleString("es-VE", {
                            style: "currency",
                            currency: "VES",
                          })}
                        </p>
                        <p className="text-sm text-amber-600">Cant: {producto.cantidad}</p>
                      </div>
                    </div>
                  ))}

                  <Separator className="bg-amber-200" />

                  <div className="space-y-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-amber-900">Total</span>
                      <span className="text-amber-900">
                        {venta.monto_total.toLocaleString("es-VE", {
                          style: "currency",
                          currency: "VES",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="border-amber-200 shadow-lg">
              <CardHeader className="bg-amber-100/50">
                <CardTitle className="flex items-center gap-2 text-amber-900">
                  <Truck className="w-5 h-5" />
                  Información de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-2">Dirección de Envío</h4>
                    <div className="text-sm text-amber-700 space-y-1">
                      <p>{venta.nombre_cliente}</p>
                      <p>{venta.direccion_entrega}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-2">Entrega Estimada</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <span className="text-sm text-amber-700">
                        {formatDate(estimatedDeliveryDate.toISOString())}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-amber-100 text-amber-800 border-amber-300"
                    >
                      Envío Estándar
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* What's Next */}
            <Card className="border-amber-200 shadow-lg">
              <CardHeader className="bg-amber-100/50">
                <CardTitle className="text-amber-900">¿Qué sigue?</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-amber-700">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-amber-900">Procesando Pedido</p>
                    <p className="text-sm text-amber-600">
                      Estamos seleccionando cuidadosamente tus cervezas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-amber-700">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-amber-900">Notificación de Envío</p>
                    <p className="text-sm text-amber-600">
                      Recibirás la información de seguimiento.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-amber-700">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-amber-900">Disfruta y Califica</p>
                    <p className="text-sm text-amber-600">Prueba y comparte tu experiencia.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-8">
          <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white">
            <Link href="/productos">Seguir Comprando</Link>
          </Button>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8 p-6 bg-amber-100/50 rounded-lg border border-amber-200">
          <p className="text-amber-800 font-medium mb-2">
            ¡Gracias por elegir nuestra selección de cervezas artesanales!
          </p>
          <p className="text-sm text-amber-600">
            ¿Preguntas sobre tu pedido? Contacta a nuestros expertos cerveceros en{" "}
            <a href="mailto:acaucab@cerveceria.com" className="underline hover:text-amber-800">
              acaucab@acaucab.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
