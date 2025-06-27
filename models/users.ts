import { Rol } from "./roles";

/**
 * Modelo de datos para usuarios del sistema
 * Basado en la función fn_get_users de PostgreSQL
 */
export interface User {
  id_usuario: number;
  nombre_completo: string | null;
  email: string;
  telefono: string | null;
  rol_nombre: string;
  id_rol: number;
  tipo_usuario: string;
  puntos: number;
}

/**
 * Modelo detallado de usuario
 * Basado en la función fn_get_user_by_id de PostgreSQL
 */
export interface UserDetail {
  id_usuario: number;
  nombre_completo: string;
  email: string;
  telefono: string;
  rol_nombre: string;
  id_rol: number;
  tipo_usuario: string;
  identificacion: string;
  direccion: string;
  // Detalles de Empleado
  cargo?: string;
  departamento?: string;
  salario_base?: number;
  fecha_inicio_nomina?: string;
  fecha_fin_nomina?: string;
  // Detalles de Cliente Juridico / Miembro
  razon_social?: string;
  denominacion_comercial?: string;
  // Detalles de Cliente Natural
  fecha_nacimiento?: string;
  // Persona de Contacto
  pc_nombre_completo?: string;
  pc_identificacion?: string;
  pc_email?: string;
  pc_telefono?: string;
}

/**
 * Tipo para las props del componente cliente de usuarios
 */
export interface UsuariosClientProps {
  users: User[];
  roles: Rol[];
}

/**
 * Modelo de datos para personas sin usuario
 * Basado en la función fn_get_personas de PostgreSQL
 */
export interface PersonaSinUsuario {
  tipo_persona: string;
  id: number;
  documento: string;
  nacionalidad_naturaleza: string;
  nombre_completo: string;
  email: string | null;
  telefono: string | null;
}
