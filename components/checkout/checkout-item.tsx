import Image from "next/image";

interface CheckoutItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export function CheckoutItem({ id, name, price, image, quantity }: CheckoutItemProps) {
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
        <div className="flex justify-between">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-md font-bold">${(price * quantity).toFixed(2)}</p>
        </div>
        <p className="text-sm text-gray-600">Cantidad: {quantity}</p>
        <p className="text-sm text-gray-600">Precio unitario: ${price.toFixed(2)}</p>
      </div>
    </div>
  );
}
