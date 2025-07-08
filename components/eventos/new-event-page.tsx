"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Calendar, Clock, Plus, Trash2, AlertTriangle, Users } from "lucide-react"
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
import { ProviderProductModal } from "@/components/eventos/provider-product-modal"
import { GuestSelectorModal } from "@/components/eventos/guest-selector-modal"
import { NewGuestModal } from "@/components/eventos/new-guest-modal"
import { EventoMiembro, EventoProducto, Invitado } from "@/models/evento"
import { llamarFuncion } from "@/lib/server-actions"
import { DireccionForm } from "../steps/direccion-form"
import { usePermissions } from "@/store/user-store";

export default function NewEventPage() {
const { puedeVerInvitados,puedeCrearInvitadoEvento,puedeCrearInvitados,puedeVerMiembros,puedeCrearStockMiembro,puedeVerMiembroPresentacionCerveza } = usePermissions();

  const [isLoading, setIsLoading] = useState(false)
  const [nameError, setNameError] = useState<string | null>(null)
  const [eventName, setEventName] = useState("")
  const [eventType, setEventType] = useState("")
  const [startDate, setStartDate] = useState<string>(getTodayDate())
  const [endDate, setEndDate] = useState<string>(getTodayDate())
  const [startTime, setStartTime] = useState("17:00")
  const [endTime, setEndTime] = useState("22:00")

  // Locacion
  const [selectedState, setSelectedState] = useState("")
  const [selectedMunicipality, setSelectedMunicipality] = useState("")
  const [selectedParish, setSelectedParish] = useState("")
  const [addressDetails, setAddressDetails] = useState("")

  // Tickets
  const [hasTickets, setHasTickets] = useState(false)
  const [ticketPrice, setTicketPrice] = useState<number>(0)

  // Proveedores
  const [isProviderProductModalOpen, setIsProviderProductModalOpen] = useState(false)
  const [selectedProviders, setSelectedProviders] = useState<EventoMiembro[]>([])

  // Invitados
  const [isGuestSelectorOpen, setIsGuestSelectorOpen] = useState(false)
  const [isNewGuestModalOpen, setIsNewGuestModalOpen] = useState(false)
  const [selectedGuests, setSelectedGuests] = useState<Invitado[]>([])

  // Estado para lugares
  const [lugares, setLugares] = useState<any[]>([])
  const [eventTypes, setEventTypes] = useState<string[]>([])

  // Descripción
  const [description, setDescription] = useState("")

  // Cargar lugares y tipos de evento al montar
  useEffect(() => {
    async function fetchLugares() {
      try {
        const data = await llamarFuncion<any[]>("fn_get_lugares")
        setLugares(data)
      } catch (error) {
        console.error("Error al obtener lugares:", error)
      }
    }
    async function fetchTiposEvento() {
      try {
        const tipos = await llamarFuncion<any>("fn_get_tipos_eventos")
        // Si retorna array de objetos {nombre: string}
        setEventTypes(Array.isArray(tipos) ? tipos.map((t: any) => t.nombre) : [])
      } catch (error) {
        console.error("Error al obtener tipos de evento:", error)
      }
    }
    fetchLugares()
    fetchTiposEvento()
  }, [])

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
    if (new Date(endDate) < new Date(value)) {
      setEndDate(value)
    }
  }

  const handleStateChange = (stateId: string) => {
    setSelectedState(stateId)
    setSelectedMunicipality("")
    setSelectedParish("")
  }

  const handleMunicipalityChange = (municipalityId: string) => {
    setSelectedMunicipality(municipalityId)
    setSelectedParish("")
  }

  // Adaptado: Recibe EventoMiembro[]
  const handleProviderProductSelection = (providers: EventoMiembro[]) => {
    // Asegura que cada producto tenga cantidad inicializada
    const normalized = providers.map(p => ({
      ...p,
      productos: (p.productos || []).map(prod => ({
        ...prod,
        cantidad: typeof prod.cantidad === "number" ? prod.cantidad : 0
      }))
    }))
    setSelectedProviders(normalized)
    setIsProviderProductModalOpen(false)
  }

  const handleGuestSelection = (invitados: Invitado[]) => {
    setSelectedGuests(invitados)
    setIsGuestSelectorOpen(false)
  }

  const handleNewGuest = (invitado: Invitado) => {
    setSelectedGuests([...selectedGuests, invitado])
    setIsNewGuestModalOpen(false)
  }

  // Adaptado: Usa ambos IDs
  const removeProvider = (id1: number, id2: string) => {
    setSelectedProviders(selectedProviders.filter((provider) => !(provider.id1 === id1 && provider.id2 === id2)))
  }

  const removeGuest = (id: number) => {
    setSelectedGuests(selectedGuests.filter((invitado) => invitado.id !== id))
  }

  const updateGuestTimes = (id: number, field: keyof Invitado, value: any) => {
    setSelectedGuests(selectedGuests.map((invitado) => (invitado.id === id ? { ...invitado, [field]: value } : invitado)))
  }

  const calculateTotalProducts = () => {
    return selectedProviders.reduce((total, provider) => total + (provider.productos?.length || 0), 0)
  }

  const handleSave = async () => {
    if (!isFormValid()) {
      alert("Por favor complete todos los campos obligatorios")
      return
    }
    setIsLoading(true)
    try {
      // Construir los timestamps de inicio y fin
      const fechaHoraInicio = new Date(`${startDate}T${startTime}:00`)
      const fechaHoraFin = new Date(`${endDate}T${endTime}:00`)
      // Preparar parámetros para la función SQL
      const parametros = {
        p_nombre: eventName,
        p_descripcion: description,
        p_nombre_tipo_evento: eventType,
        p_direccion: addressDetails,
        p_id_parroquia: Number(selectedParish),
        p_fecha_hora_inicio: fechaHoraInicio.toISOString(),
        p_fecha_hora_fin: fechaHoraFin.toISOString(),
        p_precio: hasTickets ? ticketPrice : 0,
      }
      const resultado = await llamarFuncion("fn_create_evento", parametros)
      let idEventoCreado = null
      if (typeof resultado === "number") {
        idEventoCreado = resultado
      } else if (Array.isArray(resultado) && resultado.length > 0 && resultado[0].id) {
        idEventoCreado = resultado[0].id
      } else if (typeof resultado === "object" && resultado !== null && !Array.isArray(resultado) && (resultado as any).id) {
        idEventoCreado = (resultado as any).id
      } else if (typeof resultado === "string" && resultado !== "") {
        idEventoCreado = Number(resultado)
      }
      if (idEventoCreado) {
        // Asociar invitados
        for (const invitado of selectedGuests) {
          let idInvitado = invitado.id
          if (invitado.esNuevo) {
            try {
              const nuevoId = await llamarFuncion("fn_create_invitado", {
                p_nombre: invitado.primerNombre,
                p_apellido: invitado.primerApellido,
                p_ci: invitado.cedula,
                p_nacionalidad: invitado.nacionalidad,
                p_nombre_tipo_invitado: invitado.tipoInvitado
              })
              if (typeof nuevoId === "number") {
                idInvitado = nuevoId
              } else if (Array.isArray(nuevoId) && nuevoId.length > 0 && nuevoId[0].id) {
                idInvitado = nuevoId[0].id
              } else if (typeof nuevoId === "object" && nuevoId !== null && !Array.isArray(nuevoId) && (nuevoId as any).id) {
                idInvitado = (nuevoId as any).id
              } else if (typeof nuevoId === "string" && nuevoId !== "") {
                idInvitado = Number(nuevoId)
              }
            } catch (err) {
              const errorMsg = err instanceof Error ? err.message : String(err)
              alert(`Error al crear invitado ${invitado.primerNombre} ${invitado.primerApellido}: ${errorMsg}`)
              continue // Salta a siguiente invitado
            }
          }
          try {
            await llamarFuncion("fn_create_invitado_evento", {
              p_id_invitado: idInvitado,
              p_id_evento: idEventoCreado,
              p_fecha_hora_entrada: invitado.fechaHoraEntrada || fechaHoraInicio.toISOString(),
              p_fecha_hora_salida: invitado.fechaHoraSalida || fechaHoraFin.toISOString()
            })
          } catch (err) {
            const errorMsg = err instanceof Error ? err.message : String(err)
            alert(`Error al asociar invitado ${invitado.primerNombre} ${invitado.primerApellido} al evento: ${errorMsg}`)
          }
        }
        // Guardar stock de productos de proveedores
        for (const provider of selectedProviders) {
          if (provider.productos && provider.productos.length > 0) {
            for (const product of provider.productos) {
              try {
                await llamarFuncion("fn_create_stock_miembro", {
                  p_id_miembro_1: provider.id1,
                  p_id_miembro_2: provider.id2,
                  p_id_evento: idEventoCreado,
                  p_id_producto_1: product.id1,
                  p_id_producto_2: product.id2,
                  p_cantidad: product.cantidad
                })
              } catch (err) {
                const errorMsg = err instanceof Error ? err.message : String(err)
                alert(`Error al guardar stock para el producto ${product.nombre} del proveedor ${provider.nombre}: ${errorMsg}`)
              }
            }
          }
        }
        alert("¡Evento creado exitosamente!")
        window.location.href = "/dashboard/eventos/gestion" // Redirigir a la página de gestión del evento creado
      } else {
        alert("Error al crear el evento. Intenta de nuevo.")
      }
    } catch (error: any) {
      alert("Error al crear el evento: " + (error.message || "desconocido"))
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = () => {
    return (
      eventName.trim() !== "" &&
      eventType !== "" &&
      startDate !== "" &&
      endDate !== "" &&
      startTime !== "" &&
      endTime !== "" &&
      selectedState !== "" &&
      selectedMunicipality !== "" &&
      selectedParish !== "" &&
      addressDetails.trim() !== "" &&
      selectedProviders.length > 0 &&
      selectedProviders.every((provider) => provider.productos && provider.productos.length > 0)
    )
  }

  // Helpers para filtrar lugares por tipo y jerarquía (dentro del componente)
  const estados = lugares.filter((l) => l.tipo === "Estado")
  const municipios = lugares.filter((l) => l.tipo === "Municipio" && l.fk_lugar === (selectedState ? Number(selectedState) : undefined))
  const parroquias = lugares.filter((l) => l.tipo === "Parroquia" && l.fk_lugar === (selectedMunicipality ? Number(selectedMunicipality) : undefined))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/eventos/gestion">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Nuevo Evento</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/eventos/gestion">Cancelar</Link>
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
          <TabsTrigger value="providers">Proveedores / Productos</TabsTrigger>
          <TabsTrigger value="guests">Invitados</TabsTrigger>
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de evento *</Label>
                  <Select value={eventType} onValueChange={setEventType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Descripción detallada del evento..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Esta descripción se mostrará en la web y materiales promocionales.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="hasTickets" checked={hasTickets} onCheckedChange={setHasTickets} />
                  <Label htmlFor="hasTickets">¿Evento con tickets?</Label>
                </div>

                {hasTickets && (
                  <div className="space-y-2">
                    <Label htmlFor="ticketPrice">Precio del ticket (Bs)</Label>
                    <Input
                      id="ticketPrice"
                      type="number"
                      value={ticketPrice}
                      onChange={(e) => setTicketPrice(Number(e.target.value))}
                      min={0}
                      step={0.01}
                      placeholder="0.00"
                    />
                  </div>
                )}
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
                    <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Ubicación del evento</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado *</Label>
                      <Select value={selectedState} onValueChange={val => setSelectedState(val)}>
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          {estados.map((state) => (
                            <SelectItem key={state.id} value={state.id.toString()}>
                              {state.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="municipality">Municipio *</Label>
                      <Select
                        value={selectedMunicipality}
                        onValueChange={val => setSelectedMunicipality(val)}
                        disabled={!selectedState}
                      >
                        <SelectTrigger id="municipality">
                          <SelectValue placeholder="Seleccionar municipio" />
                        </SelectTrigger>
                        <SelectContent>
                          {municipios.map((municipio) => (
                            <SelectItem key={municipio.id} value={municipio.id.toString()}>
                              {municipio.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parish">Parroquia *</Label>
                      <Select value={selectedParish} onValueChange={val => setSelectedParish(val)} disabled={!selectedMunicipality}>
                        
                        <SelectTrigger id="parish">
                          <SelectValue placeholder="Seleccionar parroquia" />
                        </SelectTrigger>
                        <SelectContent>
                          {parroquias.map((parroquia) => (
                            <SelectItem key={parroquia.id} value={parroquia.id.toString()}>
                              {parroquia.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="addressDetails">Dirección específica *</Label>
                      <Input
                        id="addressDetails"
                        placeholder="Ej: Calle 5 con Av. Principal, Local 123"
                        value={addressDetails}
                        onChange={(e) => setAddressDetails(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección C: Proveedores / Productos */}
        <TabsContent value="providers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Proveedores / Productos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">
                    Proveedores seleccionados: {selectedProviders.length} | Productos: {calculateTotalProducts()}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Debe seleccionar al menos 1 proveedor y cada proveedor debe tener al menos 1 producto.
                  </p>
                </div>
                {puedeCrearStockMiembro() && puedeVerMiembros() && puedeVerMiembroPresentacionCerveza() && (
                  <Button onClick={() => setIsProviderProductModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar proveedores y productos
                  </Button>
                ) }
              </div>

              {selectedProviders.length > 0 ? (
                <div className="space-y-4">
                  {selectedProviders.map((provider) => (
                    <div key={`${provider.id1}-${provider.id2}`} className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{provider.nombre}</h4>
                          <p className="text-sm text-muted-foreground">{provider.correo}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeProvider(provider.id1, provider.id2)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar proveedor</span>
                        </Button>
                      </div>

                      {provider.productos && provider.productos.length > 0 ? (
                        <div className="border rounded-md">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>SKU</TableHead>
                                <TableHead>Producto</TableHead>
                                <TableHead>Precio</TableHead>
                                <TableHead>Cantidad</TableHead>
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
                          <AlertDescription>
                            Este proveedor no tiene productos asignados. Debe agregar al menos un producto.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border rounded-md p-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No hay proveedores seleccionados</p>
                    
                    {puedeCrearStockMiembro() && puedeVerMiembros() && puedeVerMiembroPresentacionCerveza() ? (
                      <Button variant="outline" onClick={() => setIsProviderProductModalOpen(true)}>
                          Agregar proveedores y productos
                        </Button>
                    ) : (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          No tienes permisos para agregar proveedores/productos. Permisos faltantes:
                          <ul className="list-disc ml-4 mt-1">
                            {!puedeCrearStockMiembro() && <li>Crear stock de miembro</li>}
                            {!puedeVerMiembros() && <li>Ver miembros</li>}
                            {!puedeVerMiembroPresentacionCerveza() && <li>Ver presentaciones de cerveza de miembros</li>}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección D: Invitados */}
        <TabsContent value="guests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invitados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Invitados seleccionados: {selectedGuests.length}</h3>
                  <p className="text-xs text-muted-foreground">Gestiona la lista de invitados al evento.</p>
                </div>
                <div className="flex gap-2">
                  {puedeCrearInvitadoEvento() ? (
                    <>
                      {puedeVerInvitados() && (
                        <Button variant="outline" onClick={() => setIsGuestSelectorOpen(true)}>
                          <Users className="h-4 w-4 mr-2" />
                          Agregar existente
                        </Button>
                      )}
                      {puedeCrearInvitados() && (
                        <Button onClick={() => setIsNewGuestModalOpen(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Crear nuevo
                        </Button>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
              {!puedeCrearInvitadoEvento() && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    No tienes permisos para asociar invitados a eventos.
                  </AlertDescription>
                </Alert>
              )}
              {puedeCrearInvitadoEvento() && (!puedeVerInvitados() && !puedeCrearInvitados()) && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    No tienes permisos para gestionar invitados.
                  </AlertDescription>
                </Alert>
              )}

              {selectedGuests.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Cédula</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Fecha entrada</TableHead>
                        <TableHead>Hora entrada</TableHead>
                        <TableHead>Fecha salida</TableHead>
                        <TableHead>Hora salida</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedGuests.map((invitado) => (
                        <TableRow key={invitado.id}>
                          <TableCell className="font-medium">
                            {invitado.primerNombre} {invitado.primerApellido}
                          </TableCell>
                          <TableCell>{invitado.nacionalidad}-{invitado.cedula}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{invitado.tipoInvitado}</Badge>
                          </TableCell>
                          <TableCell>
        <Input
          type="date"
          value={invitado.fechaHoraEntrada ? new Date(invitado.fechaHoraEntrada).toISOString().split("T")[0] : ""}
          onChange={(e) => updateGuestTimes(invitado.id, "fechaHoraEntrada", new Date(e.target.value))}
          min={startDate}
          max={endDate}
          className="w-32"
        />
      </TableCell>
      <TableCell>
        <Input
          type="time"
          step="300"
          value={invitado.fechaHoraEntrada ? new Date(invitado.fechaHoraEntrada).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
          onChange={(e) => {
            const fecha = invitado.fechaHoraEntrada ? new Date(invitado.fechaHoraEntrada) : new Date()
            const [h, m] = e.target.value.split(":")
            fecha.setHours(Number(h), Number(m), 0, 0)
            updateGuestTimes(invitado.id, "fechaHoraEntrada", fecha)
          }}
          className="w-24"
          style={{ cursor: 'pointer' }}
        />
      </TableCell>
      <TableCell>
        <Input
          type="date"
          value={invitado.fechaHoraSalida ? new Date(invitado.fechaHoraSalida).toISOString().split("T")[0] : ""}
          onChange={(e) => updateGuestTimes(invitado.id, "fechaHoraSalida", new Date(e.target.value))}
          min={invitado.fechaHoraEntrada ? new Date(invitado.fechaHoraEntrada).toISOString().split("T")[0] : startDate}
          max={endDate}
          className="w-32"
        />
      </TableCell>
      <TableCell>
        <Input
          type="time"
          step="300"
          value={invitado.fechaHoraSalida ? new Date(invitado.fechaHoraSalida).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
          onChange={(e) => {
            const fecha = invitado.fechaHoraSalida ? new Date(invitado.fechaHoraSalida) : new Date()
            const [h, m] = e.target.value.split(":")
            fecha.setHours(Number(h), Number(m), 0, 0)
            updateGuestTimes(invitado.id, "fechaHoraSalida", fecha)
          }}
          className="w-24"
          style={{ cursor: 'pointer' }}
        />
      </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => removeGuest(invitado.id)}>
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
                    <Users className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No hay invitados seleccionados</p>
                    <div className="flex gap-2">
                      {puedeVerInvitados() && (
                      <Button variant="outline" onClick={() => setIsGuestSelectorOpen(true)}>
                        Agregar existente
                      </Button>)}
                      {puedeCrearInvitados() && (
                      <Button onClick={() => setIsNewGuestModalOpen(true)}>Crear nuevo</Button>)}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sección E: Resumen */}
        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del evento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                      <div>
                        {startDate ? new Date(startDate).toLocaleDateString() : "No definida"} {startTime}
                      </div>
                      <div className="font-medium">Fecha fin:</div>
                      <div>
                        {endDate ? new Date(endDate).toLocaleDateString() : "No definida"} {endTime}
                      </div>
                      <div className="font-medium">Lugar:</div>
                      <div>{addressDetails || "No definido"}</div>
                      <div className="font-medium">¿Con tickets?:</div>
                      <div>{hasTickets ? `Sí (Bs. ${ticketPrice})` : "No"}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Ubicación</h3>
                  <div className="border rounded-md p-3 mt-1">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Estado:</div>
                      <div>{estados.find((s) => s.id === Number(selectedState))?.nombre || "No definido"}</div>
                      <div className="font-medium">Municipio:</div>
                      <div>
                        {municipios.find((m) => m.id === Number(selectedMunicipality))?.nombre || "No definido"}
                      </div>
                      <div className="font-medium">Parroquia:</div>
                      <div>
                        {parroquias.find((p) => p.id === Number(selectedParish))?.nombre || "No definido"}
                      </div>
                      <div className="font-medium">Dirección:</div>
                      <div>{addressDetails || "No definida"}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Proveedores y productos</h3>
                  <div className="border rounded-md p-3 mt-1">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Proveedores:</div>
                      <div>{selectedProviders.length}</div>
                      <div className="font-medium">Productos totales:</div>
                      <div>{calculateTotalProducts()}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Invitados</h3>
                  <div className="border rounded-md p-3 mt-1">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Total invitados:</div>
                      <div>{selectedGuests.length}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Validación</h3>
                  <div className="border rounded-md p-3 mt-1">
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className={eventName ? "bg-green-100" : "bg-red-100"}>
                          {eventName ? "✓" : "✗"}
                        </Badge>
                        <span>Nombre del evento</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className={eventType ? "bg-green-100" : "bg-red-100"}>
                          {eventType ? "✓" : "✗"}
                        </Badge>
                        <span>Tipo de evento</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className={startDate && endDate ? "bg-green-100" : "bg-red-100"}>
                          {startDate && endDate ? "✓" : "✗"}
                        </Badge>
                        <span>Fechas del evento</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className={addressDetails ? "bg-green-100" : "bg-red-100"}>
                          {addressDetails ? "✓" : "✗"}
                        </Badge>
                        <span>Lugar del evento</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            selectedState && selectedMunicipality && selectedParish && addressDetails
                              ? "bg-green-100"
                              : "bg-red-100"
                          }
                        >
                          {selectedState && selectedMunicipality && selectedParish && addressDetails ? "✓" : "✗"}
                        </Badge>
                        <span>Ubicación completa</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            selectedProviders.length > 0 && selectedProviders.every((p) => p.productos && p.productos.length > 0)
                              ? "bg-green-100"
                              : "bg-red-100"
                          }
                        >
                          {selectedProviders.length > 0 && selectedProviders.every((p) => p.productos && p.productos.length > 0)
                            ? "✓"
                            : "✗"}
                        </Badge>
                        <span>Proveedores con productos ({selectedProviders.length} proveedores)</span>
                      </li>
                    </ul>
                  </div>
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

      {/* Modal para seleccionar proveedores y productos */}
      <ProviderProductModal
        open={isProviderProductModalOpen}
        onOpenChange={setIsProviderProductModalOpen}
        onConfirm={handleProviderProductSelection}
        selectedProviders={selectedProviders}
      />

      {/* Modal para seleccionar invitados existentes */}
      <GuestSelectorModal
        open={isGuestSelectorOpen}
        onOpenChange={setIsGuestSelectorOpen}
        onConfirm={handleGuestSelection}
        selectedGuests={selectedGuests}
      />

      {/* Modal para crear nuevo invitado */}
      <NewGuestModal open={isNewGuestModalOpen} onOpenChange={setIsNewGuestModalOpen} onConfirm={handleNewGuest} />
    </div>
  )
}