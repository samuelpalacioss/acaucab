import EventDetailPage from "@/components/eventos/event-detail";
import ProtectedRoute from "@/components/auth/protected-route";


export default async function NewEventoPage() {


  return (
    <ProtectedRoute requiredPermissions={["leer_evento"]} redirectTo="/unauthorized">
      <EventDetailPage />
    </ProtectedRoute>
  );
}