"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Ticket,
  Edit,
  Download,
  Share2,
  Printer,
  FileText,
  X,
  CheckCircle,
  CalendarClock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EventProvider {
  id: number
  name: string
  contact: string
  role?: string
}

interface TallerPonencia {
  id: string
  type: 'taller' | 'ponencia'
  title: string
  description: string
  providerId: number
  date: string
  time: string
  duration: number
}

interface EventData {
  id: string
  name: string
  type: string
  startDate: string
  endDate: string
  daysLeft: number | null
  location: string
  venue: string
  capacity: number
  attendance: number
  ticketsSold: number
  status: string
  description: string
  isPaid: boolean
  ticketPrice: number
  sales: number
  contactEmail: string
  contactPhone: string
  providers: Array<{
    id: string
    name: string
    type: string
    contact: string
    status: string
  }>
  talleresPonencias: Array<{
    id: string
    type: string
    title: string
    description: string
    providerId: string
    date: string
    time: string
    duration: string
  }>
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [activeTab, setActiveTab] = useState("tickets")
  const [event, setEvent] = useState<EventData | null>(null)

  // En un caso real, cargaríamos los datos del evento basado en el ID
  // Aquí usamos datos de ejemplo
  const eventData: EventData = {
    id: "1",
    name: "Destilo Cerveza",
    type: "Conferencia",
    startDate: "2024-06-15",
    endDate: "2024-06-17",
    daysLeft: 45,
    location: "Centro de Convenciones",
    venue: "Sala Principal",
    capacity: 500,
    attendance: 350,
    ticketsSold: 400,
    status: "Activo",
    description: "La conferencia más importante del año sobre cerveza artesanal.",
    isPaid: true,
    ticketPrice: 150,
    sales: 60000,
    contactEmail: "contacto@conferencia.com",
    contactPhone: "+1234567890",
    providers: sampleProviders,
    talleresPonencias: sampleTalleresPonencias
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
          <h1 className="text-2xl font-bold">{eventData.name}</h1>
          <Badge variant="outline" className="ml-2">
            {eventData.type}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button className="bg-gray-300" variant="outline" size="sm" asChild>
            <Link href={`/eventos/${id}/editar`}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Link>
          </Button>
          
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Detalles del Evento</CardTitle>
                <StatusBadge status={eventData.status} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Fecha de inicio</span>
                    </div>
                    <div className="text-lg">{formatDate(eventData.startDate)}</div>
                    {eventData.daysLeft !== null && (
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {eventData.daysLeft > 0 ? (
                          <span>Faltan {eventData.daysLeft} días</span>
                        ) : eventData.daysLeft === 0 ? (
                          <span className="font-medium">¡Hoy!</span>
                        ) : (
                          <span>Finalizado</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Fecha de finalización</span>
                    </div>
                    <div className="text-lg">{formatDate(eventData.endDate)}</div>
                    <div className="text-sm text-muted-foreground">
                      {getDuration(eventData.startDate, eventData.endDate)} día(s)
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Ubicación</span>
                    </div>
                    <div className="text-lg">{eventData.location}</div>
                    <div className="text-sm text-muted-foreground">{eventData.venue}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Capacidad</span>
                    </div>
                    <div className="text-lg">{eventData.capacity.toLocaleString()} personas</div>
                    {eventData.isPaid ? (
                      <div className="text-sm text-muted-foreground">Evento de pago</div>
                    ) : (
                      <div className="text-sm text-muted-foreground">Evento gratuito</div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Descripción</div>
                  <div className="text-sm">{eventData.description}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Contenido del Evento</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="tickets">Tickets</TabsTrigger>
                  <TabsTrigger value="attendees">Asistentes (Clientes)</TabsTrigger>
                  <TabsTrigger value="providers">Proveedores</TabsTrigger>
                  <TabsTrigger value="taller">Talleres y Ponencias</TabsTrigger>
                </TabsList>

                
                <TabsContent value="tickets" className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border rounded-md p-4 text-center">
                        <div className="text-2xl font-bold">{eventData.ticketsSold.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Tickets vendidos</div>
                      </div>
                      <div className="border rounded-md p-4 text-center">
                        <div className="text-2xl font-bold">{eventData.capacity - eventData.ticketsSold}</div>
                        <div className="text-sm text-muted-foreground">Tickets disponibles</div>
                      </div>
                      <div className="border rounded-md p-4 text-center">
                        <div className="text-2xl font-bold">
                          {calculateAttendancePercentage(eventData.attendance, eventData.capacity)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Ocupación</div>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ticket</TableHead>
                          <TableHead>Precio</TableHead>
                          <TableHead>Disponibles</TableHead>
                          <TableHead>Vendidos</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">General</TableCell>
                          <TableCell>{eventData.isPaid ? `Bs. ${eventData.ticketPrice.toFixed(2)}` : "Gratis"}</TableCell>
                          <TableCell>{(eventData.capacity * 0.7 - eventData.ticketsSold * 0.7).toFixed(0)}</TableCell>
                          <TableCell>{(eventData.ticketsSold * 0.7).toFixed(0)}</TableCell>
                          <TableCell>
                            {eventData.isPaid ? `Bs. ${(eventData.ticketsSold * 0.7 * eventData.ticketPrice).toFixed(2)}` : "-"}
                          </TableCell>
                        </TableRow>
                        
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="attendees" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Total de asistentes: {sampleClients.length}
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar lista
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Contacto</TableHead>
                        <TableHead>Tickets</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleClients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>
                            <div className="text-sm">{client.email}</div>
                            <div className="text-xs text-muted-foreground">{client.phone}</div>
                          </TableCell>
                          <TableCell>{client.tickets}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{client.ticketType}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={client.status === "Confirmado" ? "default" : "outline"}>
                              {client.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="providers" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Total de proveedores: {sampleProviders.length}
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar lista
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Proveedor</TableHead>
                        <TableHead>Contacto</TableHead>
                        <TableHead>Productos/Servicios</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleProviders.map((provider) => (
                        <TableRow key={provider.id}>
                          <TableCell className="font-medium">{provider.name}</TableCell>
                          <TableCell>
                            <div className="text-sm">{provider.contact}</div>
                            <div className="text-xs text-muted-foreground">{provider.email}</div>
                            <div className="text-xs text-muted-foreground">{provider.phone}</div>
                          </TableCell>
                          <TableCell>{provider.products}</TableCell>
                          <TableCell>
                            <Badge variant={provider.status === "Confirmado" ? "default" : "outline"}>
                              {provider.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="taller" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Talleres y Ponencias</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {eventData.talleresPonencias && eventData.talleresPonencias.length > 0 ? (
                        <div className="space-y-4">
                          {eventData.talleresPonencias.map((tp) => (
                            <Card key={tp.id} className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="capitalize">
                                      {tp.type}
                                    </Badge>
                                    <h3 className="text-lg font-semibold">{tp.title}</h3>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{tp.description}</p>
                                </div>
                              </div>

                              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-1">
                                  <p className="font-medium">Proveedor</p>
                                  <p className="text-muted-foreground">
                                    {eventData.providers.find(p => p.id === tp.providerId)?.name}
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p className="font-medium">Fecha y hora</p>
                                  <p className="text-muted-foreground">
                                    {new Date(tp.date).toLocaleDateString()} {tp.time}
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p className="font-medium">Duración</p>
                                  <p className="text-muted-foreground">
                                    {formatDuration(tp.duration)}
                                  </p>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            No hay talleres o ponencias programados para este evento
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Estado del Evento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  {eventData.status === "Activo" && (
                    <div className="h-24 w-24 rounded-full border-8 border-gray-300 flex items-center justify-center mb-2">
                      <CheckCircle className="h-12 w-12 text-gray-500" />
                    </div>
                  )}
                  {eventData.status === "Programado" && (
                    <div className="h-24 w-24 rounded-full border-8 border-gray-200 flex items-center justify-center mb-2">
                      <CalendarClock className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  {eventData.status === "Finalizado" && (
                    <div className="h-24 w-24 rounded-full border-8 border-gray-200 flex items-center justify-center mb-2">
                      <CheckCircle className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  {eventData.status === "Cancelado" && (
                    <div className="h-24 w-24 rounded-full border-8 border-gray-200 flex items-center justify-center mb-2">
                      <X className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <div className="text-lg font-bold mt-2">{eventData.status}</div>
                  {eventData.daysLeft !== null && eventData.daysLeft > 0 && (
                    <div className="text-sm text-muted-foreground">Faltan {eventData.daysLeft} días</div>
                  )}
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Tickets vendidos</div>
                    <div className="text-sm font-medium">
                      {eventData.ticketsSold} / {eventData.capacity} ({calculateAttendancePercentage(eventData.attendance, eventData.capacity)}%)
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-gray-500 rounded-full"
                      style={{ width: `${calculateAttendancePercentage(eventData.attendance, eventData.capacity)}%` }}
                    ></div>
                  </div>
                </div>

                {eventData.status !== "Cancelado" && (
                  <div className="pt-4">
                    <Button variant="outline" className="w-full" disabled={eventData.status === "Finalizado"}>
                      <Ticket className="h-4 w-4 mr-2" />
                      Gestionar tickets
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">Bs.
              <CardTitle>Métricas financieras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Ingresos por tickets</div>
                  <div className="text-2xl font-bold">
                    {eventData.isPaid ? `Bs. ${(eventData.ticketsSold * eventData.ticketPrice).toFixed(2)}` : "Bs. 0.00"}
                  </div>
                </div>
               
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  let badgeClass = ""

  switch (status) {
    case "Activo":
      badgeClass = "bg-gray-300"
      break
    case "Programado":
      badgeClass = "bg-gray-200"
      break
    case "Finalizado":
      badgeClass = "bg-gray-100"
      break
    case "Cancelado":
      badgeClass = "bg-gray-50"
      break
    default:
      badgeClass = "bg-gray-100"
  }

  return (
    <Badge variant="outline" className={badgeClass}>
      {status}
    </Badge>
  )
}

function formatDate(dateString: string): string {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function getDuration(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 1

  const start = new Date(startDate)
  const end = new Date(endDate)

  const diffTime = end.getTime() - start.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

  return diffDays
}

// Función para calcular los días restantes hasta una fecha
function getDaysLeft(dateString: string): number | null {
  if (!dateString) return null

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const eventDate = new Date(dateString)
  eventDate.setHours(0, 0, 0, 0)

  const diffTime = eventDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

// Datos de ejemplo para eventos
const eventsData = [
  {
    id: "EVT-2025-01",
    name: "Festival de Cerveza Artesanal",
    type: "Festival",
    startDate: "2025-05-15",
    endDate: "2025-05-17",
    daysLeft: getDaysLeft("2025-05-15"),
    location: "Caracas",
    venue: "Plaza Los Palos Grandes",
    capacity: 2000,
    attendance: 0,
    ticketsSold: 1450,
    ticketSalesVsTarget: 12,
    sales: 0,
    status: "Programado",
    isPaid: true,
    ticketPrice: 50,
    description:
      "Gran festival de cerveza artesanal con más de 30 expositores nacionales e internacionales. Disfruta de música en vivo, gastronomía y las mejores cervezas artesanales del país.",
    organizer: "Asociación de Cerveceros Artesanales",
    contactEmail: "info@festivalcerveza.com",
    contactPhone: "+58 212-555-1234",
  },
  {
    id: "EVT-2025-02",
    name: "Cata de Cervezas Premium",
    type: "Cata",
    startDate: "2025-05-22",
    endDate: "2025-05-22",
    daysLeft: getDaysLeft("2025-05-22"),
    location: "Caracas",
    venue: "Hotel Eurobuilding",
    capacity: 50,
    attendance: 0,
    ticketsSold: 32,
    ticketSalesVsTarget: 5,
    sales: 0,
    status: "Programado",
    isPaid: true,
    ticketPrice: 75,
    description:
      "Exclusiva cata de cervezas premium dirigida por maestros cerveceros. Incluye degustación de 10 variedades de cervezas premium y maridaje con quesos y embutidos selectos.",
    organizer: "Premium Brews",
    contactEmail: "catas@premiumbrews.com",
    contactPhone: "+58 212-555-5678",
  },
  {
    id: "EVT-2025-03",
    name: "Lanzamiento Cerveza Edición Especial",
    type: "Lanzamiento",
    startDate: "2025-05-28",
    endDate: "2025-05-28",
    daysLeft: getDaysLeft("2025-05-28"),
    location: "Caracas",
    venue: "Centro Comercial Sambil",
    capacity: 100,
    attendance: 0,
    ticketsSold: 78,
    ticketSalesVsTarget: 15,
    sales: 0,
    status: "Programado",
    isPaid: false,
    ticketPrice: 0,
    description:
      "Presentación oficial de nuestra nueva cerveza de edición especial. Evento gratuito con degustación y promociones especiales por lanzamiento.",
    organizer: "Cervecería Nacional",
    contactEmail: "eventos@cervecerianacional.com",
    contactPhone: "+58 212-555-9012",
  },
  {
    id: "EVT-2025-04",
    name: "Taller de Elaboración de Cerveza",
    type: "Taller",
    startDate: "2025-04-21",
    endDate: "2025-04-21",
    daysLeft: 0, // Hoy
    location: "Caracas",
    venue: "Centro Cultural BOD",
    capacity: 30,
    attendance: 28,
    ticketsSold: 30,
    ticketSalesVsTarget: 20,
    sales: 4500,
    status: "Activo",
    isPaid: true,
    ticketPrice: 100,
    description:
      "Taller práctico donde aprenderás los fundamentos de la elaboración de cerveza casera. Incluye materiales y equipo para elaborar tu propia cerveza.",
    organizer: "Craft Beers Co.",
    contactEmail: "talleres@craftbeers.com",
    contactPhone: "+58 212-555-3456",
  },
]

// Add this after the eventsData array
const sampleClients = [
  {
    id: "CLI-001",
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    phone: "+58 412-555-1234",
    tickets: 2,
    ticketType: "VIP",
    status: "Confirmado"
  },
  {
    id: "CLI-002",
    name: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+58 414-555-5678",
    tickets: 1,
    ticketType: "General",
    status: "Confirmado"
  },
  {
    id: "CLI-003",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    phone: "+58 416-555-9012",
    tickets: 4,
    ticketType: "General",
    status: "Pendiente"
  }
]

// Datos de ejemplo para proveedores
const sampleProviders = [
  {
    id: "1",
    name: "Cervecería Artesanal La Lupulada",
    type: "Cervecería",
    contact: "Alejandro Martínez",
    status: "Activo",
    email: "contacto@lalupulada.com",
    phone: "1234567890",
    products: "Equipos de cervecería artesanal y suministros"
  },
  {
    id: "2",
    name: "Maltas y Lúpulos Premium",
    type: "Insumos",
    contact: "Laura Sánchez",
    status: "Activo",
    email: "ventas@maltasylupulos.com",
    phone: "0987654321",
    products: "Maltas, lúpulos y levaduras de alta calidad"
  }
]

// Datos de ejemplo para talleres y ponencias
const sampleTalleresPonencias = [
  {
    id: "1",
    type: "Taller",
    title: "Elaboración de Cerveza IPA",
    description: "Aprende a elaborar una India Pale Ale desde cero, con técnicas avanzadas de lupulización",
    providerId: "1",
    date: "2024-06-15",
    time: "10:00",
    duration: "180"
  },
  {
    id: "2",
    type: "Ponencia",
    title: "Selección de Maltas y Lúpulos",
    description: "Conoce las diferentes variedades de maltas y lúpulos y cómo afectan al perfil de tu cerveza",
    providerId: "2",
    date: "2024-06-16",
    time: "14:00",
    duration: "90"
  }
]

// Función para calcular el porcentaje de asistencia
const calculateAttendancePercentage = (attendance: number, capacity: number): number => {
  if (capacity === 0) return 0
  const percentage = (Number(attendance) / Number(capacity)) * 100
  return Math.round(percentage)
}

// Función para calcular el porcentaje de ventas
const calculateSalesPercentage = (sold: number, total: number): number => {
  if (total === 0) return 0
  const percentage = (Number(sold) / Number(total)) * 100
  return Math.round(percentage)
}

// Función para formatear la duración
const formatDuration = (duration: string): string => {
  const minutes = Number(duration)
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}m`
}
