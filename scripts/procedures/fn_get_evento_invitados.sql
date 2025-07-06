CREATE OR REPLACE FUNCTION fn_get_evento_invitados(p_evento_id int)
RETURNS TABLE (
  id int,
  "primerNombre" varchar,
  "primerApellido" varchar,
  cedula int,
  nacionalidad varchar,
  "tipoInvitado" varchar,
  "fechaHoraEntrada" timestamp,
  "fechaHoraSalida" timestamp
)
LANGUAGE plpgsql
AS $$

BEGIN
    RETURN QUERY
    select i.id id, i.primer_nombre "primerNombre", i.primer_apellido "primerApellido",i.ci cedula,i.nacionalidad nacionalidad, ti.nombre "tipoInvitado",  ie.fecha_hora_entrada "fechaHoraEntrada",ie.fecha_hora_salida "fechaHoraSalida"
    from invitado i, tipo_invitado ti,invitado_evento ie
    where i.fk_tipo_invitado =ti.id and ie.fk_invitado = i.id and ie.fk_evento=p_evento_id;
END;
$$;