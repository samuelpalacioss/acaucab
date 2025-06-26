DROP TRIGGER IF EXISTS trigger_bajo_stock_compra ON inventario;
DROP FUNCTION IF EXISTS generar_orden_compra_automatica;

CREATE OR REPLACE FUNCTION generar_orden_compra_automatica()
RETURNS TRIGGER AS $$
DECLARE
    v_nueva_orden_id INTEGER;
    v_status_pendiente_id INTEGER;
    v_proveedor_id INTEGER;
    v_proveedor_rif_nat CHAR(1);
BEGIN
    -- This trigger only activates if the quantity drops below 100 and was previously >= 100
    IF NEW.cantidad_almacen < 100 AND OLD.cantidad_almacen >= 100 THEN

        -- Ensure that the 'Pendiente' status exists
        SELECT id INTO v_status_pendiente_id FROM status WHERE nombre = 'Pendiente' LIMIT 1;

        IF v_status_pendiente_id IS NULL THEN
            INSERT INTO status (nombre) VALUES ('Pendiente') RETURNING id INTO v_status_pendiente_id;
        END IF;

        -- Find the provider (miembro) for the specific beer presentation
        -- by looking into the `miembro_presentacion_cerveza` table.
        SELECT fk_miembro_1, fk_miembro_2
        INTO v_proveedor_id, v_proveedor_rif_nat
        FROM miembro_presentacion_cerveza
        WHERE fk_presentacion_cerveza_1 = NEW.fk_presentacion_cerveza_1
          AND fk_presentacion_cerveza_2 = NEW.fk_presentacion_cerveza_2
        LIMIT 1; -- Assuming one presentation has one main provider.

        -- If no provider is found, we cannot create the purchase order.
        IF v_proveedor_id IS NULL THEN
            RAISE NOTICE 'No provider found for presentation %-% for automatic purchase order generation.', NEW.fk_presentacion_cerveza_1, NEW.fk_presentacion_cerveza_2;
            RETURN NEW;
        END IF;

        -- Create the purchase order
        INSERT INTO orden_de_compra (
            fecha_solicitud,
            observacion,
            unidades,
            fk_presentacion_cerveza_1,
            fk_presentacion_cerveza_2,
            fk_miembro_1,
            fk_miembro_2,
            fk_usuario
        )
        VALUES (
            NOW(),
            'Orden de compra automática por bajo stock.',
            10000, -- Default quantity to order, can be adjusted
            NEW.fk_presentacion_cerveza_1,
            NEW.fk_presentacion_cerveza_2,
            v_proveedor_id,
            v_proveedor_rif_nat,
            NULL -- Default user ID for automatic purchase order
        )
        RETURNING id INTO v_nueva_orden_id;

        -- Create the initial status for the new purchase order
        IF v_nueva_orden_id IS NOT NULL THEN
            INSERT INTO status_orden (
                fecha_actualización,
                fk_status,
                fk_orden_de_compra
            )
            VALUES (
                NOW(),
                v_status_pendiente_id,
                v_nueva_orden_id
            );
        END IF;

    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger creation that executes after each update on the inventario table
CREATE TRIGGER trigger_bajo_stock_compra
AFTER UPDATE ON inventario
FOR EACH ROW
EXECUTE FUNCTION generar_orden_compra_automatica(); 