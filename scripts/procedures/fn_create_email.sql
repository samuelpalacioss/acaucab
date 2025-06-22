CREATE OR REPLACE FUNCTION fn_create_email(
    p_direccion_correo VARCHAR,
    p_miembro_rif INT DEFAULT NULL,
    p_miembro_naturaleza CHAR(1) DEFAULT NULL,
    p_persona_contacto_id INT DEFAULT NULL
)
RETURNS INT AS $$
DECLARE
    v_correo_id INT;
BEGIN
    /**
     * Inserta una nueva dirección de correo electrónico en la tabla 'correo'.
     *
     * Esta función puede opcionalmente asociar el correo a un 'miembro' o
     * a una 'persona_contacto'. Si no se proporcionan los IDs de estas
     * entidades, el correo se crea sin asociación directa, lo cual es útil
     * para crear usuarios para entidades como 'cliente_natural'.
     *
     * @param p_direccion_correo La dirección de correo electrónico a insertar.
     * @param p_miembro_rif El RIF del miembro (opcional).
     * @param p_miembro_naturaleza La naturaleza del RIF del miembro (opcional).
     * @param p_persona_contacto_id El ID de la persona de contacto (opcional).
     * @return El ID del nuevo registro de correo.
     */

    -- Validar que no se intenten insertar múltiples asociaciones a la vez
    IF (p_miembro_rif IS NOT NULL AND p_persona_contacto_id IS NOT NULL) THEN
        RAISE EXCEPTION 'Un correo solo puede ser asociado a una entidad (miembro o persona de contacto), no a ambas.';
    END IF;

    -- Validar que si se provee un RIF, también se provea la naturaleza
    IF (p_miembro_rif IS NOT NULL AND p_miembro_naturaleza IS NULL) OR (p_miembro_rif IS NULL AND p_miembro_naturaleza IS NOT NULL) THEN
        RAISE EXCEPTION 'Para asociar un correo a un miembro, debe proporcionar tanto el RIF como la naturaleza.';
    END IF;

    -- Insertar el nuevo correo electrónico en la tabla 'correo'
    INSERT INTO correo (
        dirección_correo, 
        fk_miembro_1, 
        fk_miembro_2, 
        fk_persona_contacto
    )
    VALUES (
        p_direccion_correo, 
        p_miembro_rif, 
        p_miembro_naturaleza, 
        p_persona_contacto_id
    )
    RETURNING id INTO v_correo_id;

    -- Devolver el ID del correo recién creado
    RETURN v_correo_id;

EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'El correo electrónico "%" ya existe en el sistema.', p_direccion_correo;
    WHEN others THEN
        RAISE EXCEPTION 'Ocurrió un error inesperado al intentar crear el correo: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
