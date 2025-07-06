DROP FUNCTION IF EXISTS fn_get_miembros_creando_evento();
CREATE OR REPLACE FUNCTION fn_get_miembros_creando_evento()
RETURNS TABLE(
  id1 int4,
  id2 bpchar,
  nombre varchar,
  correo varchar
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  select m.rif id1,m.naturaleza_rif id2, m.razón_social nombre, (select c.dirección_correo from correo c where c.fk_miembro_1=m.rif and c.fk_miembro_2=m.naturaleza_rif order by c.id limit 1) correo
  from miembro m;
END;
$$;