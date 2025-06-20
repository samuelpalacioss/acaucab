/**
 * Función para obtener todos los status disponibles en el sistema
 * @returns TABLE - Tabla con todos los registros de status
 * @returns id INTEGER - Identificador único del status
 * @returns nombre VARCHAR(50) - Nombre descriptivo del status
 */
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
