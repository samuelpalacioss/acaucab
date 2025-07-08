CREATE OR REPLACE FUNCTION fn_registrar_detalle_presentacion_evento_en_proceso(
  p_presentacion_id INTEGER,
  p_cerveza_id INTEGER,
  p_venta_id INTEGER,
  p_cantidad INTEGER,
  p_evento_id integer,
  p_proveedorId1 integer,
  p_proveedorId2 bpchar
)
RETURNS BOOLEAN AS $$ 
DECLARE 
  existe_venta BOOLEAN;
BEGIN  
  SELECT EXISTS (SELECT FROM venta_evento v WHERE v.id = p_venta_id LIMIT 1) INTO existe_venta;

  IF existe_venta THEN
    INSERT INTO detalle_evento(fk_stock_miembro_1, fk_stock_miembro_2, fk_stock_miembro_3,fk_stock_miembro_4,fk_stock_miembro_5,fk_venta_evento, cantidad)
    VALUES (p_proveedorId1,p_proveedorId2,p_evento_id, p_presentacion_id, p_cerveza_id,p_venta_id, p_cantidad);
    
    RETURN TRUE;
  ELSE 
    RAISE EXCEPTION 'No existe venta con el id: %', p_venta_id;
  END IF;
END  
$$ language plpgsql;
    
