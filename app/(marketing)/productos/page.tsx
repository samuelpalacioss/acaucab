"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getPresentacionesDisponibles } from "@/api/get-presentaciones-disponibles";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function CatalogoCervezas() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [sliderBounds, setSliderBounds] = useState([0, 0]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const presentaciones = await getPresentacionesDisponibles();
        const mappedProducts = presentaciones
          .map((p: any) => ({
            id: p.presentacion_id,
            name: p.nombre_cerveza,
            price: p.precio,
            image: p.imagen || "/placeholder.svg?height=400&width=400",
          }))
          .filter((p) => p.price != null);

        setProducts(mappedProducts);

        if (mappedProducts.length > 0) {
          const prices = mappedProducts.map((p) => p.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setSliderBounds([minPrice, maxPrice]);
          setPriceRange([minPrice, maxPrice]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error appropriately, maybe show a toast
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= sliderBounds[0] && value <= priceRange[1]) {
      setPriceRange([value, priceRange[1]]);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= priceRange[0] && value <= sliderBounds[1]) {
      setPriceRange([priceRange[0], value]);
    }
  };

  const filteredProducts = products.filter(
    (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar de filtros */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-4 pt-2">
            {/* Filtro por tipo */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Tipo de Cerveza</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="lager" />
                  <Label htmlFor="lager">Lager</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ipa" />
                  <Label htmlFor="ipa">IPA</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="stout" />
                  <Label htmlFor="stout">Stout</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ale" />
                  <Label htmlFor="ale">Ale</Label>
                </div>
              </div>
            </div>

            {/* Filtro por precio */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Precio</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-1">$</span>
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={handleMinPriceChange}
                      className="w-14 h-7 text-sm px-0"
                    />
                  </div>
                  <span className="text-sm text-gray-500">to</span>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-1">$</span>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={handleMaxPriceChange}
                      className="w-14 h-7 text-sm px-0"
                    />
                  </div>
                </div>
                <div className="w-[200px]">
                  <Slider
                    value={priceRange}
                    min={sliderBounds[0]}
                    max={sliderBounds[1]}
                    step={1}
                    onValueChange={handlePriceChange}
                    className="mt-1"
                    disabled={loading || products.length === 0}
                  />
                </div>
              </div>
            </div>

            {/* Filtro por marca */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Marca</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="corona" />
                  <Label htmlFor="corona">Minerva</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="heineken" />
                  <Label htmlFor="heineken">Cucapá</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="stella" />
                  <Label htmlFor="stella">Tempus</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="modelo" />
                  <Label htmlFor="modelo">Calavera</Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <p className="text-gray-500 mb-2 sm:mb-0">1-9 de 36 Productos</p>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar productos"
                  className="w-[220px] pl-8 h-10 border rounded-md bg-white focus-visible:ring-0"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-2.5 top-3 h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <Select defaultValue="popular">
                <SelectTrigger className="w-[220px]">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Ordenar por:</span>
                    <SelectValue defaultValue="popular" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="precio-bajo">Menor precio</SelectItem>
                  <SelectItem value="precio-alto">Mayor precio</SelectItem>
                  <SelectItem value="nuevos">Más recientes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grid de productos */}
          {loading ? (
            <p>Cargando productos...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((beer) => (
                <ProductCard
                  key={beer.id}
                  id={beer.id}
                  name={beer.name}
                  price={beer.price}
                  image={beer.image}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
