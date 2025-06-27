/**
 * fn_get_empleado_info_by_id
 * 
 */
CREATE OR REPLACE FUNCTION fn_get_empleado_info_by_id(p_empleado_id INTEGER)
RETURNS TABLE (
    id_empleado INTEGER,
    nombre_completo VARCHAR,
    identificacion VARCHAR,
    fecha_nacimiento DATE,
    cargo VARCHAR,
    departamento VARCHAR,
    salario_base DECIMAL,
    fecha_inicio_nomina DATE,
    fecha_fin_nomina DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.id,
        (e.primer_nombre || ' ' || e.primer_apellido)::VARCHAR,
        (e.nacionalidad || '-' || e.ci)::VARCHAR,
        e.fecha_nacimiento,
        c.nombre::VARCHAR,
        d.nombre::VARCHAR,
        c.salario_base,
        n.fecha_inicio,
        n.fecha_fin
    FROM
        empleado e
    LEFT JOIN (
        -- Subconsulta para obtener la nómina más reciente
        SELECT *
        FROM nomina
        WHERE fk_empleado = p_empleado_id
        ORDER BY fecha_inicio DESC
        LIMIT 1
    ) AS n ON e.id = n.fk_empleado
    LEFT JOIN cargo c ON n.fk_cargo = c.id
    LEFT JOIN departamento d ON n.fk_departamento = d.id
    WHERE e.id = p_empleado_id;
END;
$$;
