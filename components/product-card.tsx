import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: React.ReactNode;
  price: number;
  image: string;
}

export function ProductCard({ id, name, price, image }: ProductCardProps) {
  return (
    <div className="group">
      <Link href={`/productos/${id}`} className="block">
        <div className="bg-gray-200 aspect-square mb-3 relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={typeof name === "string" ? name : "Product image"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-gray-900 font-semibold mt-1">{price} Bs</p>
      </Link>
    </div>
  );
}
