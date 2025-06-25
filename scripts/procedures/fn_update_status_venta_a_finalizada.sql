DROP FUNCTION IF EXISTS fn_update_status_venta_a_finalizada(INTEGER);

CREATE OR REPLACE FUNCTION fn_update_status_venta_a_finalizada(
  p_venta_id INTEGER
)
RETURNS INTEGER AS $$
DECLARE
  s_actualizado INTEGER;
BEGIN

  UPDATE status_venta
  SET fk_status = (SELECT id FROM status WHERE nombre = 'Finalizada')
  WHERE fk_venta = p_venta_id
  RETURNING id INTO s_actualizado;

  RETURN s_actualizado;
END;
$$ language plpgsql;