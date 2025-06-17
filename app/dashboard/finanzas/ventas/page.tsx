import VentasClient from "@/components/ventas/ventas-client";
/**
 * Página de ventas (Server Component)
 *
 * Este componente servidor actúa como el punto de entrada para
 * la gestión de ventas. Aquí se pueden realizar operaciones del
 * servidor antes de pasar los datos al componente cliente.
 */
export default async function VentasPage() {
  return (
    <main id="ventas-page" className="min-h-screen">
      {/* 
        Componente cliente que maneja toda la interfaz de usuario
        de ventas y las interacciones del usuario 
      */}
      <VentasClient />
    </main>
  );
}
