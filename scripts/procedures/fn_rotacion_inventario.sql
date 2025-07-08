CREATE OR REPLACE FUNCTION fn_rotacion_inventario(p_fecha_inicio DATE, p_fecha_fin DATE)
RETURNS NUMERIC AS $$
DECLARE
    v_valor_promedio_inventario NUMERIC;
    v_costo_productos_vendidos  NUMERIC;
    v_rotacion_inventario       NUMERIC;
BEGIN
    /**
     * Fórmula utilizada (según solicitud):
     * Rotación de inventario = Valor promedio del inventario / Costo de los productos vendidos
     */

    SELECT COALESCE(SUM(i.cantidad_almacen * pc.precio), 0)
    INTO v_valor_promedio_inventario
    FROM inventario i
    JOIN presentacion_cerveza pc 
      ON i.fk_presentacion_cerveza_1 = pc.fk_presentacion 
     AND i.fk_presentacion_cerveza_2 = pc.fk_cerveza;
 
    SELECT COALESCE(SUM(dp.cantidad * dp.precio_unitario), 0)
    INTO v_costo_productos_vendidos
    FROM detalle_presentacion dp
    JOIN venta v ON dp.fk_venta = v.id
    JOIN pago p ON p.fk_venta = v.id
    WHERE p.fecha_pago::date BETWEEN p_fecha_inicio AND p_fecha_fin;

 
    IF v_costo_productos_vendidos > 0 THEN
        v_rotacion_inventario := v_valor_promedio_inventario / v_costo_productos_vendidos;
    ELSE
        v_rotacion_inventario := 0;
    END IF;

    /**
     * Paso 4: Retornar el valor calculado.
     */
    RETURN v_rotacion_inventario;

END;
$$ LANGUAGE plpgsql;
