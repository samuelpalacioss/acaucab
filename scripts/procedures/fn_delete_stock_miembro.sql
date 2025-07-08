CREATE OR REPLACE FUNCTION fn_delete_stock_miembro(p_id_miembro_1 int,
            p_id_miembro_2 bpchar,
            p_evento_id int,
            p_id_producto_1 int,
            p_id_producto_2 int)
RETURNS void
LANGUAGE plpgsql
AS $$

BEGIN
    delete from detalle_evento where fk_stock_miembro_1 = p_id_miembro_1 and fk_stock_miembro_2 = p_id_miembro_2 and fk_stock_miembro_3 = p_evento_id and fk_stock_miembro_4 = p_id_producto_1 and fk_stock_miembro_5 = p_id_producto_2;

    delete from stock_miembro where fk_miembro_1 = p_id_miembro_1 and fk_miembro_2 = p_id_miembro_2 and fk_evento = p_evento_id and fk_presentacion_cerveza_1 = p_id_producto_1 and fk_presentacion_cerveza_2 = p_id_producto_2;
    EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al eliminar el stock : %', SQLERRM;
END;
$$;