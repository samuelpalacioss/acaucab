import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart, CreditCard, Beer } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Bienvenido a Nuestro Sistema</h1>
          <p className="text-lg text-muted-foreground">
            Seleccione una de las opciones disponibles para comenzar.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="px-8 py-6 text-lg">
            <Link href="/registro">Ir a Registro</Link>
          </Button>

          <Button asChild className="px-8 py-6 text-lg bg-indigo-600 hover:bg-indigo-700">
            <Link href="/carrito" className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Ver Carrito</span>
            </Link>
          </Button>

          <Button asChild className="px-8 py-6 text-lg bg-emerald-600 hover:bg-emerald-700">
            <Link href="/checkout" className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <span>Checkout</span>
            </Link>
          </Button>

          <Button asChild className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700">
            <Link href="/productos" className="flex items-center gap-2">
              <Beer className="h-5 w-5" />
              <span>Productos</span>
            </Link>
          </Button>

          <Button asChild className="px-8 py-6 text-lg bg-purple-600 hover:bg-purple-700">
            <Link href="/productos/3" className="flex items-center gap-2">
              <Beer className="h-5 w-5" />
              <span>Producto 3</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
