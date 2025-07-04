/**
 * TIPOS PARA Manejo de eventos
 * Interfaces para manejo de eventos con PostgreSQL
 */

export interface Evento {
    id: number;
    nombre: string;
    direccion: string;
    tipo: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    precio_entrada?: number;
    status?:"Activo" | "Programado" | "Finalizado";
    asistencia:number;
    entradas_vendidas:number;
}

export interface TipoEvento{
    nombre:string;
}