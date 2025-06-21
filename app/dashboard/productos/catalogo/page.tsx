"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, Filter, ArrowUpDown, Edit, Copy, Trash2, FileText, Newspaper } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductFiltersDialog from "@/components/product-filters-dialog"

export default function ProductCatalog() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Catálogo de Productos</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsFiltersOpen(true)}>
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button asChild>
            <Link href="/productos/catalogo/nuevo">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Producto
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Todos los Productos</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar productos..." className="pl-8" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="lager">Lager</SelectItem>
                  <SelectItem value="ipa">IPA</SelectItem>
                  <SelectItem value="stout">Stout</SelectItem>
                  <SelectItem value="ale">Ale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todos (145)</TabsTrigger>
              <TabsTrigger value="low-stock">Stock Bajo (24)</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="border rounded-md p-4 text-center">
                  <div className="text-2xl font-bold">145</div>
                  <div className="text-sm text-muted-foreground">Total productos</div>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-sm text-muted-foreground">Stock bajo</div>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <div className="text-2xl font-bold">35</div>
                  <div className="text-sm text-muted-foreground">En DiarioDeUnaCerveza</div>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <div className="text-2xl font-bold">Bs. 45,890</div>
                  <div className="text-sm text-muted-foreground">Valor inventario</div>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div className="flex items-center">
                          SKU / Código
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Nombre de la cerveza
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Estilo / Categoría</TableHead>
                      <TableHead>Proveedor</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Precio de venta
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Stock total
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Stock en anaquel</TableHead>
                      <TableHead>Stock en almacén</TableHead>
                      <TableHead className="text-center">DiarioDeUnaCerveza</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productsData.map((product) => (
                      <TableRow key={product.sku}>
                        <TableCell>
                          <Link href={`/productos/catalogo/editar/${product.sku}`} className="text-blue-600 hover:underline">
                            {product.sku}
                          </Link>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.supplier}</TableCell>
                        <TableCell>
                          <div>Bs. {product.price.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">${product.priceUsd.toFixed(2)}</div>
                        </TableCell>
                        <TableCell>
                          <StockIndicator stock={product.totalStock} threshold={100} />
                        </TableCell>
                        <TableCell>
                          <StockIndicator stock={product.shelfStock} threshold={20} />
                        </TableCell>
                        <TableCell>
                          <StockIndicator stock={product.totalStock - product.shelfStock} threshold={100} />
                        </TableCell>
                        {/* Newspaper */}
                        <TableCell className="text-center">
                          {product.inMagazine ? (
                            <Badge variant="outline" className="bg-gray-100">
                              <Newspaper className="h-4 w-4" />
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/productos/catalogo/editar/${product.sku}`}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Editar</span>
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

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
            </TabsContent>

            {/* Contenido similar para las otras pestañas */}
            <TabsContent value="active">
              <div className="text-center p-8 text-muted-foreground">
                Contenido similar para productos activos
              </div>
            </TabsContent>
            <TabsContent value="inactive">
              <div className="text-center p-8 text-muted-foreground">
                Contenido similar para productos inactivos
              </div>
            </TabsContent>
            <TabsContent value="low-stock">
              <div className="text-center p-8 text-muted-foreground">
                Contenido similar para productos con stock bajo
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ProductFiltersDialog open={isFiltersOpen} onOpenChange={setIsFiltersOpen} />
    </div>
  )
}

function StockIndicator({ stock, threshold }: { stock: number; threshold: number }) {
  let indicatorClass = "bg-gray-200"
  
  if (stock < threshold) {
    indicatorClass = "bg-gray-400"
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-full ${indicatorClass}`}></div>
      <span>{stock}</span>
    </div>
  )
}

const productsData = [
  {
    sku: "CERV-001",
    name: "Cerveza Premium Lager",
    category: "Lager",
    supplier: "Cervecería Nacional",
    price: 45.5,
    priceUsd: 1.26,
    totalStock: 245,
    shelfStock: 45,
    inMagazine: true,
    active: true,
  },
  {
    sku: "CERV-002",
    name: "Cerveza IPA Especial",
    category: "IPA",
    supplier: "Craft Beers Co.",
    price: 58.75,
    priceUsd: 1.62,
    totalStock: 180,
    shelfStock: 30,
    inMagazine: true,
    active: true,
  },
  {
    sku: "CERV-003",
    name: "Cerveza Stout Oscura",
    category: "Stout",
    supplier: "Dark Brews Inc.",
    price: 52.25,
    priceUsd: 1.44,
    totalStock: 95,
    shelfStock: 15,
    inMagazine: false,
    active: true,
  },
  {
    sku: "CERV-004",
    name: "Cerveza Ale Rubia",
    category: "Ale",
    supplier: "Golden Ales",
    price: 48.9,
    priceUsd: 1.35,
    totalStock: 210,
    shelfStock: 40,
    inMagazine: true,
    active: true,
  },
  {
    sku: "CERV-005",
    name: "Cerveza Pilsner Tradicional",
    category: "Pilsner",
    supplier: "Cervecería Nacional",
    price: 42.75,
    priceUsd: 1.18,
    totalStock: 320,
    shelfStock: 60,
    inMagazine: false,
    active: true,
  },
  {
    sku: "CERV-006",
    name: "Cerveza Wheat Beer",
    category: "Wheat",
    supplier: "Wheat Masters",
    price: 49.5,
    priceUsd: 1.37,
    totalStock: 85,
    shelfStock: 18,
    inMagazine: true,
    active: true,
  },
  {
    sku: "CERV-007",
    name: "Cerveza Porter Especial",
    category: "Porter",
    supplier: "Dark Brews Inc.",
    price: 54.25,
    priceUsd: 1.50,
    totalStock: 75,
    shelfStock: 12,
    inMagazine: false,
    active: true,
  },
  {
    sku: "CERV-008",
    name: "Cerveza Amber Ale",
    category: "Ale",
    supplier: "Golden Ales",
    price: 51.75,
    priceUsd: 1.43,
    totalStock: 165,
    shelfStock: 35,
    inMagazine: true,
    active: true,
  },
  {
    sku: "CERV-009",
    name: "Cerveza Bock Fuerte",
    category: "Bock",
    supplier: "Strong Brews",
    price: 62.5,
    priceUsd: 1.73,
    totalStock: 110,
    shelfStock: 25,
    inMagazine: false,
    active: true,
  },
  {
    sku: "CERV-010",
    name: "Cerveza Pale Ale Artesanal",
    category: "Pale Ale",
    supplier: "Craft Beers Co.",
    price: 56.8,
    priceUsd: 1.57,
    totalStock: 135,
    shelfStock: 28,
    inMagazine: true,
    active: true,
  },
]

