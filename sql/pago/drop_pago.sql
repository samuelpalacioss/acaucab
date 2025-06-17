-- Drop payment system tables in correct order (handling dependencies)
DROP TABLE IF EXISTS cliente_metodo_pago CASCADE;
DROP TABLE IF EXISTS miembro_metodo_pago CASCADE;
DROP TABLE IF EXISTS mensualidad CASCADE;
DROP TABLE IF EXISTS afiliacion CASCADE;
DROP TABLE IF EXISTS tasa CASCADE;
DROP TABLE IF EXISTS metodo_pago CASCADE;
DROP TABLE IF EXISTS pago CASCADE;

-- Note: CASCADE is used to automatically drop dependent objects
-- Tables are dropped in reverse order of their creation to handle foreign key constraints
