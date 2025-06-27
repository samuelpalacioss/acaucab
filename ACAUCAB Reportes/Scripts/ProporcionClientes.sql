select 'Física' "Tipo de Tienda",  tf.direccion "Dirección", (
  select count(v.*) from venta v, status s, status_venta sv
  where v.fk_cliente_natural is not null and v.fk_tienda_fisica = tf.id 
  and v.id = sv.fk_venta and sv.fk_status = s.id and s.nombre = 'Completado' and sv.fecha_actualización between '2025-05-01' and '2025-05-31'
) "Clientes Naturales", (
  select count(v.*) from venta v, status s, status_venta sv
  where v.fk_cliente_juridico is not null and v.fk_tienda_fisica = tf.id
  and v.id = sv.fk_venta and sv.fk_status = s.id and s.nombre = 'Completado' and sv.fecha_actualización between '2025-05-01' and '2025-05-31'
) "Clientes Jurídicos",(
  select coalesce(round(avg(v.monto_total),2)) from venta v, status s, status_venta sv
  where v.fk_cliente_natural is not null and v.fk_tienda_fisica = tf.id
  and v.id = sv.fk_venta and sv.fk_status = s.id and s.nombre = 'Completado' and sv.fecha_actualización between '2025-05-01' and '2025-05-31'
) "Monto promedio Naturales", (
  select coalesce(round(avg(v.monto_total),2)) from venta  v, status s, status_venta sv
  where v.fk_cliente_juridico is not null and v.fk_tienda_fisica = tf.id
  and v.id = sv.fk_venta and sv.fk_status = s.id and s.nombre = 'Completado' and sv.fecha_actualización between '2025-05-01' and '2025-05-31'
) "Monto promedio Juridico", (
  select coalesce(round(avg(v.monto_total),2)) from venta  v, status s, status_venta sv
  where (v.fk_cliente_juridico is not null or v.fk_cliente_natural is not null) and v.fk_tienda_fisica = tf.id
  and v.id = sv.fk_venta and sv.fk_status = s.id and s.nombre = 'Completado' and sv.fecha_actualización between '2025-05-01' and '2025-05-31'
) "Monto Promedio Total"
from tienda_fisica tf
union all
select 'Online' "Tipo de Tienda", tw.dominio_web "Dirección", (
  select count(v.*) from venta v, status s, status_venta sv, cliente_usuario cu
  where cu.fk_usuario = v.fk_usuario and cu.fk_cliente_natural is not null and v.fk_tienda_web = tw.id
  and v.id = sv.fk_venta and sv.fk_status = s.id and s.nombre = 'Completado' and sv.fecha_actualización between '2025-05-01' and '2025-05-31'
) "Clientes Naturales", (
  select count(v.*) from venta v, status s, status_venta sv, cliente_usuario cu
  where cu.fk_usuario = v.fk_usuario and cu.fk_cliente_juridico is not null and v.fk_tienda_web = tw.id
  and v.id = sv.fk_venta and sv.fk_status = s.id and s.nombre = 'Completado' and sv.fecha_actualización between '2025-05-01' and '2025-05-31'
) "Clientes Jurídicos",(
  select coalesce(round(avg(v.monto_total),2)) from venta v, status s, status_venta sv, cliente_usuario cu
  where cu.fk_usuario = v.fk_usuario and cu.fk_cliente_natural  is not null and v.fk_tienda_web = tw.id
  and v.id = sv.fk_venta and sv.fk_status = s.id and s.nombre = 'Completado' and sv.fecha_actualización between '2025-05-01' and '2025-05-31'
) "Monto promedio Naturales", (
  select coalesce(round(avg(v.monto_total),2)) from venta v, status s, status_venta sv, cliente_usuario cu
  where cu.fk_usuario = v.fk_usuario and cu.fk_cliente_juridico is not null and v.fk_tienda_web = tw.id
  and v.id = sv.fk_venta and sv.fk_status = s.id and s.nombre = 'Completado' and sv.fecha_actualización between '2025-05-01' and '2025-05-31'
) "Monto promedio Juridico", (
  select coalesce(round(avg(v.monto_total),2)) from venta v, status s, status_venta sv, cliente_usuario cu
  where cu.fk_usuario = v.fk_usuario and (cu.fk_cliente_juridico is not null or cu.fk_cliente_natural is not null) and v.fk_tienda_web = tw.id
  and v.id = sv.fk_venta and sv.fk_status = s.id and s.nombre = 'Completado' and sv.fecha_actualización between '2025-05-01' and '2025-05-31'
) "Monto Promedio Total"
from tienda_web tw;
