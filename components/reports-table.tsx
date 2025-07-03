"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, FileText } from "lucide-react";

const backUrl = "http://localhost:8081/reporte";

// Datos de ejemplo para los reportes
const allReports = [
  {
    id: 1,
    name: "Empleados con Mayor Frecuencia de Incumplimiento de Horarios",
    category: "RRHH",
    format: "PDF",
    file: "IncumplimientosDeHorario",
  },
  {
    id: 2,
    name: "Valor Monetario Total de Puntos Canjeados Por Clientes Afiliados",
    category: "Ventas",
    format: "PDF",
    file: "TotalPuntosBs",
  },
  {
    id: 3,
    name: "Proporción de Clientes Jurídicos vs Naturales y su Valor Promedio de Pedido",
    category: "Ventas",
    format: "PDF",
    file: "ProporcionClientes",
  },
  {
    id: 4,
    name: "Análisis de los Tipos de Cervezas mas Vendidos y su Graduación Alcohólica Promedio",
    category: "Ventas",
    format: "PDF",
    file: "CervezasMasVendidas",
  },
  {
    id: 5,
    name: "Análisis de Puntualidad por Cargo",
    category: "RRHH",
    format: "PDF",
    file: "Puntualidad",
  },
  {
    id: 6,
    name: "Comparación de Ventas entre Tienda Física y Tienda Web",
    category: "Ventas",
    format: "PDF",
    file: "comparacion-ventas",
  },
  {
    id: 7,
    name: "Top 10 productos más vendidos",
    category: "Ventas",
    format: "PDF",
    file: "top10productos",
  },
  {
    id: 8,
    name: "Niveles de Stock",
    category: "Ventas",
    format: "PDF",
    file: "nivel-stock",
  },
  {
    id: 9,
    name: "Gráfico de Tendencia de Ventas",
    category: "Ventas",
    format: "PDF",
    file: "grafico-ventas",
  },
];

interface ReportsTableProps {
  category?: string;
}

export function ReportsTable({ category }: ReportsTableProps) {
  // Filtrar reportes por categoría si se proporciona
  const reports = category ? allReports.filter((report) => report.category === category) : allReports;

  // Estadísticas de reportes
  const totalReports = reports.length;
  const pdfReports = reports.filter((report) => report.format === "PDF").length;
  const excelReports = reports.filter((report) => report.format === "Excel").length;

  const handleDownload = (reportId: number, reportName: string, reportFile: string) => {
    if (reportFile === "nivel-stock") {
      console.log(`Descargando reporte "${reportName}"`);
      const url = `${backUrl}/nivel-stock`;
      window.open(url, "_blank");
      return;
    }

    const startDateInput = document.getElementById(`start-date-${reportId}`) as HTMLInputElement;
    const endDateInput = document.getElementById(`end-date-${reportId}`) as HTMLInputElement;

    const startDate = startDateInput?.value;
    const endDate = endDateInput?.value;

    if (!startDate || !endDate) {
      alert("Por favor selecciona ambas fechas para generar el reporte");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("La fecha de inicio debe ser anterior a la fecha de fin");
      return;
    }

    console.log(`Descargando reporte "${reportName}" desde ${startDate} hasta ${endDate}`);
    const url = `${backUrl}?fechaInicio=${startDate}&fechaFin=${endDate}&nombreReporte=${reportFile}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="font-medium">Reportes disponibles</h3>
          <p className="text-sm text-muted-foreground">
            Selecciona el período y descarga los reportes generados por el sistema.
          </p>
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Formato</TableHead>
              <TableHead className="text-right">Período y Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{report.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{report.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{report.format}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {report.file === "nivel-stock" ? (
                    <div className="flex items-center justify-end gap-4">
                      <p className="text-sm text-muted-foreground italic">Traerá los niveles más recientes</p>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleDownload(report.id, report.name, report.file)}
                        className="h-8"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-end gap-2 justify-end">
                      <div className="flex flex-col gap-1">
                        <Label htmlFor={`start-date-${report.id}`} className="text-xs">
                          Fecha inicio
                        </Label>
                        <Input id={`start-date-${report.id}`} type="date" className="w-36 h-8 text-xs" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label htmlFor={`end-date-${report.id}`} className="text-xs">
                          Fecha fin
                        </Label>
                        <Input id={`end-date-${report.id}`} type="date" className="w-36 h-8 text-xs" />
                      </div>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleDownload(report.id, report.name, report.file)}
                        className="h-8"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
  );
}
