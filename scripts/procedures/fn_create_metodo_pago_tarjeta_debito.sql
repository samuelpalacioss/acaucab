DROP FUNCTION IF EXISTS fn_create_metodo_pago_tarjeta_debito(INTEGER, VARCHAR, DATE);
DROP FUNCTION IF EXISTS fn_create_metodo_pago_tarjeta_debito(BIGINT, VARCHAR, DATE);

CREATE OR REPLACE FUNCTION fn_create_metodo_pago_tarjeta_debito(
  p_numero BIGINT,
  p_banco VARCHAR,
  p_fecha_vencimiento DATE
)
RETURNS TABLE(nuevo_metodo_id INTEGER) AS $$
DECLARE
  metodo_id INTEGER;
BEGIN
  -- Primero, intenta encontrar un método de pago existente con el mismo número de tarjeta.
  SELECT id INTO metodo_id FROM metodo_pago WHERE número = p_numero;

  -- Si no se encuentra un método de pago existente, crea uno nuevo.
  IF metodo_id IS NULL THEN
    INSERT INTO metodo_pago(tipo, número, banco, fecha_vencimiento)
    VALUES ('tarjeta_debito', p_numero, p_banco, p_fecha_vencimiento) RETURNING id into metodo_id;
  END IF;

  RETURN QUERY SELECT metodo_id as nuevo_metodo_id;
END 
$$ language plpgsql