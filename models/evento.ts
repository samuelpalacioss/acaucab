/**
 * TIPOS PARA Manejo de eventos
 * Interfaces para manejo de eventos con PostgreSQL
 */

export interface Evento {
    id: number;
    nombre: string;
    direccion: string;
    tipo: string;
    fecha_hora_inicio: Date;
    fecha_hora_fin: Date;
    precio_entrada?: number;
    status?:"Activo" | "Programado" | "Finalizado";
    asistencia:number;
    entradas_vendidas:number;
}

export interface TipoEvento{
    nombre:string;
}

export interface EventoMiembro{
  id1: number
  id2: string
  nombre: string
  correo: string
  productos: EventoProducto[]
}

export interface EventoProducto {
  id1: number
  id2: number
  sku: string
  nombre: string
  precio: number
  id_miembro1: number
  id_miembro2: string
  cantidad: number
}

export interface Invitado {
  id: number;
  primerNombre: string;
  primerApellido: string;
  cedula: string;
  nacionalidad: string; // V o E
  tipoInvitado: string;
  fechaHoraEntrada?: Date;
  fechaHoraSalida?: Date;
  esNuevo?: boolean;
}