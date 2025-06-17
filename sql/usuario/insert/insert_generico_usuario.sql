/**
 * Inserts for rol table
 * Contains basic system roles
 */

INSERT INTO rol (nombre) VALUES
    ('Administrador'),
    ('Empleado'),
    ('Cliente'),
    ('Miembro'),
    ('Jefe de Compras'),
    ('Asistente de Compras'),
    ('Jefe de Pasillos'),
    ('Cajero'),
    ('Jefe de Logística'),
    ('Auxiliar de Logística'),
    ('Jefe de Marketing');

INSERT INTO permiso (nombre, descripción) VALUES
/* Gestion de usuarios */
    ('crear_usuario', 'Permite crear nuevos usuarios en el sistema'),
    ('editar_usuario', 'Permite modificar información de usuarios existentes'),
    ('eliminar_usuario', 'Permite eliminar usuarios del sistema'),
    ('ver_usuarios', 'Permite ver la lista de usuarios'),
    ('gestionar_roles', 'Permite gestionar roles y sus permisos'),
    ('gestionar_miembros', 'Permite gestionar miembros de la organización'),
    ('gestionar_clientes', 'Permite gestionar clientes del sistema'),
    /* Gestion de ventas */
    ('iniciar_venta', 'Permite iniciar una nueva venta física'),
    ('procesar_pago', 'Permite procesar el pago de una venta'),
    ('anular_venta', 'Permite anular una venta en proceso'),
    ('imprimir_factura', 'Permite imprimir la factura de una venta'),
    ('cerrar_caja', 'Permite realizar el cierre de caja diario'),
    ('ver_historial_ventas', 'Permite consultar el historial de ventas realizadas'),
    /* Gestion de compras (Jefe de Compras)*/
    ('aceptar_orden_compra', 'Permite aceptar una orden de compra'),
    ('rechazar_orden_compra', 'Permite rechazar una orden de compra'),
    ('ver_ordenes_compra', 'Permite ver las ordenes de compra'),
    ('gestionar_proveedores', 'Permite gestionar proveedores'),
    ('ver_historial_compras', 'Permite consultar el historial de compras realizadas'),
    ('ver_pedidos', 'Permite ver todos los pedidos'),
    /* Gestion de Pasillos (Jefe de Pasillos)*/
    ('aceptar_orden_reposición', 'Permite aceptar una orden de reposición');
    
-- Administrador gets all permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 1, id FROM permiso;

-- Empleado gets basic permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 2, id FROM permiso 
WHERE nombre IN ('ver_usuarios', 'gestionar_clientes');

-- Cliente gets minimal permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 3, id FROM permiso 
WHERE nombre IN ('ver_usuarios');

-- Miembro gets member-specific permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 4, id FROM permiso 
WHERE nombre IN ('ver_usuarios', 'gestionar_miembros');

-- Jefe de Compras gets purchase management permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 5, id FROM permiso 
WHERE nombre IN (
    'ver_usuarios',
    'aceptar_orden_compra',
    'rechazar_orden_compra',
    'ver_ordenes_compra',
    'gestionar_proveedores',
    'ver_historial_compras'
);

-- Asistente de Compras gets limited purchase permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 6, id FROM permiso 
WHERE nombre IN (
    'ver_usuarios',
    'ver_ordenes_compra',
    'ver_historial_compras'
);

-- Jefe de Pasillos gets aisle management permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 7, id FROM permiso 
WHERE nombre IN (
    'ver_usuarios',
    'aceptar_orden_reposición'
);

-- Cajero gets sales-related permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 8, id FROM permiso 
WHERE nombre IN (
    'ver_usuarios',
    'iniciar_venta',
    'procesar_pago',
    'anular_venta',
    'imprimir_factura',
    'cerrar_caja',
    'ver_historial_ventas'
);

-- Jefe de Logística gets logistics management permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 9, id FROM permiso 
WHERE nombre IN (
    'ver_usuarios',
    'ver_pedidos'
);

-- Auxiliar de Logística gets limited logistics permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 10, id FROM permiso 
WHERE nombre IN (
    'ver_usuarios',
    'ver_pedidos',
    'ver_ordenes_compra'
);

-- Jefe de Marketing gets marketing management permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 11, id FROM permiso 
WHERE nombre IN (
    'ver_usuarios',
    'gestionar_clientes'
); 

/**
 * Inserts for miembro table
 * Contains example members of the organization
 */

INSERT INTO miembro (
    rif, 
    naturaleza_rif, 
    razón_social, 
    denominación_comercial, 
    dirección_fiscal, 
    dirección_física, 
    dominio_web, 
    plazo_entrega, 
    fk_lugar_1, 
    fk_lugar_2
) VALUES
    (123456789, 'J', 'Empresa ABC C.A.', 'ABC Corp', 'Av. Principal #123', 'Av. Principal #123', 'abc.com', INTERVAL '24 hours', 361, 362),
    (987654321, 'V', 'Empresa XYZ S.A.', 'XYZ Inc', 'Calle Comercial #456', 'Calle Comercial #456', 'xyz.com', INTERVAL '2 days', 363, 364),
    (234567890, 'J', 'Distribuidora Comercial Delta C.A.', 'Delta Distrib', 'Av. Bolívar Norte #789', 'Av. Bolívar Norte #789', 'deltadistrib.com', INTERVAL '12 hours', 365, 366),
    (345678901, 'V', 'Importadora Omega S.A.', 'Omega Imports', 'Calle Los Mangos #234', 'Calle Los Mangos #234', 'omegaimports.com', INTERVAL '3 days', 367, 368),
    (456789012, 'J', 'Comercializadora Epsilon C.A.', 'Epsilon Trade', 'Av. Libertador #567', 'Av. Libertador #567', 'epsilontrade.com', INTERVAL '48 hours', 369, 370),
    (567890123, 'V', 'Almacenes Beta S.A.', 'Beta Stores', 'Calle Principal #890', 'Calle Principal #890', 'betastores.com', INTERVAL '1 day', 371, 372),
    (678901234, 'J', 'Distribuidora Gamma C.A.', 'Gamma Dist', 'Av. Universidad #345', 'Av. Universidad #345', 'gammadist.com', INTERVAL '36 hours', 373, 374),
    (789012345, 'V', 'Comercializadora Sigma S.A.', 'Sigma Com', 'Calle Bolívar #678', 'Calle Bolívar #678', 'sigmacom.com', INTERVAL '1 week', 375, 376),
    (890123456, 'J', 'Importadora Theta C.A.', 'Theta Imports', 'Av. Carabobo #901', 'Av. Carabobo #901', 'thetaimports.com', INTERVAL '18 hours', 377, 378),
    (901234567, 'V', 'Almacenes Lambda S.A.', 'Lambda Stores', 'Calle Miranda #234', 'Calle Miranda #234', 'lambdastores.com', INTERVAL '5 days', 379, 380),
    (12345678, 'J', 'Distribuidora Zeta C.A.', 'Zeta Dist', 'Av. Sucre #567', 'Av. Sucre #567', 'zetadist.com', INTERVAL '2 weeks', 381, 382),
    (123456780, 'V', 'Comercializadora Omega S.A.', 'Omega Com', 'Calle Principal #890', 'Calle Principal #890', 'omegacom.com', INTERVAL '72 hours', 383, 384),
    /** Nuevos registros agregados */
    (111222333, 'J', 'Corporación Alfa Industrial C.A.', 'Alfa Industrial', 'Av. 23 de Enero #100', 'Av. 23 de Enero #100', 'alfaindustrial.com', INTERVAL '6 hours', 385, 386),
    (444555666, 'V', 'Comercial Bravo S.A.', 'Bravo Comercial', 'Calle Altagracia #200', 'Calle Altagracia #200', 'bravocomercial.com', INTERVAL '4 days', 387, 388),
    (777888999, 'J', 'Distribuidora Charlie C.A.', 'Charlie Dist', 'Av. Antímano #300', 'Av. Antímano #300', 'charliedist.com', INTERVAL '30 hours', 389, 390),
    (111333555, 'V', 'Importadora Delta S.A.', 'Delta Imports', 'Calle Caricuao #400', 'Calle Caricuao #400', 'deltaimports.com', INTERVAL '10 days', 391, 392),
    (222444666, 'J', 'Almacenes Echo C.A.', 'Echo Stores', 'Av. Catedral #500', 'Av. Catedral #500', 'echostores.com', INTERVAL '8 hours', 393, 394),
    (333555777, 'V', 'Comercializadora Foxtrot S.A.', 'Foxtrot Trade', 'Calle Coche #600', 'Calle Coche #600', 'foxtrrottrade.com', INTERVAL '3 weeks', 395, 396),
    (444666888, 'J', 'Distribuidora Golf C.A.', 'Golf Dist', 'Av. El Junquito #700', 'Av. El Junquito #700', 'golfdist.com', INTERVAL '7 days', 397, 398),
    (555777999, 'V', 'Importadora Hotel S.A.', 'Hotel Imports', 'Calle El Paraíso #800', 'Calle El Paraíso #800', 'hotelimports.com', INTERVAL '15 hours', 399, 400),
    (666888000, 'J', 'Corporación India C.A.', 'India Corp', 'Av. El Recreo #900', 'Av. El Recreo #900', 'indiacorp.com', INTERVAL '6 days', 401, 402); 

/**
 * Inserts for correo table
 * Contains example email addresses for members and users
 */

INSERT INTO correo (
    dirección_correo,
    fk_miembro_1,
    fk_miembro_2
) VALUES
    -- Member company emails
    ('contacto@abc.com', 123456789, 'J'),
    ('contacto@xyz.com', 987654321, 'V'),
    ('distribucion@deltadistrib.com', 234567890, 'J'),
    ('importaciones@omegaimports.com', 345678901, 'V'),
    ('comercial@epsilontrade.com', 456789012, 'J'),
    ('ventas@betastores.com', 567890123, 'V'),
    ('distribucion@gammadist.com', 678901234, 'J'),
    ('ventas@sigmacom.com', 789012345, 'V'),
    ('importaciones@thetaimports.com', 890123456, 'J'),
    ('ventas@lambdastores.com', 901234567, 'V'),
    ('distribucion@zetadist.com', 012345678, 'J'),
    ('ventas@omegacom.com', 123456780, 'V'),
    ('omega-importaciones@omegacom.com', 123456780, 'V'),

    -- Additional emails for user (not members)
    ('admin@acaucab.com', NULL, NULL),
    ('empleados@acaucab.com', NULL, NULL),
    ('clientes@acaucab.com', NULL, NULL),
    ('miembros@acaucab.com', NULL, NULL),
    ('maria.rodriguez@acaucab.com', NULL, NULL),
    ('pedro.garcia@acaucab.com', NULL, NULL),
    ('ana.martinez@acaucab.com', NULL, NULL),
    ('carlos.lopez@acaucab.com', NULL, NULL),
    ('laura.sanchez@acaucab.com', NULL, NULL),
    ('roberto.torres@acaucab.com', NULL, NULL),
    ('sofia.diaz@acaucab.com', NULL, NULL),
    ('miguel.morales@acaucab.com', NULL, NULL),
    ('carmen.ortiz@acaucab.com', NULL, NULL);

/**
 * Inserts for usuario table
 * Contains example system users
 */

INSERT INTO usuario (
    contraseña,
    fk_rol,
    fk_correo
) VALUES
    -- System users
    ('admin123', 1, 1),  -- Admin user
    ('emp123', 2, 2),    -- Employee user
    ('cli123', 3, 3),    -- Client user
    ('mem123', 4, 4),    -- Member user
    
    -- Member company users (all with role 4 - Miembro)
    ('delta2024', 4, 5),     -- Delta Distrib
    ('omega2024', 4, 6),     -- Omega Imports
    ('epsilon2024', 4, 7),   -- Epsilon Trade
    ('beta2024', 4, 8),      -- Beta Stores
    ('gamma2024', 4, 9),     -- Gamma Dist
    ('sigma2024', 4, 10),    -- Sigma Com
    ('theta2024', 4, 11),    -- Theta Imports
    ('lambda2024', 4, 12),   -- Lambda Stores
    ('zeta2024', 4, 13),     -- Zeta Dist
    ('omegacom2024', 4, 14), -- Omega Com

    -- Employee users (all with role 2 - Empleado)
    ('maria2024', 2, 15),    -- María Rodríguez
    ('pedro2024', 2, 16),    -- Pedro García
    ('ana2024', 2, 17),      -- Ana Martínez
    ('carlos2024', 2, 18),   -- Carlos López
    ('laura2024', 2, 19),    -- Laura Sánchez
    ('roberto2024', 2, 20),  -- Roberto Torres
    ('sofia2024', 2, 21),    -- Sofía Díaz
    ('miguel2024', 2, 22),   -- Miguel Morales
    ('carmen2024', 2, 23);   -- Carmen Ortiz 

/**
 * Inserts for cliente_natural table
 * Contains example natural clients (persons)
 */

INSERT INTO cliente_natural (
    ci,
    nacionalidad,
    primer_nombre,
    primer_apellido,
    segundo_nombre,
    segundo_apellido,
    rif,
    naturaleza_rif,
    dirección,
    fk_lugar
) VALUES
    (12345678, 'V', 'Juan', 'Pérez', 'Carlos', 'González', 87654321, 'V', 'Av. Principal #789', 361),
    (87654321, 'E', 'María', 'Rodríguez', 'Ana', 'Martínez', 12345678, 'V', 'Calle Secundaria #321', 362),
    (23456789, 'V', 'José', 'García', 'Luis', 'Hernández', 98765432, 'V', 'Av. Bolívar #456', 363),
    (34567890, 'V', 'Ana', 'López', 'María', 'Sánchez', 23456789, 'V', 'Calle Miranda #789', 364),
    (45678901, 'E', 'Carlos', 'Martínez', 'José', 'Torres', 34567890, 'V', 'Av. Sucre #123', 365),
    (56789012, 'V', 'Valeria', 'González', 'Isabel', 'Ramírez', 45678901, 'V', 'Calle Principal #567', 366),
    (67890123, 'V', 'Pedro', 'Sánchez', 'Antonio', 'Díaz', 56789012, 'V', 'Av. Carabobo #890', 367),
    (78901234, 'E', 'Sophia', 'Torres', 'Isabella', 'Morales', 67890123, 'V', 'Calle Bolívar #234', 368),
    (89012345, 'V', 'Miguel', 'Ramírez', 'Francisco', 'Rojas', 78901234, 'V', 'Av. Universidad #567', 369),
    (90123456, 'V', 'Carmen', 'Díaz', 'Rosa', 'Vargas', 89012345, 'V', 'Calle Los Mangos #890', 370),
    (01234567, 'V', 'Francisco', 'Morales', 'Miguel', 'Castro', 90123456, 'V', 'Av. Libertador #123', 371),
    (12345670, 'E', 'Lorella', 'Stortti', 'Valentina', 'Rojas', 01234567, 'V', 'Calle Principal #456', 372),
    /** Nuevos registros agregados */
    (11223344, 'V', 'Roberto', 'Silva', 'Antonio', 'Mendoza', 11223344, 'V', 'Av. 23 de Enero #100', 373),
    (22334455, 'E', 'Isabella', 'Fernández', 'Sofía', 'Herrera', 22334455, 'V', 'Calle Altagracia #200', 374),
    (33445566, 'V', 'Diego', 'Méndez', 'Alejandro', 'Jiménez', 33445566, 'V', 'Av. Antímano #300', 375),
    (44556677, 'V', 'Camila', 'Ruiz', 'Andrea', 'Vásquez', 44556677, 'V', 'Calle Caricuao #400', 376),
    (55667788, 'E', 'Andrés', 'Guerrero', 'Manuel', 'Ramos', 55667788, 'V', 'Av. Catedral #500', 377),
    (66778899, 'V', 'Valentina', 'Ortega', 'Natalia', 'Aguilar', 66778899, 'V', 'Calle Coche #600', 378),
    (77889900, 'V', 'Sebastián', 'Navarro', 'Joaquín', 'Molina', 77889900, 'V', 'Av. El Junquito #700', 379),
    (88990011, 'E', 'Mariana', 'Campos', 'Alejandra', 'Rivera', 88990011, 'V', 'Calle El Paraíso #800', 380),
    (99001122, 'V', 'Daniel', 'Peña', 'Emilio', 'Cruz', 99001122, 'V', 'Av. El Recreo #900', 381); 

/**
 * Inserts for cliente_juridico table
 * Contains example legal clients (companies)
 */

INSERT INTO cliente_juridico (
    denominación_comercial,
    razón_social,
    capital_disponible,
    dirección_fiscal,
    dominio_web,
    rif,
    naturaleza_rif,
    dirección,
    fk_lugar_1,
    fk_lugar_2
) VALUES
    ('Tech Solutions', 'Tech Solutions C.A.', 1000000.00, 'Av. Tecnológica #123', 'techsolutions.com', 234567890, 'J', 'Av. Tecnológica #123', 382, 383),
    ('Global Services', 'Global Services S.A.', 2000000.00, 'Calle Global #456', 'globalservices.com', 345678901, 'J', 'Calle Global #456', 384, 385),
    ('Constructora Delta', 'Constructora Delta C.A.', 5000000.00, 'Av. Principal #789', 'constructoradelta.com', 456789012, 'J', 'Av. Principal #789', 386, 387),
    ('Distribuidora Omega', 'Distribuidora Omega S.A.', 3000000.00, 'Calle Comercial #234', 'distribuidoraomega.com', 567890123, 'J', 'Calle Comercial #234', 388, 389),
    ('Importadora Epsilon', 'Importadora Epsilon C.A.', 4000000.00, 'Av. Bolívar #567', 'importadoraepsilon.com', 678901234, 'J', 'Av. Bolívar #567', 390, 391),
    ('Almacenes Beta', 'Almacenes Beta S.A.', 2500000.00, 'Calle Miranda #890', 'almacenesbeta.com', 789012345, 'J', 'Calle Miranda #890', 392, 393),
    ('Comercializadora Gamma', 'Comercializadora Gamma C.A.', 3500000.00, 'Av. Sucre #123', 'comercializadoragamma.com', 890123456, 'J', 'Av. Sucre #123', 394, 395),
    ('Distribuidora Sigma', 'Distribuidora Sigma S.A.', 2800000.00, 'Calle Principal #456', 'distribuidorasigma.com', 901234567, 'J', 'Calle Principal #456', 396, 397),
    ('Importadora Theta', 'Importadora Theta C.A.', 4500000.00, 'Av. Carabobo #789', 'importadoratheta.com', 012345678, 'J', 'Av. Carabobo #789', 398, 399),
    ('Almacenes Lambda', 'Almacenes Lambda S.A.', 2200000.00, 'Calle Bolívar #012', 'almaceneslambda.com', 123456780, 'J', 'Calle Bolívar #012', 400, 401),
    ('Comercializadora Zeta', 'Comercializadora Zeta C.A.', 3200000.00, 'Av. Universidad #345', 'comercializadorazeta.com', 234567801, 'J', 'Av. Universidad #345', 402, 403),
    ('Distribuidora Omega Plus', 'Distribuidora Omega Plus S.A.', 3800000.00, 'Calle Los Mangos #678', 'omegaplus.com', 345678012, 'J', 'Calle Los Mangos #678', 404, 405),
    /** Nuevos registros agregados */
    ('Corporación Alpha', 'Corporación Alpha C.A.', 6000000.00, 'Av. Empresarial #100', 'corpralpha.com', 111222333, 'J', 'Av. Empresarial #100', 406, 407),
    ('Servicios Bravo', 'Servicios Bravo S.A.', 1800000.00, 'Calle Servicios #200', 'serviciosbravo.com', 222333444, 'J', 'Calle Servicios #200', 408, 409),
    ('Constructora Charlie', 'Constructora Charlie C.A.', 7500000.00, 'Av. Construcción #300', 'constructoracharlie.com', 333444555, 'J', 'Av. Construcción #300', 410, 411),
    ('Logística Delta', 'Logística Delta S.A.', 2700000.00, 'Calle Logística #400', 'logisticadelta.com', 444555666, 'J', 'Calle Logística #400', 412, 413),
    ('Importadora Echo', 'Importadora Echo C.A.', 4200000.00, 'Av. Importación #500', 'importadoraecho.com', 555666777, 'J', 'Av. Importación #500', 414, 415),
    ('Comercial Foxtrot', 'Comercial Foxtrot S.A.', 3100000.00, 'Calle Comercial #600', 'comercialfoxtrot.com', 666777888, 'J', 'Calle Comercial #600', 416, 417),
    ('Distribuidora Golf', 'Distribuidora Golf C.A.', 2900000.00, 'Av. Distribución #700', 'distribuidoragolf.com', 777888999, 'J', 'Av. Distribución #700', 418, 419),
    ('Exportadora Hotel', 'Exportadora Hotel S.A.', 5200000.00, 'Calle Exportación #800', 'exportadorahotel.com', 888999000, 'J', 'Calle Exportación #800', 420, 421),
    ('Corporación India', 'Corporación India C.A.', 6800000.00, 'Av. Corporativa #900', 'corpindia.com', 999000111, 'J', 'Av. Corporativa #900', 422, 423); 

/**
 * Inserts for cliente_usuario table
 * Links users with their respective clients
 */

INSERT INTO cliente_usuario (
    fk_cliente_juridico,
    fk_usuario,
    fk_cliente_natural
) VALUES
    -- Natural clients
    (NULL, 3, 1),     -- Links natural client 1 with user 3 (cli123)
    (NULL, 15, 2),    -- Links natural client 2 with user 15 (maria2024)
    (NULL, 16, 3),    -- Links natural client 3 with user 16 (pedro2024)
    (NULL, 17, 4),    -- Links natural client 4 with user 17 (ana2024)
    (NULL, 18, 5),    -- Links natural client 5 with user 18 (carlos2024)
    (NULL, 19, 6),    -- Links natural client 6 with user 19 (laura2024)
    
    -- Legal clients
    (1, 4, NULL),     -- Links legal client 1 with user 4 (mem123)
    (2, 5, NULL),     -- Links legal client 2 with user 5 (delta2024)
    (3, 6, NULL),     -- Links legal client 3 with user 6 (omega2024)
    (4, 7, NULL),     -- Links legal client 4 with user 7 (epsilon2024)
    (5, 8, NULL),     -- Links legal client 5 with user 8 (beta2024)
    (6, 9, NULL);     -- Links legal client 6 with user 9 (gamma2024)

/**
 * Inserts for telefono table
 * Contains example phone numbers for different entities
 * Note: Each phone must be associated with exactly one entity (member, employee, or client)
 */

INSERT INTO telefono (
    codigo_área,
    número,
    fk_miembro_1,
    fk_miembro_2,
    fk_empleado,
    fk_cliente_juridico,
    fk_cliente_natural
) VALUES
    (212, 5551234, 123456789, 'J', NULL, NULL, NULL),    -- Member phone
    (212, 5555678, NULL, NULL, NULL, 1, NULL),           -- Legal client phone
    (212, 5559012, NULL, NULL, NULL, NULL, 1),           -- Natural client phone
    (212, 5553456, NULL, NULL, 1, NULL, NULL),           -- Employee phone
    
    (412, 1234567, 234567890, 'J', NULL, NULL, NULL),    -- Delta Distrib
    (414, 2345678, 345678901, 'V', NULL, NULL, NULL),    -- Omega Imports
    (424, 3456789, 456789012, 'J', NULL, NULL, NULL),    -- Epsilon Trade
    
    (412, 4567890, NULL, NULL, NULL, 2, NULL),           -- Global Services
    (414, 5678901, NULL, NULL, NULL, 3, NULL),           -- Constructora Delta
    (424, 6789012, NULL, NULL, NULL, 4, NULL),           -- Distribuidora Omega
    
    
    (412, 7890123, NULL, NULL, NULL, NULL, 2),           -- Natural client 2
    (414, 8901234, NULL, NULL, NULL, NULL, 3),           -- Natural client 3
    (424, 9012345, NULL, NULL, NULL, NULL, 4),           -- Natural client 4
 
    (412, 0123456, NULL, NULL, 2, NULL, NULL),           -- Employee 2
    (414, 1234567, NULL, NULL, 3, NULL, NULL),           -- Employee 3
    (424, 2345678, NULL, NULL, 4, NULL, NULL),           -- Employee 4
    (412, 3456789, NULL, NULL, 5, NULL, NULL);           -- Employee 5 

/**
 * Inserts for persona_contacto table
 * Contains example contact persons for different entities
 */

INSERT INTO persona_contacto (
    ci,
    nacionalidad,
    primer_nombre,
    primer_apellido,
    segundo_nombre,
    segundo_apellido,
    fk_miembro_1,
    fk_miembro_2,
    fk_telefono,
    fk_correo,
    fk_cliente_juridico
) VALUES
    (11223344, 'V', 'Pedro', 'González', 'José', 'Martínez', 123456789, 'J', 1, 1, NULL),  -- Member contact
    (44332211, 'V', 'Ana', 'López', 'María', 'Sánchez', NULL, NULL, 2, 3, 1),              -- Legal client contact
    (22334455, 'V', 'Ricardo', 'Blanco', 'Alberto', 'Pérez', 234567890, 'J', 5, 5, NULL),  -- Delta Distrib contact
    (33445566, 'E', 'Sofía', 'Ramírez', 'Valentina', 'Mendoza', 345678901, 'V', 6, 6, NULL),     -- Omega Imports contact
    (44556677, 'V', 'Daniel', 'Suárez', 'Roberto', 'Núñez', 456789012, 'J', 7, 7, NULL),        -- Epsilon Trade contact
    (55667788, 'V', 'Gabriela', 'Fernández', 'Patricia', 'Silva', NULL, NULL, 8, 8, 2),             -- Global Services contact
    (66778899, 'E', 'Alejandro', 'Mendoza', 'Felipe', 'Rivas', NULL, NULL, 9, 9, 3),           -- Constructora Delta contact
    (77889900, 'V', 'Valeria', 'Paredes', 'Camila', 'Brito', NULL, NULL, 10, 10, 4),          -- Distribuidora Omega contact
    (88990011, 'V', 'Eduardo', 'Rivas', 'Manuel', 'Quintero', NULL, NULL, 11, 11, 5),       -- Legal client 5 contact
    (99001122, 'E', 'Carolina', 'Brito', 'Daniela', 'Paredes', NULL, NULL, 12, 12, 6),              -- Legal client 6 contact
    (00112233, 'V', 'Roberto', 'Quintero', 'Alberto', 'Blanco', NULL, NULL, 13, 13, 7),           -- Legal client 7 contact
    (11223300, 'V', 'Daniela', 'Silva', 'Gabriela', 'Fernández', NULL, NULL, 14, 14, 8);               -- Legal client 8 contact 

/**
 * Inserts for miembro_usuario table
 * Links members with their respective users
 */

INSERT INTO miembro_usuario (
    fk_usuario,
    fk_miembro_1,
    fk_miembro_2
) VALUES
    (4, 123456789, 'J'),     -- Links ABC Corp with user 4
    (5, 987654321, 'V'),     -- Links XYZ Inc with user 5
    (6, 234567890, 'J'),     -- Links Delta Distrib with user 6
    (7, 345678901, 'V'),     -- Links Omega Imports with user 7
    (8, 456789012, 'J'),     -- Links Epsilon Trade with user 8
    (9, 567890123, 'V'),     -- Links Beta Stores with user 9
    (10, 678901234, 'J'),    -- Links Gamma Dist with user 10
    (11, 789012345, 'V'),    -- Links Sigma Com with user 11
    (12, 890123456, 'J'),    -- Links Theta Imports with user 12
    (13, 901234567, 'V');    -- Links Lambda Stores with user 13


/**
 * Inserts for empleado_usuario table
 * Links employees with their respective users
 */

INSERT INTO empleado_usuario (
    fk_empleado,
    fk_usuario
) VALUES
    (1, 2),     -- Links employee 1 (Juan Pérez) with user 2 (employee user)
    (2, 15),    -- Links employee 2 (María Rodríguez) with user 15
    (3, 16),    -- Links employee 3 (Pedro García) with user 16
    (4, 17),    -- Links employee 4 (Ana Martínez) with user 17
    (5, 18),    -- Links employee 5 (Carlos López) with user 18
    (6, 19),    -- Links employee 6 (Laura Sánchez) with user 19
    (7, 20),    -- Links employee 7 (Roberto Torres) with user 20
    (8, 21),    -- Links employee 8 (Sofía Díaz) with user 21
    (9, 22),    -- Links employee 9 (Miguel Morales) with user 22
    (10, 23);   -- Links employee 10 (Carmen Ortiz) with user 23 