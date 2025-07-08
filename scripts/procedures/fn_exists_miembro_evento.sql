CREATE OR REPLACE FUNCTION fn_exists_miembro_evento(p_id_miembro_1 int,
        p_id_miembro_2 bpchar)
RETURNS table(
  id_evento int
)
LANGUAGE plpgsql
AS $$

BEGIN
    return query
    select distinct sm.fk_evento as id_evento from stock_miembro sm where sm.fk_miembro_1 =p_id_miembro_1 and sm.fk_miembro_2 =p_id_miembro_2;
END;
$$;