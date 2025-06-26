import { llamarFuncionSingle } from "@/lib/server-actions";

type EfectivoDetails = {
  denominacion: string; // Ejemplo 10 USD
};

// TarjetaDetails is simplified as we get all data from the form
type TarjetaParams = {
  tipo_tarjeta?: string; // e.g., 'Visa', 'Mastercard'. Only for credit.
  numero: number;
  banco: string;
  fecha_vencimiento: string; // YYYY-MM-DD format
};

type MetodoPagoParams =
  | { tipo: 'efectivo'; details: EfectivoDetails }
  | { tipo: 'punto'; details: {} }
  | { tipo: 'tarjeta_credito'; details: TarjetaParams }
  | { tipo: 'tarjeta_debito'; details: TarjetaParams };

/**
 * Crea un nuevo método de pago en la base de datos.
 * Llama a la función de base de datos apropiada según el tipo de método de pago.
 * @param params - Un objeto que contiene el tipo de método de pago y los detalles necesarios.
 * @returns number | null - El ID del método de pago recién creado o null si hay un error.
 */
export async function crearMetodoPago(
  params: MetodoPagoParams,
  p_id_cliente: number,
  p_tipo_cliente: string
): Promise<number | null> {
  try {
    let result: any; // Use 'any' to handle the potentially array-like response
    let fn_name = '';
    let fn_params = {};

    switch (params.tipo) {
      case 'efectivo':
        fn_name = 'fn_create_metodo_pago_efectivo';
        fn_params = {
          p_id_cliente,
          p_tipo_cliente,
          p_denominacion: params.details.denominacion,
        };
        break;
      
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