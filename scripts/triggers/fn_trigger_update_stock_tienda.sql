create or replace function update_stock_tienda()
returns trigger
as $$
DECLARE
    v_cantidad_restante INT := new.cantidad;
    r_inventario RECORD;
    id_tienda_fisica int;
BEGIN
    select fk_tienda_fisica
    into id_tienda_fisica
    from venta
    where new.fk_venta=id;
    if id_tienda_fisica is not null then
      FOR r_inventario IN
          SELECT lti.cantidad as cant_inv, lti.fk_lugar_tienda_1 zona, lti.fk_inventario_3 id_almacen
          FROM lugar_tienda_inventario lti, presentacion_cerveza pc
          WHERE new.fk_presentacion=lti.fk_inventario_1 and new.fk_presentacion=pc.fk_presentacion and new.fk_cerveza=lti.fk_inventario_2 and new.fk_cerveza=pc.fk_cerveza and fk_lugar_tienda_2 = id_tienda_fisica
          FOR UPDATE -- Bloquea las filas seleccionadas
      LOOP
          IF v_cantidad_restante <= 0 THEN
              EXIT; -- Salir del bucle si ya no hay más cantidad por restar
          END IF;

          IF r_inventario.cant_inv >= v_cantidad_restante THEN
              UPDATE lugar_tienda_inventario lti
              SET cantidad = cantidad - v_cantidad_restante
              WHERE new.fk_presentacion=lti.fk_inventario_1 and new.fk_cerveza=lti.fk_inventario_2 and fk_lugar_tienda_2 = id_tienda_fisica and
              lti.fk_lugar_tienda_1= r_inventario.zona and lti.fk_inventario_3=r_inventario.id_almacen;
              
              v_cantidad_restante := 0; 
          ELSE
              v_cantidad_restante := v_cantidad_restante - r_inventario.cant_inv;
              
              UPDATE lugar_tienda_inventario lti
              SET cantidad = 0
              WHERE new.fk_presentacion=lti.fk_inventario_1 and new.fk_cerveza=lti.fk_inventario_2 and fk_lugar_tienda_2 = id_tienda_fisica and
              lti.fk_lugar_tienda_1= r_inventario.zona and lti.fk_inventario_3=r_inventario.id_almacen;
          END IF;
      END LOOP;
    end if;
    RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER stock_en_tienda
AFTER UPDATE ON detalle_presentacion
FOR EACH ROW
WHEN (OLD.precio_unitario is null AND NEW.precio_unitario is not null)
EXECUTE FUNCTION update_stock_tienda();