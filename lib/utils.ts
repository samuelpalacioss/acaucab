import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getUltimaTasaByMoneda } from "@/api/get-ultima-tasa-by-moneda";
import { useTasaStore } from "@/store/tasa-store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCardType = (cardNumber: string): string => {
  if (cardNumber.startsWith("4")) return "Visa";
  if (cardNumber.startsWith("5")) return "Mastercard";
  if (cardNumber.startsWith("3")) return "American Express";
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