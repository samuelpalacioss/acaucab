import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckoutItem } from "./checkout-item";
import { SHIPPING_COST } from "@/lib/constants";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  orderItems: OrderItem[];
}

export default function OrderSummary({ orderItems }: OrderSummaryProps) {
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = SHIPPING_COST;
  const iva = subtotal * 0.16;
  // Calcular el total incluyendo IVA
  const total = subtotal + iva + shipping;

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4">Resumen del Pedido</h2>

        <div className="space-y-4">
          {orderItems.map((item) => (
            <CheckoutItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              quantity={item.quantity}
            />
          ))}

          <Separator />

          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="font-medium">${subtotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <span>IVA (16%)</span>
            <span>${iva.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <p>Envío</p>
            <p className="font-medium">${shipping.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex justify-between">
            <p className="font-semibold">Total</p>
            <p className="font-bold text-lg">${total.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full">Finalizar Compra</Button>
      </CardFooter>
    </Card>
  );
}
