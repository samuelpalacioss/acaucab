"use client";

import { Card, CardContent } from "@/components/ui/card";

interface OrderSummaryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryCardProps {
  items: OrderSummaryItem[];
  total: number;
}

export default function OrderSummaryCard({ items, total }: OrderSummaryCardProps) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = total / 1.16;
  const iva = total - subtotal;

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
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
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
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
