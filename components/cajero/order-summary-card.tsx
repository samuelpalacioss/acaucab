"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CarritoItemType } from "@/lib/schemas";

interface OrderSummaryCardProps {
  items: CarritoItemType[];
  total: number;
  /** Total original de la compra (opcional, para mostrar en pagos parciales) */
  originalTotal?: number;
  /** Monto ya pagado (opcional, para mostrar en pagos parciales) */
  amountPaid?: number;
}

export default function OrderSummaryCard({
  items,
  total,
  originalTotal,
  amountPaid,
}: OrderSummaryCardProps) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  /** Si hay un total original, usamos ese para calcular subtotal e IVA */
  const baseTotal = originalTotal || total;
  const subtotal = baseTotal / 1.16;
  const iva = baseTotal - subtotal;

  /** Determinar si estamos en modo de pago parcial */
  const isPartialPayment = originalTotal && amountPaid !== undefined;
  const remainingAmount = isPartialPayment ? originalTotal - amountPaid : 0;

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Resumen de compra</h2>

        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Productos ({itemCount})</span>
            <span>{items.length} items</span>
          </div>

          <div className="max-h-[300px] overflow-y-auto space-y-2">
            {items.map((item) => (
              <div key={item.sku} className="flex justify-between text-sm">
                <span>
                  {item.nombre_cerveza} x{item.quantity}
                </span>
                <span>${(item.precio * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>IVA (16%)</span>
              <span>${iva.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${baseTotal.toFixed(2)}</span>
            </div>

            {/** Mostrar información de pago parcial si aplica */}
            {isPartialPayment && (
              <>
                <div className="border-t pt-2 mt-2 space-y-2">
                  <div className="flex justify-between text-green-600">
                    <span>Ya pagado</span>
                    <span>${amountPaid.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-orange-600">
                    <span>Restante por pagar</span>
                    <span>${remainingAmount.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
