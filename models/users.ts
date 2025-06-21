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
}

/**
 * Tipo para las props del componente cliente de usuarios
 */
export interface UsuariosClientProps {
  users: User[];
  roles: Rol[];
}
