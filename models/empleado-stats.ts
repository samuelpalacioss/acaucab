/**
 * Tipos para estadísticas de empleados
 */

export interface EmpleadoStat {
  fk_empleado: number
  total_ventas: number
  nombre_empleado: string
  identificacion: string
  cargo: string
  departamento: string
}

export interface EmpleadoInfo {
  id_empleado: number
  nombre_completo: string
  identificacion: string
  fecha_nacimiento: string
  cargo: string
  departamento: string
  salario_base: number
  fecha_inicio_nomina: string
  fecha_fin_nomina: string
}

export interface EmpleadoStatsResponse {
  stats: EmpleadoStat[]
  totalEmpleados: number
  totalVentas: number
  promedioVentas: number
  mejorEmpleado: EmpleadoStat | null
} 