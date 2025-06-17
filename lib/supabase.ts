import { createClient } from '@supabase/supabase-js'

/**
 * Configuración del cliente de Supabase
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Cliente de Supabase para el lado del cliente
 * Se utiliza para operaciones que requieren autenticación del usuario
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Cliente de Supabase para el lado del servidor
 * Se utiliza para operaciones que requieren permisos de administrador
 */
export const supabaseAdmin = createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
) 