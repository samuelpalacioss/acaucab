DROP FUNCTION IF EXISTS fn_get_tipos_invitados();
CREATE OR REPLACE FUNCTION fn_get_tipos_invitados()
RETURNS TABLE(
  nombre varchar
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  select tp.nombre from tipo_invitado tp;
END;
$$;