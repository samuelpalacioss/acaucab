DROP FUNCTION IF EXISTS fn_registrar_detalle_presentacion_en_proceso(INTEGER, INTEGER, INTEGER, INTEGER);

CREATE OR REPLACE FUNCTION fn_registrar_detalle_presentacion_en_proceso(
  p_presentacion_id INTEGER,
  p_cerveza_id INTEGER,
  p_venta_id INTEGER,
  p_cantidad INTEGER
)
RETURNS BOOLEAN AS $$ 
DECLARE 
  existe_venta BOOLEAN;
BEGIN  
  SELECT EXISTS (SELECT FROM venta v WHERE v.id = p_venta_id LIMIT 1) INTO existe_venta;

  IF existe_venta THEN
    INSERT INTO detalle_presentacion(fk_venta, fk_presentacion, fk_cerveza, cantidad)
    VALUES (p_venta_id, p_presentacion_id, p_cerveza_id, p_cantidad);
    
    RETURN TRUE;
  ELSE 
    RAISE EXCEPTION 'No existe venta con el id: %', p_venta_id;
  END IF;
END  
$$ language plpgsql;
    
