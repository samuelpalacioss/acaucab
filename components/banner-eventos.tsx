import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function BannerEventos() {
  return (
    <section className="w-full bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=800&width=1200"
              alt="Multitud en evento"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col space-y-6 p-6 text-black">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">EVENTOS</h2>
            <h3 className="text-3xl md:text-4xl font-semibold">PRÓXIMOS EVENTOS</h3>
            <p className="text-lg text-gray-700">
              Descubre nuevas experiencias y sabores. Mira el mundo a través de nuestros ojos.
            </p>
            <Link href="/eventos" className="inline-block">
              <Button
                variant="outline"
                className="border-2 border-black text-black hover:bg-gray-100 rounded-full px-8 group"
              >
                VER EVENTOS
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
