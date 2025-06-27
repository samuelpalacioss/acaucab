DROP FUNCTION IF EXISTS fn_get_puntos(INTEGER);

/**
 * ===============================================================================
 * FN_GET_PUNTOS
 * ===============================================================================
 *
 * Descripción:
 * Esta función recupera el número de puntos de un usuario específico.
 * Los puntos son aplicables solo a clientes (naturales o jurídicos).
 * La lógica de cálculo de puntos se basa en la función fn_get_users.
 *
 * Parámetros:
 * @param p_id_usuario INTEGER - El ID del usuario para el cual se quieren obtener los puntos.
 *
 * Retorna:
 * INTEGER - El número de puntos del usuario. Retorna 0 si el usuario no es un
 * cliente o no tiene puntos.
 *
 * ===============================================================================
 */
CREATE OR REPLACE FUNCTION fn_get_puntos(p_id_usuario INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    v_puntos INTEGER;
    v_cliente_natural_id INTEGER;
    v_cliente_juridico_id INTEGER;
BEGIN
    /**
     * ---------------------------------------------------------------------------
     * Paso 1: Identificar el tipo de cliente
     * ---------------------------------------------------------------------------
     *
     * Buscamos en la tabla `cliente_usuario` para encontrar los IDs de cliente
     * (natural o jurídico) asociados al `p_id_usuario` proporcionado.
     * Estos IDs nos permitirán luego buscar los puntos correspondientes.
     */
    SELECT cu.fk_cliente_natural, cu.fk_cliente_juridico
    INTO v_cliente_natural_id, v_cliente_juridico_id
    FROM cliente_usuario cu
    WHERE cu.fk_usuario = p_id_usuario;

    /**
     * ---------------------------------------------------------------------------
     * Paso 2: Verificar si el usuario es un cliente
     * ---------------------------------------------------------------------------
     *
     * Si no se encontró un `fk_cliente_natural` o `fk_cliente_juridico`,
     * significa que el usuario no es un cliente, y por lo tanto, no tiene puntos.
     * En este caso, la función retorna 0.
     */
    IF v_cliente_natural_id IS NULL AND v_cliente_juridico_id IS NULL THEN
        RETURN 0;
    END IF;

    /**
     * ---------------------------------------------------------------------------
     * Paso 3: Calcular los puntos del cliente
     * ---------------------------------------------------------------------------
     *
     * Calculamos los puntos contando las entradas en `cliente_metodo_pago`
     * que están asociadas a un `metodo_pago` de tipo 'punto' y que aún no han
     * sido canjeados (`fecha_canjeo` es NULL).
     * La condición OR en el WHERE maneja tanto a clientes naturales como jurídicos.
     */
    SELECT COUNT(*)::INTEGER
    INTO v_puntos
    FROM cliente_metodo_pago cmp
    JOIN metodo_pago mp ON cmp.fk_metodo_pago = mp.id
    WHERE mp.tipo = 'punto'
      AND mp.fecha_canjeo IS NULL
      AND (cmp.fk_cliente_natural = v_cliente_natural_id OR cmp.fk_cliente_juridico = v_cliente_juridico_id);

    /**
     * ---------------------------------------------------------------------------
     * Paso 4: Retornar el total de puntos
     * ---------------------------------------------------------------------------
     *
     * Retornamos el total de puntos calculados. Si el cliente no tiene puntos,
     * COUNT(*) habrá devuelto 0, lo cual es el valor correcto.
     * Usamos COALESCE para asegurarnos de devolver 0 si `v_puntos` es NULL por alguna razón.
     */
    RETURN COALESCE(v_puntos, 0);
END;
$$;