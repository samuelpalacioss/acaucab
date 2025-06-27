DROP FUNCTION IF EXISTS fn_get_all_ordenes_de_compra;
/**
 * Función que obtiene un resumen de todas las órdenes de compra.
 * @returns tabla con información resumida de las órdenes de compra.
 */
CREATE OR REPLACE FUNCTION fn_get_all_ordenes_de_compra()
RETURNS TABLE (
    orden_id                INTEGER,
    fecha_solicitud         DATE,
    proveedor_rif           INTEGER,
    proveedor_naturaleza_rif CHAR(1),
    proveedor_razon_social  VARCHAR(255),
    usuario_nombre          VARCHAR,
    precio_total            DECIMAL(10,2),
    estado_actual           VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        odc.id AS orden_id,
        odc.fecha_solicitud,
        prov.rif AS proveedor_rif,
        prov.naturaleza_rif AS proveedor_naturaleza_rif,
        prov.razón_social AS proveedor_razon_social,
        COALESCE(
            e.primer_nombre || ' ' || e.primer_apellido,
            cn.primer_nombre || ' ' || cn.primer_apellido,
            cj.razón_social,
            m_user.razón_social
        )::VARCHAR AS usuario_nombre,
        COALESCE(pc.precio * odc.unidades, 0) AS precio_total,
        COALESCE(s.nombre, 'Pendiente')::VARCHAR(50) AS estado_actual
    FROM orden_de_compra odc
    
    -- Joins para obtener información del producto
    LEFT JOIN presentacion_cerveza pc
        ON odc.fk_presentacion_cerveza_1 = pc.fk_presentacion
        AND odc.fk_presentacion_cerveza_2 = pc.fk_cerveza
    
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
        
    ORDER BY odc.fecha_solicitud DESC, odc.id DESC;
    
END;
$$ LANGUAGE plpgsql; 