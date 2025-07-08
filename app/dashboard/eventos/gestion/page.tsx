import EventsPage from "@/components/eventos/events-page";
import ProtectedRoute from "@/components/auth/protected-route";
import { llamarFuncion } from "@/lib/server-actions";
import { Evento, TipoEvento } from "@/models/evento";

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
    <ProtectedRoute requiredPermissions={["leer_evento"]} redirectTo="/unauthorized">
      <EventsPage eventos={eventosData} tiposEvento={tiposData} />
    </ProtectedRoute>
  );
}