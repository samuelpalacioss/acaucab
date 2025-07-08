/**
 * fn_get_stats_tienda_empleado
 * Obtiene estadísticas de ventas por empleado
 * 
 * @returns TABLE con estadísticas de ventas por empleado
 */
CREATE OR REPLACE FUNCTION fn_get_stats_tienda_empleado()
RETURNS TABLE (
    fk_empleado INTEGER,
    total_ventas BIGINT,
    nombre_empleado VARCHAR,
    identificacion VARCHAR,
    cargo VARCHAR,
    departamento VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Manejo de errores básico
    BEGIN
        RETURN QUERY
        SELECT 
            v.fk_empleado,
            COUNT(*)::BIGINT AS total_ventas,
            (e.primer_nombre || ' ' || e.primer_apellido)::VARCHAR AS nombre_empleado,
            (e.nacionalidad || '-' || e.ci)::VARCHAR AS identificacion,
            COALESCE(c.nombre, 'Sin cargo')::VARCHAR AS cargo,
            COALESCE(d.nombre, 'Sin departamento')::VARCHAR AS departamento
        FROM venta v
        LEFT JOIN empleado e ON v.fk_empleado = e.id
        LEFT JOIN (
            -- Subconsulta para obtener la nómina más reciente de cada empleado
            SELECT DISTINCT ON (nom.fk_empleado) 
                nom.fk_empleado AS id_empleado_nomina,
                nom.fk_cargo, 
                nom.fk_departamento
            FROM nomina nom
            ORDER BY nom.fk_empleado, nom.fecha_inicio DESC
        ) AS n ON e.id = n.id_empleado_nomina
        LEFT JOIN cargo c ON n.fk_cargo = c.id
        LEFT JOIN departamento d ON n.fk_departamento = d.id
        WHERE v.fk_empleado IS NOT NULL
        GROUP BY 
            v.fk_empleado,
            e.primer_nombre, 
            e.primer_apellido, 
            e.nacionalidad, 
            e.ci, 
            c.nombre, 
            d.nombre
        ORDER BY total_ventas DESC;
        
    EXCEPTION
        WHEN OTHERS THEN
            RAISE EXCEPTION 'Error al obtener estadísticas de ventas por empleado: %', SQLERRM;
    END;
END;
$$;
