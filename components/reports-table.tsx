"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, BarChart, FileText, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

// Datos de ejemplo para los reportes
const allReports = [
  {
    id: 1,
    name: "Reporte de Ventas Mensual",
    category: "Ventas",
    date: "30/04/2025",
    format: "PDF",
    description:
      "Análisis detallado de ventas del mes, incluyendo productos más vendidos, ingresos totales y comparativa con meses anteriores.",
    pages: 12,
    createdBy: "Sistema",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Análisis de Inventario",
    category: "Inventario",
    date: "28/04/2025",
    format: "Excel",
    description:
      "Estado actual del inventario, productos con stock bajo, rotación de inventario y valoración de existencias.",
    pages: 8,
    createdBy: "Juan Pérez",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "Rendimiento de Promociones",
    category: "Marketing",
    date: "25/04/2025",
    format: "PDF",
    description:
      "Análisis del impacto de las promociones recientes, incluyendo incremento en ventas, nuevos clientes captados y ROI.",
    pages: 15,
    createdBy: "María González",
    size: "3.2 MB",
  },
  {
    id: 4,
    name: "Métricas de Sostenibilidad",
    category: "ODS",
    date: "20/04/2025",
    format: "PDF",
    description:
      "Indicadores de cumplimiento de Objetivos de Desarrollo Sostenible, huella de carbono y acciones de responsabilidad social.",
    pages: 20,
    createdBy: "Sistema",
    size: "4.5 MB",
  },
  {
    id: 5,
    name: "Análisis de Proveedores",
    category: "Compras",
    date: "15/04/2025",
    format: "Excel",
    description:
      "Evaluación de proveedores, tiempos de entrega, calidad de productos y análisis de costos comparativos.",
    pages: 10,
    createdBy: "Carlos Rodríguez",
    size: "2.1 MB",
  },
  {
    id: 6,
    name: "Reporte de Asistencia",
    category: "RRHH",
    date: "10/04/2025",
    format: "PDF",
    description:
      "Registro de asistencia de empleados, horas trabajadas, ausencias justificadas e injustificadas y horas extra.",
    pages: 18,
    createdBy: "Sistema",
    size: "3.7 MB",
  },
  {
    id: 7,
    name: "Análisis de Ventas por Región",
    category: "Ventas",
    date: "05/04/2025",
    format: "PDF",
    description: "Distribución geográfica de ventas, rendimiento por región y oportunidades de expansión.",
    pages: 14,
    createdBy: "Ana Martínez",
    size: "2.9 MB",
  },
  {
    id: 8,
    name: "Reporte de Capacitación",
    category: "RRHH",
    date: "01/04/2025",
    format: "Excel",
    description:
      "Registro de capacitaciones realizadas, participantes, evaluaciones y necesidades futuras de formación.",
    pages: 9,
    createdBy: "Luis Sánchez",
    size: "1.5 MB",
  },
]

interface ReportsTableProps {
  category?: string
}

export function ReportsTable({ category }: ReportsTableProps) {
  const router = useRouter()

  // Filtrar reportes por categoría si se proporciona
  const reports = category ? allReports.filter((report) => report.category === category) : allReports

  // Estadísticas de reportes
  const totalReports = reports.length
  const pdfReports = reports.filter((report) => report.format === "PDF").length
  const excelReports = reports.filter((report) => report.format === "Excel").length

  // Función para navegar al detalle del reporte
  const handleViewReport = (id: number) => {
    router.push(`/reportes/listado/${id}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="font-medium">Reportes disponibles</h3>
          <p className="text-sm text-muted-foreground">Accede a los reportes generados por el sistema.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="border rounded-md p-4 text-center">
          <div className="text-2xl font-bold">{totalReports}</div>
          <div className="text-sm text-muted-foreground">Total reportes</div>
        </div>
        <div className="border rounded-md p-4 text-center">
          <div className="text-2xl font-bold">{pdfReports}</div>
          <div className="text-sm text-muted-foreground">PDF</div>
        </div>
        <div className="border rounded-md p-4 text-center">
          <div className="text-2xl font-bold">{excelReports}</div>
          <div className="text-sm text-muted-foreground">Excel</div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Formato</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow
              key={report.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleViewReport(report.id)}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">{report.name}</span>
                </div>
              </TableCell>
              <TableCell>{report.category}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>
                <Badge variant="outline">{report.format}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewReport(report.id)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Aquí iría la lógica de descarga
                      console.log(`Descargando reporte ${report.id}`)
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center pt-2">
        <div className="text-sm text-muted-foreground">
          Mostrando {reports.length} de {allReports.length} reportes
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm">
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
