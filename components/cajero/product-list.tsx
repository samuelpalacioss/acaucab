"use client";

import { CarritoItemType } from "@/lib/schemas";
import { ProductCard } from "@/components/product-card";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Plus } from "lucide-react";

interface ProductListProps {
  products: CarritoItemType[];
  onAddToCart: (product: CarritoItemType) => void;
  searchQuery: string;
  selectedCategory: string | null;
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

export default function ProductList({
  products,
  onAddToCart,
  searchQuery,
  selectedCategory,
}: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {searchQuery ? (
          <p>No se encontraron productos que coincidan con "{searchQuery}"</p>
        ) : selectedCategory ? (
          <p>No se encontraron productos en la categoría {selectedCategory}</p>
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {products.map((product) => (
        <Card
          key={product.sku}
          className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onAddToCart(product)}
        >
          <CardContent className="p-3">
            <div className="flex flex-col h-full">
              <div className="flex-grow space-y-2">
                <h3 className="font-semibold text-sm leading-tight">
                  {searchQuery
                    ? highlightText(product.nombre_cerveza, searchQuery)
                    : product.nombre_cerveza}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.tipo_cerveza}
                </p>

                <Badge variant="secondary" className="text-xs w-fit font-medium">
                  {product.presentacion}
                </Badge>
              </div>

              <div className="flex justify-between items-center mt-3 pt-2">
                <p className="font-bold text-sm">${product.precio.toFixed(2)}</p>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
