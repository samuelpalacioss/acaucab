SELECT
  CASE
    WHEN v.fk_tienda_fisica IS NOT NULL THEN 'Tienda Física'
    WHEN v.fk_tienda_web IS NOT NULL THEN 'Tienda Web'
  END AS "Tienda",
  COUNT(*) AS "Ventas"
FROM venta v
JOIN (
    SELECT fk_venta, MAX(fecha_actualización) as max_fecha
    FROM status_venta
    GROUP BY fk_venta
) AS sv_latest ON v.id = sv_latest.fk_venta
JOIN status_venta sv ON sv.fk_venta = sv_latest.fk_venta AND sv.fecha_actualización = sv_latest.max_fecha
WHERE (v.fk_tienda_fisica IS NOT NULL OR v.fk_tienda_web IS NOT NULL)
  AND sv.fecha_actualización::date BETWEEN $P{fechaInicio} AND $P{fechaFin}
GROUP BY "Tienda";
