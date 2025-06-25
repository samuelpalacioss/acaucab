declare module 'jspdf-autotable' {
  import { jsPDF } from 'jspdf';

  interface AutoTableOptions {
    startY?: number;
    head?: any[][];
    body?: any[][];
    theme?: 'striped' | 'grid' | 'plain';
    columnStyles?: { [key: number]: any };
    styles?: any;
    headStyles?: any;
    bodyStyles?: any;
    alternateRowStyles?: any;
    margin?: any;
    pageBreak?: string;
    tableWidth?: number | 'auto' | 'wrap';
  }

  export default function autoTable(doc: jsPDF, options: AutoTableOptions): void;
} 