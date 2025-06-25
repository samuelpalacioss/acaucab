/**
 * TIPOS PARA LOGIN
 * Interfaces para manejo de autenticación con PostgreSQL
 */

export interface LoginUsuario {
  id_usuario: number;
  direccion_correo: string;
  rol: string;
  nombre_usuario: string;
  permiso: string;
}

export interface LoginResponse {
  success: boolean;
  error?: string;
  shouldRedirect?: boolean;
  redirectTo?: string;
  usuario?: {
    id: number;
    email: string;
    rol: string;
    nombre: string;
    permisos: string[];
  };
}
  