DROP FUNCTION IF EXISTS fn_registrar_venta_en_proceso(INTEGER, INTEGER, INTEGER, INTEGER);

CREATE OR REPLACE FUNCTION fn_registrar_venta_en_proceso(
  p_usuario_id INTEGER,
  p_cliente_id INTEGER,
  p_tienda_fisica_id INTEGER,
  p_tienda_web_id INTEGER
)
RETURNS TABLE(
  id_venta INTEGER
) 
AS $$
DECLARE
  nueva_venta_id INTEGER;
  is_natural BOOLEAN;
  v_status_id INTEGER;
BEGIN

  -- Handle Web Sale (requires usuario_id)
  IF p_tienda_web_id IS NOT NULL THEN
    IF p_usuario_id IS NULL THEN
      RAISE EXCEPTION 'Id del usuario es (p_usuario_id) es requerido para ventas en tienda web.';
    END IF;

    INSERT INTO venta(fk_tienda_web, fk_usuario)
    VALUES (p_tienda_web_id, p_usuario_id)
    RETURNING id INTO nueva_venta_id;

  -- Handle Physical Store Sale (requires cliente_id)
  ELSIF p_tienda_fisica_id IS NOT NULL THEN
    IF p_cliente_id IS NULL THEN
      RAISE EXCEPTION 'Id del cliente (p_cliente_id) es requerido para ventas en tienda física.';
    END IF;

    -- Check if client is natural or juridical
    SELECT EXISTS(SELECT 1 FROM cliente_natural cn WHERE cn.id = p_cliente_id) INTO is_natural;
    
    IF is_natural THEN
      INSERT INTO venta(fk_tienda_fisica, fk_cliente_natural) 
      VALUES (p_tienda_fisica_id, p_cliente_id)
      RETURNING id INTO nueva_venta_id;
    ELSE
      INSERT INTO venta(fk_tienda_fisica, fk_cliente_juridico) 
      VALUES (p_tienda_fisica_id, p_cliente_id)
      RETURNING id INTO nueva_venta_id;
    END IF;
  ELSE
    RAISE EXCEPTION 'A store ID (p_tienda_web_id or p_tienda_fisica_id) must be provided.';
  END IF;

  /* Asociar estado en progreso para la venta */
  SELECT id INTO v_status_id FROM status WHERE status.nombre = 'En Proceso';

  INSERT INTO status_venta(fk_venta, fk_status, fecha_actualización)
  VALUES(nueva_venta_id, v_status_id, NOW());


  RETURN QUERY SELECT nueva_venta_id;
END;
$$ language plpgsql