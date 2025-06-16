-- Reset sequences for status tables
ALTER SEQUENCE status_id_seq RESTART WITH 1;

-- Note: Only status table has a SERIAL column (id)
-- Other tables use foreign keys or composite primary keys 