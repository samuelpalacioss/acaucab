DROP FUNCTION IF EXISTS fn_get_all_eventos();
CREATE OR REPLACE FUNCTION fn_get_all_eventos()
RETURNS TABLE(
  id int4,
  nombre varchar,
  direccion varchar,
  tipo varchar,
  fecha_hora_inicio timestamp,
  fecha_hora_fin timestamp,
  precio_entrada float4,
  asistencia bigint,
  entradas_vendidas bigint
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT e.id id, e.nombre nombre, e.dirección direccion, t.nombre tipo, e.fecha_hora_inicio , e.fecha_hora_fin, e.precio_entrada precio_entrada,
    (SELECT count(*) FROM evento_cliente WHERE fk_evento=e.id) asistencia,
    (SELECT count(*) FROM venta_evento ve WHERE ve.fk_evento_cliente_2=e.id AND NOT EXISTS (
      SELECT * FROM detalle_evento WHERE fk_venta_evento=ve.id
    )) entradas_vendidas
  FROM evento e, tipo_evento t
  WHERE t.id = e.fk_tipo_evento
  ORDER BY fecha_hora_fin DESC;
END;
$$;
