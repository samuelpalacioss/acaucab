DROP FUNCTION IF EXISTS fn_registrar_detalle_presentacion_en_proceso(INTEGER, INTEGER, INTEGER);

CREATE OR REPLACE FUNCTION fn_registrar_detalle_presentacion_en_proceso(
  p_presentacion_id INTEGER,
  p_cerveza_id INTEGER,
  p_venta_id INTEGER
)
RETURNS INTEGER AS $$ 
DECLARE 
  v_nuevo_detalle_id INTEGER;
  existe_venta BOOLEAN;
BEGIN  
  SELECT EXISTS (SELECT FROM venta v WHERE v.id = p_venta_id LIMIT 1) INTO existe_venta;

  IF existe_venta THEN
    INSERT INTO detalle_presentacion(fk_venta, fk_presentacion, fk_cerveza)
    VALUES (p_venta_id, p_presentacion_id, p_cerveza_id) RETURNING id 
    INTO v_nuevo_detalle_id;
    
    RETURN v_nuevo_detalle_id;
  ELSE 
    RAISE EXCEPTION 'No existe venta con el id: %', p_venta_id;
  END IF;
END  
$$ language plpgsql;
    
