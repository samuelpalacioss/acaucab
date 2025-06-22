'use server'

import { redirect } from 'next/navigation'
import { crearClienteServerAction } from '@/lib/supabase'

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
 
