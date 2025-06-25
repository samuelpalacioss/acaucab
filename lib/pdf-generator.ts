import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Interface para los datos de la orden de reposición
 */
interface OrdenReposicionPDF {
  id: number;
  producto: string;
  sku: string;
  ubicacion: string;
  stock: number;
  minimo: number;
  fecha: string;
  estado?: string;
  empleado?: string;
  observacion?: string;
}

/**
 * Genera un PDF con la información de una orden de reposición
 * @param orden - Datos de la orden de reposición
 */
export function generarPDFOrdenReposicion(orden: OrdenReposicionPDF) {
  // Crear nueva instancia de jsPDF
  const doc = new jsPDF();

  // Configurar fuentes y colores
  const primaryColor: [number, number, number] = [41, 128, 185]; // Azul
  const secondaryColor: [number, number, number] = [52, 73, 94]; // Gris oscuro
  
  // Título principal
  doc.setFontSize(20);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Orden de Reposición', 105, 20, { align: 'center' });
  
  // Número de orden
  doc.setFontSize(14);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text(`Orden #${orden.id}`, 105, 30, { align: 'center' });
  
  // Fecha
  doc.setFontSize(10);
  doc.text(`Fecha: ${orden.fecha}`, 20, 45);
  
  // Estado
  if (orden.estado) {
    const estadoColor = getEstadoColor(orden.estado);
    doc.setTextColor(estadoColor[0], estadoColor[1], estadoColor[2]);
    doc.text(`Estado: ${orden.estado}`, 150, 45);
  }
  
  // Información del producto
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFontSize(12);
  doc.text('Información del Producto', 20, 60);
  
  // Tabla de información del producto
  const productInfo = [
    ['Producto', orden.producto],
    ['SKU', orden.sku],
    ['Ubicación', orden.ubicacion],
    ['Unidades Solicitadas', orden.stock.toString()],
    ['Stock Mínimo', orden.minimo.toString()],
  ];
  
  autoTable(doc, {
    startY: 65,
    head: [],
    body: productInfo,
    theme: 'grid',
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 60 },
      1: { cellWidth: 'auto' }
    },
    styles: {
      fontSize: 10,
      cellPadding: 5,
    },
    headStyles: {
      fillColor: primaryColor as [number, number, number],
    },
  });
  
  // Información adicional
  let currentY = (doc as any).lastAutoTable.finalY + 15;
  
  if (orden.empleado) {
    doc.setFontSize(12);
    doc.text('Información Adicional', 20, currentY);
    currentY += 10;
    
    doc.setFontSize(10);
    doc.text(`Solicitado por: ${orden.empleado}`, 20, currentY);
    currentY += 10;
  }
  
  if (orden.observacion) {
    doc.setFontSize(12);
    doc.text('Observaciones', 20, currentY);
    currentY += 10;
    
    doc.setFontSize(10);
    // Dividir texto largo en líneas
    const lines = doc.splitTextToSize(orden.observacion, 170);
    doc.text(lines, 20, currentY);
    currentY += lines.length * 5 + 10;
  }
  
  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Documento generado automáticamente', 105, pageHeight - 20, { align: 'center' });
  doc.text(new Date().toLocaleString('es-ES'), 105, pageHeight - 15, { align: 'center' });
  
  // Descargar el PDF
  doc.save(`orden_reposicion_${orden.id}.pdf`);
}

/**
 * Obtiene el color según el estado de la orden
 */
function getEstadoColor(estado: string): [number, number, number] {
  switch (estado.toLowerCase()) {
    case 'completada':
      return [39, 174, 96]; // Verde
    case 'en proceso':
      return [41, 128, 185]; // Azul
    case 'pendiente':
      return [241, 196, 15]; // Amarillo
    case 'cancelada':
      return [231, 76, 60]; // Rojo
    default:
      return [149, 165, 166]; // Gris
  }
}

/**
 * Genera un PDF con múltiples órdenes de reposición (reporte)
 * @param ordenes - Array de órdenes de reposición
 */
export function generarReportePDFOrdenes(ordenes: OrdenReposicionPDF[]) {
  const doc = new jsPDF();
  
  // Título principal
  doc.setFontSize(20);
  doc.setTextColor(41, 128, 185);
  doc.text('Reporte de Órdenes de Reposición', 105, 20, { align: 'center' });
  
  // Fecha del reporte
  doc.setFontSize(10);
  doc.setTextColor(52, 73, 94);
  doc.text(`Generado el: ${new Date().toLocaleDateString('es-ES')}`, 105, 30, { align: 'center' });
  
  // Resumen
  doc.setFontSize(12);
  doc.text(`Total de órdenes: ${ordenes.length}`, 20, 45);
  
  // Tabla de órdenes
  const tableData = ordenes.map(orden => [
    orden.id.toString(),
    orden.producto,
    orden.sku,
    orden.ubicacion,
    orden.stock.toString(),
    orden.estado || 'N/A',
    orden.fecha
  ]);
  
  autoTable(doc, {
    startY: 55,
    head: [['ID', 'Producto', 'SKU', 'Ubicación', 'Cant.', 'Estado', 'Fecha']],
    body: tableData,
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185] as [number, number, number],
      textColor: 255,
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 25 },
      3: { cellWidth: 35 },
      4: { cellWidth: 15 },
      5: { cellWidth: 25 },
      6: { cellWidth: 25 },
    },
  });
  
  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Documento generado automáticamente', 105, pageHeight - 20, { align: 'center' });
  
  // Descargar el PDF
  doc.save(`reporte_ordenes_reposicion_${new Date().getTime()}.pdf`);
} 