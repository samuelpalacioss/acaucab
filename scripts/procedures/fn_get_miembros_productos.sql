CREATE OR REPLACE FUNCTION fn_get_miembro_productos(p_id_miembro_1 int,
        p_id_miembro_2 bpchar)
RETURNS TABLE (
  id1 int,
  id2 int,
  sku varchar,
  nombre text,
  precio numeric,
  id_miembro1 int4,
  id_miembro2 bpchar
)
LANGUAGE plpgsql
AS $$

BEGIN
    RETURN QUERY
    select mpc.fk_presentacion_cerveza_1 id1, mpc.fk_presentacion_cerveza_2 id2,pc.sku sku,p.nombre||' '||c.nombre nombre,pc.precio precio ,mpc.fk_miembro_1 id_miembro1,mpc.fk_miembro_2 id_miembro2
    from miembro_presentacion_cerveza mpc, presentacion_cerveza pc, presentacion p, cerveza c
    where pc.fk_presentacion =mpc.fk_presentacion_cerveza_1 and pc.fk_cerveza =mpc.fk_presentacion_cerveza_2 and pc.fk_cerveza= c.id and
    pc.fk_presentacion=p.id and mpc.fk_miembro_1 = p_id_miembro_1 and mpc.fk_miembro_2=p_id_miembro_2;
END;
$$;