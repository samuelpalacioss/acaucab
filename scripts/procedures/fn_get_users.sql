DROP FUNCTION IF EXISTS fn_get_users();

-- Creamos la función fn_get_users para obtener la información de todos los usuarios.
CREATE OR REPLACE FUNCTION fn_get_users()
RETURNS TABLE (
    id_usuario INTEGER,
    nombre_completo VARCHAR,
    email VARCHAR,
    telefono VARCHAR,
    rol_nombre VARCHAR,
    id_rol INTEGER,
    tipo_usuario VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    WITH usuarios_completos AS (
        SELECT
            u.id AS id_usuario,
            -- Obtenemos el nombre completo. COALESCE devuelve el primer valor no nulo.
            -- Como cada usuario es solo de un tipo, solo una de estas columnas tendrá valor.
            COALESCE(
                e.primer_nombre || ' ' || e.primer_apellido, -- Si es empleado
                cn.primer_nombre || ' ' || cn.primer_apellido, -- Si es cliente natural
                cj.denominación_comercial, -- Si es cliente jurídico
                m.denominación_comercial -- Si es miembro
            ) AS nombre_completo_calc,
            
            c.dirección_correo AS email_calc,

            -- De forma similar, obtenemos el teléfono usando subconsultas con COALESCE.
            COALESCE(
                (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_empleado = e.id LIMIT 1),
                (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_cliente_natural = cn.id LIMIT 1),
                (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_cliente_juridico = cj.id LIMIT 1),
                (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_miembro_1 = m.rif AND t.fk_miembro_2 = m.naturaleza_rif LIMIT 1)
            ) AS telefono_calc,
            
            r.nombre AS rol_nombre_calc,
            r.id AS id_rol_calc,

            -- Determinamos el tipo de usuario basado en la tabla de origen de sus datos
            CASE 
                WHEN e.id IS NOT NULL THEN 'Empleado'
                WHEN cn.id IS NOT NULL OR cj.id IS NOT NULL THEN 'Cliente'
                WHEN m.rif IS NOT NULL THEN 'Miembro'
                ELSE 'Indefinido'
            END AS tipo_usuario_calc
        FROM usuario u
        -- Unimos con tablas básicas que todo usuario tiene
        JOIN correo c ON u.fk_correo = c.id
        JOIN rol r ON u.fk_rol = r.id
        
        -- Usamos LEFT JOIN para "intentar" unir con cada tipo de entidad posible.
        -- Solo una de estas cadenas de JOINs tendrá éxito por cada usuario.
        LEFT JOIN empleado_usuario eu ON u.id = eu.fk_usuario
        LEFT JOIN empleado e ON eu.fk_empleado = e.id
        
        LEFT JOIN cliente_usuario cu ON u.id = cu.fk_usuario
        LEFT JOIN cliente_natural cn ON cu.fk_cliente_natural = cn.id
        LEFT JOIN cliente_juridico cj ON cu.fk_cliente_juridico = cj.id
        
        LEFT JOIN miembro_usuario mu ON u.id = mu.fk_usuario
        LEFT JOIN miembro m ON mu.fk_miembro_1 = m.rif AND mu.fk_miembro_2 = m.naturaleza_rif
    )
    SELECT
        uc.id_usuario,
        uc.nombre_completo_calc::VARCHAR AS nombre_completo,
        uc.email_calc::VARCHAR AS email,
        uc.telefono_calc::VARCHAR AS telefono,
        uc.rol_nombre_calc::VARCHAR AS rol_nombre,
        uc.id_rol_calc AS id_rol,
        uc.tipo_usuario_calc::VARCHAR AS tipo_usuario
    FROM usuarios_completos uc
    ORDER BY
        -- Priorizamos que tengan nombre, luego teléfono, y finalmente por id.
        CASE WHEN uc.nombre_completo_calc IS NULL THEN 1 ELSE 0 END,
        CASE WHEN uc.telefono_calc IS NULL THEN 1 ELSE 0 END,
        uc.id_usuario;
END;
$$;
