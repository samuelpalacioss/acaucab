DROP FUNCTION IF EXISTS fn_create_metodo_pago_tarjeta_credito(VARCHAR, INTEGER, VARCHAR, DATE);
DROP FUNCTION IF EXISTS fn_create_metodo_pago_tarjeta_credito(VARCHAR, BIGINT, VARCHAR, DATE);

CREATE OR REPLACE FUNCTION fn_create_metodo_pago_tarjeta_credito(
  p_tipo_tarjeta VARCHAR,
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
    INSERT INTO metodo_pago(tipo, tipo_tarjeta, número, banco, fecha_vencimiento)
    VALUES ('tarjeta_credito', p_tipo_tarjeta, p_numero, p_banco, p_fecha_vencimiento)
    RETURNING id INTO metodo_id;
  END IF;

  RETURN QUERY SELECT metodo_id as nuevo_metodo_id;
END;
$$ language plpgsql