import { llamarFuncion } from "@/lib/server-actions";
import { toast } from "@/hooks/use-toast";

export interface MetodoPagoCliente {
  id: number;
  fk_metodo_pago: number;
  fk_cliente_natural: number | null;
  fk_cliente_juridico: number | null;
  tipo_cliente: string;
  tipo_pago: "tarjeta_credito" | "tarjeta_debito";
  numero_tarjeta: number;
  banco: string;
  fecha_vencimiento: string; // Dates are returned as strings
}

export async function getMetodosDePago(
  usuarioId: number
): Promise<MetodoPagoCliente[] | null> {
  try {
    const data = await llamarFuncion(
      "fn_get_cliente_metodo_pago_by_usuario_id",
      {
        p_usuario_id: usuarioId,
      }
    );

    if (!data) {
      console.log("El usuario no tiene métodos de pago de tarjeta guardados.");
      return [];
    }

    console.log("Metodos de pago del usuario (solo tarjetas):", data);
    return data as MetodoPagoCliente[];
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    toast({
      title: "Error",
      description: "No se pudieron obtener los métodos de pago del usuario.",
      variant: "destructive",
    });
    return null;
  }
} 