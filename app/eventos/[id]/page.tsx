import { events } from "../page";
import Link from "next/link";
import { MapPin, Clock, Users, ArrowLeft, Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const eventId = Number.parseInt(params.id);
  const event = events.find((event) => event.id === eventId);
  if (!event) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Evento no encontrado</h1>
        <Link href="/eventos" className="text-blue-600 hover:underline">
          Volver al calendario de eventos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 bg-white text-black">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al calendario de eventos
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>

          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-gray-600" />
            <span>
              {event.location} - {event.direccion}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-600" />
            <span>
              {event.date} | {event.time}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <Badge variant="outline" className="bg-gray-100 text-gray-800 mb-2">
            {event.categorias.map((categoria, index) => (
              <span key={index} className="mr-2">
                {categoria}
                {index < event.categorias.length - 1 ? " | " : ""}
              </span>
            ))}
          </Badge>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Detalles del evento</h2>
          <p className="text-gray-700 mb-4">{event.description}</p>

          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-gray-600" />
            <span className="font-medium">Capacidad:</span> {event.capacity}
          </div>
          <p className="font-medum flex items-center gap-2">
            <Ticket className="h-5 w-5 text-gray-600" /> Entrada:{" "}
            {event.precio === 0 ? "Gratis" : `$${event.precio}`}
          </p>
          <p className="text-gray-600 italic mt-4">Nota: {event.notes}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Aliados presentes:</h2>
          <ul className="list-disc">
            {event.marcas.map((marca, index) => (
              <li key={index} className="text-gray-700 inline-block mr-4">
                • {marca}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Ubicación</h2>
          <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Mapa de ubicación</p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button className="bg-black text-white hover:bg-gray-800">Comprar Entradas</Button>
        </div>
      </div>
    </div>
  );
}
