'use server';

import { llamarFuncion, llamarFuncionSingle } from "@/lib/server-actions";

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

type EfectivoDetailsWithBreakdown = {
  breakdown: { [value: string]: number };
  currency: 'bolivares' | 'dolares' | 'euros';
};

// TarjetaDetails is simplified as we get all data from the form
type TarjetaParams = {
  tipo_tarjeta?: string; // e.g., 'Visa', 'Mastercard'. Only for credit.
  numero: number;
  banco: string;
  fecha_vencimiento: string; // YYYY-MM-DD format
};

type ChequeParams = {
  numeroCheque: number;
  banco: string;
};

type MetodoPagoParams =
  | { tipo: 'efectivo'; details: EfectivoDetailsWithBreakdown }
  | { tipo: 'punto'; details: {} }
  | { tipo: 'tarjeta_credito'; details: TarjetaParams }
  | { tipo: 'tarjeta_debito'; details: TarjetaParams }
  | { tipo: 'cheque'; details: ChequeParams };

/**
 * Obtiene los métodos de pago de un cliente por su ID de usuario.
 * @param usuarioId - El ID del usuario.
 * @returns MetodoPagoCliente[] | null - Array de métodos de pago o null si hay error.
 */
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
    // Note: toast is a client-side hook, so we don't use it in server actions
    return null;
  }
}

/**
 * Crea un nuevo método de pago en la base de datos.
 * Llama a la función de base de datos apropiada según el tipo de método de pago.
 * @param params - Un objeto que contiene el tipo de método de pago y los detalles necesarios.
 * @param p_id_cliente - El ID del cliente.
 * @param p_tipo_cliente - El tipo de cliente ('Natural' o 'Juridico').
 * @returns number[] | number | null - El ID del método de pago recién creado o null si hay un error.
 */
export async function crearMetodoPago(
  params: MetodoPagoParams,
  p_id_cliente: number,
  p_tipo_cliente: string
): Promise<number[] | number | null> {
  try {
    if (params.tipo === 'efectivo') {
      const ids: number[] = [];
      const { breakdown, currency } = params.details;

      const currencyCode = {
        bolivares: "VES",
        dolares: "USD",
        euros: "EUR",
      }[currency];

      for (const denominacion of Object.keys(breakdown)) {
        const cantidad = breakdown[denominacion];

        for (let i = 0; i < cantidad; i++) {
          const result = await llamarFuncionSingle<{ nuevo_metodo_id: number }>(
            'fn_create_metodo_pago_efectivo',
            {
              p_id_cliente,
              p_tipo_cliente,
              p_denominacion: `${denominacion} ${currencyCode}`,
            }
          );

          if (Array.isArray(result) && result.length > 0 && result[0].nuevo_metodo_id) {
            ids.push(result[0].nuevo_metodo_id);
          } else if (result && typeof result === 'object' && 'nuevo_metodo_id' in result) {
            ids.push((result as { nuevo_metodo_id: number }).nuevo_metodo_id);
          }
        }
      }
      return ids;
    }

    let result: any; // Use 'any' to handle the potentially array-like response
    let fn_name = '';
    let fn_params = {};

    switch (params.tipo) {
      case 'punto':
        fn_name = 'fn_create_metodo_pago_punto';
        fn_params = { p_id_cliente, p_tipo_cliente };
        break;

      case 'tarjeta_credito':
        fn_name = 'fn_create_metodo_pago_tarjeta_credito';
        fn_params = {
          p_id_cliente,
          p_tipo_cliente,
          p_tipo_tarjeta: params.details.tipo_tarjeta,
          p_numero: params.details.numero,
          p_banco: params.details.banco,
          p_fecha_vencimiento: params.details.fecha_vencimiento,
        };
        break;

      case 'tarjeta_debito':
        fn_name = 'fn_create_metodo_pago_tarjeta_debito';
        fn_params = {
          p_id_cliente,
          p_tipo_cliente,
          p_numero: params.details.numero,
          p_banco: params.details.banco,
          p_fecha_vencimiento: params.details.fecha_vencimiento,
        };
        break;

      case 'cheque':
        fn_name = 'fn_create_metodo_pago_cheque';
        fn_params = {
          p_id_cliente,
          p_tipo_cliente,
          p_numero_cheque: params.details.numeroCheque,
          p_banco: params.details.banco,
        };
        break;

      default:
        // This case is for exhaustiveness checking with TypeScript
        const exhaustiveCheck: never = params;
        throw new Error(`Tipo de método de pago no válido: ${(exhaustiveCheck as any).tipo}`);
    }

    result = await llamarFuncionSingle<{ nuevo_metodo_id: number }>(fn_name, fn_params);
    
    // The function now returns an array with one object, e.g., [{ nuevo_metodo_id: 123 }]
    // We need to extract the object from the array.
    if (Array.isArray(result) && result.length > 0) {
      return result[0].nuevo_metodo_id ?? null;
    }
    
    // Fallback for an unexpected response format
    if (result && typeof result === 'object' && 'nuevo_metodo_id' in result) {
      return (result as { nuevo_metodo_id: number }).nuevo_metodo_id;
    }

    return null;

  } catch (error) {
    console.error(`Error al crear el método de pago:`, error);
    const message = error instanceof Error ? error.message : 'Ocurrió un error desconocido.';
    throw new Error(`Ocurrió un error al intentar crear el método de pago: ${message}`);
  }
}

/**
 * Crea un método de pago para una venta de evento.
 * TODO: Implementar la lógica real para crear método de pago para venta de evento.
 * @param params - Parámetros del método de pago.
 * @param ventaId - El ID de la venta de evento.
 * @returns number | number[] | null - El ID del método de pago creado o null.
 */
export async function crearMetodoPagoEvento(params: any, ventaId: number): Promise<number | number[] | null> {
  // TODO: Lógica real para crear método de pago para venta de evento
  // Ejemplo: llamarFuncion('fn_create_metodo_pago_evento', { ...params, p_venta_id: ventaId })
  return null;
}

