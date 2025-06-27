select c.id, c.nombre "Nombre Cargo", round(avg(e.llegadas),0) "Llegadas Tardes Promedio", round(avg(e.salidas), 0) "Salidas Tempranas Promedio", round(avg(e.incumplimientos),0) "Impuntualidades Promedio", round(avg(e.puntualidades),0) "Puntualidades Promedio"
from cargo c
join (select c.id codigo, c.nombre nombre, n.fk_empleado empleado,COALESCE(l.llegadas, 0) AS llegadas, COALESCE(s.salidas, 0) AS salidas,
      COALESCE(l.llegadas, 0) + COALESCE(s.salidas, 0) AS incumplimientos,COALESCE(p.puntualidad, 0) as puntualidades
      from cargo c
      join nomina n on c.id= n.fk_cargo
      left join (select c.id cod, c.nombre nc,n.fk_empleado empl,  count(*) llegadas
                  from cargo c
                  join nomina n on n.fk_cargo = c.id
                  join horario_nomina hn on hn.fk_nomina_2 = n.fk_empleado and hn.fk_nomina_1 = n.id
                  join horario h on h.id = hn.fk_horario 
                  join registro_biometrico rb on rb.fk_empleado = n.fk_empleado
                  where 
                        rb.fecha_hora_entrada::date between '2024-01-01' and '2024-01-31'
                        and rb.fecha_hora_entrada::date >= n.fecha_inicio and  (n.fecha_fin is null or rb.fecha_hora_entrada::date <= n.fecha_fin)
                        AND CASE EXTRACT(DOW FROM rb.fecha_hora_entrada)
                              WHEN 0 THEN 'domingo'
                              WHEN 1 THEN 'lunes'
                              WHEN 2 THEN 'martes'
                              WHEN 3 THEN 'miércoles'
                              WHEN 4 THEN 'jueves'
                              WHEN 5 THEN 'viernes'
                              WHEN 6 THEN 'sabado'
                        END = h.dia
                        AND rb.fecha_hora_entrada::time > h.hora_entrada
                  group by cod, nc, empl) l on l.cod = c.id and n.fk_empleado=l.empl
      left join (select c.id cod, c.nombre nc,n.fk_empleado empl,  count(*) salidas
                  from cargo c
                  join nomina n on n.fk_cargo = c.id
                  join horario_nomina hn on hn.fk_nomina_2 = n.fk_empleado and hn.fk_nomina_1 = n.id
                  join horario h on h.id = hn.fk_horario 
                  join registro_biometrico rb on rb.fk_empleado = n.fk_empleado
                  where 
                        rb.fecha_hora_entrada::date between '2024-01-01' and '2024-01-31'
                        and rb.fecha_hora_salida::date >= n.fecha_inicio and  (n.fecha_fin is null or rb.fecha_hora_salida::date <= n.fecha_fin)
                        AND CASE EXTRACT(DOW FROM rb.fecha_hora_salida)
                              WHEN 0 THEN 'domingo'
                              WHEN 1 THEN 'lunes'
                              WHEN 2 THEN 'martes'
                              WHEN 3 THEN 'miércoles'
                              WHEN 4 THEN 'jueves'
                              WHEN 5 THEN 'viernes'
                              WHEN 6 THEN 'sabado'
                        END = h.dia
                        AND rb.fecha_hora_salida::time < h.hora_salida
                  group by cod, nc, empl) s on s.cod = c.id and n.fk_empleado=s.empl
      left join(select c.id cod, c.nombre nc ,n.fk_empleado empl,  count(*) puntualidad
                  from cargo c
                  join nomina n on n.fk_cargo = c.id
                  join horario_nomina hn on hn.fk_nomina_2 = n.fk_empleado and hn.fk_nomina_1 = n.id
                  join horario h on h.id = hn.fk_horario 
                  join registro_biometrico rb on rb.fk_empleado = n.fk_empleado
                  where 
                        rb.fecha_hora_salida::date between '2024-01-01' and '2024-01-31'
                        and rb.fecha_hora_salida::date >= n.fecha_inicio and  (n.fecha_fin is null or rb.fecha_hora_salida::date <= n.fecha_fin)
                        AND CASE EXTRACT(DOW FROM rb.fecha_hora_salida)
                              WHEN 0 THEN 'domingo'
                              WHEN 1 THEN 'lunes'
                              WHEN 2 THEN 'martes'
                              WHEN 3 THEN 'miércoles'
                              WHEN 4 THEN 'jueves'
                              WHEN 5 THEN 'viernes'
                              WHEN 6 THEN 'sabado'
                        END = h.dia
                        AND rb.fecha_hora_salida::time >= h.hora_salida
                        and rb.fecha_hora_entrada::time <= h.hora_entrada
                  group by cod, nc,empl) p on p.cod = c.id and n.fk_empleado=p.empl) e on e.codigo = c.id
group by c.id, c.nombre
order by "Puntualidades Promedio" desc,"Impuntualidades Promedio" asc;