"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Download, Package } from "lucide-react"
import { InventoryData } from "@/models/inventory"

interface CriticalStockModalProps {
  /** Estado de apertura del modal */
  open: boolean
  /** Función para cambiar el estado de apertura */
  onOpenChange: (open: boolean) => void
  /** Datos de inventario filtrados para productos críticos */
  criticalStockItems: InventoryData
}

export function CriticalStockModal({ open, onOpenChange, criticalStockItems }: CriticalStockModalProps) {
  /** Ordenar items por stock total ascendente (más críticos primero) */
  const sortedItems = [...criticalStockItems].sort((a, b) => a["Stock Total"] - b["Stock Total"]);

  /** Función para determinar el nivel de criticidad del stock */
  const getCriticalLevel = (stock: number) => {
    if (stock === 0) return { label: "Sin Stock", variant: "destructive" as const, bgColor: "bg-red-600" };
    if (stock <= 25) return { label: "Crítico", variant: "destructive" as const, bgColor: "bg-red-500" };
    if (stock <= 50) return { label: "Muy Bajo", variant: "destructive" as const, bgColor: "bg-orange-500" };
    if (stock <= 100) return { label: "Bajo", variant: "secondary" as const, bgColor: "bg-yellow-500" };
    return { label: "Normal", variant: "outline" as const, bgColor: "bg-green-500" };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Productos con Stock Crítico ({criticalStockItems.length})
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-2">
          <p className="text-sm text-muted-foreground mb-4">
            Listado de productos con niveles de inventario por debajo del umbral recomendado (menos de 100 unidades).
            Ordenados por nivel de criticidad.
          </p>

          {criticalStockItems.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <p className="text-lg font-medium">¡Excelente!</p>
                <p>No hay productos con stock crítico en este momento.</p>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="text-right">Stock Total</TableHead>
                  <TableHead className="text-right">En Almacén</TableHead>
                  <TableHead className="text-right">En Anaquel</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedItems.map((item) => {
                  const criticalLevel = getCriticalLevel(item["Stock Total"]);
                  return (
                    <TableRow key={item.SKU} className={item["Stock Total"] === 0 ? "bg-red-50" : ""}>
                      <TableCell className="font-medium">{item.SKU}</TableCell>
                      <TableCell className="font-medium">{item.Nombre}</TableCell>
                      <TableCell>{item.Categoría}</TableCell>
                      <TableCell className="text-right">
                        <span className={`font-bold ${item["Stock Total"] <= 25 ? "text-red-600" : item["Stock Total"] <= 50 ? "text-orange-600" : "text-yellow-600"}`}>
                          {item["Stock Total"]}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{item["En Almacén"]}</TableCell>
                      <TableCell className="text-right">{item["En Anaquel"]}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={criticalLevel.variant} 
                          className={`flex items-center gap-1 w-fit text-white ${criticalLevel.bgColor}`}
                        >
                          <AlertTriangle className="h-3 w-3 text-white" />
                          {criticalLevel.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}

         
        </div>
      </DialogContent>
    </Dialog>
  )
}


