import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black">
              Eleva tus sentidos
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 max-w-[650px]">
              Creamos experiencias memorables con cerveza artesanal y eventos únicos. De Caracas
              para el mundo.
            </p>
            <div className="pt-4">
              <Link
                href="/productos"
                className={cn(buttonVariants({ variant: "default", size: "lg" }), "text-base")}
              >
                Ver Productos
              </Link>
            </div>
          </div>
          <div className="relative h-[420px] w-full">
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="Cervezas ACAUCAB"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
