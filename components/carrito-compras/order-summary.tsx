import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
interface OrderSummaryProps {
  subtotal: number;
  totalItems: number;
  onCheckout: () => void;
  isCheckout?: boolean;
}

export function OrderSummary({
  subtotal,
  totalItems,
  onCheckout,
  isCheckout = false,
}: OrderSummaryProps) {
  // Calcular el IVA (16% del subtotal)
  const iva = subtotal * 0.16;
  // Calcular el total incluyendo IVA
  const total = subtotal + iva;

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

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Puntos disponibles:</span>
            <span className="text-gray-500">100 pts</span>
          </div>

          <div className="flex items-center gap-2">
            <Input type="number" placeholder="Usar puntos" className="w-32" min={0} max={1250} />
            <span className="text-sm text-gray-500">(1 punto = 1Bs)</span>
          </div>

          <div className="flex justify-between">
            <span>Descuento</span>
            <span>-$0.00</span>
          </div>
        </div>

        <div className="flex justify-between">
          <span>IVA (16%)</span>
          <span>${iva.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <Separator />

        <div className="flex justify-between font-bold">
          <p>
            Total{" "}
            <span className="text-md text-gray-500">
              ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
          </p>
          <span>${total.toFixed(2)}</span>
        </div>

        <Link
          href="/checkout"
          className={cn(
            buttonVariants({
              variant: "default",
              className: "w-full",
            })
          )}
        >
          Continuar al pago
        </Link>
      </div>
    </div>
  );
}
