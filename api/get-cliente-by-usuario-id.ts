import { llamarFuncion } from "@/lib/server-actions";
import { ClienteType } from "@/lib/schemas";

/**
 * Obtiene los datos completos de un cliente (natural o jurídico) a partir de su ID de usuario.
 * @param p_usuario_id - El ID del usuario.
 * @returns {Promise<ClienteType | null>} - Los datos del cliente o null si no se encuentra.
 */
export async function getClienteByUsuarioId(
  p_usuario_id: number
): Promise<ClienteType | null> {
  try {
    const response = await llamarFuncion("fn_get_cliente_by_usuario_id", {
      p_usuario_id,
    });

    if (Array.isArray(response) && response.length > 0) {
      return response[0] as ClienteType;
    }

    return null;
  } catch (error) {
    console.error("Error al obtener los datos del cliente:", error);
    throw new Error("Ocurrió un error al intentar obtener los datos del cliente.");
  }
} 