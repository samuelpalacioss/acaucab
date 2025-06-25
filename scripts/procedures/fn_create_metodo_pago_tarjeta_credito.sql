DROP FUNCTION IF EXISTS fn_create_metodo_pago_tarjeta_credito(VARCHAR, INTEGER, VARCHAR, DATE);

CREATE OR REPLACE FUNCTION fn_create_metodo_pago_tarjeta_credito(
  p_tipo_tarjeta VARCHAR,
  p_numero INTEGER,
  p_banco VARCHAR,
  p_fecha_vencimiento DATE
)
RETURNS INTEGER AS $$ 
DECLARE 
  nuevo_metodo_id INTEGER;
BEGIN
  INSERT INTO metodo_pago(tipo, tipo_tarjeta, número, banco, fecha_vencimiento)
  VALUES ('tarjeta_credito', p_tipo_tarjeta, p_numero, p_banco, p_fecha_vencimiento)
  RETURNING id INTO nuevo_metodo_id;

  RETURN nuevo_metodo_id;
END;
$$ language plpgsql