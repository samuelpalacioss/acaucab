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
 *   - "Fecha de Estado": Fecha del último estado de la orden de reposición.
 *   - "Empleado": Nombre y apellido del empleado que solicitó la reposición.
 *   - "Observación": Observaciones adicionales de la orden.
 *   - "Cantidad en Almacén": Cantidad disponible en el almacén para el producto.
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
    "Fecha de Estado" DATE,
    "Usuario" VARCHAR,
    "Observación" TEXT,
    "Cantidad en Almacén" INTEGER
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
        so_latest.fecha_actualización::DATE AS "Fecha de Estado",
        COALESCE(
            e.primer_nombre || ' ' || e.primer_apellido,
            cn.primer_nombre || ' ' || cn.primer_apellido,
            cj.razón_social,
            m.razón_social
        )::VARCHAR AS "Usuario",
        o.observacion AS "Observación",
        i.cantidad_almacen AS "Cantidad en Almacén"
    FROM
        orden_de_reposicion o
    LEFT JOIN LATERAL (
        SELECT fecha_actualización, fk_status
        FROM status_orden
        WHERE fk_orden_de_reposicion = o.id
        ORDER BY fecha_actualización DESC
        LIMIT 1
    ) so_latest ON true
    LEFT JOIN
        status s ON so_latest.fk_status = s.id
    LEFT JOIN
        usuario u ON o.fk_usuario = u.id
    LEFT JOIN
        empleado_usuario eu ON u.id = eu.fk_usuario
    LEFT JOIN
        empleado e ON eu.fk_empleado = e.id
    LEFT JOIN
        cliente_usuario cu ON u.id = cu.fk_usuario
    LEFT JOIN
        cliente_natural cn ON cu.fk_cliente_natural = cn.id
    LEFT JOIN
        cliente_juridico cj ON cu.fk_cliente_juridico = cj.id
    LEFT JOIN
        miembro_usuario mu ON u.id = mu.fk_usuario
    LEFT JOIN
        miembro m ON mu.fk_miembro_1 = m.rif AND mu.fk_miembro_2 = m.naturaleza_rif
    LEFT JOIN
        lugar_tienda lt ON o.fk_lugar_tienda_1 = lt.id
    LEFT JOIN
        inventario i ON o.fk_inventario_1 = i.fk_presentacion_cerveza_1 
            AND o.fk_inventario_2 = i.fk_presentacion_cerveza_2 
            AND o.fk_inventario_3 = i.fk_almacen
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
