/**
 * Inserción de registros en la tabla invitado
 * @param ci - Número de cédula de identidad del invitado
 * @param nacionalidad - Nacionalidad del invitado ('V' para venezolano, 'E' para extranjero)
 * @param primer_nombre - Primer nombre del invitado
 * @param primer_apellido - Primer apellido del invitado
 * @param fk_tipo_invitado - Referencia al tipo de invitado
 */
INSERT INTO invitado (ci, nacionalidad, primer_nombre, primer_apellido, fk_tipo_invitado) VALUES
(12345678, 'V', 'Juan', 'Pérez', 1),  -- VIP
(23456789, 'V', 'María', 'González', 2),  -- Prensa
(34567890, 'V', 'Carlos', 'Rodríguez', 3),  -- Influencer
(45678901, 'V', 'Ana', 'Martínez', 4),  -- Cliente
(56789012, 'E', 'Pedro', 'López', 5),  -- Proveedor
(67890123, 'V', 'Laura', 'Sánchez', 6),  -- Miembro del Club
(78901234, 'V', 'Roberto', 'Díaz', 7),  -- Invitado General
(89012345, 'V', 'Carmen', 'Fernández', 8),  -- Expositor
(90123456, 'E', 'Miguel', 'Torres', 9),  -- CEO
(10234567, 'V', 'Andrea', 'Ramírez', 10),  -- Jefe de Marketing
(11234567, 'E', 'Daniel', 'Castro', 11),  -- Representante de Marca
(12234567, 'V', 'Pablo', 'Morales', 12);  -- Maestro Cervecero