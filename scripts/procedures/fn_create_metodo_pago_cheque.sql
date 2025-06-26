DROP FUNCTION IF EXISTS fn_create_metodo_pago_cheque(INTEGER, VARCHAR, BIGINT, BIGINT, VARCHAR);

CREATE OR REPLACE FUNCTION fn_create_metodo_pago_cheque(
  p_id_cliente INTEGER,
  p_tipo_cliente VARCHAR,
  p_numero_cheque BIGINT,
  p_numero_cuenta BIGINT,
  p_banco VARCHAR
)
RETURNS TABLE(nuevo_metodo_id INTEGER) AS $$
DECLARE
  metodo_id INTEGER;
  cliente_metodo_pago_id INTEGER;
BEGIN
  -- Siempre crea un nuevo método de pago de tipo 'cheque'.
  -- La constraint UNIQUE en 'numero_cheque' previene la inserción de un cheque duplicado.
  INSERT INTO metodo_pago(tipo, numero_cheque, numero_cuenta, banco)
  VALUES ('cheque', p_numero_cheque, p_numero_cuenta, p_banco) RETURNING id INTO metodo_id;

  -- Anexar el método de pago al cliente y capturar el ID de la tabla de enlace.
  cliente_metodo_pago_id := fn_anexar_cliente_metodo_pago(metodo_id, p_id_cliente, p_tipo_cliente);

  RETURN QUERY SELECT cliente_metodo_pago_id as nuevo_metodo_id;
END 
$$ LANGUAGE plpgsql;
