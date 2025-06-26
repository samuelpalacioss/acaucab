DROP FUNCTION IF EXISTS fn_update_status_venta_a_completado(INTEGER);

CREATE OR REPLACE FUNCTION fn_update_status_venta_a_completado(
  p_venta_id INTEGER
)
RETURNS VOID AS $$
DECLARE
  v_status_id INTEGER;
BEGIN
  -- Primero, obtener el ID para el status 'Completado' desde la tabla 'status'
  SELECT id INTO v_status_id FROM status WHERE nombre = 'Completado';

  -- Si no se encuentra el status, lanzar una excepción para evitar errores silenciosos
  IF v_status_id IS NULL THEN
    RAISE EXCEPTION 'El status ''Completado'' no se encontró en la tabla status.';
  END IF;

  -- Actualizar la tabla 'status_venta' para la venta específica
  UPDATE status_venta
  SET fk_status = v_status_id
  WHERE fk_venta = p_venta_id;
END;
$$ LANGUAGE plpgsql;