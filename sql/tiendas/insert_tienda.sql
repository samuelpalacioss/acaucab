/**
 * Inserción de datos para las tiendas web
 */
INSERT INTO tienda_web (dominio_web) VALUES
('www.acaucab.com');

/**
 * Inserción de datos para las tiendas físicas
 */
INSERT INTO tienda_fisica (direccion, fk_lugar) VALUES
('Av. Principal de La Castellana, Frente a la Plaza La Castellana, Caracas', 207);
/**
 * Inserción de datos para los almacenes
 * Nota: Cada almacén está asociado a una tienda física o web, no a ambas
 */
INSERT INTO almacen (direccion, fk_tienda_fisica, fk_tienda_web, fk_lugar) VALUES
('Av. Eugenio Mendoza, Edifcio Altamar, La Castellana,Caracas', 1, NULL, 10),
('Urb. Los Olivos, calle El Samán, Puerto Ordaz', NULL, 1, 1),
('Barrio El Carmen, avenida Orinoco, Caicara del Orinoco', NULL, 1, 13), 
('Urbanización Nacupay, calle La Mina, El Callao', NULL, 1, 14),
('Sector El Paraíso, avenida Principal, Santa Elena de Uairén', NULL, 1, 15),
('Urb. Andrés Bello, calle Guzmán Blanco, Ciudad Bolívar', NULL, 1, 16),
('Sector Villa Chien, avenida Principal, El Palmar', NULL, 1, 17),
('Urb. Bicentenario, calle 5 de Julio, Upata', NULL, 1, 18),
('Barrio Las Brisas, avenida Libertador, Guasipati', NULL, 1, 19),
('Sector El Triunfo, calle Bolívar, El Dorado', NULL, 1, 20);

/**
 * Inserción de datos para los lugares de tienda
 * @param nombre - Nombre del lu/gar en la tienda
 * @param tipo - Tipo de lugar (pasillo, zona_pasillo, anaquel)
 * @param fk_tienda_fisica - ID de la tienda física a la que pertenece
 * @param fk_lugar_tienda_1 - ID del lugar padre 1 (para jerarquía)
 * @param fk_lugar_tienda_2 - ID del lugar padre 2 (para jerarquía)
 */
INSERT INTO lugar_tienda (nombre, tipo, fk_tienda_fisica, fk_lugar_tienda_1, fk_lugar_tienda_2) VALUES
-- Pasillo Principal y sus zonas
('Pasillo Principal', 'pasillo', 1, NULL, NULL),
('Zona Refrigerada', 'zona_pasillo', 1, 1, 1),
('Anaquel Cervezas Importadas', 'anaquel', 1, 2, 1),

-- Pasillo Cervezas Nacionales y sus zonas
('Pasillo Cervezas Nacionales', 'pasillo', 1, NULL, NULL), 
/**
 * Zona de barriles en la tienda 1, cuyo padre es el pasillo cervezas nacionales id 4 
  y dicho padre está en la tienda 1
 */
('Zona Barriles', 'zona_pasillo', 1, 4, 1),
('Anaquel Cervezas Artesanales', 'anaquel', 1, 5, 1),

-- Pasillo Promociones y sus zonas
('Pasillo Promociones', 'pasillo', 1, NULL, NULL),
('Zona Six Packs', 'zona_pasillo', 1, 7, 1),
('Anaquel Cervezas Premium', 'anaquel', 1, 8, 1),

-- Pasillo Salida
('Pasillo Salida', 'pasillo', 1, NULL, NULL);

/**
 * Inserción de datos para el inventario
 * Nota: Los valores de fk_presentacion_cerveza_1 y fk_presentacion_cerveza_2 corresponden a los SKUs de presentacion_cerveza
 */
INSERT INTO inventario (cantidad_almacen, fk_presentacion_cerveza_1, fk_presentacion_cerveza_2, fk_almacen) VALUES
(500, 1, 1, 1), -- Destilo - Botella 330ml
(400, 2, 2, 1), -- Dos Leones - Botella 500ml
(200, 5, 5, 1), -- Ángel o Demonio - Caja 24 unidades 330ml
(100, 6, 6, 1), -- Barricas Saison Belga - Barril 20L
(50, 7, 7, 1), -- Aldarra Mantuana - Barril 30L
(30, 8, 8, 1), -- Tröegs HopBack Amber - Barril 50L
(150, 9, 9, 1), -- Full Sail Amber - Growler 1L
(250, 10, 10, 1), -- Deschutes Cinder Cone - Caja 12 unidades 500ml
/** Agregando inventario para las cervezas restantes (11-18) **/
(350, 1, 11, 1),     /** Rogue American Amber - Botella 330ml **/
(280, 2, 12, 1),     /** La Chouffe - Botella 500ml **/
(450, 3, 13, 1),     /** Orval - Lata 330ml **/
(180, 4, 14, 1),    /** Chimay - Six-pack 330ml **/
(120, 5, 15, 1),   /** Leffe Blonde - Caja 24 unidades 330ml **/
(80, 6, 16, 1),       /** Hoegaarden - Barril 20L **/
(40, 7, 17, 1),       /** Pilsner Urquell - Barril 30L **/
(25, 8, 18, 1);       /** Samuel Adams - Barril 50L **/

/**
 * Inserción de datos para el inventario de lugares de tienda
 */
INSERT INTO lugar_tienda_inventario (cantidad, fk_lugar_tienda_1, fk_lugar_tienda_2, fk_inventario_1, fk_inventario_2, fk_inventario_3) VALUES
(20, 1, 1, 1, 1, 1),    /** Inventario en Pasillo Principal **/
(15, 2, 1, 2, 2, 1),    /** Inventario en Zona Refrigerada **/
(30, 3, 1, 3, 13, 1),    /** Inventario en Anaquel Cervezas Importadas **/
(25, 4, 1, 4, 14, 1),    /** Inventario en Pasillo Cervezas Nacionales **/
(10, 5, 1, 5, 5, 1),    /** Inventario en Zona Barriles **/
(15, 6, 1, 6, 6, 1),    /** Inventario en Anaquel Cervezas Artesanales **/
(20, 7, 1, 7, 7, 1),    /** Inventario en Pasillo Promociones **/
(30, 8, 1, 8, 8, 1),    /** Inventario en Zona Six Packs **/
(25, 9, 1, 9, 9, 1),    /** Inventario en Anaquel Cervezas Premium **/
(10, 10, 1, 10, 10, 1); /** Inventario en Pasillo Salida **/

/**
 * Inserción de órdenes de reposición
 */
INSERT INTO orden_de_reposicion (
    fecha_orden,
    observacion,
    unidades,
    fk_lugar_tienda_1,
    fk_lugar_tienda_2, 
    fk_inventario_1, -- fk_inventario_1 es el fk_presentacion_cerveza_1
    fk_inventario_2, -- fk_inventario_2 es el fk_presentacion_cerveza_2
    fk_inventario_3, -- fk_inventario_3 es el fk_almacen
    fk_empleado
) VALUES
('2025-05-10', 'Reposicion urgente', 50, 3, 1, 3, 13, 1, 1),      /** Reposicion para Anaquel Cervezas Importadas en Tienda 1 */
('2025-05-11', 'Stock bajo', 30, 6, 1, 6, 6, 1, 2),      /** Reposicion para Anaquel Cervezas Artesanales en Tienda 1 */
('2025-05-12', 'Para promocion', 60, 9, 1, 9, 9, 1, 3),      /** Reposicion para Anaquel Cervezas Premium en Tienda 1 */
('2025-05-13', 'Pedido regular', 20, 2, 1, 2, 2, 1, 4),      /** Reposicion para Zona Refrigerada en Tienda 1 */
('2025-05-14', 'Falta stock', 15, 5, 1, 5, 5, 1, 5),      /** Reposicion para Zona Barriles en Tienda 1 */
('2025-05-15', 'Reposicion mensual', 10, 8, 1, 8, 8, 1, 1),      /** Reposicion para Zona Six Packs en Tienda 1 */
('2025-05-16', 'Stock minimo', 5, 1, 1, 1, 1, 1, 2),      /** Reposicion para Pasillo Principal en Tienda 1 */
('2025-01-17', 'Pedido especial', 3, 4, 1, 4, 14, 1, 3),      /** Reposicion para Pasillo Cervezas Nacionales en Tienda 1 */
('2025-01-18', 'Reposicion semanal', 25, 7, 1, 7, 7, 1, 4),      /** Reposicion para Pasillo Promociones en Tienda 1 */
('2025-01-19', 'Stock temporada', 40, 10, 1, 10, 10, 1, 5);      /** Reposicion para Pasillo Salida en Tienda 1 */
