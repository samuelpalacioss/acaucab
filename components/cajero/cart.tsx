"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { CarritoItemType } from "@/lib/schemas";
import { Badge } from "../ui/badge";

interface CartProps {
  items: CarritoItemType[];
  onUpdateQuantity: (sku: string, quantity: number) => void;
  onRemoveItem: (sku: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export default function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  const iva = subtotal * 0.16; // 16% iva
  const total = subtotal + iva;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Carrito{" "}
          {itemCount > 0 && (
            <span className="ml-2 text-sm bg-gray-100 px-2 py-0.5 rounded-full">{itemCount}</span>
          )}
        </h2>
        {items.length > 0 && (
          <Button variant="outline" size="sm" onClick={onClearCart}>
            Borrar
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500 flex-grow flex flex-col items-center justify-center">
          <ShoppingCart className="h-12 w-12 mb-2 opacity-20" />
          <p>Tu carrito está vacío</p>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto mb-4 max-h-[calc(100vh-300px)]">
            {items.map((item) => (
              <div key={item.sku} className="flex justify-between items-center py-2 border-b">
                <div className="flex-grow space-y-2">
                  <p className="font-semibold text-sm">{item.nombre_cerveza}</p>
                  <Badge variant="secondary" className="text-xs w-fit font-medium">
                    {item.presentacion}
                  </Badge>
                  <p className="text-sm text-gray-500">${item.precio.toFixed(2)} c/u</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onUpdateQuantity(item.sku, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onUpdateQuantity(item.sku, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-red-500 hover:text-red-700"
                    onClick={() => onRemoveItem(item.sku)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>IVA (16%)</span>
              <span>${iva.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-4" onClick={onCheckout}>
              Pagar
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
