'use server';

import { llamarFuncion, llamarFuncionSingle } from "@/lib/server-actions";
import { CarritoItemType, CarritoItemEventoType, PaymentMethod } from "@/lib/schemas";
import { VentaByIdResponse, VentaDetalleExpansida, transformarVentaByIdResponse } from "@/models/venta";
import { getUltimaTasaByMoneda } from "./tasas";

/**
 * Registra una nueva venta con el estado 'En Proceso'.
 * 
 * @param id - El ID del cliente o del usuario.
 * @param type - Especifica si el ID corresponde a un 'cliente' o a un 'usuario'.
 * @param {object} [options] - Opciones para especificar la tienda.
 * @param {number} [options.p_tienda_fisica_id=1] - El ID de la tienda física.
 * @param {number} [options.p_tienda_web_id] - El ID de la tienda web.
 * @returns number | null - El ID de la venta recién creada o null si hay un error.
 */
export async function registrarVentaEnProceso(
  id: number,
  type: 'cliente' | 'usuario',
  options: { p_tienda_fisica_id?: number; p_tienda_web_id?: number } = {}
): Promise<number | null> {
    try {
        const params: {
            p_usuario_id: number | null;
            p_cliente_id: number | null;
            p_tienda_fisica_id: number | null;
            p_tienda_web_id: number | null;
        } = {
            p_usuario_id: null,
            p_cliente_id: null,
            p_tienda_fisica_id: null,
            p_tienda_web_id: null,
        };

        if (type === 'usuario' && options.p_tienda_web_id) {
            params.p_usuario_id = id;
            params.p_tienda_web_id = options.p_tienda_web_id;
        } else if (type === 'cliente') {
            params.p_cliente_id = id;
            params.p_tienda_fisica_id = options.p_tienda_fisica_id || 1;
        } else {
            throw new Error("Parámetros inválidos para registrar la venta. Se requiere tipo 'usuario' para tienda web o 'cliente' para tienda física.");
        }

        const result = await llamarFuncionSingle<{ id_venta: number }>('fn_registrar_venta_en_proceso', params);

        const ventaId = result?.id_venta ?? null;

        if (ventaId) {
          console.log(`Venta en proceso registrada con ID: ${ventaId} para ${type === 'usuario' ? 'tienda web' : 'tienda física'}`);
        }

        return ventaId;

    } catch (error) {
        console.error(`Error al registrar la venta en proceso:`, error);
        throw new Error('Ocurrió un error al intentar registrar la venta.');
    }
}

/**
 * Registra una nueva venta de evento con el estado 'En Proceso'.
 * @param eventoId - El ID del evento.
 * @param clienteId - El ID del cliente.
 * @param tipoCliente - El tipo de cliente ('Natural' o 'Juridico').
 * @returns number | null - El ID de la venta recién creada o null si hay un error.
 */
export async function registrarVentaEventoEnProceso(
  eventoId: number,
  clienteId: number,
  tipoCliente: 'Natural' | 'Juridico'
): Promise<number | null> {
  try {
    const params = {
      p_evento_id: eventoId,
      p_cliente_id: clienteId,
      p_tipo_cliente: tipoCliente,
    };
    const result = await llamarFuncionSingle<{ id_venta: number }>(
      'fn_registrar_venta_evento_en_proceso',
      params
    );
    const ventaId = result?.id_venta ?? null;
    if (ventaId) {
      console.log(`Venta de evento registrada con ID: ${ventaId}`);
    }
    return ventaId;
  } catch (error) {
    console.error(`Error al registrar la venta de evento:`, error);
    throw new Error('Ocurrió un error al intentar registrar la venta de evento.');
  }
}

/**
 * Registra los detalles de una venta en proceso.
 * @param ventaId - El ID de la venta.
 * @param carrito - Array de items del carrito.
 * @returns boolean - true si se registraron correctamente.
 */
export async function registrarDetallesVentaEnProceso(
  ventaId: number,
  carrito: CarritoItemType[]
): Promise<boolean> {
  if (!ventaId) {
    console.error("ID de venta inválido.");
    return false;
  }

  try {
    // Primero, limpiar los detalles existentes para esta venta
    await llamarFuncion("fn_limpiar_detalles_venta", { p_venta_id: ventaId });

    // Si el carrito está vacío, no hay nada más que hacer
    if (!carrito || carrito.length === 0) {
      console.log(`No hay items en el carrito para la venta ID: ${ventaId}. Detalles limpiados.`);
      return true;
    }
    
    console.log(
      `Registrando ${carrito.length} tipos de items para la venta ID: ${ventaId}`
    );

    // Luego, registrar los nuevos detalles
    for (const item of carrito) {
      await llamarFuncion(
        "fn_registrar_detalle_presentacion_en_proceso",
        {
          p_venta_id: ventaId,
          p_presentacion_id: item.presentacion_id,
          p_cerveza_id: item.cerveza_id,
          p_cantidad: item.quantity,
        }
      );
      console.log(
        `Detalle registrado para ${item.sku} (cantidad: ${item.quantity})`
      );
    }

    console.log(
      "Todos los detalles de la venta han sido registrados exitosamente."
    );
    return true;
  } catch (error) {
    console.error("Error al registrar los detalles de la venta:", error);
    if (error instanceof Error) {
      throw new Error(
        `Error al registrar detalles de la venta: ${error.message}`
      );
    }
    throw new Error("Ocurrió un error desconocido al registrar los detalles.");
  }
}

/**
 * Registra los detalles de una venta de evento en proceso.
 * @param ventaId - El ID de la venta de evento.
 * @param carrito - Array de items del carrito.
 * @returns boolean - true si se registraron correctamente.
 */
export async function registrarDetallesVentaEventoEnProceso(ventaId: number, carrito: CarritoItemType[]): Promise<boolean> {
  if (!ventaId) {
    console.error("ID de venta de evento inválido.");
    return false;
  }
  try {
    // Limpiar detalles existentes para esta venta de evento
    await llamarFuncion("fn_limpiar_detalles_venta_evento", { p_venta_id: ventaId });

    if (!carrito || carrito.length === 0) {
      console.log(`No hay items en el carrito para la venta de evento ID: ${ventaId}. Detalles limpiados.`);
      return true;
    }

    console.log(`Registrando ${carrito.length} tipos de items para la venta de evento ID: ${ventaId}`);

    // Registrar cada item individualmente
    for (const item of carrito) {
      await llamarFuncion(
        "fn_registrar_detalle_presentacion_evento_en_proceso",
        {
          p_presentacion_id: item.presentacion_id,
          p_cerveza_id: item.cerveza_id,
          p_venta_id: ventaId,
          p_cantidad: item.quantity,
          p_evento_id: (item as any).evento_id ?? ventaId, // Usar evento_id real si está presente
          p_proveedorid1: (item as any).proveedorId1 ?? null,
          p_proveedorid2: (item as any).proveedorId2 ?? null,
        }
      );
      console.log(`Detalle registrado para ${item.sku} (cantidad: ${item.quantity})`);
    }

    console.log("Todos los detalles de la venta de evento han sido registrados exitosamente.");
    return true;
  } catch (error) {
    console.error("Error al registrar los detalles de la venta de evento:", error);
    if (error instanceof Error) {
      throw new Error(`Error al registrar detalles de la venta de evento: ${error.message}`);
    }
    throw new Error("Ocurrió un error desconocido al registrar los detalles de la venta de evento.");
  }
}

/**
 * Finaliza los detalles de una venta actualizando el precio unitario de cada item.
 * @param ventaId - El ID de la venta a finalizar.
 * @param carrito - El array de items del carrito con los precios finales.
 * @returns boolean - true si todo se actualiza correctamente.
 */
export async function finalizarDetallesVenta(
  ventaId: number,
  carrito: CarritoItemType[]
): Promise<boolean> {
  try {
    for (const item of carrito) {
      const params = {
        p_fk_venta: ventaId,
        p_fk_presentacion: item.presentacion_id,
        p_precio_unitario: item.precio,
      };
      await llamarFuncionSingle("fn_actualizar_precio_detalle_venta", params);
    }

    console.log(`Detalles de la venta ${ventaId} finalizados correctamente.`);
    return true;
  } catch (error) {
    console.error(`Error al finalizar los detalles de la venta ${ventaId}:`, error);
    return false;
  }
}

/**
 * Finaliza los detalles de una venta de evento actualizando el precio unitario de cada item.
 * @param ventaId - El ID de la venta de evento a finalizar.
 * @param carrito - El array de items del carrito con los precios finales y datos de proveedor/evento.
 * @returns boolean - true si todo se actualiza correctamente.
 */
export async function finalizarDetallesVentaEvento(
  ventaId: number,
  carrito: CarritoItemEventoType[]
): Promise<boolean> {
  try {
    for (const item of carrito) {
      const params = {
        p_fk_venta_evento: ventaId,
        p_fk_presentacion: item.presentacion_id,
        p_fk_cerveza: item.cerveza_id,
        p_precio_unitario: item.precio,
        p_proveedor_id1: item.proveedorId1,
        p_proveedor_id2: item.proveedorId2,
        p_evento_id: item.evento_id,
      };
      await llamarFuncionSingle("fn_actualizar_precio_detalle_venta_evento", params);
    }

    console.log(`Detalles de la venta de evento ${ventaId} finalizados correctamente.`);
    return true;
  } catch (error) {
    console.error(`Error al finalizar los detalles de la venta de evento ${ventaId}:`, error);
    return false;
  }
}

/**
 * Registra múltiples pagos asociados a una venta en la base de datos.
 * @param pagos - Un array de objetos PaymentMethod, cada uno con detalles del pago.
 * @param ventaId - El ID de la venta a la que se asocian los pagos.
 * @returns boolean - true si todos los pagos se crearon exitosamente.
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

      // Manejo especial para pago con puntos: un pago por cada punto.
      if (pago.method === "puntos") {
        const puntosUtilizados = details.puntosUtilizados;
        if (typeof puntosUtilizados !== "number" || puntosUtilizados <= 0) {
          console.warn("No se utilizaron puntos o el valor es inválido, saltando pago de puntos.");
          continue; // Saltar al siguiente método de pago
        }

        const tasaPunto = await getUltimaTasaByMoneda("Punto");
        if (!tasaPunto) {
          throw new Error(`No se pudo encontrar una tasa de cambio activa para "Punto"`);
        }

        // Crear un registro de pago por cada punto utilizado
        for (let i = 0; i < puntosUtilizados; i++) {
          const params = {
            p_monto: tasaPunto.monto_equivalencia, // Valor de 1 punto
            p_fecha_pago: new Date().toISOString(),
            p_fk_tasa: tasaPunto.id,
            p_fk_venta: ventaId,
            p_fk_cliente_metodo_pago_1: details.metodo_pago_id,
          };
          await llamarFuncionSingle("fn_create_pago_cliente", params);
        }

        console.log(
          `Se registraron ${puntosUtilizados} pagos de 1 punto cada uno para la venta ${ventaId}.`
        );
        continue; // Continuar con el siguiente pago en la lista
      }

      // Lógica existente para otros métodos de pago
      let moneda = "VES"; // Moneda por defecto para la mayoría de los pagos.
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

/**
 * Registra múltiples pagos asociados a una venta de evento en la base de datos.
 * @param pagos - Un array de objetos PaymentMethod, cada uno con detalles del pago.
 * @param ventaId - El ID de la venta de evento a la que se asocian los pagos.
 * @returns boolean - true si todos los pagos se crearon exitosamente.
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

/**
 * Llama a la función de base de datos para marcar una venta como 'Finalizada'.
 * @param ventaId - El ID de la venta a finalizar.
 * @returns boolean - true si la actualización fue exitosa.
 */
export async function CompletarVenta(ventaId: number): Promise<boolean> {
  try {
    const params = {
      p_venta_id: ventaId,
    };
    await llamarFuncionSingle("fn_update_status_venta_a_completado", params);

    console.log(`Venta ${ventaId} marcada como completada.`);
    return true;
  } catch (error) {
    console.error(`Error al completar la venta ${ventaId}:`, error);
    return false;
  }
}

/**
 * Completa/finaliza una venta de evento cambiando su status a 'Finalizada'.
 * @param ventaId - ID de la venta de evento.
 * @returns boolean - true si el status se actualiza correctamente.
 */
export async function CompletarVentaEvento(ventaId: number): Promise<boolean> {
  try {
    const params = {
      p_venta_id: ventaId,
    };
    await llamarFuncionSingle("fn_update_status_venta_evento_a_completado", params);
    console.log(`Venta de evento ${ventaId} marcada como completada.`);
    return true;
  } catch (error) {
    console.error(`Error al completar la venta de evento ${ventaId}:`, error);
    return false;
  }
}

/**
 * Llama a la función de base de datos para marcar una venta como 'Despachando'.
 * @param ventaId - El ID de la venta a despachar.
 * @returns boolean - true si la actualización fue exitosa.
 */
export async function DespacharVenta(ventaId: number): Promise<boolean> {
  try {
    const params = {
      p_venta_id: ventaId,
    };
    await llamarFuncionSingle("fn_update_status_venta_a_despachando", params);

    console.log(`Venta ${ventaId} marcada como despachando.`);
    return true;
  } catch (error) {
    console.error(`Error al despachar la venta ${ventaId}:`, error);
    return false;
  }
}

/**
 * Obtiene una venta por su ID con todos sus detalles expandidos.
 * @param id - El ID de la venta.
 * @returns VentaDetalleExpansida | null - La venta encontrada o null si no existe.
 */
export async function getVentaById(
  id: number
): Promise<VentaDetalleExpansida | null> {
  // La función de BD devuelve un array de filas (una por producto)
  const ventaRows = await llamarFuncion<VentaByIdResponse>(
    "fn_get_venta_by_id",
    { p_venta_id: id }
  );

  // Transformamos el array plano en un objeto de venta anidado
  return transformarVentaByIdResponse(ventaRows);
}

