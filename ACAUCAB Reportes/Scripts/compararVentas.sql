Select SUM(CASE WHEN fk_tienda_fisica IS NOT NULL THEN 1 ELSE 0 END)  AS "Tienda Física",
  SUM(CASE WHEN fk_tienda_web   IS NOT NULL THEN 1 ELSE 0 END)  AS "Tienda Web",
  COUNT(*)                                                      AS "Total Ventas",
  SUM(CASE WHEN fk_tienda_fisica IS NOT NULL THEN monto_total ELSE 0 END)
                                                                AS "Ganancias Tienda Física",
  SUM(CASE WHEN fk_tienda_web   IS NOT NULL THEN monto_total ELSE 0 END)
                                                                AS "Ganancias Tienda Web",
ROUND(
    100.0 *
    SUM(CASE WHEN fk_tienda_fisica IS NOT NULL THEN monto_total ELSE 0 END)
    / NULLIF(SUM(monto_total), 0),
  2)                                                            AS "Porcentaje Física (%)",

  ROUND(
    100.0 *
    SUM(CASE WHEN fk_tienda_web IS NOT NULL THEN monto_total ELSE 0 END)
    / NULLIF(SUM(monto_total), 0),
  2)                                                            AS "Porcentaje Web (%)"
FROM venta;
