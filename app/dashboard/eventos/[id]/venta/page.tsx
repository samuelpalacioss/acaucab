import VentaEnEvento from "@/components/eventos/venta-en-evento";
import ProtectedRoute from "@/components/auth/protected-route";


export default async function NewEventoPage() {


  return (
    <ProtectedRoute requiredPermissions={["leer_evento"]} redirectTo="/unauthorized">
      <VentaEnEvento />
    </ProtectedRoute>
  );
}