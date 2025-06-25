DROP FUNCTION IF EXISTS fn_get_ordenes_de_reposicion();

/**
 * @name fn_get_ordenes_de_reposicion
 * @description Obtiene un listado detallado de todas las órdenes de reposición de inventario.
 * @returns TABLE - Devuelve una tabla con las siguientes columnas:
 *   - "ID de Orden": Identificador único de la orden de reposición.
 *   - "Producto": Nombre del producto y su presentación (ej: "Zulia (Botella 330ml)").
 *   - "SKU": SKU del producto.
 *   - "Unidades Solicitadas": Cantidad de unidades solicitadas en la orden.
 *   - "Fecha de Orden": Fecha en que se creó la orden.
 *   - "Lugar de Reposición": Nombre del lugar en la tienda donde se debe reponer el producto.
 *   - "Estado": Estado actual de la orden de reposición (ej: "Pendiente", "En Proceso", "Completada").
 *   - "Empleado": Nombre y apellido del empleado que solicitó la reposición.
 *   - "Observación": Observaciones adicionales de la orden.
 */
CREATE OR REPLACE FUNCTION fn_get_ordenes_de_reposicion()
RETURNS TABLE (
    "ID de Orden" INTEGER,
    "Producto" VARCHAR,
    "SKU" VARCHAR(20),
    "Unidades Solicitadas" INTEGER,
    "Fecha de Orden" DATE,
    "Lugar de Reposición" VARCHAR(255),
    "Estado" VARCHAR(50),
    "Empleado" VARCHAR,
    "Observación" VARCHAR(100)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        o.id AS "ID de Orden",
        (c.nombre || ' (' || pr.nombre || ' ' || pr.unidades || ' unidades)') ::VARCHAR AS "Producto",
        pc.sku AS "SKU",
        o.unidades AS "Unidades Solicitadas",
        o.fecha_orden AS "Fecha de Orden",
        lt.nombre AS "Lugar de Reposición",
        s.nombre AS "Estado",
        (e.primer_nombre || ' ' || e.primer_apellido)::VARCHAR AS "Empleado",
        o.observacion AS "Observación"
    FROM
        orden_de_reposicion o
    LEFT JOIN
        status_orden so ON o.id = so.fk_orden_de_reposicion
    LEFT JOIN
        status s ON so.fk_status = s.id
    LEFT JOIN
        empleado e ON o.fk_empleado = e.id
    LEFT JOIN
        lugar_tienda lt ON o.fk_lugar_tienda_1 = lt.id
    LEFT JOIN
        presentacion_cerveza pc ON o.fk_inventario_1 = pc.fk_presentacion AND o.fk_inventario_2 = pc.fk_cerveza
    LEFT JOIN
        cerveza c ON pc.fk_cerveza = c.id
    LEFT JOIN
        presentacion pr ON pc.fk_presentacion = pr.id
    ORDER BY
        o.fecha_orden DESC, o.id DESC;
END;
$$;
