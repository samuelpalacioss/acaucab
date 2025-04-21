"use client";

import { useState } from "react";
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

export default function CatalogoCervezas() {
  const [priceRange, setPriceRange] = useState([1.5, 10]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 1.5 && value <= priceRange[1]) {
      setPriceRange([value, priceRange[1]]);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= priceRange[0] && value <= 10) {
      setPriceRange([priceRange[0], value]);
    }
  };

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
                    min={1.5}
                    max={10}
                    step={0.5}
                    onValueChange={handlePriceChange}
                    className="mt-1"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beers.map((beer) => (
              <div key={beer.id} className="group">
                <Link href="#" className="block">
                  <div className="bg-gray-200 aspect-square mb-3 relative overflow-hidden">
                    <Image
                      src={beer.image || "/placeholder.svg"}
                      alt={beer.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium">{beer.name}</h3>
                  <p className="text-gray-900 font-semibold mt-1">${beer.price}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Datos de ejemplo
const beers = [
  {
    id: 1,
    name: "Amanecer En Choroni",
    price: 4.5,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    name: "Música de lupulo",
    price: 7.0,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    name: "Ávila Pale Ale",
    price: 8.0,
    image: "/placeholder.svg?height=400&width=400",
  },
  { id: 4, name: "Sol de Verano", price: 5.0, image: "/placeholder.svg?height=400&width=400" },
  {
    id: 5,
    name: "La Cerveza de la Vida",
    price: 6.5,
    image: "/placeholder.svg?height=400&width=400",
  },
  { id: 6, name: "Musica en el cielo", price: 5.5, image: "/placeholder.svg?height=400&width=400" },
  { id: 7, name: "Noche de verano", price: 6.0, imaage: "/placeholder.svg?height=400&width=400" },
  { id: 8, name: "Cielo azul", price: 8.5, image: "/placeholder.svg?height=400&width=400" },
  { id: 9, name: "Cristal Imperial", price: 5.0, image: "/placeholder.svg?height=400&width=400" },
];
