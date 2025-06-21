"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Search, Download, ArrowUpDown, AlertTriangle, RefreshCcw, Package, Archive, Filter, Plus, Tag, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/date-range-picker"
import { TopProductsChart } from "@/components/top-products-chart"
import { CriticalStockModal } from "@/components/critical-stock-modal"
import { AlertsModal } from "@/components/alerts-modal"

export default function InventoryPage() {
  const [date, setDate] = useState<DateRange | undefined>(undefined)

  const [isCriticalStockModalOpen, setIsCriticalStockModalOpen] = useState(false)

  // Datos de ejemplo para alertas de reposición
  const alertasReposicion = [
    {
      id: 1,
      producto: "Cerveza Premium Lager",
      sku: "CERV-001",
      ubicacion: "Pasillo 3, Anaquel 2",
      stock: 15,
      minimo: 20,
      fecha: "15/04/2025",
    },
    {
      id: 2,
      producto: "Cerveza IPA Especial",
      sku: "CERV-002",
      ubicacion: "Pasillo 1, Anaquel 5",
      stock: 8,
      minimo: 20,
      fecha: "16/04/2025",
    },
    {
      id: 3,
      producto: "Cerveza Stout Oscura",
      sku: "CERV-003",
      ubicacion: "Pasillo 2, Anaquel 1",
      stock: 12,
      minimo: 20,
      fecha: "17/04/2025",
    },
    {
      id: 4,
      producto: "Cerveza Ale Rubia",
      sku: "CERV-004",
      ubicacion: "Pasillo 4, Anaquel 3",
      stock: 5,
      minimo: 20,
      fecha: "18/04/2025",
    },
    {
      id: 5,
      producto: "Cerveza Pilsner Tradicional",
      sku: "CERV-005",
      ubicacion: "Pasillo 1, Anaquel 4",
      stock: 10,
      minimo: 20,
      fecha: "19/04/2025",
    },
    {
      id: 6,
      producto: "Cerveza Wheat Beer",
      sku: "CERV-006",
      ubicacion: "Pasillo 3, Anaquel 1",
      stock: 7,
      minimo: 20,
      fecha: "20/04/2025",
    }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Inventario</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stock total en Almacén */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock total en Almacén</CardTitle>
            <Badge variant="outline">Tiempo real</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="flex items-center justify-center h-24 w-24 rounded-full border-8">
                  <div className="text-3xl font-bold">925</div>
                </div>
                <div className="mt-2 text-sm">Unidades totales</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span className="text-sm">12 Tipos de Cerveza</span>
                </div>

              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stock en Anaquel */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock en Anaquel</CardTitle>
            <Badge variant="outline">Tiempo real</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="flex items-center justify-center h-24 w-24 rounded-full border-8">
                  <div className="text-3xl font-bold">520</div>
                </div>
                <div className="mt-2 text-sm">Unidades en tienda</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span className="text-sm">10 Tipos de Cerveza</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">36%</Badge>
                  <span className="text-sm">Del inventario total</span>
                </div>
            
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stock Crítico */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock crítico</CardTitle>
            <Badge variant="outline">Día</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="flex items-center justify-center h-24 w-24 rounded-full border-8">
                  <div className="text-3xl font-bold">14</div>
                </div>
                <div className="mt-2 text-sm">SKUs &lt; 100 </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">Cerveza Tipo A - 45 </span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">Cerveza Tipo B - 78 </span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">Cerveza Tipo C - 23 </span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" onClick={() => setIsCriticalStockModalOpen(true)}>
                Ver lista completa
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top 5 Productos y Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Alertas de Reposición</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Productos en anaquel con alerta de reposición física en pasillo (menos de 20 unidades)
              </p>
              
              <div className="grid grid-cols-1 gap-3">
                {alertasReposicion.slice(0, 2).map((alerta) => (
                  <div key={alerta.id} className="flex items-center justify-between border rounded-md p-3 bg-amber-50">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">{alerta.producto}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Tag className="h-3 w-3" /> {alerta.sku}
                        </div>
                        <div className="text-sm mt-1">Ubicación: {alerta.ubicacion}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">{alerta.fecha}</div>
                      <div className="font-medium text-amber-600 mt-1">
                        {alerta.stock} / {alerta.minimo} unidades
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        <FileText className="h-3 w-3 mr-1" />
                        Ver Orden PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end">
                <AlertsModal alerts={alertasReposicion} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Productos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Registro de Inventario</CardTitle>
            <div className="flex items-center gap-2">
              <DateRangePicker date={date} setDate={setDate} />
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center">
                    SKU
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Nombre
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Stock Total
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>En Almacén</TableHead>
                <TableHead>En Anaquel</TableHead>
        
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item) => (
                <TableRow key={item.sku}>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <StockIndicator stock={item.totalStock} threshold={item.reorderPoint} />
                  </TableCell>
                  <TableCell>{item.warehouseStock}</TableCell>
                  <TableCell>{item.shelfStock}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{getStockStatus(item.totalStock, item.minStock, item.reorderPoint)}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">Mostrando 1-10 de 145 productos</div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                1
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                2
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                3
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                ...
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                15
              </Button>
              <Button variant="outline" size="sm">
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <CriticalStockModal open={isCriticalStockModalOpen} onOpenChange={setIsCriticalStockModalOpen} />
    </div>
  )
}

function StockIndicator({ stock, threshold }: { stock: number; threshold: number }) {
  let indicatorClass = "bg-gray-200"

  if (stock <= threshold) {
    indicatorClass = "bg-gray-400"
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-full ${indicatorClass}`}></div>
      <span>{stock}</span>
    </div>
  )
}

function getStockStatus(totalStock: number, minStock: number, reorderPoint: number): string {
  if (totalStock <= minStock) {
    return "Crítico"
  } else if (totalStock <= reorderPoint) {
    return "Bajo"
  } else {
    return "Normal"
  }
}

const inventoryData = [
  {
    sku: "CERV-001",
    name: "Cerveza Premium Lager",
    category: "Lager",
    totalStock: 245,
    warehouseStock: 200,
    shelfStock: 45,
    minStock: 50,
    reorderPoint: 100,
  },
  {
    sku: "CERV-002",
    name: "Cerveza IPA Especial",
    category: "IPA",
    totalStock: 180,
    warehouseStock: 150,
    shelfStock: 30,
    minStock: 40,
    reorderPoint: 80,
  },
  {
    sku: "CERV-003",
    name: "Cerveza Stout Oscura",
    category: "Stout",
    totalStock: 95,
    warehouseStock: 80,
    shelfStock: 15,
    minStock: 40,
    reorderPoint: 100,
  },
  {
    sku: "CERV-004",
    name: "Cerveza Ale Rubia",
    category: "Ale",
    totalStock: 210,
    warehouseStock: 170,
    shelfStock: 40,
    minStock: 50,
    reorderPoint: 100,
  },
  {
    sku: "CERV-005",
    name: "Cerveza Pilsner Tradicional",
    category: "Pilsner",
    totalStock: 320,
    warehouseStock: 260,
    shelfStock: 60,
    minStock: 60,
    reorderPoint: 120,
  },
  {
    sku: "CERV-006",
    name: "Cerveza Wheat Beer",
    category: "Wheat",
    totalStock: 85,
    warehouseStock: 67,
    shelfStock: 18,
    minStock: 30,
    reorderPoint: 70,
  },
  {
    sku: "CERV-007",
    name: "Cerveza Porter Especial",
    category: "Porter",
    totalStock: 75,
    warehouseStock: 63,
    shelfStock: 12,
    minStock: 40,
    reorderPoint: 80,
  },
  {
    sku: "CERV-008",
    name: "Cerveza Amber Ale",
    category: "Ale",
    totalStock: 165,
    warehouseStock: 130,
    shelfStock: 35,
    minStock: 50,
    reorderPoint: 100,
  },
  {
    sku: "CERV-009",
    name: "Cerveza Bock Fuerte",
    category: "Bock",
    totalStock: 110,
    warehouseStock: 85,
    shelfStock: 25,
    minStock: 40,
    reorderPoint: 80,
  },
  {
    sku: "CERV-010",
    name: "Cerveza Pale Ale Artesanal",
    category: "Pale Ale",
    totalStock: 135,
    warehouseStock: 107,
    shelfStock: 28,
    minStock: 50,
    reorderPoint: 100,
  },
]
