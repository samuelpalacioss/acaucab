import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

// Componente para filtrar productos del catálogo
// Component to filter catalog products
export default function ProductFiltersDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filtros de Productos</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todas las categorías" />
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
          <div className="space-y-2">
            <Label>Proveedor</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todos los proveedores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los proveedores</SelectItem>
                <SelectItem value="cerveceria-nacional">Cervecería Nacional</SelectItem>
                <SelectItem value="craft-beers">Craft Beers Co.</SelectItem>
                <SelectItem value="dark-brews">Dark Brews Inc.</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="stock" />
            <Label htmlFor="stock">Solo productos con stock bajo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="active" />
            <Label htmlFor="active">Solo productos activos</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Aplicar Filtros
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 