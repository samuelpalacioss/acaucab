"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import Link from "next/link"
import {
  Search,
  Plus,
  Filter,
  Calendar,
  MapPin,
  Ticket,
  CreditCard,
  Eye,
  Edit,
  Clock,
  CalendarCheck,
  CalendarClock,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { Evento, TipoEvento } from "@/models/evento"

interface EventsPageProps {
  eventos: Evento[]
  tiposEvento: TipoEvento[]
}

function calcularStatusEventos(eventos: Evento[]): Evento[] {
  const hoy = new Date()
  return eventos.map((evento) => {
    const fechaInicio = evento.fecha_inicio ? new Date(evento.fecha_inicio) : undefined
    const fechaFin = evento.fecha_fin ? new Date(evento.fecha_fin) : undefined

    let status: "Activo" | "Programado" | "Finalizado"

    if (fechaInicio && fechaInicio > hoy) {
      status = "Programado"
    } else if (fechaFin && fechaFin < hoy) {
      status = "Finalizado"
    } else {
      status = "Activo"
    }

    return { ...evento, status }
  })
}

const PAGE_SIZE = 20;

function filtrarPorStatus(eventos: Evento[], status: "Activo" | "Programado" | "Finalizado" | "all") {
  if (status === "all") return eventos;
  return eventos.filter(e => e.status === status);
}

export default function EventsPage({ eventos, tiposEvento }: EventsPageProps) {
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const [tab, setTab] = useState<"all" | "active" | "upcoming" | "past">("all");
  const [page, setPage] = useState(1);

  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("all");
  const [precioSeleccionado, setPrecioSeleccionado] = useState<string>("all");
 const [busqueda, setBusqueda] = useState<string>("");

  const eventosConStatus = calcularStatusEventos(eventos);

  // Determina el status según la pestaña
  const statusMap: Record<string, "Activo" | "Programado" | "Finalizado" | "all"> = {
    all: "all",
    active: "Activo",
    upcoming: "Programado",
    past: "Finalizado",
  };

  // Filtra eventos según la pestaña seleccionada
  let eventosFiltrados = filtrarPorStatus(eventosConStatus, statusMap[tab]);

  // FILTRO POR TIPO DE EVENTO
  if (tipoSeleccionado !== "all") {
    eventosFiltrados = eventosFiltrados.filter(e => e.tipo === tipoSeleccionado);
  }

  // FILTRO POR PRECIO
  if (precioSeleccionado === "free") {
    eventosFiltrados = eventosFiltrados.filter(e => !e.precio_entrada || e.precio_entrada === 0);
  } else if (precioSeleccionado === "paid") {
    eventosFiltrados = eventosFiltrados.filter(e => e.precio_entrada && e.precio_entrada > 0);
  }

  // FILTRO POR BÚSQUEDA
  if (busqueda.trim() !== "") {
    const texto = busqueda.trim().toLowerCase();
    eventosFiltrados = eventosFiltrados.filter(e =>
      e.nombre.toLowerCase().includes(texto) ||
      e.tipo.toLowerCase().includes(texto) ||
      (e.direccion?.toLowerCase().includes(texto) ?? false)
    );
  }
  const totalPages = Math.ceil(eventosFiltrados.length / PAGE_SIZE);

  // Paginación
  const eventosPagina = eventosFiltrados.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Cambia de pestaña y resetea la página
  const handleTabChange = (value: string) => {
    setTab(value as "all" | "active" | "upcoming" | "past");
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Eventos</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button asChild>
            <Link href="/dashboard/eventos/nuevo">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Evento
            </Link>
          </Button>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos activos</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventosConStatus.filter((e) => e.status === "Activo").length}</div>
            <p className="text-xs text-muted-foreground">Eventos en curso actualmente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximos eventos</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventosConStatus.filter((e) => e.status === "Programado").length}</div>
            <p className="text-xs text-muted-foreground">Eventos programados para los próximos 30 días</p>
          </CardContent>
        </Card>

      </div>

      {/* Filtros y Tabla */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Todos los Eventos</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar eventos..."
                  className="pl-8"
                  value={busqueda}
                  onChange={e => {
                    setBusqueda(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
              <DateRangePicker date={date} setDate={setDate} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={tab} onValueChange={handleTabChange}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todos ({eventosConStatus.length})</TabsTrigger>
              <TabsTrigger value="active">
                Activos ({eventosConStatus.filter((e) => e.status === "Activo").length})
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                Próximos ({eventosConStatus.filter((e) => e.status === "Programado").length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Pasados ({eventosConStatus.filter((e) => e.status === "Finalizado").length})
              </TabsTrigger>
            </TabsList>

            {/* Contenido de la pestaña actual */}
            <TabsContent value={tab} className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Select
                    value={tipoSeleccionado}
                    onValueChange={value => {
                      setTipoSeleccionado(value);
                      setPage(1);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo de evento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los tipos</SelectItem>
                      {tiposEvento.map((tipo) => (
                        <SelectItem key={tipo.nombre} value={tipo.nombre}>
                          {tipo.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={precioSeleccionado}
                    onValueChange={value => {
                      setPrecioSeleccionado(value);
                      setPage(1);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Precio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="free">Gratuitos</SelectItem>
                      <SelectItem value="paid">De pago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fecha Inicio</TableHead>
                      <TableHead>Fecha Fin</TableHead>
                      <TableHead>Locación</TableHead>
                      <TableHead>Tickets vendidos</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eventosPagina.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground">
                          No hay eventos para mostrar.
                        </TableCell>
                      </TableRow>
                    ) : (
                      eventosPagina.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>
                            <Link
                              href={`/dashboard/eventos/${event.id}`}
                              className="text-blue-600 hover:underline font-medium"
                            >
                              {event.nombre}
                            </Link>
                            {typeof event.precio_entrada === "number" && event.precio_entrada > 0 && (
                              <Badge variant="outline" className="ml-2">
                                De pago
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{event.tipo}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{event.fecha_inicio instanceof Date ? event.fecha_inicio.toLocaleDateString() : event.fecha_inicio}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{event.fecha_fin instanceof Date ? event.fecha_fin.toLocaleDateString() : event.fecha_fin}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{event.direccion}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div>{event.entradas_vendidas?.toLocaleString?.() ?? 0}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/dashboard/eventos/${event.id}`}>
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">Ver</span>
                                </Link>
                              </Button>
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/dashboard/eventos/${event.id}/editar`}>
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Editar</span>
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Paginación */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Mostrando {(eventosFiltrados.length === 0) ? 0 : ((page - 1) * PAGE_SIZE + 1)}-
                  {Math.min(page * PAGE_SIZE, eventosFiltrados.length)} de {eventosFiltrados.length} eventos
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Anterior
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      variant={page === i + 1 ? "default" : "outline"}
                      size="sm"
                      className="px-3"
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages || totalPages === 0}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}