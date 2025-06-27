select tc.id "Id Tipo Cerveza", tc.nombre "Nombre", sum(c.cantidad) "Unidades Vendidas", round(avg(c.alcohol),2) "Graduación Alcohólica Promedio"
from tipo_cerveza tc
left join  (select c.id id, p.cantidad cantidad, c.fk_tipo_cerveza tipo, cc.valor_rango_inferior alcohol
            from cerveza c
            inner join (select *
                        from detalle_presentacion dp
                        where dp.fk_venta in (select v.id 
                                          from venta v, status_venta sv, status s 
                                          where v.id=sv.fk_venta and s.id=sv.fk_status
                                                and sv.fecha_actualización::date between '2021-01-01' and '2025-06-23'
                                                and upper(s.nombre)='COMPLETADO')
                        ) p on p.fk_cerveza=c.id
            left join  (select cc.*
                        from cerveza_caracteristica cc, caracteristica c
                        where cc.fk_caracteristica = c.id and upper(c.nombre)='ALCOHOL'
                        ) cc on cc.fk_cerveza = c.id
                                                
            ) c on c.tipo = tc.id
group by "Id Tipo Cerveza", "Nombre"
having sum(c.cantidad) is not null
order by "Unidades Vendidas" desc;