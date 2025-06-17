-- Drop status system tables in correct order (handling dependencies)
DROP TABLE IF EXISTS status_orden CASCADE;
DROP TABLE IF EXISTS status_mensualidad CASCADE;
DROP TABLE IF EXISTS status_venta CASCADE;
DROP TABLE IF EXISTS status CASCADE;

-- Note: CASCADE is used to automatically drop dependent objects
-- Tables are dropped in reverse order of their creation to handle foreign key constraints
