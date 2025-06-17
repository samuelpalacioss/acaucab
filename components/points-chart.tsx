"use client"

import type React from "react"

export function PointsChart({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      <div className="h-full w-full border rounded-md p-2">
        <div className="text-xs text-center text-muted-foreground">Gráfico de línea - Puntos últimos 30 días</div>
        <div className="flex justify-between mt-4 text-xs">
          <div>Día 1</div>
          <div>Día 15</div>
          <div>Día 30</div>
        </div>
        <div className="mt-2 relative h-20">
          <div className="absolute bottom-0 left-0 right-0 border-t border-dashed"></div>
          <div className="absolute bottom-10 left-0 right-0 border-t border-dashed"></div>
          <div className="absolute bottom-20 left-0 right-0 border-t border-dashed"></div>

          {/* Línea de puntos emitidos */}
          <svg className="absolute inset-0 h-full w-full">
            <polyline points="0,15 50,10 100,8 150,5 200,3" fill="none" stroke="black" strokeWidth="2" />
          </svg>

          {/* Línea de puntos canjeados */}
          <svg className="absolute inset-0 h-full w-full">
            <polyline
              points="0,18 50,15 100,12 150,10 200,8"
              fill="none"
              stroke="gray"
              strokeWidth="2"
              strokeDasharray="4"
            />
          </svg>
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-black mr-1"></div>
            <span>Emitidos</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-500 mr-1"></div>
            <span>Canjeados</span>
          </div>
        </div>
      </div>
    </div>
  )
}
