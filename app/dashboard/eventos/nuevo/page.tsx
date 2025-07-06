import NewEventPage from "@/components/eventos/new-event-page";
import ProtectedRoute from "@/components/auth/protected-route";
import { llamarFuncion } from "@/lib/server-actions";
import { Evento, TipoEvento } from "@/models/evento";

export default async function NewEventoPage() {
  let eventosData: Evento[] = [];
  let tiposData: TipoEvento[] = [];

  try {

  } catch (error: any) {
    console.error("❌ Error al obtener datos de eventos:", error.message);
  }

  return (
    <ProtectedRoute requiredPermissions={["crear_evento"]} redirectTo="/unauthorized">
      <NewEventPage/>
    </ProtectedRoute>
  );
}