/**
 * @interface Rol
 * @description Modelo que representa un rol del sistema.
 *              Este modelo se utiliza para tipar la información de los roles
 *              que se obtiene desde la base de datos a través de la función `fn_get_roles`.
 */
export interface Rol {
    /**
     * @property {number} id - El identificador único del rol.
     * @example 1
     */
    id: number;

    /**
     * @property {string} nombre - El nombre del rol.
     * @example 'Administrador'
     */
    nombre: string;

    /**
     * @property {number} cantidad_usuarios - La cantidad de usuarios que tienen asignado este rol.
     * @example 10
     */
    cantidad_usuarios: number;

    /**
     * @property {number} cantidad_permisos - La cantidad de permisos asociados a este rol.
     * @example 25
     */
    cantidad_permisos: number;
}
