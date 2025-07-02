SELECT p.nombre || ' ' || c.nombre as cerveza, SUM(coalesce(dt.cantidad, 0)) as suma_ventas
FROM presentacion_cerveza pc
left join detalle_presentacion as dt ON dt.fk_presentacion = pc.fk_presentacion AND dt.fk_cerveza = pc.fk_cerveza
left join cerveza as c ON c.id = pc.fk_cerveza 
left join presentacion as p ON p.id = pc.fk_presentacion
group by cerveza
order by suma_ventas DESC
LIMIT 10;