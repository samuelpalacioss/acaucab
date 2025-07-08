"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { EventProvider, EventProduct } from "./event-detail"

interface ProviderFilterProps {
  providers: { id: string; name: string }[]
  selectedProvider: string | null
  onSelectProvider: (provider: string | null) => void
  recentlyUsed: EventProduct[]
}

export default function ProviderFilter({
  providers,
  selectedProvider,
  onSelectProvider,
  recentlyUsed,
}: ProviderFilterProps) {
  const allOptions = [
    { id: "Todos", name: "Todos los Proveedores" },
    ...(recentlyUsed.length > 0 ? [{ id: "Recientes", name: "Recientes" }] : []),
    ...providers,
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {allOptions.map((option) => (
        <Button
          key={option.id}
          variant={selectedProvider === option.id ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectProvider(option.id)}
          className="relative"
        >
          {option.name}
          {option.id === "Recientes" && recentlyUsed.length > 0 && (
            <Badge variant="secondary" className="ml-2 h-4 px-1 text-xs">
              {recentlyUsed.length}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  )
}
