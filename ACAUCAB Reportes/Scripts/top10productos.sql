SELECT p.nombre || ' ' || c.nombre as "Cerveza", SUM(coalesce(dt.cantidad, 0)) as "Suma de Ventas" 
FROM presentacion_cerveza pc
left join (select *
            from detalle_presentacion dp
            where dp.fk_venta in (select v.id 
                              from venta v, status_venta sv, status s 
                              where v.id=sv.fk_venta and s.id=sv.fk_status
                                    and sv.fecha_actualización::date between $P{fechaInicio} and $P{fechaFin})
            ) as dt ON dt.fk_presentacion = pc.fk_presentacion AND dt.fk_cerveza = pc.fk_cerveza
left join cerveza as c ON c.id = pc.fk_cerveza 
left join presentacion as p ON p.id = pc.fk_presentacion
group by "Cerveza"
order by "Suma de Ventas" DESC
LIMIT 10;