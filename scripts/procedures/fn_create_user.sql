CREATE OR REPLACE FUNCTION fn_create_user(
    p_person_id INT,
    p_person_type VARCHAR,
    p_person_naturaleza CHAR(1),
    p_rol_id INT,
    p_email VARCHAR,
    p_password VARCHAR
)
RETURNS INT AS $$
DECLARE
    v_correo_id INT;
    v_usuario_id INT;
    v_existing_email_id INT;
BEGIN
    /**
     * Crea un nuevo usuario en el sistema.
     *
     * Pasos:
     * 1. Verifica si existe un correo asociado a la persona, sino crea uno nuevo.
     * 2. Crea el registro del usuario en la tabla 'usuario'.
     * 3. Asocia el usuario a la entidad persona correspondiente (cliente, empleado o miembro).
     *
     * @param p_person_id El ID de la persona (ID para cliente/empleado, RIF para miembro).
     * @param p_person_type El tipo de persona: 'Cliente Natural', 'Cliente Jurídico', 'Empleado', 'Miembro'.
     * @param p_person_naturaleza La naturaleza del documento (e.g., 'V', 'J', 'E'). Requerido para 'Miembro'.
     * @param p_rol_id El ID del rol a asignar.
     * @param p_email La dirección de correo electrónico para el nuevo usuario.
     * @param p_password La contraseña para el nuevo usuario.
     * @return El ID del nuevo usuario creado.
     */

    -- Paso 1: Buscar si ya existe un correo con esa dirección
    -- Primero verificar si existe el correo en la tabla
    SELECT id INTO v_existing_email_id
    FROM correo
    WHERE dirección_correo = p_email
    LIMIT 1;

    IF v_existing_email_id IS NOT NULL THEN
        -- Si el correo ya existe, verificar que no esté asociado a otro usuario
        IF EXISTS (SELECT 1 FROM usuario WHERE fk_correo = v_existing_email_id) THEN
            RAISE EXCEPTION 'El correo % ya está asociado a otro usuario', p_email;
        END IF;
        
        -- Verificar que el correo pertenezca a la persona correcta si es miembro o persona_contacto
        IF p_person_type = 'Miembro' THEN
            IF NOT EXISTS (
                SELECT 1 FROM correo 
                WHERE id = v_existing_email_id 
                AND fk_miembro_1 = p_person_id 
                AND fk_miembro_2 = p_person_naturaleza
            ) THEN
                RAISE EXCEPTION 'El correo % no pertenece al miembro especificado', p_email;
            END IF;
        ELSIF EXISTS (
            SELECT 1 FROM correo 
            WHERE id = v_existing_email_id 
            AND fk_persona_contacto IS NOT NULL
        ) THEN
            -- Si el correo está asociado a una persona_contacto, verificar la relación
            DECLARE
                v_pc_id INT;
            BEGIN
                SELECT fk_persona_contacto INTO v_pc_id
                FROM correo 
                WHERE id = v_existing_email_id;
                
                -- Verificar si la persona_contacto está relacionada con el cliente jurídico
                IF p_person_type = 'Cliente Jurídico' AND NOT EXISTS (
                    SELECT 1 FROM persona_contacto 
                    WHERE id = v_pc_id 
                    AND fk_cliente_juridico = p_person_id
                ) THEN
                    RAISE EXCEPTION 'El correo % no pertenece a una persona de contacto del cliente jurídico', p_email;
                END IF;
            END;
        END IF;
        
        v_correo_id := v_existing_email_id;
    ELSE
        -- Si no existe, crear un nuevo registro de correo
        -- Asociar el correo directamente si es un miembro
        IF p_person_type = 'Miembro' THEN
            v_correo_id := fn_create_email(p_email, p_person_id, p_person_naturaleza, NULL);
        ELSE
            -- Para otros tipos, crear sin asociación directa
            v_correo_id := fn_create_email(p_email, NULL, NULL, NULL);
        END IF;
    END IF;

    -- Paso 2: Crear el registro del usuario.
    INSERT INTO usuario (contraseña, fk_rol, fk_correo)
    VALUES (p_password, p_rol_id, v_correo_id)
    RETURNING id INTO v_usuario_id;

    -- Paso 3: Asociar el usuario a la entidad persona correspondiente.
    IF p_person_type = 'Cliente Natural' THEN
        INSERT INTO cliente_usuario (fk_cliente_natural, fk_usuario)
        VALUES (p_person_id, v_usuario_id);

    ELSIF p_person_type = 'Cliente Jurídico' THEN
        INSERT INTO cliente_usuario (fk_cliente_juridico, fk_usuario)
        VALUES (p_person_id, v_usuario_id);

    ELSIF p_person_type = 'Empleado' THEN
        INSERT INTO empleado_usuario (fk_empleado, fk_usuario)
        VALUES (p_person_id, v_usuario_id);
        
    ELSIF p_person_type = 'Miembro' THEN
        INSERT INTO miembro_usuario (fk_usuario, fk_miembro_1, fk_miembro_2)
        VALUES (v_usuario_id, p_person_id, p_person_naturaleza);

    ELSE
        RAISE EXCEPTION 'Tipo de persona inválido: %', p_person_type;
    END IF;

    -- Devolver el ID del usuario creado.
    RETURN v_usuario_id;

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE EXCEPTION 'El rol especificado o la persona no existe.';
    WHEN OTHERS THEN
        -- En caso de cualquier error, se levanta una excepción para asegurar que la transacción se revierta.
        RAISE EXCEPTION 'Error al crear el usuario: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
