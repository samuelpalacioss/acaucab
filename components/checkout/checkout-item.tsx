import Image from "next/image";
import { useTasaStore } from "@/store/tasa-store";

interface CheckoutItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export function CheckoutItem({ id, name, price, image, quantity }: CheckoutItemProps) {
  const { getTasa } = useTasaStore();

  const convertirADolar = (monto: number) => {
    const tasa = getTasa("USD");
    if (!tasa?.monto_equivalencia) return null;
    return monto / tasa.monto_equivalencia;
  };

  const totalItemPrice = price * quantity;
  const priceInUSD = convertirADolar(price);
  const totalItemPriceInUSD = convertirADolar(totalItemPrice);

  return (
    <div className="flex items-center gap-4 py-4 [&:not(:first-child)]:border-t">
      <div className="bg-gray-200 w-16 h-16 flex-shrink-0">
        <Image
          src={image}
          alt={name}
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-md font-bold text-right flex-shrink-0">
            {totalItemPrice.toFixed(2)} Bs
            {totalItemPriceInUSD !== null && (
              <span className="block text-sm font-normal text-gray-500">
                (${totalItemPriceInUSD.toFixed(2)})
              </span>
            )}
          </p>
        </div>
        <p className="text-sm text-gray-600">Cantidad: {quantity}</p>
        <p className="text-sm text-gray-600">
          Precio unitario: {price.toFixed(2)} Bs
          {priceInUSD !== null && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              (${priceInUSD.toFixed(2)})
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
