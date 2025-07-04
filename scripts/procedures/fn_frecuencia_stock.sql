DROP FUNCTION IF EXISTS fn_calcular_tasa_ruptura_stock;
DROP FUNCTION IF EXISTS fn_tasa_ruptura_global;
DROP FUNCTION IF EXISTS fn_tasa_ruptura_por_tienda;

CREATE OR REPLACE FUNCTION fn_calcular_tasa_ruptura_stock(
    p_tienda_id INTEGER DEFAULT NULL,
    p_tipo_calculo VARCHAR(20) DEFAULT 'global'
) RETURNS TABLE(
    tipo_calculo VARCHAR(20),
    tienda_id INTEGER,
    total_ordenes INTEGER,
    total_productos_monitoreados INTEGER,
    dias_total INTEGER,
    oportunidades_stock BIGINT,
    tasa_ruptura_global_porcentaje DECIMAL(8,4),
    fecha_primera_orden DATE,
    fecha_ultima_orden DATE
) AS $$
DECLARE
    v_total_ordenes INTEGER;
    v_total_productos_monitoreados INTEGER;
    v_tasa_ruptura_global DECIMAL(8,4);
    v_dias_periodo INTEGER;
    v_fecha_inicio DATE;
    v_fecha_fin DATE;
    v_oportunidades_stock BIGINT;
BEGIN
    /** Calcular período histórico completo */
    SELECT MIN(odr.fecha_orden), MAX(odr.fecha_orden)
    INTO v_fecha_inicio, v_fecha_fin
    FROM orden_de_reposicion odr
    WHERE (p_tienda_id IS NULL OR odr.fk_lugar_tienda_2 = p_tienda_id);
    
    /** Si no hay datos, establecer valores por defecto */
    IF v_fecha_inicio IS NULL THEN
        v_fecha_inicio := CURRENT_DATE - INTERVAL '1 day';
        v_fecha_fin := CURRENT_DATE;
    END IF;
    
    v_dias_periodo := v_fecha_fin - v_fecha_inicio + 1;
    
    /** Calcular según el tipo de cálculo solicitado */
    IF p_tipo_calculo = 'global' THEN
        /** Tasa de ruptura global usando la fórmula: (∑Si / N × D) × 100% */
        
        -- Contar órdenes de reposición históricas (∑Si)
        SELECT COUNT(*)
        INTO v_total_ordenes
        FROM orden_de_reposicion odr
        WHERE (p_tienda_id IS NULL OR odr.fk_lugar_tienda_2 = p_tienda_id);
        
        -- Contar productos únicos monitoreados en tiendas (N)
        SELECT COUNT(DISTINCT (lti.fk_inventario_1, lti.fk_inventario_2))
        INTO v_total_productos_monitoreados
        FROM lugar_tienda_inventario lti
        WHERE (p_tienda_id IS NULL OR lti.fk_lugar_tienda_2 = p_tienda_id);
        
        -- Calcular oportunidades de stock (N × D)
        v_oportunidades_stock := v_total_productos_monitoreados::BIGINT * v_dias_periodo;
        
        -- Calcular tasa de ruptura global usando la fórmula
        IF v_oportunidades_stock > 0 THEN
            v_tasa_ruptura_global := (v_total_ordenes::DECIMAL / v_oportunidades_stock) * 100;
        ELSE
            v_tasa_ruptura_global := 0;
        END IF;
        
        -- Retornar fila con resultado global
        RETURN QUERY SELECT 
            'global'::VARCHAR(20) as tipo_calculo,
            p_tienda_id as tienda_id,
            v_total_ordenes as total_ordenes,
            v_total_productos_monitoreados as total_productos_monitoreados,
            v_dias_periodo as dias_total,
            v_oportunidades_stock as oportunidades_stock,
            v_tasa_ruptura_global as tasa_ruptura_global_porcentaje,
            v_fecha_inicio as fecha_primera_orden,
            v_fecha_fin as fecha_ultima_orden;
        
    ELSIF p_tipo_calculo = 'tienda' THEN
        /** Tasa de ruptura por tienda usando la fórmula global */
        
        -- Retornar filas con resultado por tienda
        RETURN QUERY 
        SELECT 
            'tienda'::VARCHAR(20) as tipo_calculo,
            subq.tienda_id as tienda_id,
            subq.total_ordenes as total_ordenes,
            subq.productos_monitoreados as total_productos_monitoreados,
            v_dias_periodo as dias_total,
            subq.oportunidades_stock as oportunidades_stock,
            subq.tasa_ruptura_global as tasa_ruptura_global_porcentaje,
            subq.fecha_primera_orden as fecha_primera_orden,
            subq.fecha_ultima_orden as fecha_ultima_orden
        FROM (
            SELECT 
                odr.fk_lugar_tienda_2 as tienda_id,
                COUNT(*) as total_ordenes,
                (SELECT COUNT(DISTINCT (lti.fk_inventario_1, lti.fk_inventario_2))
                 FROM lugar_tienda_inventario lti
                 WHERE lti.fk_lugar_tienda_2 = odr.fk_lugar_tienda_2) as productos_monitoreados,
                ((SELECT COUNT(DISTINCT (lti.fk_inventario_1, lti.fk_inventario_2))
                  FROM lugar_tienda_inventario lti
                  WHERE lti.fk_lugar_tienda_2 = odr.fk_lugar_tienda_2)::BIGINT * v_dias_periodo) as oportunidades_stock,
                CASE 
                    WHEN ((SELECT COUNT(DISTINCT (lti.fk_inventario_1, lti.fk_inventario_2))
                          FROM lugar_tienda_inventario lti
                          WHERE lti.fk_lugar_tienda_2 = odr.fk_lugar_tienda_2) * v_dias_periodo) > 0 THEN
                        (COUNT(*)::DECIMAL / 
                         ((SELECT COUNT(DISTINCT (lti.fk_inventario_1, lti.fk_inventario_2))
                           FROM lugar_tienda_inventario lti
                           WHERE lti.fk_lugar_tienda_2 = odr.fk_lugar_tienda_2) * v_dias_periodo)) * 100
                    ELSE 0
                END as tasa_ruptura_global,
                MIN(odr.fecha_orden) as fecha_primera_orden,
                MAX(odr.fecha_orden) as fecha_ultima_orden
            FROM orden_de_reposicion odr
            WHERE (p_tienda_id IS NULL OR odr.fk_lugar_tienda_2 = p_tienda_id)
            GROUP BY odr.fk_lugar_tienda_2
            ORDER BY COUNT(*) DESC
        ) subq;
        
    ELSE
        /** Tipo de cálculo no válido - retornar fila con error */
        RETURN QUERY SELECT 
            'error'::VARCHAR(20) as tipo_calculo,
            NULL::INTEGER as tienda_id,
            NULL::INTEGER as total_ordenes,
            NULL::INTEGER as total_productos_monitoreados,
            NULL::INTEGER as dias_total,
            NULL::BIGINT as oportunidades_stock,
            NULL::DECIMAL(8,4) as tasa_ruptura_global_porcentaje,
            NULL::DATE as fecha_primera_orden,
            NULL::DATE as fecha_ultima_orden;
    END IF;
    
    RETURN;
    
EXCEPTION
    WHEN OTHERS THEN
        /** Manejo de errores - retornar fila con error */
        RETURN QUERY SELECT 
            'error'::VARCHAR(20) as tipo_calculo,
            NULL::INTEGER as tienda_id,
            NULL::INTEGER as total_ordenes,
            NULL::INTEGER as total_productos_monitoreados,
            NULL::INTEGER as dias_total,
            NULL::BIGINT as oportunidades_stock,
            NULL::DECIMAL(8,4) as tasa_ruptura_global_porcentaje,
            NULL::DATE as fecha_primera_orden,
            NULL::DATE as fecha_ultima_orden;
        RETURN;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fn_tasa_ruptura_global(
    p_tienda_id INTEGER DEFAULT NULL
) RETURNS TABLE(
    tipo_calculo VARCHAR(20),
    tienda_id INTEGER,
    total_ordenes INTEGER,
    total_productos_monitoreados INTEGER,
    dias_total INTEGER,
    oportunidades_stock BIGINT,
    tasa_ruptura_global_porcentaje DECIMAL(8,4),
    fecha_primera_orden DATE,
    fecha_ultima_orden DATE
) AS $$
BEGIN
    /** Calcular tasa de ruptura global */
    RETURN QUERY SELECT * FROM fn_calcular_tasa_ruptura_stock(
        p_tienda_id,
        'global'
    );
END;
$$ LANGUAGE plpgsql;

/**
 * Función para obtener la tasa de ruptura de stock por tienda
 * @returns TABLE con las tasas de ruptura por tienda ordenadas por mayor problemática
 */
CREATE OR REPLACE FUNCTION fn_tasa_ruptura_por_tienda()
RETURNS TABLE(
    tipo_calculo VARCHAR(20),
    tienda_id INTEGER,
    total_ordenes INTEGER,
    total_productos_monitoreados INTEGER,
    dias_total INTEGER,
    oportunidades_stock BIGINT,
    tasa_ruptura_global_porcentaje DECIMAL(8,4),
    fecha_primera_orden DATE,
    fecha_ultima_orden DATE
) AS $$
BEGIN
    /** Calcular tasa de ruptura por tienda */
    RETURN QUERY SELECT * FROM fn_calcular_tasa_ruptura_stock(
        NULL,
        'tienda'
    );
END;
$$ LANGUAGE plpgsql;
