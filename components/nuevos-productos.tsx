"use client";

import { ProductCard } from "@/components/product-card";
import Link from "next/link";
// import { beers } from "@/app/(marketing)/productos/page"; // Temporarily importing from here, should be moved to a proper data layer

export function NuevosProductos() {
  // Get the last 4 products
  // const latestProducts = beers.slice(-4);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">NUEVOS LANZAMIENTOS</h2>
          <p className="text-gray-600 mt-2">Enviamos a gran parte de La Gran Caracas</p>
        </div>
        <Link
          href="/productos"
          className="text-sm font-medium px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
        >
          VER TODO
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* {latestProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))} */}
      </div>
    </section>
  );
}
