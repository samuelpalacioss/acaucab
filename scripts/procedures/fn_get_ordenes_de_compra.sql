/**
 * Función que obtiene todas las órdenes de compra (órdenes de reposición) con información detallada
 * @returns tabla con información completa de las órdenes de compra
 * Incluye: orden, producto, empleado, tienda, almacén, lugar, precios y fechas
 */
CREATE OR REPLACE FUNCTION fn_get_ordenes_de_compra()
RETURNS TABLE (
    orden_id                INTEGER,
    fecha_orden            DATE,
    observacion            VARCHAR(100),
    unidades_solicitadas   INTEGER,
    -- Información del producto
    sku                    VARCHAR(20),
    nombre_cerveza         VARCHAR(255),
    nombre_presentacion    VARCHAR(50),
    descripcion_presentacion TEXT,
    unidades_presentacion  INTEGER,
    precio_unitario        DECIMAL(10,2),
    precio_total           DECIMAL(10,2),
    imagen_url             VARCHAR(2083),
    -- Información del empleado responsable
    empleado_id            INTEGER,
    empleado_ci            INTEGER,
    empleado_nacionalidad  CHAR(1),
    empleado_nombre_completo VARCHAR(255),
    empleado_cargo         VARCHAR(255),
    empleado_departamento  VARCHAR(255),
    -- Información de ubicación
    tienda_id              INTEGER,
    tienda_direccion       VARCHAR(255),
    almacen_id             INTEGER,
    almacen_direccion      VARCHAR(255),
    lugar_tienda_id        INTEGER,
    lugar_tienda_nombre    VARCHAR(255),
    lugar_tienda_tipo      VARCHAR(25),
    cantidad_actual_inventario INTEGER,
    cantidad_lugar_tienda  INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        -- Información básica de la orden
        odr.id AS orden_id,
        odr.fecha_orden,
        odr.observacion,
        odr.unidades AS unidades_solicitadas,
        
        -- Información del producto
        pc.sku,
        c.nombre AS nombre_cerveza,
        p.nombre AS nombre_presentacion,
        p.descripcion AS descripcion_presentacion,
        p.unidades AS unidades_presentacion,
        pc.precio AS precio_unitario,
        (pc.precio * odr.unidades) AS precio_total,
        pc.imagen AS imagen_url,
        
        -- Información del empleado responsable
        e.id AS empleado_id,
        e.ci AS empleado_ci,
        e.nacionalidad AS empleado_nacionalidad,
        CONCAT(
            e.primer_nombre, ' ',
            COALESCE(e.segundo_nombre || ' ', ''),
            e.primer_apellido, ' ',
            COALESCE(e.segundo_apellido, '')
        ) AS empleado_nombre_completo,
        car.nombre AS empleado_cargo,
        dep.nombre AS empleado_departamento,
        
        -- Información de ubicación
        tf.id AS tienda_id,
        tf.direccion AS tienda_direccion,
        alm.id AS almacen_id,
        alm.direccion AS almacen_direccion,
        lt.id AS lugar_tienda_id,
        lt.nombre AS lugar_tienda_nombre,
        lt.tipo AS lugar_tienda_tipo,
        inv.cantidad_almacen AS cantidad_actual_inventario,
        lti.cantidad AS cantidad_lugar_tienda
        
    FROM orden_de_reposicion odr
    
    -- Join con lugar_tienda_inventario para obtener ubicación específica
    INNER JOIN lugar_tienda_inventario lti 
        ON odr.fk_lugar_tienda_1 = lti.fk_lugar_tienda_1
        AND odr.fk_lugar_tienda_2 = lti.fk_lugar_tienda_2
        AND odr.fk_inventario_1 = lti.fk_inventario_1
        AND odr.fk_inventario_2 = lti.fk_inventario_2
        AND odr.fk_inventario_3 = lti.fk_inventario_3
    
    -- Join con inventario para obtener stock del almacén
    INNER JOIN inventario inv
        ON odr.fk_inventario_1 = inv.fk_presentacion_cerveza_1
        AND odr.fk_inventario_2 = inv.fk_presentacion_cerveza_2
        AND odr.fk_inventario_3 = inv.fk_almacen
    
    -- Join con presentacion_cerveza para obtener información del producto
    INNER JOIN presentacion_cerveza pc
        ON inv.fk_presentacion_cerveza_1 = pc.fk_presentacion
        AND inv.fk_presentacion_cerveza_2 = pc.fk_cerveza
    
    -- Join con presentacion para obtener detalles de la presentación
    INNER JOIN presentacion p
        ON pc.fk_presentacion = p.id
    
    -- Join con cerveza para obtener información de la cerveza
    INNER JOIN cerveza c
        ON pc.fk_cerveza = c.id
    
    -- Join con lugar_tienda para obtener información del lugar
    INNER JOIN lugar_tienda lt
        ON odr.fk_lugar_tienda_1 = lt.id
        AND odr.fk_lugar_tienda_2 = lt.fk_tienda_fisica
    
    -- Join con tienda_fisica para obtener información de la tienda
    INNER JOIN tienda_fisica tf
        ON lt.fk_tienda_fisica = tf.id
    
    -- Join con almacen para obtener información del almacén
    INNER JOIN almacen alm
        ON inv.fk_almacen = alm.id
    
    -- Join con empleado (opcional ya que puede ser NULL)
    LEFT JOIN empleado e
        ON odr.fk_empleado = e.id
    
    -- Join con nomina para obtener cargo y departamento del empleado
    LEFT JOIN nomina nom
        ON e.id = nom.fk_empleado
        AND nom.fecha_fin IS NULL  -- Solo nómina activa
    
    -- Join con cargo para obtener información del cargo
    LEFT JOIN cargo car
        ON nom.fk_cargo = car.id
    
    -- Join con departamento para obtener información del departamento
    LEFT JOIN departamento dep
        ON nom.fk_departamento = dep.id
    
    -- Ordenar por fecha de orden descendente (más recientes primero)
    ORDER BY odr.fecha_orden DESC, odr.id DESC;
    
END;
$$ LANGUAGE plpgsql;
