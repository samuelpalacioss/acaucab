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
import { getPresentacionesDisponiblesWeb } from "@/api/get-presentaciones-disponibles-web";
import { Loader } from "lucide-react";
import { useTasaStore } from "@/store/tasa-store";

interface Product {
  sku: string;
  name: string;
  price: number;
  image: string;
  type: string;
  brand: string;
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function CatalogoCervezas() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [sliderBounds, setSliderBounds] = useState([0, 0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [beerTypes, setBeerTypes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState("nuevos");
  const { getTasa, fetchTasas } = useTasaStore();
  const tasas = useTasaStore((state) => state.tasas);

  const convertirADolar = (monto: number) => {
    const tasa = getTasa("USD");
    if (!tasa?.monto_equivalencia) return null;
    return monto / tasa.monto_equivalencia;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const presentaciones = await getPresentacionesDisponiblesWeb();
        const mappedProducts = presentaciones
          .map((p: any) => ({
            sku: p.sku,
            name: p.nombre_cerveza,
            price: p.precio,
            image: p.imagen || "/placeholder.svg?height=400&width=400",
            type: p.tipo_cerveza,
            brand: p.marca,
          }))
          .filter((p) => p.price != null && p.type != null && p.brand != null);

        setProducts(mappedProducts);

        if (mappedProducts.length > 0) {
          const prices = mappedProducts.map((p) => p.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setSliderBounds([minPrice, maxPrice]);
          setPriceRange([minPrice, maxPrice]);

          const uniqueTypes = [...new Set(mappedProducts.map((p) => p.type))].sort();
          setBeerTypes(uniqueTypes);

          const uniqueBrands = [...new Set(mappedProducts.map((p) => p.brand))].sort();
          setBrands(uniqueBrands);
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

  useEffect(() => {
    // Initial fetch
    fetchTasas();

    // Set up polling every 5 minutes
    const intervalId = setInterval(() => {
      console.log("🔄 Refreshing exchange rates in product catalog...");
      fetchTasas();
    }, 5 * 60 * 1000); // 5 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchTasas]);

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

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const filteredProducts = products
    .filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((product) => (selectedTypes.length === 0 ? true : selectedTypes.includes(product.type)))
    .filter((product) =>
      selectedBrands.length === 0 ? true : selectedBrands.includes(product.brand)
    )
    .sort((a, b) => {
      if (sortOrder === "precio-bajo") {
        return a.price - b.price;
      }
      if (sortOrder === "precio-alto") {
        return b.price - a.price;
      }
      if (sortOrder === "nuevos") {
        return 0;
      }
      return 0;
    });

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
                {beerTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.toLowerCase()}
                      onCheckedChange={() => handleTypeChange(type)}
                      checked={selectedTypes.includes(type)}
                    />
                    <Label htmlFor={type.toLowerCase()}>{type}</Label>
                  </div>
                ))}
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
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand.toLowerCase()}
                      onCheckedChange={() => handleBrandChange(brand)}
                      checked={selectedBrands.includes(brand)}
                    />
                    <Label htmlFor={brand.toLowerCase()}>{brand}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <p className="text-gray-500 mb-2 sm:mb-0">
              {filteredProducts.length} de {products.length} Productos
            </p>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar productos"
                  className="w-[220px] pl-8 h-10 border rounded-md bg-white focus-visible:ring-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[220px]">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Ordenar por:</span>
                    <SelectValue placeholder="Seleccionar" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nuevos">Más recientes</SelectItem>
                  <SelectItem value="precio-bajo">Menor precio</SelectItem>
                  <SelectItem value="precio-alto">Mayor precio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grid de productos */}
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
              <p className="text-xl font-medium">Cargando productos...</p>
              <Loader className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((beer) => (
                <ProductCard
                  key={beer.sku}
                  sku={beer.sku}
                  name={highlightText(beer.name, searchTerm)}
                  price={beer.price}
                  priceInUSD={convertirADolar(beer.price)}
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
