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