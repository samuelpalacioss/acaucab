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