"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PlusCircle, Trash2 } from "lucide-react";
import OrderSummaryCard from "./order-summary-card";
import { Separator } from "@radix-ui/react-select";
import { CarritoItemType, PaymentMethod, PaymentDetails } from "@/lib/schemas";
import { getBancoNombre } from "@/components/ui/banco-selector";
import { formatCurrency } from "@/lib/utils";
import { useTasaStore } from "@/store/tasa-store";

/**
 * Interface para los detalles del pago
 */

/**
 * Helper para obtener el nombre legible del método de pago
 */
interface PaymentMethodSummaryProps {
  payments: PaymentMethod[];
  items: CarritoItemType[];
  total: number;
  onConfirm: () => void;
  onBack: () => void;
  /** Función para eliminar un método de pago específico */
  onDeletePayment?: (index: number) => void;
  convertirADolar: (monto: number) => number | null;
}

/** Componente que muestra un resumen del método de pago seleccionado */
export default function PaymentMethodSummary({
  payments,
  items,
  total,
  onConfirm,
  onBack,
  onDeletePayment,
  convertirADolar,
}: PaymentMethodSummaryProps) {
  const { getTasa } = useTasaStore();

  // Helper para agrupar los pagos en efectivo por denominación y moneda
  const groupCashPayments = (payments: PaymentMethod[]) => {
    const cashGroups: {
      [key: string]: { payment: PaymentMethod; count: number; originalIndexes: number[] };
    } = {};
    const otherPayments: PaymentMethod[] = [];

    payments.forEach((p, index) => {
      if (p.method === "efectivo") {
        const details = p.details as any;
        const key = `${details.currency}-${details.amountPaid}`;
        if (!cashGroups[key]) {
          cashGroups[key] = { payment: p, count: 0, originalIndexes: [] };
        }
        cashGroups[key].count += 1;
        cashGroups[key].originalIndexes.push(index);
      } else {
        otherPayments.push(p);
      }
    });

    const groupedCash = Object.values(cashGroups).map((group) => {
      const { payment, count, originalIndexes } = group;
      // Adjuntamos la cuenta y los índices originales para poder eliminarlos
      (payment.details as any).count = count;
      (payment.details as any).originalIndexes = originalIndexes;
      return payment;
    });

    return [...groupedCash, ...otherPayments];
  };

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "tarjetaCredito":
        return "Tarjeta de Crédito";
      case "tarjetaDebito":
        return "Tarjeta de Débito";
      case "efectivo":
        return "Efectivo";
      case "cheque":
        return "Cheque";
      case "puntos":
        return "Puntos";
      default:
        return "Desconocido";
    }
  };

  const getCardType = (cardNumber: string): string => {
    if (cardNumber.startsWith("4")) return "Visa";
    if (cardNumber.startsWith("5")) return "Mastercard";
    if (cardNumber.startsWith("3")) return "American Express";
    return "Tarjeta";
  };

  const groupedPayments = groupCashPayments(payments);

  const sortedPayments = [...groupedPayments].sort((a, b) =>
    getPaymentMethodName(a.method).localeCompare(getPaymentMethodName(b.method))
  );

  const calculateFinalTotal = () => {
    const puntosPayments = payments.filter((p) => p.method === "puntos");
    if (puntosPayments.length > 0) {
      const puntosDiscount = puntosPayments.reduce((acc, p) => acc + ((p.details as any).amountPaid || 0), 0);
      return total - puntosDiscount;
    }
    return total;
  };

  const finalTotal = calculateFinalTotal();
  const totalPaid = payments.reduce((acc, p) => {
    const details = p.details as any;
    const amount = details.amountPaid || 0;

    if (p.method === "efectivo" && details.currency && details.currency !== "bolivares") {
      const currency = details.currency === "dolares" ? "USD" : "EUR";
      const tasa = getTasa(currency);
      const montoEnBs = amount * (tasa?.monto_equivalencia || 0);
      return acc + montoEnBs;
    }

    return acc + amount;
  }, 0);
  const totalPaidUSD = convertirADolar(totalPaid);

  const faltaPorPagar = total - totalPaid > 0 ? total - totalPaid : 0;
  const faltaPorPagarUSD = convertirADolar(faltaPorPagar);

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
              {sortedPayments.map((payment, sortedIndex) => {
                const isEfectivo = payment.method === "efectivo";
                const isPuntos = payment.method === "puntos";
                const details = payment.details as any;
                const originalIndex = isEfectivo
                  ? details.originalIndexes[0]
                  : payments.findIndex((p) => p === payment);
                const amountPaidUSD = convertirADolar(details.amountPaid);
                const currency = isEfectivo ? details.currency : null;
                const count = isEfectivo ? details.count : 1;

                return (
                  <div key={originalIndex} className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-4">
                      <span className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold">
                        {sortedIndex + 1}
                      </span>
                      <div>
                        <p className="font-semibold">
                          {getPaymentMethodName(payment.method)}
                          {payment.method.includes("tarjeta") && (payment.details as any).numeroTarjeta && (
                            <span className="ml-2 font-normal text-gray-500">
                              {getCardType((payment.details as any).numeroTarjeta)} -{" "}
                              {(payment.details as any).numeroTarjeta.replace(/\s/g, "").slice(-4)}
                            </span>
                          )}
                        </p>
                        {onDeletePayment && (payment.method === "efectivo" || payment.method === "puntos") && (
                          <button
                            onClick={() => {
                              if (isEfectivo) {
                                // Eliminar todos los pagos de este grupo
                                details.originalIndexes.reverse().forEach((idx: number) => onDeletePayment(idx));
                              } else {
                                onDeletePayment(originalIndex);
                              }
                            }}
                            className="text-sm text-muted-foreground underline mt-1"
                          >
                            Eliminar
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-base">
                        {isPuntos ? (
                          <>
                            Bs {(details.amountPaid || 0).toFixed(2)}{" "}
                            <span className="text-sm text-gray-500">({details.pointsToUse} puntos)</span>
                          </>
                        ) : isEfectivo ? (
                          <>
                            {currency === "dolares" ? "$" : currency === "euros" ? "€" : "Bs"}
                            {details.amountPaid.toFixed(2)}
                            {count > 1 && <span className="text-sm text-gray-500 ml-1">({count}x)</span>}
                          </>
                        ) : (
                          <>
                            Bs {(details.amountPaid || 0).toFixed(2)}{" "}
                            {amountPaidUSD !== null && (
                              <span className="text-sm text-gray-500">(${formatCurrency(amountPaidUSD)})</span>
                            )}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Agregar otro método de pago */}
              <Button
                variant="outline"
                className="w-full mt-4 flex items-center gap-2"
                onClick={onBack}
                disabled={faltaPorPagar === 0}
              >
                <PlusCircle className="h-4 w-4" />
                Agregar Método de Pago
              </Button>

              {/* Resumen de totales pagados */}
              <div className="pt-4 mt-4 space-y-2 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between font-medium">
                  <span>Total pagado:</span>
                  <div className="text-right">
                    <p>
                      Bs {totalPaid.toFixed(2)}{" "}
                      {totalPaidUSD !== null && (
                        <span className="text-sm text-gray-500">(${formatCurrency(totalPaidUSD)})</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Falta por pagar:</span>
                  <div className="text-right font-semibold">
                    <p className="text-orange-600">
                      Bs {faltaPorPagar.toFixed(2)}{" "}
                      {faltaPorPagarUSD !== null && (
                        <span className="text-sm text-gray-500">(${formatCurrency(faltaPorPagarUSD)})</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lado Derecho: Resumen de la Compra */}
        <div className="lg:col-span-2 space-y-8">
          <OrderSummaryCard items={items} total={total} convertirADolar={convertirADolar} />
          <Button
            onClick={onConfirm}
            className="w-full bg-black text-white hover:bg-gray-800"
            size="lg"
            disabled={faltaPorPagar > 0.01}
          >
            Finalizar Compra
          </Button>
        </div>
      </div>
    </div>
  );
}
