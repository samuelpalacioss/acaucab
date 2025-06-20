'use server';

import {
  VentaByIdResponse,
  VentaDetalleExpansida,
  transformarVentaByIdResponse,
} from "@/models/venta";
import { llamarFuncion } from "@/lib/server-actions";

export async function getVentaById(
  id: number
): Promise<VentaDetalleExpansida | null> {
  // La función de BD devuelve un array de filas (una por producto)
  const ventaRows = await llamarFuncion<VentaByIdResponse>(
    "fn_get_venta_by_id",
    { p_venta_id: id }
  );

  // Transformamos el array plano en un objeto de venta anidado
  return transformarVentaByIdResponse(ventaRows);
}