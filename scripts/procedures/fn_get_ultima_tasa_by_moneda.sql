DROP FUNCTION IF EXISTS fn_get_ultima_tasa_by_moneda(VARCHAR);

CREATE OR REPLACE FUNCTION fn_get_ultima_tasa_by_moneda(p_moneda VARCHAR)
RETURNS TABLE (
    id INTEGER,
    moneda VARCHAR,
    monto_equivalencia DECIMAL,
    fecha_inicio DATE
) AS $$
BEGIN
    /**
     * Busca en la tabla 'tasa' la fila que coincida con el nombre de la moneda
     * y que no tenga una fecha de fin (lo que indica que está activa).
     * Ordena por la fecha de inicio de forma descendente y toma solo la primera,
     * que corresponde a la tasa activa más reciente.
     */
    RETURN QUERY
    SELECT 
        t.id, 
        t.moneda, 
        t.monto_equivalencia, 
        t.fecha_inicio
    FROM tasa t
    WHERE UPPER(t.moneda) = UPPER(p_moneda) AND t.fecha_fin IS NULL
    ORDER BY t.fecha_inicio DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;