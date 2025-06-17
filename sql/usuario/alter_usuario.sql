/**
 * Script para reiniciar las secuencias de las tablas del módulo usuario
 * Esto asegura que los IDs empiecen desde 1
 */

-- Reiniciar secuencia de rol
ALTER SEQUENCE rol_id_seq RESTART WITH 1;

-- Reiniciar secuencia de correo
ALTER SEQUENCE correo_id_seq RESTART WITH 1;

-- Reiniciar secuencia de usuario
ALTER SEQUENCE usuario_id_seq RESTART WITH 1;

-- Reiniciar secuencia de cliente_natural
ALTER SEQUENCE cliente_natural_id_seq RESTART WITH 1;

-- Reiniciar secuencia de cliente_juridico
ALTER SEQUENCE cliente_juridico_id_seq RESTART WITH 1;



-- Reiniciar secuencia de telefono
ALTER SEQUENCE telefono_id_seq RESTART WITH 1;

-- Reiniciar secuencia de persona_contacto
ALTER SEQUENCE persona_contacto_id_seq RESTART WITH 1;

-- Reiniciar secuencia de permiso
ALTER SEQUENCE permiso_id_seq RESTART WITH 1; 