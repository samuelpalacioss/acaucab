DROP FUNCTION IF EXISTS fn_create_metodo_pago_punto();

CREATE OR REPLACE FUNCTION fn_create_metodo_pago_punto()
RETURNS TABLE(nuevo_metodo_id INTEGER) AS $$
DECLARE
  metodo_id INTEGER;
BEGIN

  INSERT INTO metodo_pago(tipo, fecha_adquisicion, fecha_canjeo)
  VALUES ('punto', CURRENT_DATE, NULL)
  RETURNING id INTO metodo_id;

  RETURN QUERY SELECT metodo_id as nuevo_metodo_id;
END 
$$ language plpgsql