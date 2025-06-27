select 'Física' "Tipo de Tienda", tf.direccion "Dirección", COALESCE(sum(p.monto),0) "Monto en Bs.", tf.id "ID Tienda"
from tienda_fisica tf 
left join (select  v.fk_tienda_fisica id, p.monto monto
            from metodo_pago mp
            inner join cliente_metodo_pago cmp on cmp.fk_metodo_pago = mp.id
            inner join pago p on p.fk_cliente_metodo_pago_1 = cmp.id
            inner join venta v on p.fk_venta = v.id
            where upper(mp.tipo)='PUNTO'
                  and mp.fecha_canjeo between '2021-01-01' and '2025-06-23'
                  and v.fk_tienda_fisica is not null
            ) p on p.id =tf.id
group by "ID Tienda", "Tipo de Tienda", "Dirección"
union all
select 'Online' "Tipo de Tienda", tw.dominio_web "Dirección", COALESCE(sum(p.monto),0) "Monto en Bs.", tw.id "ID Tienda"
from tienda_web tw
left join (select  v.fk_tienda_web id, p.monto monto
            from metodo_pago mp
            inner join cliente_metodo_pago cmp on cmp.fk_metodo_pago = mp.id
            inner join pago p on p.fk_cliente_metodo_pago_1 = cmp.id
            inner join venta v on p.fk_venta = v.id
            where upper(mp.tipo)='PUNTO'
                  and mp.fecha_canjeo between '2021-01-01' and '2025-06-23'
                  and v.fk_tienda_web is not null
            ) p on p.id =tw.id
group by "ID Tienda", "Tipo de Tienda", "Dirección";