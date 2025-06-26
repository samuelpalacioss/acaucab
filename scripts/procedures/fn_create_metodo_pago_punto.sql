DROP FUNCTION IF EXISTS fn_create_metodo_pago_punto(INTEGER, VARCHAR);

CREATE OR REPLACE FUNCTION fn_create_metodo_pago_punto(
  p_id_cliente INTEGER,
  p_tipo_cliente VARCHAR
)
RETURNS TABLE(nuevo_metodo_id INTEGER) AS $$
DECLARE
  metodo_id INTEGER;
BEGIN
  -- Siempre se crea un nuevo método de pago de tipo 'punto'
  INSERT INTO metodo_pago(tipo, fecha_adquisicion, fecha_canjeo)
  VALUES ('punto', CURRENT_DATE, NULL)
  RETURNING id INTO metodo_id;

  -- Anexar el método de pago al cliente.
  PERFORM fn_anexar_cliente_metodo_pago(metodo_id, p_id_cliente, p_tipo_cliente);

  RETURN QUERY SELECT metodo_id as nuevo_metodo_id;
END 
$$ language plpgsql