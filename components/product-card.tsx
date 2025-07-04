import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  sku: string;
  name: React.ReactNode;
  price: number;
  priceInUSD?: number | null;
  image: string;
}

export function ProductCard({ sku, name, price, priceInUSD, image }: ProductCardProps) {
  return (
    <div className="group">
      <Link href={`/productos/${sku}`} className="block">
        <div className="bg-gray-200 aspect-square mb-3 relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={typeof name === "string" ? name : "Product image"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-gray-900 font-semibold mt-1">
          {price.toFixed(2)} Bs
          {priceInUSD !== null && typeof priceInUSD !== "undefined" && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              (${priceInUSD.toFixed(2)})
            </span>
          )}
        </p>
      </Link>
    </div>
  );
}
