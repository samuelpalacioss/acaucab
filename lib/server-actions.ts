'use server'

import { redirect } from 'next/navigation'
import { ejecutarFuncionPostgres } from '@/lib/postgres'
import { LoginUsuario, LoginResponse } from '@/models/login'
import { InventoryData } from '@/models/inventory'
import { OrdenesReposicionData } from '@/models/orden-reposicion'
import { OrdenesCompraData, OrdenCompra } from '@/models/orden-compra'


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
  try {
    // Ahora usa PostgreSQL directamente en lugar de Supabase
    const data = await ejecutarFuncionPostgres<T>(nombreFuncion, parametros)
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
 
