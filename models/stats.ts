export interface TotalGeneradoTienda {
  tienda_nombre: string;
  tipo_tienda: string;
  total_generado: number;
}

export interface SalesGrowthData {
  periodo: string;
  ventas_totales: number;
  crecimiento_abs: number | null;
  crecimiento_pct: number | null;
} 