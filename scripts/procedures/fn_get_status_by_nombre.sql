-- Handmade function to get the status id by the status name

DROP FUNCTION IF EXISTS fn_get_status_by_nombre(VARCHAR);

CREATE OR REPLACE FUNCTION fn_get_status_by_nombre(s_nombre VARCHAR)
RETURNS TABLE (
  id INTEGER,
  p_nombre VARCHAR
)
LANGUAGE plpgsql
AS $$
begin
  RETURN query
  SELECT s.id, s.nombre 
  FROM status as s 
  WHERE TRIM(LOWER(s.nombre)) = TRIM(LOWER(s_nombre));
END;
$$;

