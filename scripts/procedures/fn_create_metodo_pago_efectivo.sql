DROP FUNCTION IF EXISTS fn_create_metodo_pago_efectivo(INTEGER, VARCHAR, VARCHAR);

CREATE OR REPLACE FUNCTION fn_create_metodo_pago_efectivo(
  p_id_cliente INTEGER,
  p_tipo_cliente VARCHAR,
  p_denominacion VARCHAR
)
RETURNS TABLE(nuevo_metodo_id INTEGER) AS $$ 
DECLARE 
  metodo_id INTEGER;
BEGIN
  -- Intenta encontrar un método de pago existente
  SELECT id INTO metodo_id 
  FROM metodo_pago 
  WHERE tipo = 'efectivo' AND denominación = p_denominacion;

  -- Si no existe, crea uno nuevo
  IF metodo_id IS NULL THEN
    INSERT INTO metodo_pago(tipo, denominación)
    VALUES ('efectivo', p_denominacion) 
    RETURNING id INTO metodo_id;
  END IF;

  -- Anexar el método de pago al cliente.
  PERFORM fn_anexar_cliente_metodo_pago(metodo_id, p_id_cliente, p_tipo_cliente);

  RETURN QUERY SELECT metodo_id as nuevo_metodo_id;

END;
$$ language plpgsql