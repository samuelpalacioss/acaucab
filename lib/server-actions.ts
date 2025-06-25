'use server'

import { redirect } from 'next/navigation'
import { crearClienteServerAction } from '@/lib/supabase'
import { LoginUsuario, LoginResponse } from '@/models/login'


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

    const usuario = {
      id: primerRegistro.id_usuario,
      email: primerRegistro.direccion_correo,
      rol: primerRegistro.rol,
      nombre: primerRegistro.nombre_usuario,
      permisos: permisos
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
      ].includes(permiso)
    );

    return {
      success: true,
      usuario: usuario,
      shouldRedirect: tieneAccesoDashboard,
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
 
