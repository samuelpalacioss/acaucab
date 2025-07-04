import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckoutItem } from "./checkout-item";
import { useTasaStore } from "@/store/tasa-store";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  orderItems: OrderItem[];
  puntosAplicados?: number;
  shippingCost: number;
  onFinalize: () => void;
  isSubmitting: boolean;
}

export default function OrderSummary({
  orderItems,
  puntosAplicados = 0,
  shippingCost,
  onFinalize,
  isSubmitting,
}: OrderSummaryProps) {
  const { getTasa } = useTasaStore();
  const tasaDolar = getTasa("USD")?.monto_equivalencia ?? 0;

  const convertirADolar = (monto: number) => {
    const tasa = getTasa("USD");
    if (!tasa?.monto_equivalencia) return null;
    return monto / tasa.monto_equivalencia;
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingInBs = shippingCost * tasaDolar;
  const iva = subtotal * 0.16;
  // Calcular el total incluyendo IVA y restando puntos
  const total = subtotal + iva + shippingInBs - puntosAplicados;

  const subtotalUSD = convertirADolar(subtotal);
  const ivaUSD = convertirADolar(iva);
  const shippingUSD = shippingCost;
  const puntosAplicadosUSD = convertirADolar(puntosAplicados);
  const totalUSD = convertirADolar(total);

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
            <p className="font-medium">
              {subtotal.toFixed(2)} Bs
              {subtotalUSD !== null && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (${subtotalUSD.toFixed(2)})
                </span>
              )}
            </p>
          </div>

          <div className="flex justify-between">
            <span>IVA (16%)</span>
            <span>
              {iva.toFixed(2)} Bs
              {ivaUSD !== null && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (${ivaUSD.toFixed(2)})
                </span>
              )}
            </span>
          </div>

          <div className="flex justify-between">
            <p>Envío</p>
            <p className="font-medium">
              {shippingInBs.toFixed(2)} Bs
              {shippingUSD !== null && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (${shippingUSD.toFixed(2)})
                </span>
              )}
            </p>
          </div>

          {puntosAplicados > 0 && (
            <div className="flex justify-between text-green-600">
              <p>Puntos Aplicados</p>
              <p className="font-medium">
                -{puntosAplicados.toFixed(2)} Bs
                {puntosAplicadosUSD !== null && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    (-${puntosAplicadosUSD.toFixed(2)})
                  </span>
                )}
              </p>
            </div>
          )}

          <Separator />

          <div className="flex justify-between">
            <p className="font-semibold">Total</p>
            <p className="font-bold text-lg">
              {total.toFixed(2)} Bs
              {totalUSD !== null && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (${totalUSD.toFixed(2)})
                </span>
              )}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" onClick={onFinalize} disabled={isSubmitting}>
          {isSubmitting ? "Procesando..." : "Finalizar Compra"}
        </Button>
      </CardFooter>
    </Card>
  );
}
