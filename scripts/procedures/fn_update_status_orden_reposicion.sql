/**
 * Actualiza el estado de una orden de reposición.
 *
 * Esta función se encarga de dos cosas:
 * 1. Finaliza el estado actual de la orden de reposición, estableciendo la `fecha_fin`.
 * 2. Inserta un nuevo registro para reflejar el nuevo estado de la orden.
 *
 * @param p_orden_id - El ID de la orden de reposición que se va a actualizar.
 * @param p_status_id - El ID del nuevo estado que se le asignará a la orden.
 */
CREATE OR REPLACE FUNCTION fn_update_status_orden_reposicion(
    p_orden_id INTEGER,
    p_status_id INTEGER
)
RETURNS VOID AS $$
DECLARE
    v_fecha_actual TIMESTAMP := NOW();
    v_current_status_nombre VARCHAR;
    v_new_status_nombre VARCHAR;
BEGIN
    /**
     * Obtenemos el nombre del estado actual de la orden.
     * El estado actual es el que no tiene fecha_fin.
     */
    SELECT s.nombre INTO v_current_status_nombre
    FROM status_orden so
    JOIN status s ON so.fk_status = s.id
    WHERE so.fk_orden_de_reposicion = p_orden_id AND so.fecha_fin IS NULL;

    /**
     * Obtenemos el nombre del nuevo estado al que se quiere cambiar.
     */
    SELECT nombre INTO v_new_status_nombre FROM status WHERE id = p_status_id;

    -- Si no hay un estado actual, es un error porque esta función es para actualizar.
    IF v_current_status_nombre IS NULL THEN
        RAISE EXCEPTION 'La orden ID % no tiene un estado actual para actualizar.', p_orden_id;
    END IF;

    /**
     * Lógica de transición de estados.
     * Se valida que el cambio de estado siga la jerarquía definida.
     */
    CASE v_current_status_nombre
        WHEN 'Pendiente' THEN
            IF v_new_status_nombre NOT IN ('Aprobada', 'Cancelada') THEN
                RAISE EXCEPTION 'Una orden "Pendiente" solo puede cambiar a "Aprobada" o "Cancelada", no a "%".', v_new_status_nombre;
            END IF;
        WHEN 'Aprobada' THEN
            IF v_new_status_nombre NOT IN ('En proceso', 'Cancelada') THEN
                RAISE EXCEPTION 'Una orden "Aprobada" solo puede cambiar a "En proceso" o "Cancelada", no a "%".', v_new_status_nombre;
            END IF;
        WHEN 'En proceso' THEN
            IF v_new_status_nombre <> 'Finalizada' THEN
                RAISE EXCEPTION 'Una orden "En proceso" solo puede cambiar a "Finalizada", no a "%".', v_new_status_nombre;
            END IF;
        WHEN 'Finalizada', 'Cancelada' THEN
            RAISE EXCEPTION 'La orden ya está en un estado terminal ("%") y no se puede cambiar.', v_current_status_nombre;
        ELSE
            -- Este caso captura cualquier otro estado no definido en la lógica.
            RAISE EXCEPTION 'El estado actual de la orden ("%") no permite transiciones.', v_current_status_nombre;
    END CASE;

    /**
     * Si la transición es válida, procedemos a actualizar el estado.
     * Primero, "cerramos" el estado anterior poniendo una fecha de fin.
     */
    UPDATE status_orden
    SET fecha_fin = v_fecha_actual
    WHERE fk_orden_de_reposicion = p_orden_id AND fecha_fin IS NULL;

    /**
     * Finalmente, insertamos el nuevo estado para la orden.
     */
    INSERT INTO status_orden (fecha_actualización, fecha_fin, fk_status, fk_orden_de_reposicion, fk_orden_de_compra)
    VALUES (v_fecha_actual, NULL, p_status_id, p_orden_id, NULL);
END;
$$ LANGUAGE plpgsql;
