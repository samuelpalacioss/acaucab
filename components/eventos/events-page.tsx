"use client"

import { useState, useEffect, useMemo } from "react"
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
  Trash,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProtectedRoute from "@/components/auth/protected-route";
import { usePermissions, useUser } from "@/store/user-store";
import type { Evento, TipoEvento } from "@/models/evento"
import { llamarFuncion } from "@/lib/server-actions";

interface EventsPageProps {
  eventos: Evento[]
  tiposEvento: TipoEvento[]
}

function calcularStatusEventos(eventos: Evento[]): Evento[] {
  const hoy = new Date()
  return eventos.map((evento) => {
    const fechaInicio = evento.fecha_hora_inicio ? new Date(evento.fecha_hora_inicio) : undefined
    const fechaFin = evento.fecha_hora_fin ? new Date(evento.fecha_hora_fin) : undefined

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
  const { puedeCrearEventos, puedeVerEventos, puedeEditarEventos, puedeEliminarEventos } = usePermissions();
  const { esMiembro, getMiembroInfo } = useUser();
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const [tab, setTab] = useState<"all" | "active" | "upcoming" | "past">("all");
  const [page, setPage] = useState(1);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("all");
  const [precioSeleccionado, setPrecioSeleccionado] = useState<string>("all");
  const [busqueda, setBusqueda] = useState<string>("");
  const [eventosValidados, setEventosValidados] = useState<Evento[]>([]);
  const eventosConStatus = useMemo(() => calcularStatusEventos(eventos), [eventos]);

  // Validación por función SQL para miembros (optimizada: un solo query)
  useEffect(() => {
    const filtrarEventosPorMiembro = async () => {
      const miembro = getMiembroInfo();
      if (!esMiembro() || !miembro) {
        setEventosValidados(eventosConStatus);
        return;
      }
      try {
        const result = await llamarFuncion("fn_exists_miembro_evento", {
          p_id_miembro_1: miembro.rif,
          p_id_miembro_2: miembro.naturaleza_rif,
        });
        const ids = Array.isArray(result) ? result.map((r: any) => r.id_evento) : [];
        setEventosValidados(eventosConStatus.filter(e => ids.includes(e.id)));
      } catch (e) {
        setEventosValidados([]);
      }
    };
    filtrarEventosPorMiembro();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventosConStatus, esMiembro, getMiembroInfo]);

  // Usar eventosValidados si es miembro, si no usar eventosConStatus
  let eventosFiltrados = esMiembro() ? eventosValidados : eventosConStatus;
  // Ya no es necesario el filtro adicional por proveedores aquí, porque la función SQL ya filtra correctamente
  // Determina el status según la pestaña
  const statusMap: Record<string, "Activo" | "Programado" | "Finalizado" | "all"> = {
    all: "all",
    active: "Activo",
    upcoming: "Programado",
    past: "Finalizado",
  };

  // Filtra eventos según la pestaña seleccionada
  eventosFiltrados = filtrarPorStatus(eventosFiltrados, statusMap[tab]);

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

  // Para los cards de resumen y tabs, usar los eventos filtrados y el total
  const totalEventos = eventosConStatus.length;
  const totalFiltrados = eventosFiltrados.length;
  const activosFiltrados = eventosFiltrados.filter((e) => e.status === "Activo").length;
  const programadosFiltrados = eventosFiltrados.filter((e) => e.status === "Programado").length;
  const finalizadosFiltrados = eventosFiltrados.filter((e) => e.status === "Finalizado").length;
  const activosTotales = eventosConStatus.filter((e) => e.status === "Activo").length;
  const programadosTotales = eventosConStatus.filter((e) => e.status === "Programado").length;
  const finalizadosTotales = eventosConStatus.filter((e) => e.status === "Finalizado").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Eventos</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          {puedeCrearEventos() && (
            <Button asChild>
                <Link href="/dashboard/eventos/nuevo">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Evento
                </Link>
            </Button>
        )}
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
            <div className="text-2xl font-bold">{activosFiltrados} <span className="text-xs text-muted-foreground">/ {activosTotales}</span></div>
            <p className="text-xs text-muted-foreground">Eventos en curso actualmente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximos eventos</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{programadosFiltrados} <span className="text-xs text-muted-foreground">/ {programadosTotales}</span></div>
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
              <TabsTrigger value="all">Todos ({totalFiltrados} de {totalEventos})</TabsTrigger>
              <TabsTrigger value="active">
                Activos ({activosFiltrados} de {activosTotales})
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                Próximos ({programadosFiltrados} de {programadosTotales})
              </TabsTrigger>
              <TabsTrigger value="past">
                Pasados ({finalizadosFiltrados} de {finalizadosTotales})
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
                      {
                            (puedeVerEventos()  || puedeEditarEventos() || puedeEliminarEventos()) &&
                            (<TableHead className="text-right">Acciones</TableHead>)
                      }   
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
                                <span>
                                    {event.fecha_hora_inicio
                                    ? new Date(event.fecha_hora_inicio).toLocaleString("es-VE", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                        })
                                    : ""}
                                </span>
                                </div>
                            </div>
                            </TableCell>
                            <TableCell>
                            <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>
                                {event.fecha_hora_fin
                                    ? new Date(event.fecha_hora_fin).toLocaleString("es-VE", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })
                                    : ""}
                                </span>
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
                          {(esMiembro()
                            ? (
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/dashboard/eventos/${event.id}`}>
                                      <Eye className="h-4 w-4" />
                                      <span className="sr-only">Ver</span>
                                    </Link>
                                  </Button>
                                  <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/dashboard/eventos/${event.id}?tab=providers`}>
                                      <Edit className="h-4 w-4" />
                                      <span className="sr-only">Actualizar Stock</span>
                                    </Link>
                                  </Button>
                                </div>
                              </TableCell>
                            )
                            : ((puedeVerEventos()  || puedeEditarEventos() || puedeEliminarEventos()) && (
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  {puedeVerEventos() && (
                                    <Button variant="ghost" size="icon" asChild>
                                      <Link href={`/dashboard/eventos/${event.id}`}>
                                        <Eye className="h-4 w-4" />
                                        <span className="sr-only">Ver</span>
                                      </Link>
                                    </Button>
                                  )}
                                  {puedeEditarEventos() && (
                                    <Button variant="ghost" size="icon" asChild>
                                      <Link href={`/dashboard/eventos/${event.id}/editar`}>
                                        <Edit className="h-4 w-4" />
                                        <span className="sr-only">Editar</span>
                                      </Link>
                                    </Button>
                                  )}
                                  {puedeEliminarEventos() && (
                                    <Button variant="ghost" size="icon" asChild>
                                      <Link href={`/dashboard/eventos/${event.id}/editar`}>
                                        <Trash className="h-4 w-4" />
                                        <span className="sr-only">Eliminar</span>
                                      </Link>
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            )))}
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