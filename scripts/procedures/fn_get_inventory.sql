DROP FUNCTION IF EXISTS fn_get_inventory();

/**
 * @name fn_get_inventory
 * @description Obtiene un resumen del inventario de productos, detallando el stock en almacén y en anaquel.
 * @returns TABLE - Devuelve una tabla con las siguientes columnas:
 *   - "SKU": El SKU único de la presentación de la cerveza. Si es nulo, se muestra la combinación de los IDs de presentación y cerveza.
 *   - "Nombre": El nombre de la cerveza.
 *   - "Categoría": El tipo o categoría de la cerveza.
 *   - "Stock Total": La suma del stock en almacén y en anaquel.
 *   - "En Almacén": La cantidad de unidades en todos los almacenes.
 *   - "En Anaquel": La cantidad de unidades en todas las tiendas físicas (anaqueles).
 */
CREATE OR REPLACE FUNCTION fn_get_inventory()
RETURNS TABLE (
    "SKU" VARCHAR(25), -- Aumentado para acomodar la combinación de FKs
    "Nombre" VARCHAR(255),
    "Categoría" VARCHAR(255),
    "Stock Total" BIGINT,
    "En Almacén" BIGINT,
    "En Anaquel" BIGINT
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        COALESCE(pc.sku, pc.fk_presentacion::VARCHAR || '-' || pc.fk_cerveza::VARCHAR),
        c.nombre,
        tc.nombre,
        (COALESCE(sa.total_almacen, 0) + COALESCE(san.total_anaquel, 0))::BIGINT,
        COALESCE(sa.total_almacen, 0)::BIGINT,
        COALESCE(san.total_anaquel, 0)::BIGINT
    FROM
        presentacion_cerveza pc
    JOIN
        cerveza c ON pc.fk_cerveza = c.id
    JOIN
        tipo_cerveza tc ON c.fk_tipo_cerveza = tc.id
    LEFT JOIN (
        SELECT
            i.fk_presentacion_cerveza_1,
            i.fk_presentacion_cerveza_2,
            SUM(i.cantidad_almacen) AS total_almacen
        FROM
            inventario i
        GROUP BY
            i.fk_presentacion_cerveza_1,
            i.fk_presentacion_cerveza_2
    ) sa ON pc.fk_presentacion = sa.fk_presentacion_cerveza_1 AND pc.fk_cerveza = sa.fk_presentacion_cerveza_2
    LEFT JOIN (
        SELECT
            lti.fk_inventario_1,
            lti.fk_inventario_2,
            SUM(lti.cantidad) AS total_anaquel
        FROM
            lugar_tienda_inventario lti
        GROUP BY
            lti.fk_inventario_1,
            lti.fk_inventario_2
    ) san ON pc.fk_presentacion = san.fk_inventario_1 AND pc.fk_cerveza = san.fk_inventario_2
    ORDER BY
        1;
END;
$$;
