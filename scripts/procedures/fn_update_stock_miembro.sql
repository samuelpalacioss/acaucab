CREATE OR REPLACE FUNCTION fn_update_stock_miembro(p_id_miembro_1 int,
            p_id_miembro_2 bpchar,
            p_evento_id int,
            p_id_producto_1 int,
            p_id_producto_2 int,
            p_cantidad int)
RETURNS void
LANGUAGE plpgsql
AS $$

BEGIN
    update stock_miembro set cantidad=p_cantidad where fk_miembro_1 = p_id_miembro_1 and fk_miembro_2 = p_id_miembro_2 and fk_evento = p_evento_id and fk_presentacion_cerveza_1 = p_id_producto_1 and fk_presentacion_cerveza_2 = p_id_producto_2;
    EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al actualizar el stock : %', SQLERRM;
END;
$$;