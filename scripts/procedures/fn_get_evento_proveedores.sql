CREATE OR REPLACE FUNCTION fn_get_evento_proveedores(p_evento_id int)
RETURNS TABLE (
  id1 int,
  id2 bpchar,
  nombre varchar,
  correo varchar,
  productos jsonb[]
)
LANGUAGE plpgsql
AS $$

BEGIN
    RETURN QUERY
  select distinct m.rif id1,m.naturaleza_rif id2, m.razón_social nombre, (select c.dirección_correo from correo c where c.fk_miembro_1=m.rif and c.fk_miembro_2=m.naturaleza_rif order by c.id limit 1) correo, p.productos productos
  from miembro m, (select 
                   ARRAY_AGG(
                      jsonb_build_object(
                        'id1', sm.fk_presentacion_cerveza_1,
                        'id2', sm.fk_presentacion_cerveza_2,
                        'sku',pc.sku,
                        'nombre', p.nombre||' '||c.nombre,
                        'precio', pc.precio,
                        'cantidad', sm.cantidad
                      )
                    ) productos,
                    sm.fk_miembro_1 fk_miembro_1,
                    sm.fk_miembro_2 fk_miembro_2,
                    sm.fk_evento fk_evento
                    from stock_miembro sm, presentacion_cerveza pc, presentacion p, cerveza c
                    where pc.fk_presentacion =sm.fk_presentacion_cerveza_1 and pc.fk_cerveza =sm.fk_presentacion_cerveza_2 and pc.fk_cerveza= c.id and
                          pc.fk_presentacion=p.id
                    GROUP BY sm.fk_miembro_1, sm.fk_miembro_2, sm.fk_evento
                    ) p
  where p_evento_id=p.fk_evento and m.rif=p.fk_miembro_1 and m.naturaleza_rif=p.fk_miembro_2;
END;
$$;