"use client";

import { ProductCard } from "@/components/product-card";
import { getPresentacionesDisponiblesWeb } from "@/api/get-presentaciones-disponibles-web";
import { PresentacionType } from "@/lib/schemas";
import Link from "next/link";
import { useEffect, useState } from "react";

export function NuevosProductos() {
  const [latestProducts, setLatestProducts] = useState<PresentacionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestProducts() {
      try {
        const products = await getPresentacionesDisponiblesWeb(); // Tienda WEB
        // Get the last 4 products
        setLatestProducts(products.slice(-4));
      } catch (error) {
        console.error("Failed to fetch latest products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestProducts();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        {/* You can add a loading skeleton here */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">NUEVOS LANZAMIENTOS</h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">Enviamos a gran parte de La Gran Caracas</p>
          </div>
          <Link
            href="/productos"
            className="text-sm font-medium px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors self-start sm:self-auto"
          >
            VER TODO
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="group animate-pulse">
            <div className="bg-gray-200 aspect-square mb-3 relative overflow-hidden"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/2 mt-1"></div>
          </div>
          <div className="group animate-pulse">
            <div className="bg-gray-200 aspect-square mb-3 relative overflow-hidden"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/2 mt-1"></div>
          </div>
          <div className="group animate-pulse">
            <div className="bg-gray-200 aspect-square mb-3 relative overflow-hidden"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/2 mt-1"></div>
          </div>
          <div className="group animate-pulse">
            <div className="bg-gray-200 aspect-square mb-3 relative overflow-hidden"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/2 mt-1"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">NUEVOS LANZAMIENTOS</h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">Enviamos a gran parte de La Gran Caracas</p>
        </div>
        <Link
          href="/productos"
          className="text-sm font-medium px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors self-start sm:self-auto"
        >
          VER TODO
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {latestProducts.map((product) => (
          <ProductCard
            key={product.sku}
            sku={product.sku}
            name={product.nombre_cerveza}
            price={product.precio}
            image={product.imagen || "/placeholder.svg"}
          />
        ))}
      </div>
    </section>
  );
}
