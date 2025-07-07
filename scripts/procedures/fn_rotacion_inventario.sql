CREATE OR REPLACE FUNCTION fn_rotacion_inventario(p_fecha_inicio DATE, p_fecha_fin DATE)
RETURNS NUMERIC AS $$
DECLARE
    v_valor_promedio_inventario NUMERIC;
    v_costo_productos_vendidos  NUMERIC;
    v_rotacion_inventario       NUMERIC;
BEGIN
    /**
     * Tarea: Rotación de Inventario
     * Mide la rapidez con la que se vende y reemplaza el inventario.
     *
     * Fórmula utilizada (según solicitud):
     * Rotación de inventario = Valor promedio del inventario / Costo de los productos vendidos
     *
     * Nota sobre el cálculo del "Valor promedio del inventario":
     * El esquema de la base de datos actual no almacena un historial de niveles de inventario,
     * lo cual es necesario para calcular un promedio de inventario verdadero (ej. (valor_inicial + valor_final) / 2).
     * Como una aproximación práctica, esta función utiliza el VALOR ACTUAL TOTAL del inventario como
     * el "valor promedio". Este valor se calcula sumando el valor de todo el stock existente en
     * todos los almacenes.
     */

    /**
     * Paso 1: Calcular el "Valor promedio del inventario".
     * Se utiliza el valor actual total del inventario.
     * Se multiplica la cantidad de cada producto en el inventario de los almacenes (`inventario.cantidad_almacen`)
     * por su precio de venta (`presentacion_cerveza.precio`).
     */
    SELECT COALESCE(SUM(i.cantidad_almacen * pc.precio), 0)
    INTO v_valor_promedio_inventario
    FROM inventario i
    JOIN presentacion_cerveza pc 
      ON i.fk_presentacion_cerveza_1 = pc.fk_presentacion 
     AND i.fk_presentacion_cerveza_2 = pc.fk_cerveza;

    /**
     * Paso 2: Calcular el "Costo de los productos vendidos" (COGS) en el período especificado.
     * Se suma el valor de todos los productos vendidos en el rango de fechas.
     * Se utiliza `detalle_presentacion` para obtener la cantidad y el precio de cada item vendido,
     * y se une con la tabla `pago` a través de `venta` para filtrar por la fecha de pago (`pago.fecha_pago`).
     */
    SELECT COALESCE(SUM(dp.cantidad * dp.precio_unitario), 0)
    INTO v_costo_productos_vendidos
    FROM detalle_presentacion dp
    JOIN venta v ON dp.fk_venta = v.id
    JOIN pago p ON p.fk_venta = v.id
    WHERE p.fecha_pago::date BETWEEN p_fecha_inicio AND p_fecha_fin;

    /**
     * Paso 3: Calcular la rotación de inventario.
     * Se divide el valor del inventario entre el costo de los productos vendidos.
     * Si el costo de los productos vendidos es cero, la rotación es cero para evitar división por cero.
     */
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
