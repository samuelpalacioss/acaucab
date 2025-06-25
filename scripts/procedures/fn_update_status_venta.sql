DROP FUNCTION IF EXISTS fn_update_status_venta(INTEGER, INTEGER);

/**
 * Actualiza el estado de una venta.
 *
 * Esta función se encarga de dos cosas:
 * 1. Finaliza el estado actual de la venta, estableciendo la `fecha_final`.
 * 2. Inserta un nuevo registro para reflejar el nuevo estado de la venta.
 */
CREATE OR REPLACE FUNCTION fn_update_status_venta(
  p_venta_id INTEGER,
  p_status_id INTEGER
)
RETURNS VARCHAR AS $$
DECLARE
  v_estado_actual VARCHAR;
  v_nuevo_estado VARCHAR;
BEGIN
  -- Encuentra el nombre del estado actual de la venta (el que no tiene fecha final)
  SELECT s.nombre INTO v_estado_actual
  FROM status_venta sv
  JOIN status s ON sv.fk_status = s.id
  WHERE sv.fk_venta = p_venta_id AND sv.fecha_final IS NULL;

  -- Si no se encuentra un estado actual, es un error porque toda venta debe tener uno
  IF v_estado_actual IS NULL THEN
    RAISE EXCEPTION 'La venta de ID % no tiene un estado actual para actualizar.', p_venta_id;
  END IF;

  -- Encuentra el nombre del nuevo estado que va a ser asignado a la venta
  SELECT s.nombre INTO v_nuevo_estado
  FROM status s
  WHERE s.id = p_status_id;

  -- Si el ID del nuevo estado no existe en la tabla status, es un error
  IF v_nuevo_estado IS NULL THEN
    RAISE EXCEPTION 'El estado con ID % no fue encontrado en la tabla `status`.', p_status_id;
  END IF;

  -- Una venta en estado cancelado ya llego a su fin, lanzar error
  IF upper(v_estado_actual) = 'CANCELADO' THEN
      RAISE EXCEPTION 'La venta ya está en un estado final ("%") y no puede cambiar.', v_estado_actual;
  END IF;

  -- Una venta con estado pendiente solo puede cambiar a completado o cancelado
  IF upper(v_estado_actual) = 'PENDIENTE' AND upper(v_nuevo_estado) NOT IN ('COMPLETADO', 'CANCELADO') THEN
    RAISE EXCEPTION 'Una venta en estado "Pendiente" solo puede cambiar a "Completado" o "Cancelado", no a "%".', v_nuevo_estado;
  END IF;

  -- Actualiza el estado anterior asignándole una fecha final
  UPDATE status_venta
  SET fecha_final = NOW()
  WHERE fk_venta = p_venta_id AND fecha_final IS NULL;

  -- Crear nuevo estado de la venta con fecha inicial igual a la fecha final del estado anterior
  INSERT INTO status_venta(fk_venta, fk_status, fecha_inicial, fecha_final)
  VALUES (p_venta_id, p_status_id, NOW(), NULL);

  RETURN 'Estado de la venta ' || p_venta_id || ' actualizado de "' || v_estado_actual || '" a "' || v_nuevo_estado || '".';
END;
$$ LANGUAGE plpgsql;