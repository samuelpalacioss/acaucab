"use client"

import type React from "react"

export function TopProductsChart({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      <div className="h-full w-full border rounded-md p-2">
        <div className="text-xs text-center text-muted-foreground">Gráfico de barras - Top 5 productos</div>
        <div className="mt-4 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Cerveza Premium</span>
              <span>120 </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-sm">
              <div className="h-full bg-gray-500 rounded-sm" style={{ width: "80%" }}></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Cerveza Lager</span>
              <span>98 </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-sm">
              <div className="h-full bg-gray-500 rounded-sm" style={{ width: "65%" }}></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Cerveza IPA</span>
              <span>86 </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-sm">
              <div className="h-full bg-gray-500 rounded-sm" style={{ width: "57%" }}></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Cerveza Stout</span>
              <span>72 </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-sm">
              <div className="h-full bg-gray-500 rounded-sm" style={{ width: "48%" }}></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Cerveza Ale</span>
              <span>65 </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-sm">
              <div className="h-full bg-gray-500 rounded-sm" style={{ width: "43%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
