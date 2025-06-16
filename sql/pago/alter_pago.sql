-- Reset all sequences to 1
ALTER SEQUENCE metodo_pago_id_seq RESTART WITH 1;
ALTER SEQUENCE afiliacion_id_seq RESTART WITH 1;
ALTER SEQUENCE mensualidad_id_seq RESTART WITH 1;
ALTER SEQUENCE tasa_id_seq RESTART WITH 1;
ALTER SEQUENCE miembro_metodo_pago_id_seq RESTART WITH 1;
ALTER SEQUENCE cliente_metodo_pago_id_seq RESTART WITH 1;

-- Note: This will ensure all new inserts start from ID 1
