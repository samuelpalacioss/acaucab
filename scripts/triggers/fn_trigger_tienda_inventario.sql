
CREATE OR REPLACE FUNCTION fn_check_lugar_tienda_tipo() RETURNS TRIGGER AS $$
DECLARE
    v_lugar_tipo VARCHAR(25);
BEGIN
    /**
     * Esta función de trigger se activa antes de un INSERT o UPDATE
     * en la tabla lugar_tienda_inventario. Su propósito es asegurar que solo
     * se puedan asignar cantidades de inventario a lugares de tipo 'anaquel'.
     */

    -- Obtener el tipo del lugar_tienda que se está referenciando
    SELECT tipo INTO v_lugar_tipo
    FROM lugar_tienda
    WHERE id = NEW.fk_lugar_tienda_1 AND fk_tienda_fisica = NEW.fk_lugar_tienda_2;

    -- Si el tipo no es 'anaquel', se lanza una excepción.
    IF v_lugar_tipo != 'anaquel' THEN
        RAISE EXCEPTION 'No se puede asignar inventario directamente a un lugar de tipo "%". Solo se permite en "anaquel".', v_lugar_tipo;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

/**
 * Trigger para asegurar que el inventario solo se asigne a 'anaqueles'.
 * Llama a la función fn_check_lugar_tienda_tipo antes de cualquier inserción
 * o actualización en la tabla lugar_tienda_inventario.
 */
CREATE TRIGGER trg_check_lugar_tienda_tipo
BEFORE INSERT OR UPDATE ON lugar_tienda_inventario
FOR EACH ROW EXECUTE FUNCTION fn_check_lugar_tienda_tipo();