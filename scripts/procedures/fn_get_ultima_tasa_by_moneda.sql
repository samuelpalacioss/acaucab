DROP FUNCTION IF EXISTS fn_get_ultima_tasa_by_moneda(VARCHAR);

CREATE OR REPLACE FUNCTION fn_get_ultima_tasa_by_moneda(
  p_moneda_nombre VARCHAR
)
RETURNS TABLE(
  moneda VARCHAR,
  monto_equivalencia DECIMAL(10,2),
  fecha_inicio DATE
)
AS $$
BEGIN
  RETURN QUERY
  
  SELECT t.moneda, t.monto_equivalencia, t.fecha_inicio
  FROM tasa t
  WHERE upper(t.moneda) = upper(p_moneda_nombre)
  ORDER BY t.fecha_inicio DESC
  LIMIT 1;
  
END;
$$ language plpgsql