import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getUltimaTasaByMoneda } from "@/api/get-ultima-tasa-by-moneda";
import { useTasaStore } from "@/store/tasa-store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Floors a number to 2 decimal places and returns it as a string with two decimal points.
 * This avoids potentially confusing rounding up in currency display.
 * @param amount - The amount to format.
 * @returns The formatted currency string.
 */
export const formatCurrency = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined) {
    return '0.00';
  }
  const flooredAmount = Math.floor(amount * 100) / 100;
  return flooredAmount.toFixed(2);
};

export const getCardType = (cardNumber: string): string => {
  const cleanCardNumber = cardNumber.replace(/\s/g, "");
  if (cleanCardNumber.startsWith("4")) return "Visa";
  if (cleanCardNumber.startsWith("5")) return "Mastercard";
  if (cleanCardNumber.startsWith("3")) return "American Express";
  return "Tarjeta";
};

/**
 * Initializes the exchange rate store by fetching rates for USD, EUR, and PUNTO.
 * Should be called once in a top-level component.
 */
export const inicializarTasas = () => {
  useTasaStore.getState().fetchTasas();
};

/**
 * Converts an amount from one currency to another using the pre-fetched rates from the store.
 * @param monto - The amount to convert.
 * @param monedaDestino - The target currency.
 * @returns The converted amount or null if the rate is not available.
 */
export const convertir = (monto: number, monedaDestino: string): number | null => {
  const tasa = useTasaStore.getState().getTasa(monedaDestino);
  
  if (!tasa || !tasa.monto_equivalencia) {
    console.error(`Tasa de cambio para ${monedaDestino} no disponible en el store.`);
    return null;
  }

  const montoConvertido = monto / tasa.monto_equivalencia;
  return montoConvertido;
};

export function formatDate(dateStr: string | Date): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}