import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/eventos", label: "Eventos" },
  { href: "/diario-de-cerveza", label: "DiarioDeCerveza" },
  { href: "/productos", label: "Productos" },
];

export default function Navbar() {
  return (
    <header className="w-full py-4 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 flex items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-black">
            <Image src="/acaucab-logo.svg" alt="Logo" width={130} height={50} />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8 ml-16">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-black hover:text-gray-600 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4 ml-auto">
          <Button variant="outline" className="font-medium">
            Iniciar Sesión
          </Button>
          <Link href="/carrito" className="text-black hover:text-gray-600">
            <ShoppingCart className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}
