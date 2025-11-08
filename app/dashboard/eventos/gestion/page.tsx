import EventsPage from "@/components/eventos/events-page";
import ProtectedRoute from "@/components/auth/protected-route";
import { llamarFuncion } from "@/lib/server-actions";
import { Evento, TipoEvento } from "@/models/evento";

// Force dynamic rendering since this page uses cookies
export const dynamic = 'force-dynamic';

export default async function EventosPage() {
  let eventosData: Evento[] = [];
  let tiposData: TipoEvento[] = [];

  try {
    eventosData = await llamarFuncion<Evento>("fn_get_all_eventos");
    tiposData = await llamarFuncion<TipoEvento>("fn_get_tipos_eventos");
  } catch (error: any) {
    console.error("❌ Error al obtener datos de eventos:", error.message);
  }

  return (
      <EventsPage eventos={eventosData} tiposEvento={tiposData} />
  );
}