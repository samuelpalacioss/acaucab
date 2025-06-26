/**
 * Actualiza el estado de una orden de reposición.
 *
 * Esta función se encarga de:
 * 1. Validar la transición de estado.
 * 2. Finalizar el estado actual de la orden de reposición, estableciendo la `fecha_fin`.
 * 3. Insertar un nuevo registro para reflejar el nuevo estado de la orden.
 * 4. Si el nuevo estado es "Finalizado", actualiza las unidades finalizadas y la observación.
 *
 * @param p_orden_id - El ID de la orden de reposición que se va a actualizar.
 * @param p_nuevo_status_nombre - El nombre del nuevo estado que se le asignará a la orden.
 * @param p_usuario_id - El ID del usuario que realiza la acción.
 * @param p_unidades_finalizadas - (Opcional) La cantidad de unidades que se procesaron al finalizar. Requerido si el estado es 'Finalizado'.
 * @param p_observacion_final - (Opcional) Una observación sobre la finalización de la orden.
 */
CREATE OR REPLACE FUNCTION fn_update_status_orden_reposicion(
    p_orden_id INTEGER,
    p_nuevo_status_nombre VARCHAR,
    p_usuario_id INTEGER,
    p_unidades_finalizadas INTEGER DEFAULT NULL,
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
     * La función fn_get_status_by_nombre ya usa TRIM y LOWER.
     */
    SELECT id INTO v_new_status_id 
    FROM fn_get_status_by_nombre(p_nuevo_status_nombre);

    IF v_new_status_id IS NULL THEN
        RAISE EXCEPTION 'El estado "%" no es un estado válido.', p_nuevo_status_nombre;
    END IF;

    /**
     * Obtenemos el nombre del estado actual de la orden.
     */
    SELECT s.nombre INTO v_current_status_nombre
    FROM status_orden so
    JOIN status s ON so.fk_status = s.id
    WHERE so.fk_orden_de_reposicion = p_orden_id AND so.fecha_fin IS NULL;

    IF v_current_status_nombre IS NULL THEN
        RAISE EXCEPTION 'La orden ID % no tiene un estado actual para actualizar.', p_orden_id;
    END IF;

    /**
     * Lógica de transición de estados.
     * Usamos TRIM y LOWER para una comparación a prueba de errores.
     */
    CASE TRIM(LOWER(v_current_status_nombre))
        WHEN 'pendiente' THEN
            IF TRIM(LOWER(p_nuevo_status_nombre)) NOT IN ('aprobado', 'cancelado') THEN
                RAISE EXCEPTION 'Una orden "Pendiente" solo puede cambiar a "Aprobado" o "Cancelado", no a "%".', p_nuevo_status_nombre;
            END IF;
        WHEN 'aprobado' THEN
            IF TRIM(LOWER(p_nuevo_status_nombre)) NOT IN ('finalizado', 'cancelado') THEN
                RAISE EXCEPTION 'Una orden "Aprobado" solo puede cambiar a "Finalizado" o "Cancelado", no a "%".', p_nuevo_status_nombre;
            END IF;
        WHEN 'finalizado', 'cancelado' THEN
            RAISE EXCEPTION 'La orden ya está en un estado terminal ("%") y no se puede cambiar.', v_current_status_nombre;
        ELSE
            RAISE EXCEPTION 'El estado actual de la orden ("%") no permite la transición a "%".', v_current_status_nombre, p_nuevo_status_nombre;
    END CASE;

    /**
     * Si el nuevo estado es 'Finalizado', actualizamos la orden con las unidades y observación.
     */
    IF TRIM(LOWER(p_nuevo_status_nombre)) = 'finalizado' THEN
        IF p_unidades_finalizadas IS NULL THEN
            RAISE EXCEPTION 'Se requieren las unidades finalizadas para marcar una orden como "Finalizado".';
        END IF;
        
        UPDATE orden_de_reposicion
        SET
            unidades = p_unidades_finalizadas,
            observacion = p_observacion_final
        WHERE id = p_orden_id;
    END IF;

    /**
     * Si la transición es válida, asignamos el usuario a la orden si no tiene uno.
     * Esto es útil para saber qué usuario realizó la primera acción importante (aprobar/cancelar).
     */
    UPDATE orden_de_reposicion
    SET fk_usuario = p_usuario_id
    WHERE id = p_orden_id AND fk_usuario IS NULL;
    
    /**
     * Si la transición es válida, procedemos a actualizar el estado.
     */
    UPDATE status_orden
    SET fecha_fin = v_fecha_actual
    WHERE fk_orden_de_reposicion = p_orden_id AND fecha_fin IS NULL;

    /**
     * Finalmente, insertamos el nuevo estado para la orden.
     */
    INSERT INTO status_orden (fecha_actualización, fecha_fin, fk_status, fk_orden_de_reposicion, fk_orden_de_compra)
    VALUES (v_fecha_actual, NULL, v_new_status_id, p_orden_id, NULL);
END;
$$ LANGUAGE plpgsql;
