/**
 * @name fn_anexar_cliente_metodo_pago
 * @description Función para asociar un método de pago a un cliente, ya sea natural o jurídico.
 *              La función verifica si la asociación ya existe antes de crearla para evitar duplicados.
 *
 * @param p_fk_metodo_pago - ID del método de pago a asociar.
 * @param p_id_cliente - ID del cliente (natural o jurídico).
 * @param p_tipo_cliente - Tipo de cliente ('natural' o 'juridico').
 *
 * @returns - El ID del nuevo registro en cliente_metodo_pago
 *
 * @exceptions Lanza una excepción si el p_tipo_cliente no es 'natural' ni 'juridico'.
 */
DROP FUNCTION IF EXISTS fn_anexar_cliente_metodo_pago(INTEGER, INTEGER, VARCHAR(10));

CREATE OR REPLACE FUNCTION fn_anexar_cliente_metodo_pago(
    p_fk_metodo_pago INTEGER,
    p_id_cliente INTEGER,
    p_tipo_cliente VARCHAR(10)
)
RETURNS INTEGER AS $$
DECLARE
    v_fk_cliente_natural INTEGER;
    v_fk_cliente_juridico INTEGER;
    v_nuevo_id INTEGER;
BEGIN
    -- Se verifica si el tipo de cliente es 'natural'.
    IF p_tipo_cliente = 'natural' THEN
        -- Se comprueba si la asociación entre el método de pago y el cliente natural ya existe.
        IF NOT EXISTS (
            SELECT 1
            FROM cliente_metodo_pago
            WHERE fk_metodo_pago = p_fk_metodo_pago
              AND fk_cliente_natural = p_id_cliente
        ) THEN
            -- Si no existe, se inserta la nueva asociación en la tabla cliente_metodo_pago.
            INSERT INTO cliente_metodo_pago (fk_metodo_pago, fk_cliente_natural)
            VALUES (p_fk_metodo_pago, p_id_cliente) RETURNING id INTO v_nuevo_id;
        END IF;
    -- Se verifica si el tipo de cliente es 'juridico'.
    ELSIF p_tipo_cliente = 'juridico' THEN
        -- Se comprueba si la asociación entre el método de pago y el cliente jurídico ya existe.
        IF NOT EXISTS (
            SELECT 1
            FROM cliente_metodo_pago
            WHERE fk_metodo_pago = p_fk_metodo_pago
              AND fk_cliente_juridico = p_id_cliente
        ) THEN
            -- Si no existe, se inserta la nueva asociación en la tabla cliente_metodo_pago.
            INSERT INTO cliente_metodo_pago (fk_metodo_pago, fk_cliente_juridico)
            VALUES (p_fk_metodo_pago, p_id_cliente) RETURNING id INTO v_nuevo_id;
        END IF;
    ELSE
        -- Si el tipo de cliente no es válido, se lanza una excepción.
        RAISE EXCEPTION 'Tipo de cliente no válido: %. Debe ser ''natural'' o ''juridico''', p_tipo_cliente;
    END IF;

    RETURN v_nuevo_id;
END;
$$ LANGUAGE plpgsql; 