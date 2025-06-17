/**
 * Inserción de registros en la tabla empleado
 * @param ci - Número de cédula de identidad (INTEGER)
 * @param nacionalidad - Nacionalidad del empleado ('V' o 'E')
 * @param primer_nombre - Primer nombre del empleado
 * @param primer_apellido - Primer apellido del empleado
 * @param segundo_nombre - Segundo nombre del empleado (opcional)
 * @param segundo_apellido - Segundo apellido del empleado (opcional)
 * @param fecha_nacimiento - Fecha de nacimiento del empleado
 */
INSERT INTO empleado (ci, nacionalidad, primer_nombre, primer_apellido, segundo_nombre, segundo_apellido, fecha_nacimiento) VALUES
(12547896, 'V', 'Juan', 'Pérez', 'Carlos', 'González', '1985-05-15'),
(17895032, 'V', 'María', 'Rodríguez', 'Isabel', 'Martínez', '1990-08-22'),
(14326578, 'V', 'Pedro', 'García', 'José', 'López', '1988-03-10'),
(85001234, 'E', 'Ana', 'Martínez', 'Luisa', 'Sánchez', '1992-11-30'),
(19234567, 'V', 'Carlos', 'López', 'Antonio', 'Ramírez', '1987-07-18'),
(23567489, 'V', 'Laura', 'Sánchez', 'Carmen', 'Torres', '1991-04-25'),
(85009876, 'E', 'Roberto', 'Torres', 'Miguel', 'Díaz', '1989-09-12'),
(24678901, 'V', 'Sofía', 'Díaz', 'Patricia', 'Morales', '1993-01-20'),
(26875432, 'V', 'Miguel', 'Morales', 'Francisco', 'Ortiz', '1986-12-05'),
(27543689, 'V', 'Carmen', 'Ortiz', 'Rosa', 'Silva', '1994-06-28');
