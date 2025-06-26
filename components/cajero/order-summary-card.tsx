"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CarritoItemType } from "@/lib/schemas";
import { formatCurrency } from "@/lib/utils";

interface OrderSummaryCardProps {
  items: CarritoItemType[];
  total: number;
  /** Total original de la compra (opcional, para mostrar en pagos parciales) */
  originalTotal?: number;
  /** Monto ya pagado (opcional, para mostrar en pagos parciales) */
  amountPaid?: number;
  convertirADolar: (monto: number) => number | null;
}

export default function OrderSummaryCard({
  items,
  total,
  originalTotal,
  amountPaid,
  convertirADolar,
}: OrderSummaryCardProps) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  /** Si hay un total original, usamos ese para calcular subtotal e IVA */
  const baseTotal = originalTotal || total;
  const subtotal = baseTotal / 1.16;
  const iva = baseTotal - subtotal;
  const subtotalUSD = convertirADolar(subtotal);
  const ivaUSD = convertirADolar(iva);
  const baseTotalUSD = convertirADolar(baseTotal);

  /** Determinar si estamos en modo de pago parcial */
  const isPartialPayment = originalTotal && amountPaid !== undefined;
  const remainingAmount = isPartialPayment ? originalTotal - amountPaid : 0;
  const amountPaidUSD = isPartialPayment ? convertirADolar(amountPaid!) : null;
  const remainingAmountUSD = isPartialPayment ? convertirADolar(remainingAmount) : null;

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
            {items.map((item) => {
              const itemTotal = item.precio * item.quantity;
              const itemTotalUSD = convertirADolar(itemTotal);
              return (
                <div key={item.sku} className="flex justify-between text-md">
                  <span>
                    {item.nombre_cerveza} x{item.quantity}
                  </span>
                  <div className="text-right">
                    <p>
                      Bs {itemTotal.toFixed(2)}{" "}
                      {itemTotalUSD !== null && (
                        <span className="text-sm text-gray-500">
                          (${formatCurrency(itemTotalUSD)})
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t pt-4 mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <div className="text-right">
                <p>
                  Bs {subtotal.toFixed(2)}{" "}
                  {subtotalUSD !== null && (
                    <span className="text-sm text-gray-500">(${formatCurrency(subtotalUSD)})</span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <span>IVA (16%)</span>
              <div className="text-right">
                <p>
                  Bs {iva.toFixed(2)}{" "}
                  {ivaUSD !== null && (
                    <span className="text-sm text-gray-500">(${formatCurrency(ivaUSD)})</span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <div className="text-right">
                <p>
                  Bs {baseTotal.toFixed(2)}{" "}
                  {baseTotalUSD !== null && (
                    <span className="text-sm text-gray-500">(${formatCurrency(baseTotalUSD)})</span>
                  )}
                </p>
              </div>
            </div>

            {/** Mostrar información de pago parcial si aplica */}
            {isPartialPayment && (
              <>
                <div className="border-t pt-2 mt-2 space-y-2">
                  <div className="flex justify-between text-green-600">
                    <span>Ya pagado</span>
                    <div className="text-right">
                      <p>
                        Bs {amountPaid!.toFixed(2)}{" "}
                        {amountPaidUSD !== null && (
                          <span className="text-sm text-gray-500">
                            (${formatCurrency(amountPaidUSD)})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between font-bold text-orange-600">
                    <span>Restante por pagar</span>
                    <div className="text-right">
                      <p>
                        Bs {remainingAmount.toFixed(2)}{" "}
                        {remainingAmountUSD !== null && (
                          <span className="text-sm text-gray-500">
                            (${formatCurrency(remainingAmountUSD)})
                          </span>
                        )}
                      </p>
                    </div>
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
