import { CartItem } from "./cart-item";
import { CarritoItemType } from "@/lib/schemas";

interface CartListProps {
  items: CarritoItemType[];
  onRemoveItem: (sku: string) => void;
  onUpdateQuantity: (sku: string, newQuantity: number) => void;
  isCheckout?: boolean;
}

export function CartList({
  items,
  onRemoveItem,
  onUpdateQuantity,
  isCheckout = false,
}: CartListProps) {
  return (
    <div>
      {isCheckout && (
        <p className="mb-6">
          ¿Quieres comprar algo más?{" "}
          <a href="#" className="underline hover:text-gray-600">
            Continuar Comprando
          </a>
        </p>
      )}

      {items.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-lg text-gray-600">Tu carrito está vacío</p>
        </div>
      ) : (
        items.map((item) => (
          <CartItem
            key={item.sku}
            item={item}
            onRemove={() => onRemoveItem(item.sku)}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))
      )}
    </div>
  );
}
