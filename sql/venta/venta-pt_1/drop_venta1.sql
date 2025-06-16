/**
 * Script para eliminar las tablas relacionadas con ventas parte 1
 * Elimina las tablas: detalle_presentacion, miembro_presentacion_cerveza, venta
 * Usa CASCADE para eliminar automáticamente las dependencias
 */

DROP TABLE detalle_presentacion CASCADE;
DROP TABLE miembro_presentacion_cerveza CASCADE;
DROP TABLE venta CASCADE; 