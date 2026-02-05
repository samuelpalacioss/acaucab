import { createClient } from '@supabase/supabase-js'
import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Configuración global de Supabase
 * URLs y claves necesarias para la conexión
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

/**
 * Cliente de Supabase para el navegador (lado del cliente)
 * Se utiliza en componentes que se ejecutan en el navegador
 * Maneja automáticamente las cookies para la sesión del usuario
 */
export function crearClienteNavegador() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

/**
 * Cliente de Supabase para Server Components
 * Se utiliza para cargar datos en componentes del servidor
 * Acceso de solo lectura con la sesión del usuario autenticado
 */
export async function crearClienteServerComponent() {
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })
}

/**
 * Cliente de Supabase para Server Actions
 * Se utiliza para operaciones de escritura (insert, update, delete)
 * en funciones del servidor y API routes
 */
export async function crearClienteServerAction() {
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: '', ...options })
      },
    },
  })
}

/**
 * Cliente de Supabase para el lado del servidor con permisos de administrador
 * Se utiliza para operaciones que requieren permisos elevados
 * NO usar desde el lado del cliente por seguridad
 */
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Mantener compatibilidad con el código existente
export const supabase = crearClienteNavegador() 