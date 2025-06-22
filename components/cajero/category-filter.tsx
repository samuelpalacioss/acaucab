"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

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
  /** Obtener el valor seleccionado para mostrar en el trigger */
  const getDisplayValue = () => {
    if (!selectedCategory || selectedCategory === "Todas") {
      return "Todas las categorías";
    }
    return selectedCategory;
  };

  /** Manejar el cambio de selección del dropdown */
  const handleValueChange = (value: string) => {
    if (value === "todas") {
      onSelectCategory("Todas");
    } else if (value === "recientes") {
      onSelectCategory("Recientes");
    } else {
      onSelectCategory(value);
    }
  };

  /** Obtener el valor actual para el Select component */
  const getCurrentValue = () => {
    if (!selectedCategory || selectedCategory === "Todas") {
      return "todas";
    }
    if (selectedCategory === "Recientes") {
      return "recientes";
    }
    return selectedCategory;
  };

  return (
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-muted-foreground" />
      <Select value={getCurrentValue()} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue>{getDisplayValue()}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {/** Opción por defecto para mostrar todas las categorías */}
          <SelectItem value="todas">Todas las categorías</SelectItem>

          {/** Mostrar opción de recientes si hay productos usados recientemente */}
          {recentlyUsed.length > 0 && <SelectItem value="recientes">Recientes</SelectItem>}

          {/** Mostrar todas las categorías disponibles */}
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
