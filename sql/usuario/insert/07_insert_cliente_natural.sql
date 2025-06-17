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