DROP TRIGGER IF EXISTS trigger_bajo_stock_reposicion ON lugar_tienda_inventario;
DROP FUNCTION IF EXISTS generar_orden_reposicion_automatica;

CREATE OR REPLACE FUNCTION generar_orden_reposicion_automatica()
RETURNS TRIGGER AS $$
DECLARE
    nueva_orden_id INTEGER;
    status_solicitada_id INTEGER;
BEGIN
    -- Solo se activa si la cantidad baja de 20 y antes era mayor o igual a 20
    IF NEW.cantidad < 20 AND OLD.cantidad >= 20 THEN

        -- Asegurarse de que el estado 'Pendiente' exista
        SELECT id INTO status_solicitada_id FROM status WHERE nombre = 'Pendiente' LIMIT 1;

        IF status_solicitada_id IS NULL THEN
            INSERT INTO status (nombre) VALUES ('Pendiente') RETURNING id INTO status_solicitada_id;
        END IF;

        -- Crear la orden de reposición
        INSERT INTO orden_de_reposicion (
            fecha_orden,
            observacion,
            unidades,
            fk_lugar_tienda_1,
            fk_lugar_tienda_2,
            fk_inventario_1,
            fk_inventario_2,
            fk_inventario_3,
            fk_usuario
        )
        VALUES (
            NOW(),
            'Reposición automática por bajo stock.',
            NULL, -- Cantidad de unidades a reponer por defecto
            NEW.fk_lugar_tienda_1,
            NEW.fk_lugar_tienda_2,
            NEW.fk_inventario_1,
            NEW.fk_inventario_2,
            NEW.fk_inventario_3,
            NULL -- ID de usuario por defecto para la reposición automática
        )
        RETURNING id INTO nueva_orden_id;

        -- Crear el estado inicial para la nueva orden de reposición
        IF nueva_orden_id IS NOT NULL THEN
            INSERT INTO status_orden (
                fecha_actualización,
                fk_status,
                fk_orden_de_reposicion
            )
            VALUES (
                NOW(),
                status_solicitada_id,
                nueva_orden_id
            );
        END IF;

    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Creación del trigger que se ejecuta después de cada actualización en la tabla lugar_tienda_inventario
CREATE TRIGGER trigger_bajo_stock_reposicion
AFTER UPDATE ON lugar_tienda_inventario
FOR EACH ROW
EXECUTE FUNCTION generar_orden_reposicion_automatica(); 