-- Primero, eliminamos el trigger existente para poder modificar la función.
DROP TRIGGER IF EXISTS trigger_actualizar_monto_venta ON detalle_presentacion;

-- Luego, eliminamos la función que utiliza el trigger.
DROP FUNCTION IF EXISTS fn_actualizar_monto_total_venta();

-- Ahora, creamos la función actualizada.
CREATE OR REPLACE FUNCTION fn_actualizar_monto_total_venta()
RETURNS TRIGGER AS $$
DECLARE
    v_venta_id INTEGER;
    v_subtotal DECIMAL;
    v_shipping_cost_usd CONSTANT DECIMAL := 5.00; -- Shipping cost in USD
    v_shipping_cost_bs DECIMAL := 0;
    v_tasa_usd DECIMAL;
    v_fk_tienda_web INTEGER;
BEGIN
    /*
     Determina el ID de la venta a actualizar.
    */
    IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
        v_venta_id := NEW.fk_venta;
    END IF;

    /*
      Calcula el subtotal de todos los items en la venta.
    */
    SELECT COALESCE(SUM(cantidad * precio_unitario), 0)
    INTO v_subtotal
    FROM detalle_presentacion
    WHERE fk_venta = v_venta_id;
    
    /*
      Verifica si la venta es de una tienda web para agregar el costo de envío.
    */
    SELECT fk_tienda_web INTO v_fk_tienda_web FROM venta WHERE id = v_venta_id;

    IF v_fk_tienda_web IS NOT NULL THEN
        -- Obtener la última tasa de USD
        SELECT monto_equivalencia INTO v_tasa_usd
        FROM tasa
        WHERE moneda = 'USD'
        ORDER BY fecha_inicio DESC
        LIMIT 1;

        -- Calcular el costo de envío en Bolívares
        v_shipping_cost_bs := v_shipping_cost_usd * v_tasa_usd;
    END IF;

    /*
      Actualizar la venta con el nuevo monto total,
      incluyendo costo de envío (si aplica) y el 16% de IVA sobre el subtotal.
    */
    UPDATE venta
    SET monto_total = (v_subtotal * 1.16) + v_shipping_cost_bs
    WHERE id = v_venta_id;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger cuando se inserta o actualiza un detalle de presentación.
CREATE TRIGGER trigger_actualizar_monto_venta
AFTER INSERT OR UPDATE ON detalle_presentacion
FOR EACH ROW
EXECUTE FUNCTION fn_actualizar_monto_total_venta(); 