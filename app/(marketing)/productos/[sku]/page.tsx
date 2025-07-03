"use client";

import Image from "next/image";
import { Loader, Minus, Plus } from "lucide-react";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { getPresentacionBySku } from "@/api/get-presentacion-by-sku";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  // alcohol: number;
  capacity: string;
}

export default function BeerDetailPage({ params }: { params: { sku: string } }) {
  const [beer, setBeer] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getPresentacionBySku(params.sku);

        if (productData) {
          setBeer({
            id: productData.presentacion_id,
            name: productData.nombre_cerveza,
            price: productData.precio,
            image: productData.imagen || "/placeholder.svg?height=400&width=400",
            // TODO: Replace with actual data when available in the API
            brand: productData.marca || "Marca Desconocida",
            // alcohol: productData.tipo_cerveza,
            capacity: productData.presentacion,
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.sku]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-xl font-medium">Cargando producto...</p>
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!beer) {
    notFound();
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-8">
      {/* Imagen del producto */}
      <div className="w-full md:w-1/2">
        <div className="aspect-square relative bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={beer.image || "/placeholder.svg"}
            alt={beer.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Información del producto */}
      <div className="w-full md:w-1/2 space-y-6">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl md:text-3xl font-bold">{beer.name}</h1>
        </div>

        <div className="text-2xl font-semibold">{beer.price.toFixed(2)} Bs</div>

        <div className="prose max-w-none">
          <p>
            Cerveza artesanal de alta calidad con sabor excepcional y aroma distintivo. Elaborada
            con ingredientes seleccionados para ofrecer una experiencia única.
          </p>
        </div>

        <div className="text-sm text-gray-600">
          <p>
            Hecha por: <span className="font-bold">{beer.brand}</span>
          </p>
        </div>

        {/* <div className="text-sm text-gray-600">
          <p>
            Porcentaje de alcohol: <span className="font-bold">{beer.alcohol}&#37;</span>
          </p>
        </div> */}

        <div className="text-sm font-bold text-gray-600">
          <p>{beer.capacity}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Cantidad</h3>
            <div className="flex items-center">
              <div className="flex items-center border rounded-md">
                <button
                  className="p-2 hover:bg-gray-100"
                  aria-label="Disminuir cantidad"
                  onClick={handleDecrease}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  className="p-2 hover:bg-gray-100"
                  aria-label="Aumentar cantidad"
                  onClick={handleIncrease}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <button className="w-full max-w-[300px] bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors">
            Añadir al carrito
          </button>

          <div className="text-sm text-gray-500 space-y-2">
            <p>Precio no incluye IVA ni envío</p>
            <p>Precio del envío varia según la zona</p>
          </div>
        </div>
      </div>
    </div>
  );
}
