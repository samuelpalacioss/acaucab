import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black">
            Eleva tus sentidos
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 max-w-[650px]">
            Creamos experiencias memorables con cerveza artesanal y eventos únicos. De Caracas para
            el mundo.
          </p>
          <div className="pt-4">
            <Button className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg">
              Ver Productos
            </Button>
          </div>
        </div>
        <div className="relative h-[500px] w-full">
          <Image
            src="/placeholder.svg?height=500&width=500"
            alt="Cervezas ACAUCAB"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
