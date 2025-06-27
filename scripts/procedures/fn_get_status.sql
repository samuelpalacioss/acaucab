DROP FUNCTION IF EXISTS fn_get_status();

CREATE OR REPLACE FUNCTION fn_get_status()
RETURNS TABLE (
    id INTEGER,
    nombre VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    /**
     * Retorna todos los status ordenados por ID
     * @return TABLE - Registros de la tabla status
     */
    RETURN QUERY
    SELECT 
        s.id,
        s.nombre
    FROM status s
    ORDER BY s.id;
END;
$$;
