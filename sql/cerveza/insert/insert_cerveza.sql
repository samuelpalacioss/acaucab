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