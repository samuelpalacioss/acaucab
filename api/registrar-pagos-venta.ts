import { llamarFuncionSingle } from "@/lib/server-actions";
import { PaymentMethod } from "@/lib/schemas";
import { getUltimaTasaByMoneda } from "./get-ultima-tasa-by-moneda";

/**
 * Registra múltiples pagos asociados a una venta de evento en la base de datos.
 * Itera sobre los métodos de pago, obtiene la tasa de cambio correcta para cada uno
 * y llama a una función de base de datos para registrar el pago.
 *
 * @param pagos - Un array de objetos PaymentMethod, cada uno con detalles del pago.
 * @param ventaId - El ID de la venta de evento a la que se asocian los pagos.
 * @returns - Una promesa que resuelve a `true` si todos los pagos se crearon exitosamente, o `false` si hubo un error.
 */
export async function registrarPagosVenta(
  pagos: PaymentMethod[],
  ventaId: number
): Promise<boolean> {
  try {
    if (pagos.length === 0) {
      console.warn("No hay pagos para registrar.");
      return true;
    }

    for (const pago of pagos) {
      const details = pago.details as any;
      if (!details.metodo_pago_id) {
        throw new Error(
          `El método de pago ${pago.method} no tiene un ID de método de pago asociado.`
        );
      }

      // Manejo especial para pago con puntos en evento
      if (pago.method === "puntos") {
        const puntosUtilizados = details.puntosUtilizados;
        if (typeof puntosUtilizados !== "number" || puntosUtilizados <= 0) {
          console.warn("No se utilizaron puntos o el valor es inválido, saltando pago de puntos.");
          continue;
        }
        const tasaPunto = await getUltimaTasaByMoneda("Punto");
        if (!tasaPunto) {
          throw new Error(`No se pudo encontrar una tasa de cambio activa para 'Punto' (evento)`);
        }
        for (let i = 0; i < puntosUtilizados; i++) {
          const params = {
            p_monto: tasaPunto.monto_equivalencia,
            p_fecha_pago: new Date().toISOString(),
            p_fk_tasa: tasaPunto.id,
            p_fk_venta: ventaId,
            p_fk_cliente_metodo_pago_1: details.metodo_pago_id,
          };
          await llamarFuncionSingle("fn_registrar_pago_venta_evento", params);
        }
        continue;
      }

      let moneda = "VES";
      if (pago.method === "efectivo" && details.currency) {
        if (details.currency === "dolares") {
          moneda = "USD";
        } else if (details.currency === "euros") {
          moneda = "EUR";
        }
      }
      const tasa = await getUltimaTasaByMoneda(moneda);
      if (!tasa) {
        throw new Error(`No se pudo encontrar una tasa de cambio activa para ${moneda} (evento)`);
      }
      const params = {
        p_monto: details.amountPaid,
        p_fecha_pago: new Date().toISOString(),
        p_fk_tasa: tasa.id,
        p_fk_venta: ventaId, // corregido: debe ser p_fk_venta
        p_fk_cliente_metodo_pago_1: details.metodo_pago_id,
      };
      await llamarFuncionSingle("fn_registrar_pago_venta_evento", params);
    }
    console.log(`Se procesó el registro de ${pagos.length} pagos para la venta de evento ${ventaId}.`);
    return true;
  } catch (error) {
    // Solo relanza el error tal cual, sin formatear
    throw error;
  }
}
