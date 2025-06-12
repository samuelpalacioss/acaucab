"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  recentlyUsed: any[];
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  recentlyUsed,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className={cn("text-xs", selectedCategory === "Todas" && "bg-gray-100")}
        onClick={() => onSelectCategory("Todas")}
      >
        Todas
      </Button>

      {recentlyUsed.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          className={cn("text-xs", selectedCategory === "Recientes" && "bg-gray-100")}
          onClick={() => onSelectCategory("Recientes")}
        >
          Recientes
        </Button>
      )}

      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          size="sm"
          className={cn("text-xs", selectedCategory === category && "bg-gray-100")}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
