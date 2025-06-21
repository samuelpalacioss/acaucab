"use client"

// NOTA: Este wireframe sigue la misma estructura que la página de 'editar producto'
// NOTE: This wireframe follows the same structure as the 'edit product' page
// La funcionalidad y el diseño son idénticos, solo cambian los datos mostrados
// The functionality and design are identical, only the displayed data changes

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Trash2, ImageIcon, FileText, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function EditProduct({ params }: { params: { sku: string } }) {
  const { sku } = params
  const [isLoading, setIsLoading] = useState(false)

  // Lista de proveedores disponibles
  // List of available suppliers
  const providers = [
    { id: "cn", name: "Cervecería Nacional" },
    { id: "cbc", name: "Craft Beers Co." },
    { id: "dbi", name: "Dark Brews Inc." },
    { id: "ga", name: "Golden Ales" },
    { id: "wm", name: "Wheat Masters" },
    { id: "sb", name: "Strong Brews" },
    { id: "pb", name: "Premium Brews" },
    { id: "ib", name: "Imperial Brewery" },
    { id: "ab", name: "Artisan Brews" },
    { id: "mb", name: "Micro Brewery" }
  ]

  // Lista de secciones disponibles
  // List of available sections
  const sections = [
    { id: "lager", name: "Cervezas Lager" },
    { id: "ipa", name: "Cervezas IPA" },
    { id: "stout", name: "Cervezas Stout" },
    { id: "ale", name: "Cervezas Ale" },
    { id: "pilsner", name: "Cervezas Pilsner" },
    { id: "wheat", name: "Cervezas Wheat" },
    { id: "porter", name: "Cervezas Porter" },
    { id: "bock", name: "Cervezas Bock" },
    { id: "imported", name: "Cervezas Importadas" },
    { id: "craft", name: "Cervezas Artesanales" }
  ]

  // En un caso real, cargaríamos los datos del producto basado en el SKU
  // Aquí usamos datos de ejemplo
  const product = {
    sku: sku,
    name: "Cerveza Premium Lager",
    category: "Lager",
    supplier: "Cervecería Nacional",
    price: 88.2,
    priceUsd: 1.56,
    totalStock: 245,
    shelfStock: 100,
    warehouseStock: 145,
    inMagazine: true,
    active: true,
    description: "Cerveza premium tipo lager con un sabor suave y refrescante. Ideal para ocasiones especiales.",
    alcoholContent: "4.5%",
    volume: "355ml",
    container: "Botella",
    origin: "Venezuela",
    features: ["Premium", "Importada"],
    // Nuevos atributos de cerveza
    // New beer attributes
    initialDensity: "1.050",
    finalDensity: "1.012",
    color: "Dorado",
    ibu: "20",
    grainType: "Pilsen"
  }

  // Lista de tipos de grano disponibles
  // List of available grain types
  const grainTypes = [
    { id: "pilsen", name: "Pilsen" },
    { id: "pale", name: "Pale Ale" },
    { id: "vienna", name: "Vienna" },
    { id: "munich", name: "Munich" },
    { id: "caramel", name: "Caramel" },
    { id: "chocolate", name: "Chocolate" },
    { id: "roasted", name: "Roasted" },
    { id: "wheat", name: "Wheat" },
    { id: "rye", name: "Rye" },
    { id: "oat", name: "Oat" }
  ]

  // Lista de colores disponibles
  // List of available colors
  const colors = [
    { id: "dorado", name: "Dorado" },
    { id: "ambar", name: "Ámbar" },
    { id: "cobre", name: "Cobre" },
    { id: "marrón", name: "Marrón" },
    { id: "negro", name: "Negro" },
    { id: "rubí", name: "Rubí" },
    { id: "oro", name: "Oro" },
    { id: "blanco", name: "Blanco" }
  ]

  const handleSave = () => {
    setIsLoading(true)
    // Simular guardado
    setTimeout(() => {
      setIsLoading(false)
      // Redirigir o mostrar mensaje de éxito
    }, 1000)
  }

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/productos/catalogo">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Editar Producto</h1>
          <div className="text-sm text-muted-foreground ml-2">Artículo: {sku} - {product.name}</div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
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
                  <Label htmlFor="sku">SKU / Código</Label>
                  <Input id="sku" defaultValue={product.sku} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre de la cerveza</Label>
                  <Input id="name" defaultValue={product.name} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Estilo / Categoría</Label>
                  <Select defaultValue={product.category}>
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
                  <Label htmlFor="supplier">Proveedor</Label>
                  <Select defaultValue={product.supplier}>
                    <SelectTrigger id="supplier">
                      <SelectValue placeholder="Seleccionar proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {providers.map((provider) => (
                        <SelectItem key={provider.id} value={provider.name}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" defaultValue={product.description} rows={4} />
              </div>

              <div className="flex items-center justify-between">
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Inventario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalStock">Stock Total</Label>
                  <Input id="totalStock" type="number" defaultValue={product.totalStock} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minStock">Stock Mínimo</Label>
                  <Input className="bg-gray-200" id="minStock" type="number" defaultValue="100" readOnly />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 ">
                <div className="space-y-2">
                    <Label htmlFor="shelfStock">Stock en Anaquel</Label>
                    <Input id="shelfStock" type="number" defaultValue={product.shelfStock} />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="warehouseStock">Stock en Almacén</Label>
                    <Input id="warehouseStock" type="number" defaultValue={product.warehouseStock} />
                    </div>
              </div>

              <div className="space-y-2">
                <Label className="text-md font-semibold">Ubicación en Tienda</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="section">Sección</Label>
                    <Select defaultValue="Cervezas Lager">
                      <SelectTrigger id="section">
                        <SelectValue placeholder="Seleccionar sección" />
                      </SelectTrigger>
                      <SelectContent>
                        {sections.map((section) => (
                          <SelectItem key={section.id} value={section.name}>
                            {section.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aisle">Pasillo</Label>
                    <Input id="aisle" defaultValue="3" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shelf">Estante</Label>
                    <Input id="shelf" defaultValue="B" />
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
                  <Label htmlFor="price">Precio de Venta (Bs)</Label>
                  <Input id="price" type="number" step="0.01" defaultValue={product.price} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceUsd">Precio de Venta (USD)</Label>
                  <Input className="bg-gray-200" id="priceUsd" type="number" step="0.01" defaultValue={product.priceUsd} readOnly />
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
                  <Label htmlFor="alcoholContent">Contenido de Alcohol</Label>
                  <Input id="alcoholContent" defaultValue={product.alcoholContent} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volume">Volumen</Label>
                  <Input id="volume" defaultValue={product.volume} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="container">Tipo de Envase</Label>
                  <Select defaultValue={product.container}>
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

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="initialDensity">Densidad Inicial</Label>
                  <Input id="initialDensity" type="number" step="0.001" defaultValue={product.initialDensity} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="finalDensity">Densidad Final</Label>
                  <Input id="finalDensity" type="number" step="0.001" defaultValue={product.finalDensity} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ibu">IBUs</Label>
                  <Input id="ibu" type="number" defaultValue={product.ibu} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Select defaultValue={product.color}>
                    <SelectTrigger id="color">
                      <SelectValue placeholder="Seleccionar color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.name}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grainType">Tipo de Grano</Label>
                  <Select defaultValue={product.grainType}>
                    <SelectTrigger id="grainType">
                      <SelectValue placeholder="Seleccionar tipo de grano" />
                    </SelectTrigger>
                    <SelectContent>
                      {grainTypes.map((grain) => (
                        <SelectItem key={grain.id} value={grain.name}>
                          {grain.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <span className="text-sm text-muted-foreground">Imagen Principal</span>
                  <Button variant="outline" size="sm" className="mt-2">
                    Subir Imagen
                  </Button>
                </div>
                <div className="border rounded-md p-4 flex flex-col items-center justify-center text-center">
                  <div className="h-32 w-32 border-2 border-dashed rounded-md flex items-center justify-center mb-2">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">Imagen Adicional</span>
                  <Button variant="outline" size="sm" className="mt-2">
                    Subir Imagen
                  </Button>
                </div>
                <div className="border rounded-md p-4 flex flex-col items-center justify-center text-center">
                  <div className="h-32 w-32 border-2 border-dashed rounded-md flex items-center justify-center mb-2">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">Imagen Adicional</span>
                  <Button variant="outline" size="sm" className="mt-2">
                    Subir Imagen
                  </Button>
                </div>
                <div className="border rounded-md p-4 flex flex-col items-center justify-center text-center">
                  <div className="h-32 w-32 border-2 border-dashed rounded-md flex items-center justify-center mb-2">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">Imagen Adicional</span>
                  <Button variant="outline" size="sm" className="mt-2">
                    Subir Imagen
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Documentos</Label>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Ficha técnica.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    Subir Documento
                  </Button>
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
        <Button 
          onClick={handleSave}
          disabled={isLoading}
        >
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
    </div>
  )
}
