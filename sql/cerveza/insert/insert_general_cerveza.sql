INSERT INTO color (srm, cod_hexadecimal) VALUES
(2, '#F3F993'),   -- Pale lager, Witbier, Pilsener, Berliner Weisse
(3, '#F5F75C'),   -- Maibock, Blonde Ale
(4, '#F6F513'),   -- Weissbier
(6, '#EAE615'),   -- American Pale Ale, India Pale Ale
(8, '#E0D01B'),   -- Weissbier, Saison
(10, '#D5BC26'),  -- English Bitter, ESB
(13, '#CDAA37'),  -- Bière de Garde, Double IPA
(17, '#C1963C'),  -- Dark lager, Vienna lager, Märzen, Amber Ale
(20, '#BE8C3A'),  -- Brown Ale, Bock, Dunkel, Dunkelweizen
(24, '#BE823A'),  -- Irish Dry Stout, Doppelbock, Porter
(29, '#8B4513'),  -- Stout
(35, '#654321'),  -- Foreign Stout, Baltic Porter
(40, '#2F1B14');  -- Imperial Stout

INSERT INTO tipo_cerveza (id,nombre,fk_tipo_cerveza,fk_color_superior,fk_color_inferior) VALUES
(1,'Lager',NULL,8,2),
(2,'Ale',NULL,13,2),
(3,'Pilsner',1,3,2),
(4,'Spezial',1,4,2),
(5,'Dortmunster',1,NULL,3),
(6,'Schwarzbier',1,NULL,8),
(7,'Vienna',1,8,6),
(8,'Bock',1,10,4),
(9,'Bohemian Pilsener',1,NULL,3),
(10,'Munich Helles',1,4,2),
(11,'Oktoberfest-Marzen',1,NULL,8),
(12,'Pale Ale',2,6,3),
(13,'IPA',2,8,4),
(14,'Amber Ale',2,8,6),
(15,'Brown Ale',2,10,8),
(16,'Golden Ale',2,NULL,2),
(17,'Stout',2,13,10),
(18,'Porter',2,NULL,NULL),
(19,'Belgian Dubbel',2,10,8),
(20,'Belgian Golden Strong',2,NULL,2),
(21,'Belgian Specialty Ale',2,NULL,2),
(22,'Wheat Beer',2,NULL,4),
(23,'Blonde Ale',2,NULL,2),
(24,'Barley Wine',2,10,6),
(25,'American Pale Ale',12,6,3),
(26,'English Pale Ale',12,6,3),
(27,'American IPA',13,8,4),
(28,'Imperial IPA',13,NULL,NULL),
(29,'India Pale Ale',13,8,4),
(30,'American Amber Ale',14,8,6),
(31,'Irish Red Ale',14,8,6),
(32,'Red Ale',14,8,6),
(33,'Dry Stout',17,NULL,10),
(34,'Imperial Stout',17,NULL,13),
(35,'Sweet Stout',17,NULL,10),
(36,'Artisanal Amber',21,8,6),
(37,'Artisanal Blond',21,NULL,4),
(38,'Artisanal Brown',21,10,8),
(39,'Belgian Barleywine',21,NULL,10),
(40,'Belgian IPA',21,NULL,8),
(41,'Belgian Spiced Christmas Beer',21,NULL,4),
(42,'Belgian Stout',21,NULL,NULL),
(43,'Fruit Lambic',21,NULL,3),
(44,'Spice, Herb o Vegetable',21,NULL,4),
(45,'Flanders Red/Brown',21,NULL,NULL),
(46,'Weizen-Weissbier',22,NULL,3),
(47,'Witbier',22,NULL,2),
(48,'Düsseldorf Altbier',2,8,6),
(49,'Extra-Strong Bitter',12,NULL,NULL);


/** Inserción de cervezas específicas con tipos correctos según nueva numeración **/
INSERT INTO cerveza (nombre, fk_tipo_cerveza) VALUES
/** Cervezas artesanales venezolanas específicas **/
('Destilo', 30), -- American Amber Ale (ID 30)
('Dos Leones', 21), -- Belgian Specialty Ale (ID 21)
('Benitz Pale Ale', 25), -- American Pale Ale (ID 25)
('Candileja de Abadía', 19), -- Belgian Dubbel (ID 19)
('Ángel o Demonio', 20), -- Belgian Golden Strong (ID 20)
('Barricas Saison Belga', 21), -- Belgian Specialty Ale (ID 21)
('Aldarra Mantuana', 23), -- Blonde Ale (ID 23)

/** Cervezas americanas específicas **/
('Tröegs HopBack Amber', 30), -- American Amber Ale (ID 30)
('Full Sail Amber', 30), -- American Amber Ale (ID 30)
('Deschutes Cinder Cone', 30), -- American Amber Ale (ID 30)  
('Rogue American Amber', 30), -- American Amber Ale (ID 30)

/** Cervezas belgas específicas **/
('La Chouffe', 21), -- Belgian Specialty Ale (ID 21)
('Orval', 21), -- Belgian Specialty Ale (ID 21)
('Chimay', 19), -- Belgian Dubbel (ID 19)
('Leffe Blonde', 23), -- Blonde Ale (ID 23)
('Hoegaarden', 47), -- Witbier (ID 47)

/** Cervezas específicas por estilo **/
('Pilsner Urquell', 3), -- Pilsner (ID 3)
('Samuel Adams', 9); -- Bohemian Pilsener (ID 9)

/** Inserción de características de cerveza - tipos: numerica o textual */
INSERT INTO caracteristica (nombre, tipo) VALUES
('Amargor', 'numerica'),          /** Característica numérica: medida en IBU (International Bitterness Units) */
('Dulzor', 'textual'),            /** Característica textual: descripción cualitativa del dulzor */
('Alcohol', 'numerica'),          /** Característica numérica: porcentaje de alcohol por volumen (ABV) */
('Carbonatación', 'numerica'),    /** Característica numérica: medida en volúmenes de CO2 */
('Aroma Floral', 'textual'),      /** Característica textual: descripción del aroma floral */
('Aroma Frutal', 'textual'),      /** Característica textual: descripción del aroma frutal */
('Claridad', 'textual'),          /** Característica textual: descripción de la claridad visual */
('Cuerpo', 'textual'),            /** Característica textual: descripción del cuerpo de la cerveza */
('Espuma', 'textual'),            /** Característica textual: descripción de la espuma */
('Acidez', 'numerica');           /** Característica numérica: medida en escala de pH */

/** Inserción de ingredientes con estructura jerárquica recursiva **/
INSERT INTO ingrediente (nombre, descripcion, medida, fk_ingrediente) VALUES
/** Ingredientes base - sin padre **/
('Agua', 'Agua purificada', 'lt', NULL),                    /** ID 1: Ingrediente base **/
('Malta Pale Ale', 'Malta base clara', 'kg', NULL),         /** ID 2: Ingrediente base **/
('Malta Munich', 'Malta tostada', 'kg', NULL),              /** ID 3: Ingrediente base **/
('Lúpulo Cascade', 'Aroma cítrico', 'g', NULL),             /** ID 4: Ingrediente base **/
('Lúpulo Columbus', 'Aroma herbal', 'g', NULL),             /** ID 5: Ingrediente base **/
('Levadura Ale', 'Fermentación alta', 'g', NULL),           /** ID 6: Ingrediente base **/
('Levadura Lager', 'Fermentación baja', 'g', NULL),         /** ID 7: Ingrediente base **/
('Azúcar Candi', 'Azúcar caramelizada', 'kg', NULL),        /** ID 8: Ingrediente base **/
('Malta Trigo', 'Malta clara trigo', 'kg', NULL),           /** ID 9: Ingrediente base **/
('Levadura Belga', 'Aromática y especiada', 'g', NULL),     /** ID 10: Ingrediente base **/

/** Ingredientes recursivos - derivan de ingredientes base **/
('Mezcla Malta Base', 'Combinación de malta Pale Ale y Munich', 'kg', 2),  /** ID 11: Deriva de Malta Pale Ale (ID 2) **/
('Agua Munich', 'Agua tratada estilo Munich', 'lt', 1),                     /** ID 12: Deriva de Agua (ID 1) **/
('Lúpulo Cascade Pellet', 'Lúpulo Cascade procesado en pellets', 'g', 4),  /** ID 13: Deriva de Lúpulo Cascade (ID 4) **/
('Levadura Ale Belga', 'Levadura Ale modificada estilo belga', 'g', 6),    /** ID 14: Deriva de Levadura Ale (ID 6) **/
('Malta Munich Tostada', 'Malta Munich con tostado extra', 'kg', 3),       /** ID 15: Deriva de Malta Munich (ID 3) **/

/** Ingredientes de segundo nivel - derivan de ingredientes recursivos **/
('Mezcla Premium', 'Mezcla especial basada en Mezcla Malta Base', 'kg', 11), /** ID 16: Deriva de Mezcla Malta Base (ID 11) **/
('Lúpulo Cascade Especial', 'Versión especial del Cascade Pellet', 'g', 13); /** ID 17: Deriva de Lúpulo Cascade Pellet (ID 13) **/

INSERT INTO tipo_cerveza_ingrediente (cantidad, fk_ingrediente, fk_tipo_cerveza) VALUES
(20, 1, 1),
(5, 2, 20),
(3, 3, 16),
(15, 4, 21),
(10, 5, 20),
(2, 6, 22),
(3, 7, 3),
(1, 8, 16),
(4, 9, 19),
(2, 10, 16);

INSERT INTO periodo_descuento (fecha_inicio, fecha_fin) VALUES
('2025-01-01', '2025-01-10'),
('2025-02-01', '2025-02-10'),
('2025-03-01', '2025-03-10'),
('2025-04-01', '2025-04-10'),
('2025-05-01', '2025-05-10'),
('2025-06-01', '2025-06-10'),
('2025-07-01', '2025-07-10'),
('2025-08-01', '2025-08-10'),
('2025-09-01', '2025-09-10'),
('2025-10-01', '2025-10-10');

INSERT INTO presentacion (sku, nombre, descripcion, unidades) VALUES
('B330', 'Botella 330ml', 'Botella individual de 330ml', 1),
('B500', 'Botella 500ml', 'Botella individual de 500ml', 1),
('L330', 'Lata 330ml', 'Lata individual de 330ml', 1),
('SP330', 'Six-pack 330ml', 'Paquete de 6 botellas 330ml', 6),
('C24330', 'Caja 24 unidades 330ml', 'Caja completa con 24 unidades', 24),
('B20', 'Barril 20L', 'Barril metálico de 20 litros', 53),
('B30', 'Barril 30L', 'Barril metálico de 30 litros', 72),
('B50', 'Barril 50L', 'Barril metálico de 50 litros', 120),
('G1L', 'Growler 1L', 'Envase rellenable 1 litro', 3),
('C12500', 'Caja 12 unidades 500ml', 'Caja con 12 botellas de 500ml', 12);

/** Inserción de relaciones presentación-cerveza para todas las cervezas **/
INSERT INTO presentacion_cerveza (precio, fk_presentacion, fk_cerveza) VALUES
/** Distribución cíclica de las 10 presentaciones para las 18 cervezas **/
(1.00, 'B330', 1),      /** Destilo - Botella 330ml **/
(1.00, 'B500', 2),      /** Dos Leones - Botella 500ml **/
(1.00, 'L330', 3),      /** Benitz Pale Ale - Lata 330ml **/
(5.00, 'SP330', 4),     /** Candileja de Abadía - Six-pack 330ml **/
(20.00, 'C24330', 5),   /** Ángel o Demonio - Caja 24 unidades 330ml **/
(30.00, 'B20', 6),       /** Barricas Saison Belga - Barril 20L **/
(40.00, 'B30', 7),       /** Aldarra Mantuana - Barril 30L **/
(50.00, 'B50', 8),       /** Tröegs HopBack Amber - Barril 50L **/
(1.00, 'G1L', 9),       /** Full Sail Amber - Growler 1L **/
(10.00, 'C12500', 10),  /** Deschutes Cinder Cone - Caja 12 unidades 500ml **/
(1.00, 'B330', 11),     /** Rogue American Amber - Botella 330ml **/
(1.00, 'B500', 12),     /** La Chouffe - Botella 500ml **/
(1.00, 'L330', 13),     /** Orval - Lata 330ml **/
(5.00, 'SP330', 14),    /** Chimay - Six-pack 330ml **/
(20.00, 'C24330', 15),  /** Leffe Blonde - Caja 24 unidades 330ml **/
(30.00, 'B20', 16),      /** Hoegaarden - Barril 20L **/
(40.00, 'B30', 17),      /** Pilsner Urquell - Barril 30L **/
(50.00, 'B50', 18);      /** Samuel Adams - Barril 50L **/
 


/** Inserción de descuentos con referencias correctas a SKUs de presentacion **/
INSERT INTO descuento (monto, porcentaje, fk_descuento, fk_presentacion_cerveza_1, fk_presentacion_cerveza_2) VALUES
(1, 10, 1, 'B330', 1),     /** Descuento $1 (10%) en periodo 1, entre Botella 330ml y 500ml **/
(2, 15, 2, 'B500', 2),     /** Descuento $2 (15%) en periodo 2, entre Botella 500ml y Lata 330ml **/
(1, 5, 3, 'L330', 3),     /** Descuento $1 (5%) en periodo 3, entre Lata 330ml y Six-pack 330ml **/
(3, 20, 4, 'SP330', 4),  /** Descuento $3 (20%) en periodo 4, entre Six-pack y Caja 24 unidades **/
(5, 25, 5, 'C24330', 5),    /** Descuento $5 (25%) en periodo 5, entre Caja 24 unidades y Barril 20L **/
(7, 10, 6, 'B20', 6),       /** Descuento $7 (10%) en periodo 6, entre Barril 20L y 30L **/
(10, 15, 7, 'B30', 7),      /** Descuento $10 (15%) en periodo 7, entre Barril 30L y 50L **/
(12, 20, 8, 'B50', 8),      /** Descuento $12 (20%) en periodo 8, entre Barril 50L y Growler 1L **/
(2, 8, 9, 'G1L', 9),     /** Descuento $2 (8%) en periodo 9, entre Growler 1L y Caja 12 unidades **/
(4, 12, 10, 'C12500', 10);  /** Descuento $4 (12%) en periodo 10, entre Botella 330ml y Caja 12 unidades **/

/** Inserción de relaciones cerveza-característica con valores según tipo */
INSERT INTO cerveza_caracteristica (valor_rango_inferior, valor_rango_superior, descripcion, fk_caracteristica, fk_cerveza, fk_tipo_cerveza) VALUES
(20.00, 40.00, 'Moderado a alto', 1, NULL, 1),        /** Característica numérica: Amargor - valores de rango en IBU */
(NULL, NULL, 'Ligero', 2, NULL, 2),                   /** Característica textual: Dulzor - sin valores de rango */
(5.00, 7.50, 'Grado alcohólico promedio', 3, NULL, 3), /** Característica numérica: Alcohol - valores de rango en % ABV */
(2.50, 3.50, 'Alta carbonatación', 4, NULL, 4),       /** Característica numérica: Carbonatación - valores de rango en volúmenes CO2 */
(3.00, NULL, 'Suave aroma floral', 5, NULL, 5),       /** Característica textual: Aroma Floral - sin valores de rango */
(NULL, NULL, 'Frutas tropicales', 6, 4, NULL),        /** Característica textual: Aroma Frutal - sin valores de rango */
(NULL, NULL, 'Muy cristalina', 7, 6, NULL),           /** Característica textual: Claridad - sin valores de rango */
(NULL, NULL, 'Cuerpo completo', 8, 7, NULL),          /** Característica textual: Cuerpo - sin valores de rango */
(NULL, NULL, 'Espuma densa persistente', 9, 8, NULL), /** Característica textual: Espuma - sin valores de rango */
(0.50, 1.50, 'Ligeramente ácida', 10, 11, NULL);      /** Característica numérica: Acidez - valores de rango en escala pH */
