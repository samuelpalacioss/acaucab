DROP FUNCTION IF EXISTS fn_create_metodo_pago_efectivo(VARCHAR);

CREATE OR REPLACE FUNCTION fn_create_metodo_pago_efectivo(
  p_denominacion VARCHAR
)
RETURNS INTEGER AS $$ 
DECLARE 
  nuevo_metodo_id INTEGER;
  metodo_existente BOOLEAN;
BEGIN

  SELECT EXISTS (SELECT id FROM metodo_pago WHERE tipo = 'efectivo' AND denominación = p_denominacion LIMIT 1) INTO metodo_existente;

  IF EXISTS then
    RAISE EXCEPTION 'Metodo de pago efectivo ya existe con la denominacion %', p_denominacion;
  ELSE 
    INSERT INTO metodo_pago(tipo, denominacion)
    VALUES ('efectivo', p_denominacion) RETURNING id INTO nuevo_metodo_id;
  END IF;

  RETURN nuevo_metodo_id;

END
$$ language plpgsql