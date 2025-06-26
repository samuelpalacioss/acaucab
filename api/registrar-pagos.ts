import { llamarFuncionSingle } from "@/lib/server-actions";
import { PaymentMethod } from "@/lib/schemas";
import { getUltimaTasaByMoneda } from "./get-ultima-tasa-by-moneda";

/**
 * Registra múltiples pagos asociados a una venta en la base de datos.
 * Itera sobre los métodos de pago, obtiene la tasa de cambio correcta para cada uno
 * y llama a una función de base de datos para registrar el pago.
 *
 * @param pagos - Un array de objetos PaymentMethod, cada uno con detalles del pago.
 * @param ventaId - El ID de la venta a la que se asocian los pagos.
 * @returns - Una promesa que resuelve a `true` si todos los pagos se crearon exitosamente, o `false` si hubo un error.
 */
export async function registrarPagos(
  pagos: PaymentMethod[],
  ventaId: number
): Promise<boolean> {
  try {
    if (pagos.length === 0) {
      console.warn("No hay pagos para registrar.");
      return true; // No es un error si no hay pagos
    }

    // Iterar sobre cada pago y llamar a la función de la base de datos individualmente
    for (const pago of pagos) {
      const details = pago.details as any; // Usamos 'any' para acceder a propiedades dinámicas

      if (!details.metodo_pago_id) {
        throw new Error(
          `El método de pago ${pago.method} no tiene un ID de método de pago asociado.`
        );
      }

      // Determinar la moneda y obtener la tasa de cambio
      let moneda = "VES"; // Moneda por defecto para pagos que no son en efectivo.
      if (pago.method === "efectivo" && details.currency) {
        if (details.currency === "dolares") {
          moneda = "USD";
        } else if (details.currency === "euros") {
          moneda = "EUR";
        }
        // Si es 'bolivares', el valor de 'moneda' se mantiene como 'VES'.
      }

      const tasa = await getUltimaTasaByMoneda(moneda);
      if (!tasa) {
        throw new Error(`No se pudo encontrar una tasa de cambio activa para ${moneda}`);
      }
      
      const params = {
        p_monto: details.amountPaid,
        p_fecha_pago: new Date().toISOString(),
        p_fk_tasa: tasa.id,
        p_fk_venta: ventaId,
        p_fk_cliente_metodo_pago_1: details.metodo_pago_id,
      };

      await llamarFuncionSingle("fn_create_pago_cliente", params);
    }

    console.log(
      `Se procesó el registro de ${pagos.length} pagos para la venta ${ventaId}.`
    );
    return true;
  } catch (error) {
    console.error("Error al registrar los pagos:", error);
    return false;
  }
} 