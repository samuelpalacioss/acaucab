import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * Interface para el usuario autenticado
 */
export interface Usuario {
  id: number;
  email: string;
  rol: string;
  nombre: string;
  permisos: string[];
}
 
/**
 * Store principal de usuario con Zustand
 * Persiste en localStorage para mantener sesión
 */
export const useUserStore = create(
  persist(
    (set: any, get: any) => ({
      /** ESTADO INICIAL */
      usuario: null as Usuario | null,
      isLoading: false,
      isAuthenticated: false,
      _hasHydrated: false,

      /**
       * Marcar el store como hidratado
       */
      setHasHydrated: (hydrated: boolean) => {
        set({
          _hasHydrated: hydrated
        });
      },
      
      /**
       * Establecer usuario logueado y marcar como autenticado
       */
      setUsuario: (usuario: Usuario) => {
        set({
          usuario,
          isAuthenticated: true,
          isLoading: false
        });
      },

      /**
       * Limpiar datos del usuario (logout)
       */
      clearUsuario: () => {
        set({
          usuario: null,
          isAuthenticated: false,
          isLoading: false
        });
      },

      /**
       * Verificar si el usuario tiene un permiso específico
       */
      tienePermiso: (permiso: string) => {
        const { usuario } = get();
        return usuario?.permisos.includes(permiso) ?? false;
      },

      /**
       * Verificar si el usuario tiene alguno de los permisos especificados
       */
      tieneAlgunPermiso: (permisos: string[]) => {
        const { usuario } = get();
        if (!usuario) return false;
        return permisos.some(permiso => usuario.permisos.includes(permiso));
      },

      /**
       * Verificar si el usuario tiene todos los permisos especificados
       */
      tieneTodosPermisos: (permisos: string[]) => {
        const { usuario } = get();
        if (!usuario) return false;
        return permisos.every(permiso => usuario.permisos.includes(permiso));
      },

      /**
       * Verificar si tiene acceso general al dashboard
       */
      tieneAccesoDashboard: () => {
        const { tieneAlgunPermiso } = get();
        // Un usuario tiene acceso al dashboard si tiene al menos un permiso de LECTURA de las secciones principales.
        return tieneAlgunPermiso([
          'leer_usuario',
          'leer_permiso',
          'leer_orden_de_reposicion',
          'leer_rol',
          'leer_venta',
          'leer_orden_de_compra',
          'leer_inventario',
        ]);
      },

      /**
       * Verificar acceso a secciones específicas del dashboard
       */
      tieneAccesoSeccion: (seccion: 'usuarios' | 'ventas' | 'compras' | 'inventario' | 'reportes' | 'eventos') => {
        const { tieneAlgunPermiso } = get();
        
        const permisosPorSeccion = {
          // Acceso si puede gestionar usuarios, roles, clientes o empleados
          usuarios: [
            'crear_usuario', 'editar_usuario', 'eliminar_usuario', 'leer_usuario',
            'crear_rol', 'editar_rol', 'eliminar_rol', 'leer_rol',
            'crear_permiso_rol', 'editar_permiso_rol', 'eliminar_permiso_rol', 'leer_permiso_rol',
            'crear_cliente_juridico', 'editar_cliente_juridico', 'eliminar_cliente_juridico', 'leer_cliente_juridico',
            'crear_cliente_natural', 'editar_cliente_natural', 'eliminar_cliente_natural', 'leer_cliente_natural',
            'crear_empleado', 'editar_empleado', 'eliminar_empleado', 'leer_empleado',
          ],
          // Acceso si puede gestionar ventas o pagos
          ventas: [
            'crear_venta', 'editar_venta', 'eliminar_venta', 'leer_venta',
            'crear_pago', 'editar_pago', 'eliminar_pago', 'leer_pago',
            'crear_detalle_presentacion', 'editar_detalle_presentacion', 'eliminar_detalle_presentacion', 'leer_detalle_presentacion',
            'crear_status_venta', 'editar_status_venta', 'eliminar_status_venta', 'leer_status_venta',
          ],
          // Acceso si puede gestionar órdenes de compra o proveedores (miembros)
          compras: [
            'crear_orden_de_compra', 'editar_orden_de_compra', 'eliminar_orden_de_compra', 'leer_orden_de_compra',
            'crear_miembro', 'editar_miembro', 'eliminar_miembro', 'leer_miembro',
            'crear_status_orden', 'editar_status_orden', 'eliminar_status_orden', 'leer_status_orden',
          ],
          // Acceso si puede gestionar inventario, productos (cerveza/presentación), almacenes o reposiciones
          inventario: [
            'crear_inventario', 'editar_inventario', 'eliminar_inventario', 'leer_inventario',
            'crear_orden_de_reposicion', 'editar_orden_de_reposicion', 'eliminar_orden_de_reposicion', 'leer_orden_de_reposicion',
            'crear_presentacion', 'editar_presentacion', 'eliminar_presentacion', 'leer_presentacion',
            'crear_cerveza', 'editar_cerveza', 'eliminar_cerveza', 'leer_cerveza',
            'crear_almacen', 'editar_almacen', 'eliminar_almacen', 'leer_almacen',
            'crear_stock_miembro', 'editar_stock_miembro', 'eliminar_stock_miembro', 'leer_stock_miembro',
          ],
           // Acceso si puede ver información histórica o consolidada
          reportes: [
            'leer_venta', 
            'leer_orden_de_compra', 
            'leer_nomina',
            'leer_pago'
          ],
          // Acceso a la gestión de eventos
          eventos: [
            'crear_evento', 'editar_evento', 'eliminar_evento', 'leer_evento',
            'crear_venta_evento', 'editar_venta_evento', 'eliminar_venta_evento', 'leer_venta_evento',
            'crear_detalle_evento', 'editar_detalle_evento', 'eliminar_detalle_evento', 'leer_detalle_evento',
            'crear_invitado_evento', 'editar_invitado_evento', 'eliminar_invitado_evento', 'leer_invitado_evento',
            'crear_invitado', 'editar_invitado', 'eliminar_invitado', 'leer_invitado'
          ]
        };

        return tieneAlgunPermiso(permisosPorSeccion[seccion] || []);
      },

      /**
       * Establecer estado de carga
       */
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      }
    }),
    {
      name: 'acaucab-user-storage', // Nombre único para localStorage
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
      partialize: (state: any) => ({
        // Solo persistir datos del usuario, no estados temporales
        usuario: state.usuario,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

/**
 * Hook personalizado para verificaciones rápidas de permisos
 */
export const usePermissions = () => {
  const {
    tienePermiso,
    tieneAlgunPermiso,
    tieneTodosPermisos,
    tieneAccesoDashboard,
    tieneAccesoSeccion
  } = useUserStore();

  return {
    tienePermiso,
    tieneAlgunPermiso,
    tieneTodosPermisos,
    tieneAccesoDashboard,
    tieneAccesoSeccion,
    /** Helpers específicos para permisos comunes */
    // Inventario
    puedeVerInventario: () => tienePermiso('leer_inventario'),
    // Ordenes de reposicion
    puedeVerOrdenesDeReposicion: () => tienePermiso('leer_orden_de_reposicion'),
    puedeEditarOrdenesDeReposicion: () => tienePermiso('editar_orden_de_reposicion'),
    // Ordenes de compra
    puedeVerOrdenesDeCompra: () => tienePermiso('leer_orden_de_compra'),
    puedeEditarOrdenesDeCompra: () => tienePermiso('editar_orden_de_compra'),
    // Ordenes de compra de proveedores
    puedeVerOrdenesDeCompraProveedor: () => tienePermiso('leer_orden_de_compra_proveedor'),
    puedeEditarOrdenesDeCompraProveedor: () => tienePermiso('editar_orden_de_compra_proveedor'),
    // Usuarios
    puedeVerUsuarios: () => tienePermiso('leer_usuario'),
    puedeCrearUsuarios: () => tienePermiso('crear_usuario'),
    puedeEditarUsuarios: () => tienePermiso('editar_usuario'),
    puedeEliminarUsuarios: () => tienePermiso('eliminar_usuario'),
    // Roles
    puedeVerRoles: () => tienePermiso('leer_rol'),
    puedeCrearRoles: () => tienePermiso('crear_rol'),
    puedeEditarRoles: () => tienePermiso('editar_rol'),
    puedeEliminarRoles: () => tienePermiso('eliminar_rol'),
    // Permiso_rol
    puedeAsignarPermisoRol: () => tieneTodosPermisos(['crear_permiso_rol', 'editar_permiso_rol', 'eliminar_permiso_rol']),
    // Permisos
    puedeVerPermisos: () => tienePermiso('leer_permiso'),
    puedeCrearPermisos: () => tienePermiso('crear_permiso'),
    // Ventas
    puedeIniciarVentas: () => tienePermiso('crear_venta'),
    puedeVerVentas: () => tienePermiso('leer_venta'),
  };
};

/**
 * Hook para datos básicos del usuario
 */
export const useUser = () => {
  const { usuario, isAuthenticated, isLoading, _hasHydrated } = useUserStore();
  
  return {
    usuario,
    isAuthenticated,
    isLoading,
    _hasHydrated,
    /** Datos específicos del usuario */
    nombreUsuario: usuario?.nombre,
    emailUsuario: usuario?.email,
    rolUsuario: usuario?.rol,
    permisos: usuario?.permisos || []
  };
}; 