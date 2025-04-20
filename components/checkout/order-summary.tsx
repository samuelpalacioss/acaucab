import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function OrderSummary() {
  // Sample order data
  const orderItems = [
    { id: 1, name: "Cerveza Especial", quantity: 2, price: 12.0 },
    { id: 2, name: "Cerveza Pale", quantity: 1, price: 10.0 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 4.0;
  const total = subtotal + shipping;

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4">Resumen del Pedido</h2>

        <div className="space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div>
                <p>
                  {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                </p>
              </div>
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}

          <Separator />

          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="font-medium">${subtotal.toFixed(2)}</p>
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
