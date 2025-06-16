/**
 * Inserción de registros en la tabla stock_miembro
 * @param cantidad - Cantidad de cervezas en stock
 * @param fk_miembro_1 - Referencia al RIF del miembro
 * @param fk_miembro_2 - Referencia a la naturaleza del RIF del miembro
 * @param fk_evento - Referencia al evento
 * @param fk_presentación_cerveza_1 - Referencia a la cerveza (SKU de presentación)
 * @param fk_presentación_cerveza_2 - Referencia a la presentación (ID de cerveza)
 */

INSERT INTO stock_miembro (
    cantidad,
    fk_miembro_1,
    fk_miembro_2,
    fk_evento,
    fk_presentacion_cerveza_1,
    fk_presentacion_cerveza_2
) VALUES
    (100, 123456789, 'J', 1, 'B330', 1),  -- 100 unidades de botella 330ml Destilo
    (50, 987654321, 'V', 1, 'B500', 2),   -- 50 unidades de botella 500ml Dos Leones
    (75, 234567890, 'J', 2, 'L330', 3),   -- 75 unidades de lata 330ml Benitz Pale Ale
    (200, 345678901, 'V', 3, 'SP330', 4), -- 200 six-packs 330ml Candileja de Abadía
    (150, 456789012, 'J', 4, 'C24330', 5), -- 150 cajas 24 unidades 330ml Ángel o Demonio
    (80, 567890123, 'V', 5, 'B20', 6),    -- 80 barriles 20L Barricas Saison Belga
    (120, 678901234, 'J', 6, 'B30', 7),   -- 120 barriles 30L Aldarra Mantuana
    (90, 789012345, 'V', 7, 'B50', 8),    -- 90 barriles 50L Tröegs HopBack Amber
    (180, 890123456, 'J', 8, 'G1L', 9),   -- 180 growlers 1L Full Sail Amber
    (100, 901234567, 'V', 9, 'C12500', 10), -- 100 cajas 12 unidades 500ml Deschutes Cinder Cone
    (160, 123456780, 'V', 10, 'B330', 1); -- 160 botellas 330ml Rogue American Amber