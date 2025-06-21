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

/**
 * @interface Permiso
 * @description Representa un permiso dentro del sistema.
 */
export interface Permiso {
    /**
     * @property {number} id - El identificador único del permiso.
     * @example 1
     */
    id: number;

    /**
     * @property {string} nombre - El nombre del permiso.
     * @example 'create:users'
     */
    nombre: string;

    /**
     * @property {string} descripcion - La descripción detallada del permiso.
     * @example 'Permite la creación de nuevos usuarios en el sistema.'
     */
    descripcion: string;
}

/**
 * @interface RolDetalle
 * @description Modelo para una fila del resultado de la función `fn_get_role_by_id`.
 *              Representa un rol y uno de sus permisos. Si el rol no tiene permisos,
 *              las propiedades del permiso serán nulas.
 */
export interface RolDetalle {
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
     * @property {number | null} permiso_id - El ID del permiso. Es nulo si el rol no tiene permisos.
     * @example 15
     */
    permiso_id: number | null;

    /**
     * @property {string | null} permiso_nombre - El nombre del permiso. Es nulo si el rol no tiene permisos.
     * @example 'delete:products'
     */
    permiso_nombre: string | null;

    /**
     * @property {string | null} permiso_descripcion - La descripción del permiso. Es nulo si el rol no tiene permisos.
     * @example 'Permite eliminar productos del inventario.'
     */
    permiso_descripcion: string | null;
}
