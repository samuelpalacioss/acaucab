'use server'

import { redirect } from 'next/navigation'
import { crearClienteServerAction } from '@/lib/supabase'
import { LoginUsuario, LoginResponse } from '@/models/login'
import { InventoryData } from '@/models/inventory'
import { OrdenesReposicionData } from '@/models/orden-reposicion'
import { OrdenesCompraData, OrdenCompra } from '@/models/orden-compra'
import { TotalGeneradoTienda, SalesGrowthData } from '@/models/stats'


/**
 * FUNCIONES PRINCIPALES PARA LLAMAR POSTGRESQL
 * Esta es la única forma de interactuar con la base de datos
 */

/**
 * Llamar una función de PostgreSQL (para múltiples resultados)
 * 
 * @param nombreFuncion - Nombre de la función en PostgreSQL
 * @param parametros - Parámetros para la función
 */
export async function llamarFuncion<T = any>(
  nombreFuncion: string,
  parametros: Record<string, any> = {}
): Promise<T[]> {
  const supabase = crearClienteServerAction()

  try {
    const { data, error } = await supabase.rpc(nombreFuncion, parametros)

    if (error) {
      console.error(`Error en función ${nombreFuncion}:`, error)
      throw new Error(`Error: ${error.message}`)
    }

    return data || []
  } catch (error: any) {
    console.error(`Error al llamar ${nombreFuncion}:`, error)
    throw error
  }
}

/**
 * Llamar una función de PostgreSQL (para un solo resultado)
 * 
 * @param nombreFuncion - Nombre de la función en PostgreSQL
 * @param parametros - Parámetros para la función
 */
export async function llamarFuncionSingle<T = any>(
  nombreFuncion: string,
  parametros: Record<string, any> = {}
): Promise<T | null> {
  const resultado = await llamarFuncion<T>(nombreFuncion, parametros)
  return resultado && resultado.length > 0 ? resultado[0] : null
}

/**
 * Llamar una función de PostgreSQL que retorna un valor escalar (número, string, etc.)
 * 
 * @param nombreFuncion - Nombre de la función en PostgreSQL
 * @param parametros - Parámetros para la función
 */
export async function llamarFuncionEscalar<T = any>(
  nombreFuncion: string,
  parametros: Record<string, any> = {}
): Promise<T> {
  const supabase = crearClienteServerAction()

  try {
    const { data, error } = await supabase.rpc(nombreFuncion, parametros)

    if (error) {
      console.error(`Error en función ${nombreFuncion}:`, error)
      throw new Error(`Error: ${error.message}`)
    }

    return data as T
  } catch (error: any) {
    console.error(`Error al llamar ${nombreFuncion}:`, error)
    throw error
  }
}

/**
 * ACCIONES DE AUTENTICACIÓN
 */

/**
 * Realizar login usando la función fn_login de PostgreSQL
 * 
 * @param email - Correo electrónico del usuario
 * @param password - Contraseña del usuario
 */
export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    // Llamar función de login en PostgreSQL
    const resultado = await llamarFuncion<LoginUsuario>('fn_login', {
      p_email: email,
      p_password: password
    });

    if (!resultado || resultado.length === 0) {
      return {
        success: false,
        error: 'Credenciales inválidas'
      };
    }

    // Extraer información del usuario y permisos
    const primerRegistro = resultado[0];
    const permisos = resultado.map(row => row.permiso);

    // Construir información del miembro si existe
    const miembro = (primerRegistro.miembro_rif && 
                     primerRegistro.miembro_naturaleza_rif && 
                     primerRegistro.miembro_razon_social) ? {
      rif: primerRegistro.miembro_rif,
      naturaleza_rif: primerRegistro.miembro_naturaleza_rif,
      razon_social: primerRegistro.miembro_razon_social
    } : null;

    const usuario = {
      id: primerRegistro.id_usuario,
      email: primerRegistro.direccion_correo,
      rol: primerRegistro.rol,
      nombre: primerRegistro.nombre_usuario,
      permisos: permisos,
      miembro: miembro
    };

    // Verificar si tiene permisos para acceder al dashboard
    const tieneAccesoDashboard = permisos.some(permiso => 
      [
        'leer_usuario',
        'leer_permiso',
        'leer_orden_de_reposicion',
        'leer_rol',
        'leer_venta',
        'leer_orden_de_compra',
        'leer_inventario',
        'leer_orden_de_compra_proveedor',
      ].includes(permiso)
    );

    return {
      success: true,
      usuario: usuario,
      shouldRedirect: true,
      redirectTo: tieneAccesoDashboard ? '/dashboard' : '/'
    };

  } catch (error: any) {
    console.error('Error en login:', error);
    
    // Manejar errores específicos de la función SQL
    let mensajeError = 'Error de autenticación';
    
    if (error.message.includes('Correo no registrado')) {
      mensajeError = 'El correo electrónico no está registrado';
    } else if (error.message.includes('Contraseña incorrecta')) {
      mensajeError = 'La contraseña es incorrecta';
    } else if (error.message.includes('function fn_login')) {
      mensajeError = 'Error del servidor. Intente nuevamente.';
    }

    return {
      success: false,
      error: mensajeError
    };
  }
}

/**
 * FORMULARIOS Y ACCIONES
 */

/**
 * Procesar formulario y llamar función de PostgreSQL
 * 
 * @param formData - Datos del formulario
 * @param nombreFuncion - Función de PostgreSQL a llamar
 * @param camposRequeridos - Campos obligatorios
 * @param redirigirA - Dónde redirigir después del éxito
 */
export async function procesarFormulario(
  formData: FormData,
  nombreFuncion: string,
  camposRequeridos: string[] = [],
  redirigirA?: string
) {
  // Extraer datos del formulario
  const datos: Record<string, any> = {}
  
  for (const [campo, valor] of formData.entries()) {
    if (typeof valor === 'string' && valor.trim() !== '') {
      datos[campo] = valor.trim()
    }
  }

  // Validar campos requeridos
  for (const campo of camposRequeridos) {
    if (!datos[campo]) {
      throw new Error(`El campo '${campo}' es obligatorio`)
    }
  }
  // Llamar función de PostgreSQL
  const resultado = await llamarFuncion(nombreFuncion, datos)

  // Redirigir si se especifica
  if (redirigirA) {
    redirect(redirigirA)
  }

  return resultado
}

/**
 * ACCIONES DE INVENTARIO
 */

/**
 * Obtener datos del inventario usando la función fn_get_inventory
 * 
 * @returns Array con los datos del inventario
 */
export async function obtenerInventario(): Promise<InventoryData> {
  try {
    const resultado = await llamarFuncion<any>('fn_get_inventory')
    return resultado || []
  } catch (error: any) {
    console.error('Error al obtener inventario:', error)
    throw new Error('Error al cargar datos del inventario')
  }
}

/**
 * Obtener órdenes de reposición usando la función fn_get_ordenes_de_reposicion
 * 
 * @returns Array con los datos de las órdenes de reposición
 */
export async function obtenerOrdenesReposicion(): Promise<OrdenesReposicionData> {
  try {
    const resultado = await llamarFuncion<any>('fn_get_ordenes_de_reposicion')
    return resultado || []
  } catch (error: any) {
    console.error('Error al obtener órdenes de reposición:', error)
    throw new Error('Error al cargar datos de las órdenes de reposición')
  }
}

/**
 * Obtener órdenes de compra usando la función fn_get_all_ordenes_de_compra
 * 
 * @returns Array con los datos de las órdenes de compra
 */
export async function obtenerTodasLasOrdenesDeCompra(): Promise<OrdenesCompraData> {
  try {
    console.log('Llamando función fn_get_all_ordenes_de_compra...');
    const resultado = await llamarFuncion<any>('fn_get_all_ordenes_de_compra')
    console.log('Resultado de fn_get_all_ordenes_de_compra:', resultado);
    return resultado || []
  } catch (error: any) {
    console.error('Error al obtener órdenes de compra:', error)
    throw new Error('Error al cargar datos de las órdenes de compra')
  }
}

/**
 * Obtener UNA orden de compra por ID usando la función fn_get_orden_de_compra_by_id
 * 
 * @returns Objeto con los datos de la orden de compra
 */
export async function obtenerOrdenDeCompraPorId(id: number): Promise<OrdenCompra | null> {
  try {
    const resultado = await llamarFuncionSingle<OrdenCompra>('fn_get_orden_de_compra_by_id', {
        p_id: id
    })
    return resultado
  } catch (error: any) {
    console.error(`Error al obtener orden de compra ${id}:`, error)
    throw new Error('Error al cargar datos de la orden de compra')
  }
}

/**
 * Actualizar el estado de una orden de reposición
 * 
 * @param ordenId - ID de la orden de reposición
 * @param nuevoEstado - Nombre del nuevo estado para la orden
 * @returns Promise<void>
 */
export async function actualizarEstadoOrdenReposicion(
  ordenId: number,
  nuevoEstado: string,
  usuarioId: number,
  unidades?: number,
  observacion?: string
): Promise<void> {
  try {
    if (!nuevoEstado) {
      throw new Error("El nuevo estado no puede estar vacío.");
    }

    await llamarFuncion('fn_update_status_orden_reposicion', {
      p_orden_id: ordenId,
      p_nuevo_status_nombre: nuevoEstado,
      p_usuario_id: usuarioId,
      p_unidades_finalizadas: unidades ?? null,
      p_observacion_final: observacion ?? null,
    });

  } catch (error: any) {
    console.error('Error al actualizar estado de orden:', error);
    throw new Error(`Error al actualizar estado: ${error.message}`);
  }
}

/**
 * Actualizar el estado de una orden de compra
 * 
 * @param ordenId - ID de la orden de compra
 * @param nuevoEstado - Nombre del nuevo estado para la orden
 * @param usuarioId - ID del usuario que actualiza el estado
 * @param observacion - Observación opcional para la finalización
 * @returns Promise<void>
 */
export async function actualizarEstadoOrdenCompra(
  ordenId: number,
  nuevoEstado: string,
  usuarioId: number,
  observacion?: string
): Promise<void> {
  try {
    if (!nuevoEstado) {
      throw new Error("El nuevo estado no puede estar vacío.");
    }

    // Por ahora, usaremos una función similar a la de orden de reposición
    // Cuando tengas la función específica en PostgreSQL, la puedes cambiar aquí
    await llamarFuncion('fn_update_status_orden_compra', {
      p_orden_id: ordenId,
      p_nuevo_status_nombre: nuevoEstado,
      p_usuario_id: usuarioId,
      p_observacion_final: observacion ?? null,
    });

  } catch (error: any) {
    console.error('Error al actualizar estado de orden de compra:', error);
    throw new Error(`Error al actualizar estado: ${error.message}`);
  }
}

/**
 * Obtener estadísticas de ventas por empleado usando la función fn_get_stats_tienda_empleado
 * 
 * @returns Array con las estadísticas de ventas por empleado
 */
export async function obtenerEstadisticasVentasPorEmpleado(): Promise<any[]> {
  try {
    const resultado = await llamarFuncion<any>('fn_get_stats_tienda_empleado')
    return resultado || []
  } catch (error: any) {
    console.error('Error al obtener estadísticas de ventas por empleado:', error)
    throw new Error('Error al cargar estadísticas de ventas por empleado')
  }
}

/**
 * Obtener información de un empleado por ID usando la función fn_get_empleado_info_by_id
 * 
 * @param empleadoId - ID del empleado
 * @returns Información del empleado o null si no existe
 */
export async function obtenerInformacionEmpleadoPorId(empleadoId: number): Promise<any | null> {
  try {
    const resultado = await llamarFuncionSingle<any>('fn_get_empleado_info_by_id', {
      p_empleado_id: empleadoId
    })
    return resultado
  } catch (error: any) {
    console.error(`Error al obtener información del empleado ${empleadoId}:`, error)
    throw new Error('Error al cargar información del empleado')
  }
}

/**
 * Obtener tasa de ruptura de stock usando la función fn_calcular_tasa_ruptura_stock
 * 
 * @param tiendaId - ID de la tienda (opcional, null para todas las tiendas)
 * @param tipoCalculo - 'global' o 'tienda'
 * @returns Array con las estadísticas de tasa de ruptura
 */
export async function obtenerTasaRupturaStock(
  tiendaId: number | null = null,
  tipoCalculo: 'global' | 'tienda' = 'global'
): Promise<any[]> {
  try {
    const resultado = await llamarFuncion<any>('fn_calcular_tasa_ruptura_stock', {
      p_tienda_id: tiendaId,
      p_tipo_calculo: tipoCalculo
    })
    return resultado || []
  } catch (error: any) {
    console.error('Error al obtener tasa de ruptura de stock:', error)
    throw new Error('Error al cargar estadísticas de tasa de ruptura de stock')
  }
}

/**
 * Obtener tasa de ruptura global usando la función fn_tasa_ruptura_global
 * 
 * @param tiendaId - ID de la tienda (opcional, null para todas las tiendas)
 * @returns Array con las estadísticas de tasa de ruptura global
 */
export async function obtenerTasaRupturaGlobal(
  tiendaId: number | null = null
): Promise<any[]> {
  try {
    const resultado = await llamarFuncion<any>('fn_tasa_ruptura_global', {
      p_tienda_id: tiendaId
    })
    return resultado || []
  } catch (error: any) {
    console.error('Error al obtener tasa de ruptura global:', error)
    throw new Error('Error al cargar estadísticas de tasa de ruptura global')
  }
}

/**
 * Obtener rotación de inventario usando la función fn_rotacion_inventario
 * 
 * @param fechaInicio - Fecha de inicio del período
 * @param fechaFin - Fecha de fin del período
 * @returns Valor numérico de la rotación de inventario
 */
export async function obtenerRotacionInventario(
  fechaInicio: string,
  fechaFin: string
): Promise<number> {
  try {
    const resultado = await llamarFuncionEscalar<number>('fn_rotacion_inventario', {
      p_fecha_inicio: fechaInicio,
      p_fecha_fin: fechaFin
    })
    
    // La función devuelve directamente el valor numérico
    return resultado || 0
  } catch (error: any) {
    console.error('Error al obtener rotación de inventario:', error)
    throw new Error('Error al cargar estadísticas de rotación de inventario')
  }
}

/**
 * Acción del servidor para obtener rotación de inventario (llamable desde cliente)
 * 
 * @param fechaInicio - Fecha de inicio del período
 * @param fechaFin - Fecha de fin del período
 * @returns Valor numérico de la rotación de inventario
 */
export async function obtenerRotacionInventarioAction(
  fechaInicio: string,
  fechaFin: string
): Promise<number> {
  'use server'
  return await obtenerRotacionInventario(fechaInicio, fechaFin);
}
 
/**
 * Obtener tasa de retención de clientes usando la función fn_retencion_clientes
 * 
 * @param fechaInicio - Fecha de inicio del período
 * @param fechaFin - Fecha de fin del período
 * @returns Porcentaje de retención de clientes
 */
export async function obtenerRetencionClientes(
  fechaInicio: string,
  fechaFin: string
): Promise<number> {
  try {
    const resultado = await llamarFuncionEscalar<number>('fn_retencion_clientes', {
      p_fecha_inicio: fechaInicio,
      p_fecha_fin: fechaFin
    })
    
    // La función devuelve directamente el valor numérico del porcentaje
    return resultado || 0
  } catch (error: any) {
    console.error('Error al obtener retención de clientes:', error)
    throw new Error('Error al cargar estadísticas de retención de clientes')
  }
}

/**
 * Acción del servidor para obtener retención de clientes (llamable desde cliente)
 * 
 * @param fechaInicio - Fecha de inicio del período
 * @param fechaFin - Fecha de fin del período
 * @returns Porcentaje de retención de clientes
 */
export async function obtenerRetencionClientesAction(
  fechaInicio: string,
  fechaFin: string
): Promise<number> {
  'use server'
  return await obtenerRetencionClientes(fechaInicio, fechaFin);
}
 
/**
 * Obtener estadísticas de clientes nuevos vs. recurrentes
 * 
 * @param fechaInicio - Fecha de inicio del período
 * @param fechaFin - Fecha de fin del período
 * @returns Objeto con el conteo de clientes nuevos y recurrentes
 */
export async function obtenerNuevosClientesStats(
  fechaInicio: string,
  fechaFin: string
): Promise<{ nuevos: number; recurrentes: number }> {
  try {
    const resultado = await llamarFuncionSingle<{ nuevos: number; recurrentes: number }>('fn_nuevos_clientes_stats', {
      p_fecha_inicio: fechaInicio,
      p_fecha_fin: fechaFin
    })
    
    return resultado || { nuevos: 0, recurrentes: 0 };
  } catch (error: any) {
    console.error('Error al obtener estadísticas de nuevos clientes:', error)
    throw new Error('Error al cargar estadísticas de nuevos clientes')
  }
}

/**
 * Acción del servidor para obtener estadísticas de clientes nuevos (llamable desde cliente)
 * 
 * @param fechaInicio - Fecha de inicio del período
 * @param fechaFin - Fecha de fin del período
 * @returns Objeto con el conteo de clientes nuevos y recurrentes
 */
export async function obtenerNuevosClientesStatsAction(
  fechaInicio: string,
  fechaFin: string
): Promise<{ nuevos: number; recurrentes: number }> {
  'use server'
  return await obtenerNuevosClientesStats(fechaInicio, fechaFin);
}
  
/**
 * Obtener el ticket promedio de las ventas completadas.
 * @returns El valor del ticket promedio.
 */
export async function obtenerTicketPromedio(): Promise<number> {
  try {
    const resultado = await llamarFuncionEscalar<number>('fn_get_ticket_promedio');
    return resultado || 0;
  } catch (error: any) {
    console.error('Error al obtener el ticket promedio:', error);
    throw new Error('Error al cargar el ticket promedio');
  }
}

/**
 * Acción del servidor para obtener el ticket promedio (llamable desde cliente).
 * @returns El valor del ticket promedio.
 */
export async function obtenerTicketPromedioAction(): Promise<number> {
  'use server';
  return await obtenerTicketPromedio();
}
 
/**
 * Obtener estadísticas de ventas por estilo de cerveza
 * 
 * @returns Array con los estilos de cerveza y el total vendido
 */
export async function obtenerVentasPorEstilo(): Promise<{ estilo_cerveza: string; total_vendido: number }[]> {
  try {
    const resultado = await llamarFuncion<{ estilo_cerveza: string; total_vendido: number }>('fn_estilos_stats');
    return resultado || [];
  } catch (error: any) {
    console.error('Error al obtener estadísticas de ventas por estilo:', error);
    throw new Error('Error al cargar estadísticas de ventas por estilo');
  }
}

/**
 * Obtener el volumen total de unidades vendidas en un período.
 * 
 * @param fechaInicio - Fecha de inicio del período
 * @param fechaFin - Fecha de fin del período
 * @returns El número total de unidades vendidas
 */
export async function obtenerVolumenDeVentas(
  fechaInicio: string,
  fechaFin: string
): Promise<number> {
  try {
    const resultado = await llamarFuncionEscalar<number>('fn_volumen_ventas', {
      p_fecha_inicio: fechaInicio,
      p_fecha_fin: fechaFin
    });
    return resultado || 0;
  } catch (error: any) {
    console.error('Error al obtener el volumen de ventas:', error);
    throw new Error('Error al cargar el volumen de ventas');
  }
}

/**
 * Acción del servidor para obtener el volumen de ventas (llamable desde cliente).
 * 
 * @param fechaInicio - Fecha de inicio del período
 * @param fechaFin - Fecha de fin del período
 * @returns El número total de unidades vendidas
 */
export async function obtenerVolumenDeVentasAction(
  fechaInicio: string,
  fechaFin: string
): Promise<number> {
  'use server';
  return await obtenerVolumenDeVentas(fechaInicio, fechaFin);
}
 
/**
 * Obtener el total generado por cada tienda (física y web)
 * 
 * @returns Array con el total generado por tienda
 */
export async function obtenerTotalGeneradoPorTienda(): Promise<TotalGeneradoTienda[]> {
  try {
    const resultado = await llamarFuncion<TotalGeneradoTienda>('fn_get_total_generado_tienda');
    return resultado || [];
  } catch (error: any) {
    console.error('Error al obtener el total generado por tienda:', error);
    throw new Error('Error al cargar el total generado por tienda');
  }
}
 
/**
 * Obtener estadísticas de crecimiento de ventas.
 *
 * @param fecha_referencia - La fecha para la comparación (YYYY-MM-DD).
 * @param tipo_comparacion - 'mensual' o 'anual'.
 * @returns Array con los datos de crecimiento de ventas.
 */
export async function obtenerCrecimientoVentas(
  fecha_referencia: string,
  tipo_comparacion: 'mensual' | 'anual'
): Promise<SalesGrowthData[]> {
  try {
    const resultado = await llamarFuncion<SalesGrowthData>('fn_get_crecimiento_ventas', {
      fecha_referencia: fecha_referencia,
      tipo_comparacion: tipo_comparacion
    });
    return resultado || [];
  } catch (error: any) {
    console.error('Error al obtener el crecimiento de ventas:', error);
    throw new Error('Error al cargar las estadísticas de crecimiento de ventas');
  }
}

/**
 * Acción del servidor para obtener crecimiento de ventas (llamable desde cliente)
 *
 * @param fecha_referencia - La fecha para la comparación (YYYY-MM-DD).
 * @param tipo_comparacion - 'mensual' o 'anual'.
 * @returns Array con los datos de crecimiento de ventas.
 */
export async function obtenerCrecimientoVentasAction(
    fecha_referencia: string,
    tipo_comparacion: 'mensual' | 'anual'
  ): Promise<SalesGrowthData[]> {
    'use server';
    return await obtenerCrecimientoVentas(fecha_referencia, tipo_comparacion);
  }
 

