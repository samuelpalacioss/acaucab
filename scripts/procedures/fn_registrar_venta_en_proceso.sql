DROP FUNCTION IF EXISTS fn_registrar_venta_en_proceso(INTEGER, INTEGER);

CREATE OR REPLACE FUNCTION fn_registrar_venta_en_proceso(
  p_cliente_id INTEGER,
  p_tienda_fisica_id INTEGER DEFAULT 1
)
RETURNS INTEGER AS $$
DECLARE
  nueva_venta_id INTEGER;
  is_natural BOOLEAN;
  v_status_id INTEGER;
BEGIN

  /** Verificar si el cliente es natural  (retorna booleano) */
  SELECT EXISTS(SELECT id FROM cliente_natural cn WHERE cn.id = p_cliente_id LIMIT 1) INTO is_natural;

  IF is_natural THEN
    /* Creatr venta nueva asociada a la tienda y al cliente*/
    INSERT INTO venta(fk_tienda_fisica, fk_cliente_natural) 
    VALUES (p_tienda_fisica_id, p_cliente_id)
    RETURNING id INTO nueva_venta_id;
  ELSE
      /* Creatr venta nueva asociada a la tienda y al cliente*/
    INSERT INTO venta(fk_tienda_fisica, fk_cliente_juridico) 
    VALUES (p_tienda_fisica_id, p_cliente_id)
    RETURNING id INTO nueva_venta_id;
  END IF;
  /* Asociar estado en progreso para la venta */
  SELECT id INTO v_status_id FROM status WHERE status.nombre = 'En Proceso';

  INSERT INTO status_venta(fk_venta, fk_status, fecha_actualizacion)
  VALUES(nueva_venta_id, v_status_id, NOW());


  RETURN nueva_venta_id;
END;
$$ language plpgsql