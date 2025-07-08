DROP FUNCTION IF EXISTS fn_get_lugares();
CREATE OR REPLACE FUNCTION fn_get_lugares()
RETURNS TABLE(
  id int,
  nombre varchar,
  tipo varchar,
  fk_lugar int
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  select * from lugar;
END;
$$;