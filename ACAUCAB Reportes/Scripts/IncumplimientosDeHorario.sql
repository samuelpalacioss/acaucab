SELECT 
  e.id,
  e.nacionalidad || '-' || e.ci AS "CI",
  e.primer_nombre || ' ' || e.segundo_nombre || ' ' || e.primer_apellido || ' ' || e.segundo_apellido AS "Nombres y Apellidos",
  COALESCE(l.llegadas, 0) AS "Llegadas Tardes",
  COALESCE(s.salidas, 0) AS "Salidas Tempranas",
  COALESCE(l.llegadas, 0) + COALESCE(s.salidas, 0) AS "Incumplimientos de Horario"
FROM empleado e
LEFT JOIN (
  SELECT n.fk_empleado AS empl, COUNT(*) AS salidas
  FROM nomina n
  JOIN horario_nomina hn ON n.id = hn.fk_nomina_1 AND n.fk_empleado = hn.fk_nomina_2
  JOIN horario h ON h.id = hn.fk_horario
  JOIN registro_biometrico rb ON rb.fk_empleado = n.fk_empleado
  WHERE rb.fecha_hora_salida::date BETWEEN '2024-04-01' AND '2024-04-05'
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
  GROUP BY n.fk_empleado
) s ON e.id = s.empl
LEFT JOIN (
  SELECT n.fk_empleado AS empl, COUNT(*) AS llegadas
  FROM nomina n
  JOIN horario_nomina hn ON n.id = hn.fk_nomina_1 AND n.fk_empleado = hn.fk_nomina_2
  JOIN horario h ON h.id = hn.fk_horario
  JOIN registro_biometrico rb ON rb.fk_empleado = n.fk_empleado
  WHERE rb.fecha_hora_entrada::date BETWEEN '2024-04-01' AND '2024-04-05'
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
  GROUP BY n.fk_empleado
) l ON e.id = l.empl
where (COALESCE(l.llegadas, 0) + COALESCE(s.salidas, 0)) > 0
order by "Incumplimientos de Horario" desc;