/**
 * Script para reiniciar las secuencias de las tablas de eventos
 */

ALTER SEQUENCE tipo_evento_id_seq RESTART WITH 1;
ALTER SEQUENCE tipo_invitado_id_seq RESTART WITH 1;
ALTER SEQUENCE invitado_id_seq RESTART WITH 1;
ALTER SEQUENCE evento_id_seq RESTART WITH 1;