import { Beer } from 'lucide-react';

export default function BannerDiarioCerveza() {
  return (
    <div className="bg-gray-100 w-full py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-4xl font-bold text-gray-900">
              Conoce el Diario de Cerveza
            </h2>
            <Beer className="h-8 w-8 text-black" />
          </div>
          <p className="text-xl text-gray-700 mb-6">
            Descubre los mejores descuentos y promociones en cervezas venezolanas
          </p>
          <a
            href="/diario-cerveza"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
          >
            Ver Descuentos
          </a>
        </div>
      </div>
    </div>
  );
} 