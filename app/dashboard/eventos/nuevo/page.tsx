"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Calendar, Clock, Plus, Trash2, FileText, ImageIcon, Eye, AlertTriangle, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ProviderSelectorModal } from "@/components/provider-selector-modal"
import { ProductSelectorModal } from "@/components/product-selector-modal"

interface DiarioProduct {
  sku: string;
  name: string;
  price: number;
  category: string;
  discount: number;
  stock: number;
}

interface EventProvider {
  id: number
  name: string
  contact: string
  role?: string
}

interface EventProduct {
  sku: string
  name: string
  price: number
  eventPrice: number
  quantity: number
}

interface TallerPonencia {
  id: string
  type: 'taller' | 'ponencia'
  title: string
  description: string
  providerId: number
  date: string
  time: string
  duration: number // Duración en minutos
}

export default function NewEventPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [nameError, setNameError] = useState<string | null>(null)
  const [eventName, setEventName] = useState("")
  const [eventType, setEventType] = useState("")
  const [startDate, setStartDate] = useState<string>(getTodayDate())
  const [endDate, setEndDate] = useState<string>(getTodayDate())
  const [startTime, setStartTime] = useState("17:00")
  const [endTime, setEndTime] = useState("22:00")
  const [venue, setVenue] = useState("")
  const [capacity, setCapacity] = useState<number>(100)
  const [hasTickets, setHasTickets] = useState(true)
  const [isProviderSelectorOpen, setIsProviderSelectorOpen] = useState(false)
  const [isProductSelectorOpen, setIsProductSelectorOpen] = useState(false)
  const [selectedProviders, setSelectedProviders] = useState<EventProvider[]>([])
  const [selectedProducts, setSelectedProducts] = useState<EventProduct[]>([])
  const [ticket, setTicket] = useState({
    name: "General",
    price: 50,
    quota: 100,
    currency: "Bs"
  })
  const [currency, setCurrency] = useState("Bs")
  const [commissionPercentage, setCommissionPercentage] = useState(5)
  const [budget, setBudget] = useState<number>(5000)
  const [hasTalleresPonencias, setHasTalleresPonencias] = useState(false)
  const [talleresPonencias, setTalleresPonencias] = useState<TallerPonencia[]>([])

  function getTodayDate() {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEventName(value)
    if (value.length > 100) {
      setNameError("El nombre no puede exceder los 100 caracteres")
    } else {
      setNameError(null)
    }
  }

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setStartDate(value)
    
    // Si la fecha de fin es anterior a la nueva fecha de inicio, actualizar la fecha de fin
    if (new Date(endDate) < new Date(value)) {
      setEndDate(value)
    }
  }

  const handleProviderSelection = (providers: EventProvider[]) => {
    setSelectedProviders(providers)
    setIsProviderSelectorOpen(false)
  }

  const handleProductSelection = (diarioProducts: DiarioProduct[]) => {
    // Convert DiarioProduct[] to EventProduct[]
    const eventProducts = diarioProducts.map(dp => ({
      sku: dp.sku,
      name: dp.name,
      price: dp.price,
      eventPrice: dp.price, // Default event price to base price
      quantity: dp.stock || 1 // Use stock as initial quantity or default to 1
    }));
    
    setSelectedProducts(eventProducts);
    setIsProductSelectorOpen(false);
  }

  const mapToDiarioProducts = (products: EventProduct[]): DiarioProduct[] => {
    return products.map(ep => ({
      sku: ep.sku,
      name: ep.name,
      price: ep.price,
      category: "Evento", // Default category
      discount: 0, // Default discount
      stock: ep.quantity // Use quantity as stock
    }));
  };

  const removeProvider = (id: number) => {
    setSelectedProviders(selectedProviders.filter(provider => provider.id !== id))
  }

  const removeProduct = (sku: string) => {
    setSelectedProducts(selectedProducts.filter(product => product.sku !== sku))
  }

  const updateProviderRole = (id: number, role: string) => {
    setSelectedProviders(
      selectedProviders.map(provider => 
        provider.id === id ? { ...provider, role } : provider
      )
    )
  }

  const updateProductQuantity = (sku: string, quantity: number) => {
    setSelectedProducts(
      selectedProducts.map(product => 
        product.sku === sku ? { ...product, quantity } : product
      )
    )
  }

  const updateProductPrice = (sku: string, eventPrice: number) => {
    setSelectedProducts(products => 
      products.map(p => p.sku === sku ? {...p, eventPrice} : p)
    )
  }

  const updateTicket = (field: string, value: string | number) => {
    setTicket({
      ...ticket,
      [field]: value
    });
  };

  const calculateTotalStock = () => {
    return selectedProducts.reduce((total, product) => total + product.quantity, 0)
  }

  const calculateTotalTickets = () => {
    return ticket.quota;
  }

  const calculateTotalTicketRevenue = () => {
    return ticket.price * ticket.quota;
  }

  const handleSave = () => {
    setIsLoading(true)
    // Simular guardado
    setTimeout(() => {
      setIsLoading(false)
      // Redirigir o mostrar mensaje de éxito
    }, 1000)
  }

  const isFormValid = () => {
    return (
      eventName.trim() !== "" && 
      eventType !== "" && 
      startDate !== "" && 
      endDate !== "" && 
      startTime !== "" && 
      endTime !== "" && 
      venue.trim() !== "" && 
      selectedProviders.length > 0 && 
      (!hasTickets || ticket.quota > 0)
    )
  }

  const addTallerPonencia = () => {
    const newTallerPonencia: TallerPonencia = {
      id: Date.now().toString(),
      type: 'taller',
      title: '',
      description: '',
      providerId: selectedProviders[0]?.id || 0,
      date: startDate,
      time: '09:00',
      duration: 60 // Duración por defecto de 1 hora
    }
    setTalleresPonencias([...talleresPonencias, newTallerPonencia])
  }

  const removeTallerPonencia = (id: string) => {
    setTalleresPonencias(talleresPonencias.filter(tp => tp.id !== id))
  }

  const updateTallerPonencia = (id: string, field: keyof TallerPonencia, value: any) => {
    setTalleresPonencias(talleresPonencias.map(tp => 
      tp.id === id ? {...tp, [field]: value} : tp
    ))
  }

  const isDateInEventRange = (date: string) => {
    const eventStart = new Date(startDate)
    const eventEnd = new Date(endDate)
    const checkDate = new Date(date)
    return checkDate >= eventStart && checkDate <= eventEnd
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/eventos/gestion">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Nuevo Evento</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/eventos/gestion">Cancelar</Link>
          </Button>
          <Button onClick={handleSave} disabled={isLoading || !isFormValid()}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic">
        <TabsList className="mb-4">
          <TabsTrigger value="basic">Información Básica</TabsTrigger>
          <TabsTrigger value="calendar">Calendario y Locación</TabsTrigger>
          <TabsTrigger value="providers">Proveedores</TabsTrigger>
          <TabsTrigger value="products">Productos</TabsTrigger>
          <TabsTrigger value="tickets">Tickets / Acceso</TabsTrigger>
          <TabsTrigger value="finances">Talleres y Ponencias</TabsTrigger>
          <TabsTrigger value="summary">Resumen</TabsTrigger>
        </TabsList>

        {/* Sección A: Información Básica */}
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del evento *</Label>
                  <Input 
                    id="name" 
                    placeholder="Ej: Festival de Cerveza Artesanal 2025" 
                    value={eventName}
                    onChange={handleNameChange}
                  />
                  {nameError && <p className="text-xs text-red-500">{nameError}</p>}
                  <p className="text-xs text-muted-foreground">Máximo 100 caracteres. Debe ser único por año.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de evento *</Label>
                  <Select value={eventType} onValueChange={setEventType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="taller">Taller</SelectItem>
                      <SelectItem value="cata">Cata</SelectItem>
                      <SelectItem value="feria">Feria</SelectItem>
                      <SelectItem value="lanzamiento">Lanzamiento</SelectItem>
                      <SelectItem value="degustacion">Degustación</SelectItem>
                      <SelectItem value="competencia">Competencia</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Clasifica reportes y filtros.</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea 
                  id="description" 
                  placeholder="Descripción detallada del evento..." 
                  rows={4} 
                />
                <p className="text-xs text-muted-foreground">
                  Esta descripción se mostrará en la web y materiales promocionales.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Imagen de portada</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Arrastra y suelta una imagen o haz clic para seleccionar</p>
                  <Button variant="outline">Seleccionar imagen</Button>
                  <p className="text-xs text-muted-foreground mt-2">Recomendado: 1200x630px, formato JPG o PNG.</p>
                </div>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección B: Calendario y Locación */}
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendario y Locación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Fecha de inicio *</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <Input 
                      id="startDate" 
                      type="date" 
                      value={startDate}
                      onChange={handleStartDateChange}
                      min={getTodayDate()}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">La fecha debe ser igual o posterior a hoy.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Hora de inicio *</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <Input 
                      id="startTime" 
                      type="time" 
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="endDate">Fecha de finalización *</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <Input 
                      id="endDate" 
                      type="date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Debe ser igual o posterior a la fecha de inicio.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Hora de finalización *</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <Input 
                      id="endTime" 
                      type="time" 
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="venue">Lugar / Recinto *</Label>
                  <Input 
                    id="venue" 
                    placeholder="Ej: Plaza Los Palos Grandes" 
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Nombre específico del lugar donde se realizará el evento.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacidad (aforo)</Label>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <Input 
                      id="capacity" 
                      type="number" 
                      placeholder="100" 
                      value={capacity}
                      onChange={(e) => setCapacity(Number(e.target.value))}
                      min={1}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Número máximo de asistentes permitidos.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección C: Proveedores participantes */}
        <TabsContent value="providers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Proveedores Participantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Proveedores seleccionados: {selectedProviders.length}</h3>
                  <p className="text-xs text-muted-foreground">Debe seleccionar al menos 1 proveedor.</p>
                </div>
                <Button onClick={() => setIsProviderSelectorOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar proveedores
                </Button>
              </div>

              {selectedProviders.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Contacto</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedProviders.map((provider) => (
                        <TableRow key={provider.id}>
                          <TableCell>{provider.id}</TableCell>
                          <TableCell className="font-medium">{provider.name}</TableCell>
                          <TableCell>{provider.contact}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => removeProvider(provider.id)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="border rounded-md p-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No hay proveedores seleccionados</p>
                    <Button variant="outline" onClick={() => setIsProviderSelectorOpen(true)}>
                      Agregar proveedores
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección D: Productos para el evento */}
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Productos para el Evento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Productos seleccionados: {selectedProducts.length}</h3>
                  <p className="text-xs text-muted-foreground">Opcional si el evento solo tiene charlas o actividades.</p>
                </div>
                <Button onClick={() => setIsProductSelectorOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar productos
                </Button>
              </div>

              {selectedProducts.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio normal</TableHead>
                        <TableHead>Precio evento</TableHead>
                        <TableHead>Cantidad prevista</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedProducts.map((product) => (
                        <TableRow key={product.sku}>
                          <TableCell>{product.sku}</TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>Bs. {product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={product.eventPrice}
                              onChange={(e) => updateProductPrice(product.sku, Number(e.target.value))}
                              className="w-24"
                              min={0}
                              step={0.01}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={product.quantity}
                              onChange={(e) => updateProductQuantity(product.sku, Number(e.target.value))}
                              className="w-24"
                              min={0}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => removeProduct(product.sku)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="border rounded-md p-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No hay productos seleccionados</p>
                    <Button variant="outline" onClick={() => setIsProductSelectorOpen(true)}>
                      Agregar productos
                    </Button>
                  </div>
                </div>
              )}

              <div className="border rounded-md p-4">
                <h3 className="text-sm font-medium mb-2">Resumen de stock móvil</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Total de unidades:</div>
                    <div className="text-2xl font-bold">{calculateTotalStock()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Valor total estimado:</div>
                    <div className="text-2xl font-bold">Bs. {selectedProducts.reduce((total, product) => total + (product.eventPrice * product.quantity), 0).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección E: Tickets / Acceso */}
        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tickets / Acceso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="hasTickets" 
                  checked={hasTickets} 
                  onCheckedChange={setHasTickets} 
                />
                <Label htmlFor="hasTickets">¿Evento con tickets?</Label>
              </div>

              {hasTickets && (
                <>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium mb-2">Configuración de Ticket</h3>
                    
                    <div className="border rounded-md p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ticketName">Nombre del Ticket</Label>
                          <Input
                            id="ticketName"
                            value={ticket.name}
                            onChange={(e) => updateTicket("name", e.target.value)}
                            placeholder="Ej: General, Entrada Única"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ticketQuota">Cupo Total</Label>
                          <Input
                            id="ticketQuota"
                            type="number"
                            value={ticket.quota}
                            onChange={(e) => updateTicket("quota", Number(e.target.value))}
                            min={1}
                          />
                          <p className="text-xs text-muted-foreground">Cantidad total de tickets disponibles</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ticketPrice">Precio</Label>
                          <Input
                            id="ticketPrice"
                            type="number"
                            value={ticket.price}
                            onChange={(e) => updateTicket("price", Number(e.target.value))}
                            min={0}
                            step={0.01}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ticketCurrency">Moneda</Label>
                          <Select 
                            value={ticket.currency} 
                            onValueChange={(value) => updateTicket("currency", value)}
                          >
                            <SelectTrigger id="ticketCurrency">
                              <SelectValue placeholder="Moneda" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Bs">Bolívares (Bs)</SelectItem>
                              <SelectItem value="USD">Dólares (USD)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="commission">Comisiones / fees (%)</Label>
                    <Input
                      id="commission"
                      type="number"
                      value={commissionPercentage}
                      onChange={(e) => setCommissionPercentage(Number(e.target.value))}
                      min={0}
                      max={100}
                    />
                    <p className="text-xs text-muted-foreground">Porcentaje de comisión para cálculo neto.</p>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="text-sm font-medium mb-2">Resumen de tickets</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Total tickets:</div>
                        <div className="text-2xl font-bold">{calculateTotalTickets()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Ingresos brutos:</div>
                        <div className="text-2xl font-bold">{ticket.currency} {calculateTotalTicketRevenue().toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Ingresos netos:</div>
                        <div className="text-2xl font-bold">{ticket.currency} {(calculateTotalTicketRevenue() * (1 - commissionPercentage / 100)).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!hasTickets && (
                <Alert>
                  <AlertDescription>
                    El evento no requiere tickets. Los asistentes tendrán acceso libre.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección F: talleres y ponencias */}
        <TabsContent value="finances" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Talleres y Ponencias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="has-talleres-ponencias"
                  checked={hasTalleresPonencias}
                  onCheckedChange={setHasTalleresPonencias}
                />
                <Label htmlFor="has-talleres-ponencias">¿Incluir talleres o ponencias?</Label>
              </div>

              {hasTalleresPonencias && (
                <div className="space-y-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTallerPonencia}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Taller/Ponencia
                  </Button>

                  {talleresPonencias.map((tp) => (
                    <Card key={tp.id} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <Select
                          value={tp.type}
                          onValueChange={(value) => updateTallerPonencia(tp.id, 'type', value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecciona tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="taller">Taller</SelectItem>
                            <SelectItem value="ponencia">Ponencia</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTallerPonencia(tp.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Título</Label>
                          <Input
                            value={tp.title}
                            onChange={(e) => updateTallerPonencia(tp.id, 'title', e.target.value)}
                            placeholder="Título del taller/ponencia"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Descripción</Label>
                          <Textarea
                            value={tp.description}
                            onChange={(e) => updateTallerPonencia(tp.id, 'description', e.target.value)}
                            placeholder="Descripción detallada"
                            rows={3}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Proveedor</Label>
                            <Select
                              value={tp.providerId.toString()}
                              onValueChange={(value) => updateTallerPonencia(tp.id, 'providerId', parseInt(value))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona proveedor" />
                              </SelectTrigger>
                              <SelectContent>
                                {selectedProviders.map((provider) => (
                                  <SelectItem key={provider.id} value={provider.id.toString()}>
                                    {provider.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Fecha</Label>
                            <Input
                              type="date"
                              value={tp.date}
                              onChange={(e) => updateTallerPonencia(tp.id, 'date', e.target.value)}
                              min={startDate}
                              max={endDate}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Hora</Label>
                            <Input
                              type="time"
                              value={tp.time}
                              onChange={(e) => updateTallerPonencia(tp.id, 'time', e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Duración (minutos)</Label>
                            <Input
                              type="number"
                              value={tp.duration}
                              onChange={(e) => updateTallerPonencia(tp.id, 'duration', Number(e.target.value))}
                              min={15}
                              step={15}
                            />
                            <p className="text-xs text-muted-foreground">
                              Duración en minutos (mínimo 15 minutos)
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección I: Resumen & Guardar */}
        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumen y vista previa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Información básica</h3>
                    <div className="border rounded-md p-3 mt-1">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-medium">Nombre:</div>
                        <div>{eventName || "No definido"}</div>
                        <div className="font-medium">Tipo:</div>
                        <div className="capitalize">{eventType || "No definido"}</div>
                        <div className="font-medium">Fecha inicio:</div>
                        <div>{startDate ? new Date(startDate).toLocaleDateString() : "No definida"} {startTime}</div>
                        <div className="font-medium">Fecha fin:</div>
                        <div>{endDate ? new Date(endDate).toLocaleDateString() : "No definida"} {endTime}</div>
                        <div className="font-medium">Lugar:</div>
                        <div>{venue || "No definido"}</div>
                        <div className="font-medium">Capacidad:</div>
                        <div>{capacity} personas</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">Proveedores y productos</h3>
                    <div className="border rounded-md p-3 mt-1">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-medium">Proveedores:</div>
                        <div>{selectedProviders.length}</div>
                        <div className="font-medium">Productos:</div>
                        <div>{selectedProducts.length}</div>
                        <div className="font-medium">Stock total:</div>
                        <div>{calculateTotalStock()} unidades</div>
                      </div>
                    </div>
                  </div>

                  {hasTalleresPonencias && talleresPonencias.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium">Talleres y Ponencias</h3>
                      <div className="border rounded-md p-3 mt-1">
                        <div className="space-y-2">
                          {talleresPonencias.map((tp) => (
                            <div key={tp.id} className="grid grid-cols-2 gap-2 text-sm">
                              <div className="font-medium capitalize">{tp.type}:</div>
                              <div>{tp.title}</div>
                              <div className="font-medium">Proveedor:</div>
                              <div>{selectedProviders.find(p => p.id === tp.providerId)?.name}</div>
                              <div className="font-medium">Fecha y hora:</div>
                              <div>{new Date(tp.date).toLocaleDateString()} {tp.time}</div>
                              <div className="font-medium">Duración:</div>
                              <div>{Math.floor(tp.duration / 60)}h {tp.duration % 60}m</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium">Tickets y finanzas</h3>
                    <div className="border rounded-md p-3 mt-1">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-medium">¿Requiere tickets?:</div>
                        <div>{hasTickets ? "Sí" : "No"}</div>
                        {hasTickets && (
                          <>
                            <div className="font-medium">Ticket:</div>
                            <div>{ticket.name} ({ticket.currency} {ticket.price})</div>
                            <div className="font-medium">Total tickets:</div>
                            <div>{calculateTotalTickets()}</div>
                            <div className="font-medium">Ingresos por tickets:</div>
                            <div>{ticket.currency} {calculateTotalTicketRevenue().toFixed(2)}</div>
                          </>
                        )}
                        <div className="font-medium">Presupuesto:</div>
                        <div>Bs. {budget.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">Validación</h3>
                    <div className="border rounded-md p-3 mt-1">
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <Badge variant="outline" className={eventName ? "bg-gray-200" : ""}>
                            {eventName ? "✓" : "✗"}
                          </Badge>
                          <span>Nombre del evento</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline" className={eventType ? "bg-gray-200" : ""}>
                            {eventType ? "✓" : "✗"}
                          </Badge>
                          <span>Tipo de evento</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline" className={startDate && endDate ? "bg-gray-200" : ""}>
                            {startDate && endDate ? "✓" : "✗"}
                          </Badge>
                          <span>Fechas del evento</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline" className={venue ? "bg-gray-200" : ""}>
                            {venue ? "✓" : "✗"}
                          </Badge>
                          <span>Lugar del evento</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline" className={selectedProviders.length > 0 ? "bg-gray-200" : ""}>
                            {selectedProviders.length > 0 ? "✓" : "✗"}
                          </Badge>
                          <span>Proveedores ({selectedProviders.length} de mínimo 1)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline" className={!hasTickets || ticket.quota > 0 ? "bg-gray-200" : ""}>
                            {!hasTickets || ticket.quota > 0 ? "✓" : "✗"}
                          </Badge>
                          <span>Tickets (requeridos: {hasTickets ? "Sí" : "No"})</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4 flex flex-col items-center justify-center">
                  <div className="border h-[300px] w-[200px] flex items-center justify-center mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">{eventName || "Nombre del evento"}</div>
                      <div className="text-sm capitalize">{eventType || "Tipo de evento"}</div>
                      <div className="text-xs mt-2">
                        {startDate ? new Date(startDate).toLocaleDateString() : "Fecha"} - {startTime}
                      </div>
                      <div className="text-xs">
                        {venue || "Lugar del evento"}
                      </div>
                      <div className="mt-4 text-sm">Vista previa de evento</div>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Generar vista previa completa
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" asChild>
                  <Link href="/eventos/gestion">Cancelar</Link>
                </Button>
                <Button onClick={handleSave} disabled={isLoading || !isFormValid()}>
                  <Save className="h-4 w-4 mr-2" />
                  {isFormValid() ? "Guardar Evento" : "Complete los campos requeridos"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal para seleccionar proveedores */}
      <ProviderSelectorModal
        open={isProviderSelectorOpen}
        onOpenChange={setIsProviderSelectorOpen}
        onConfirm={handleProviderSelection}
        selectedProviders={selectedProviders}
      />

      {/* Modal para seleccionar productos */}
      <ProductSelectorModal
        open={isProductSelectorOpen}
        onOpenChange={setIsProductSelectorOpen}
        onConfirm={handleProductSelection}
        selectedProducts={mapToDiarioProducts(selectedProducts)}
      />
    </div>
  )
}

