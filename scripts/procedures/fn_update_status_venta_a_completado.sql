DROP FUNCTION IF EXISTS fn_update_status_venta_a_completado(INTEGER);

CREATE OR REPLACE FUNCTION fn_update_status_venta_a_completado(
  p_venta_id INTEGER
)
RETURNS VOID AS $$
DECLARE
  v_status_completado_id INTEGER;
  v_fecha_actual TIMESTAMP := NOW();
BEGIN
  -- Primero, obtener el ID para el status 'Completado' desde la tabla 'status'
  SELECT id INTO v_status_completado_id FROM status WHERE nombre = 'Completado';

  -- Si no se encuentra el status, lanzar una excepción
  IF v_status_completado_id IS NULL THEN
    RAISE EXCEPTION 'El status ''Completado'' no se encontró en la tabla status.';
  END IF;

  -- Actualizar el estado anterior de la venta, estableciendo la fecha de finalización
  UPDATE status_venta
  SET fecha_fin = v_fecha_actual
  WHERE fk_venta = p_venta_id AND fecha_fin IS NULL;

  -- Insertar el nuevo estado 'Completado' para la venta
  INSERT INTO status_venta (fecha_actualización, fecha_fin, fk_status, fk_venta)
  VALUES (v_fecha_actual, NULL, v_status_completado_id, p_venta_id);

END;
$$ LANGUAGE plpgsql;