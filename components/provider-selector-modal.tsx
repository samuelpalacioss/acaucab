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

interface EventProvider {
  id: number
  name: string
  contact: string
  role?: string
}

interface ProviderSelectorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (providers: EventProvider[]) => void
  selectedProviders: EventProvider[]
}

export function ProviderSelectorModal({
  open,
  onOpenChange,
  onConfirm,
  selectedProviders,
}: ProviderSelectorModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [tempSelectedProviders, setTempSelectedProviders] = useState<EventProvider[]>([])
  const [availableProviders, setAvailableProviders] = useState<EventProvider[]>([])

  // Inicializar proveedores seleccionados temporalmente cuando se abre el modal
  useEffect(() => {
    if (open) {
      setTempSelectedProviders([...selectedProviders])
    }
  }, [open, selectedProviders])

  // Simular carga de proveedores disponibles
  useEffect(() => {
    // En un caso real, esto vendría de una API
    setAvailableProviders(mockProviders)
  }, [])

  const handleToggleProvider = (provider: EventProvider) => {
    const isSelected = tempSelectedProviders.some((p) => p.id === provider.id)

    if (isSelected) {
      setTempSelectedProviders(tempSelectedProviders.filter((p) => p.id !== provider.id))
    } else {
      setTempSelectedProviders([...tempSelectedProviders, { ...provider }])
    }
  }

  const handleConfirm = () => {
    onConfirm(tempSelectedProviders)
  }

  // Filtrar proveedores según búsqueda y categoría
  const filteredProviders = availableProviders.filter((provider) => {
    const matchesSearch =
      provider.id.toString().includes(searchTerm.toLowerCase()) ||
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.contact.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" 

    return matchesSearch && matchesCategory
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Seleccionar Proveedores</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID, nombre o contacto..."
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
                <SelectItem value="cerveceria">Cervecería</SelectItem>
                <SelectItem value="distribuidor">Distribuidor</SelectItem>
                <SelectItem value="insumos">Insumos</SelectItem>
                <SelectItem value="servicios">Servicios</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="ml-4">
            <Badge variant="outline">{tempSelectedProviders.length} proveedores seleccionados</Badge>
          </div>
        </div>

        <div className="border rounded-md max-h-[400px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <span className="sr-only">Seleccionar</span>
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Contacto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProviders.map((provider) => {
                const isSelected = tempSelectedProviders.some((p) => p.id === provider.id)
                return (
                  <TableRow key={provider.id}>
                    <TableCell>
                      <Checkbox checked={isSelected} onCheckedChange={() => handleToggleProvider(provider)} />
                    </TableCell>
                    <TableCell>{provider.id}</TableCell>
                    <TableCell className="font-medium">{provider.name}</TableCell>
                    <TableCell>{provider.contact}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredProviders.length} de {availableProviders.length} proveedores
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
// Datos de ejemplo para proveedores
const mockProviders = [
  {
    id: 1001,
    name: "Cervecería Nacional",
    category: "cerveceria",
    contact: "contacto@cervecerianacional.com",
  },
  {
    id: 1002,
    name: "Craft Beers Co.",
    category: "cerveceria",
    contact: "info@craftbeers.com",
  },
  {
    id: 1003,
    name: "Dark Brews Inc.",
    category: "cerveceria",
    contact: "ventas@darkbrews.com",
  },
  {
    id: 1004,
    name: "Golden Ales",
    category: "cerveceria",
    contact: "info@goldenales.com",
  },
  {
    id: 1005,
    name: "Wheat Masters",
    category: "cerveceria",
    contact: "contacto@wheatmasters.com",
  },
  {
    id: 1006,
    name: "Strong Brews",
    category: "cerveceria",
    contact: "info@strongbrews.com",
  },
  {
    id: 1007,
    name: "Distribuidora Central",
    category: "distribuidor",
    contact: "ventas@distribuidoracentral.com",
  },
  {
    id: 1008,
    name: "Logística Cervecera",
    category: "distribuidor",
    contact: "info@logisticacervecera.com",
  },
  {
    id: 1009,
    name: "Insumos Premium",
    category: "insumos",
    contact: "ventas@insumospremium.com",
  },
  {
    id: 1010,
    name: "Envases y Empaques",
    category: "insumos",
    contact: "info@envasesyempaques.com",
  },
  {
    id: 1011,
    name: "Servicios de Catering",
    category: "servicios",
    contact: "reservas@cateringpremium.com",
  },
  {
    id: 1012,
    name: "Montaje de Eventos",
    category: "servicios",
    contact: "info@montajeeventos.com",
  },
]

