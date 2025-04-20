import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  subtotal: number;
  totalItems: number;
  onCheckout: () => void;
}

export function OrderSummary({ subtotal, totalItems, onCheckout }: OrderSummaryProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Resumen del Pedido</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Envío</span>
          <span className="text-gray-500">Calculado en el siguiente paso</span>
        </div>

        <Separator />

        <div className="flex justify-between font-bold">
          <p>
            Subtotal{" "}
            <span className="text-md text-gray-500">
              ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
          </p>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={onCheckout}>
          Continuar al pago
        </Button>
      </div>
    </div>
  );
}
