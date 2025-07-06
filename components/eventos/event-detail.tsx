"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Edit,
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  ShoppingCart,
  Package,
  RefreshCw,
  Plus,
  Minus,
  Trash2,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { llamarFuncion } from "@/lib/server-actions"
import { usePermissions, useUser } from "@/store/user-store"

interface EventDetail {
  id: number
  nombre: string
  descripcion: string
  tipoEvento: string
  fechaHoraInicio: Date
  fechaHoraFin: Date
  direccion: string
  estado: string
  municipio?: string
  parroquia?: string
  precio: number
  tieneTickets: boolean
}

interface EventProvider {
  id1: number
  id2: string
  nombre: string
  correo: string
  productos: EventProduct[]
}

interface EventProduct {
  id1: number
  id2: string
  sku: string
  nombre: string
  precio: number
  cantidad: number

}

interface Guest {
  id: number
  primerNombre: string
  primerApellido: string
  cedula: string
  nacionalidad: string
  tipoInvitado: string
  fechaHoraEntrada: Date
  fechaHoraSalida: Date
}

interface StockUpdateItem {
  idMiembro1: number
  idMiembro2: string
  idProducto1: number
  idProducto2: number // corregido: debe ser number
  sku: string
  nombre: string
  precio: number
  cantidadActual: number
  cantidadNueva: number
  accion: "mantener" | "actualizar" | "eliminar"
  esNuevo?: boolean // Indica si es un producto recién añadido
}

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params?.id as string
  const { puedeVerMiembros, puedeCrearStockMiembro, puedeVerMiembroPresentacionCerveza } = usePermissions()
  const { esMiembro, getMiembroInfo } = useUser()

  const [isLoading, setIsLoading] = useState(true)
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [providers, setProviders] = useState<EventProvider[]>([])
  const [guests, setGuests] = useState<Guest[]>([])
  const [isStockModalOpen, setIsStockModalOpen] = useState(false)
  const [stockUpdates, setStockUpdates] = useState<StockUpdateItem[]>([])
  const [availableProducts, setAvailableProducts] = useState<any[]>([])
  const [selectedProviderId, setSelectedProviderId] = useState<string>("")

  useEffect(() => {
    if (eventId) {
      loadEventDetails()
    }
  }, [eventId])

  const loadEventDetails = async () => {
    try {
      setIsLoading(true)

      // Cargar detalles del evento
      const eventData = await llamarFuncion("fn_get_evento_by_id", { p_evento_id: Number(eventId) })
      if (eventData && eventData.length > 0) {
        const raw = eventData[0]
        setEvent({
          ...raw,
          fechaHoraInicio: new Date(raw.fechaHoraInicio),
          fechaHoraFin: new Date(raw.fechaHoraFin),
        })
      }

      // Cargar proveedores y productos del evento
      const providersData = await llamarFuncion("fn_get_evento_proveedores", { p_evento_id: Number(eventId) })
      setProviders(providersData || [])

      // Cargar invitados del evento
      const guestsData = await llamarFuncion("fn_get_evento_invitados", { p_evento_id: Number(eventId) })
      setGuests(
        (guestsData || []).map((guest: any) => ({
          ...guest,
          fechaHoraEntrada: guest.fechaHoraEntrada ? new Date(guest.fechaHoraEntrada) : null,
          fechaHoraSalida: guest.fechaHoraSalida ? new Date(guest.fechaHoraSalida) : null,
        })),
      )
    } catch (error) {
      console.error("Error al cargar detalles del evento:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadAvailableProducts = async (providerId1: number, providerId2: string) => {
    try {
      const products = await llamarFuncion("fn_get_miembro_productos", {
        p_id_miembro_1: providerId1,
        p_id_miembro_2: providerId2,
      })
      setAvailableProducts(products || [])
    } catch (error) {
      console.error("Error al cargar productos disponibles:", error)
    }
  }

  const handleStockUpdate = () => {
    // Inicializar stock updates con productos actuales
    const currentStock = providers.flatMap((provider) =>
      provider.productos.map((product) => ({
        idMiembro1: provider.id1,
        idMiembro2: provider.id2,
        idProducto1: product.id1,
        idProducto2: Number(product.id2), // aseguramos que sea number
        sku: product.sku,
        nombre: product.nombre,
        precio: product.precio,
        cantidadActual: product.cantidad,
        cantidadNueva: product.cantidad,
        accion: "mantener" as const,
        esNuevo: false,
      })),
    )
    setStockUpdates(currentStock)
    setIsStockModalOpen(true)
  }

  const updateStockQuantity = (productId1: number, productId2: number, newQuantity: number) => {
    setStockUpdates((prev) =>
      prev.map((item) =>
        item.idProducto1 === productId1 && item.idProducto2 === productId2
          ? {
              ...item,
              cantidadNueva: newQuantity,
              accion: newQuantity !== item.cantidadActual ? "actualizar" : "mantener",
            }
          : item,
      ),
    )
  }

  const removeStockItem = (productId1: number, productId2: number) => {
    setStockUpdates((prev) =>
      prev.map((item) => (item.idProducto1 === productId1 && item.idProducto2 === productId2 ? { ...item, accion: "eliminar" } : item)),
    )
  }

  const addNewProduct = (product: any) => {
    // Obtener los IDs del proveedor seleccionado
    const [idMiembro1, idMiembro2] = selectedProviderId.split("-")
    const newItem: StockUpdateItem = {
      idMiembro1: Number(idMiembro1),
      idMiembro2: idMiembro2,
      idProducto1: product.id1,
      idProducto2: Number(product.id2), // aseguramos que sea number
      sku: product.sku,
      nombre: product.nombre,
      precio: product.precio,
      cantidadActual: 0,
      cantidadNueva: 1,
      accion: "actualizar",
      esNuevo: true,
    }
    setStockUpdates((prev) => [...prev, newItem])
  }

  const saveStockUpdates = async () => {
    try {
      const updates = stockUpdates.filter((item) => item.accion !== "mantener")

      for (const update of updates) {
        if (update.accion === "eliminar") {
          await llamarFuncion("fn_delete_stock_miembro", {
            p_id_miembro_1: update.idMiembro1,
            p_id_miembro_2: update.idMiembro2,
            p_evento_id: Number(eventId),
            p_id_producto_1: update.idProducto1,
            p_id_producto_2: update.idProducto2,
          })
        } else if (update.accion === "actualizar") {
          if (update.esNuevo) {
            // Producto nuevo, crear stock
            await llamarFuncion("fn_create_stock_miembro", {
              p_id_miembro_1: update.idMiembro1,
              p_id_miembro_2: update.idMiembro2, // no forzar a number, igual que en new-event-page
              p_id_evento: Number(eventId),
              p_id_producto_1: update.idProducto1,
              p_id_producto_2: update.idProducto2, // no forzar a number
              p_cantidad: update.cantidadNueva,
            })
          } else {
            // Producto existente, actualizar stock
            await llamarFuncion("fn_update_stock_miembro", {
              p_id_miembro_1: update.idMiembro1,
              p_id_miembro_2: update.idMiembro2,
              p_evento_id: Number(eventId),
              p_id_producto_1: update.idProducto1,
              p_id_producto_2: update.idProducto2,
              p_cantidad: update.cantidadNueva,
            })
          }
        }
      }

      alert("Stock actualizado exitosamente")
      setIsStockModalOpen(false)
      loadEventDetails() // Recargar datos
    } catch (error) {
      console.error("Error al actualizar stock:", error)
      alert("Error al actualizar stock")
    }
  }

  const handleSellTickets = () => {
    // Placeholder para funcionalidad de venta de tickets
    alert("Funcionalidad de venta de tickets - Por implementar")
  }

  const handleSellAtEvent = () => {
    // Placeholder para funcionalidad de venta en evento
    alert("Funcionalidad de venta en evento - Por implementar")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Cargando detalles del evento...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>No se pudo cargar la información del evento.</AlertDescription>
        </Alert>
      </div>
    )
  }

  // Filtrar proveedores si es miembro: solo mostrar el proveedor que coincide con el usuario
  const visibleProviders = esMiembro()
    ? providers.filter(
        (prov) =>
          prov.id1 === getMiembroInfo()?.rif &&
          prov.id2 === getMiembroInfo()?.naturaleza_rif
      )
    : providers

  // Para el modal: limitar selección de proveedor si es miembro
  const providerOptions = esMiembro() ? visibleProviders : providers;
  const onlyProviderId = esMiembro() && visibleProviders.length > 0 ? `${visibleProviders[0].id1}-${visibleProviders[0].id2}` : undefined;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/eventos/gestion">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{event.nombre}</h1>
            <p className="text-muted-foreground">{event.tipoEvento}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {event.tieneTickets && (
            <Button onClick={handleSellTickets} className="bg-green-600 hover:bg-green-700">
              <Ticket className="h-4 w-4 mr-2" />
              Vender Entradas
            </Button>
          )}
          <Button onClick={handleSellAtEvent} variant="outline">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Vender en Evento
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/eventos/${eventId}/editar`}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Información General</TabsTrigger>
          <TabsTrigger value="providers">Proveedores / Productos</TabsTrigger>
          <TabsTrigger value="guests">Invitados</TabsTrigger>
          <TabsTrigger value="sales">Ventas</TabsTrigger>
        </TabsList>

        {/* Información General */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Detalles del Evento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <p className="font-medium">{event.nombre}</p>
                </div>
                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <p className="text-sm text-muted-foreground">{event.descripcion || "Sin descripción"}</p>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Evento</Label>
                  <Badge variant="outline">{event.tipoEvento}</Badge>
                </div>
                {event.tieneTickets && (
                  <div className="space-y-2">
                    <Label>Precio de Entrada</Label>
                    <p className="font-medium">Bs. {event.precio.toFixed(2)}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fecha y Ubicación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Fecha y Hora de Inicio</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.fechaHoraInicio).toLocaleDateString()}</span>
                    <Clock className="h-4 w-4" />
                    <span>{new Date(event.fechaHoraInicio).toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Fecha y Hora de Fin</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.fechaHoraFin).toLocaleDateString()}</span>
                    <Clock className="h-4 w-4" />
                    <span>{new Date(event.fechaHoraFin).toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ubicación</Label>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1" />
                    <div>
                      <p className="font-medium">{event.direccion}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.parroquia}, {event.municipio}, {event.estado}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Proveedores</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{providers.length}</div>
                <p className="text-xs text-muted-foreground">Proveedores participantes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Productos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {providers.reduce((total, provider) => total + provider.productos.length, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Productos disponibles</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Invitados</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{guests.length}</div>
                <p className="text-xs text-muted-foreground">Invitados registrados</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Proveedores / Productos */}
        <TabsContent value="providers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Proveedores y Productos</CardTitle>
                {puedeVerMiembros() && puedeCrearStockMiembro() && puedeVerMiembroPresentacionCerveza() && visibleProviders.length > 0 && (
                  <Button onClick={handleStockUpdate}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Actualizar Stock
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {visibleProviders.length > 0 ? (
                <div className="space-y-6">
                  {visibleProviders.map((provider) => (
                    <div key={`${provider.id1}-${provider.id2}`} className="border rounded-md p-4">
                      <div className="mb-4">
                        <h4 className="font-medium text-lg">{provider.nombre}</h4>
                        <p className="text-sm text-muted-foreground">{provider.correo}</p>
                      </div>
                      {provider.productos.length > 0 ? (
                        <div className="border rounded-md">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>SKU</TableHead>
                                <TableHead>Producto</TableHead>
                                <TableHead>Precio</TableHead>
                                <TableHead>Stock</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {provider.productos.map((product) => (
                                <TableRow key={`${product.id1}-${product.id2}`}>
                                  <TableCell>{product.sku}</TableCell>
                                  <TableCell className="font-medium">{product.nombre}</TableCell>
                                  <TableCell>Bs. {product.precio.toFixed(2)}</TableCell>
                                  <TableCell>{product.cantidad}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>Este proveedor no tiene productos asignados.</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No hay proveedores asignados a este evento</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invitados */}
        <TabsContent value="guests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Invitados</CardTitle>
            </CardHeader>
            <CardContent>
              {guests.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Cédula</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Entrada</TableHead>
                        <TableHead>Salida</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {guests.map((guest) => (
                        <TableRow key={guest.id}>
                          <TableCell className="font-medium">
                            {guest.primerNombre} {guest.primerApellido}
                          </TableCell>
                          <TableCell>
                            {guest.nacionalidad}-{guest.cedula}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{guest.tipoInvitado}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{new Date(guest.fechaHoraEntrada).toLocaleDateString()}</div>
                              <div className="text-muted-foreground">
                                {new Date(guest.fechaHoraEntrada).toLocaleTimeString()}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{new Date(guest.fechaHoraSalida).toLocaleDateString()}</div>
                              <div className="text-muted-foreground">
                                {new Date(guest.fechaHoraSalida).toLocaleTimeString()}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No hay invitados registrados para este evento</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ventas */}
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Ventas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Ventas de Productos</h4>
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4" />
                    <p>Funcionalidad de ventas por implementar</p>
                  </div>
                </div>

                {event.tieneTickets && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Ventas de Tickets</h4>
                    <div className="text-center py-8 text-muted-foreground">
                      <Ticket className="h-12 w-12 mx-auto mb-4" />
                      <p>Funcionalidad de tickets por implementar</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Actualización de Stock */}
      <Dialog open={isStockModalOpen} onOpenChange={setIsStockModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Actualizar Stock de Productos</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Select
                value={selectedProviderId || onlyProviderId || ""}
                onValueChange={setSelectedProviderId}
                disabled={esMiembro()}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Seleccionar proveedor para agregar productos" />
                </SelectTrigger>
                <SelectContent>
                  {providerOptions.map((provider) => (
                    <SelectItem key={`${provider.id1}-${provider.id2}`} value={`${provider.id1}-${provider.id2}`}>
                      {provider.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {((selectedProviderId || onlyProviderId) && providerOptions.length > 0) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    const providerKey = selectedProviderId || onlyProviderId;
                    if (!providerKey) return;
                    const [id1, id2] = providerKey.split("-");
                    loadAvailableProducts(Number(id1), id2);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ver Productos Disponibles
                </Button>
              )}
            </div>

            {availableProducts.length > 0 && (
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Productos Disponibles para Agregar</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {availableProducts.map((product) => (
                    <Button
                      key={`${product.id1}-${product.id2}`}
                      variant="outline"
                      size="sm"
                      onClick={() => addNewProduct(product)}
                      disabled={stockUpdates.some((item) => item.idProducto1 === product.id1 && item.idProducto2 === product.id2)}
                    >
                      {product.nombre}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Stock Actual</TableHead>
                    <TableHead>Nuevo Stock</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockUpdates
                    .filter((item) => item.accion !== "eliminar")
                    .filter((item) => {
                      // Solo mostrar productos del proveedor seleccionado/enfocado
                      const providerKey = selectedProviderId || onlyProviderId;
                      if (!providerKey) return false;
                      const [id1, id2] = providerKey.split("-");
                      return (
                        String(item.idMiembro1) === String(id1) &&
                        String(item.idMiembro2) === String(id2)
                      );
                    })
                    .map((item) => (
                      <TableRow key={`${item.idProducto1}-${item.idProducto2}`}>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell className="font-medium">{item.nombre}</TableCell>
                        <TableCell>Bs. {item.precio.toFixed(2)}</TableCell>
                        <TableCell>{item.cantidadActual}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateStockQuantity(item.idProducto1, item.idProducto2, Math.max(0, item.cantidadNueva - 1))
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.cantidadNueva}
                              onChange={(e) => updateStockQuantity(item.idProducto1, item.idProducto2, Number(e.target.value))}
                              className="w-20 text-center"
                              min={0}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateStockQuantity(item.idProducto1, item.idProducto2, item.cantidadNueva + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => removeStockItem(item.idProducto1, item.idProducto2)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsStockModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={saveStockUpdates}>Guardar Cambios</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
