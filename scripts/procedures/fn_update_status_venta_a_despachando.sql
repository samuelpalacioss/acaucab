DROP FUNCTION IF EXISTS fn_update_status_venta_a_despachando(INTEGER);

CREATE OR REPLACE FUNCTION fn_update_status_venta_a_despachando(
  p_venta_id INTEGER
)
RETURNS TABLE (
  id INTEGER,
  nombre VARCHAR,
  fecha_actualización TIMESTAMP,
  fecha_fin TIMESTAMP
)
AS $$
DECLARE
  v_status_despachando_id INTEGER;
  v_fecha_actual TIMESTAMP := NOW();
BEGIN
  -- Primero, obtener el ID para el status 'Despachando' desde la tabla 'status'
  SELECT s.id INTO v_status_despachando_id FROM status s WHERE s.nombre = 'Despachando';

  -- Si no se encuentra el status, lanzar una excepción
  IF v_status_despachando_id IS NULL THEN
    RAISE EXCEPTION 'El status ''Despachando'' no se encontró en la tabla status.';
  END IF;

  -- Actualizar el estado anterior de la venta, estableciendo la fecha de finalización
  UPDATE status_venta
  SET fecha_fin = v_fecha_actual
  WHERE fk_venta = p_venta_id AND status_venta.fecha_fin IS NULL;

  -- Insertar el nuevo estado 'Despachando' y devolver sus detalles
  RETURN QUERY
  WITH nuevo_status AS (
    INSERT INTO status_venta (fecha_actualización, fecha_fin, fk_status, fk_venta)
    VALUES (v_fecha_actual, NULL, v_status_despachando_id, p_venta_id)
    RETURNING status_venta.id, status_venta.fecha_actualización, status_venta.fecha_fin, status_venta.fk_status
  )
  SELECT
    ns.id,
    s.nombre,
    ns.fecha_actualización,
    ns.fecha_fin
  FROM nuevo_status ns
  JOIN status s ON ns.fk_status = s.id;

END;
$$ LANGUAGE plpgsql;