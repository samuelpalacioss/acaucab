"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface DiarioProduct {
  sku: string
  name: string
  category: string
  price: number
  discount: number
  stock: number
}

interface ProductSelectorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (products: DiarioProduct[]) => void
  selectedProducts: DiarioProduct[]
}

export function ProductSelectorModal({ open, onOpenChange, onConfirm, selectedProducts }: ProductSelectorModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [tempSelectedProducts, setTempSelectedProducts] = useState<DiarioProduct[]>([])
  const [availableProducts, setAvailableProducts] = useState<DiarioProduct[]>([])

  // Inicializar productos seleccionados temporalmente cuando se abre el modal
  useEffect(() => {
    if (open) {
      setTempSelectedProducts([...selectedProducts])
    }
  }, [open, selectedProducts])

  // Simular carga de productos disponibles
  useEffect(() => {
    // En un caso real, esto vendría de una API
    setAvailableProducts(mockProducts)
  }, [])

  const handleToggleProduct = (product: DiarioProduct) => {
    const isSelected = tempSelectedProducts.some((p) => p.sku === product.sku)

    if (isSelected) {
      setTempSelectedProducts(tempSelectedProducts.filter((p) => p.sku !== product.sku))
    } else {
      setTempSelectedProducts([...tempSelectedProducts, { ...product, discount: 0 }])
    }
  }

  const handleConfirm = () => {
    onConfirm(tempSelectedProducts)
  }

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = availableProducts.filter((product) => {
    const matchesSearch =
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Seleccionar Productos</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por SKU o nombre..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="Lager">Lager</SelectItem>
                <SelectItem value="IPA">IPA</SelectItem>
                <SelectItem value="Stout">Stout</SelectItem>
                <SelectItem value="Ale">Ale</SelectItem>
                <SelectItem value="Pilsner">Pilsner</SelectItem>
                <SelectItem value="Wheat">Wheat</SelectItem>
                <SelectItem value="Porter">Porter</SelectItem>
                <SelectItem value="Bock">Bock</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="ml-4">
            <Badge variant="outline">{tempSelectedProducts.length} productos seleccionados</Badge>
          </div>
        </div>

        <div className="border rounded-md max-h-[400px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <span className="sr-only">Seleccionar</span>
                </TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                const isSelected = tempSelectedProducts.some((p) => p.sku === product.sku)
                return (
                  <TableRow key={product.sku}>
                    <TableCell>
                      <Checkbox checked={isSelected} onCheckedChange={() => handleToggleProduct(product)} />
                    </TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>Bs. {product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-3 w-3 rounded-full ${product.stock < 100 ? "bg-gray-400" : "bg-gray-200"}`}
                        ></div>
                        <span>{product.stock}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredProducts.length} de {availableProducts.length} productos
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={handleConfirm}>
                <Check className="h-4 w-4 mr-2" />
                Confirmar selección
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Datos de ejemplo para productos
const mockProducts: DiarioProduct[] = [
  {
    sku: "CERV-001",
    name: "Cerveza Premium Lager",
    category: "Lager",
    price: 45.5,
    discount: 0,
    stock: 245,
  },
  {
    sku: "CERV-002",
    name: "Cerveza IPA Especial",
    category: "IPA",
    price: 58.75,
    discount: 0,
    stock: 180,
  },
  {
    sku: "CERV-003",
    name: "Cerveza Stout Oscura",
    category: "Stout",
    price: 52.25,
    discount: 0,
    stock: 95,
  },
  {
    sku: "CERV-004",
    name: "Cerveza Ale Rubia",
    category: "Ale",
    price: 48.9,
    discount: 0,
    stock: 210,
  },
  {
    sku: "CERV-005",
    name: "Cerveza Pilsner Tradicional",
    category: "Pilsner",
    price: 42.75,
    discount: 0,
    stock: 320,
  },
  {
    sku: "CERV-006",
    name: "Cerveza Wheat Beer",
    category: "Wheat",
    price: 49.5,
    discount: 0,
    stock: 85,
  },
  {
    sku: "CERV-007",
    name: "Cerveza Porter Especial",
    category: "Porter",
    price: 54.25,
    discount: 0,
    stock: 75,
  },
  {
    sku: "CERV-008",
    name: "Cerveza Amber Ale",
    category: "Ale",
    price: 51.75,
    discount: 0,
    stock: 165,
  },
  {
    sku: "CERV-009",
    name: "Cerveza Bock Fuerte",
    category: "Bock",
    price: 62.5,
    discount: 0,
    stock: 110,
  },
  {
    sku: "CERV-010",
    name: "Cerveza Pale Ale Artesanal",
    category: "Pale Ale",
    price: 56.8,
    discount: 0,
    stock: 135,
  },
  {
    sku: "CERV-011",
    name: "Cerveza Tipo A",
    category: "Lager",
    price: 45.0,
    discount: 0,
    stock: 45,
  },
  {
    sku: "CERV-012",
    name: "Cerveza Tipo B",
    category: "IPA",
    price: 55.0,
    discount: 0,
    stock: 78,
  },
  {
    sku: "CERV-013",
    name: "Cerveza Tipo C",
    category: "Ale",
    price: 50.0,
    discount: 0,
    stock: 23,
  },
  {
    sku: "CERV-015",
    name: "Cerveza Brown Ale",
    category: "Ale",
    price: 53.0,
    discount: 0,
    stock: 18,
  },
  {
    sku: "CERV-016",
    name: "Cerveza Red Ale",
    category: "Ale",
    price: 54.0,
    discount: 0,
    stock: 24,
  },
]
