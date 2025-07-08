

CREATE OR REPLACE FUNCTION fn_registrar_venta_evento_en_proceso(
  p_evento_id INTEGER,
  p_cliente_id INTEGER,
  p_tipo_cliente Varchar
)
RETURNS TABLE(
  id_venta INTEGER
) 
AS $$
DECLARE
  nueva_venta_id INTEGER;
  v_id_relacion integer;
  v_status_id INTEGER;
BEGIN
  if lower(p_tipo_cliente) = 'natural' then
   if not exists (select * from evento_cliente where fk_evento= p_evento_id and fk_cliente_natural=p_cliente_id) then
      insert into evento_cliente (fk_evento,fk_cliente_natural,fk_cliente_juridico) values (p_evento_id,p_cliente_id,null ) returning id into v_id_relacion;
    else
      select id into v_id_relacion from evento_cliente where fk_evento=p_evento_id and fk_cliente_natural=p_cliente_id;
    end if;
  elsif lower(p_tipo_cliente) = 'juridico' then
    if not exists (select * from evento_cliente where fk_evento= p_evento_id and fk_cliente_juridico=p_cliente_id) then
      insert into evento_cliente (fk_evento,fk_cliente_natural,fk_cliente_juridico) values (p_evento_id,null ,p_cliente_id) returning id into v_id_relacion;
    else
      select id into v_id_relacion from evento_cliente where fk_evento=p_evento_id and fk_cliente_juridico=p_cliente_id;
    end if;
  else
    RAISE EXCEPTION 'Id del cliente (p_cliente_id) es requerido para ventas en evento.';
  end if;
  INSERT INTO venta_evento(monto_total,fk_evento_cliente_1, fk_evento_cliente_2) 
  VALUES (0,v_id_relacion ,p_evento_id )
  RETURNING id INTO nueva_venta_id;
  SELECT id INTO v_status_id FROM status WHERE status.nombre = 'En Proceso';

  INSERT INTO status_venta(fk_venta_evento, fk_status, fecha_actualización)
  VALUES(nueva_venta_id, v_status_id, NOW());
  
  RETURN QUERY SELECT nueva_venta_id;
END;
$$ language plpgsql