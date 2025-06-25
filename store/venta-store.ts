import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { 
  ClienteType, 
  CarritoItemType, 
  DocType,
  PaymentMethod,
  TarjetaDetails
} from '@/lib/schemas';
import { getCardType } from '@/lib/utils';

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
 * Detalles específicos para un pago con cheque.
 */
export interface ChequeDetails {
  numeroCheque?: string;
  numeroCuenta?: string;
  banco?: string;
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
 * Interface para los datos de pago - fn_create_pago
 */
export interface PagoData {
  monto: number;
  fecha_pago: Date;
  fk_tasa: number;
  tipo_transaccion: 'VENTA';
  tipo_metodo_pago: 'MIEMBRO' | 'CLIENTE';
  fk_venta: number;
  fk_miembro_metodo_pago_1?: number;
  fk_cliente_metodo_pago_1?: number;
  detalles_cheque?: ChequeDetails;
  detalles_tarjeta?: TarjetaDetails;
  detalles_efectivo?: EfectivoDetails;
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
    const { carrito } = get();
    
    if (cantidad <= 0) {
      set({ carrito: carrito.filter(item => item.sku !== sku) });
    } else {
      set({
        carrito: carrito.map(item =>
          item.sku === sku ? { ...item, quantity: cantidad } : item
        )
      });
    }
  },

  eliminarDelCarrito: (sku) => {
    const { carrito } = get();
    set({ carrito: carrito.filter(item => item.sku !== sku) });
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
        fk_cliente_juridico: cliente.tipo_usuario === 'Cliente Juridico' ? cliente.id_usuario : undefined,
        fk_cliente_natural: cliente.tipo_usuario === 'Cliente Natural' ? cliente.id_usuario : undefined,
        fk_tienda_fisica: 1, // Tienda física para autopago
      };

      /** TODO: Llamar a la función SQL fn_create_venta */
      // const ventaId = await createVenta(ventaData);
      const ventaId = Math.floor(Math.random() * 1000) + 1; // Simulación
      set({ ventaId });

      /** 2. Crear los detalles de presentación usando fn_create_detalle_presentacion */
      for (const item of carrito) {
        const detalleData: DetalleVentaData = {
          cantidad: item.quantity,
          precio_unitario: item.precio,
          fk_presentacion: parseInt(item.sku),
          fk_cerveza: item.id_tipo_cerveza,
          fk_venta: ventaId,
        };

        /** TODO: Llamar a la función SQL fn_create_detalle_presentacion */
        // await createDetallePresentacion(detalleData);
      }

      /** 3. Crear los pagos usando fn_create_pago */
      for (const metodoPago of metodosPago) {
        const details = metodoPago.details as any;
        const method = metodoPago.method as any;

        const pagoData: PagoData = {
          monto: details.amountPaid,
          fecha_pago: new Date(),
          fk_tasa: 1, // TODO: Obtener tasa actual
          tipo_transaccion: 'VENTA',
          tipo_metodo_pago: 'CLIENTE',
          fk_venta: ventaId,
          fk_cliente_metodo_pago_1: 1, // TODO: Obtener del cliente
        };
        
        // Si es tarjeta, añadir el tipo de tarjeta
        if (method === "tarjetaCredito" || method === "tarjetaDebito") {
          pagoData.detalles_tarjeta = details as TarjetaDetails;
        }

        if (method === "cheque") {
          const chequeDetails = details;
          pagoData.detalles_cheque = {
            numeroCheque: chequeDetails.numeroCheque,
            numeroCuenta: chequeDetails.numeroCuenta,
            banco: chequeDetails.banco,
          };
        }

        if (method === "efectivo") {
          const efectivoDetails = details as EfectivoDetails;
          pagoData.detalles_efectivo = {
            currency: efectivoDetails.currency,
            breakdown: efectivoDetails.breakdown,
            amountInCurrency: efectivoDetails.amountInCurrency,
          };
        }
        /** TODO: Llamar a la función SQL fn_create_pago */
        // await createPago(pagoData);
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

