import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { 
  ClienteType, 
  CarritoItemType, 
  DocType,
  PaymentMethod,
} from '@/lib/schemas';
import { registrarPagos } from '@/api/registrar-pagos';
import { finalizarDetallesVenta } from '@/api/finalizar-detalles-venta';
import { CompletarVenta } from '@/api/completar-venta';


/**
 * Interface para los datos de la venta que se enviarán a fn_create_venta
 */
export interface VentaData {
  monto_total: number;
  direccion_entrega?: string;
  observacion?: string;
  fk_usuario?: number;
  fk_lugar?: number;
  fk_cliente_juridico?: number;
  fk_cliente_natural?: number;
  fk_tienda_fisica?: number;
  fk_tienda_web?: number;
}

/**
 * Interface para los detalles de presentación - fn_create_detalle_presentacion
 */
export interface DetalleVentaData {
  cantidad: number;
  precio_unitario: number;
  fk_presentacion: number;
  fk_cerveza: number;
  fk_venta: number;
}

/**
 * Detalles específicos para un pago en efectivo con desglose de denominación.
 */
export type Currency = "bolivares" | "dolares" | "euros";

export interface EfectivoDetails {
  currency: Currency;
  breakdown: { [value: string]: number }; // e.g., { "5": 2 } for two $5 bills
  amountInCurrency: number;
}

/**
 * Store simplificado de venta - solo guarda datos, no calcula
 */
interface VentaStore {
  /** Estado del cliente */
  cliente: ClienteType | null;
  docType: DocType;
  documento: string;

  /** Estado del carrito y pagos */
  carrito: CarritoItemType[];
  metodosPago: PaymentMethod[];

  /** Estado de la venta */
  ventaId: number | null;
  isCreatingVenta: boolean;
  error: string | null;

  /** Acciones básicas */
  setCliente: (cliente: ClienteType | null) => void;
  setDocType: (docType: DocType) => void;
  setDocumento: (documento: string) => void;
  setCarrito: (carrito: CarritoItemType[]) => void;
  setMetodosPago: (metodosPago: PaymentMethod[]) => void;
  setVentaId: (ventaId: number | null) => void;

  /** Acciones del carrito */
  agregarAlCarrito: (item: CarritoItemType) => void;
  actualizarCantidad: (sku: string, cantidad: number) => void;
  eliminarDelCarrito: (sku: string) => void;
  limpiarCarrito: () => void;

  /** Función principal para crear la venta */
  crearVentaCompleta: (totalVenta: number) => Promise<boolean>;
  
  /** Resetear store */
  resetStore: () => void;
}

/**
 * Store principal de venta usando Zustand
 * Simplificado para conectar directamente con Autopago.tsx
 */
export const useVentaStore = create<VentaStore>()(
  devtools(
    (set, get) => ({
  /** Estado inicial */
  cliente: null,
  docType: 'V',
  documento: '',
  carrito: [],
  metodosPago: [],
  ventaId: null,
  isCreatingVenta: false,
  error: null,

  /** Acciones básicas */
  setCliente: (cliente) => set({ cliente }),
  setDocType: (docType) => set({ docType }),
  setDocumento: (documento) => set({ documento }),
  setCarrito: (carrito) => set({ carrito }),
  setMetodosPago: (metodosPago) => set({ metodosPago }),
  setVentaId: (ventaId) => set({ ventaId }),

  /** Acciones del carrito */
  agregarAlCarrito: (item) => {
    const { carrito } = get();
    const existingItem = carrito.find(i => i.sku === item.sku);
    
    if (existingItem) {
      set({
        carrito: carrito.map(i => 
          i.sku === item.sku 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      });
    } else {
      set({ carrito: [...carrito, item] });
    }
  },

  actualizarCantidad: (sku, cantidad) => {
    set((state) => {
      const updatedCarrito = state.carrito
        .map((item) =>
          item.sku === sku ? { ...item, quantity: cantidad } : item
        )
        .filter((item) => item.quantity > 0); // Remove item if quantity is 0 or less

      console.log("[STORE] Cart state after update:", updatedCarrito);

      return { carrito: updatedCarrito };
    });
  },

  eliminarDelCarrito: (sku) => {
    set((state) => {
      const updatedCarrito = state.carrito.filter((item) => item.sku !== sku);
      console.log(`[STORE] Item with SKU: ${sku} removed. New cart state:`, updatedCarrito);
      return { carrito: updatedCarrito };
    });
  },

  limpiarCarrito: () => set({ carrito: [] }),

  /**
   * Función principal para crear una venta completa
   * Recibe el total calculado desde el componente Autopago
   */
  crearVentaCompleta: async (totalVenta: number) => {
    const { cliente, carrito, metodosPago } = get();
    
    if (!cliente || carrito.length === 0 || metodosPago.length === 0) {
      set({ error: 'Datos incompletos para crear la venta' });
      return false;
    }

    set({ isCreatingVenta: true, error: null });

    try {
      /** 1. Crear la venta principal usando fn_create_venta */
      const ventaData: VentaData = {
        monto_total: totalVenta,
        fk_usuario: cliente.id_usuario,
        fk_cliente_juridico: cliente.tipo_cliente === 'juridico' ? cliente.id_cliente : undefined,
        fk_cliente_natural: cliente.tipo_cliente === 'natural' ? cliente.id_cliente : undefined,
        fk_tienda_fisica: 1, // Tienda física DEFAULT
      };

      /** TODO: Llamar a la función SQL fn_create_venta */
      // const ventaId = await createVenta(ventaData);
      const ventaId = get().ventaId ?? Math.floor(Math.random() * 1000) + 1; // Usar ID existente o simular
      if (!get().ventaId) {
        set({ ventaId });
      }

      /** 2. Actualizar los detalles de la venta con los precios finales. */
      // Esto activará el trigger para actualizar el monto_total de la venta.
      const detallesFinalizados = await finalizarDetallesVenta(ventaId, carrito);
      if (!detallesFinalizados) {
          throw new Error('No se pudieron actualizar los detalles de la venta.');
      }

      /** 3. Crear los pagos usando la función registrarPagos */
      const exitoPagos = await registrarPagos(metodosPago, ventaId);

      if (!exitoPagos) {
        // Si falla el registro de pagos, idealmente se debería hacer rollback de la venta y los detalles.
        // Por ahora, solo lanzamos un error.
        throw new Error('No se pudieron registrar los pagos.');
      }

      /** 4. Actualizar el status de la venta a 'Finalizada' */
      const statusActualizado = await CompletarVenta(ventaId);
      if (!statusActualizado) {
        // La venta se creó, pero el status no se pudo actualizar.
      }

      set({ isCreatingVenta: false });
      return true;

    } catch (error) {
      console.error('Error creando venta completa:', error);
      set({ 
        error: 'Error al crear la venta. Intente nuevamente.',
        isCreatingVenta: false 
      });
      return false;
    }
  },

  /** Resetear todo el store */
  resetStore: () => set({
    cliente: null,
    docType: 'V',
    documento: '',
    carrito: [],
    metodosPago: [],
    ventaId: null,
    isCreatingVenta: false,
    error: null,
  }),
})))

