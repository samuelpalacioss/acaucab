CREATE OR REPLACE FUNCTION fn_get_empleado_by_cedula(p_cedula INTEGER)
RETURNS TABLE (
    id INTEGER,
    nombre_completo VARCHAR,
    rol VARCHAR,
    permisos INTEGER[] -- Array de fks de permisos
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        u.id,
        (e.primer_nombre || ' ' || e.primer_apellido)::VARCHAR,
        r.nombre as rol,
        ARRAY_AGG(p.id) as permisos
    FROM usuario u
    JOIN rol r ON u.fk_rol = r.id
    JOIN permiso_rol pr ON r.id = pr.fk_rol
    JOIN permiso p ON pr.fk_permiso = p.id
    JOIN empleado_usuario eu ON u.id = eu.fk_usuario
    JOIN empleado e ON eu.fk_empleado = e.id
    WHERE e.ci = p_cedula
    GROUP BY 1, 2, 3;

END;
$$;

    