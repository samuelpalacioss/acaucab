DROP FUNCTION IF EXISTS fn_get_ticket_promedio();

CREATE OR REPLACE FUNCTION fn_get_ticket_promedio()
RETURNS DECIMAL
LANGUAGE plpgsql
AS $$
DECLARE
    ticket_promedio_total DECIMAL;
BEGIN
    -- Calcular el valor promedio de todas las ventas completadas
    SELECT COALESCE(AVG(v.monto_total), 0)
    INTO ticket_promedio_total
    FROM venta v
    WHERE v.id IN (
        SELECT sv.fk_venta
        FROM status_venta sv
        JOIN status s ON sv.fk_status = s.id
        JOIN venta v_check ON sv.fk_venta = v_check.id
        WHERE sv.fk_venta IS NOT NULL
          AND (
                (v_check.fk_tienda_web IS NOT NULL AND s.nombre = 'Despachando')
                OR
                (v_check.fk_tienda_fisica IS NOT NULL AND s.nombre = 'Completado')
          )
    );

    RETURN ticket_promedio_total;
END;
$$; 