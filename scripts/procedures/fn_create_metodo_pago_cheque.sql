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
BEGIN
  -- Primero, intenta encontrar un método de pago existente con el mismo número de cheque.
  -- El número de cheque debe ser único.
  SELECT id INTO metodo_id FROM metodo_pago WHERE numero_cheque = p_numero_cheque;

  -- Si no se encuentra un método de pago existente, crea uno nuevo.
  IF metodo_id IS NULL THEN
    INSERT INTO metodo_pago(tipo, numero_cheque, número, banco)
    VALUES ('cheque', p_numero_cheque, p_numero_cuenta, p_banco) RETURNING id INTO metodo_id;
  END IF;

  -- Anexar el método de pago al cliente.
  PERFORM fn_anexar_cliente_metodo_pago(metodo_id, p_id_cliente, p_tipo_cliente);

  RETURN QUERY SELECT metodo_id as nuevo_metodo_id;
END 
$$ LANGUAGE plpgsql;
