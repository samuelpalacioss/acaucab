INSERT INTO cargo (nombre, salario_base) VALUES
('Director General', 5000.00),
('Gerente de Operaciones', 4000.00),
('Gerente de Ventas', 4000.00),
('Gerente de Tecnología', 3800.00),
('Gerente de Logística', 3800.00),
('Coordinador de Almacén', 3000.00),
('Coordinador de Marketing', 3000.00),
('Analista Administrativo', 2000.00),
('Analista de Ventas', 2000.00),
('Asistente General', 1500.00);

INSERT INTO departamento (nombre) VALUES
('Dirección General'),
('Recursos Humanos'),
('Administración y Finanzas'),
('Tecnología y Sistemas'),
('Operaciones y Logística'),
('Compras y Reposición'),
('Ventas y Atención al Cliente'),
('Marketing y Promociones'),
('Mantenimiento y Servicios'),
('Calidad y Sostenibilidad');

INSERT INTO beneficio (nombre) VALUES
('Bono Alimentación'),
('Bono de Transporte'),
('Bono de Producción'),
('Utilidades'),
('Vacaciones y Bono Vacacional'),
('Prima por Hijo'),
('Prima por Antigüedad'),
('Seguro HCM'),
('Servicio de Comedor'),
('Guardería o Maternal');

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


INSERT INTO horario (dia, hora_entrada, hora_salida) VALUES
('lunes', '08:00:00', '17:00:00'),
('martes', '08:00:00', '17:00:00'),
('miércoles', '08:00:00', '17:00:00'),
('jueves', '08:00:00', '17:00:00'),
('viernes', '08:00:00', '17:00:00'),
('lunes', '09:00:00', '18:00:00'),
('martes', '09:00:00', '18:00:00'),
('miércoles', '09:00:00', '18:00:00'),
('jueves', '09:00:00', '18:00:00'),
('viernes', '09:00:00', '18:00:00'); 

INSERT INTO nomina (fecha_inicio, fecha_fin, fk_cargo, fk_departamento, fk_empleado) VALUES
('2024-03-01', NULL, 1, 1, 1),
('2023-07-15', NULL, 2, 2, 2),
('2022-10-20', NULL, 3, 3, 3),
('2024-01-10', NULL, 4, 4, 4),
('2022-12-05', NULL, 5, 5, 5),
('2023-05-18', NULL, 6, 6, 6),
('2021-11-30', NULL, 7, 7, 7),
('2024-02-12', '2024-05-31', 8, 8, 8),    
('2023-09-22', NULL, 9, 9, 9),
('2024-04-01', '2024-06-15', 10, 10, 10);   

INSERT INTO registro_biometrico (fecha_hora_entrada, fecha_hora_salida, fk_empleado) VALUES
('2024-01-01 08:00:00', '2024-01-01 17:00:00', 1),
('2024-01-01 08:05:00', '2024-01-01 17:05:00', 2),
('2024-01-01 08:02:00', '2024-01-01 17:02:00', 3),
('2024-01-01 08:01:00', '2024-01-01 17:01:00', 4),
('2024-01-01 08:03:00', '2024-01-01 17:03:00', 5),
('2024-01-01 08:04:00', '2024-01-01 17:04:00', 6),
('2024-01-01 08:06:00', '2024-01-01 17:06:00', 7),
('2024-01-01 08:07:00', '2024-01-01 17:07:00', 8),
('2024-01-01 08:08:00', '2024-01-01 17:08:00', 9),
('2024-01-01 08:09:00', '2024-01-01 17:09:00', 10); 

INSERT INTO vacacion (id, nombre, fecha_inicio, fecha_fin, fk_nomina_1, fk_nomina_2) VALUES
(1,  'Vacaciones Anuales',      '2024-01-15', '2024-01-30', 1, 1),
(2,  'Carnavales',              '2024-02-12', '2024-02-16', 2, 2),
(3,  'Vacaciones Anuales',      '2024-03-04', '2024-03-18', 3, 3),
(4,  'Semana Santa',            '2024-03-25', '2024-03-31', 4, 4),
(5,  'Vacaciones Anuales',      '2024-04-15', '2024-04-29', 5, 5),
(6,  'Vacaciones de Agosto',    '2024-08-01', '2024-08-15', 6, 6),
(7,  'Vacaciones Anuales',      '2024-09-10', '2024-09-24', 1, 1),
(8,  'Carnavales',              '2024-02-12', '2024-02-16', 8, 8),
(9,  'Semana Santa',            '2024-03-25', '2024-03-31', 9, 9),
(10, 'Vacaciones de Navidad',   '2024-12-20', '2025-01-03', 10, 10);


INSERT INTO beneficio_nomina (monto, fecha_asignacion, fk_nomina_1, fk_nomina_2, fk_beneficio) VALUES
(500.00, '2024-01-01', 1, 1, 1),
(300.00, '2024-01-01', 2, 2, 2),
(400.00, '2024-01-01', 3, 3, 3),
(350.00, '2024-01-01', 4, 4, 4),
(450.00, '2024-01-01', 5, 5, 5),
(250.00, '2024-01-16', 6, 6, 6),
(300.00, '2024-01-16', 7, 7, 7),
(400.00, '2024-01-16', 8, 8, 8),
(350.00, '2024-01-16', 9, 9, 9),
(300.00, '2024-01-16', 10, 10, 10); 

INSERT INTO horario_nomina (fk_horario, fk_nomina_1, fk_nomina_2) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8),
(9, 9, 9),
(10, 10, 10); 