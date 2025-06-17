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