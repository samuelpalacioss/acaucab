"use client"

import { useState, useEffect  } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { EventoMiembro, EventoProducto } from "@/models/evento"
import { llamarFuncion } from "@/lib/server-actions";

interface ProviderProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (providers: EventoMiembro[]) => void
  selectedProviders: EventoMiembro[]
}

export function ProviderProductModal({ open, onOpenChange, onConfirm, selectedProviders }: ProviderProductModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [tempSelected, setTempSelected] = useState<EventoMiembro[]>(selectedProviders)
  const [selectedProviderId, setSelectedProviderId] = useState<{ id1: number, id2: string } | null>(null)
  const [miembrosData, setMiembrosData] = useState<EventoMiembro[]>([])
  const [productosData, setProductosData] = useState<EventoProducto[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const miembros = await llamarFuncion<EventoMiembro>("fn_get_miembros_creando_evento")
        const productos = await llamarFuncion<EventoProducto>("fn_get_productos_creando_evento")
        setMiembrosData(miembros)
        setProductosData(productos)
      } catch (error: any) {
        console.error("❌ Error al obtener datos de proveedores y productos:", error.message)
      }
    }
    if (open) fetchData()
  }, [open])

  const filteredProviders = miembrosData.filter(
    (provider) =>
      provider.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.correo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleToggleProvider = (provider: EventoMiembro) => {
    const isSelected = tempSelected.some((p) => p.id1 === provider.id1 && p.id2 === provider.id2)
    if (isSelected) {
      setTempSelected(tempSelected.filter((p) => !(p.id1 === provider.id1 && p.id2 === provider.id2)))
    } else {
      setTempSelected([...tempSelected, { ...provider, productos: [] }])
    }
  }

  const handleSelectProducts = (providerId1: number, providerId2: string) => {
    setSelectedProviderId({ id1: providerId1, id2: providerId2 })
  }

  const handleProductSelection = (providerId1: number, providerId2: string, product: EventoProducto) => {
    setTempSelected(
      tempSelected.map((provider) => {
        if (provider.id1 === providerId1 && provider.id2 === providerId2) {
          const isProductSelected = provider.productos.some(
            (p) => p.id1 === product.id1 && p.id2 === product.id2
          )
          if (isProductSelected) {
            // Quitar producto
            return {
              ...provider,
              productos: provider.productos.filter(
                (p) => !(p.id1 === product.id1 && p.id2 === product.id2)
              ),
            }
          } else {
            // Agregar producto con cantidad 0
            return {
              ...provider,
              productos: [
                ...provider.productos,
                { ...product, cantidad: 0 },
              ],
            }
          }
        }
        return provider
      }),
    )
  }

  const handleConfirm = () => {
    onConfirm(tempSelected)
  }

  const getProviderProducts = (providerId1: number, providerId2: string) => {
    return productosData.filter(
      (prod) => prod.id_miembro1 === providerId1 && prod.id_miembro2 === providerId2
    )
  }

  const isProviderSelected = (providerId1: number, providerId2: string) => {
    return tempSelected.some((p) => p.id1 === providerId1 && p.id2 === providerId2)
  }

  const isProductSelected = (providerId1: number, providerId2: string, productId1: number, productId2: string) => {
    const provider = tempSelected.find((p) => p.id1 === providerId1 && p.id2 === providerId2)
    return (
      provider?.productos.some(
        (prod) => prod.id1 === productId1 && String(prod.id2) === String(productId2)
      ) || false
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Seleccionar Proveedores y Productos</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar proveedores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Lista de proveedores */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Proveedores disponibles</h3>
              <div className="border rounded-md max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Seleccionar</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Productos</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProviders.map((provider) => (
                      <TableRow key={`${provider.id1}-${provider.id2}`}>
                        <TableCell>
                          <Checkbox
                            checked={isProviderSelected(provider.id1, provider.id2)}
                            onCheckedChange={() => handleToggleProvider(provider)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{provider.nombre}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {tempSelected.find((p) => p.id1 === provider.id1 && p.id2 === provider.id2)?.productos.length || 0} seleccionados
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSelectProducts(provider.id1, provider.id2)}
                            disabled={!isProviderSelected(provider.id1, provider.id2)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Productos
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Lista de productos del proveedor seleccionado */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Productos{" "}
                {selectedProviderId
                  ? `de ${filteredProviders.find(
                      (p) => p.id1 === selectedProviderId.id1 && p.id2 === selectedProviderId.id2
                    )?.nombre ?? ""}`
                  : ""}
              </h3>
              {selectedProviderId ? (
                <div className="border rounded-md max-h-96 overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Seleccionar</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getProviderProducts(selectedProviderId.id1, selectedProviderId.id2).map((product) => (
                        <TableRow key={`${product.id1}-${product.id2}`}>
                          <TableCell>
                            <Checkbox
                              checked={isProductSelected(
                                selectedProviderId.id1,
                                selectedProviderId.id2,
                                product.id1,
                                String(product.id2)
                              )}
                              onCheckedChange={() =>
                                handleProductSelection(
                                  selectedProviderId.id1,
                                  selectedProviderId.id2,
                                  product
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>{product.sku}</TableCell>
                          <TableCell className="font-medium">{product.nombre}</TableCell>
                          <TableCell>Bs. {product.precio?.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="border rounded-md p-8 text-center text-muted-foreground">
                  Selecciona un proveedor para ver sus productos
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {tempSelected.length} proveedores seleccionados |{" "}
              {tempSelected.reduce((acc, p) => acc + (p.productos?.length || 0), 0)} productos
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={handleConfirm}>Confirmar Selección</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}