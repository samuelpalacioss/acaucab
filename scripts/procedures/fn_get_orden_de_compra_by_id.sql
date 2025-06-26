DROP FUNCTION IF EXISTS fn_get_orden_de_compra_by_id(INTEGER);
DROP FUNCTION IF EXISTS fn_get_ordenes_de_compra();

/**
 * Función que obtiene una orden de compra específica por su ID con información detallada
 * @param p_id - ID de la orden de compra
 * @returns tabla con información completa de la orden de compra
 * Incluye: orden, producto, usuario solicitante, proveedor, precios, fechas y estado
 */
CREATE OR REPLACE FUNCTION fn_get_orden_de_compra_by_id(p_id INTEGER)
RETURNS TABLE (
    orden_id                INTEGER,
    fecha_solicitud         DATE,
    fecha_entrega           DATE,
    observacion             VARCHAR(255),
    unidades_solicitadas    INTEGER,
    -- Información del producto
    sku                     VARCHAR(20),
    nombre_cerveza          VARCHAR(255),
    nombre_presentacion     VARCHAR(50),
    precio_unitario         DECIMAL(10,2),
    precio_total            DECIMAL(10,2),
    -- Información del usuario que solicita
    usuario_nombre          VARCHAR,
    -- Información del proveedor
    proveedor_razon_social  VARCHAR(255),
    -- Estado actual de la orden
    estado_actual           VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        -- Información básica de la orden
        odc.id AS orden_id,
        odc.fecha_solicitud,
        odc.fecha_entrega,
        odc.observacion,
        odc.unidades AS unidades_solicitadas,
        
        -- Información del producto
        pc.sku,
        c.nombre AS nombre_cerveza,
        p.nombre AS nombre_presentacion,
        pc.precio AS precio_unitario,
        (pc.precio * odc.unidades) AS precio_total,
        
        -- Información del usuario
        COALESCE(
            e.primer_nombre || ' ' || e.primer_apellido,
            cn.primer_nombre || ' ' || cn.primer_apellido,
            cj.razón_social,
            m_user.razón_social
        )::VARCHAR AS usuario_nombre,
        
        -- Información del proveedor (miembro)
        prov.razón_social AS proveedor_razon_social,
        
        -- Estado actual de la orden
        COALESCE(s.nombre, 'Pendiente')::VARCHAR(50) AS estado_actual
        
    FROM orden_de_compra odc
    
    -- Joins para obtener información del producto
    INNER JOIN presentacion_cerveza pc
        ON odc.fk_presentacion_cerveza_1 = pc.fk_presentacion
        AND odc.fk_presentacion_cerveza_2 = pc.fk_cerveza
    INNER JOIN presentacion p
        ON pc.fk_presentacion = p.id
    INNER JOIN cerveza c
        ON pc.fk_cerveza = c.id
        
    -- Joins para obtener información del usuario
    LEFT JOIN usuario u 
        ON odc.fk_usuario = u.id
    LEFT JOIN empleado_usuario eu 
        ON u.id = eu.fk_usuario
    LEFT JOIN empleado e 
        ON eu.fk_empleado = e.id
    LEFT JOIN cliente_usuario cu 
        ON u.id = cu.fk_usuario
    LEFT JOIN cliente_natural cn 
        ON cu.fk_cliente_natural = cn.id
    LEFT JOIN cliente_juridico cj 
        ON cu.fk_cliente_juridico = cj.id
    LEFT JOIN miembro_usuario mu
        ON u.id = mu.fk_usuario
    LEFT JOIN miembro m_user 
        ON mu.fk_miembro_1 = m_user.rif AND mu.fk_miembro_2 = m_user.naturaleza_rif
    
    -- Join para obtener información del proveedor (miembro)
    LEFT JOIN miembro prov
        ON odc.fk_miembro_1 = prov.rif
        AND odc.fk_miembro_2 = prov.naturaleza_rif
        
    -- Join para obtener el estado actual de la orden (el más reciente)
    LEFT JOIN LATERAL (
        SELECT fk_status
        FROM status_orden
        WHERE fk_orden_de_compra = odc.id
        ORDER BY fecha_actualización DESC
        LIMIT 1
    ) so_latest ON true
    LEFT JOIN status s
        ON so_latest.fk_status = s.id
        
    WHERE odc.id = p_id;
    
END;
$$ LANGUAGE plpgsql;
