create or replace function update_stock_evento()
returns trigger
as $$
DECLARE
    v_cantidad_restante INT := new.cantidad;
BEGIN
    update stock_miembro set cantidad = cantidad - v_cantidad_restante 
    where fk_miembro_1=new.fk_stock_miembro_1 and fk_miembro_2=new.fk_stock_miembro_2 and fk_evento=new.fk_stock_miembro_3 and fk_presentacion_cerveza_1=new.fk_stock_miembro_4 and fk_presentacion_cerveza_2=new.fk_stock_miembro_5;
    RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER stock_en_evento
AFTER UPDATE ON detalle_evento
FOR EACH ROW
WHEN (OLD.precio_unitario is null AND NEW.precio_unitario is not null)
EXECUTE FUNCTION update_stock_evento();