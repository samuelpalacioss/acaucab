"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, ImageIcon, FileText, Plus, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NewProduct() {
  const [isLoading, setIsLoading] = useState(false)
  const [skuError, setSkuError] = useState<string | null>(null)

  const handleSave = () => {
    setIsLoading(true)
    // Simular validación y guardado
    setTimeout(() => {
      setIsLoading(false)
      // Redirigir o mostrar mensaje de éxito
    }, 1000)
  }

  const validateSku = (value: string) => {
    if (!value) {
      setSkuError("El SKU es obligatorio")
      return
    }

    if (!/^[A-Z]+-\d{3}$/.test(value)) {
      setSkuError("El formato debe ser XXXX-000")
      return
    }

    setSkuError(null)
  }

  return (
    <div className="space-y-4">
        <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Este wireframe sigue la misma estructura que la página de 'editar producto'. La funcionalidad y el diseño son idénticos, solo cambian los datos mostrados.
        </AlertDescription>
      </Alert>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/productos/catalogo">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Nuevo Producto</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/productos/catalogo">Cancelar</Link>
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="inventory">Inventario</TabsTrigger>
          <TabsTrigger value="pricing">Precios</TabsTrigger>
          <TabsTrigger value="attributes">Atributos</TabsTrigger>
          <TabsTrigger value="images">Imágenes</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU / Código *</Label>
                  <Input id="sku" placeholder="Ej: CERV-001" onChange={(e) => validateSku(e.target.value)} />
                  {skuError && <p className="text-xs text-red-500">{skuError}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre de la cerveza *</Label>
                  <Input id="name" placeholder="Ej: Cerveza Premium Lager" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Estilo / Categoría *</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">Proveedor *</Label>
                  <Select>
                    <SelectTrigger id="supplier">
                      <SelectValue placeholder="Seleccionar proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cervecería Nacional">Cervecería Nacional</SelectItem>
                      <SelectItem value="Craft Beers Co.">Craft Beers Co.</SelectItem>
                      <SelectItem value="Dark Brews Inc.">Dark Brews Inc.</SelectItem>
                      <SelectItem value="Golden Ales">Golden Ales</SelectItem>
                      <SelectItem value="Wheat Masters">Wheat Masters</SelectItem>
                      <SelectItem value="Strong Brews">Strong Brews</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" placeholder="Descripción detallada del producto..." rows={4} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch id="active" defaultChecked />
                  <Label htmlFor="active">Producto activo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="magazine" />
                  <Label htmlFor="magazine">Incluir en revista</Label>
                </div>
              </div>

              <Alert>
                <AlertDescription>Los campos marcados con * son obligatorios.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Inventario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalStock">Stock Total *</Label>
                  <Input className="bg-gray-300" id="totalStock" type="number" placeholder="0" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shelfStock">Stock en Anaquel</Label>
                  <Input id="shelfStock" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warehouseStock">Stock en Almacén</Label>
                  <Input id="warehouseStock" type="number" placeholder="0" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minStock">Stock Mínimo</Label>
                  <Input id="minStock" type="number" placeholder="50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reorderPoint">Punto de Reorden</Label>
                  <Input id="reorderPoint" type="number" placeholder="100" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ubicación en Tienda</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="section">Sección</Label>
                    <Input id="section" placeholder="Ej: Cervezas Importadas" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aisle">Pasillo</Label>
                    <Input id="aisle" placeholder="Ej: 3" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shelf">Estante</Label>
                    <Input id="shelf" placeholder="Ej: B" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información de Precios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio de Venta (Bs) *</Label>
                  <Input id="price" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceUsd">Precio de Venta (USD) *</Label>
                  <Input id="priceUsd" type="number" step="0.01" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="costPrice">Precio de Costo (Bs)</Label>
                  <Input id="costPrice" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="margin">Margen (%)</Label>
                  <Input id="margin" type="number" step="0.01" placeholder="40" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Promociones</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discountPrice">Precio Promocional (Bs)</Label>
                    <Input id="discountPrice" type="number" step="0.01" placeholder="Opcional" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discountEnd">Fecha Fin Promoción</Label>
                    <Input id="discountEnd" type="date" placeholder="Opcional" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attributes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Atributos del Producto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alcoholContent">Contenido de Alcohol *</Label>
                  <Input id="alcoholContent" placeholder="Ej: 4.5%" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volume">Volumen *</Label>
                  <Input id="volume" placeholder="Ej: 355ml" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="container">Tipo de Envase *</Label>
                  <Select>
                    <SelectTrigger id="container">
                      <SelectValue placeholder="Seleccionar envase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Botella">Botella</SelectItem>
                      <SelectItem value="Lata">Lata</SelectItem>
                      <SelectItem value="Barril">Barril</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">País de Origen</Label>
                  <Input id="origin" placeholder="Ej: Venezuela" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Input id="brand" placeholder="Ej: Premium Brews" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Características</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="imported" />
                    <label
                      htmlFor="imported"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Importada
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="craft" />
                    <label
                      htmlFor="craft"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Artesanal
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="premium" />
                    <label
                      htmlFor="premium"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Premium
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="limited" />
                    <label
                      htmlFor="limited"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Edición Limitada
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="seasonal" />
                    <label
                      htmlFor="seasonal"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Estacional
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="promotion" />
                    <label
                      htmlFor="promotion"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      En Promoción
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Imágenes del Producto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="border rounded-md p-4 flex flex-col items-center justify-center text-center">
                  <div className="h-32 w-32 border-2 border-dashed rounded-md flex items-center justify-center mb-2">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">Imagen Principal *</span>
                  <Button variant="outline" size="sm" className="mt-2">
                    Subir Imagen
                  </Button>
                </div>
                <div className="border rounded-md p-4 flex flex-col items-center justify-center text-center">
                  <div className="h-32 w-32 border-2 border-dashed rounded-md flex items-center justify-center mb-2">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">Imagen Adicional</span>
                  <Button variant="outline" size="sm" className="mt-2">
                    Subir Imagen
                  </Button>
                </div>
                <div className="border rounded-md p-4 flex flex-col items-center justify-center text-center">
                  <div className="h-32 w-32 border-2 border-dashed rounded-md flex items-center justify-center mb-2">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">Imagen Adicional</span>
                  <Button variant="outline" size="sm" className="mt-2">
                    Subir Imagen
                  </Button>
                </div>
                <div className="border rounded-md p-4 flex flex-col items-center justify-center text-center">
                  <div className="h-32 w-32 border-2 border-dashed rounded-md flex items-center justify-center mb-2">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">Imagen Adicional</span>
                  <Button variant="outline" size="sm" className="mt-2">
                    Subir Imagen
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ficha Técnica</Label>
                <div className="border rounded-md p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between border-dashed border-2 rounded-md p-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-muted-foreground">Ningún archivo seleccionado</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Subir Ficha Técnica
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href="/productos/catalogo">Cancelar</Link>
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Guardando..." : "Guardar Producto"}
        </Button>
      </div>
    </div>
  )
}
