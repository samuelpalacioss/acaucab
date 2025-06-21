/**
 * fn_get_empleado_info_by_id
 * 
 * Propósito:
 * Esta función recupera información detallada de un empleado específico, identificado por su ID.
 * Incluye datos personales del empleado, así como información de su cargo, departamento y nómina más reciente.
 * 
 * Parámetros:
 * p_empleado_id (INTEGER): El ID del empleado que se desea consultar.
 * 
 * Retorno:
 * Una tabla con una única fila que contiene los detalles del empleado. Las columnas incluyen:
 * - id_empleado: ID del empleado.
 * - nombre_completo: Nombre y apellido del empleado.
 * - identificacion: Cédula de identidad con nacionalidad.
 * - fecha_nacimiento: Fecha de nacimiento del empleado.
 * - cargo: Nombre del cargo actual del empleado.
 * - departamento: Nombre del departamento al que pertenece el empleado.
 * - salario_base: Salario base asociado al cargo.
 * - fecha_inicio_nomina: Fecha de inicio de su contrato/nómina más reciente.
 * - fecha_fin_nomina: Fecha de fin del contrato/nómina (si aplica).
 * 
 * Lógica:
 * 1.  Busca al empleado por `p_empleado_id`.
 * 2.  Realiza una subconsulta para encontrar la nómina más reciente del empleado, ordenada por `fecha_inicio` de forma descendente.
 * 3.  Une los resultados con las tablas `cargo` y `departamento` para obtener los nombres correspondientes.
 * 4.  Devuelve toda la información combinada en una sola fila.
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
