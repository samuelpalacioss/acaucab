"use client";
import Image from "next/image";
import { ItemQuantity } from "./item-quantity";
import { CarritoItemType } from "@/lib/schemas";
import { useTasaStore } from "@/store/tasa-store";

interface CartItemProps {
  item: CarritoItemType;
  onRemove: () => void;
  onUpdateQuantity: (sku: string, newQuantity: number) => void;
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const { getTasa } = useTasaStore();

  const convertirADolar = (monto: number) => {
    const tasa = getTasa("USD");
    if (!tasa?.monto_equivalencia) return null;
    return monto / tasa.monto_equivalencia;
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.sku, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.sku, item.quantity - 1);
    }
  };

  // Add safety check for precio
  const safePrice = typeof item.precio === "number" ? item.precio : 0;
  const priceInUSD = convertirADolar(safePrice);

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-6 border-t">
      <div className="bg-gray-200 w-32 h-32 flex-shrink-0">
        <Image
          src={item.imagen ?? "/placeholder.svg"}
          alt={item.nombre_cerveza}
          width={128}
          height={128}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-bold">{item.nombre_cerveza}</h3>
        <p className="text-md mb-1">{item.presentacion}</p>
        <p className="text-lg font-bold mb-1">
          {safePrice.toFixed(2)} Bs
          {priceInUSD !== null && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              (${priceInUSD.toFixed(2)})
            </span>
          )}
        </p>
        <p className="text-sm text-gray-600 mb-2">Hecha por {item.marca}</p>

        <div className="mt-2 inline-block">
          <ItemQuantity
            quantity={item.quantity}
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
