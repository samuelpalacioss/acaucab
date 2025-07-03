Select DATE_TRUNC('day', sv.fecha_actualización) as "Fecha de Venta", COUNT(*) as "Total de Ventas", SUM(v.monto_total) as "Ingresos" 
from status_venta sv
left join venta as v ON v.id = sv.fk_venta
left join status s ON s.id = sv.fk_status
WHERE sv.fecha_actualización::date between $P{fechaInicio} and $P{fechaFin}
group by "Fecha de Venta"
order by "Fecha de Venta";