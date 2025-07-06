CREATE OR REPLACE FUNCTION fn_get_evento_by_id(p_evento_id int)
RETURNS TABLE (
  id int,
  nombre varchar,
  descripcion varchar,
  "tipoEvento" varchar,
  "fechaHoraInicio" timestamp,
  "fechaHoraFin" timestamp,
  direccion varchar,
  estado varchar,
  municipio varchar,
  parroquia varchar,
  precio float4,
  "tieneTickets" boolean
)
LANGUAGE plpgsql
AS $$
declare
  v_nombre_estado varchar;
  v_nombre_municipio varchar;
  v_nombre_parroquia varchar;
  v_tipo_lugar varchar;
  v_nombre_lugar varchar;
  v_id_pertenencia int;
BEGIN
    select e.fk_lugar into v_id_pertenencia
    from evento e
    where e.id= p_evento_id;
    
    WHILE v_id_pertenencia IS NOT NULL LOOP
    SELECT l.tipo, l.nombre, l.fk_lugar
    INTO v_tipo_lugar, v_nombre_lugar, v_id_pertenencia
    FROM lugar l
    WHERE l.id = v_id_pertenencia;

    IF v_tipo_lugar = 'Estado' THEN
      v_nombre_estado := v_nombre_lugar;
    ELSIF v_tipo_lugar = 'Municipio' THEN
      v_nombre_municipio := v_nombre_lugar;
    ELSE
      v_nombre_parroquia := v_nombre_lugar;
    END IF;
  END LOOP;

    RETURN QUERY
    SELECT
        e.id id,
        e.nombre nombre,
        e.descripción descripcion,
        te.nombre "tipoEvento",
        e.fecha_hora_inicio "fechaHoraInicio" ,
        e.fecha_hora_fin "fechaHoraFin" ,
        e.dirección direccion,
        v_nombre_estado estado,
        v_nombre_municipio municipio,
        v_nombre_parroquia parroquia,
        e.precio_entrada precio,
        case
        when e.precio_entrada is null then false
        when e.precio_entrada =0 then false
        when e.precio_entrada >0 then true
        else false
        end as "tieneTickets"
    FROM
        evento e, tipo_evento te
    
    WHERE e.id = p_evento_id and e.fk_tipo_evento=te.id;
END;
$$;