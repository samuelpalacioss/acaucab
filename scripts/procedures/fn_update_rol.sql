DROP FUNCTION IF EXISTS fn_update_rol(INT, VARCHAR, INT[]);

CREATE OR REPLACE FUNCTION fn_update_rol(
    p_rol_id INT,
    p_nuevo_nombre VARCHAR,
    p_permisos_ids INT[]
)
RETURNS BOOLEAN AS $$
DECLARE
    rol_existe INT;
    permiso_id INT;
BEGIN
    -- Verificar si el rol existe
    SELECT COUNT(*) INTO rol_existe FROM rol WHERE id = p_rol_id;
    IF rol_existe = 0 THEN
        RAISE EXCEPTION 'El rol con ID % no existe.', p_rol_id;
    END IF;

    -- 1. Actualizar el nombre del rol
    UPDATE rol
    SET nombre = p_nuevo_nombre
    WHERE id = p_rol_id;

    -- 2. Eliminar todos los permisos existentes para este rol
    DELETE FROM permiso_rol
    WHERE fk_rol = p_rol_id;

    -- 3. Insertar la nueva lista de permisos usando un bucle
    -- Este enfoque es más explícito y fácil de leer que usar unnest.
    IF p_permisos_ids IS NOT NULL THEN
        FOREACH permiso_id IN ARRAY p_permisos_ids
        LOOP
            INSERT INTO permiso_rol (fk_rol, fk_permiso)
            VALUES (p_rol_id, permiso_id);
        END LOOP;
    END IF;

    -- Devolver true para indicar que la operación fue exitosa
    RETURN TRUE;
EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'El nuevo nombre de rol ''%'' ya está en uso.', p_nuevo_nombre;
    WHEN foreign_key_violation THEN
        RAISE EXCEPTION 'Uno o más IDs de permisos proporcionados no son válidos.';
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error inesperado al actualizar el rol: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
