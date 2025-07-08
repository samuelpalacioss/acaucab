import { AvailablePaymentMethods } from "@/components/cajero/payment-view"
import { z } from "zod"

// Schema for phone numbers
const telefonoSchema = z.object({
  prefijo: z.string().min(4, "El prefijo es requerido"),
  numero: z.string().min(7, "El número debe tener al menos 7 dígitos"),
  denominacion: z.string()
})

// Schema for contact persons
const personaContactoSchema = z.object({
  nombreCompleto: z.string().min(1, "El nombre es requerido"),
  cedula: z.string().min(1, "La cédula es requerida"),
  telefono: z.object({
    prefijo: z.string().min(4, "El prefijo es requerido"),
    numero: z.string().min(7, "El número debe tener al menos 7 dígitos")
  }),
  email: z.string().email("Email inválido")
})

// Schema for the first step (contact information)
export const contactoFormSchema = z.object({
  telefonos: z.string().min(1, "Al menos un teléfono es requerido"),
  correoElectronico: z.string().email("Email inválido"),
  paginaWeb: z.string().optional(),
  personasContacto: z.string().optional()
})

// Schema for address information
const direccionSchema = z.object({
  estado: z.string().min(1, "El estado es requerido"),
  municipio: z.string().min(1, "El municipio es requerido"),
  parroquia: z.string().min(1, "La parroquia es requerida"),
})

// Schema for the second step (address information) - Natural person
export const direccionNaturalFormSchema = z.object({
  ...direccionSchema.shape,
  direccionHabitacion: z.string().min(1, "La dirección es requerida"),
})

// Schema for the second step (address information) - Juridical person
export const direccionJuridicaFormSchema = z.object({
  ...direccionSchema.shape,
  direccionFiscal: z.string().min(1, "La dirección fiscal es requerida"),
  // Physical address fields
  estadoFisico: z.string().min(1, "El estado es requerido"),
  municipioFisico: z.string().min(1, "El municipio es requerido"),
  parroquiaFisica: z.string().min(1, "La parroquia es requerida"),
  direccionFisica: z.string().min(1, "La dirección física es requerida"),
}) 

export const clienteSchema = z.object({
  id_usuario: z.number(),
  id_cliente: z.number(),
  nombre_completo: z.string(),
  razon_social: z.string().nullable(),
  denominacion_comercial: z.string().nullable(), 
  email: z.string().email(),
  telefono: z.string().nullable(),
  rol_nombre: z.string(),
  id_rol: z.number(),
  tipo_cliente: z.enum(['natural', 'juridico']),
  identificacion: z.string(),
  direccion: z.string(),
  direccion_fiscal: z.string().nullable()
});

export type DocType = "V" | "E" | "J" | "P";

export type ClienteType = z.infer<typeof clienteSchema>;

export const presentacionSchema = z.object({
  sku: z.string(),
  nombre_cerveza: z.string(),
  presentacion: z.string(),
  precio: z.number(),
  presentacion_id: z.number(),
  cerveza_id: z.number(),
  id_tipo_cerveza: z.number(),
  tipo_cerveza: z.string(),
  stock_total: z.number(),
  marca: z.string(),
  imagen: z.string().url().nullable()
});

export type PresentacionType = z.infer<typeof presentacionSchema>;

export const carritoItemSchema = presentacionSchema.extend({
  quantity: z.number(),
});

export type CarritoItemType = z.infer<typeof carritoItemSchema>;

// Para tarjeta
export interface TarjetaDetails {
  nombreTitular?: string;
  numeroTarjeta: string;
  fechaExpiracion: string;
  banco: string;
  amountPaid: number;
  tipo?: string;
  metodo_pago_id?: number | null;
  cardId?: string;
}

// Para efectivo
export interface EfectivoDetails {
  currency: 'dolares' | 'euros' | 'bolivares';
  breakdown?: { [value: string]: number };
  denominacion?: string;
  montoRecibido: number;
  cambio: number;
  amountPaid: number;
  metodo_pago_id?: number | null;
}


// Para puntos
export interface PuntosDetails {
  puntosUtilizados: number;
  equivalenciaBs: number;
  amountPaid: number;
  metodo_pago_id?: number | null;
}

export type PaymentDetails = TarjetaDetails | EfectivoDetails | PuntosDetails;

// Type Guards for identifying payment details
export function isTarjetaDetails(details: any): details is TarjetaDetails {
  return "nombreTitular" in details || "numeroTarjeta" in details || "cardId" in details;
}
export function isEfectivoDetails(details: any): details is EfectivoDetails {
  return "currency" in details;
}
export function isPuntosDetails(details: any): details is PuntosDetails {
  return "puntosUtilizados" in details;
}

/**
 * Interface para los métodos de pago - tal como se usan en Autopago.tsx
 */
export interface PaymentMethod {
  method: AvailablePaymentMethods;
  details: PaymentDetails;
}

export const loginSchema = z.object({
  email: z.string().email({ message: "Por favor ingrese un email válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export type loginType = z.infer<typeof loginSchema>;

/**
 * Esquema de validación para una Tasa de Cambio
 */
export const tasaSchema = z.object({
  id: z.number(),
  moneda: z.string(),
  monto_equivalencia: z.number(),
  fecha_inicio: z.string(),
});

export type TasaType = z.infer<typeof tasaSchema>;

export type CarritoItemEventoType = CarritoItemType & {
  proveedorId1?: number;
  proveedorId2?: string;
  evento_id?: number;
};
