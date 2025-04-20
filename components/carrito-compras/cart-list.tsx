import { CartItem } from "./cart-item";

export interface CartItemType {
  id: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
  brand: string;
  imageSrc: string;
}

interface CartListProps {
  items: CartItemType[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
}

export function CartList({ items, onRemoveItem, onUpdateQuantity }: CartListProps) {
  return (
    <div>
      <p className="mb-6">
        ¿Quieres comprar algo más?{" "}
        <a href="#" className="underline hover:text-gray-600">
          Continuar Comprando
        </a>
      </p>

      {items.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-lg text-gray-600">Tu carrito está vacío</p>
        </div>
      ) : (
        items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            size={item.size}
            quantity={item.quantity}
            price={item.price}
            brand={item.brand}
            imageSrc={item.imageSrc}
            onRemove={() => onRemoveItem(item.id)}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))
      )}
    </div>
  );
}
