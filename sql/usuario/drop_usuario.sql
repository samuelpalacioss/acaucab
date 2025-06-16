/**
 * Script para eliminar las tablas relacionadas con usuarios
 * Elimina las tablas: usuario, rol, miembro, correo, cliente_natural, cliente_juridico,
 * cliente_usuario, telefono, persona_contacto, empleado_usuario, miembro_usuario,
 * permiso, permiso_rol
 * Usa CASCADE para eliminar automáticamente las dependencias
 */

DROP TABLE permiso_rol CASCADE;
DROP TABLE permiso CASCADE;
DROP TABLE miembro_usuario CASCADE;
DROP TABLE empleado_usuario CASCADE;
DROP TABLE persona_contacto CASCADE;
DROP TABLE telefono CASCADE;
DROP TABLE cliente_usuario CASCADE;
DROP TABLE cliente_juridico CASCADE;
DROP TABLE cliente_natural CASCADE;
DROP TABLE usuario CASCADE;
DROP TABLE correo CASCADE;
DROP TABLE miembro CASCADE;
DROP TABLE rol CASCADE; 