DROP FUNCTION IF EXISTS fn_create_metodo_pago_tarjeta_debito(INTEGER, VARCHAR, DATE);

CREATE OR REPLACE FUNCTION fn_create_metodo_pago_tarjeta_debito(
  p_numero INTEGER,
  p_banco VARCHAR,
  p_fecha_vencimiento DATE
)
RETURNS INTEGER AS $$
DECLARE
  nuevo_metodo_id INTEGER;
BEGIN
  INSERT INTO metodo_pago(tipo, numero, banco, fecha_vencimiento)
  VALUES ("tarjeta_debito", p_numero, p_banco, p_fecha_vencimiento) RETURNING id into nuevo_metodo_id;

  RETURN nuevo_metodo_id;
END 
$$ language plpgsql