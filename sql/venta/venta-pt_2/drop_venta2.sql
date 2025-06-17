/**
 * Script para eliminar las tablas relacionadas con ventas
 * Elimina las tablas: detalle_evento, orden_de_compra, venta_evento
 * Usa CASCADE para eliminar automáticamente las dependencias
 * Se eliminan en orden inverso de creación para evitar problemas de FK
 */

DROP TABLE detalle_evento CASCADE;
DROP TABLE orden_de_compra CASCADE;
DROP TABLE venta_evento CASCADE; 