DROP FUNCTION IF EXISTS fn_get_tipos_eventos();
CREATE OR REPLACE FUNCTION fn_get_tipos_eventos()
RETURNS TABLE(
  nombre varchar
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  select te.nombre from tipo_evento te;
END;
$$;