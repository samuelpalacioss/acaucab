import { create } from 'zustand';
import { getUltimasTasas } from '../lib/api/tasas';
import { TasaType } from '@/lib/schemas';

interface TasaState {
  tasas: TasaType[];
  isLoading: boolean;
  error: string | null;
  fetchTasas: () => Promise<void>;
  getTasa: (moneda: string) => TasaType | undefined;
}

export const useTasaStore = create<TasaState>((set, get) => ({
  tasas: [],
  isLoading: false,
  error: null,
  fetchTasas: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasas = await getUltimasTasas();
      console.log('📊 Tasas de cambio obtenidas:', tasas);
      set({ tasas, isLoading: false });
    } catch (error) {
      console.error('❌ Error al obtener las tasas de cambio:', error);
      set({ isLoading: false, error: 'Failed to fetch exchange rates' });
    }
  },
  getTasa: (moneda) => {
    const { tasas } = get();
    return tasas.find(t => t.moneda.toUpperCase() === moneda.toUpperCase());
  },
})); 