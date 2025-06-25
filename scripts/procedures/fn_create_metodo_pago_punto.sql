DROP FUNCTION IF EXISTS fn_create_metodo_pago_punto();

CREATE OR REPLACE FUNCTION fn_create_metodo_pago_punto()
RETURNS INTEGER AS $$
DECLARE
  nuevo_metodo_id INTEGER;
BEGIN

  INSERT INTO metodo_pago(tipo, fecha_adquisicion, fecha_canjeo)
  VALUES ('punto', CURRENT_DATE, NULL)
  RETURNING id INTO nuevo_metodo_id;

  RETURN nuevo_metodo_id;
END 
$$ language plpgsql