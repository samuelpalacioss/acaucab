DROP FUNCTION IF EXISTS fn_get_invitados();
CREATE OR REPLACE FUNCTION fn_get_invitados()
RETURNS TABLE(
  id int,
  "primerNombre" varchar,
  "primerApellido" varchar,
  cedula int,
  nacionalidad varchar,
  "tipoInvitado" varchar
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  select i.id id, i.primer_nombre "primerNombre", i.primer_apellido "primerApellido",i.ci cedula,i.nacionalidad nacionalidad, ti.nombre "tipoInvitado"
from invitado i, tipo_invitado ti
where i.fk_tipo_invitado =ti.id;
END;
$$;