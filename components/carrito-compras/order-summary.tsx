"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTasaStore } from "@/store/tasa-store";

interface OrderSummaryProps {
  subtotal: number;
  totalItems: number;
  onCheckout: () => void;
  isCheckout?: boolean;
  isCartEmpty: boolean;
  isProcessing: boolean;
}

export function OrderSummary({
  subtotal,
  totalItems,
  onCheckout,
  isCheckout = false,
  isCartEmpty,
  isProcessing,
}: OrderSummaryProps) {
  const { getTasa } = useTasaStore();

  const convertirADolar = (monto: number) => {
    const tasa = getTasa("USD");
    if (!tasa?.monto_equivalencia) return null;
    return monto / tasa.monto_equivalencia;
  };
  // Calcular el IVA (16% del subtotal)
  const iva = subtotal * 0.16;
  // Calcular el total incluyendo IVA
  const total = subtotal + iva;

  const subtotalEnDolares = convertirADolar(subtotal);
  const ivaEnDolares = convertirADolar(iva);
  const totalEnDolares = convertirADolar(total);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Resumen del Pedido</h2>

      <div className="space-y-4">
        {isCheckout && (
          <div className="flex justify-between">
            <span>Envío</span>
            <span className="text-gray-500">Calculado en el siguiente paso</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>IVA (16%)</span>
          <span>
            {iva.toFixed(2)} Bs
            {ivaEnDolares !== null && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                (${ivaEnDolares.toFixed(2)})
              </span>
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>
            {subtotal.toFixed(2)} Bs
            {subtotalEnDolares !== null && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                (${subtotalEnDolares.toFixed(2)})
              </span>
            )}
          </span>
        </div>

        <Separator />

        <div className="flex justify-between font-bold">
          <p>
            Total{" "}
            <span className="text-md text-gray-500">
              ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
          </p>
          <span>
            {total.toFixed(2)} Bs
            {totalEnDolares !== null && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                (${totalEnDolares.toFixed(2)})
              </span>
            )}
          </span>
        </div>

        <Button onClick={onCheckout} disabled={isCartEmpty || isProcessing} className="w-full">
          {isProcessing ? "Procesando..." : "Continuar al pago"}
        </Button>
      </div>
    </div>
  );
}
