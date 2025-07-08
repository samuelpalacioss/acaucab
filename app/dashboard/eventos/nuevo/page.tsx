import NewEventPage from "@/components/eventos/new-event-page";
import ProtectedRoute from "@/components/auth/protected-route";
import { llamarFuncion } from "@/lib/server-actions";
import { Evento, TipoEvento } from "@/models/evento";

export default async function NewEventoPage() {


  return (
    <ProtectedRoute requiredPermissions={["crear_evento"]} redirectTo="/unauthorized">
      <NewEventPage/>
    </ProtectedRoute>
  );
}