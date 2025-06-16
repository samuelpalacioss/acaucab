/**
 * Inserción de datos para las tiendas web
 */
INSERT INTO tienda_web (dominio_web) VALUES
('www.cervezasartesanales.com'),
('www.micerveceria.com'),
('www.cervezaspremium.com'),
('www.cervezasdelmundo.com'),
('www.brewmaster.com'),
('www.cervezasgourmet.com'),
('www.craftbeer.com'),
('www.cervezasimportadas.com'),
('www.beershop.com'),
('www.cervezasexclusivas.com');

/**
 * Inserción de datos para las tiendas físicas
 */
INSERT INTO tienda_fisica (direccion, fk_lugar) VALUES
('Av. 19 de Abril, sector Casco Histórico, Ciudad Angostura', 90),
('Av. Guayana, Urb. Alta Vista, Puerto Ordaz', 91),
('Calle Bolívar, sector Centro, Caicara del Orinoco', 92),
('Av. Gumilla, barrio La Chalana, El Callao', 93),
('Calle Auyantepui, sector Santa Elena, Santa Elena de Uairén', 94),
('Paseo Orinoco, parroquia Catedral, Ciudad Bolívar', 95),
('Av. Independencia, sector Centro, Ciudad Guayana', 96),
('Calle Belgrano, sector Centro, Ciudad Guayana', 97),
('Plaza Mayor, sector Centro, Ciudad Guayana', 98),
('Av. Colombia, sector El Dorado, El Dorado', 99);

/**
 * Inserción de datos para los almacenes
 * Nota: Cada almacén está asociado a una tienda física o web, no a ambas
 */
INSERT INTO almacen (direccion, fk_tienda_fisica, fk_tienda_web, fk_lugar) VALUES
('Sector Vista al Orinoco, calle 3, Ciudad Angostura', 1, NULL, 11),
('Urb. Los Olivos, calle El Samán, Puerto Ordaz', 2, NULL, 12),
('Barrio El Carmen, avenida Orinoco, Caicara del Orinoco', NULL, 1, 13),
('Urbanización Nacupay, calle La Mina, El Callao', NULL, 2, 14),
('Sector El Paraíso, avenida Principal, Santa Elena de Uairén', NULL, 3, 15),
('Urb. Andrés Bello, calle Guzmán Blanco, Ciudad Bolívar', 3, NULL, 16),
('Sector Villa Chien, avenida Principal, El Palmar', 4, NULL, 17),
('Urb. Bicentenario, calle 5 de Julio, Upata', NULL, 4, 18),
('Barrio Las Brisas, avenida Libertador, Guasipati', NULL, 5, 19),
('Sector El Triunfo, calle Bolívar, El Dorado', 5, NULL, 20);

/**
 * Inserción de datos para los lugares de tienda
 * @param nombre - Nombre del lugar en la tienda
 * @param tipo - Tipo de lugar (pasillo, zona_pasillo, anaquel)
 * @param fk_tienda_fisica - ID de la tienda física a la que pertenece
 * @param fk_lugar_tienda_1 - ID del lugar padre 1 (para jerarquía)
 * @param fk_lugar_tienda_2 - ID del lugar padre 2 (para jerarquía)
 */
INSERT INTO lugar_tienda (nombre, tipo, fk_tienda_fisica, fk_lugar_tienda_1, fk_lugar_tienda_2) VALUES
-- Tienda 1
('Pasillo Principal', 'pasillo', 1, NULL, NULL),
('Zona Refrigerada', 'zona_pasillo', 1, 1, 1),
('Anaquel Cervezas Importadas', 'anaquel', 1, 2, 1),

-- Tienda 2  
('Pasillo Cervezas Nacionales', 'pasillo', 2, NULL, NULL),
('Zona Barriles', 'zona_pasillo', 2, 4, 2), 
('Anaquel Cervezas Artesanales', 'anaquel', 2, 5, 2),

-- Tienda 3
('Pasillo Promociones', 'pasillo', 3, NULL, NULL),
('Zona Six Packs', 'zona_pasillo', 3, 7, 3),
('Anaquel Cervezas Premium', 'anaquel', 3, 8, 3),

-- Tienda 4
('Pasillo Central', 'pasillo', 4, NULL, NULL);

/**
 * Inserción de datos para el inventario
 * Nota: Los valores de fk_presentacion_cerveza_1 y fk_presentacion_cerveza_2 corresponden a los SKUs de presentacion_cerveza
 */
INSERT INTO inventario (cantidad_almacen, fk_presentacion_cerveza_1, fk_presentacion_cerveza_2, fk_almacen) VALUES
(500, 'B330', 1, 1),
(400, 'B500', 2, 1),
(600, 'L330', 3, 2),
(300, 'SP330', 4, 2),
(200, 'C24330', 5, 3),
(100, 'B20', 6, 3),
(50, 'B30', 7, 4),
(30, 'B50', 8, 4),
(150, 'G1L', 9, 5),
(250, 'C12500', 10, 5),
/** Agregando inventario para las cervezas restantes (11-18) **/
(350, 'B330', 11, 6),     /** Rogue American Amber - Botella 330ml **/
(280, 'B500', 12, 6),     /** La Chouffe - Botella 500ml **/
(450, 'L330', 13, 7),     /** Orval - Lata 330ml **/
(180, 'SP330', 14, 7),    /** Chimay - Six-pack 330ml **/
(120, 'C24330', 15, 8),   /** Leffe Blonde - Caja 24 unidades 330ml **/
(80, 'B20', 16, 8),       /** Hoegaarden - Barril 20L **/
(40, 'B30', 17, 9),       /** Pilsner Urquell - Barril 30L **/
(25, 'B50', 18, 9);       /** Samuel Adams - Barril 50L **/

/**
 * Inserción de datos para el inventario de lugares de tienda
 */
INSERT INTO lugar_tienda_inventario (cantidad, fk_lugar_tienda_1, fk_lugar_tienda_2, fk_inventario_1, fk_inventario_2, fk_inventario_3) VALUES
(20, 1, 1, 'B330', 1, 1),
(15, 2, 1, 'B500', 2, 1),
(30, 3, 1, 'L330', 3, 2),
(5, 4, 2, 'SP330', 4, 2),
(3, 5, 2, 'C24330', 5, 3),
(2, 6, 2, 'B20', 6, 3),
(1, 7, 3, 'B30', 7, 4),
(1, 8, 3, 'B50', 8, 4),
(5, 9, 3, 'G1L', 9, 5),
(8, 10, 4, 'C12500', 10, 5); 

/**
 * Inserción de órdenes de reposición
 */
INSERT INTO orden_de_reposicion (
    fecha_orden,
    observacion,
    unidades,
    fk_lugar_tienda_1,
    fk_lugar_tienda_2, 
    fk_inventario_1,
    fk_inventario_2,
    fk_inventario_3,
    fk_empleado
) VALUES
    ('2025-01-10', 'Reposición urgente', 50, 1, 1, 'B330', 1, 1, 1),      /** Reposición botellas 330ml en anaquel 1 */
    ('2025-01-11', 'Stock bajo', 30, 2, 1, 'B500', 2, 1, 2),              /** Reposición botellas 500ml en zona 2 */
    ('2025-01-12', 'Para promoción', 60, 3, 1, 'L330', 3, 2, 3),          /** Reposición latas 330ml en anaquel 3 */
    ('2025-01-13', 'Pedido regular', 20, 4, 2, 'SP330', 4, 2, 4),         /** Reposición six-packs en zona 4 */
    ('2025-01-14', 'Falta stock', 15, 5, 2, 'C24330', 5, 3, 5),           /** Reposición cajas en anaquel 5 */
    ('2025-01-15', 'Reposición mensual', 10, 6, 2, 'B20', 6, 3, 1),       /** Reposición barriles 20L en zona 6 */
    ('2025-01-16', 'Stock mínimo', 5, 7, 3, 'B30', 7, 4, 2),              /** Reposición barriles 30L en pasillo 7 */
    ('2025-01-17', 'Pedido especial', 3, 8, 3, 'B50', 8, 4, 3),           /** Reposición barriles 50L en zona 8 */
    ('2025-01-18', 'Reposición semanal', 25, 9, 3, 'G1L', 9, 5, 4),       /** Reposición growlers en anaquel 9 */
    ('2025-01-19', 'Stock temporada', 40, 10, 4, 'C12500', 10, 5, 5);     /** Reposición cajas en pasillo 10 */
