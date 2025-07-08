Select pr.nombre || ' ' || c.nombre as "Cerveza", coalesce(SUM(coalesce(lg.cantidad, 0) + i.cantidad_almacen), 0) as "Total Inventario", coalesce(lg.cantidad, 0) as "Cantidad Tienda", coalesce(i.cantidad_almacen, 0) as "Cantidad en Almacén"
FROM presentacion_cerveza pc
left join cerveza as c ON c.id = pc.fk_cerveza 
left join presentacion as pr ON pr.id = pc.fk_presentacion
left join inventario as i ON i.fk_presentacion_cerveza_1 = pc.fk_presentacion AND i.fk_presentacion_cerveza_2 = pc.fk_cerveza
left join lugar_tienda_inventario as lg ON lg.fk_inventario_1 = i.fk_presentacion_cerveza_1 AND lg.fk_inventario_2 = i.fk_presentacion_cerveza_2 AND lg.fk_inventario_3 = i.fk_almacen
left join orden_de_reposicion as odr ON odr.fk_inventario_1 = i.fk_presentacion_cerveza_1 AND odr.fk_inventario_2 = i.fk_presentacion_cerveza_2 AND odr.fk_inventario_3 = i.fk_almacen
group by "Cerveza", "Cantidad Tienda", "Cantidad en Almacén";

