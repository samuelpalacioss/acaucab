"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Download } from "lucide-react"

interface CriticalStockModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CriticalStockModal({ open, onOpenChange }: CriticalStockModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Productos con Stock Crítico</DialogTitle>
        </DialogHeader>
        
        <div className="py-2">
          <p className="text-sm text-muted-foreground mb-4">
            Listado de productos con niveles de inventario por debajo del mínimo recomendado.
          </p>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead className="text-right">Stock Total</TableHead>
                <TableHead className="text-right">Mínimo</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criticalStockItems.map((item) => (
                <TableRow key={item.sku}>
                  <TableCell className="font-medium">{item.sku}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">{item.totalStock}</TableCell>
                  <TableCell className="text-right">100</TableCell>
                  <TableCell>
                    <Badge variant="destructive" className="flex items-center gap-1 w-fit text-white bg-black">
                      <AlertTriangle className="h-3 w-3 text-white" />
                      Crítico
                    </Badge>
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Datos de ejemplo para productos con stock crítico
const criticalStockItems = [
  {
    sku: "CERV-003",
    name: "Cerveza Stout Oscura",
    category: "Stout",
    totalStock: 35,
    minStock: 40,
    reorderPoint: 100,
  },
  {
    sku: "CERV-006",
    name: "Cerveza Wheat Beer",
    category: "Wheat",
    totalStock: 25,
    minStock: 30,
    reorderPoint: 70,
  },
  {
    sku: "CERV-007",
    name: "Cerveza Porter Especial", 
    category: "Porter",
    totalStock: 32,
    minStock: 40,
    reorderPoint: 80,
  },
]
