/**
 * Script para eliminar las tablas relacionadas con eventos
 * Elimina las tablas: evento, tipo_evento, tipo_invitado, invitado, invitado_evento, evento_cliente, stock_miembro
 * Usa CASCADE para eliminar automáticamente las dependencias
 */

DROP TABLE stock_miembro CASCADE;
DROP TABLE evento_cliente CASCADE;
DROP TABLE invitado_evento CASCADE;
DROP TABLE evento CASCADE;
DROP TABLE invitado CASCADE;
DROP TABLE tipo_invitado CASCADE;
DROP TABLE tipo_evento CASCADE; 