import Image from "next/image";
import { ItemQuantity } from "./item-quantity";

interface CartItemProps {
  id: number;
  name: string;
  size: string;
  quantity: number;
  price: number;
  brand: string;
  imageSrc: string;
  onRemove: () => void;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
}

export function CartItem({
  id,
  name,
  size,
  quantity,
  price,
  brand,
  imageSrc,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) {
  const handleIncrease = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-6 border-t">
      <div className="bg-gray-200 w-32 h-32 flex-shrink-0">
        <Image
          src={imageSrc}
          alt={name}
          width={128}
          height={128}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-md mb-1">{size}</p>
        <p className="text-lg font-bold mb-1">${price.toFixed(2)}</p>
        <p className="text-sm text-gray-600 mb-2">Hecha por {brand}</p>

        <div className="mt-2 inline-block">
          <ItemQuantity
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        </div>
      </div>
      <div className="self-end sm:self-center mt-2 sm:mt-0">
        <button className="text-gray-600 underline" onClick={onRemove}>
          Eliminar
        </button>
      </div>
    </div>
  );
}
