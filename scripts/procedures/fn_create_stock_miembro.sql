CREATE OR REPLACE FUNCTION fn_create_stock_miembro(
    p_id_miembro_1 int,
    p_id_miembro_2 bpchar,
    p_id_evento int,
    p_id_producto_1 int,
    p_id_producto_2 int,
    p_cantidad int
)
RETURNS boolean AS $$
DECLARE
BEGIN
    
    INSERT INTO stock_miembro (fk_miembro_1,fk_miembro_2,fk_evento,fk_presentacion_cerveza_1,fk_presentacion_cerveza_2,cantidad) VALUES
    (p_id_miembro_1 ,
    p_id_miembro_2 ,
    p_id_evento ,
    p_id_producto_1 ,
    p_id_producto_2 ,
    p_cantidad);
    
    RETURN true;

EXCEPTION
    WHEN OTHERS THEN
        /** La DB maneja constraints y FK automáticamente */
        RAISE;
END;
$$ LANGUAGE plpgsql;
