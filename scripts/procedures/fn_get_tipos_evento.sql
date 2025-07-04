DROP FUNCTION IF EXISTS fn_get_tipos_eventos();
create or replace function fn_get_tipos_eventos()
returns table(
  nombre varchar
)
language plpgsql
as $$
begin
  return query
  select t.nombre nombre
  from tipo_evento t;
end;
$$;
