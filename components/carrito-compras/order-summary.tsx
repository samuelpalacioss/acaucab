import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  subtotal: number;
  totalItems: number;
  onCheckout: () => void;
}

export function OrderSummary({ subtotal, totalItems, onCheckout }: OrderSummaryProps) {
  // Calcular el IVA (16% del subtotal)
  const iva = subtotal * 0.16;
  // Calcular el total incluyendo IVA
  const total = subtotal + iva;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Resumen del Pedido</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Envío</span>
          <span className="text-gray-500">Calculado en el siguiente paso</span>
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

        <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={onCheckout}>
          Continuar al pago
        </Button>
      </div>
    </div>
  );
}
