CREATE OR REPLACE FUNCTION fn_create_invitado_evento(
    p_id_invitado int,
    p_id_evento int,
    p_fecha_hora_entrada timestamp,
    p_fecha_hora_salida timestamp
)
RETURNS boolean AS $$
DECLARE
BEGIN
    
    INSERT INTO invitado_evento (fk_evento,fk_invitado,fecha_hora_entrada,fecha_hora_salida) VALUES
    (p_id_evento,p_id_invitado,p_fecha_hora_entrada,p_fecha_hora_salida);
    
    RETURN true;

EXCEPTION
    WHEN OTHERS THEN
        /** La DB maneja constraints y FK automáticamente */
        RAISE;
END;
$$ LANGUAGE plpgsql;
