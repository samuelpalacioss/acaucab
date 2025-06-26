/**
 * Actualiza el estado de una orden de compra.
 *
 * Esta función se encarga de:
 * 1. Validar la transición de estado según el flujo: Pendiente -> aprobado/cancelado -> En Proceso/cancelado -> finalizado/cancelado.
 * 2. Finalizar el estado actual de la orden de compra, estableciendo la `fecha_fin`.
 * 3. Insertar un nuevo registro para reflejar el nuevo estado de la orden.
 * 4. Si el nuevo estado es "finalizado", actualiza la observación de la orden.
 *
 * @param p_orden_id - El ID de la orden de compra que se va a actualizar.
 * @param p_nuevo_status_nombre - El nombre del nuevo estado que se le asignará a la orden.
 * @param p_usuario_id - El ID del usuario que realiza la acción.
 * @param p_observacion_final - (Opcional) Una observación sobre la finalización de la orden.
 */
CREATE OR REPLACE FUNCTION fn_update_status_orden_compra(
    p_orden_id INTEGER,
    p_nuevo_status_nombre VARCHAR,
    p_usuario_id INTEGER,
    p_observacion_final TEXT DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
    v_fecha_actual TIMESTAMP := NOW();
    v_current_status_nombre VARCHAR;
    v_new_status_id INTEGER;
BEGIN
    /**
     * Obtenemos el ID del nuevo estado a partir de su nombre.
     */
    SELECT id INTO v_new_status_id 
    FROM status
    WHERE TRIM(LOWER(nombre)) = TRIM(LOWER(p_nuevo_status_nombre));

    IF v_new_status_id IS NULL THEN
        RAISE EXCEPTION 'El estado "%" no es un estado válido.', p_nuevo_status_nombre;
    END IF;

    /**
     * Obtenemos el nombre del estado actual de la orden.
     */
    SELECT s.nombre INTO v_current_status_nombre
    FROM status_orden so
    JOIN status s ON so.fk_status = s.id
    WHERE so.fk_orden_de_compra = p_orden_id AND so.fecha_fin IS NULL;

    IF v_current_status_nombre IS NULL THEN
        RAISE EXCEPTION 'La orden de compra ID % no tiene un estado actual para actualizar o no existe.', p_orden_id;
    END IF;

    /**
     * Lógica de transición de estados.
     */
    CASE TRIM(LOWER(v_current_status_nombre))
        WHEN 'pendiente' THEN
            IF TRIM(LOWER(p_nuevo_status_nombre)) NOT IN ('aprobado', 'cancelado') THEN
                RAISE EXCEPTION 'Una orden "Pendiente" solo puede cambiar a "aprobado" o "cancelado", no a "%".', p_nuevo_status_nombre;
            END IF;
        WHEN 'aprobado' THEN
            IF TRIM(LOWER(p_nuevo_status_nombre)) NOT IN ('en proceso', 'cancelado') THEN
                RAISE EXCEPTION 'Una orden "aprobado" solo puede cambiar a "En Proceso" o "cancelado", no a "%".', p_nuevo_status_nombre;
            END IF;
        WHEN 'en proceso' THEN
            IF TRIM(LOWER(p_nuevo_status_nombre)) NOT IN ('finalizado', 'cancelado') THEN
                RAISE EXCEPTION 'Una orden "En Proceso" solo puede cambiar a "finalizado" o "cancelado", no a "%".', p_nuevo_status_nombre;
            END IF;
        WHEN 'finalizado', 'cancelado' THEN
            RAISE EXCEPTION 'La orden ya está en un estado terminal ("%") y no se puede cambiar.', v_current_status_nombre;
        ELSE
            RAISE EXCEPTION 'El estado actual de la orden ("%") no permite la transición a "%".', v_current_status_nombre, p_nuevo_status_nombre;
    END CASE;

    /**
     * Si el nuevo estado es 'finalizado', actualizamos la orden con la observación.
     */
    IF TRIM(LOWER(p_nuevo_status_nombre)) = 'finalizado' THEN
        UPDATE orden_de_compra
        SET observacion = p_observacion_final
        WHERE id = p_orden_id;
    END IF;

    /**
     * Asignamos el usuario a la orden si no tiene uno.
     */
    UPDATE orden_de_compra
    SET fk_usuario = p_usuario_id
    WHERE id = p_orden_id AND fk_usuario IS NULL;
    
    /**
     * Actualizamos el estado actual, poniéndole una fecha de fin.
     */
    UPDATE status_orden
    SET fecha_fin = v_fecha_actual
    WHERE fk_orden_de_compra = p_orden_id AND fecha_fin IS NULL;

    /**
     * Insertamos el nuevo estado para la orden de compra.
     */
    INSERT INTO status_orden (fecha_actualización, fecha_fin, fk_status, fk_orden_de_compra, fk_orden_de_reposicion)
    VALUES (v_fecha_actual, NULL, v_new_status_id, p_orden_id, NULL);
END;
$$ LANGUAGE plpgsql;

-- Comentario: Esta función asume que existe una tabla status_orden_compra
-- similar a status_orden para las órdenes de reposición.
-- Si no existe, será necesario crearla con la siguiente estructura:
/*
CREATE TABLE status_orden_compra (
    id SERIAL PRIMARY KEY,
    fk_orden_de_compra INTEGER NOT NULL REFERENCES orden_de_compra(id),
    fk_status INTEGER NOT NULL REFERENCES status(id),
    fecha_actualización TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
*/ 