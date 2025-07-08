CREATE OR REPLACE FUNCTION fn_create_evento(
    p_nombre varchar,
    p_descripcion varchar,
    p_nombre_tipo_evento varchar,
    p_direccion varchar,
    p_id_parroquia int,
    p_fecha_hora_inicio timestamp,
    p_fecha_hora_fin timestamp,
    p_precio numeric
)
RETURNS INT AS $$
DECLARE
    v_evento_id INT;
    v_tipo_evento_id int;
BEGIN
    select te.id into v_tipo_evento_id 
    from tipo_evento te
    where te.nombre=p_nombre_tipo_evento
    limit 1;
    
    INSERT INTO evento (nombre, descripción, dirección, fecha_hora_inicio, fecha_hora_fin, precio_entrada, fk_tipo_evento, fk_lugar) VALUES
    (p_nombre,p_descripcion,p_direccion,p_fecha_hora_inicio,p_fecha_hora_fin,p_precio,v_tipo_evento_id,p_id_parroquia)
    returning id into v_evento_id;
    
    RETURN v_evento_id;

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE EXCEPTION 'El tipo de evento especificado o el lugar no existe.';
    WHEN OTHERS THEN
        -- En caso de cualquier error, se levanta una excepción para asegurar que la transacción se revierta.
        RAISE EXCEPTION 'Error al crear el evento: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;