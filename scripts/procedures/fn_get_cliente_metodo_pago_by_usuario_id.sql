DROP FUNCTION IF EXISTS fn_get_cliente_metodo_pago_by_usuario_id(INTEGER);

CREATE OR REPLACE FUNCTION fn_get_cliente_metodo_pago_by_usuario_id(p_usuario_id INTEGER)
RETURNS TABLE (
    id INTEGER,
    fk_metodo_pago INTEGER,
    fk_cliente_natural INTEGER,
    fk_cliente_juridico INTEGER,
    tipo_cliente VARCHAR,
    tipo_pago VARCHAR(50),
    numero_tarjeta BIGINT,
    banco VARCHAR(50),
    fecha_vencimiento DATE
) AS $$
DECLARE
    v_cliente_natural_id INTEGER;
    v_cliente_juridico_id INTEGER;
BEGIN
    -- Primero, encontrar el cliente asociado al usuario
    SELECT cu.fk_cliente_natural, cu.fk_cliente_juridico
    INTO v_cliente_natural_id, v_cliente_juridico_id
    FROM cliente_usuario cu
    WHERE cu.fk_usuario = p_usuario_id;

    -- Si es un cliente natural
    IF v_cliente_natural_id IS NOT NULL THEN
        RETURN QUERY
        SELECT
            cmp.id,
            cmp.fk_metodo_pago,
            cmp.fk_cliente_natural,
            cmp.fk_cliente_juridico,
            'Natural'::VARCHAR as tipo_cliente,
            mp.tipo,
            mp.número,
            mp.banco,
            mp.fecha_vencimiento
        FROM cliente_metodo_pago cmp
        JOIN metodo_pago mp ON cmp.fk_metodo_pago = mp.id
        WHERE cmp.fk_cliente_natural = v_cliente_natural_id
          AND (mp.tipo = 'tarjeta_credito' OR mp.tipo = 'tarjeta_debito');
    -- Si es un cliente jurídico
    ELSIF v_cliente_juridico_id IS NOT NULL THEN
        RETURN QUERY
        SELECT
            cmp.id,
            cmp.fk_metodo_pago,
            cmp.fk_cliente_natural,
            cmp.fk_cliente_juridico,
            'Juridico'::VARCHAR as tipo_cliente,
            mp.tipo,
            mp.número,
            mp.banco,
            mp.fecha_vencimiento
        FROM cliente_metodo_pago cmp
        JOIN metodo_pago mp ON cmp.fk_metodo_pago = mp.id
        WHERE cmp.fk_cliente_juridico = v_cliente_juridico_id
          AND (mp.tipo = 'tarjeta_credito' OR mp.tipo = 'tarjeta_debito');
    END IF;
END;
$$ LANGUAGE plpgsql;