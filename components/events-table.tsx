"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    name: "Festival de Cerveza Artesanal",
    date: "15/05/2025",
    capacity: 200,
    sold: 145,
  },
  {
    id: 2,
    name: "Cata de Cervezas Premium",
    date: "22/05/2025",
    capacity: 50,
    sold: 32,
  },
  {
    id: 3,
    name: "Lanzamiento Cerveza Edición Especial",
    date: "28/05/2025",
    capacity: 100,
    sold: 78,
  },
]

export function EventsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Evento</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Cupo</TableHead>
          <TableHead className="text-right">Vendido</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">{event.name}</TableCell>
            <TableCell>{event.date}</TableCell>
            <TableCell>{event.capacity}</TableCell>
            <TableCell className="text-right">
              {event.sold}
              <Badge variant="outline" className="ml-2">
                {Math.round((event.sold / event.capacity) * 100)}%
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
