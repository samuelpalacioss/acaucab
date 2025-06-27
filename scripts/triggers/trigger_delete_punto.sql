DROP TRIGGER IF EXISTS trigger_gestion_punto ON pago;
DROP FUNCTION IF EXISTS fn_trigger_delete_punto;


CREATE OR REPLACE FUNCTION fn_trigger_delete_punto()
RETURNS TRIGGER AS $$
DECLARE
    id_metodo_pago INTEGER;
BEGIN

    IF NEW.fk_cliente_metodo_pago_1 IS NULL THEN
        RETURN NEW;
    END IF;

    SELECT cmp.fk_metodo_pago INTO id_metodo_pago
    FROM cliente_metodo_pago cmp
    INNER JOIN metodo_pago mp ON cmp.fk_metodo_pago = mp.id
    WHERE cmp.id = NEW.fk_cliente_metodo_pago_1 AND mp.tipo = 'punto';

    IF FOUND THEN
        UPDATE metodo_pago
        SET fecha_canjeo = now()::date
        WHERE id = id_metodo_pago;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_gestion_punto
AFTER INSERT ON pago
FOR EACH ROW
EXECUTE FUNCTION fn_trigger_delete_punto(); 