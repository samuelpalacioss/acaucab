CREATE OR REPLACE FUNCTION fn_create_invitado(
    p_nombre varchar,
    p_apellido varchar,
    p_ci int,
    p_nacionalidad varchar,
    p_nombre_tipo_invitado varchar

)
RETURNS INT AS $$
DECLARE
    v_invitado_id INT;
    v_tipo_invitado_id int;
BEGIN
    select ti.id into v_tipo_invitado_id 
    from tipo_invitado ti
    where ti.nombre=p_nombre_tipo_invitado
    limit 1;
    
    INSERT INTO invitado (ci,nacionalidad,primer_nombre,primer_apellido,fk_tipo_invitado) VALUES
    (p_ci,p_nacionalidad,p_nombre,p_apellido,v_tipo_invitado_id)
    returning id into v_invitado_id;
    
    RETURN v_invitado_id;

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE EXCEPTION 'El tipo de invitado especificado no existe.';
    WHEN OTHERS THEN
        -- En caso de cualquier error, se levanta una excepción para asegurar que la transacción se revierta.
        RAISE EXCEPTION 'Error al crear el invitadoo: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;