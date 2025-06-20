"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PlusCircle } from "lucide-react";
import OrderSummaryCard from "./order-summary-card";

/** Tipos para el método de pago */
type PaymentMethod = "tarjeta" | "efectivo" | "pagoMovil" | "puntos";

/** Interfaz para los detalles del pago */
interface PaymentDetails {
  cardNumber?: string;
  cardExpiry?: string;
  cardName?: string;
  cashReceived?: number;
  cashChange?: number;
  phoneNumber?: string;
  confirmationCode?: string;
  customerId?: string;
  pointsToUse?: number;
  amountPaid?: number;
}

/** Interfaz para los items del carrito */
interface CartItem {
  id: number;
  name: string;
  size: string;
  quantity: number;
  price: number;
  brand: string;
  imageSrc: string;
  category: string;
}

/** Interfaz para un solo pago */
interface Payment {
  method: PaymentMethod;
  details: PaymentDetails;
}

/** Props del componente PaymentMethodSummary */
interface PaymentMethodSummaryProps {
  payments: Payment[];
  items: CartItem[];
  total: number;
  onConfirm: () => void;
  onBack: () => void;
}

const getCardType = (cardNumber: string): string => {
  if (cardNumber.startsWith("4")) return "Visa";
  if (cardNumber.startsWith("5")) return "Mastercard";
  if (cardNumber.startsWith("3")) return "American Express";
  return "Tarjeta";
};

/** Componente que muestra un resumen del método de pago seleccionado */
export default function PaymentMethodSummary({
  payments,
  items,
  total,
  onConfirm,
  onBack,
}: PaymentMethodSummaryProps) {
  const getPaymentMethodName = (method: PaymentMethod) => {
    switch (method) {
      case "tarjeta":
        return "Tarjeta";
      case "efectivo":
        return "Efectivo";
      case "pagoMovil":
        return "Pago Móvil";
      case "puntos":
        return "Puntos";
      default:
        return "Método de Pago";
    }
  };

  const sortedPayments = [...payments].sort((a, b) =>
    getPaymentMethodName(a.method).localeCompare(getPaymentMethodName(b.method))
  );

  const calculateFinalTotal = () => {
    if (payments.some((p) => p.method === "puntos" && p.details.pointsToUse)) {
      return total - payments.reduce((acc, p) => acc + (p.details.pointsToUse || 0) / 100, 0);
    }
    return total;
  };

  const finalTotal = calculateFinalTotal();
  const totalPaid = payments.reduce((acc, p) => acc + (p.details.amountPaid || 0), 0);

  const faltaPorPagar = total - totalPaid > 0 ? total - totalPaid : 0;
  const subtotal = total / 1.16;
  const iva = total - subtotal;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver
        </Button>
        <h1 className="text-2xl font-bold">Resumen de Pagos</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Lado Izquierdo: Detalles del Pago */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pago Utilizados</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Lista de Métodos de Pago */}
              {sortedPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center gap-4">
                    <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold">
                        {getPaymentMethodName(payment.method)}
                        {payment.method === "tarjeta" && payment.details.cardNumber && (
                          <span className="ml-2 font-normal text-gray-500">
                            {getCardType(payment.details.cardNumber)} -{" "}
                            {payment.details.cardNumber.replace(/\s/g, "").slice(-4)}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-base">
                    ${payment.details.amountPaid?.toFixed(2) || "0.00"}
                  </p>
                </div>
              ))}

              {/* Agregar otro método de pago */}
              <Button
                variant="outline"
                className="w-full mt-4 flex items-center gap-2"
                onClick={onBack}
              >
                <PlusCircle className="h-4 w-4" />
                Agregar Método de Pago
              </Button>

              {/* Resumen de totales pagados */}
              <div className="pt-4 mt-4 space-y-2 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between font-medium">
                  <span>Total pagado:</span>
                  <span>${totalPaid.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Falta por pagar:</span>
                  <span className="font-semibold text-orange-600">${faltaPorPagar.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lado Derecho: Resumen de la Compra */}
        <div className="lg:col-span-2 space-y-8">
          <OrderSummaryCard items={items} total={total} />
          <Button
            onClick={onConfirm}
            className="w-full bg-black text-white hover:bg-gray-800"
            size="lg"
          >
            Finalizar Compra
          </Button>
        </div>
      </div>
    </div>
  );
}
