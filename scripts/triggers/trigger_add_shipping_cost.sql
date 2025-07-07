-- trigger_add_shipping_cost.sql

-- Primero, eliminamos el trigger si existe para evitar conflictos.
DROP TRIGGER IF EXISTS trigger_agregar_costo_envio ON status_venta;

-- Luego, eliminamos la función que utiliza el trigger.
DROP FUNCTION IF EXISTS fn_agregar_costo_envio_a_venta();

-- Ahora, creamos la función que se ejecutará con el trigger.
CREATE OR REPLACE FUNCTION fn_agregar_costo_envio_a_venta()
RETURNS TRIGGER AS $$
DECLARE
    v_venta_id INTEGER;
    v_status_nombre VARCHAR;
    v_fk_tienda_web INTEGER;
    v_tasa_usd DECIMAL;
    -- NOTA: El costo de envío en USD se asume en $5.0, ya que no fue especificado.
    v_shipping_cost_usd DECIMAL := 5.0;
    v_shipping_cost_bs DECIMAL;
BEGIN
    -- Obtener el ID de la venta de la fila insertada en status_venta.
    v_venta_id := NEW.fk_venta;

    -- Obtener el nombre del nuevo status.
    SELECT nombre INTO v_status_nombre FROM status WHERE id = NEW.fk_status;

    -- Solo proceder si el nuevo status es 'Despachando'.
    IF v_status_nombre = 'Despachando' THEN
        -- Verificar si la venta es de una tienda web.
        SELECT fk_tienda_web INTO v_fk_tienda_web FROM venta WHERE id = v_venta_id;

        IF v_fk_tienda_web IS NOT NULL THEN
            -- Si es una venta web, se agrega el costo de envío.
            
            -- Obtener la última tasa de cambio para USD.
            SELECT monto_equivalencia INTO v_tasa_usd
            FROM tasa
            WHERE moneda = 'USD'
            ORDER BY fecha_inicio DESC
            LIMIT 1;

            IF NOT FOUND THEN
                RAISE EXCEPTION 'No se encontró tasa de cambio para USD.';
            END IF;

            -- Calcular el costo de envío en la moneda local.
            v_shipping_cost_bs := v_shipping_cost_usd * v_tasa_usd;

            -- Actualizar el monto_total de la venta, sumando el costo de envío.
            UPDATE venta
            SET monto_total = monto_total + v_shipping_cost_bs
            WHERE id = v_venta_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger que se activa después de insertar en status_venta.
CREATE TRIGGER trigger_agregar_costo_envio
AFTER INSERT ON status_venta
FOR EACH ROW
EXECUTE FUNCTION fn_agregar_costo_envio_a_venta(); 