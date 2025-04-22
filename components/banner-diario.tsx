import { Beer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DiscountBanner() {
  return (
    <div className="w-full bg-gray-100 py-12 px-4 relative overflow-hidden mb-8">
      <div className="container mx-auto text-center relative z-10">
        <div className="flex justify-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
            Conoce el Diario de Cerveza
          </h2>
          <Beer className="h-10 w-10 text-black" />
        </div>

        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-6">
          Descubre los mejores descuentos y promociones en cervezas venezolanas
        </p>

        <Button className="bg-black hover:bg-gray-800 text-white font-medium px-6 py-2">
          Ver Promociones
        </Button>
      </div>
    </div>
  );
}
