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
('2024-04-01 08:00:00', '2024-04-01 17:00:00', 1),
('2024-04-02 08:00:00', '2024-04-02 17:00:00', 1),
('2024-04-03 08:00:00', '2024-04-03 17:00:00', 1),
('2024-04-04 08:30:00', '2024-04-04 17:00:00', 1),
('2024-04-05 08:00:00', '2024-04-05 16:40:00', 1),
('2024-04-01 08:00:00', '2024-04-01 17:00:00', 2),
('2024-04-02 08:00:00', '2024-04-02 17:00:00', 2),
('2024-04-03 08:00:00', '2024-04-03 17:00:00', 2),
('2024-04-04 08:00:00', '2024-04-04 17:00:00', 2),
('2024-04-05 08:00:00', '2024-04-05 17:00:00', 2),
('2024-04-01 08:20:00', '2024-04-01 17:00:00', 3),
('2024-04-02 08:30:00', '2024-04-02 17:00:00', 3),
('2024-04-03 08:11:00', '2024-04-03 17:00:00', 3),
('2024-04-04 08:18:00', '2024-04-04 17:00:00', 3),
('2024-04-05 08:45:00', '2024-04-05 17:00:00', 3),
('2024-04-01 08:00:00', '2024-04-01 17:00:00', 4),
('2024-04-02 08:00:00', '2024-04-02 17:00:00', 4),
('2024-04-03 08:00:00', '2024-04-03 17:00:00', 4),
('2024-04-04 08:00:00', '2024-04-04 17:00:00', 4),
('2024-04-05 08:00:00', '2024-04-05 17:00:00', 4),
('2024-04-01 08:15:00', '2024-04-01 17:00:00', 5),
('2024-04-02 08:00:00', '2024-04-02 17:00:00', 5),
('2024-04-03 08:00:00', '2024-04-03 17:00:00', 5),
('2024-04-04 08:00:00', '2024-04-04 17:00:00', 5),
('2024-04-05 08:00:00', '2024-04-05 16:30:00', 5),
('2024-04-01 09:00:00', '2024-04-01 18:00:00', 6),
('2024-04-02 09:00:00', '2024-04-02 18:00:00', 6),
('2024-04-03 09:00:00', '2024-04-03 18:00:00', 6),
('2024-04-04 09:00:00', '2024-04-04 18:00:00', 6),
('2024-04-05 09:00:00', '2024-04-05 17:40:00', 6),
('2024-04-01 09:00:00', '2024-04-01 18:00:00', 7),
('2024-04-02 09:00:00', '2024-04-02 18:00:00', 7),
('2024-04-03 09:00:00', '2024-04-03 18:00:00', 7),
('2024-04-04 09:00:00', '2024-04-04 18:00:00', 7),
('2024-04-05 09:00:00', '2024-04-05 18:00:00', 7),
('2024-04-01 09:00:00', '2024-04-01 18:00:00', 8),
('2024-04-02 09:15:00', '2024-04-02 18:00:00', 8),
('2024-04-03 09:00:00', '2024-04-03 18:00:00', 8),
('2024-04-04 09:00:00', '2024-04-04 17:50:00', 8),
('2024-04-05 09:00:00', '2024-04-05 18:00:00', 8),
('2024-04-01 09:15:00', '2024-04-01 18:00:00', 9),
('2024-04-02 09:20:00', '2024-04-02 18:00:00', 9),
('2024-04-03 09:11:00', '2024-04-03 18:00:00', 9),
('2024-04-04 09:00:00', '2024-04-04 18:00:00', 9),
('2024-04-05 09:23:00', '2024-04-05 18:00:00', 9),
('2024-04-01 09:50:00', '2024-04-01 17:00:00', 10),
('2024-04-02 09:45:00', '2024-04-02 18:00:00', 10),
('2024-04-03 09:00:00', '2024-04-03 17:25:00', 10),
('2024-04-04 10:00:00', '2024-04-04 17:30:00', 10),
('2024-04-05 09:15:00', '2024-04-05 17:00:00', 10);

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
(2, 1, 1),
(3, 1, 1),
(4, 1, 1),
(5, 1, 1),
(1, 2, 2),
(2, 2, 2),
(3, 2, 2),
(4, 2, 2),
(5, 2, 2),
(1, 3, 3),
(2, 3, 3),
(3, 3, 3),
(4, 3, 3),
(5, 3, 3),
(1, 4, 4),
(2, 4, 4),
(3, 4, 4),
(4, 4, 4),
(5, 4, 4),
(1, 5, 5),
(2, 5, 5),
(3, 5, 5),
(4, 5, 5),
(5, 5, 5),
(6, 6, 6),
(7, 6, 6),
(8, 6, 6),
(9, 6, 6),
(10, 6, 6),
(6, 7, 7),
(7, 7, 7),
(8, 7, 7),
(9, 7, 7),
(10, 7, 7),
(6, 8, 8),
(7, 8, 8),
(8, 8, 8),
(9, 8, 8),
(10, 8, 8),
(6, 9, 9),
(7, 9, 9),
(8, 9, 9),
(9, 9, 9),
(10, 9, 9),
(6, 10, 10),
(7, 10, 10),
(8, 10, 10),
(9, 10, 10),
(10, 10, 10); 

-- Insertar Estados de Venezuela (fk_lugar es NULL para los estados)
INSERT INTO Lugar (nombre, tipo) VALUES
('Anzoátegui', 'Estado'),
('Amazonas', 'Estado'),
('Apure', 'Estado'),
('Aragua', 'Estado'),
('Barinas', 'Estado'),
('Bolívar', 'Estado'),
('Carabobo', 'Estado'),
('Cojedes', 'Estado'),
('Delta Amacuro', 'Estado'),
('Distrito Capital', 'Estado'),
('Falcón', 'Estado'),
('Guárico', 'Estado'),
('Lara', 'Estado'),
('Mérida', 'Estado'),
('Miranda', 'Estado'),
('Monagas', 'Estado'),
('Nueva Esparta', 'Estado'),
('Portuguesa', 'Estado'),
('Sucre', 'Estado'),
('Táchira', 'Estado'),
('Trujillo', 'Estado'),
('La Guaira', 'Estado'),
('Yaracuy', 'Estado'),
('Zulia', 'Estado');

-- Insertar Municipios por Estado (fk_lugar es la id del Estado correspondiente)
INSERT INTO Lugar (nombre, tipo, fk_lugar) VALUES
-- Amazonas (id de Estado: 1)
('Alto Orinoco', 'Municipio', 1),
('Atabapo', 'Municipio', 1),
('Atures', 'Municipio', 1),
('Autana', 'Municipio', 1),
('Manapiare', 'Municipio', 1),
('Maroa', 'Municipio', 1),
('Río Negro', 'Municipio', 1),

-- Anzoátegui (id de Estado: 2)
('Anaco', 'Municipio', 2),
('Aragua', 'Municipio', 2),
('Diego Bautista Urbaneja', 'Municipio', 2),
('Fernando de Peñalver', 'Municipio', 2),
('Francisco del Carmen Carvajal', 'Municipio', 2),
('Francisco de Miranda', 'Municipio', 2),
('Guanta', 'Municipio', 2),
('Independencia', 'Municipio', 2),
('José Gregorio Monagas', 'Municipio', 2),
('Juan Antonio Sotillo', 'Municipio', 2),
('Juan Manuel Cajigal', 'Municipio', 2),
('Libertad', 'Municipio', 2),
('Manuel Ezequiel Bruzual', 'Municipio', 2),
('Pedro María Freites', 'Municipio', 2),
('Píritu', 'Municipio', 2),
('San José de Guanipa', 'Municipio', 2),
('San Juan de Capistrano', 'Municipio', 2),
('Santa Ana', 'Municipio', 2),
('Simón Bolívar', 'Municipio', 2),
('Simón Rodríguez', 'Municipio', 2),
('Sir Artur McGregor', 'Municipio', 2),

-- Apure (id de Estado: 3)
('Achaguas', 'Municipio', 3),
('Biruaca', 'Municipio', 3),
('Muñoz', 'Municipio', 3),
('Páez', 'Municipio', 3),
('Pedro Camejo', 'Municipio', 3),
('Rómulo Gallegos', 'Municipio', 3),
('San Fernando', 'Municipio', 3),

-- Aragua (id de Estado: 4)
('Bolívar', 'Municipio', 4),
('Camatagua', 'Municipio', 4),
('Francisco Linares Alcántara', 'Municipio', 4),
('Girardot', 'Municipio', 4),
('José Ángel Lamas', 'Municipio', 4),
('José Félix Ribas', 'Municipio', 4),
('José Rafael Revenga', 'Municipio', 4),
('Libertador', 'Municipio', 4),
('Mario Briceño Iragorry', 'Municipio', 4),
('Ocumare de la Costa de Oro', 'Municipio', 4),
('San Casimiro', 'Municipio', 4),
('San Sebastián', 'Municipio', 4),
('Santiago Mariño', 'Municipio', 4),
('Santos Michelena', 'Municipio', 4),
('Sucre', 'Municipio', 4),
('Tovar', 'Municipio', 4),
('Urdaneta', 'Municipio', 4),
('Zamora', 'Municipio', 4),

-- Barinas (id de Estado: 5)
('Alberto Arvelo Torrealba', 'Municipio', 5),
('Andrés Eloy Blanco', 'Municipio', 5),
('Antonio José de Sucre', 'Municipio', 5),
('Arismendi', 'Municipio', 5),
('Barinas', 'Municipio', 5),
('Bolívar', 'Municipio', 5),
('Cruz Paredes', 'Municipio', 5),
('Ezequiel Zamora', 'Municipio', 5),
('Obispos', 'Municipio', 5),
('Pedraza', 'Municipio', 5),
('Rojas', 'Municipio', 5),
('Sosa', 'Municipio', 5),

-- Bolívar (id de Estado: 6)
('Angostura', 'Municipio', 6),
('Caroní', 'Municipio', 6),
('Cedeño', 'Municipio', 6),
('El Callao', 'Municipio', 6),
('Gran Sabana', 'Municipio', 6),
('Heres', 'Municipio', 6),
('Padre Pedro Chien', 'Municipio', 6),
('Piar', 'Municipio', 6),
('Roscio', 'Municipio', 6),
('Sifontes', 'Municipio', 6),
('Sucre', 'Municipio', 6),

-- Carabobo (id de Estado: 7)
('Bejuma', 'Municipio', 7),
('Carlos Arvelo', 'Municipio', 7),
('Diego Ibarra', 'Municipio', 7),
('Guacara', 'Municipio', 7),
('Juan José Mora', 'Municipio', 7),
('Libertador', 'Municipio', 7),
('Los Guayos', 'Municipio', 7),
('Miranda', 'Municipio', 7),
('Montalbán', 'Municipio', 7),
('Naguanagua', 'Municipio', 7),
('Puerto Cabello', 'Municipio', 7),
('San Diego', 'Municipio', 7),
('San Joaquín', 'Municipio', 7),
('Valencia', 'Municipio', 7),

-- Cojedes (id de Estado: 8)
('Anzoátegui', 'Municipio', 8),
('Falcón', 'Municipio', 8),
('Girardot', 'Municipio', 8),
('Lima Blanco', 'Municipio', 8),
('Pao de San Juan Bautista', 'Municipio', 8),
('Ricaurte', 'Municipio', 8),
('Rómulo Gallegos', 'Municipio', 8),
('San Carlos', 'Municipio', 8),
('Tinaco', 'Municipio', 8),

-- Delta Amacuro (id de Estado: 9)
('Antonio Díaz', 'Municipio', 9),
('Casacoima', 'Municipio', 9),
('Pedernales', 'Municipio', 9),
('Tucupita', 'Municipio', 9),

-- Distrito Capital (id de Estado: 10)
('Libertador', 'Municipio', 10),

-- Falcón (id de Estado: 11)
('Acosta', 'Municipio', 11),
('Bolívar', 'Municipio', 11),
('Buchivacoa', 'Municipio', 11),
('Cacique Manaure', 'Municipio', 11),
('Carirubana', 'Municipio', 11),
('Colina', 'Municipio', 11),
('Dabajuro', 'Municipio', 11),
('Democracia', 'Municipio', 11),
('Falcón', 'Municipio', 11),
('Federación', 'Municipio', 11),
('Jacura', 'Municipio', 11),
('Los Taques', 'Municipio', 11),
('Mauroa', 'Municipio', 11),
('Miranda', 'Municipio', 11),
('Monseñor Iturriza', 'Municipio', 11),
('Palmasola', 'Municipio', 11),
('Petit', 'Municipio', 11),
('Píritu', 'Municipio', 11),
('San Francisco', 'Municipio', 11),
('Silva', 'Municipio', 11),
('Sucre', 'Municipio', 11),
('Tocopero', 'Municipio', 11),
('Unión', 'Municipio', 11),
('Urumaco', 'Municipio', 11),
('Zamora', 'Municipio', 11),

-- Guárico (id de Estado: 12)
('Camaguán', 'Municipio', 12),
('Chaguaramas', 'Municipio', 12),
('El Socorro', 'Municipio', 12),
('Francisco de Miranda', 'Municipio', 12),
('José Félix Ribas', 'Municipio', 12),
('José Tadeo Monagas', 'Municipio', 12),
('Juan Germán Roscio', 'Municipio', 12),
('Julián Mellado', 'Municipio', 12),
('Las Mercedes', 'Municipio', 12),
('Leonardo Infante', 'Municipio', 12),
('Ortiz', 'Municipio', 12),
('San Gerónimo de Guayabal', 'Municipio', 12),
('San José de Guaribe', 'Municipio', 12),
('Santa María de Ipire', 'Municipio', 12),
('Zaraza', 'Municipio', 12),

-- Lara (id de Estado: 13)
('Andrés Eloy Blanco', 'Municipio', 13),
('Crespo', 'Municipio', 13),
('Iribarren', 'Municipio', 13),
('Jiménez', 'Municipio', 13),
('Morán', 'Municipio', 13),
('Palavecino', 'Municipio', 13),
('Simón Planas', 'Municipio', 13),
('Torres', 'Municipio', 13),
('Urdaneta', 'Municipio', 13),

-- Mérida (id de Estado: 14)
('Alberto Adriani', 'Municipio', 14),
('Andrés Bello', 'Municipio', 14),
('Antonio Pinto Salinas', 'Municipio', 14),
('Aricagua', 'Municipio', 14),
('Arzobispo Chacón', 'Municipio', 14),
('Campo Elías', 'Municipio', 14),
('Caracciolo Parra Olmedo', 'Municipio', 14),
('Cardenal Quintero', 'Municipio', 14),
('Guaraque', 'Municipio', 14),
('Julio César Salas', 'Municipio', 14),
('Justo Briceño', 'Municipio', 14),
('Libertador', 'Municipio', 14),
('Miranda', 'Municipio', 14),
('Obispo Ramos de Lora', 'Municipio', 14),
('Padre Noguera', 'Municipio', 14),
('Pueblo Llano', 'Municipio', 14),
('Rangel', 'Municipio', 14),
('Rivas Dávila', 'Municipio', 14),
('Santos Marquina', 'Municipio', 14),
('Sucre', 'Municipio', 14),
('Tovar', 'Municipio', 14),
('Tulio Febres Cordero', 'Municipio', 14),
('Zea', 'Municipio', 14),

-- Miranda (id de Estado: 15)
('Acevedo', 'Municipio', 15),
('Andrés Bello', 'Municipio', 15),
('Baruta', 'Municipio', 15),
('Brión', 'Municipio', 15),
('Buroz', 'Municipio', 15),
('Carrizal', 'Municipio', 15),
('Chacao', 'Municipio', 15),
('Cristóbal Rojas', 'Municipio', 15),
('El Hatillo', 'Municipio', 15),
('Guaicaipuro', 'Municipio', 15),
('Independencia', 'Municipio', 15),
('Los Salias', 'Municipio', 15),
('Páez', 'Municipio', 15),
('Paz Castillo', 'Municipio', 15),
('Pedro Gual', 'Municipio', 15),
('Plaza', 'Municipio', 15),
('Simón Bolívar', 'Municipio', 15),
('Sucre', 'Municipio', 15),
('Tomás Lander', 'Municipio', 15),
('Urdaneta', 'Municipio', 15),
('Zamora', 'Municipio', 15),

-- Monagas (id de Estado: 16)
('Acosta', 'Municipio', 16),
('Aguasay', 'Municipio', 16),
('Bolívar', 'Municipio', 16),
('Caripe', 'Municipio', 16),
('Cedeño', 'Municipio', 16),
('Ezequiel Zamora', 'Municipio', 16),
('Libertador', 'Municipio', 16),
('Maturín', 'Municipio', 16),
('Piar', 'Municipio', 16),
('Punceres', 'Municipio', 16),
('Santa Bárbara', 'Municipio', 16),
('Sotillo', 'Municipio', 16),
('Uracoa', 'Municipio', 16),

-- Nueva Esparta (id de Estado: 17)
('Antolín del Campo', 'Municipio', 17),
('Arismendi', 'Municipio', 17),
('Díaz', 'Municipio', 17),
('García', 'Municipio', 17),
('Gómez', 'Municipio', 17),
('Macanao', 'Municipio', 17),
('Maneiro', 'Municipio', 17),
('Marcano', 'Municipio', 17),
('Mariño', 'Municipio', 17),
('Península de Macanao', 'Municipio', 17),
('Tubores', 'Municipio', 17),
('Villalba', 'Municipio', 17),

-- Portuguesa (id de Estado: 18)
('Agua Blanca', 'Municipio', 18),
('Araure', 'Municipio', 18),
('Esteller', 'Municipio', 18),
('Guanare', 'Municipio', 18),
('Guanarito', 'Municipio', 18),
('Monseñor José Vicente de Unda', 'Municipio', 18),
('Ospino', 'Municipio', 18),
('Páez', 'Municipio', 18),
('Papelón', 'Municipio', 18),
('San Genaro de Boconoíto', 'Municipio', 18),
('San Rafael de Onoto', 'Municipio', 18),
('Santa Rosalía', 'Municipio', 18),
('Sucre', 'Municipio', 18),
('Turén', 'Municipio', 18),

-- Sucre (id de Estado: 19)
('Andrés Eloy Blanco', 'Municipio', 19),
('Andrés Mata', 'Municipio', 19),
('Arismendi', 'Municipio', 19),
('Benítez', 'Municipio', 19),
('Bermúdez', 'Municipio', 19),
('Bolívar', 'Municipio', 19),
('Cajigal', 'Municipio', 19),
('Cruz Salmerón Acosta', 'Municipio', 19),
('Libertador', 'Municipio', 19),
('Mariño', 'Municipio', 19),
('Mejía', 'Municipio', 19),
('Montes', 'Municipio', 19),
('Ribero', 'Municipio', 19),
('Sucre', 'Municipio', 19),
('Valdez', 'Municipio', 19),

-- Táchira (id de Estado: 20)
('Andrés Bello', 'Municipio', 20),
('Antonio Rómulo Costa', 'Municipio', 20),
('Ayacucho', 'Municipio', 20),
('Bolívar', 'Municipio', 20),
('Cárdenas', 'Municipio', 20),
('Córdoba', 'Municipio', 20),
('Fernández Feo', 'Municipio', 20),
('Francisco de Miranda', 'Municipio', 20),
('García de Hevia', 'Municipio', 20),
('Guásimos', 'Municipio', 20),
('Independencia', 'Municipio', 20),
('Jáuregui', 'Municipio', 20),
('José María Vargas', 'Municipio', 20),
('Junín', 'Municipio', 20),
('Libertad', 'Municipio', 20),
('Libertador', 'Municipio', 20),
('Lobatera', 'Municipio', 20),
('Michelena', 'Municipio', 20),
('Panamericano', 'Municipio', 20),
('Pedro María Ureña', 'Municipio', 20),
('Rafael Urdaneta', 'Municipio', 20),
('Samuel Darío Maldonado', 'Municipio', 20),
('San Cristóbal', 'Municipio', 20),
('Seboruco', 'Municipio', 20),
('Simón Rodríguez', 'Municipio', 20),
('Sucre', 'Municipio', 20),
('Torbes', 'Municipio', 20),
('Uribante', 'Municipio', 20),

-- Trujillo (id de Estado: 21)
('Andrés Bello', 'Municipio', 21),
('Boconó', 'Municipio', 21),
('Bolívar', 'Municipio', 21),
('Candelaria', 'Municipio', 21),
('Carache', 'Municipio', 21),
('Escuque', 'Municipio', 21),
('José Felipe Márquez Cañizales', 'Municipio', 21),
('Juan Vicente Campo Elías', 'Municipio', 21),
('La Ceiba', 'Municipio', 21),
('Miranda', 'Municipio', 21),
('Monte Carmelo', 'Municipio', 21),
('Motatán', 'Municipio', 21),
('Pampán', 'Municipio', 21),
('Pampanito', 'Municipio', 21),
('Rafael Rangel', 'Municipio', 21),
('San Rafael de Carvajal', 'Municipio', 21),
('Sucre', 'Municipio', 21),
('Trujillo', 'Municipio', 21),
('Urdaneta', 'Municipio', 21),
('Valera', 'Municipio', 21),

-- La Guaira (Vargas) (id de Estado: 22)
('Vargas', 'Municipio', 22),

-- Yaracuy (id de Estado: 23)
('Arístides Bastidas', 'Municipio', 23),
('Bolívar', 'Municipio', 23),
('Bruzual', 'Municipio', 23),
('Cocorote', 'Municipio', 23),
('Independencia', 'Municipio', 23),
('José Antonio Páez', 'Municipio', 23),
('La Trinidad', 'Municipio', 23),
('Manuel Monge', 'Municipio', 23),
('Nirgua', 'Municipio', 23),
('Peña', 'Municipio', 23),
('San Felipe', 'Municipio', 23),
('Sucre', 'Municipio', 23),
('Urachiche', 'Municipio', 23),
('Veroes', 'Municipio', 23),

-- Zulia (id de Estado: 24)
('Almirante Padilla', 'Municipio', 24),
('Baralt', 'Municipio', 24),
('Cabimas', 'Municipio', 24),
('Catatumbo', 'Municipio', 24),
('Colón', 'Municipio', 24),
('Francisco Javier Pulgar', 'Municipio', 24),
('Guajira', 'Municipio', 24),
('Jesús Enrique Lossada', 'Municipio', 24),
('Jesús María Semprún', 'Municipio', 24),
('La Cañada de Urdaneta', 'Municipio', 24),
('Lagunillas', 'Municipio', 24),
('Machiques de Perijá', 'Municipio', 24),
('Mara', 'Municipio', 24),
('Maracaibo', 'Municipio', 24),
('Miranda', 'Municipio', 24),
('Rosario de Perijá', 'Municipio', 24),
('San Francisco', 'Municipio', 24),
('Santa Rita', 'Municipio', 24),
('Simón Bolívar', 'Municipio', 24),
('Sucre', 'Municipio', 24),
('Valmore Rodríguez', 'Municipio', 24);

-- Insertar Parroquias por Municipio (fk_lugar es la id del Municipio correspondiente)
-- ids de parroquias inician después de la última id de municipio (360)
INSERT INTO Lugar (nombre, tipo, fk_lugar) VALUES
-- Parroquias del Distrito Capital (Municipio Libertador, id: 128)
('23 de Enero', 'Parroquia', 128),
('Altagracia', 'Parroquia', 128),
('Antímano', 'Parroquia', 128),
('Caricuao', 'Parroquia', 128),
('Catedral', 'Parroquia', 128),
('Coche', 'Parroquia', 128),
('El Junquito', 'Parroquia', 128),
('El Paraíso', 'Parroquia', 128),
('El Recreo', 'Parroquia', 128),
('El Valle', 'Parroquia', 128),
('La Candelaria', 'Parroquia', 128),
('La Pastora', 'Parroquia', 128),
('La Vega', 'Parroquia', 128),
('Macarao', 'Parroquia', 128),
('San Agustín', 'Parroquia', 128),
('San Bernardino', 'Parroquia', 128),
('San José', 'Parroquia', 128),
('San Juan', 'Parroquia', 128),
('San Pedro', 'Parroquia', 128),
('Santa Rosalía', 'Parroquia', 128),
('Santa Teresa', 'Parroquia', 128),
('Sucre (Catia)', 'Parroquia', 128),

-- Parroquias del Estado Amazonas
-- Municipio Alto Orinoco (id: 25)
('La Esmeralda', 'Parroquia', 25),
('Huachamacare', 'Parroquia', 25),
('Marawaka', 'Parroquia', 25),
('Mavaka', 'Parroquia', 25),
('Sierra Parima', 'Parroquia', 25),
-- Municipio Atabapo (id: 26)
('San Fernando de Atabapo', 'Parroquia', 26),
('Ucata', 'Parroquia', 26),
('Yapacana', 'Parroquia', 26),
('Caname', 'Parroquia', 26),
('Guayapo', 'Parroquia', 26),
-- Municipio Atures (id: 27)
('Puerto Ayacucho', 'Parroquia', 27),
('Fernando Girón Tovar', 'Parroquia', 27),
('Luis Alberto Gómez', 'Parroquia', 27),
('Parhueña', 'Parroquia', 27),
('Platanillal', 'Parroquia', 27),
('Samariapo', 'Parroquia', 27),
('Sipapo', 'Parroquia', 27),
('Tablones', 'Parroquia', 27),
('Coromoto', 'Parroquia', 27),
-- Municipio Autana (id: 28)
('Isla Ratón', 'Parroquia', 28),
('Samán de Atabapo', 'Parroquia', 28),
('Sipapo', 'Parroquia', 28),
-- Municipio Manapiare (id: 29)
('San Juan de Manapiare', 'Parroquia', 29),
('Alto Ventuari', 'Parroquia', 29),
('Medio Ventuari', 'Parroquia', 29),
('Bajo Ventuari', 'Parroquia', 29),
('Casiquiare', 'Parroquia', 29),
-- Municipio Maroa (id: 30)
('Maroa', 'Parroquia', 30),
('Victorino', 'Parroquia', 30),
('Comunidad', 'Parroquia', 30),
-- Municipio Río Negro (id: 31)
('San Carlos de Río Negro', 'Parroquia', 31),
('Solano', 'Parroquia', 31),
('Casiquiare', 'Parroquia', 31),

-- Parroquias del Estado Anzoátegui
-- Municipio Anaco (id: 32)
('Anaco', 'Parroquia', 32),
('San Joaquín', 'Parroquia', 32),
('San Mateo', 'Parroquia', 32),
-- Municipio Aragua (id: 33)
('Aragua de Barcelona', 'Parroquia', 33),
('Cachipo', 'Parroquia', 33),
-- Municipio Diego Bautista Urbaneja (id: 34)
('Lechería', 'Parroquia', 34),
('El Morro', 'Parroquia', 34),
-- Municipio Fernando de Peñalver (id: 35)
('Puerto Píritu', 'Parroquia', 35),
('San Miguel', 'Parroquia', 35),
('Sucre', 'Parroquia', 35),
-- Municipio Francisco del Carmen Carvajal (id: 36)
('Valle de Guanape', 'Parroquia', 36),
('Uveral', 'Parroquia', 36),
-- Municipio Francisco de Miranda (id: 37)
('Pariaguán', 'Parroquia', 37),
('Atapirire', 'Parroquia', 37),
('Bocas de Uchire', 'Parroquia', 37),
('El Pao', 'Parroquia', 37),
('San Diego de Cabrutica', 'Parroquia', 37),
-- Municipio Guanta (id: 38)
('Guanta', 'Parroquia', 38),
('Chorrerón', 'Parroquia', 38),
-- Municipio Independencia (id: 39)
('Soledad', 'Parroquia', 39),
('Mamo', 'Parroquia', 39),
('Carapa', 'Parroquia', 39),
-- Municipio José Gregorio Monagas (id: 40)
('Mapire', 'Parroquia', 40),
('Piar', 'Parroquia', 40),
('Santa Cruz', 'Parroquia', 40),
('San Diego de Cabrutica', 'Parroquia', 40),
-- Municipio Juan Antonio Sotillo (id: 41)
('Puerto La Cruz', 'Parroquia', 41),
('El Morro', 'Parroquia', 41),
('Pozuelos', 'Parroquia', 41),
('Santa Ana', 'Parroquia', 41),
-- Municipio Juan Manuel Cajigal (id: 42)
('Onoto', 'Parroquia', 42),
('San Pablo', 'Parroquia', 42),
-- Municipio Libertad (id: 43)
('San Mateo', 'Parroquia', 43),
('Bergantín', 'Parroquia', 43),
('Santa Rosa', 'Parroquia', 43),
-- Municipio Manuel Ezequiel Bruzual (id: 44)
('Clarines', 'Parroquia', 44),
('Guanape', 'Parroquia', 44),
('Sabana de Uchire', 'Parroquia', 44),
-- Municipio Pedro María Freites (id: 45)
('Cantaura', 'Parroquia', 45),
('Libertador', 'Parroquia', 45),
('Santa Rosa', 'Parroquia', 45),
('Sucre', 'Parroquia', 45),
-- Municipio Píritu (id: 46)
('Píritu', 'Parroquia', 46),
('San Francisco', 'Parroquia', 46),
-- Municipio San José de Guanipa (id: 47)
('San José de Guanipa', 'Parroquia', 47),
-- Municipio San Juan de Capistrano (id: 48)
('Boca de Uchire', 'Parroquia', 48),
('Puerto Píritu', 'Parroquia', 48),
-- Municipio Santa Ana (id: 49)
('Santa Ana', 'Parroquia', 49),
-- Municipio Simón Bolívar (Barcelona) (id: 50)
('El Carmen', 'Parroquia', 50),
('San Cristóbal', 'Parroquia', 50),
('Bergantín', 'Parroquia', 50),
('Caigua', 'Parroquia', 50),
('Naricual', 'Parroquia', 50),
('El Pilar', 'Parroquia', 50),
-- Municipio Simón Rodríguez (id: 51)
('El Tigre', 'Parroquia', 51),
('Guanipa', 'Parroquia', 51),
('Edmundo Barrios', 'Parroquia', 51),
-- Municipio Sir Artur McGregor (id: 52)
('El Chaparro', 'Parroquia', 52),
('Tomás Alfaro', 'Parroquia', 52),

-- Parroquias del Estado Apure
-- Municipio Achaguas (id: 53)
('Achaguas', 'Parroquia', 53),
('Apurito', 'Parroquia', 53),
('El Yagual', 'Parroquia', 53),
('Guachara', 'Parroquia', 53),
('Mucuritas', 'Parroquia', 53),
('Queseras del Medio', 'Parroquia', 53),
-- Municipio Biruaca (id: 54)
('Biruaca', 'Parroquia', 54),
('San Juan de Payara', 'Parroquia', 54),
-- Municipio Muñoz (id: 55)
('Bruzual', 'Parroquia', 55),
('Mantecal', 'Parroquia', 55),
('Quintero', 'Parroquia', 55),
('Rincón Hondo', 'Parroquia', 55),
('San Vicente', 'Parroquia', 55),
-- Municipio Páez (id: 56)
('Guasdualito', 'Parroquia', 56),
('Aramare', 'Parroquia', 56),
('Cunaviche', 'Parroquia', 56),
('El Amparo', 'Parroquia', 56),
('Puerto Páez', 'Parroquia', 56),
('San Camilo', 'Parroquia', 56),
('Urdaneta', 'Parroquia', 56),
-- Municipio Pedro Camejo (id: 57)
('San Juan de Payara', 'Parroquia', 57),
('Codazzi', 'Parroquia', 57),
('Cunaviche', 'Parroquia', 57),
('Elorza', 'Parroquia', 57),
-- Municipio Rómulo Gallegos (id: 58)
('Elorza', 'Parroquia', 58),
-- Municipio San Fernando (id: 59)
('San Fernando', 'Parroquia', 59),
('El Recreo', 'Parroquia', 59),
('Peñalver', 'Parroquia', 59),
('San Rafael de Atamaica', 'Parroquia', 59),
('Valle Hondo', 'Parroquia', 59),

-- Parroquias del Estado Aragua
-- Municipio Bolívar (id: 60)
('San Mateo', 'Parroquia', 60),
('Cagua', 'Parroquia', 60),
('El Consejo', 'Parroquia', 60),
('Las Tejerías', 'Parroquia', 60),
('Santa Cruz', 'Parroquia', 60),
-- Municipio Camatagua (id: 61)
('Camatagua', 'Parroquia', 61),
('Carmen de Cura', 'Parroquia', 61),
-- Municipio Francisco Linares Alcántara (id: 62)
('Santa Rita', 'Parroquia', 62),
('Francisco de Miranda', 'Parroquia', 62),
('Monseñor Feliciano González', 'Parroquia', 62),
-- Municipio Girardot (id: 63)
('Maracay', 'Parroquia', 63),
('Castaño', 'Parroquia', 63),
('Choroní', 'Parroquia', 63),
('El Limón', 'Parroquia', 63),
('Las Delicias', 'Parroquia', 63),
('Pedro José Ovalles', 'Parroquia', 63),
('San Isidro', 'Parroquia', 63),
('José Casanova Godoy', 'Parroquia', 63),
('Los Tacarigua', 'Parroquia', 63),
('Andrés Eloy Blanco', 'Parroquia', 63),
-- Municipio José Ángel Lamas (id: 64)
('Santa Cruz', 'Parroquia', 64),
('Arévalo Aponte', 'Parroquia', 64),
('San Mateo', 'Parroquia', 64),
-- Municipio José Félix Ribas (id: 65)
('La Victoria', 'Parroquia', 65),
('Castor Nieves Ríos', 'Parroquia', 65),
('Las Guacamayas', 'Parroquia', 65),
('Pao de Zárate', 'Parroquia', 65),
('Zuata', 'Parroquia', 65),
-- Municipio José Rafael Revenga (id: 66)
('El Consejo', 'Parroquia', 66),
('Pocache', 'Parroquia', 66),
('Tocorón', 'Parroquia', 66),
-- Municipio Libertador (Aragua) (id: 67)
('Palo Negro', 'Parroquia', 67),
('San Martín de Porres', 'Parroquia', 67),
('Santa Rita', 'Parroquia', 67),
('El Libertador', 'Parroquia', 67),
-- Municipio Mario Briceño Iragorry (id: 68)
('El Limón', 'Parroquia', 68),
('Caña de Azúcar', 'Parroquia', 68),
-- Municipio Ocumare de la Costa de Oro (id: 69)
('Ocumare de la Costa', 'Parroquia', 69),
('Cata', 'Parroquia', 69),
('Independencia', 'Parroquia', 69),
-- Municipio San Casimiro (id: 70)
('San Casimiro', 'Parroquia', 70),
('Guiripa', 'Parroquia', 70),
('Ollas de Caramacate', 'Parroquia', 70),
('Valle Morín', 'Parroquia', 70),
-- Municipio San Sebastián (id: 71)
('San Sebastián', 'Parroquia', 71),
-- Municipio Santiago Mariño (id: 72)
('Turmero', 'Parroquia', 72),
('Aragua', 'Parroquia', 72),
('Alfredo Pacheco Miranda', 'Parroquia', 72),
('Chuao', 'Parroquia', 72),
('Samán de Güere', 'Parroquia', 72),
-- Municipio Santos Michelena (id: 73)
('Las Tejerías', 'Parroquia', 73),
('Tiara', 'Parroquia', 73),
-- Municipio Sucre (Aragua) (id: 74)
('Cagua', 'Parroquia', 74),
('Bella Vista', 'Parroquia', 74),
-- Municipio Tovar (id: 75)
('Colonia Tovar', 'Parroquia', 75),
-- Municipio Urdaneta (Aragua) (id: 76)
('Barbacoas', 'Parroquia', 76),
('San Francisco de Cara', 'Parroquia', 76),
('Taguay', 'Parroquia', 76),
('Las Peñitas', 'Parroquia', 76),
-- Municipio Zamora (Aragua) (id: 77)
('Villa de Cura', 'Parroquia', 77),
('Magdaleno', 'Parroquia', 77),
('San Francisco de Asís', 'Parroquia', 77),
('Valles de Tucutunemo', 'Parroquia', 77),
('Augusto Mijares', 'Parroquia', 77),

-- Parroquias del Estado Barinas
-- Municipio Alberto Arvelo Torrealba (id: 78)
('Sabaneta', 'Parroquia', 78),
('Juan Antonio Rodríguez Domínguez', 'Parroquia', 78),
-- Municipio Andrés Eloy Blanco (Barinas) (id: 79)
('El Cantón', 'Parroquia', 79),
('Santa Cruz de Guacas', 'Parroquia', 79),
('Puerto Vivas', 'Parroquia', 79),
-- Municipio Antonio José de Sucre (id: 80)
('Ticoporo', 'Parroquia', 80),
('Nicolás Pulido', 'Parroquia', 80),
('Andrés Bello', 'Parroquia', 80),
-- Municipio Arismendi (Barinas) (id: 81)
('Arismendi', 'Parroquia', 81),
('San Antonio', 'Parroquia', 81),
('Gabana', 'Parroquia', 81),
('San Rafael', 'Parroquia', 81),
-- Municipio Barinas (id: 82)
('Barinas', 'Parroquia', 82),
('Alfredo Arvelo Larriva', 'Parroquia', 82),
('Alto Barinas', 'Parroquia', 82),
('Corazón de Jesús', 'Parroquia', 82),
('Don Rómulo Betancourt', 'Parroquia', 82),
('Manuel Palacio Fajardo', 'Parroquia', 82),
('Ramón Ignacio Méndez', 'Parroquia', 82),
('San Silvestre', 'Parroquia', 82),
('Santa Inés', 'Parroquia', 82),
('Santa Lucía', 'Parroquia', 82),
('Trivino', 'Parroquia', 82),
('El Carmen', 'Parroquia', 82),
('Ciudad Bolivia', 'Parroquia', 82),
-- Municipio Bolívar (Barinas) (id: 83)
('Barinitas', 'Parroquia', 83),
('Altamira', 'Parroquia', 83),
('Calderas', 'Parroquia', 83),
-- Municipio Cruz Paredes (id: 84)
('Barrancas', 'Parroquia', 84),
('El Socorro', 'Parroquia', 84),
('Mazparrito', 'Parroquia', 84),
-- Municipio Ezequiel Zamora (Barinas) (id: 85)
('Santa Bárbara', 'Parroquia', 85),
('Pedro Briceño', 'Parroquia', 85),
('Ramón Ignacio Méndez', 'Parroquia', 85),
('Arismendi', 'Parroquia', 85),
-- Municipio Obispos (id: 86)
('Obispos', 'Parroquia', 86),
('El Real', 'Parroquia', 86),
('La Luz', 'Parroquia', 86),
('Los Guasimitos', 'Parroquia', 86),
-- Municipio Pedraza (id: 87)
('Ciudad Bolivia', 'Parroquia', 87),
('Andrés Bello', 'Parroquia', 87),
('Paez', 'Parroquia', 87),
('José Ignacio del Pumar', 'Parroquia', 87),
-- Municipio Rojas (id: 88)
('Libertad', 'Parroquia', 88),
('Dolores', 'Parroquia', 88),
('Palacio Fajardo', 'Parroquia', 88),
('Santa Rosa', 'Parroquia', 88),
-- Municipio Sosa (id: 89)
('Ciudad de Nutrias', 'Parroquia', 89),
('El Regalo', 'Parroquia', 89),
('Puerto de Nutrias', 'Parroquia', 89),
('Santa Catalina', 'Parroquia', 89),
('Simón Bolívar', 'Parroquia', 89),
('Valle de la Trinidad', 'Parroquia', 89),

-- Parroquias del Estado Bolívar
-- Municipio Angostura (anteriormente Heres) (id: 90)
('Ciudad Bolívar', 'Parroquia', 90),
('Agua Salada', 'Parroquia', 90),
('Caicara del Orinoco', 'Parroquia', 90),
('José Antonio Páez', 'Parroquia', 90),
('La Sabanita', 'Parroquia', 90),
('Maipure', 'Parroquia', 90),
('Panapana', 'Parroquia', 90),
('Orinoco', 'Parroquia', 90),
('San José de Tiznados', 'Parroquia', 90),
('Vista Hermosa', 'Parroquia', 90),
-- Municipio Caroní (id: 91)
('Ciudad Guayana', 'Parroquia', 91),
('Cachamay', 'Parroquia', 91),
('Dalla Costa', 'Parroquia', 91),
('Once de Abril', 'Parroquia', 91),
('Simón Bolívar', 'Parroquia', 91),
('Unare', 'Parroquia', 91),
('Universidad', 'Parroquia', 91),
('Vista al Sol', 'Parroquia', 91),
('Pozo Verde', 'Parroquia', 91),
('Yocoima', 'Parroquia', 91),
('5 de Julio', 'Parroquia', 91),
-- Municipio Cedeño (id: 92)
('Caicara del Orinoco', 'Parroquia', 92),
('Altagracia', 'Parroquia', 92),
('Ascensión de Sarare', 'Parroquia', 92),
('Guaniamo', 'Parroquia', 92),
('La Urbana', 'Parroquia', 92),
('Pijiguaos', 'Parroquia', 92),
-- Municipio El Callao (id: 93)
('El Callao', 'Parroquia', 93),
-- Municipio Gran Sabana (id: 94)
('Santa Elena de Uairén', 'Parroquia', 94),
('Ikabarú', 'Parroquia', 94),
-- Municipio Piar (id: 97)
('Upata', 'Parroquia', 97),
('Andrés Eloy Blanco', 'Parroquia', 97),
('Pedro Cova', 'Parroquia', 97),
-- Municipio Roscio (id: 98)
('Guasipati', 'Parroquia', 98),
('Salto Grande', 'Parroquia', 98),
('San José de Anacoco', 'Parroquia', 98),
('Santa Cruz', 'Parroquia', 98),
-- Municipio Sifontes (id: 99)
('Tumeremo', 'Parroquia', 99),
('Dalla Costa', 'Parroquia', 99),
('San Isidro', 'Parroquia', 99),
('Las Claritas', 'Parroquia', 99),
-- Municipio Sucre (Bolívar) (id: 100)
('Maripa', 'Parroquia', 100),
('Guarataro', 'Parroquia', 100),
('Aripao', 'Parroquia', 100),
('Las Majadas', 'Parroquia', 100),
('Moitaco', 'Parroquia', 100),

-- Parroquias del Estado Carabobo
-- Municipio Bejuma (id: 101)
('Bejuma', 'Parroquia', 101),
('Canoabo', 'Parroquia', 101),
('Simón Bolívar', 'Parroquia', 101),
-- Municipio Carlos Arvelo (id: 102)
('Güigüe', 'Parroquia', 102),
('Boquerón', 'Parroquia', 102),
('Tacaburua', 'Parroquia', 102),
('Capitán Aldama', 'Parroquia', 102),
-- Municipio Diego Ibarra (id: 103)
('Mariara', 'Parroquia', 103),
('Aguas Calientes', 'Parroquia', 103),
-- Municipio Guacara (id: 104)
('Guacara', 'Parroquia', 104),
('Ciudad Alianza', 'Parroquia', 104),
('Yagua', 'Parroquia', 104),
-- Municipio Juan José Mora (id: 105)
('Morón', 'Parroquia', 105),
('Urama', 'Parroquia', 105),
-- Municipio Libertador (Carabobo) (id: 106)
('Tocuyito', 'Parroquia', 106),
('Independencia', 'Parroquia', 106),
-- Municipio Los Guayos (id: 107)
('Los Guayos', 'Parroquia', 107),
-- Municipio Miranda (Carabobo) (id: 108)
('Miranda', 'Parroquia', 108),
-- Municipio Montalbán (id: 109)
('Montalbán', 'Parroquia', 109),
-- Municipio Naguanagua (id: 110)
('Naguanagua', 'Parroquia', 110),
-- Municipio Puerto Cabello (id: 111)
('Puerto Cabello', 'Parroquia', 111),
('Democracia', 'Parroquia', 111),
('Fraternidad', 'Parroquia', 111),
('Goaigoaza', 'Parroquia', 111),
('Independencia', 'Parroquia', 111),
('Juan José Flores', 'Parroquia', 111),
('Unión', 'Parroquia', 111),
('Borburata', 'Parroquia', 111),
('Patánemo', 'Parroquia', 111),
-- Municipio San Diego (Carabobo) (id: 112)
('San Diego', 'Parroquia', 112),
-- Municipio San Joaquín (id: 113)
('San Joaquín', 'Parroquia', 113),
-- Municipio Valencia (id: 114)
('Candelaria', 'Parroquia', 114),
('Catedral', 'Parroquia', 114),
('El Socorro', 'Parroquia', 114),
('Miguel Peña', 'Parroquia', 114),
('Rafael Urdaneta', 'Parroquia', 114),
('San Blas', 'Parroquia', 114),
('San José', 'Parroquia', 114),
('Santa Rosa', 'Parroquia', 114),
('Negro Primero', 'Parroquia', 114),

-- Parroquias del Estado Cojedes
-- Municipio Anzoátegui (Cojedes) (id: 115)
('Cojedes', 'Parroquia', 115),
('Juan de Mata Suárez', 'Parroquia', 115),
-- Municipio Falcón (Cojedes) (id: 116)
('Tinaquillo', 'Parroquia', 116),
-- Municipio Girardot (Cojedes) (id: 117)
('El Baúl', 'Parroquia', 117),
('Sucre', 'Parroquia', 117),
-- Municipio Lima Blanco (id: 118)
('Macapo', 'Parroquia', 118),
('La Aguadita', 'Parroquia', 118),
-- Municipio Pao de San Juan Bautista (id: 119)
('El Pao', 'Parroquia', 119),
-- Municipio Ricaurte (Cojedes) (id: 120)
('Libertad', 'Parroquia', 120),
('Manuel Manrique', 'Parroquia', 120),
-- Municipio Rómulo Gallegos (Cojedes) (id: 121)
('Las Vegas', 'Parroquia', 121),
-- Municipio San Carlos (Cojedes) (id: 122)
('San Carlos de Austria', 'Parroquia', 122),
('Juan Ángel Bravo', 'Parroquia', 122),
('Manuel Manrique', 'Parroquia', 122),
-- Municipio Tinaco (id: 123)
('Tinaco', 'Parroquia', 123),

-- Parroquias del Estado Delta Amacuro
-- Municipio Antonio Díaz (Delta Amacuro) (id: 124)
('Curiapo', 'Parroquia', 124),
('San José de Tucupita', 'Parroquia', 124),
('Canaima', 'Parroquia', 124),
('Padre Barral', 'Parroquia', 124),
('Manuel Renauld', 'Parroquia', 124),
('Capure', 'Parroquia', 124),
('Guayo', 'Parroquia', 124),
('Ibaruma', 'Parroquia', 124),
('Ambrosio', 'Parroquia', 124),
('Acosta', 'Parroquia', 124),
-- Municipio Casacoima (id: 125)
('Sierra Imataca', 'Parroquia', 125),
('Cinco de Julio', 'Parroquia', 125),
('Juan Bautista Arismendi', 'Parroquia', 125),
('Santos de Abelgas', 'Parroquia', 125),
('Imataca', 'Parroquia', 125),
-- Municipio Pedernales (id: 126)
('Pedernales', 'Parroquia', 126),
('Luis Beltrán Prieto Figueroa', 'Parroquia', 126),
-- Municipio Tucupita (id: 127)
('Tucupita', 'Parroquia', 127),
('Leonardo Ruiz Pineda', 'Parroquia', 127),
('Mariscal Antonio José de Sucre', 'Parroquia', 127),
('San Rafael', 'Parroquia', 127),
('Monseñor Argimiro García', 'Parroquia', 127),
('Antonio José de Sucre', 'Parroquia', 127),
('Josefa Camejo', 'Parroquia', 127),

-- Parroquias del Estado Falcón
-- Municipio Acosta (Falcón) (id: 130)
('San Juan de los Cayos', 'Parroquia', 130),
('Capadare', 'Parroquia', 130),
('La Pastora', 'Parroquia', 130),
('Libertador', 'Parroquia', 130),
-- Municipio Bolívar (Falcón) (id: 131)
('San Luis', 'Parroquia', 131),
('Aracua', 'Parroquia', 131),
('La Vela', 'Parroquia', 131),
('San Rafael de las Palmas', 'Parroquia', 131),
-- Municipio Buchivacoa (id: 132)
('Capatárida', 'Parroquia', 132),
('Bararida', 'Parroquia', 132),
('Goajiro', 'Parroquia', 132),
('Borojó', 'Parroquia', 132),
('Seque', 'Parroquia', 132),
('Zazárida', 'Parroquia', 132),
-- Municipio Cacique Manaure (id: 133)
('Yaracal', 'Parroquia', 133),
-- Municipio Carirubana (id: 134)
('Punto Fijo', 'Parroquia', 134),
('Carirubana', 'Parroquia', 134),
('Santa Ana', 'Parroquia', 134),
-- Municipio Colina (Falcón) (id: 135)
('La Vela de Coro', 'Parroquia', 135),
('Amuay', 'Parroquia', 135),
('La Esmeralda', 'Parroquia', 135),
('San Luis', 'Parroquia', 135),
('Sabana Grande', 'Parroquia', 135),
-- Municipio Dabajuro (id: 136)
('Dabajuro', 'Parroquia', 136),
-- Municipio Democracia (Falcón) (id: 137)
('Pedregal', 'Parroquia', 137),
('Aguas Buenas', 'Parroquia', 137),
('El Paují', 'Parroquia', 137),
('Purureche', 'Parroquia', 137),
('San Félix', 'Parroquia', 137),
-- Municipio Falcón (id: 138)
('Pueblo Nuevo', 'Parroquia', 138),
('Adícora', 'Parroquia', 138),
('Baraived', 'Parroquia', 138),
('Buena Vista', 'Parroquia', 138),
('Jadacaquiva', 'Parroquia', 138),
('Moruy', 'Parroquia', 138),
('Paramana', 'Parroquia', 138),
('El Vínculo', 'Parroquia', 138),
('Norte', 'Parroquia', 138),
-- Municipio Federación (id: 139)
('Churuguara', 'Parroquia', 139),
('Agua Larga', 'Parroquia', 139),
('El Paujicito', 'Parroquia', 139),
('Independencia', 'Parroquia', 139),
('Mapararí', 'Parroquia', 139),
-- Municipio Jacura (id: 140)
('Jacura', 'Parroquia', 140),
('Agua Salada', 'Parroquia', 140),
('Barrialito', 'Parroquia', 140),
('El Charal', 'Parroquia', 140),
-- Municipio Los Taques (id: 141)
('Santa Cruz de Los Taques', 'Parroquia', 141),
('Los Taques', 'Parroquia', 141),
-- Municipio Mauroa (id: 142)
('Mene de Mauroa', 'Parroquia', 142),
('Casigua', 'Parroquia', 142),
('San Félix', 'Parroquia', 142),
-- Municipio Miranda (Falcón) (id: 143)
('Santa Ana de Coro', 'Parroquia', 143),
('Guzmán Guillermo', 'Parroquia', 143),
('Mitare', 'Parroquia', 143),
('Río Seco', 'Parroquia', 143),
('Sabana Larga', 'Parroquia', 143),
('San Antonio', 'Parroquia', 143),
('San Gabriel', 'Parroquia', 143),
-- Municipio Monseñor Iturriza (id: 144)
('Chichiriviche', 'Parroquia', 144),
('Boca de Aroa', 'Parroquia', 144),
('San Juan de los Cayos', 'Parroquia', 144),
-- Municipio Palmasola (id: 145)
('Palmasola', 'Parroquia', 145),
-- Municipio Petit (id: 146)
('Cabure', 'Parroquia', 146),
('Colina', 'Parroquia', 146),
('El Paují', 'Parroquia', 146),
('Agua Larga', 'Parroquia', 146),
-- Municipio Píritu (Falcón) (id: 147)
('Píritu', 'Parroquia', 147),
('San José de la Costa', 'Parroquia', 147),
-- Municipio San Francisco (Falcón) (id: 148)
('Mirimire', 'Parroquia', 148),
('Agua Salada', 'Parroquia', 148),
('El Paují', 'Parroquia', 148),
-- Municipio Silva (id: 149)
('Tucacas', 'Parroquia', 149),
('Boca de Aroa', 'Parroquia', 149),
-- Municipio Sucre (Falcón) (id: 150)
('La Cruz de Taratara', 'Parroquia', 150),
('Agua Salada', 'Parroquia', 150),
('Piedra de Amolar', 'Parroquia', 150),
-- Municipio Tocopero (id: 151)
('Tocopero', 'Parroquia', 151),
-- Municipio Unión (Falcón) (id: 152)
('Santa Cruz de Bucaral', 'Parroquia', 152),
('El Charal', 'Parroquia', 152),
('Las Vegas', 'Parroquia', 152),
-- Municipio Urumaco (id: 153)
('Urumaco', 'Parroquia', 153),
-- Municipio Zamora (Falcón) (id: 154)
('Puerto Cumarebo', 'Parroquia', 154),
('La Ciénaga', 'Parroquia', 154),
('La Soledad', 'Parroquia', 154),
('Pueblo Nuevo', 'Parroquia', 154),
('San Rafael de La Vela', 'Parroquia', 154),

-- Parroquias del Estado Guárico
-- Municipio Camaguán (id: 155)
('Camaguán', 'Parroquia', 155),
('Puerto Miranda', 'Parroquia', 155),
('Uverito', 'Parroquia', 155),
-- Municipio Chaguaramas (id: 156)
('Chaguaramas', 'Parroquia', 156),
-- Municipio El Socorro (Guárico) (id: 157)
('El Socorro', 'Parroquia', 157),
-- Municipio Francisco de Miranda (Guárico) (id: 158)
('Calabozo', 'Parroquia', 158),
('El Calvario', 'Parroquia', 158),
('El Rastro', 'Parroquia', 158),
('Guardatinajas', 'Parroquia', 158),
('Saladillo', 'Parroquia', 158),
('San Rafael de los Cajones', 'Parroquia', 158),
-- Municipio José Félix Ribas (Guárico) (id: 159)
('Tucupido', 'Parroquia', 159),
('San Rafael de Orituco', 'Parroquia', 159),
-- Municipio José Tadeo Monagas (id: 160)
('Altagracia de Orituco', 'Parroquia', 160),
('Lezama', 'Parroquia', 160),
('Paso Real de Macaira', 'Parroquia', 160),
('San Francisco Javier de Lezama', 'Parroquia', 160),
('Santa María de Ipire', 'Parroquia', 160),
('Valle de la Pascua', 'Parroquia', 160),
-- Municipio Juan Germán Roscio (id: 161)
('San Juan de los Morros', 'Parroquia', 161),
('Cantagallo', 'Parroquia', 161),
('Parapara', 'Parroquia', 161),
-- Municipio Julián Mellado (id: 162)
('El Sombrero', 'Parroquia', 162),
('Sosa', 'Parroquia', 162),
-- Municipio Las Mercedes (Guárico) (id: 163)
('Las Mercedes', 'Parroquia', 163),
('Cabruta', 'Parroquia', 163),
('Santa Rita de Manapire', 'Parroquia', 163),
-- Municipio Leonardo Infante (id: 164)
('Valle de la Pascua', 'Parroquia', 164),
('Espino', 'Parroquia', 164),
-- Municipio Ortiz (id: 165)
('Ortiz', 'Parroquia', 165),
('San Francisco de Tiznados', 'Parroquia', 165),
('San José de Tiznados', 'Parroquia', 165),
('Guarico', 'Parroquia', 165),
-- Municipio San Gerónimo de Guayabal (id: 166)
('Guayabal', 'Parroquia', 166),
('Cazorla', 'Parroquia', 166),
-- Municipio San José de Guaribe (id: 167)
('San José de Guaribe', 'Parroquia', 167),
-- Municipio Santa María de Ipire (Guárico) (id: 168)
('Santa María de Ipire', 'Parroquia', 168),
('Altamira', 'Parroquia', 168),
-- Municipio Zaraza (id: 169)
('Zaraza', 'Parroquia', 169),
('San José de Unare', 'Parroquia', 169),

-- Parroquias del Estado Lara
-- Municipio Andrés Eloy Blanco (Lara) (id: 170)
('Sanare', 'Parroquia', 170),
('Pío Tamayo', 'Parroquia', 170),
('Yacambú', 'Parroquia', 170),
-- Municipio Crespo (id: 171)
('Duaca', 'Parroquia', 171),
('Farriar', 'Parroquia', 171),
-- Municipio Iribarren (id: 172)
('Barquisimeto', 'Parroquia', 172),
('Aguedo Felipe Alvarado', 'Parroquia', 172),
('Anselmo Belloso', 'Parroquia', 172),
('Buena Vista', 'Parroquia', 172),
('Catedral', 'Parroquia', 172),
('Concepción', 'Parroquia', 172),
('El Cují', 'Parroquia', 172),
('Juan de Villegas', 'Parroquia', 172),
('Santa Rosa', 'Parroquia', 172),
('Tamaca', 'Parroquia', 172),
('Unión', 'Parroquia', 172),
('Guerrera Ana Soto', 'Parroquia', 172),
-- Municipio Jiménez (Lara) (id: 173)
('Quíbor', 'Parroquia', 173),
('Coronel Mariano Peraza', 'Parroquia', 173),
('Diego de Lozada', 'Parroquia', 173),
('José Bernardo Dorantes', 'Parroquia', 173),
('Juan Bautista Rodríguez', 'Parroquia', 173),
('Paraíso de San José', 'Parroquia', 173),
('Tintorero', 'Parroquia', 173),
('Cuara', 'Parroquia', 173),
-- Municipio Morán (id: 174)
('El Tocuyo', 'Parroquia', 174),
('Anzoátegui', 'Parroquia', 174),
('Guárico', 'Parroquia', 174),
('Hilario Luna y Luna', 'Parroquia', 174),
('Humocaro Alto', 'Parroquia', 174),
('Humocaro Bajo', 'Parroquia', 174),
('La Candelaria', 'Parroquia', 174),
('Morán', 'Parroquia', 174),
-- Municipio Palavecino (id: 175)
('Cabudare', 'Parroquia', 175),
('José Gregorio Bastidas', 'Parroquia', 175),
('Agua Viva', 'Parroquia', 175),
-- Municipio Simón Planas (id: 176)
('Sarare', 'Parroquia', 176),
('Gustavo Vegas León', 'Parroquia', 176),
('Manzanita', 'Parroquia', 176),
-- Municipio Torres (id: 177)
('Carora', 'Parroquia', 177),
('Altagracia', 'Parroquia', 177),
('Antonio Díaz', 'Parroquia', 177),
('Camacaro', 'Parroquia', 177),
('Castañeda', 'Parroquia', 177),
('Cecilio Zubillaga', 'Parroquia', 177),
('Chiquinquirá', 'Parroquia', 177),
('El Blanco', 'Parroquia', 177),
('Espinoza de los Monteros', 'Parroquia', 177),
('Manuel Morillo', 'Parroquia', 177),
('Montaña', 'Parroquia', 177),
('Padre Pedro María Aguilar', 'Parroquia', 177),
('Torres', 'Parroquia', 177),
('Las Mercedes', 'Parroquia', 177),
('Paraíso de San José', 'Parroquia', 177),
-- Municipio Urdaneta (Lara) (id: 178)
('Siquisique', 'Parroquia', 178),
('Moroturo', 'Parroquia', 178),
('San Miguel', 'Parroquia', 178),
('Xaguas', 'Parroquia', 178),

-- Parroquias del Estado Mérida
-- Municipio Alberto Adriani (id: 179)
('El Vigía', 'Parroquia', 179),
('Presidente Páez', 'Parroquia', 179),
('Héctor Amable Mora', 'Parroquia', 179),
('Gabriel Picón González', 'Parroquia', 179),
('José Nucete Sardi', 'Parroquia', 179),
('Pulido Méndez', 'Parroquia', 179),
-- Municipio Andrés Bello (Mérida) (id: 180)
('La Azulita', 'Parroquia', 180),
-- Municipio Antonio Pinto Salinas (id: 181)
('Santa Cruz de Mora', 'Parroquia', 181),
('Mesa Bolívar', 'Parroquia', 181),
('Mesa de Las Palmas', 'Parroquia', 181),
-- Municipio Aricagua (id: 182)
('Aricagua', 'Parroquia', 182),
('San Antonio', 'Parroquia', 182),
-- Municipio Arzobispo Chacón (id: 183)
('Canaguá', 'Parroquia', 183),
('Capurí', 'Parroquia', 183),
('Chacantá', 'Parroquia', 183),
('El Molino', 'Parroquia', 183),
('Guaimaral', 'Parroquia', 183),
('Mucutuy', 'Parroquia', 183),
('Mucuchachí', 'Parroquia', 183),
-- Municipio Campo Elías (Mérida) (id: 184)
('Ejido', 'Parroquia', 184),
('Fernández Peña', 'Parroquia', 184),
('Montalbán', 'Parroquia', 184),
('San José del Sur', 'Parroquia', 184),
-- Municipio Caracciolo Parra Olmedo (id: 185)
('Tucaní', 'Parroquia', 185),
('Florencio Ramírez', 'Parroquia', 185),
('San Rafael de Alcázar', 'Parroquia', 185),
('Santa Elena de Arenales', 'Parroquia', 185),
-- Municipio Cardenal Quintero (id: 186)
('Santo Domingo', 'Parroquia', 186),
('Las Piedras', 'Parroquia', 186),
-- Municipio Guaraque (id: 187)
('Guaraque', 'Parroquia', 187),
('Mesa de Quintero', 'Parroquia', 187),
('Río Negro', 'Parroquia', 187),
-- Municipio Julio César Salas (id: 188)
('Arapuey', 'Parroquia', 188),
('Palmira', 'Parroquia', 188),
-- Municipio Justo Briceño (id: 189)
('Torondoy', 'Parroquia', 189),
('Las Playitas', 'Parroquia', 189),
-- Municipio Libertador (Mérida) (id: 190)
('Antonio Spinetti Dini', 'Parroquia', 190),
('Arias', 'Parroquia', 190),
('Caracciolo Parra Pérez', 'Parroquia', 190),
('Domingo Peña', 'Parroquia', 190),
('El Llano', 'Parroquia', 190),
('Gonzalo Picón Febres', 'Parroquia', 190),
('Juan Rodríguez Suárez', 'Parroquia', 190),
('Lagunillas', 'Parroquia', 190),
('Mariano Picón Salas', 'Parroquia', 190),
('Milla', 'Parroquia', 190),
('Osuna Rodríguez', 'Parroquia', 190),
('Presidente Betancourt', 'Parroquia', 190),
('Rómulo Gallegos', 'Parroquia', 190),
('Sagrario', 'Parroquia', 190),
('San Juan Bautista', 'Parroquia', 190),
('Santa Catalina', 'Parroquia', 190),
('Santa Lucía', 'Parroquia', 190),
('Santa Rosa', 'Parroquia', 190),
('Spinetti Dini', 'Parroquia', 190),
('El Morro', 'Parroquia', 190),
('Los Nevados', 'Parroquia', 190),
-- Municipio Miranda (Mérida) (id: 191)
('Timotes', 'Parroquia', 191),
('Andrés Eloy Blanco', 'Parroquia', 191),
('La Venta', 'Parroquia', 191),
('Santiago de la Punta', 'Parroquia', 191),
-- Municipio Obispo Ramos de Lora (id: 192)
('Santa Elena de Arenales', 'Parroquia', 192),
('Eloy Paredes', 'Parroquia', 192),
('San Rafael de Alcázar', 'Parroquia', 192),
-- Municipio Padre Noguera (id: 193)
('Santa María de Caparo', 'Parroquia', 193),
-- Municipio Pueblo Llano (id: 194)
('Pueblo Llano', 'Parroquia', 194),
-- Municipio Rangel (id: 195)
('Mucuchíes', 'Parroquia', 195),
('Cacute', 'Parroquia', 195),
('Gavidia', 'Parroquia', 195),
('La Toma', 'Parroquia', 195),
('Mucurubá', 'Parroquia', 195),
-- Municipio Rivas Dávila (id: 196)
('Bailadores', 'Parroquia', 196),
('Gerónimo Maldonado', 'Parroquia', 196),
-- Municipio Santos Marquina (id: 197)
('Tabay', 'Parroquia', 197),
-- Municipio Sucre (Mérida) (id: 198)
('Lagunillas', 'Parroquia', 198),
('Chiguará', 'Parroquia', 198),
('Estánques', 'Parroquia', 198),
('Pueblo Nuevo del Sur', 'Parroquia', 198),
('San Juan', 'Parroquia', 198),
-- Municipio Tovar (Mérida) (id: 199)
('Tovar', 'Parroquia', 199),
('El Amparo', 'Parroquia', 199),
('San Francisco', 'Parroquia', 199),
('Zea', 'Parroquia', 199),
-- Municipio Tulio Febres Cordero (id: 200)
('Nueva Bolivia', 'Parroquia', 200),
('Independencia', 'Parroquia', 200),
('Santa Apolonia', 'Parroquia', 200),
('Chaparral', 'Parroquia', 200),
-- Municipio Zea (id: 201)
('Zea', 'Parroquia', 201),
('Caño El Tigre', 'Parroquia', 201),

-- Parroquias del Estado Miranda
-- Municipio Acevedo (id: 202)
('Caucagua', 'Parroquia', 202),
('Aragüita', 'Parroquia', 202),
('Capaya', 'Parroquia', 202),
('Marizapa', 'Parroquia', 202),
('Panaquire', 'Parroquia', 202),
('Tapipa', 'Parroquia', 202),
('Ribas', 'Parroquia', 202),
-- Municipio Andrés Bello (Miranda) (id: 203)
('San José de Barlovento', 'Parroquia', 203),
('Cumbo', 'Parroquia', 203),
-- Municipio Baruta (id: 204)
('Nuestra Señora del Rosario', 'Parroquia', 204),
('El Cafetal', 'Parroquia', 204),
('Las Minas', 'Parroquia', 204),
-- Municipio Brión (id: 205)
('Higuerote', 'Parroquia', 205),
('Curiepe', 'Parroquia', 205),
('Tacarigua de Mamporal', 'Parroquia', 205),
-- Municipio Buroz (id: 206)
('Mamporal', 'Parroquia', 206),
-- Municipio Carrizal (id: 207)
('Carrizal', 'Parroquia', 207),
-- Municipio Chacao (id: 208)
('Chacao', 'Parroquia', 208),
-- Municipio Cristóbal Rojas (id: 209)
('Charallave', 'Parroquia', 209),
('Las Brisas', 'Parroquia', 209),
-- Municipio El Hatillo (id: 210)
('El Hatillo', 'Parroquia', 210),
-- Municipio Guaicaipuro (id: 211)
('Los Teques', 'Parroquia', 211),
('Paracotos', 'Parroquia', 211),
('San Antonio de los Altos', 'Parroquia', 211),
('San José de los Altos', 'Parroquia', 211),
('San Pedro', 'Parroquia', 211),
('Altagracia de la Montaña', 'Parroquia', 211),
('Cecilio Acosta', 'Parroquia', 211),
('Tacoa', 'Parroquia', 211),
-- Municipio Independencia (Miranda) (id: 212)
('Santa Teresa del Tuy', 'Parroquia', 212),
('El Cartanal', 'Parroquia', 212),
-- Municipio Los Salias (id: 213)
('San Antonio de los Altos', 'Parroquia', 213),
-- Municipio Páez (Miranda) (id: 214)
('Río Chico', 'Parroquia', 214),
('El Cafeto', 'Parroquia', 214),
('San Fernando', 'Parroquia', 214),
('Tacarigua de la Laguna', 'Parroquia', 214),
('Paparo', 'Parroquia', 214),
-- Municipio Paz Castillo (id: 215)
('Santa Lucía', 'Parroquia', 215),
-- Municipio Pedro Gual (id: 216)
('Cúpira', 'Parroquia', 216),
('Machurucuto', 'Parroquia', 216),
-- Municipio Plaza (id: 217)
('Guarenas', 'Parroquia', 217),
-- Municipio Simón Bolívar (Miranda) (id: 218)
('San Francisco de Yare', 'Parroquia', 218),
('San Antonio de Yare', 'Parroquia', 218),
('Simón Bolívar', 'Parroquia', 218),
-- Municipio Sucre (Miranda) (id: 219)
('Petare', 'Parroquia', 219),
('Caucagüita', 'Parroquia', 219),
('Fila de Mariches', 'Parroquia', 219),
('La Dolorita', 'Parroquia', 219),
('Leoncio Martínez', 'Parroquia', 219),
-- Municipio Tomás Lander (id: 220)
('Ocumare del Tuy', 'Parroquia', 220),
('La Democracia', 'Parroquia', 220),
('Santa Bárbara', 'Parroquia', 220),
('San Francisco de Yare', 'Parroquia', 220),
('Valle de la Pascua', 'Parroquia', 220),
-- Municipio Urdaneta (Miranda) (id: 221)
('Cúa', 'Parroquia', 221),
('Nueva Cúa', 'Parroquia', 221),
-- Municipio Zamora (Miranda) (id: 222)
('Guatire', 'Parroquia', 222),
('Araira', 'Parroquia', 222),
('Bolívar', 'Parroquia', 222),

-- Parroquias del Estado Monagas
-- Municipio Acosta (Monagas) (id: 223)
('San Antonio de Capayacuar', 'Parroquia', 223),
('San Francisco', 'Parroquia', 223),
-- Municipio Aguasay (id: 224)
('Aguasay', 'Parroquia', 224),
-- Municipio Bolívar (Monagas) (id: 225)
('Caripito', 'Parroquia', 225),
('Sabana Grande', 'Parroquia', 225),
-- Municipio Caripe (id: 226)
('Caripe', 'Parroquia', 226),
('El Guácharo', 'Parroquia', 226),
('La Guanota', 'Parroquia', 226),
('San Agustín', 'Parroquia', 226),
('Teresén', 'Parroquia', 226),
-- Municipio Cedeño (Monagas) (id: 227)
('Caicara de Maturín', 'Parroquia', 227),
('Areo', 'Parroquia', 227),
('San Félix', 'Parroquia', 227),
-- Municipio Ezequiel Zamora (Monagas) (id: 228)
('Punta de Mata', 'Parroquia', 228),
('El Tejero', 'Parroquia', 228),
-- Municipio Libertador (Monagas) (id: 229)
('Temblador', 'Parroquia', 229),
('Chaguaramas', 'Parroquia', 229),
('Las Alhuacas', 'Parroquia', 229),
-- Municipio Maturín (id: 230)
('Maturín', 'Parroquia', 230),
('Alto de Los Godos', 'Parroquia', 230),
('Boquerón', 'Parroquia', 230),
('Las Cocuizas', 'Parroquia', 230),
('La Pica', 'Parroquia', 230),
('San Simón', 'Parroquia', 230),
('El Corozo', 'Parroquia', 230),
('El Furrial', 'Parroquia', 230),
('Jusepín', 'Parroquia', 230),
('La Cruz', 'Parroquia', 230),
('San Vicente', 'Parroquia', 230),
-- Municipio Piar (Monagas) (id: 231)
('Aragua de Maturín', 'Parroquia', 231),
('Aparicio', 'Parroquia', 231),
('Chaguaramal', 'Parroquia', 231),
('El Pinto', 'Parroquia', 231),
('Guaripete', 'Parroquia', 231),
('La Cruz de la Paloma', 'Parroquia', 231),
('Taguaya', 'Parroquia', 231),
('El Zamuro', 'Parroquia', 231),
-- Municipio Punceres (id: 232)
('Quiriquire', 'Parroquia', 232),
('Punceres', 'Parroquia', 232),
-- Municipio Santa Bárbara (Monagas) (id: 233)
('Santa Bárbara', 'Parroquia', 233),
('Tabasca', 'Parroquia', 233),
-- Municipio Sotillo (Monagas) (id: 234)
('Barrancas del Orinoco', 'Parroquia', 234),
('Chaguaramos', 'Parroquia', 234),
-- Municipio Uracoa (id: 235)
('Uracoa', 'Parroquia', 235),

-- Parroquias del Estado Nueva Esparta
-- Municipio Antolín del Campo (id: 236)
('Paraguachí', 'Parroquia', 236),
('La Rinconada', 'Parroquia', 236),
-- Municipio Arismendi (Nueva Esparta) (id: 237)
('La Asunción', 'Parroquia', 237),
-- Municipio Díaz (id: 238)
('San Juan Bautista', 'Parroquia', 238),
('Concepción', 'Parroquia', 238),
-- Municipio García (id: 239)
('El Valle del Espíritu Santo', 'Parroquia', 239),
('San Antonio', 'Parroquia', 239),
-- Municipio Gómez (id: 240)
('Santa Ana', 'Parroquia', 240),
('Altagracia', 'Parroquia', 240),
('Coché', 'Parroquia', 240),
('Manzanillo', 'Parroquia', 240),
('Vicente Fuentes', 'Parroquia', 240),
-- Municipio Macanao (id: 241)
('Boca del Río', 'Parroquia', 241),
('San Francisco', 'Parroquia', 241),
-- Municipio Maneiro (id: 242)
('Pampatar', 'Parroquia', 242),
('Jorge Coll', 'Parroquia', 242),
('Aguas de Moya', 'Parroquia', 242),
-- Municipio Marcano (id: 243)
('Juan Griego', 'Parroquia', 243),
('Adrián', 'Parroquia', 243),
('Francisco Fajardo', 'Parroquia', 243),
-- Municipio Mariño (Nueva Esparta) (id: 244)
('Porlamar', 'Parroquia', 244),
('Los Robles', 'Parroquia', 244),
('Cristo de Aranza', 'Parroquia', 244),
('Bella Vista', 'Parroquia', 244),
('Mariño', 'Parroquia', 244),
('Villa Rosa', 'Parroquia', 244),
-- Municipio Península de Macanao (id: 245)
('Boca de Pozo', 'Parroquia', 245),
('San Francisco', 'Parroquia', 245),
-- Municipio Tubores (id: 246)
('Punta de Piedras', 'Parroquia', 246),
('Los Tubores', 'Parroquia', 246),
-- Municipio Villalba (id: 247)
('San Pedro de Coche', 'Parroquia', 247),
('El Bichar', 'Parroquia', 247),
('San Agustín', 'Parroquia', 247),

-- Parroquias del Estado Portuguesa
-- Municipio Agua Blanca (id: 248)
('Agua Blanca', 'Parroquia', 248),
-- Municipio Araure (id: 249)
('Araure', 'Parroquia', 249),
('Río Acarigua', 'Parroquia', 249),
-- Municipio Esteller (id: 250)
('Píritu', 'Parroquia', 250),
('Uveral', 'Parroquia', 250),
-- Municipio Guanare (id: 251)
('Guanare', 'Parroquia', 251),
('Córdoba', 'Parroquia', 251),
('Espino', 'Parroquia', 251),
('Mesa de Cavacas', 'Parroquia', 251),
('San Juan de Guanaguanare', 'Parroquia', 251),
('Virgen de Coromoto', 'Parroquia', 251),
-- Municipio Guanarito (id: 252)
('Guanarito', 'Parroquia', 252),
('Capital Guanarito', 'Parroquia', 252),
('Trinidad de la Capilla', 'Parroquia', 252),
('Uveral', 'Parroquia', 252),
-- Municipio Monseñor José Vicente de Unda (id: 253)
('Chabasquén', 'Parroquia', 253),
('Peña Blanca', 'Parroquia', 253),
-- Municipio Ospino (id: 254)
('Ospino', 'Parroquia', 254),
('La Aparición', 'Parroquia', 254),
('San Rafael de Palo Alzado', 'Parroquia', 254),
-- Municipio Páez (Portuguesa) (id: 255)
('Acarigua', 'Parroquia', 255),
('Payara', 'Parroquia', 255),
('Pimpinela', 'Parroquia', 255),
('Ramón Peraza', 'Parroquia', 255),
-- Municipio Papelón (id: 256)
('Papelón', 'Parroquia', 256),
('Caño Delgadito', 'Parroquia', 256),
-- Municipio San Genaro de Boconoíto (id: 257)
('San Genaro de Boconoíto', 'Parroquia', 257),
('Antolín Tovar', 'Parroquia', 257),
('Paraíso de San Genaro', 'Parroquia', 257),
-- Municipio San Rafael de Onoto (id: 258)
('San Rafael de Onoto', 'Parroquia', 258),
('Santa Fé', 'Parroquia', 258),
('San Roque', 'Parroquia', 258),
-- Municipio Santa Rosalía (id: 259)
('El Playón', 'Parroquia', 259),
('Canelones', 'Parroquia', 259),
-- Municipio Sucre (Portuguesa) (id: 260)
('Biscucuy', 'Parroquia', 260),
('San José de Saguaz', 'Parroquia', 260),
('San Rafael de Palo Alzado', 'Parroquia', 260),
('Uvencio Antonio Velásquez', 'Parroquia', 260),
('Villa de la Paz', 'Parroquia', 260),
-- Municipio Turén (id: 261)
('Villa Bruzual', 'Parroquia', 261),
('Canelones', 'Parroquia', 261),
('Santa Cruz', 'Parroquia', 261),
('San Isidro Labrador', 'Parroquia', 261),

-- Parroquias del Estado Sucre
-- Municipio Andrés Eloy Blanco (Sucre) (id: 262)
('Casanay', 'Parroquia', 262),
('Mariño', 'Parroquia', 262),
('Río Caribe', 'Parroquia', 262),
('San Juan de Unare', 'Parroquia', 262),
-- Municipio Andrés Mata (id: 263)
('San José de Aerocuar', 'Parroquia', 263),
('Tunapuy', 'Parroquia', 263),
-- Municipio Arismendi (Sucre) (id: 264)
('Río Caribe', 'Parroquia', 264),
('Antonio José de Sucre', 'Parroquia', 264),
('El Morro de Puerto Santo', 'Parroquia', 264),
('Punta de Piedras', 'Parroquia', 264),
('Río de Agua', 'Parroquia', 264),
-- Municipio Benítez (id: 265)
('El Pilar', 'Parroquia', 265),
('El Rincón', 'Parroquia', 265),
('Guaraúnos', 'Parroquia', 265),
('Tunapuicito', 'Parroquia', 265),
('Unión', 'Parroquia', 265),
-- Municipio Bermúdez (id: 266)
('Carúpano', 'Parroquia', 266),
('Macarapana', 'Parroquia', 266),
('Santa Catalina', 'Parroquia', 266),
('Santa Inés', 'Parroquia', 266),
('Santa Rosa', 'Parroquia', 266),
-- Municipio Bolívar (Sucre) (id: 267)
('Marigüitar', 'Parroquia', 267),
('San Antonio del Golfo', 'Parroquia', 267),
-- Municipio Cajigal (id: 268)
('Yaguaraparo', 'Parroquia', 268),
('El Paujil', 'Parroquia', 268),
('Libertad', 'Parroquia', 268),
('San Fernando', 'Parroquia', 268),
('Santa Bárbara', 'Parroquia', 268),
-- Municipio Cruz Salmerón Acosta (id: 269)
('Araya', 'Parroquia', 269),
('Chacopata', 'Parroquia', 269),
('Manicuare', 'Parroquia', 269),
-- Municipio Libertador (Sucre) (id: 270)
('San Juan de las Galdonas', 'Parroquia', 270),
('El Pilar', 'Parroquia', 270),
('San Juan', 'Parroquia', 270),
('San Vicente', 'Parroquia', 270),
-- Municipio Mariño (Sucre) (id: 271)
('Irapa', 'Parroquia', 271),
('Campo Elías', 'Parroquia', 271),
('Marigüitar', 'Parroquia', 271),
('San Antonio de Irapa', 'Parroquia', 271),
('Soro', 'Parroquia', 271),
-- Municipio Mejía (id: 272)
('San Antonio del Golfo', 'Parroquia', 272),
-- Municipio Montes (id: 273)
('Cumanacoa', 'Parroquia', 273),
('Arenas', 'Parroquia', 273),
('Aricagua', 'Parroquia', 273),
('Cocollar', 'Parroquia', 273),
('San Fernando', 'Parroquia', 273),
('San Lorenzo', 'Parroquia', 273),
-- Municipio Ribero (id: 274)
('Cariaco', 'Parroquia', 274),
('Catuaro', 'Parroquia', 274),
('Río Casanay', 'Parroquia', 274),
('San Agustín', 'Parroquia', 274),
('Santa María', 'Parroquia', 274),
-- Municipio Sucre (Sucre) (id: 275)
('Ayacucho', 'Parroquia', 275),
('Blanco', 'Parroquia', 275),
('Cumaná', 'Parroquia', 275),
('Valentín Valiente', 'Parroquia', 275),
('Altagracia', 'Parroquia', 275),
('Santa Inés', 'Parroquia', 275),
('San Juan', 'Parroquia', 275),
('Raúl Leoni', 'Parroquia', 275),
-- Municipio Valdez (id: 276)
('Güiria', 'Parroquia', 276),
('Bideau', 'Parroquia', 276),
('Cristóbal Colón', 'Parroquia', 276),
('Punta de Piedras', 'Parroquia', 276),
('Puerto Hierro', 'Parroquia', 276),

-- Parroquias del Estado Táchira
-- Municipio Andrés Bello (Táchira) (id: 277)
('Cordero', 'Parroquia', 277),
-- Municipio Antonio Rómulo Costa (id: 278)
('Las Mesas', 'Parroquia', 278),
-- Municipio Ayacucho (Táchira) (id: 279)
('Colón', 'Parroquia', 279),
('San Pedro del Río', 'Parroquia', 279),
('San Juan de Colón', 'Parroquia', 279),
-- Municipio Bolívar (Táchira) (id: 280)
('San Antonio del Táchira', 'Parroquia', 280),
('Juan Vicente Gómez', 'Parroquia', 280),
('Palotal', 'Parroquia', 280),
('Padre Marcos Figueroa', 'Parroquia', 280),
-- Municipio Cárdenas (id: 281)
('Táriba', 'Parroquia', 281),
('Jauregui', 'Parroquia', 281),
('La Florida', 'Parroquia', 281),
-- Municipio Córdoba (Táchira) (id: 282)
('Santa Ana', 'Parroquia', 282),
('San Rafael de Cordero', 'Parroquia', 282),
-- Municipio Fernández Feo (id: 283)
('San Rafael del Piñal', 'Parroquia', 283),
('Santo Domingo', 'Parroquia', 283),
('Juan Pablo Peñaloza', 'Parroquia', 283),
-- Municipio Francisco de Miranda (Táchira) (id: 284)
('San José de Bolívar', 'Parroquia', 284),
-- Municipio García de Hevia (id: 285)
('La Fría', 'Parroquia', 285),
('Panamericano', 'Parroquia', 285),
('Colón', 'Parroquia', 285),
-- Municipio Guásimos (id: 286)
('Palmira', 'Parroquia', 286),
('San Juan del Recreo', 'Parroquia', 286),
-- Municipio Independencia (Táchira) (id: 287)
('Capacho Nuevo', 'Parroquia', 287),
('Juan Vicente Bolívar', 'Parroquia', 287),
('Chipare', 'Parroquia', 287),
-- Municipio Jáuregui (Táchira) (id: 288)
('La Grita', 'Parroquia', 288),
('Emilio Constantino Guerrero', 'Parroquia', 288),
('Monseñor Alejandro Fernández Feo', 'Parroquia', 288),
-- Municipio José María Vargas (id: 289)
('El Cobre', 'Parroquia', 289),
-- Municipio Junín (Táchira) (id: 290)
('Rubio', 'Parroquia', 290),
('Bramón', 'Parroquia', 290),
('Delicias', 'Parroquia', 290),
('La Petrólea', 'Parroquia', 290),
-- Municipio Libertad (Táchira) (id: 291)
('Capacho Viejo', 'Parroquia', 291),
('Cipriano Castro', 'Parroquia', 291),
('Manuel Felipe Rugeles', 'Parroquia', 291),
-- Municipio Libertador (Táchira) (id: 292)
('Abejales', 'Parroquia', 292),
('Doradas', 'Parroquia', 292),
('Emilio Constantino Guerrero', 'Parroquia', 292),
('San Joaquín de Navay', 'Parroquia', 292),
-- Municipio Lobatera (id: 293)
('Lobatera', 'Parroquia', 293),
('Constitución', 'Parroquia', 293),
-- Municipio Michelena (id: 294)
('Michelena', 'Parroquia', 294),
-- Municipio Panamericano (id: 295)
('Colón', 'Parroquia', 295),
('La Palmita', 'Parroquia', 295),
('San Joaquín', 'Parroquia', 295),
-- Municipio Pedro María Ureña (id: 296)
('Ureña', 'Parroquia', 296),
('Pedro María Ureña', 'Parroquia', 296),
('Tienditas', 'Parroquia', 296),
-- Municipio Rafael Urdaneta (id: 297)
('Delicias', 'Parroquia', 297),
('Monseñor Miguel Ignacio Briceño', 'Parroquia', 297),
-- Municipio Samuel Darío Maldonado (id: 298)
('La Tendida', 'Parroquia', 298),
('Boconó', 'Parroquia', 298),
('Boconó Abajo', 'Parroquia', 298),
('Hernández', 'Parroquia', 298),
-- Municipio San Cristóbal (id: 299)
('San Cristóbal', 'Parroquia', 299),
('Francisco Romero Lobo', 'Parroquia', 299),
('La Concordia', 'Parroquia', 299),
('Pedro María Morantes', 'Parroquia', 299),
('San Juan Bautista', 'Parroquia', 299),
('San Sebastián', 'Parroquia', 299),
-- Municipio Seboruco (id: 300)
('Seboruco', 'Parroquia', 300),
-- Municipio Simón Rodríguez (Táchira) (id: 301)
('San Simón', 'Parroquia', 301),
-- Municipio Sucre (Táchira) (id: 302)
('Colón', 'Parroquia', 302),
('La Palmita', 'Parroquia', 302),
('San José', 'Parroquia', 302),
('San Pablo', 'Parroquia', 302),
-- Municipio Torbes (id: 303)
('San Josecito', 'Parroquia', 303),
-- Municipio Uribante (id: 304)
('Pregonero', 'Parroquia', 304),
('Cárdenas', 'Parroquia', 304),
('Juan Pablo Peñaloza', 'Parroquia', 304),
('Potosí', 'Parroquia', 304),

-- Parroquias del Estado Trujillo
-- Municipio Andrés Bello (Trujillo) (id: 305)
('Santa Isabel', 'Parroquia', 305),
('Araguaney', 'Parroquia', 305),
('El Jaguito', 'Parroquia', 305),
-- Municipio Boconó (id: 306)
('Boconó', 'Parroquia', 306),
('El Carmen', 'Parroquia', 306),
('Mosquey', 'Parroquia', 306),
('Ayacucho', 'Parroquia', 306),
('Burbusay', 'Parroquia', 306),
('General Ribas', 'Parroquia', 306),
('Guaramacal', 'Parroquia', 306),
('La Vega de Guaramacal', 'Parroquia', 306),
('San Miguel', 'Parroquia', 306),
('San Rafael', 'Parroquia', 306),
('Monseñor Carrillo', 'Parroquia', 306),
-- Municipio Bolívar (Trujillo) (id: 307)
('Sabana Grande', 'Parroquia', 307),
('Granados', 'Parroquia', 307),
('Cheregüé', 'Parroquia', 307),
-- Municipio Candelaria (Trujillo) (id: 308)
('Chejendé', 'Parroquia', 308),
('Arnoldo Gabaldón', 'Parroquia', 308),
('Carrillo', 'Parroquia', 308),
('Candelaria', 'Parroquia', 308),
('La Mesa de Esnujaque', 'Parroquia', 308),
('San José de la Haticos', 'Parroquia', 308),
('Santa Elena', 'Parroquia', 308),
-- Municipio Carache (id: 309)
('Carache', 'Parroquia', 309),
('La Concepción', 'Parroquia', 309),
('Cuicas', 'Parroquia', 309),
('Panamericana', 'Parroquia', 309),
('Santa Cruz', 'Parroquia', 309),
-- Municipio Escuque (id: 310)
('Escuque', 'Parroquia', 310),
('La Unión', 'Parroquia', 310),
('Sabana Libre', 'Parroquia', 310),
('Santa Rita', 'Parroquia', 310),
-- Municipio José Felipe Márquez Cañizales (id: 311)
('El Socorro', 'Parroquia', 311),
('Los Caprichos', 'Parroquia', 311),
-- Municipio Juan Vicente Campo Elías (id: 312)
('Campo Elías', 'Parroquia', 312),
('Arnoldo Gabaldón', 'Parroquia', 312),
-- Municipio La Ceiba (id: 313)
('Santa Apolonia', 'Parroquia', 313),
('El Progreso', 'Parroquia', 313),
('La Ceiba', 'Parroquia', 313),
('Tres de Febrero', 'Parroquia', 313),
-- Municipio Miranda (Trujillo) (id: 314)
('El Dividive', 'Parroquia', 314),
('Agua Santa', 'Parroquia', 314),
('Agua Caliente', 'Parroquia', 314),
('Flor de Patria', 'Parroquia', 314),
('La Paz', 'Parroquia', 314),
-- Municipio Monte Carmelo (id: 315)
('Monte Carmelo', 'Parroquia', 315),
('Buena Vista', 'Parroquia', 315),
('Santa Cruz', 'Parroquia', 315),
-- Municipio Motatán (id: 316)
('Motatán', 'Parroquia', 316),
('Jalisco', 'Parroquia', 316),
('El Baño', 'Parroquia', 316),
-- Municipio Pampán (id: 317)
('Pampán', 'Parroquia', 317),
('Flor de Patria', 'Parroquia', 317),
('La Paz', 'Parroquia', 317),
('Santa Ana', 'Parroquia', 317),
-- Municipio Pampanito (id: 318)
('Pampanito', 'Parroquia', 318),
('La Concepción', 'Parroquia', 318),
('Santa Rosa', 'Parroquia', 318),
-- Municipio Rafael Rangel (id: 319)
('Betijoque', 'Parroquia', 319),
('José Gregorio Hernández', 'Parroquia', 319),
('La Pueblita', 'Parroquia', 319),
('Los Cedros', 'Parroquia', 319),
-- Municipio San Rafael de Carvajal (id: 320)
('Carvajal', 'Parroquia', 320),
('Campo Alegre', 'Parroquia', 320),
('Antonio Nicolás Briceño', 'Parroquia', 320),
('José Leonardo Suárez', 'Parroquia', 320),
-- Municipio Sucre (Trujillo) (id: 321)
('Sabana de Mendoza', 'Parroquia', 321),
('Junín', 'Parroquia', 321),
('La Esperanza', 'Parroquia', 321),
('Valmore Rodríguez', 'Parroquia', 321),
-- Municipio Trujillo (id: 322)
('Trujillo', 'Parroquia', 322),
('Andrés Linares', 'Parroquia', 322),
('Chiquinquirá', 'Parroquia', 322),
('Cruz Carrillo', 'Parroquia', 322),
('Matriz', 'Parroquia', 322),
('Tres Esquinas', 'Parroquia', 322),
('San Lorenzo', 'Parroquia', 322),
-- Municipio Urdaneta (Trujillo) (id: 323)
('La Quebrada', 'Parroquia', 323),
('Cabimbú', 'Parroquia', 323),
('Jajó', 'Parroquia', 323),
('La Mesa de Esnujaque', 'Parroquia', 323),
('Santiago', 'Parroquia', 323),
('Tuñame', 'Parroquia', 323),
('La Venta', 'Parroquia', 323),
-- Municipio Valera (id: 324)
('Valera', 'Parroquia', 324),
('La Beatriz', 'Parroquia', 324),
('La Puerta', 'Parroquia', 324),
('Mendoza', 'Parroquia', 324),
('San Luis', 'Parroquia', 324),
('Carvajal', 'Parroquia', 324),

-- Parroquias del Estado La Guaira (Vargas)
-- Municipio Vargas (id: 325)
('Caraballeda', 'Parroquia', 325),
('Carayaca', 'Parroquia', 325),
('Carlos Soublette', 'Parroquia', 325),
('Caruao', 'Parroquia', 325),
('Catia La Mar', 'Parroquia', 325),
('El Junko', 'Parroquia', 325),
('La Guaira', 'Parroquia', 325),
('Macuto', 'Parroquia', 325),
('Maiquetía', 'Parroquia', 325),
('Naiguatá', 'Parroquia', 325),
('Urimare', 'Parroquia', 325),

-- Parroquias del Estado Yaracuy
-- Municipio Arístides Bastidas (id: 326)
('San Pablo', 'Parroquia', 326),
-- Municipio Bolívar (Yaracuy) (id: 327)
('Aroa', 'Parroquia', 327),
-- Municipio Bruzual (Yaracuy) (id: 328)
('Chivacoa', 'Parroquia', 328),
('Campo Elías', 'Parroquia', 328),
-- Municipio Cocorote (id: 329)
('Cocorote', 'Parroquia', 329),
-- Municipio Independencia (Yaracuy) (id: 330)
('Independencia', 'Parroquia', 330),
('Cambural', 'Parroquia', 330),
-- Municipio José Antonio Páez (Yaracuy) (id: 331)
('Sabana de Parra', 'Parroquia', 331),
-- Municipio La Trinidad (Yaracuy) (id: 332)
('La Trinidad', 'Parroquia', 332),
-- Municipio Manuel Monge (id: 333)
('Yumare', 'Parroquia', 333),
-- Municipio Nirgua (id: 334)
('Nirgua', 'Parroquia', 334),
('Salom', 'Parroquia', 334),
('Temerla', 'Parroquia', 334),
-- Municipio Peña (id: 335)
('Yaritagua', 'Parroquia', 335),
('San Andrés', 'Parroquia', 335),
-- Municipio San Felipe (Yaracuy) (id: 336)
('San Felipe', 'Parroquia', 336),
('Albarico', 'Parroquia', 336),
('San Javier', 'Parroquia', 336),
('Marín', 'Parroquia', 336),
-- Municipio Sucre (Yaracuy) (id: 337)
('Guama', 'Parroquia', 337),
-- Municipio Urachiche (id: 338)
('Urachiche', 'Parroquia', 338),
-- Municipio Veroes (id: 339)
('Farriar', 'Parroquia', 339),
('El Guayabo', 'Parroquia', 339),

-- Parroquias del Estado Zulia
-- Municipio Almirante Padilla (id: 340)
('Isla de Toas', 'Parroquia', 340),
('Monagas', 'Parroquia', 340),
-- Municipio Baralt (id: 341)
('San Timoteo', 'Parroquia', 341),
('General Urdaneta', 'Parroquia', 341),
('Manuel Manrique', 'Parroquia', 341),
('Rafael María Baralt', 'Parroquia', 341),
('San Timoteo', 'Parroquia', 341),
('Tomás Oropeza', 'Parroquia', 341),
-- Municipio Cabimas (id: 342)
('Ambrosio', 'Parroquia', 342),
('Carmen Herrera', 'Parroquia', 342),
('La Rosa', 'Parroquia', 342),
('Jorge Hernández', 'Parroquia', 342),
('Punta Gorda', 'Parroquia', 342),
('Rómulo Betancourt', 'Parroquia', 342),
('San Benito', 'Parroquia', 342),
('Aristides Calvani', 'Parroquia', 342),
('Germán Ríos Linares', 'Parroquia', 342),
('Manuel Manrique', 'Parroquia', 342),
-- Municipio Catatumbo (id: 343)
('Encontrados', 'Parroquia', 343),
('Udón Pérez', 'Parroquia', 343),
-- Municipio Colón (Zulia) (id: 344)
('San Carlos del Zulia', 'Parroquia', 344),
('Santa Cruz del Zulia', 'Parroquia', 344),
('Santa Bárbara', 'Parroquia', 344),
('Moralito', 'Parroquia', 344),
('Carlos Quevedo', 'Parroquia', 344),
-- Municipio Francisco Javier Pulgar (id: 345)
('Pueblo Nuevo', 'Parroquia', 345),
('Simón Rodríguez', 'Parroquia', 345),
-- Municipio Guajira (id: 346)
('Sinamaica', 'Parroquia', 346),
('Alta Guajira', 'Parroquia', 346),
('Elías Sánchez Rubio', 'Parroquia', 346),
('Luis de Vicente', 'Parroquia', 346),
('San Rafael de Moján', 'Parroquia', 346),
('Las Parcelas', 'Parroquia', 346),
('Guajira', 'Parroquia', 346),
-- Municipio Jesús Enrique Lossada (id: 347)
('La Concepción', 'Parroquia', 347),
('San José', 'Parroquia', 347),
('Mariano Escobedo', 'Parroquia', 347),
-- Municipio Jesús María Semprún (id: 348)
('Casigua El Cubo', 'Parroquia', 348),
('Barí', 'Parroquia', 348),
-- Municipio La Cañada de Urdaneta (id: 349)
('Concepción', 'Parroquia', 349),
('Andrés Bello', 'Parroquia', 349),
('Chiquinquirá', 'Parroquia', 349),
('El Carmelo', 'Parroquia', 349),
('Potreritos', 'Parroquia', 349),
-- Municipio Lagunillas (id: 350)
('Ciudad Ojeda', 'Parroquia', 350),
('Alonso de Ojeda', 'Parroquia', 350),
('Campo Lara', 'Parroquia', 350),
('La Victoria', 'Parroquia', 350),
('Libertad', 'Parroquia', 350),
('Venezuela', 'Parroquia', 350),
('Eleazar López Contreras', 'Parroquia', 350),
-- Municipio Machiques de Perijá (id: 351)
('Machiques', 'Parroquia', 351),
('Bartolomé de las Casas', 'Parroquia', 351),
('Libertad', 'Parroquia', 351),
('Río Negro', 'Parroquia', 351),
('San José de Perijá', 'Parroquia', 351),
-- Municipio Mara (id: 352)
('San Rafael de Moján', 'Parroquia', 352),
('La Sierrita', 'Parroquia', 352),
('Las Parcelas', 'Parroquia', 352),
('Luis de Vicente', 'Parroquia', 352),
('Monseñor Marcos Sergio Godoy', 'Parroquia', 352),
('Ricaurte', 'Parroquia', 352),
('Tamare', 'Parroquia', 352),
-- Municipio Maracaibo (id: 353)
('Antonio Borjas Romero', 'Parroquia', 353),
('Cacique Mara', 'Parroquia', 353),
('Caracciolo Parra Pérez', 'Parroquia', 353),
('Chiquinquirá', 'Parroquia', 353),
('Coquivacoa', 'Parroquia', 353),
('Francisco Eugenio Bustamante', 'Parroquia', 353),
('Idelfonso Vásquez', 'Parroquia', 353),
('Juana de Ávila', 'Parroquia', 353),
('Luis Hurtado Higuera', 'Parroquia', 353),
('Manuel Dagnino', 'Parroquia', 353),
('Olegario Villalobos', 'Parroquia', 353),
('Raúl Leoni', 'Parroquia', 353),
('Santa Lucía', 'Parroquia', 353),
('Venancio Pulgar', 'Parroquia', 353),
('San Isidro', 'Parroquia', 353),
('Cristo de Aranza', 'Parroquia', 353),
-- Municipio Miranda (Zulia) (id: 354)
('Los Puertos de Altagracia', 'Parroquia', 354),
('Ana María Campos', 'Parroquia', 354),
('Farra', 'Parroquia', 354),
('San Antonio', 'Parroquia', 354),
('San José', 'Parroquia', 354),
('El Mene', 'Parroquia', 354),
('Altagracia', 'Parroquia', 354),
-- Municipio Rosario de Perijá (id: 355)
('La Villa del Rosario', 'Parroquia', 355),
('El Rosario', 'Parroquia', 355),
('Sixto Zambrano', 'Parroquia', 355),
-- Municipio San Francisco (id: 356)
('San Francisco', 'Parroquia', 356),
('El Bajo', 'Parroquia', 356),
('Domitila Flores', 'Parroquia', 356),
('Francisco Ochoa', 'Parroquia', 356),
('Los Cortijos', 'Parroquia', 356),
('Marcial Hernández', 'Parroquia', 356),
-- Municipio Santa Rita (Zulia) (id: 357)
('Santa Rita', 'Parroquia', 357),
('El Mene', 'Parroquia', 357),
('Pedro Lucas Urribarrí', 'Parroquia', 357),
('José Cenobio Urribarrí', 'Parroquia', 357),
-- Municipio Simón Bolívar (Zulia) (id: 358)
('Tía Juana', 'Parroquia', 358),
('Manuel Manrique', 'Parroquia', 358),
('San Isidro', 'Parroquia', 358),
-- Municipio Sucre (Zulia) (id: 359)
('Bobures', 'Parroquia', 359),
('Gibraltar', 'Parroquia', 359),
('Héctor Manuel Briceño', 'Parroquia', 359),
('Heriberto Arroyo', 'Parroquia', 359),
('La Gran Parroquia', 'Parroquia', 359),
('Monseñor Arturo Celestino Álvarez', 'Parroquia', 359),
('Rómulo Gallegos', 'Parroquia', 359),
-- Municipio Valmore Rodríguez (id: 360)
('Bachaquero', 'Parroquia', 360),
('Eleazar López Contreras', 'Parroquia', 360),
('La Victoria', 'Parroquia', 360);

/**
 * Inserts for rol table
 * Contains basic system roles
 */

INSERT INTO rol (nombre) VALUES
    ('Administrador'),
    ('Cliente'),
    ('Miembro'),
    ('Jefe de Compras'),
    ('Asistente de Compras'),
    ('Jefe de Pasillos'),
    ('Cajero'),
    ('Jefe de Recursos Humanos'),
    ('Auxiliar Recursos Humanos'),
    ('Jefe de Marketing');

INSERT INTO permiso (nombre, descripción) VALUES
/* Gestión de afiliacion */
('crear_afiliacion',   'Permite crear nuevas afiliaciones en el sistema'),
('editar_afiliacion',  'Permite modificar afiliaciones existentes'),
('eliminar_afiliacion','Permite eliminar afiliaciones del sistema'),
('leer_afiliacion',    'Permite ver las afiliaciones'),
/* Gestión de almacen */
('crear_almacen',      'Permite crear nuevos almacenes en el sistema'),
('editar_almacen',     'Permite modificar almacenes existentes'),
('eliminar_almacen',   'Permite eliminar almacenes del sistema'),
('leer_almacen',       'Permite ver los almacenes'),
/* Gestión de beneficio */
('crear_beneficio',    'Permite crear nuevos beneficios en el sistema'),
('editar_beneficio',   'Permite modificar beneficios existentes'),
('eliminar_beneficio', 'Permite eliminar beneficios del sistema'),
('leer_beneficio',     'Permite ver los beneficios'),
/* Gestión de beneficio_nomina */
('crear_beneficio_nomina',    'Permite crear relaciones beneficio-nómina'),
('editar_beneficio_nomina',   'Permite modificar relaciones beneficio-nómina'),
('eliminar_beneficio_nomina', 'Permite eliminar relaciones beneficio-nómina'),
('leer_beneficio_nomina',     'Permite ver las relaciones beneficio-nómina'),
/* Gestión de caracteristica */
('crear_caracteristica',   'Permite crear nuevas características'),
('editar_caracteristica',  'Permite modificar características existentes'),
('eliminar_caracteristica','Permite eliminar características'),
('leer_caracteristica',    'Permite ver las características'),
/* Gestión de cargo */
('crear_cargo',    'Permite crear nuevos cargos'),
('editar_cargo',   'Permite modificar cargos existentes'),
('eliminar_cargo', 'Permite eliminar cargos'),
('leer_cargo',     'Permite ver los cargos'),
/* Gestión de cerveza */
('crear_cerveza',    'Permite crear nuevas cervezas'),
('editar_cerveza',   'Permite modificar cervezas existentes'),
('eliminar_cerveza', 'Permite eliminar cervezas'),
('leer_cerveza',     'Permite ver las cervezas'),
/* Gestión de cerveza_caracteristica */
('crear_cerveza_caracteristica',    'Permite crear vínculos cerveza-característica'),
('editar_cerveza_caracteristica',   'Permite modificar vínculos cerveza-característica'),
('eliminar_cerveza_caracteristica', 'Permite eliminar vínculos cerveza-característica'),
('leer_cerveza_caracteristica',     'Permite ver los vínculos cerveza-característica'),
/* Gestión de cliente_juridico */
('crear_cliente_juridico',    'Permite crear clientes jurídicos'),
('editar_cliente_juridico',   'Permite modificar clientes jurídicos'),
('eliminar_cliente_juridico', 'Permite eliminar clientes jurídicos'),
('leer_cliente_juridico',     'Permite ver los clientes jurídicos'),
/* Gestión de cliente_metodo_pago */
('crear_cliente_metodo_pago',    'Permite registrar métodos de pago de clientes'),
('editar_cliente_metodo_pago',   'Permite modificar métodos de pago de clientes'),
('eliminar_cliente_metodo_pago', 'Permite eliminar métodos de pago de clientes'),
('leer_cliente_metodo_pago',     'Permite ver los métodos de pago de clientes'),
/* Gestión de cliente_natural */
('crear_cliente_natural',    'Permite crear clientes naturales'),
('editar_cliente_natural',   'Permite modificar clientes naturales'),
('eliminar_cliente_natural', 'Permite eliminar clientes naturales'),
('leer_cliente_natural',     'Permite ver los clientes naturales'),
/* Gestión de cliente_usuario */
('crear_cliente_usuario',    'Permite asociar clientes a usuarios'),
('editar_cliente_usuario',   'Permite modificar asociaciones cliente-usuario'),
('eliminar_cliente_usuario', 'Permite eliminar asociaciones cliente-usuario'),
('leer_cliente_usuario',     'Permite ver las asociaciones cliente-usuario'),
/* Gestión de color */
('crear_color',    'Permite crear colores'),
('editar_color',   'Permite modificar colores'),
('eliminar_color', 'Permite eliminar colores'),
('leer_color',     'Permite ver los colores'),
/* Gestión de correo */
('crear_correo',    'Permite registrar correos electrónicos'),
('editar_correo',   'Permite modificar correos electrónicos'),
('eliminar_correo', 'Permite eliminar correos electrónicos'),
('leer_correo',     'Permite ver los correos electrónicos'),
/* Gestión de departamento */
('crear_departamento',    'Permite crear departamentos'),
('editar_departamento',   'Permite modificar departamentos'),
('eliminar_departamento', 'Permite eliminar departamentos'),
('leer_departamento',     'Permite ver los departamentos'),
/* Gestión de descuento */
('crear_descuento',    'Permite crear descuentos de presentación'),
('editar_descuento',   'Permite modificar descuentos de presentación'),
('eliminar_descuento', 'Permite eliminar descuentos de presentación'),
('leer_descuento',     'Permite ver los descuentos de presentación'),
/* Gestión de detalle_evento */
('crear_detalle_evento',    'Permite registrar detalles de venta en eventos'),
('editar_detalle_evento',   'Permite modificar detalles de venta en eventos'),
('eliminar_detalle_evento', 'Permite eliminar detalles de venta en eventos'),
('leer_detalle_evento',     'Permite ver los detalles de venta en eventos'),
/* Gestión de detalle_presentacion */
('crear_detalle_presentacion',    'Permite registrar detalles de venta de presentaciones'),
('editar_detalle_presentacion',   'Permite modificar detalles de venta de presentaciones'),
('eliminar_detalle_presentacion', 'Permite eliminar detalles de venta de presentaciones'),
('leer_detalle_presentacion',     'Permite ver los detalles de venta de presentaciones'),
/* Gestión de empleado */
('crear_empleado',    'Permite crear empleados'),
('editar_empleado',   'Permite modificar empleados'),
('eliminar_empleado', 'Permite eliminar empleados'),
('leer_empleado',     'Permite ver los empleados'),
/* Gestión de empleado_usuario */
('crear_empleado_usuario',    'Permite vincular empleados a usuarios'),
('editar_empleado_usuario',   'Permite modificar vínculos empleado-usuario'),
('eliminar_empleado_usuario', 'Permite eliminar vínculos empleado-usuario'),
('leer_empleado_usuario',     'Permite ver los vínculos empleado-usuario'),
/* Gestión de evento */
('crear_evento',    'Permite crear eventos'),
('editar_evento',   'Permite modificar eventos'),
('eliminar_evento', 'Permite eliminar eventos'),
('leer_evento',     'Permite ver los eventos'),
/* Gestión de evento_cliente */
('crear_evento_cliente',    'Permite asociar clientes a eventos'),
('editar_evento_cliente',   'Permite modificar asociaciones evento-cliente'),
('eliminar_evento_cliente', 'Permite eliminar asociaciones evento-cliente'),
('leer_evento_cliente',     'Permite ver las asociaciones evento-cliente'),
/* Gestión de horario */
('crear_horario',    'Permite crear horarios'),
('editar_horario',   'Permite modificar horarios'),
('eliminar_horario', 'Permite eliminar horarios'),
('leer_horario',     'Permite ver los horarios'),
/* Gestión de horario_nomina */
('crear_horario_nomina',    'Permite vincular horarios a nómina'),
('editar_horario_nomina',   'Permite modificar vínculos horario-nómina'),
('eliminar_horario_nomina', 'Permite eliminar vínculos horario-nómina'),
('leer_horario_nomina',     'Permite ver los vínculos horario-nómina'),
/* Gestión de ingrediente */
('crear_ingrediente',    'Permite crear ingredientes'),
('editar_ingrediente',   'Permite modificar ingredientes'),
('eliminar_ingrediente', 'Permite eliminar ingredientes'),
('leer_ingrediente',     'Permite ver los ingredientes'),
/* Gestión de inventario */
('crear_inventario',    'Permite crear registros de inventario'),
('editar_inventario',   'Permite modificar registros de inventario'),
('eliminar_inventario', 'Permite eliminar registros de inventario'),
('leer_inventario',     'Permite ver el inventario'),
/* Gestión de invitado */
('crear_invitado',    'Permite crear invitados'),
('editar_invitado',   'Permite modificar invitados'),
('eliminar_invitado', 'Permite eliminar invitados'),
('leer_invitado',     'Permite ver los invitados'),
/* Gestión de invitado_evento */
('crear_invitado_evento',    'Permite registrar asistencia de invitados a eventos'),
('editar_invitado_evento',   'Permite modificar asistencia de invitados a eventos'),
('eliminar_invitado_evento', 'Permite eliminar asistencia de invitados a eventos'),
('leer_invitado_evento',     'Permite ver la asistencia de invitados a eventos'),
/* Gestión de lugar */
('crear_lugar',    'Permite crear lugares'),
('editar_lugar',   'Permite modificar lugares'),
('eliminar_lugar', 'Permite eliminar lugares'),
('leer_lugar',     'Permite ver los lugares'),
/* Gestión de lugar_tienda */
('crear_lugar_tienda',    'Permite crear zonas internas de tienda'),
('editar_lugar_tienda',   'Permite modificar zonas internas de tienda'),
('eliminar_lugar_tienda', 'Permite eliminar zonas internas de tienda'),
('leer_lugar_tienda',     'Permite ver las zonas internas de tienda'),
/* Gestión de lugar_tienda_inventario */
('crear_lugar_tienda_inventario',    'Permite asignar inventario a zonas de tienda'),
('editar_lugar_tienda_inventario',   'Permite modificar asignaciones de inventario en tienda'),
('eliminar_lugar_tienda_inventario', 'Permite eliminar asignaciones de inventario en tienda'),
('leer_lugar_tienda_inventario',     'Permite ver las asignaciones de inventario en tienda'),
/* Gestión de mensualidad */
('crear_mensualidad',    'Permite crear mensualidades'),
('editar_mensualidad',   'Permite modificar mensualidades'),
('eliminar_mensualidad', 'Permite eliminar mensualidades'),
('leer_mensualidad',     'Permite ver las mensualidades'),
/* Gestión de metodo_pago */
('crear_metodo_pago',    'Permite crear métodos de pago'),
('editar_metodo_pago',   'Permite modificar métodos de pago'),
('eliminar_metodo_pago', 'Permite eliminar métodos de pago'),
('leer_metodo_pago',     'Permite ver los métodos de pago'),
/* Gestión de miembro */
('crear_miembro',    'Permite crear miembros/proveedores'),
('editar_miembro',   'Permite modificar miembros/proveedores'),
('eliminar_miembro', 'Permite eliminar miembros/proveedores'),
('leer_miembro',     'Permite ver los miembros/proveedores'),
/* Gestión de miembro_metodo_pago */
('crear_miembro_metodo_pago',    'Permite asignar métodos de pago a miembros'),
('editar_miembro_metodo_pago',   'Permite modificar métodos de pago de miembros'),
('eliminar_miembro_metodo_pago', 'Permite eliminar métodos de pago de miembros'),
('leer_miembro_metodo_pago',     'Permite ver los métodos de pago de miembros'),
/* Gestión de miembro_presentacion_cerveza */
('crear_miembro_presentacion_cerveza',    'Permite asociar presentaciones a miembros'),
('editar_miembro_presentacion_cerveza',   'Permite modificar asociaciones presentaciones-miembros'),
('eliminar_miembro_presentacion_cerveza', 'Permite eliminar asociaciones presentaciones-miembros'),
('leer_miembro_presentacion_cerveza',     'Permite ver las asociaciones presentaciones-miembros'),
/* Gestión de miembro_usuario */
('crear_miembro_usuario',    'Permite vincular miembros a usuarios'),
('editar_miembro_usuario',   'Permite modificar vínculos miembro-usuario'),
('eliminar_miembro_usuario', 'Permite eliminar vínculos miembro-usuario'),
('leer_miembro_usuario',     'Permite ver los vínculos miembro-usuario'),
/* Gestión de nomina */
('crear_nomina',    'Permite crear nóminas'),
('editar_nomina',   'Permite modificar nóminas'),
('eliminar_nomina', 'Permite eliminar nóminas'),
('leer_nomina',     'Permite ver las nóminas'),
/* Gestión de orden_de_compra */
('crear_orden_de_compra',    'Permite crear órdenes de compra'),
('editar_orden_de_compra',   'Permite modificar órdenes de compra'),
('eliminar_orden_de_compra', 'Permite eliminar órdenes de compra'),
('leer_orden_de_compra',     'Permite ver las órdenes de compra'),
/* Gestión de orden_de_compra_proveedor */
('leer_orden_de_compra_proveedor',     'Permite ver las órdenes de compra de proveedores'),
('editar_orden_de_compra_proveedor',   'Permite modificar las órdenes de compra de proveedores'),
/* Gestión de orden_de_reposicion */
('crear_orden_de_reposicion',    'Permite crear órdenes de reposición'),
('editar_orden_de_reposicion',   'Permite modificar órdenes de reposición'),
('eliminar_orden_de_reposicion', 'Permite eliminar órdenes de reposición'),
('leer_orden_de_reposicion',     'Permite ver las órdenes de reposición'),
/* Gestión de pago */
('crear_pago',    'Permite registrar pagos'),
('editar_pago',   'Permite modificar pagos'),
('eliminar_pago', 'Permite eliminar pagos'),
('leer_pago',     'Permite ver los pagos'),
/* Gestión de periodo_descuento */
('crear_periodo_descuento',    'Permite crear periodos de descuento'),
('editar_periodo_descuento',   'Permite modificar periodos de descuento'),
('eliminar_periodo_descuento', 'Permite eliminar periodos de descuento'),
('leer_periodo_descuento',     'Permite ver los periodos de descuento'),
/* Gestión de permiso */
('crear_permiso',    'Permite crear permisos'),
('editar_permiso',   'Permite modificar permisos'),
('eliminar_permiso', 'Permite eliminar permisos'),
('leer_permiso',     'Permite ver los permisos'),
/* Gestión de permiso_rol */
('crear_permiso_rol',    'Permite asignar permisos a roles'),
('editar_permiso_rol',   'Permite modificar permisos de roles'),
('eliminar_permiso_rol', 'Permite eliminar permisos de roles'),
('leer_permiso_rol',     'Permite ver los permisos asignados a roles'),
/* Gestión de persona_contacto */
('crear_persona_contacto',    'Permite crear personas contacto'),
('editar_persona_contacto',   'Permite modificar personas contacto'),
('eliminar_persona_contacto', 'Permite eliminar personas contacto'),
('leer_persona_contacto',     'Permite ver las personas contacto'),
/* Gestión de presentacion */
('crear_presentacion',    'Permite crear presentaciones de producto'),
('editar_presentacion',   'Permite modificar presentaciones de producto'),
('eliminar_presentacion', 'Permite eliminar presentaciones de producto'),
('leer_presentacion',     'Permite ver las presentaciones de producto'),
/* Gestión de presentacion_cerveza */
('crear_presentacion_cerveza',    'Permite vincular cervezas a presentaciones'),
('editar_presentacion_cerveza',   'Permite modificar vínculos cerveza-presentación'),
('eliminar_presentacion_cerveza', 'Permite eliminar vínculos cerveza-presentación'),
('leer_presentacion_cerveza',     'Permite ver los vínculos cerveza-presentación'),
/* Gestión de registro_biometrico */
('crear_registro_biometrico',    'Permite crear registros biométricos'),
('editar_registro_biometrico',   'Permite modificar registros biométricos'),
('eliminar_registro_biometrico', 'Permite eliminar registros biométricos'),
('leer_registro_biometrico',     'Permite ver los registros biométricos'),
/* Gestión de rol */
('crear_rol',    'Permite crear roles'),
('editar_rol',   'Permite modificar roles'),
('eliminar_rol', 'Permite eliminar roles'),
('leer_rol',     'Permite ver los roles'),
/* Gestión de status */
('crear_status',    'Permite crear estados'),
('editar_status',   'Permite modificar estados'),
('eliminar_status', 'Permite eliminar estados'),
('leer_status',     'Permite ver los estados'),
/* Gestión de status_mensualidad */
('crear_status_mensualidad',    'Permite crear estados de mensualidad'),
('editar_status_mensualidad',   'Permite modificar estados de mensualidad'),
('eliminar_status_mensualidad', 'Permite eliminar estados de mensualidad'),
('leer_status_mensualidad',     'Permite ver los estados de mensualidad'),
/* Gestión de status_orden */
('crear_status_orden',    'Permite crear estados de orden'),
('editar_status_orden',   'Permite modificar estados de orden'),
('eliminar_status_orden', 'Permite eliminar estados de orden'),
('leer_status_orden',     'Permite ver los estados de orden'),
/* Gestión de status_venta */
('crear_status_venta',    'Permite crear estados de venta'),
('editar_status_venta',   'Permite modificar estados de venta'),
('eliminar_status_venta', 'Permite eliminar estados de venta'),
('leer_status_venta',     'Permite ver los estados de venta'),
/* Gestión de stock_miembro */
('crear_stock_miembro',    'Permite registrar stock de miembros'),
('editar_stock_miembro',   'Permite modificar stock de miembros'),
('eliminar_stock_miembro', 'Permite eliminar stock de miembros'),
('leer_stock_miembro',     'Permite ver el stock de miembros'),
/* Gestión de tasa */
('crear_tasa',    'Permite crear tasas de cambio'),
('editar_tasa',   'Permite modificar tasas de cambio'),
('eliminar_tasa', 'Permite eliminar tasas de cambio'),
('leer_tasa',     'Permite ver las tasas de cambio'),
/* Gestión de telefono */
('crear_telefono',    'Permite registrar teléfonos'),
('editar_telefono',   'Permite modificar teléfonos'),
('eliminar_telefono', 'Permite eliminar teléfonos'),
('leer_telefono',     'Permite ver los teléfonos'),
/* Gestión de tienda_fisica */
('crear_tienda_fisica',    'Permite crear tiendas físicas'),
('editar_tienda_fisica',   'Permite modificar tiendas físicas'),
('eliminar_tienda_fisica', 'Permite eliminar tiendas físicas'),
('leer_tienda_fisica',     'Permite ver las tiendas físicas'),
/* Gestión de tienda_web */
('crear_tienda_web',    'Permite crear tiendas web'),
('editar_tienda_web',   'Permite modificar tiendas web'),
('eliminar_tienda_web', 'Permite eliminar tiendas web'),
('leer_tienda_web',     'Permite ver las tiendas web'),
/* Gestión de tipo_cerveza */
('crear_tipo_cerveza',    'Permite crear tipos de cerveza'),
('editar_tipo_cerveza',   'Permite modificar tipos de cerveza'),
('eliminar_tipo_cerveza', 'Permite eliminar tipos de cerveza'),
('leer_tipo_cerveza',     'Permite ver los tipos de cerveza'),
/* Gestión de tipo_cerveza_ingrediente */
('crear_tipo_cerveza_ingrediente',    'Permite asociar ingredientes a tipos de cerveza'),
('editar_tipo_cerveza_ingrediente',   'Permite modificar asociaciones tipo-cerveza-ingrediente'),
('eliminar_tipo_cerveza_ingrediente', 'Permite eliminar asociaciones tipo-cerveza-ingrediente'),
('leer_tipo_cerveza_ingrediente',     'Permite ver las asociaciones tipo-cerveza-ingrediente'),
/* Gestión de tipo_evento */
('crear_tipo_evento',    'Permite crear tipos de evento'),
('editar_tipo_evento',   'Permite modificar tipos de evento'),
('eliminar_tipo_evento', 'Permite eliminar tipos de evento'),
('leer_tipo_evento',     'Permite ver los tipos de evento'),
/* Gestión de tipo_invitado */
('crear_tipo_invitado',    'Permite crear tipos de invitado'),
('editar_tipo_invitado',   'Permite modificar tipos de invitado'),
('eliminar_tipo_invitado', 'Permite eliminar tipos de invitado'),
('leer_tipo_invitado',     'Permite ver los tipos de invitado'),
/* Gestión de usuario */
('crear_usuario',    'Permite crear usuarios'),
('editar_usuario',   'Permite modificar usuarios'),
('eliminar_usuario', 'Permite eliminar usuarios'),
('leer_usuario',     'Permite ver los usuarios'),
/* Gestión de vacacion */
('crear_vacacion',    'Permite registrar vacaciones'),
('editar_vacacion',   'Permite modificar vacaciones'),
('eliminar_vacacion', 'Permite eliminar vacaciones'),
('leer_vacacion',     'Permite ver las vacaciones'),
/* Gestión de venta */
('crear_venta',    'Permite crear ventas'),
('editar_venta',   'Permite modificar ventas'),
('eliminar_venta', 'Permite eliminar ventas'),
('leer_venta',     'Permite ver las ventas'),
/* Gestión de venta_evento */
('crear_venta_evento',    'Permite crear ventas en eventos'),
('editar_venta_evento',   'Permite modificar ventas en eventos'),
('eliminar_venta_evento', 'Permite eliminar ventas en eventos'),
('leer_venta_evento',     'Permite ver las ventas en eventos'),
-- Reportes
('crear_reportes', 'Permite crear reportes'),
('leer_reportes', 'Permite ver los reportes de ventas'),
('editar_reportes', 'Permite modificar los reportes de ventas'),
('eliminar_reportes', 'Permite eliminar los reportes de ventas');



    
-- Administrador gets all permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Administrador'), p.id 
FROM permiso p;


-- Cliente gets minimal permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Cliente'), p.id 
FROM permiso p
WHERE p.nombre IN ('crear_venta', 'crear_venta_evento', 'leer_presentacion_cerveza');

-- Miembro gets member-specific permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Miembro'), p.id 
FROM permiso p
WHERE p.nombre IN ('leer_orden_de_compra_proveedor', 'editar_orden_de_compra_proveedor');

-- Jefe de Compras gets purchase management permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Jefe de Compras'), p.id 
FROM permiso p
WHERE p.nombre IN (
    'leer_orden_de_compra',
    'editar_orden_de_compra',
    'crear_orden_de_compra',
    'eliminar_orden_de_compra',
    'leer_inventario',
    'editar_inventario',
    'crear_inventario',
    'eliminar_inventario'
);

-- Asistente de Compras gets limited purchase permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Asistente de Compras'), p.id 
FROM permiso p
WHERE p.nombre IN (
    'leer_orden_de_compra',
    'editar_orden_de_compra'
    'leer_inventario',
    'editar_inventario'
);

-- Jefe de Pasillos gets aisle management permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Jefe de Pasillos'), p.id 
FROM permiso p
WHERE p.nombre IN (
    'leer_orden_de_reposicion',
    'editar_orden_de_reposicion'
    'crear_orden_de_reposicion'
    'eliminar_orden_de_reposicion',
    'leer_lugar_tienda_inventario',
    'editar_lugar_tienda_inventario',
    'crear_lugar_tienda_inventario',
    'eliminar_lugar_tienda_inventario',
    'leer_inventario',
    'editar_inventario',
    'crear_inventario',
    'eliminar_inventario'
);

-- Cajero gets sales-related permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Cajero'), p.id 
FROM permiso p
WHERE p.nombre IN (
    'crear_venta', 'crear_venta_evento', 'leer_presentacion_cerveza', 'leer_inventario', 'leer_lugar_tienda_inventario'
);

-- Jefe de Recursos Humanos gets HR management permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Jefe de Recursos Humanos'), p.id 
FROM permiso p
WHERE p.nombre IN (
    'crear_empleado',
    'editar_empleado',
    'eliminar_empleado',
    'leer_empleado',
    'crear_nomina',
    'editar_nomina',
    'eliminar_nomina',
    'leer_nomina',
    'crear_cargo',
    'editar_cargo',
    'eliminar_cargo',
    'leer_cargo',
    'crear_departamento',
    'editar_departamento',
    'eliminar_departamento',
    'leer_departamento',
    'crear_beneficio',
    'editar_beneficio',
    'eliminar_beneficio',
    'leer_beneficio',
    'crear_vacacion',
    'editar_vacacion',
    'eliminar_vacacion',
    'leer_vacacion',
    'leer_usuario'
);

-- Auxiliar de Recursos Humanos gets limited HR permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Auxiliar Recursos Humanos'), p.id 
FROM permiso p
WHERE p.nombre IN (
    'leer_empleado',
    'leer_nomina',
    'leer_cargo',
    'leer_departamento',
    'leer_beneficio',
    'leer_vacacion',
    'crear_registro_biometrico',
    'editar_registro_biometrico',
    'leer_registro_biometrico',
    'leer_usuario'
);

-- Jefe de Marketing gets marketing management permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Jefe de Marketing'), p.id 
FROM permiso p
WHERE p.nombre IN (
    'crear_evento',
    'editar_evento',
    'eliminar_evento',
    'leer_evento',
    'crear_cliente_natural',
    'editar_cliente_natural',
    'leer_cliente_natural',
    'crear_cliente_juridico',
    'editar_cliente_juridico',
    'leer_cliente_juridico',
    'leer_venta',
    'leer_usuario',
    'crear_descuento',
    'editar_descuento',
    'eliminar_descuento',
    'leer_descuento'
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
    fk_cliente_juridico
) VALUES
    (11223344, 'V', 'Pedro', 'González', 'José', 'Martínez', 123456789, 'J', NULL),  -- Member contact
    (44332211, 'V', 'Ana', 'López', 'María', 'Sánchez', NULL, NULL, 1),              -- Legal client contact
    (22334455, 'V', 'Ricardo', 'Blanco', 'Alberto', 'Pérez', 234567890, 'J', NULL),  -- Delta Distrib contact
    (33445566, 'E', 'Sofía', 'Ramírez', 'Valentina', 'Mendoza', 345678901, 'V', NULL),     -- Omega Imports contact
    (44556677, 'V', 'Daniel', 'Suárez', 'Roberto', 'Núñez', 456789012, 'J', NULL),        -- Epsilon Trade contact
    (55667788, 'V', 'Gabriela', 'Fernández', 'Patricia', 'Silva', NULL, NULL, 2),             -- Global Services contact
    (66778899, 'E', 'Alejandro', 'Mendoza', 'Felipe', 'Rivas', NULL, NULL, 3),           -- Constructora Delta contact
    (77889900, 'V', 'Valeria', 'Paredes', 'Camila', 'Brito', NULL, NULL, 4),          -- Distribuidora Omega contact
    (88990011, 'V', 'Eduardo', 'Rivas', 'Manuel', 'Quintero', NULL, NULL, 5),       -- Legal client 5 contact
    (99001122, 'E', 'Carolina', 'Brito', 'Daniela', 'Paredes', NULL, NULL, 6),              -- Legal client 6 contact
    (00112233, 'V', 'Roberto', 'Quintero', 'Alberto', 'Blanco', NULL, NULL, 7),           -- Legal client 7 contact
    (11223300, 'V', 'Daniela', 'Silva', 'Gabriela', 'Fernández', NULL, NULL, 8);               -- Legal client 8 contact 

/**
 * Inserts for correo table
 * Contains example email addresses for members and users
 */

INSERT INTO correo (
    dirección_correo,
    fk_miembro_1,
    fk_miembro_2,
    fk_persona_contacto
) VALUES
    -- Member company emails
    ('contacto@abc.com', 123456789, 'J', NULL),
    ('contacto@xyz.com', 987654321, 'V', NULL),
    ('distribucion@deltadistrib.com', 234567890, 'J', NULL),
    ('importaciones@omegaimports.com', 345678901, 'V', NULL),
    ('comercial@epsilontrade.com', 456789012, 'J', NULL),
    ('ventas@betastores.com', 567890123, 'V', NULL),
    ('distribucion@gammadist.com', 678901234, 'J', NULL),
    ('ventas@sigmacom.com', 789012345, 'V', NULL),
    ('importaciones@thetaimports.com', 890123456, 'J', NULL),
    ('ventas@lambdastores.com', 901234567, 'V', NULL),
    ('distribucion@zetadist.com', 12345678, 'J', NULL),
    ('ventas@omegacom.com', 123456780, 'V', NULL),
    ('omega-importaciones@omegacom.com', 123456780, 'V', NULL),
    ('contacto@alfaindustrial.com', 111222333, 'J', NULL),
    ('contacto@bravocomercial.com', 444555666, 'V', NULL),
    ('contacto@charliedist.com', 777888999, 'J', NULL),
    ('contacto@deltaimports.com', 111333555, 'V', NULL),
    ('contacto@echostores.com', 222444666, 'J', NULL),
    ('contacto@foxtrrottrade.com', 333555777, 'V', NULL),
    ('contacto@golfdist.com', 444666888, 'J', NULL),
    ('contacto@hotelimports.com', 555777999, 'V', NULL),
    ('contacto@indiacorp.com', 666888000, 'J', NULL),

    -- Additional emails for user (not members)
    ('admin@acaucab.com', NULL, NULL, NULL),
    ('empleados@acaucab.com', NULL, NULL, NULL),
    ('clientes@acaucab.com', NULL, NULL, NULL),
    ('miembros@acaucab.com', NULL, NULL, NULL),
    ('maria.rodriguez@acaucab.com', NULL, NULL, NULL),
    ('pedro.garcia@acaucab.com', NULL, NULL, NULL),
    ('ana.martinez@acaucab.com', NULL, NULL, NULL),
    ('carlos.lopez@acaucab.com', NULL, NULL, NULL),
    ('laura.sanchez@acaucab.com', NULL, NULL, NULL),
    ('roberto.torres@acaucab.com', NULL, NULL, NULL),
    ('sofia.diaz@acaucab.com', NULL, NULL, NULL),
    ('miguel.morales@acaucab.com', NULL, NULL, NULL),
    ('carmen.ortiz@acaucab.com', NULL, NULL, NULL),
    
    -- Emails para persona_contacto
    ('contacto@deltadistrib.com', NULL, NULL, 1),
    ('contacto@omegaimports.com', NULL, NULL, 2),
    ('contacto@epsilontrade.com', NULL, NULL, 3),
    ('contacto@betastores.com', NULL, NULL, 4),
    ('contacto@gammadist.com', NULL, NULL, 5),
    ('contacto@sigmacom.com', NULL, NULL, 6),

    -- Emails for client users
    ('cliente.natural.2@acaucab.com', NULL, NULL, NULL),
    ('cliente.natural.3@acaucab.com', NULL, NULL, NULL),
    ('cliente.natural.4@acaucab.com', NULL, NULL, NULL),
    ('cliente.natural.5@acaucab.com', NULL, NULL, NULL),
    ('cliente.natural.6@acaucab.com', NULL, NULL, NULL),
    ('cliente.juridico.1@acaucab.com', NULL, NULL, NULL),
    ('cliente.juridico.2@acaucab.com', NULL, NULL, NULL),
    ('cliente.juridico.3@acaucab.com', NULL, NULL, NULL),
    ('cliente.juridico.4@acaucab.com', NULL, NULL, NULL),
    ('cliente.juridico.5@acaucab.com', NULL, NULL, NULL),
    ('cliente.juridico.6@acaucab.com', NULL, NULL, NULL);

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
    ('admin123', 1, 23),
    
    -- Member company users (all with role 3 - Miembro)
    ('abc2024', 3, 1),
    ('xyz2024', 3, 2),
    ('delta2024', 3, 3),
    ('omega2024', 3, 4),
    ('epsilon2024', 3, 5),
    ('beta2024', 3, 6),
    ('gamma2024', 3, 7),
    ('sigma2024', 3, 8),
    ('theta2024', 3, 9),
    ('lambda2024', 3, 10),
    ('zeta2024', 3, 11),
    ('omegacom2024', 3, 12),
    ('alfa2024', 3, 14),
    ('bravo2024', 3, 15),
    ('charlie2024', 3, 16),
    ('deltaimp2024', 3, 17),
    ('echo2024', 3, 18),
    ('foxtrot2024', 3, 19),
    ('golf2024', 3, 20),
    ('hotel2024', 3, 21),
    ('india2024', 3, 22),

    -- Employee users
    ('maria2024', 7, 27),
    ('pedro2024', 8, 28),
    ('ana2024', 9, 29),
    ('carlos2024', 7, 30),
    ('laura2024', 10, 31),
    ('roberto2024', 9, 32),
    ('sofia2024', 9, 33),
    ('miguel2024', 4, 34), 
    ('carmen2024', 6, 35),
    
    -- Users for clients
    ('cliente_natural_2', 2, 42),
    ('cliente_natural_3', 2, 43),
    ('cliente_natural_4', 2, 44),
    ('cliente_natural_5', 2, 45),
    ('cliente_natural_6', 2, 46),
    ('cliente_juridico_1', 2, 47),
    ('cliente_juridico_2', 2, 48),
    ('cliente_juridico_3', 2, 49),
    ('cliente_juridico_4', 2, 50),
    ('cliente_juridico_5', 2, 51),
    ('cliente_juridico_6', 2, 52);

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
    (NULL, 3, 1),
    (NULL, 32, 2),
    (NULL, 33, 3),
    (NULL, 34, 4),
    (NULL, 35, 5),
    (NULL, 36, 6),
    
    -- Legal clients
    (1, 37, NULL),
    (2, 38, NULL),
    (3, 39, NULL),
    (4, 40, NULL),
    (5, 41, NULL),
    (6, 42, NULL);

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
    fk_cliente_natural,
    fk_persona_contacto
) VALUES
    (212, 5551234, 123456789, 'J', NULL, NULL, NULL, NULL),    -- Member phone
    (212, 5555678, NULL, NULL, NULL, 1, NULL, NULL),           -- Legal client phone
    (212, 5559012, NULL, NULL, NULL, NULL, 1, NULL),           -- Natural client phone
    (212, 5553456, NULL, NULL, 1, NULL, NULL, NULL),           -- Employee phone
    
    (412, 1234567, 234567890, 'J', NULL, NULL, NULL, NULL),    -- Delta Distrib
    (414, 2345678, 345678901, 'V', NULL, NULL, NULL, NULL),    -- Omega Imports
    (424, 3456789, 456789012, 'J', NULL, NULL, NULL, NULL),    -- Epsilon Trade
    
    (412, 4567890, NULL, NULL, NULL, 2, NULL, NULL),           -- Global Services
    (414, 5678901, NULL, NULL, NULL, 3, NULL, NULL),           -- Constructora Delta
    (424, 6789012, NULL, NULL, NULL, 4, NULL, NULL),           -- Distribuidora Omega
    
    
    (412, 7890123, NULL, NULL, NULL, NULL, 2, NULL),           -- Natural client 2
    (414, 8901234, NULL, NULL, NULL, NULL, 3, NULL),           -- Natural client 3
    (424, 9012345, NULL, NULL, NULL, NULL, 4, NULL),           -- Natural client 4
 
    (412, 0123456, NULL, NULL, 2, NULL, NULL, NULL),           -- Employee 2
    (414, 1234567, NULL, NULL, 3, NULL, NULL, NULL),           -- Employee 3
    (424, 2345678, NULL, NULL, 4, NULL, NULL, NULL),           -- Employee 4
    (412, 3456789, NULL, NULL, 5, NULL, NULL, NULL),           -- Employee 5 

    -- Telefonos para persona_contacto
    (212, 5559876, NULL, NULL, NULL, NULL, NULL, 1),
    (212, 5558765, NULL, NULL, NULL, NULL, NULL, 2),
    (212, 5557654, NULL, NULL, NULL, NULL, NULL, 3),
    (212, 5556543, NULL, NULL, NULL, NULL, NULL, 4),
    (412, 9876543, NULL, NULL, NULL, NULL, NULL, 5),
    (414, 8765432, NULL, NULL, NULL, NULL, NULL, 6);

/**
 * Inserts for miembro_usuario table
 * Links members with their respective users
 */

INSERT INTO miembro_usuario (
    fk_usuario,
    fk_miembro_1,
    fk_miembro_2
) VALUES
    (2, 123456789, 'J'),
    (3, 987654321, 'V'),
    (4, 234567890, 'J'),
    (5, 345678901, 'V'),
    (6, 456789012, 'J'),
    (7, 567890123, 'V'),
    (8, 678901234, 'J'),
    (9, 789012345, 'V'),
    (10, 890123456, 'J'),
    (11, 901234567, 'V'),
    (12, 12345678, 'J'),
    (13, 123456780, 'V'),
    (14, 111222333, 'J'),
    (15, 444555666, 'V'),
    (16, 777888999, 'J'),
    (17, 111333555, 'V'),
    (18, 222444666, 'J'),
    (19, 333555777, 'V'),
    (20, 444666888, 'J'),
    (21, 555777999, 'V'),
    (22, 666888000, 'J');


/**
 * Inserts for empleado_usuario table
 * Links employees with their respective users
 */

INSERT INTO empleado_usuario (
    fk_empleado,
    fk_usuario
) VALUES
    (1, 2),     -- Links employee 1 (Juan Pérez) with user 2 (employee user)
    (2, 23),    -- Links employee 2 (María Rodríguez) with user 15
    (3, 24),    -- Links employee 3 (Pedro García) with user 16
    (4, 25),    -- Links employee 4 (Ana Martínez) with user 17
    (5, 26),    -- Links employee 5 (Carlos López) with user 18
    (6, 27),    -- Links employee 6 (Laura Sánchez) with user 19
    (7, 28),    -- Links employee 7 (Roberto Torres) with user 20
    (8, 29),    -- Links employee 8 (Sofía Díaz) with user 21
    (9, 30),    -- Links employee 9 (Miguel Morales) with user 22
    (10, 31);   -- Links employee 10 (Carmen Ortiz) with user 23 

INSERT INTO color (srm, cod_hexadecimal) VALUES
(2, '#F3F993'),   -- Pale lager, Witbier, Pilsener, Berliner Weisse
(3, '#F5F75C'),   -- Maibock, Blonde Ale
(4, '#F6F513'),   -- Weissbier
(6, '#EAE615'),   -- American Pale Ale, India Pale Ale
(8, '#E0D01B'),   -- Weissbier, Saison
(10, '#D5BC26'),  -- English Bitter, ESB
(13, '#CDAA37'),  -- Bière de Garde, Double IPA
(17, '#C1963C'),  -- Dark lager, Vienna lager, Märzen, Amber Ale
(20, '#BE8C3A'),  -- Brown Ale, Bock, Dunkel, Dunkelweizen
(24, '#BE823A'),  -- Irish Dry Stout, Doppelbock, Porter
(29, '#8B4513'),  -- Stout
(35, '#654321'),  -- Foreign Stout, Baltic Porter
(40, '#2F1B14');  -- Imperial Stout

INSERT INTO tipo_cerveza (id,nombre,fk_tipo_cerveza,fk_color_superior,fk_color_inferior) VALUES
(1,'Lager',NULL,8,2),
(2,'Ale',NULL,13,2),
(3,'Pilsner',1,3,2),
(4,'Spezial',1,4,2),
(5,'Dortmunster',1,NULL,3),
(6,'Schwarzbier',1,NULL,8),
(7,'Vienna',1,8,6),
(8,'Bock',1,10,4),
(9,'Bohemian Pilsener',1,NULL,3),
(10,'Munich Helles',1,4,2),
(11,'Oktoberfest-Marzen',1,NULL,8),
(12,'Pale Ale',2,6,3),
(13,'IPA',2,8,4),
(14,'Amber Ale',2,8,6),
(15,'Dark Ale',2,10,8),
(16,'Golden Ale',2,NULL,2),
(17,'Stout',2,13,10),
(18,'Porter',2,NULL,NULL),
(19,'Belgian Dubbel',2,10,8),
(20,'Belgian Golden Strong',2,NULL,2),
(21,'Belgian Specialty Ale',2,NULL,2),
(22,'Wheat Beer',2,NULL,4),
(23,'Blonde Ale',2,NULL,2),
(24,'Barley Wine',2,10,6),
(25,'American Pale Ale',12,6,3),
(26,'English Pale Ale',12,6,3),
(27,'American IPA',13,8,4),
(28,'Imperial IPA',13,NULL,NULL),
(29,'India Pale Ale',13,8,4),
(30,'American Amber Ale',14,8,6),
(31,'Irish Red Ale',14,8,6),
(32,'Red Ale',14,8,6),
(33,'Dry Stout',17,NULL,10),
(34,'Imperial Stout',17,NULL,13),
(35,'Sweet Stout',17,NULL,10),
(36,'Artisanal Amber',21,8,6),
(37,'Artisanal Blond',21,NULL,4),
(38,'Artisanal Brown',21,10,8),
(39,'Belgian Barleywine',21,NULL,10),
(40,'Belgian IPA',21,NULL,8),
(41,'Belgian Spiced Christmas Beer',21,NULL,4),
(42,'Belgian Stout',21,NULL,NULL),
(43,'Fruit Lambic',21,NULL,3),
(44,'Spice, Herb o Vegetable',21,NULL,4),
(45,'Flanders Red/Brown',21,NULL,NULL),
(46,'Weizen-Weissbier',22,NULL,3),
(47,'Witbier',22,NULL,2),
(48,'Düsseldorf Altbier',2,8,6),
(49,'Extra-Strong Bitter',12,NULL,NULL);


/** Inserción de cervezas específicas con tipos correctos según nueva numeración **/
INSERT INTO cerveza (nombre, fk_tipo_cerveza) VALUES
/** Cervezas artesanales venezolanas específicas **/
('Destilo', 30), -- American Amber Ale (ID 30)
('Dos Leones', 21), -- Belgian Specialty Ale (ID 21)
('Benitz Pale Ale', 25), -- American Pale Ale (ID 25)
('Candileja de Abadía', 19), -- Belgian Dubbel (ID 19)
('Ángel o Demonio', 20), -- Belgian Golden Strong (ID 20)
('Barricas Saison Belga', 21), -- Belgian Specialty Ale (ID 21)
('Aldarra Mantuana', 23), -- Blonde Ale (ID 23)

/** Cervezas americanas específicas **/
('Tröegs HopBack Amber', 30), -- American Amber Ale (ID 30)
('Full Sail Amber', 30), -- American Amber Ale (ID 30)
('Deschutes Cinder Cone', 30), -- American Amber Ale (ID 30)  
('Rogue American Amber', 30), -- American Amber Ale (ID 30)

/** Cervezas belgas específicas **/
('La Chouffe', 21), -- Belgian Specialty Ale (ID 21)
('Orval', 21), -- Belgian Specialty Ale (ID 21)
('Chimay', 19), -- Belgian Dubbel (ID 19)
('Leffe Blonde', 23), -- Blonde Ale (ID 23)
('Hoegaarden', 47), -- Witbier (ID 47)

/** Cervezas específicas por estilo **/
('Pilsner Urquell', 3), -- Pilsner (ID 3)
('Samuel Adams', 9); -- Bohemian Pilsener (ID 9)

/** Inserción de características de cerveza - tipos: numerica o textual */
INSERT INTO caracteristica (nombre, tipo) VALUES
('Amargor', 'numerica'),          /** Característica numérica: medida en IBU (International Bitterness Units) */
('Dulzor', 'textual'),            /** Característica textual: descripción cualitativa del dulzor */
('Alcohol', 'numerica'),          /** Característica numérica: porcentaje de alcohol por volumen (ABV) */
('Carbonatación', 'numerica'),    /** Característica numérica: medida en volúmenes de CO2 */
('Aroma Floral', 'textual'),      /** Característica textual: descripción del aroma floral */
('Aroma Frutal', 'textual'),      /** Característica textual: descripción del aroma frutal */
('Claridad', 'textual'),          /** Característica textual: descripción de la claridad visual */
('Cuerpo', 'textual'),            /** Característica textual: descripción del cuerpo de la cerveza */
('Espuma', 'textual'),            /** Característica textual: descripción de la espuma */
('Acidez', 'numerica'),          /** Característica numérica: medida en escala de pH */
('Fermentacion', 'numerica'),     /** Característica numérica: grado de fermentacion */
('Graduación','numerica');

/** Inserción de ingredientes con estructura jerárquica recursiva **/
INSERT INTO ingrediente (nombre, descripcion, medida, fk_ingrediente) VALUES
/** Ingredientes base - sin padre **/
('Agua', 'Agua purificada', 'lt', NULL),                    /** ID 1: Ingrediente base **/
('Malta Pale Ale', 'Malta base clara', 'kg', NULL),         /** ID 2: Ingrediente base **/
('Malta Munich', 'Malta tostada', 'kg', NULL),              /** ID 3: Ingrediente base **/
('Lúpulo Cascade', 'Aroma cítrico', 'g', NULL),             /** ID 4: Ingrediente base **/
('Lúpulo Columbus', 'Aroma herbal', 'g', NULL),             /** ID 5: Ingrediente base **/
('Levadura Ale', 'Fermentación alta', 'g', NULL),           /** ID 6: Ingrediente base **/
('Levadura Lager', 'Fermentación baja', 'g', NULL),         /** ID 7: Ingrediente base **/
('Azúcar Candi', 'Azúcar caramelizada', 'kg', NULL),        /** ID 8: Ingrediente base **/
('Malta Trigo', 'Malta clara trigo', 'kg', NULL),           /** ID 9: Ingrediente base **/
('Levadura Belga', 'Aromática y especiada', 'g', NULL),     /** ID 10: Ingrediente base **/

/** Ingredientes recursivos - derivan de ingredientes base **/
('Mezcla Malta Base', 'Combinación de malta Pale Ale y Munich', 'kg', 2),  /** ID 11: Deriva de Malta Pale Ale (ID 2) **/
('Agua Munich', 'Agua tratada estilo Munich', 'lt', 1),                     /** ID 12: Deriva de Agua (ID 1) **/
('Lúpulo Cascade Pellet', 'Lúpulo Cascade procesado en pellets', 'g', 4),  /** ID 13: Deriva de Lúpulo Cascade (ID 4) **/
('Levadura Ale Belga', 'Levadura Ale modificada estilo belga', 'g', 6),    /** ID 14: Deriva de Levadura Ale (ID 6) **/
('Malta Munich Tostada', 'Malta Munich con tostado extra', 'kg', 3),       /** ID 15: Deriva de Malta Munich (ID 3) **/

/** Ingredientes de segundo nivel - derivan de ingredientes recursivos **/
('Mezcla Premium', 'Mezcla especial basada en Mezcla Malta Base', 'kg', 11), /** ID 16: Deriva de Mezcla Malta Base (ID 11) **/
('Lúpulo Cascade Especial', 'Versión especial del Cascade Pellet', 'g', 13); /** ID 17: Deriva de Lúpulo Cascade Pellet (ID 13) **/

INSERT INTO tipo_cerveza_ingrediente (cantidad, fk_ingrediente, fk_tipo_cerveza) VALUES
(20, 1, 1),
(5, 2, 20),
(3, 3, 16),
(15, 4, 21),
(10, 5, 20),
(2, 6, 22),
(3, 7, 3),
(1, 8, 16),
(4, 9, 19),
(2, 10, 16);

INSERT INTO periodo_descuento (fecha_inicio, fecha_fin) VALUES
('2025-01-01', '2025-01-10'),
('2025-02-01', '2025-02-10'),
('2025-03-01', '2025-03-10'),
('2025-04-01', '2025-04-10'),
('2025-05-01', '2025-05-10'),
('2025-06-01', '2025-06-10'),
('2025-07-01', '2025-07-10'),
('2025-08-01', '2025-08-10'),
('2025-09-01', '2025-09-10'),
('2025-10-01', '2025-10-10');

INSERT INTO presentacion (id, nombre, descripcion, unidades) VALUES
(1, 'Botella 330ml', 'Botella individual de 330ml', 1),
(2, 'Botella 500ml', 'Botella individual de 500ml', 1),
(3, 'Lata 330ml', 'Lata individual de 330ml', 1),
(4, 'Six-pack 330ml', 'Paquete de 6 botellas 330ml', 6),
(5, 'Caja 24 unidades 330ml', 'Caja completa con 24 unidades', 24),
(6, 'Barril 20L', 'Barril metálico de 20 litros', 53),
(7, 'Barril 30L', 'Barril metálico de 30 litros', 72),
(8, 'Barril 50L', 'Barril metálico de 50 litros', 120),
(9, 'Growler 1L', 'Envase rellenable 1 litro', 3),
(10, 'Caja 12 unidades 500ml', 'Caja con 12 botellas de 500ml', 12);

/** Inserción de relaciones presentación-cerveza para todas las cervezas **/
INSERT INTO presentacion_cerveza (sku, precio, fk_presentacion, fk_cerveza, imagen) VALUES
/** Distribución cíclica de las 10 presentaciones para las 18 cervezas **/
('DEST-B330-01', 1.50, 1, 1, NULL),      /** Destilo - Botella 330ml **/
('DLEO-B500-02', 2.25, 2, 2, NULL),      /** Dos Leones - Botella 500ml **/
('BENI-L330-03', 1.80, 3, 3, NULL),      /** Benitz Pale Ale - Lata 330ml **/
('CAND-6P330-04', 8.50, 4, 4, NULL),     /** Candileja de Abadía - Six-pack 330ml **/
('ANGE-C24330-05', 35.00, 5, 5, NULL),   /** Ángel o Demonio - Caja 24 unidades 330ml **/
('BARR-BR20L-06', 85.00, 6, 6, NULL),    /** Barricas Saison Belga - Barril 20L **/
('ALDA-BR30L-07', 125.00, 7, 7, NULL),   /** Aldarra Mantuana - Barril 30L **/
('TROE-BR50L-08', 195.00, 8, 8, NULL),   /** Tröegs HopBack Amber - Barril 50L **/
('FULL-GR1L-09', 4.50, 9, 9, NULL),      /** Full Sail Amber - Growler 1L **/
('DESC-C12500-10', 22.00, 10, 10, NULL), /** Deschutes Cinder Cone - Caja 12 unidades 500ml **/
('ROGU-B330-11', 1.65, 1, 11, NULL),     /** Rogue American Amber - Botella 330ml **/
('LACH-B500-12', 2.85, 2, 12, NULL),     /** La Chouffe - Botella 500ml **/
('ORVA-L330-13', 2.10, 3, 13, NULL),     /** Orval - Lata 330ml **/
('CHIM-6P330-14', 12.50, 4, 14, NULL),   /** Chimay - Six-pack 330ml **/
('LEFF-C24330-15', 42.00, 5, 15, NULL),  /** Leffe Blonde - Caja 24 unidades 330ml **/
('HOEG-BR20L-16', 78.00, 6, 16, NULL),   /** Hoegaarden - Barril 20L **/
('PILS-BR30L-17', 115.00, 7, 17, NULL),  /** Pilsner Urquell - Barril 30L **/
('SAMA-BR50L-18', 175.00, 8, 18, NULL);  /** Samuel Adams - Barril 50L **/
 


/** Inserción de descuentos con referencias correctas a SKUs de presentacion **/
INSERT INTO descuento (monto, porcentaje, fk_descuento, fk_presentacion_cerveza_1, fk_presentacion_cerveza_2) VALUES
(1, 10, 1, 1, 1),     /** Descuento $1 (10%) en periodo 1, entre Botella 330ml y 500ml **/
(2, 15, 2, 2, 2),     /** Descuento $2 (15%) en periodo 2, entre Botella 500ml y Lata 330ml **/
(1, 5, 3, 3, 3),     /** Descuento $1 (5%) en periodo 3, entre Lata 330ml y Six-pack 330ml **/
(3, 20, 4, 4, 4),  /** Descuento $3 (20%) en periodo 4, entre Six-pack y Caja 24 unidades **/
(5, 25, 5, 5, 5),    /** Descuento $5 (25%) en periodo 5, entre Caja 24 unidades y Barril 20L **/
(7, 10, 6, 6, 6),       /** Descuento $7 (10%) en periodo 6, entre Barril 20L y 30L **/
(10, 15, 7, 7, 7),      /** Descuento $10 (15%) en periodo 7, entre Barril 30L y 50L **/
(12, 20, 8, 8, 8),      /** Descuento $12 (20%) en periodo 8, entre Barril 50L y Growler 1L **/
(2, 8, 9, 9, 9),     /** Descuento $2 (8%) en periodo 9, entre Growler 1L y Caja 12 unidades **/
(4, 12, 10, 10, 10);  /** Descuento $4 (12%) en periodo 10, entre Botella 330ml y Caja 12 unidades **/

/** Inserción de relaciones cerveza-característica con valores según tipo */
INSERT INTO cerveza_caracteristica (valor_rango_inferior, valor_rango_superior, descripcion, fk_caracteristica, fk_cerveza, fk_tipo_cerveza) VALUES
(0.00, 10.00, null, 11, NULL, 1), 
(3.50, 5.00, null, 3, NULL, 1),
(19.00, null, null, 11, NULL, 2),        
(7.00, null, null, 3, NULL, 22), 
(null, null, 'Bastante Amargas', 1, NULL, 12),    
(19.00, null, null, 11, NULL, 15),
(null, null, 'Regusto Dulce', 2, NULL, 17), 
(null, null, 'Aroma a Malta', 5, NULL, 17),      
(null, null, 'Regusto Dulce', 2, NULL, 18),  
(null, null, 'Ligero pero intenso', 2, NULL, 3),    
(null, null, 'Caracter citrico', 6, NULL, 30),      
(null, null, 'Dulzura inicial seguido de un sabor moderado a caramelo. Sabor amargado derivados de la malta y el lúpulo', 2, NULL, 30),         
(25.00, 40.00, null, 1, NULL, 30),       
(4.50,6.20, null, 3, NULL, 30),    
(18.00, 20.00, null, 11, NULL, 30), 
(40.00, 60.00, null, 1, NULL, 27),   
(5.00, 7.50, null, 3, NULL, 27),          
(null,null ,'Aroma a lúpulo', 5, NULL, 25),     
(null,null ,'Sabor a lúpulo, comunmente presentado con un carácter cítrico', 2, NULL, 25),     
(null,null ,'Aroma a banana o manzana', 6, NULL, 19),   
(null,null ,'Dulzor de malta rico y complejo', 2, NULL, 19),   
(null,null ,'Aroma moderado de carácter floral y perfumado del lúpulo', 5, NULL, 20),   
(null,null ,'Combinación de sabores frutados,especiados y alcohólicos, complementados por un carácter suave de malta', 2, NULL, 20), 
(null,null ,'Presenta distintas cantidades de ésteres frutados, fenoles especiadoss y/o aromas propios de la levadura', 6, NULL, 21), 
(null,null ,'La maltosidad puede ser de ligera a algo sabrosa', 2, NULL, 21), 
(4.00, 5.50, null, 3, NULL, 23),
(4.20, 6.00, null, 3, NULL, 9),
(3.50, 5.00, null, 3, NULL, 33),
(5.00, 7.00, null, 3, NULL, 48),
(4.50, 6.20, null, 3, NULL, 26),
(6.00, 8.50, null, 3, NULL, 49),
(3.80, 5.20, null, 3, NULL, 43),
(5.50, 7.50, null, 3, NULL, 28),
(4.70, 6.50, null, 3, NULL, 34),
(3.00, 4.80, null, 3, NULL, 29),
(5.20, 7.20, null, 3, NULL, 31),
(4.10, 5.80, null, 3, NULL, 10),
(6.50, 9.00, null, 3, NULL, 11),
(4.90, 6.80, null, 3, NULL, 32),
(3.90, 5.60, null, 3, NULL, 6),
(7.00, 10.00, null, 3, NULL, 44),
(4.60, 6.40, null, 3, NULL, 35),
(5.80, 8.00, null, 3, NULL, 46),
(4.30, 6.10, null, 3, NULL, 47),
(4.30, 6.10, null, 3, 1, null),
(4.00, null, null, 3, 1, null),
(4.20, null, null, 3, 2, null),
(3.50, null, null, 3, 3, null),
(5.00, null, null, 3, 4, null),
(4.50, null, null, 3, 5, null),
(6.00, null, null, 3, 6, null),
(3.80, null, null, 3, 7, null),
(5.50, null, null, 3, 8, null),
(4.70, null, null, 3, 9, null),
(3.00, null, null, 3, 10, null),
(5.20, null, null, 3, 11, null),
(4.10, null, null, 3, 12, null),
(6.50, null, null, 3, 13, null),
(4.90, null, null, 3, 14, null),
(3.90, null, null, 3, 15, null),
(7.00, null, null, 3, 16, null),
(4.60, null, null, 3, 17, null),
(5.80, null, null, 3, 18, null);

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
(420, 7, 7, 1), -- Aldarra Mantuana - Barril 30L
(500, 8, 8, 1), -- Tröegs HopBack Amber - Barril 50L
(350, 9, 9, 1), -- Full Sail Amber - Growler 1L
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
/** Almacenes de tienda web **/
(750, 1, 1, 2),     /** Destilo - Botella 330ml en Almacén 2 **/
(320, 2, 2, 3),     /** Dos Leones - Botella 500ml en Almacén 3 **/
(150, 5, 5, 4),     /** Ángel o Demonio - Caja 24u 330ml en Almacén 4 **/
(280, 6, 6, 5),     /** Barricas Saison Belga - Barril 20L en Almacén 5 **/
(600, 7, 7, 6),     /** Aldarra Mantuana - Barril 30L en Almacén 6 **/
(430, 8, 8, 7),     /** Tröegs HopBack Amber - Barril 50L en Almacén 7 **/
(290, 9, 9, 8),     /** Full Sail Amber - Growler 1L en Almacén 8 **/
(180, 10, 10, 9),   /** Deschutes Cinder Cone - Caja 12u 500ml en Almacén 9 **/
(520, 1, 11, 2),    /** Rogue American Amber - Botella 330ml en Almacén 2 **/
(340, 2, 12, 3);    /** La Chouffe - Botella 500ml en Almacén 3 **/

/**
 * Inserción de datos para el inventario de lugares de tienda
 */
INSERT INTO lugar_tienda_inventario (cantidad, fk_lugar_tienda_1, fk_lugar_tienda_2, fk_inventario_1, fk_inventario_2, fk_inventario_3) VALUES
(30, 3, 1, 1, 1, 1),    /** Inventario en Pasillo Principal **/
(40, 3, 1, 2, 2, 1),    /** Inventario en Zona Refrigerada **/
(30, 3, 1, 3, 13, 1),    /** Inventario en Anaquel Cervezas Importadas **/
(40, 6, 1, 4, 14, 1),    /** Inventario en Pasillo Cervezas Nacionales **/
(100, 6, 1, 5, 5, 1),    /** Inventario en Zona Barriles **/
(80, 6, 1, 6, 6, 1),    /** Inventario en Anaquel Cervezas Artesanales **/
(60, 9, 1, 7, 7, 1),    /** Inventario en Pasillo Promociones **/
(15, 9, 1, 8, 8, 1),    /** Inventario en Zona Six Packs **/
(12, 9, 1, 9, 9, 1),    /** Inventario en Anaquel Cervezas Premium **/
(17, 9, 1, 10, 10, 1); /** Inventario en Pasillo Salida **/

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
    fk_usuario
) VALUES
-- Órdenes asignadas al "Anaquel Cervezas Importadas" (lugar_tienda id: 3)
('2024-05-10', 'Reposicion pasada para importadas', 50, 3, 1, 3, 13, 1, 23),
('2024-09-16', 'Stock regular para importadas', 50, 3, 1, 1, 1, 1, 23),
('2024-10-17', 'Pedido especial para importadas', 30, 3, 1, 2, 2, 1, 23),

-- Órdenes asignadas al "Anaquel Cervezas Artesanales" (lugar_tienda id: 6)
('2024-05-11', 'Stock regular anterior para artesanales', 30, 6, 1, 6, 6, 1, 23),
('2024-11-18', 'Reposicion para artesanales', 250, 6, 1, 5, 5, 1, 23),
('2025-06-21', 'URGENTE - Stock bajo para artesanales', 20, 6, 1, 4, 14, 1, 23),

-- Órdenes asignadas al "Anaquel Cervezas Premium" (lugar_tienda id: 9)
('2024-05-12', 'Promocion pasada para premium', 60, 9, 1, 9, 9, 1, 23),
('2024-08-15', 'Reposicion mensual para premium', 50, 9, 1, 8, 8, 1, 23),
('2025-06-23', 'CRÍTICO - Premium agotado', 50, 9, 1, 7, 7, 1, 23),
('2025-06-25', 'CRÍTICO - Premium sin stock', 40, 9, 1, 10, 10, 1, 23);

/**
 * Inserts for tipo_evento table
 * Contains different types of events that can be organized
 */

INSERT INTO tipo_evento (nombre) VALUES
    ('Fiesta de Cerveza'),
    ('Concurso de Cerveza'),
    ('Taller de Cata'),
    ('Feria Gastronómica'),
    ('Conferencia del Trimestre'),
    ('Degustación'),
    ('Lanzamiento de Producto'),
    ('Festival Cervecero'),
    ('Maridaje Cerveza-Comida'),
    ('Taller de Elaboración'),
    ('Tour Cervecero'),
    ('Cervez del Futuro Fest');

/**
 * Inserción de registros en la tabla tipo_invitado
 * @param nombre - Nombre del tipo de invitado
 */
INSERT INTO tipo_invitado (nombre) VALUES
('VIP'),
('Prensa'),
('Influencer'),
('Cliente'),
('Proveedor'),
('Miembro del Club'),
('Invitado General'),
('Expositor'),
('CEO'),
('Jefe de Marketing'),
('Representante de Marca'),
('Maestro Cervecero');

/**
 * Inserción de registros en la tabla invitado
 * @param ci - Número de cédula de identidad del invitado
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

/**
 * Inserción de registros en la tabla evento
 * @param nombre - Nombre del evento
 * @param descripción - Descripción detallada del evento
 * @param dirección - Dirección donde se realizará el evento
 * @param fecha_hora_inicio - Fecha y hora de inicio del evento
 * @param fecha_hora_fin - Fecha y hora de finalización del evento
 * @param precio_entrada - Precio de la entrada al evento
 * @param fk_tipo_evento - Referencia al tipo de evento
 * @param fk_lugar - Referencia al lugar donde se realizará el evento
 */
INSERT INTO evento (nombre, descripción, dirección, fecha_hora_inicio, fecha_hora_fin, precio_entrada, fk_tipo_evento, fk_lugar) VALUES

-- Anzoátegui (Estado ID: 1) - 5 eventos
('Festival de Cerveza Artesanal 2024', 
 'El festival más grande de cerveza artesanal del país', 
 'Av. Principal #123, Caracas', 
 TO_DATE('2024-06-15 14:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-06-16 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 50.00, 1, 1),

 ('Barcelona Craft Beer Festival',
 'Festival anual de cerveza artesanal en la capital anzoateguiense',
 'Plaza Boyacá, Barcelona',
 TO_DATE('2024-03-15 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-03-15 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 35.00, 1, 1),

('Cata de Cervezas del Oriente',
 'Degustación de cervezas artesanales de la región oriental',
 'Hotel Maremares, Puerto La Cruz',
 TO_DATE('2024-04-20 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-04-20 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 45.00, 6, 1),

('Maridaje Cervecero Playero',
 'Experiencia gastronómica con cerveza artesanal frente al mar',
 'Malecón de Lechería',
 TO_DATE('2024-05-10 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-05-10 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 55.00, 4, 1),

('Taller de Lupulización Tropical',
 'Aprende técnicas de lupulización con ingredientes tropicales',
 'Centro Cultural Simón Bolívar, Barcelona',
 TO_DATE('2024-06-05 10:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-06-05 15:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 65.00, 3, 1),

-- Amazonas (Estado ID: 2) - 5 eventos

('Concurso Nacional de Cerveceros', 
 'Competencia anual de cerveceros artesanales', 
 'Centro de Convenciones, Valencia', 
 TO_DATE('2024-07-20 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-07-21 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 30.00, 2, 2),
 
('Concurso Cerveza Artesanal Indígena',
 'Competencia incorporando ingredientes autóctonos amazónicos',
 'Centro de Convenciones Orinoco',
 TO_DATE('2024-07-12 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-07-13 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 25.00, 2, 2),

('Cata Experimental Amazónica',
 'Degustación de cervezas con frutos silvestres del Amazonas',
 'Hotel Apure, Puerto Ayacucho',
 TO_DATE('2024-08-22 19:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-08-22 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 80.00, 6, 2),

('Maridaje Cervecero Fluvial',
 'Experiencia gastronómica a bordo navegando el Orinoco',
 'Embarcadero Turístico Puerto Ayacucho',
 TO_DATE('2024-09-15 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-09-15 20:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 90.00, 4, 2),

('Lanzamiento Cerveza del Orinoco',
 'Presentación de nueva línea de cervezas inspiradas en el río',
 'Malecón del Orinoco',
 TO_DATE('2024-11-08 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-11-08 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 0.00, 7, 2),

-- Aragua (Estado ID: 3) - 5 eventos

('Taller de Cata de Cervezas Premium', 
 'Aprende a catar cervezas artesanales premium como un experto', 
 'Hotel Hilton, Caracas', 
 TO_DATE('2024-08-10 15:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-08-10 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 75.00, 3, 3),

('Festival Llanero de Cerveza',
 'Celebración cervecera en tierra de vaqueros',
 'Plaza Bolívar, San Fernando de Apure',
 TO_DATE('2024-01-25 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-01-25 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 30.00, 1, 3),

('Competencia Cerveceros del Llano',
 'Concurso regional de cerveceros artesanales llaneros',
 'Centro Ferial Los Llanos, San Fernando',
 TO_DATE('2024-03-08 08:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-03-09 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 20.00, 2, 3),

('Cata de Cervezas de Temporada Seca',
 'Degustación especial durante la época de sequía llanera',
 'Hotel Presidente, San Fernando',
 TO_DATE('2024-02-28 18:30:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-02-28 22:30:00', 'YYYY-MM-DD HH24:MI:SS'),
 50.00, 6, 3),

('Maridaje Cervecero Ganadero',
 'Combinación perfecta entre cerveza artesanal y carnes llaneras',
 'Hato El Cedral, Mantecal',
 TO_DATE('2024-04-18 12:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-04-18 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 75.00, 4, 3),

-- Apure (Estado ID: 4) - 5 eventos

('Festival de Maridaje Cervecero',
 'Explora los mejores maridajes entre diferentes estilos de cerveza artesanal',
 'Plaza Los Palos Grandes, Caracas',
 TO_DATE('2024-09-05 11:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-09-05 20:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 40.00, 4, 4),

('Maracay Beer Fest',
 'El mayor festival de cerveza artesanal del estado Aragua',
 'Parque Las Delicias, Maracay',
 TO_DATE('2024-03-22 15:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-03-23 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 45.00, 1, 4),

('Concurso de Homebrewers Aragüeños',
 'Competencia de cerveceros caseros del estado',
 'Centro de Eventos La Victoria',
 TO_DATE('2024-06-28 10:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-06-29 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 35.00, 2, 4),

('Cata Premium Colonia Tovar',
 'Degustación exclusiva en el pueblo alemán de Venezuela',
 'Hotel Selva Negra, Colonia Tovar',
 TO_DATE('2024-10-12 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-10-12 20:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 85.00, 6, 4),

('Lanzamiento Cerveza del Henri Pittier',
 'Nueva línea inspirada en el Parque Nacional',
 'Jardín Botánico de Maracay',
 TO_DATE('2024-11-15 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-11-15 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 0.00, 7, 4),

 -- Barinas (Estado ID: 5) - 5 eventos

('Conferencia: Innovación Cervecera 2024',
 'Expertos internacionales discuten las últimas innovaciones en cerveza artesanal',
 'Universidad Central de Venezuela, Caracas',
 TO_DATE('2024-10-15 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-10-15 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 25.00, 5, 5),

 
('Concurso Regional de Cerveceros',
 'Competencia de cerveceros artesanales del estado Barinas',
 'Centro de Convenciones Barinas',
 TO_DATE('2024-01-18 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-01-19 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 28.00, 2, 5),

('Cata Cervecera Altamira',
 'Degustación especial en las montañas barinesas',
 'Hotel Altamira, Barinitas',
 TO_DATE('2024-02-14 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-02-14 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 55.00, 6, 5),

('Maridaje Cervecero de los Llanos',
 'Experiencia gastronómica con sabores tradicionales barineses',
 'Hato La Trinidad, Sabaneta',
 TO_DATE('2024-03-20 13:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-03-20 19:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 68.00, 4, 5),

('Taller de Cervecería Tropical',
 'Curso intensivo de elaboración en clima tropical',
 'Escuela Técnica de Barinas',
 TO_DATE('2024-04-25 08:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-04-25 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 70.00, 3, 5),

 -- Bolívar (Estado ID: 6) - 5 eventos

('Degustación de Cervezas Especiales',
 'Prueba exclusiva de cervezas artesanales raras y ediciones limitadas',
 'Club Social La Lagunita, Caracas',
 TO_DATE('2024-11-01 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-11-01 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 100.00, 6, 6),

 ('Competencia Minera de Cerveza',
 'Concurso especial para trabajadores de la minería',
 'Centro Cívico Puerto Ordaz',
 TO_DATE('2024-01-10 10:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-01-11 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 25.00, 2, 6),

('Cata de Cervezas Guayanesas',
 'Degustación de cervezas de la región Guayana',
 'Hotel Intercontinental Guayana',
 TO_DATE('2024-02-22 19:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-02-22 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 65.00, 6, 6),

('Maridaje Cervecero Siderúrgico',
 'Experiencia única en el corazón industrial de Venezuela',
 'Club Puerto Ordaz',
 TO_DATE('2024-03-28 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-03-28 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 75.00, 4, 6),

('Lanzamiento Cerveza del Orinoco',
 'Presentación de cerveza inspirada en el río padre',
 'Malecón de Ciudad Bolívar',
 TO_DATE('2024-05-03 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-05-03 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 0.00, 7, 6),

 -- Carabobo (Estado ID: 7) - 5 eventos

('Lanzamiento: Nueva IPA Tropical',
 'Presentación oficial de nuestra nueva cerveza IPA con toques tropicales',
 'Terraza del CC Sambil, Caracas',
 TO_DATE('2024-12-01 19:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-12-01 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 0.00, 7, 7),

('Valencia Craft Beer Week',
 'Semana completa dedicada a la cerveza artesanal valenciana',
 'Centro Comercial Sambil Valencia',
 TO_DATE('2024-04-08 12:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-04-14 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 60.00, 1, 7),

('Concurso Cervecero Industrial',
 'Competencia para cerveceros de la zona industrial',
 'Centro de Ferias de Valencia',
 TO_DATE('2024-05-24 08:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-05-25 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 38.00, 2, 7),

('Cata Portuaria Premium',
 'Degustación exclusiva con vista al Puerto Cabello',
 'Fortín Solano, Puerto Cabello',
 TO_DATE('2024-08-16 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-08-16 20:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 95.00, 6, 7),

('Taller de Fermentación Avanzada',
 'Técnicas avanzadas de fermentación cervecera',
 'Universidad de Carabobo, Valencia',
 TO_DATE('2024-09-19 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-09-19 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 80.00, 3, 7),

 -- Cojedes (Estado ID: 8) - 5 eventos

('Festival de Cervezas de Invierno',
 'Celebra el invierno con las mejores cervezas porter, stout y barleywine',
 'Parque del Este, Caracas',
 TO_DATE('2024-12-15 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-12-15 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 45.00, 8, 8),

 ('Festival Cervecero de Los Llanos Centrales',
 'Encuentro cervecero en el corazón de los llanos',
 'Plaza Miranda, San Carlos',
 TO_DATE('2023-10-20 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2023-10-20 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 28.00, 1, 8),

('Concurso de Cerveceros Cojedeños',
 'Competencia regional de productores locales',
 'Centro Cultural El Baúl',
 TO_DATE('2024-01-12 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-01-13 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 22.00, 2, 8),

('Cata Rural de Cervezas',
 'Degustación en ambiente campestre',
 'Hacienda La Providencia, Tinaquillo',
 TO_DATE('2024-02-17 15:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-02-17 19:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 45.00, 6, 8),

('Maridaje Cervecero Agrícola',
 'Combinación de cervezas con productos de la región',
 'Finca Agroturística Las Palmas',
 TO_DATE('2024-03-23 12:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-03-23 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 52.00, 4, 8),

 -- Delta Amacuro (Estado ID: 9) - 5 eventos

('Los 50 Mejores Estilos de Cerveza en Caracas',
 'Descubre cómo combinar diferentes estilos de cerveza con platos gourmet',
 'Hotel Humboldt, Caracas',
 TO_DATE('2025-01-20 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2025-01-20 20:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 60.00, 9, 9),

 ('Concurso Cervecero Warao',
 'Competencia incorporando tradiciones indígenas',
 'Centro Cultural Indígena, Tucupita',
 TO_DATE('2024-02-08 10:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-02-09 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 30.00, 2, 9),

('Cata Fluvial Especial',
 'Degustación navegando los caños del Delta',
 'Embarcadero Turístico Tucupita',
 TO_DATE('2024-03-14 14:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-03-14 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 70.00, 6, 9),

('Maridaje Cervecero Deltano',
 'Experiencia gastronómica con pescados del Delta',
 'Restaurante El Pescador, Tucupita',
 TO_DATE('2024-04-19 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-04-19 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 58.00, 4, 9),

('Taller Cervecero Ecológico',
 'Elaboración sustentable en ecosistemas deltaicos',
 'Estación Biológica Delta del Orinoco',
 TO_DATE('2024-05-25 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-05-25 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 65.00, 3, 9),

 -- Distrito Capital (Estado ID: 10) - 5 eventos

('Taller de Elaboración de Cerveza',
 'Aprende los fundamentos de la elaboración de cerveza artesanal',
 'Escuela de Cerveceros, Los Ruices',
 TO_DATE('2025-02-10 10:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2025-02-10 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 85.00, 10, 10),

('Caracas International Beer Summit',
 'Cumbre internacional de cerveceros en la capital',
 'Teresa Carreño, Caracas',
 TO_DATE('2024-07-26 10:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-07-28 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 120.00, 5, 10),

('Noche de Cervezas Caraqueñas',
 'Degustación nocturna de cervezas locales',
 'Rooftop Altamira, Caracas',
 TO_DATE('2024-08-30 19:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-08-30 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 85.00, 6, 10),

 
('Conferencia Cervecera Agropecuaria',
 'Innovación cervecera en comunidades rurales',
 'Centro de Capacitación Agrícola, San Carlos',
 TO_DATE('2024-04-11 08:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-04-11 15:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 18.00, 5, 10),

('Festival Cervecero del Delta',
 'Celebración única en tierras deltaicas',
 'Malecón de Tucupita',
 TO_DATE('2023-09-15 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2023-09-15 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 35.00, 1, 10),

-- Falcón (Estado ID: 11) - 5 eventos

('Tour Cervecerías Artesanales',
 'Recorrido por las mejores cervecerías artesanales de la ciudad',
 'Punto de encuentro: Plaza Altamira',
 TO_DATE('2025-03-01 14:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2025-03-01 20:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 70.00, 11, 11),

('Coro Beer Heritage Festival',
 'Festival cervecero en la ciudad patrimonio',
 'Casco Histórico de Coro',
 TO_DATE('2024-12-06 15:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-12-07 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 48.00, 1, 11),

('Concurso Cervecero del Desierto',
 'Competencia en los médanos falconianos',
 'Centro de Convenciones Punto Fijo',
 TO_DATE('2025-01-17 08:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2025-01-18 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 32.00, 2, 11),

('Cata Cervecera Península',
 'Degustación con vista al Golfo de Venezuela',
 'Hotel Venetur Paraguaná',
 TO_DATE('2025-02-21 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2025-02-21 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 72.00, 6, 11),

('Maridaje Cervecero Costero',
 'Experiencia gastronómica frente al mar Caribe',
 'Playa Villa Marina, Tucacas',
 TO_DATE('2025-03-28 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2025-03-28 20:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 65.00, 4, 11),

 -- Guárico (Estado ID: 12) - 5 eventos
('Festival Cervecero de los Llanos Centrales',
 'Celebración de cerveza artesanal en tierra de ganado',
 'Plaza Bolívar, San Juan de los Morros',
 TO_DATE('2023-08-18 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2023-08-18 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 28.00, 1, 12),

('Concurso de Cerveceros Guariquenos',
 'Competencia regional de productores artesanales',
 'Centro de Convenciones Valle de la Pascua',
 TO_DATE('2024-01-26 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-01-27 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 25.00, 2, 12),

('Cata de Cervezas del Llano Central',
 'Degustación con productos locales guariquenos',
 'Hotel Miranda, Calabozo',
 TO_DATE('2024-03-09 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-03-09 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 48.00, 6, 12),

('Maridaje Cervecero Llanero',
 'Experiencia gastronómica con sabores tradicionales',
 'Hato Piñero, El Socorro',
 TO_DATE('2024-04-13 12:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-04-13 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 62.00, 4, 12),

('Conferencia de Innovación Cervecera Rural',
 'Adaptación de tecnologías cerveceras al campo',
 'Universidad de los Llanos, Calabozo',
 TO_DATE('2024-05-30 08:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-05-30 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 20.00, 5, 12),

 -- Lara (Estado ID: 13) - 5 eventos
('Barquisimeto Beer Festival',
 'El festival de cerveza más grande del centro-occidente',
 'Parque Ayacucho, Barquisimeto',
 TO_DATE('2023-07-21 15:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2023-07-22 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 35.00, 1, 13),

('Concurso Nacional de Homebrewing',
 'La competencia más importante de cerveceros caseros',
 'Centro de Convenciones de Barquisimeto',
 TO_DATE('2024-02-16 08:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-02-18 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 40.00, 2, 13),

('Cata Premium Ciudad Musical',
 'Degustación exclusiva en honor a Barquisimeto',
 'Teatro Juares, Barquisimeto',
 TO_DATE('2024-04-27 19:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-04-27 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 75.00, 6, 13),

('Maridaje Cervecero Caroreño',
 'Combinación perfecta con gastronomía local',
 'Plaza Bolívar, Carora',
 TO_DATE('2024-06-08 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-06-08 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 58.00, 4, 13),

('Taller Avanzado de Lupulado',
 'Técnicas modernas de lupulización',
 'Universidad Centroccidental, Barquisimeto',
 TO_DATE('2024-08-14 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-08-14 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 85.00, 3, 13),

-- Mérida (Estado ID: 14) - 5 eventos
('Festival Cervecero de los Andes',
 'Celebración en las montañas merideñas',
 'Plaza Bolívar, Mérida',
 TO_DATE('2023-06-16 14:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2023-06-17 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 45.00, 1, 14),

('Concurso Cervecero Andino',
 'Competencia especial para cervezas de montaña',
 'Universidad de Los Andes, Mérida',
 TO_DATE('2024-01-19 10:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-01-20 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 32.00, 2, 14),

('Cata de Cervezas de Altura',
 'Degustación especial a 1600 metros sobre el mar',
 'Hotel Chama, Mérida',
 TO_DATE('2024-03-23 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-03-23 20:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 68.00, 6, 14),

('Maridaje Cervecero Montañés',
 'Experiencia gastronómica con trucha y quesos andinos',
 'Hacienda La Victoria, Tabay',
 TO_DATE('2024-05-18 13:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-05-18 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 72.00, 4, 14),

('Lanzamiento Cerveza del Páramo',
 'Nueva línea inspirada en los páramos andinos',
 'Teleférico de Mérida',
 TO_DATE('2024-07-05 15:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-07-05 19:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 0.00, 7, 14),

 -- Miranda (Estado ID: 15) - 5 eventos
('Miranda Craft Beer Festival',
 'Festival metropolitano de cerveza artesanal',
 'Centro Ciudad Comercial Tamanaco',
 TO_DATE('2023-05-12 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2023-05-13 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 52.00, 1, 15),

('Concurso Cervecero del Tuy',
 'Competencia regional de los valles del Tuy',
 'Centro de Eventos Los Teques',
 TO_DATE('2024-02-23 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-02-24 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 38.00, 2, 15),

('Cata Exclusiva de Barlovento',
 'Degustación con cacao y ron de la región',
 'Hacienda Bukare, Curiepe',
 TO_DATE('2024-04-05 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-04-05 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 88.00, 6, 15),

('Maridaje Cervecero Caribeño',
 'Experiencia con pescados y mariscos de Higuerote',
 'Malecón de Higuerote',
 TO_DATE('2024-06-21 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-06-21 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 65.00, 4, 15),

('Taller de Cervecería Urbana',
 'Elaboración de cerveza en espacios metropolitanos',
 'Centro de Innovación Los Teques',
 TO_DATE('2024-09-07 10:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-09-07 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 75.00, 3, 15),

-- Monagas (Estado ID: 16) - 5 eventos
('Maturín Beer Festival',
 'Celebración cervecera en el oriente petrolero',
 'Plaza Bolívar, Maturín',
 TO_DATE('2023-04-14 15:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2023-04-15 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 35.00, 1, 16),

('Concurso Cervecero Monaguense',
 'Competencia de cerveceros del estado oriental',
 'Centro de Convenciones Maturín',
 TO_DATE('2024-01-11 08:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-01-12 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 28.00, 2, 16),

('Cata de Cervezas Petroleras',
 'Degustación especial para trabajadores del sector',
 'Club Petrolero, Maturín',
 TO_DATE('2024-03-16 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-03-16 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 55.00, 6, 16),

('Maridaje Cervecero de Caripe',
 'Experiencia gastronómica en la ciudad jardín',
 'Posada Turística La Cueva, Caripe',
 TO_DATE('2024-05-11 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-05-11 20:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 68.00, 4, 16),

('Conferencia Cervecera Industrial',
 'Innovación en procesos cerveceros industriales',
 'UNEXPO, Maturín',
 TO_DATE('2024-07-19 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-07-19 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 25.00, 5, 16),

 -- Nueva Esparta (Estado ID: 17) - 5 eventos
('Margarita Island Beer Festival',
 'Festival insular de cerveza artesanal',
 'Playa El Yaque, Nueva Esparta',
 TO_DATE('2023-03-17 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2023-03-18 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 55.00, 1, 17),

('Concurso Cervecero Insular',
 'Competencia exclusiva de la Isla de Margarita',
 'Centro de Convenciones Margarita',
 TO_DATE('2024-02-29 10:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-03-01 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 42.00, 2, 17),

('Cata Cervecera Playera',
 'Degustación frente al mar Caribe',
 'Hotel Hesperia, Playa El Agua',
 TO_DATE('2024-04-12 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-04-12 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 78.00, 6, 17),

('Maridaje Cervecero Marinero',
 'Experiencia gastronómica con mariscos frescos',
 'Restaurante La Marinera, Pampatar',
 TO_DATE('2024-06-14 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-06-14 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 82.00, 4, 17),

('Lanzamiento Cerveza Tropical Island',
 'Nueva línea inspirada en los sabores caribeños',
 'Fortaleza de La Asunción',
 TO_DATE('2024-08-09 19:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-08-09 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 0.00, 7, 17),

 -- Eventos para completar los estados restantes (5 eventos por estado)




-- Portuguesa (Estado ID: 18) - 5 eventos
('Festival Cervecero Llanero',
 'Celebración en los llanos portugueses',
 'Plaza Bolívar, Guanare',
 TO_DATE('2023-02-10 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2023-02-11 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 32.00, 1, 18),

('Concurso de Cerveceros Agropecuarios',
 'Competencia especializada en cervezas rurales',
 'UNELLEZ, Guanare',
 TO_DATE('2024-01-25 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-01-26 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 25.00, 2, 18),

('Cata de Cervezas de Acarigua',
 'Degustación en el corazón agrícola del estado',
 'Hotel Morichal, Acarigua',
 TO_DATE('2024-03-29 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-03-29 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 48.00, 6, 18),

('Maridaje Cervecero de la Virgen',
 'Experiencia gastronómica en honor a la Virgen de Coromoto',
 'Basílica de Coromoto, Guanare',
 TO_DATE('2024-05-08 14:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-05-08 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 55.00, 4, 18),

('Taller de Cervecería Artesanal Rural',
 'Elaboración de cerveza en comunidades rurales',
 'Cooperativa Agrícola, Turén',
 TO_DATE('2024-07-26 08:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-07-26 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 62.00, 3, 18),

-- Sucre (Estado ID: 19) - 5 eventos
('Cumaná Beer Festival',
 'Festival cervecero en la primogénita del continente',
 'Malecón de Cumaná',
 TO_DATE('2023-01-20 15:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2023-01-21 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 38.00, 1, 19),

('Concurso Cervecero Oriental',
 'Competencia de cerveceros del oriente venezolano',
 'Universidad de Oriente, Cumaná',
 TO_DATE('2024-02-14 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-02-15 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 30.00, 2, 19),

('Cata de Cervezas de Carúpano',
 'Degustación con vista al Golfo de Paria',
 'Hotel Europa, Carúpano',
 TO_DATE('2024-04-26 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-04-26 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 65.00, 6, 19),

('Maridaje Cervecero Pesquero',
 'Experiencia con los mejores pescados del Golfo',
 'Puerto Pesquero de Carúpano',
 TO_DATE('2024-06-07 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-06-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 58.00, 4, 19),

('Conferencia Cervecera Marina',
 'Innovaciones cerveceras inspiradas en el mar',
 'Instituto Oceanográfico, Cumaná',
 TO_DATE('2024-08-23 08:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-08-23 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 22.00, 5, 19),

-- Táchira (Estado ID: 20) - 5 eventos
('San Cristóbal Beer Festival',
 'Festival cervecero en la ciudad cordial',
 'Plaza Bolívar, San Cristóbal',
 TO_DATE('2022-12-16 15:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2022-12-17 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 42.00, 1, 20),

('Concurso Cervecero Fronterizo',
 'Competencia internacional en la frontera',
 'Centro de Convenciones San Cristóbal',
 TO_DATE('2024-01-13 08:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-01-14 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 35.00, 2, 20),

('Cata de Cervezas Andinas',
 'Degustación especial de cervezas de montaña',
 'Hotel del Rey, San Cristóbal',
 TO_DATE('2024-03-22 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-03-22 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 62.00, 6, 20),

('Maridaje Cervecero Tachirense',
 'Experiencia con hallacas y dulces tradicionales',
 'Casa de la Cultura, San Cristóbal',
 TO_DATE('2024-05-24 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-05-24 20:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 58.00, 4, 20),

('Lanzamiento Cerveza Cordillera',
 'Nueva línea inspirada en los Andes tachirenses',
 'Parque Metropolitano, San Cristóbal',
 TO_DATE('2024-07-12 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-07-12 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 0.00, 7, 20),

-- Trujillo (Estado ID: 21) - 5 eventos
('Trujillo Beer Festival',
 'Festival cervecero en tierra de tradiciones',
 'Plaza Bolívar, Trujillo',
 TO_DATE('2022-11-18 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2022-11-19 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 35.00, 1, 21),

('Concurso Cervecero Vallenato',
 'Competencia en la cuna del vallenato venezolano',
 'Centro Cultural Valera',
 TO_DATE('2024-02-09 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-02-10 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 28.00, 2, 21),

('Cata de Cervezas Boconesas',
 'Degustación en la ciudad jardín de Venezuela',
 'Hotel Truji, Boconó',
 TO_DATE('2024-04-20 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-04-20 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 52.00, 6, 21),

('Maridaje Cervecero de Montaña',
 'Experiencia gastronómica con productos de altura',
 'Posada La Montaña, Boconó',
 TO_DATE('2024-06-15 13:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-06-15 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 65.00, 4, 21),

('Taller de Cervecería de Clima Frío',
 'Técnicas de elaboración en climas montañosos',
 'Universidad Valle del Momboy, Valera',
 TO_DATE('2024-08-31 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-08-31 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 70.00, 3, 21),

-- La Guaira (Estado ID: 22) - 5 eventos
('La Guaira Port Beer Festival',
 'Festival cervecero en el puerto principal',
 'Malecón de La Guaira',
 TO_DATE('2022-10-21 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2022-10-22 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 45.00, 1, 22),

('Concurso Cervecero Portuario',
 'Competencia especializada en cervezas costeras',
 'Centro de Convenciones Catia La Mar',
 TO_DATE('2024-01-05 08:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-01-06 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 38.00, 2, 22),

('Cata de Cervezas de Macuto',
 'Degustación frente al mar Caribe',
 'Hotel Meliá, Macuto',
 TO_DATE('2024-03-30 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-03-30 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 72.00, 6, 22),

('Maridaje Cervecero Aeroportuario',
 'Experiencia única en el aeropuerto internacional',
 'Terminal Maiquetía, La Guaira',
 TO_DATE('2024-05-17 15:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-05-17 19:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 85.00, 4, 22),

('Conferencia Cervecera Internacional',
 'Encuentro global de cerveceros en el puerto',
 'Centro de Convenciones Simón Bolívar',
 TO_DATE('2024-07-11 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-07-11 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 55.00, 5, 22),

-- Yaracuy (Estado ID: 23) - 5 eventos
('San Felipe Beer Festival',
 'Festival cervecero en la capital yaracuyana',
 'Plaza Bolívar, San Felipe',
 TO_DATE('2022-09-23 15:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2022-09-24 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 32.00, 1, 23),

('Concurso de Cerveceros Yaracuyanos',
 'Competencia estatal de productores locales',
 'Centro Cultural Yaritagua',
 TO_DATE('2024-01-26 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-01-27 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 25.00, 2, 23),

('Cata de Cervezas del Turbio',
 'Degustación en las riberas del río Turbio',
 'Hotel Colonial, San Felipe',
 TO_DATE('2024-04-04 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-04-04 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 48.00, 6, 23),

('Maridaje Cervecero de Chivacoa',
 'Experiencia gastronómica con productos regionales',
 'Casa de la Cultura, Chivacoa',
 TO_DATE('2024-06-01 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-06-01 20:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 55.00, 4, 23),

('Taller de Cervecería Artesanal Regional',
 'Curso de elaboración con ingredientes locales',
 'Centro de Formación Técnica, San Felipe',
 TO_DATE('2024-08-16 08:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-08-16 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 65.00, 3, 23),

-- Zulia (Estado ID: 24) - 5 eventos
('Maracaibo Beer Festival',
 'El festival cervecero más grande del occidente',
 'Paseo de la Chinita, Maracaibo',
 TO_DATE('2022-08-18 16:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2022-08-20 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 48.00, 1, 24),

('Concurso Cervecero Petrolero',
 'Competencia especial del sector petrolero',
 'Centro de Convenciones de Maracaibo',
 TO_DATE('2024-01-18 08:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-01-20 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 42.00, 2, 24),

('Cata de Cervezas del Lago',
 'Degustación con vista al Lago de Maracaibo',
 'Hotel Kristoff, Maracaibo',
 TO_DATE('2024-03-15 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-03-15 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 65.00, 6, 24),

('Maridaje Cervecero Cabimense',
 'Experiencia gastronómica en la costa oriental',
 'Restaurant El Puerto, Cabimas',
 TO_DATE('2024-05-31 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-05-31 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 58.00, 4, 24),

('Lanzamiento Cerveza Marabina',
 'Nueva línea inspirada en la cultura zuliana',
 'Puente sobre el Lago, Maracaibo',
 TO_DATE('2024-07-24 19:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-07-24 23:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 0.00, 7, 24); 

 /**
 * Inserción de registros en la tabla invitado_evento
 * @param fecha_hora_entrada - Fecha y hora en que el invitado ingresó al evento
 * @param fecha_hora_salida - Fecha y hora en que el invitado salió del evento
 * @param fk_evento - Referencia al evento
 * @param fk_invitado - Referencia al invitado
 */
INSERT INTO invitado_evento (fecha_hora_entrada, fecha_hora_salida, fk_evento, fk_invitado) VALUES
(TO_DATE('2024-06-15 14:30:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-06-15 20:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 1, 1),  -- Juan Pérez (VIP) en Festival de Cerveza

(TO_DATE('2024-06-15 15:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-06-15 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 1, 2),  -- María González (Prensa) en Festival de Cerveza

(TO_DATE('2024-07-20 09:30:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-07-20 17:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 2, 3),  -- Carlos Rodríguez (Influencer) en Concurso Nacional

(TO_DATE('2024-08-10 14:45:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-08-10 18:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 3, 4),  -- Ana Martínez (Cliente) en Taller de Cata

(TO_DATE('2024-09-05 11:30:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-09-05 19:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 4, 5),  -- Pedro López (Proveedor) en Festival de Maridaje

(TO_DATE('2024-10-15 09:15:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-10-15 16:30:00', 'YYYY-MM-DD HH24:MI:SS'),
 5, 6),  -- Laura Sánchez (Miembro del Club) en Conferencia

(TO_DATE('2024-11-01 18:30:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-11-01 21:45:00', 'YYYY-MM-DD HH24:MI:SS'),
 6, 7),  -- Roberto Díaz (Invitado General) en Degustación

(TO_DATE('2024-12-01 19:15:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-12-01 22:30:00', 'YYYY-MM-DD HH24:MI:SS'),
 7, 8),  -- Carmen Fernández (Expositor) en Lanzamiento IPA

(TO_DATE('2024-12-15 16:30:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2024-12-15 22:00:00', 'YYYY-MM-DD HH24:MI:SS'),
 8, 9),  -- Miguel Torres (CEO) en Festival de Invierno

(TO_DATE('2025-01-20 17:15:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2025-01-20 19:45:00', 'YYYY-MM-DD HH24:MI:SS'),
 9, 10),  -- Andrea Ramírez (Jefe de Marketing) en 50 Mejores Estilos

(TO_DATE('2025-02-10 10:15:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2025-02-10 15:30:00', 'YYYY-MM-DD HH24:MI:SS'),
 10, 11),  -- Daniel Castro (Representante de Marca) en Taller Elaboración

(TO_DATE('2025-03-01 14:15:00', 'YYYY-MM-DD HH24:MI:SS'),
 TO_DATE('2025-03-01 19:30:00', 'YYYY-MM-DD HH24:MI:SS'),
 11, 12);  -- Pablo Morales (Maestro Cervecero) en Tour Cervecerías

 /**
 * Inserción de registros en la tabla evento_cliente
 * @param fk_evento - Referencia al evento
 * @param fk_cliente_juridico - Referencia al cliente jurídico (debe ser NULL si hay cliente natural)
 * @param fk_cliente_natural - Referencia al cliente natural (debe ser NULL si hay cliente jurídico)
 */
INSERT INTO evento_cliente (fk_evento, fk_cliente_juridico, fk_cliente_natural) VALUES
(1, 1, NULL),  -- Tech Solutions asiste al Festival de Cerveza
(2, NULL, 1),  -- Juan Pérez asiste al Concurso Nacional
(3, 2, NULL),  -- Global Services asiste al Taller de Cata
(4, NULL, 2),  -- María Rodríguez asiste al Festival de Maridaje
(5, 3, NULL),  -- Constructora Delta asiste a la Conferencia
(6, NULL, 3),  -- José García asiste a la Degustación
(7, 4, NULL),  -- Distribuidora Omega asiste al Lanzamiento IPA
(8, NULL, 4),  -- Ana López asiste al Festival de Invierno
(9, 5, NULL),  -- Importadora Epsilon asiste a 50 Mejores Estilos
(10, NULL, 5), -- Carlos Martínez asiste al Taller Elaboración
(11, 6, NULL); -- Almacenes Beta asiste al Tour Cervecerías

/**
 * Inserción de registros en la tabla stock_miembro
 * @param cantidad - Cantidad de cervezas en stock
 * @param fk_miembro_1 - Referencia al RIF del miembro
 * @param fk_miembro_2 - Referencia a la naturaleza del RIF del miembro
 * @param fk_evento - Referencia al evento
 * @param fk_presentación_cerveza_1 - Referencia a la cerveza (SKU de presentación)
 * @param fk_presentación_cerveza_2 - Referencia a la presentación (ID de cerveza)
 */

INSERT INTO stock_miembro (
    cantidad,
    fk_miembro_1,
    fk_miembro_2,
    fk_evento,
    fk_presentacion_cerveza_1,
    fk_presentacion_cerveza_2
) VALUES
    (100, 123456789, 'J', 1, 1, 1),  -- 100 unidades de botella 330ml Destilo
    (50, 987654321, 'V', 1, 2, 2),   -- 50 unidades de botella 500ml Dos Leones
    (75, 234567890, 'J', 2, 3, 3),   -- 75 unidades de lata 330ml Benitz Pale Ale
    (200, 345678901, 'V', 3, 4, 4), -- 200 six-packs 330ml Candileja de Abadía
    (150, 456789012, 'J', 4, 5, 5), -- 150 cajas 24 unidades 330ml Ángel o Demonio
    (80, 567890123, 'V', 5, 6, 6),    -- 80 barriles 20L Barricas Saison Belga
    (120, 678901234, 'J', 6, 7, 7),   -- 120 barriles 30L Aldarra Mantuana
    (90, 789012345, 'V', 7, 8, 8),    -- 90 barriles 50L Tröegs HopBack Amber
    (180, 890123456, 'J', 8, 9, 9),   -- 180 growlers 1L Full Sail Amber
    (100, 901234567, 'V', 9, 10, 10), -- 100 cajas 12 unidades 500ml Deschutes Cinder Cone
    (160, 123456780, 'V', 10, 1, 1); -- 160 botellas 330ml Rogue American Amber

/**
 * Archivo de inserción de datos para las tablas de venta pt 1
 * Contiene inserts para: detalle_presentacion, miembro_presentacion_cerveza y venta
 * Cada tabla tendrá 10 registros de ejemplo
 */
INSERT INTO venta (monto_total, dirección_entrega, observación, fk_usuario, fk_lugar, fk_cliente_juridico, fk_cliente_natural, fk_tienda_fisica, fk_tienda_web) VALUES
(10.00, NULL, 'Entrega urgente solicitada', NULL, NULL, 1, NULL, 1, NULL),  /** Venta en tienda física con cliente jurídico */
(18.00, NULL, 'Cliente frecuente', NULL, NULL, NULL, 1, 1, NULL),        /** Venta en tienda física con cliente natural */
(29.00, 'Av. Libertador #42, San Francisco', 'Pedido especial para evento', 3, 458, NULL, NULL, NULL, 1), /** Venta en tienda web con usuario */
(39.00, NULL, 'Pago en efectivo', NULL, NULL, 2, NULL, 1, NULL),              /** Venta en tienda física con cliente jurídico */
(10.00, NULL, 'Descuento aplicado', NULL, NULL, NULL, 2, 1, NULL),      /** Venta en tienda física con cliente natural */
(32.00, 'Av. Rio Rio #41, El Morro', 'Entrega coordinada', 32, 442, NULL, NULL, NULL, 1),             /** Venta en tienda web con usuario */
(49.00, NULL, 'Cliente nuevo', NULL, NULL, 3, NULL, 1, NULL),                      /** Venta en tienda física con cliente jurídico */
(29.00, NULL, 'Pedido corporativo', NULL, NULL, NULL, 3, 1, NULL),       /** Venta en tienda física con cliente natural */
(18.00, 'Calle Miranda #123', 'Entrega express', 33, 369, NULL, NULL, NULL, 1),                     /** Venta en tienda web con usuario */
(59.00, NULL, 'Venta promocional', NULL, NULL, 4, NULL, 1, NULL),       /** Venta en tienda física con cliente jurídico */

/** Ventas adicionales para clientes naturales - 2 ventas por cada cliente natural  (40 ventas) */
(39.00, NULL, 'Primera compra del cliente', NULL, NULL, NULL, 1, 1, NULL),            /** Venta 11: Cliente natural 1 - primera venta */
(14.00, NULL, 'Segunda compra del mes', NULL, NULL, NULL, 1, 1, NULL),               /** Venta 12: Cliente natural 1 - segunda venta */
(49.00, NULL, 'Pedido regular', NULL, NULL, NULL, 2, 1, NULL),                     /** Venta 13: Cliente natural 2 - primera venta */
(29.00, NULL, 'Compra especial', NULL, NULL, NULL, 2, 1, NULL),                  /** Venta 14: Cliente natural 2 - segunda venta */
(14.00, 'Calle Orinoco, Edif. Plaza Mayor, Ucata', 'Venta matutina', 34, 388, NULL, NULL, NULL, 1),                          /** Venta 15: Cliente natural 3 - primera venta - WEB */
(59.00, NULL, 'Venta vespertina', NULL, NULL, NULL, 3, 1, NULL),                       /** Venta 16: Cliente natural 3 - segunda venta */  
(27.00, NULL, 'Compra fin de semana', NULL, NULL, NULL, 4, 1, NULL),                 /** Venta 17: Cliente natural 4 - primera venta */
(10.00, 'Universidad Catolica Andres Bello, Caracas', 'Pedido express', 35, 362, NULL, NULL, NULL, 1),                        /** Venta 18: Cliente natural 4 - segunda venta - WEB */
(39.00, NULL, 'Venta corporativa', NULL, NULL, NULL, 5, 1, NULL),                        /** Venta 19: Cliente natural 5 - primera venta */
(29.00, NULL, 'Pedido especial evento', NULL, NULL, NULL, 5, 1, NULL),                  /** Venta 20: Cliente natural 5 - segunda venta */
(18.00, 'Av. Venezuela, El Rosal, Torre Financiera', 'Compra mensual', 3, 421, NULL, NULL, NULL, 1),                      /** Venta 21: Cliente natural 6 - primera venta - WEB */
(19.00, NULL, 'Venta promocional', NULL, NULL, NULL, 6, 1, NULL),                 /** Venta 22: Cliente natural 6 - segunda venta */
(53.00, NULL, 'Pedido urgente', NULL, NULL, NULL, 7, 1, NULL),                        /** Venta 23: Cliente natural 7 - primera venta */
(10.00, 'Calle Londres, Coche', 'Compra regular', 36, 365, NULL, NULL, NULL, 1),                         /** Venta 24: Cliente natural 7 - segunda venta - WEB */
(37.00, NULL, 'Venta especial', NULL, NULL, NULL, 8, 1, NULL),                       /** Venta 25: Cliente natural 8 - primera venta */
(59.00, NULL, 'Segunda compra', NULL, NULL, NULL, 8, 1, NULL),                        /** Venta 26: Cliente natural 8 - segunda venta */
(14.00, 'Av. Río de Janeiro, casa 3', 'Compra mayorista', 37, 427, NULL, NULL, NULL, 1),                   /** Venta 27: Cliente natural 9 - primera venta - WEB */
(19.00, NULL, 'Pedido regular', NULL, NULL, NULL, 9, 1, NULL),                     /** Venta 28: Cliente natural 9 - segunda venta */
(43.00, NULL, 'Venta matinal', NULL, NULL, NULL, 10, 1, NULL),                     /** Venta 29: Cliente natural 10 - primera venta */
(29.00, 'Av. Principal de La Castellana, Torre Sky', 'Compra nocturna', 38, 430, NULL, NULL, NULL, 1),                 /** Venta 30: Cliente natural 10 - segunda venta - WEB */
(49.00, NULL, 'Pedido estándar', NULL, NULL, NULL, 11, 1, NULL),                     /** Venta 31: Cliente natural 11 - primera venta */
(14.00, NULL, 'Venta especial', NULL, NULL, NULL, 11, 1, NULL),                     /** Venta 32: Cliente natural 11 - segunda venta */
(19.00, 'Calle Madrid, Coromoto, Piso 8', 'Compra quincenal', 39, 400, NULL, NULL, NULL, 1),                  /** Venta 33: Cliente natural 12 - primera venta - WEB */
(67.00, NULL, 'Pedido express', NULL, NULL, NULL, 12, 1, NULL),                     /** Venta 34: Cliente natural 12 - segunda venta */
(29.00, NULL, 'Primera compra', NULL, NULL, NULL, 13, 1, NULL),                    /** Venta 35: Cliente natural 13 - primera venta */
(10.00, 'Av. Eugenio Mendoza, Anaco, Torre 1', 'Segunda compra', 40, 415, NULL, NULL, NULL, 1),                     /** Venta 36: Cliente natural 13 - segunda venta - WEB */
(57.00, NULL, 'Venta corporativa', NULL, NULL, NULL, 14, 1, NULL),                /** Venta 37: Cliente natural 14 - primera venta */
(19.00, NULL, 'Pedido regular', NULL, NULL, NULL, 14, 1, NULL),                   /** Venta 38: Cliente natural 14 - segunda venta */
(43.00, 'Calle Los Laboratorios, Los Cortijos, Edif. Médico', 'Compra semanal', 41, 439, NULL, NULL, NULL, 1),                        /** Venta 39: Cliente natural 15 - primera venta - WEB */
(29.00, NULL, 'Venta promocional', NULL, NULL, NULL, 15, 1, NULL),                    /** Venta 40: Cliente natural 15 - segunda venta */
(18.00, NULL, 'Pedido especial', NULL, NULL, NULL, 16, 1, NULL),                    /** Venta 41: Cliente natural 16 - primera venta */
(10.00, 'Av. Blandin, Guanta, Centro Profesional', 'Compra regular', 42, 432, NULL, NULL, NULL, 1),                      /** Venta 42: Cliente natural 16 - segunda venta - WEB */
(43.00, NULL, 'Venta matutina', NULL, NULL, NULL, 17, 1, NULL),                       /** Venta 43: Cliente natural 17 - primera venta */
(29.00, NULL, 'Pedido vespertino', NULL, NULL, NULL, 17, 1, NULL),                     /** Venta 44: Cliente natural 17 - segunda venta */
(57.00, NULL, 'Compra fin de mes', NULL, NULL, NULL, 18, 1, NULL),                     /** Venta 45: Cliente natural 18 - primera venta */
(19.00, NULL, 'Venta especial', NULL, NULL, NULL, 18, 1, NULL),                         /** Venta 46: Cliente natural 18 - segunda venta */
(59.00, NULL, 'Pedido mayorista', NULL, NULL, NULL, 19, 1, NULL),                  /** Venta 47: Cliente natural 19 - primera venta */
(18.00, NULL, 'Compra regular', NULL, NULL, NULL, 19, 1, NULL),                    /** Venta 48: Cliente natural 19 - segunda venta */
(29.00, NULL, 'Venta promocional', NULL, NULL, NULL, 20, 1, NULL),                 /** Venta 49: Cliente natural 20 - primera venta */
(10.00, NULL, 'Pedido especial', NULL, NULL, NULL, 20, 1, NULL),                     /** Venta 50: Cliente natural 20 - segunda venta */

/** Ventas adicionales para clientes jurídicos - 2 ventas por cada cliente jurídico (40 ventas) */
(47.00, NULL, 'Pedido corporativo mensual', NULL, NULL, 1, NULL, 1, NULL),         /** Venta 51: Cliente jurídico 1 - primera venta */
(19.00, NULL, 'Compra para eventos', NULL, NULL, 1, NULL, 1, NULL),               /** Venta 52: Cliente jurídico 1 - segunda venta */
(53.00, NULL, 'Pedido regular empresa', NULL, NULL, 2, NULL, 1, NULL),                /** Venta 53: Cliente jurídico 2 - primera venta */
(29.00, NULL, 'Venta corporativa especial', NULL, NULL, 2, NULL, 1, NULL),           /** Venta 54: Cliente jurídico 2 - segunda venta */
(59.00, NULL, 'Compra construcción', NULL, NULL, 3, NULL, 1, NULL),                  /** Venta 55: Cliente jurídico 3 - primera venta */
(14.00, NULL, 'Pedido obra nueva', NULL, NULL, 3, NULL, 1, NULL),                    /** Venta 56: Cliente jurídico 3 - segunda venta */
(23.00, NULL, 'Venta distribución', NULL, NULL, 4, NULL, 1, NULL),                 /** Venta 57: Cliente jurídico 4 - primera venta */
(39.00, NULL, 'Pedido mayorista', NULL, NULL, 4, NULL, 1, NULL),                  /** Venta 58: Cliente jurídico 4 - segunda venta */
(33.00, NULL, 'Compra importación', NULL, NULL, 5, NULL, 1, NULL),                     /** Venta 59: Cliente jurídico 5 - primera venta */
(49.00, NULL, 'Venta comercial', NULL, NULL, 5, NULL, 1, NULL),                        /** Venta 60: Cliente jurídico 5 - segunda venta */
(10.00, NULL, 'Pedido almacén', NULL, NULL, 6, NULL, 1, NULL),                       /** Venta 61: Cliente jurídico 6 - primera venta */
(27.00, NULL, 'Compra bodega', NULL, NULL, 6, NULL, 1, NULL),                        /** Venta 62: Cliente jurídico 6 - segunda venta */
(59.00, NULL, 'Venta comercializadora', NULL, NULL, 7, NULL, 1, NULL),                   /** Venta 63: Cliente jurídico 7 - primera venta */
(33.00, NULL, 'Pedido especial empresa', NULL, NULL, 7, NULL, 1, NULL),                 /** Venta 64: Cliente jurídico 7 - segunda venta */
(39.00, NULL, 'Compra distribuidora', NULL, NULL, 8, NULL, 1, NULL),               /** Venta 65: Cliente jurídico 8 - primera venta */
(19.00, NULL, 'Venta corporativa', NULL, NULL, 8, NULL, 1, NULL),                  /** Venta 66: Cliente jurídico 8 - segunda venta */
(57.00, NULL, 'Pedido importadora', NULL, NULL, 9, NULL, 1, NULL),                    /** Venta 67: Cliente jurídico 9 - primera venta */
(29.00, NULL, 'Compra comercial', NULL, NULL, 9, NULL, 1, NULL),                     /** Venta 68: Cliente jurídico 9 - segunda venta */
(43.00, NULL, 'Venta almacén lambda', NULL, NULL, 10, NULL, 1, NULL),                /** Venta 69: Cliente jurídico 10 - primera venta */
(59.00, NULL, 'Pedido mensual', NULL, NULL, 10, NULL, 1, NULL),                     /** Venta 70: Cliente jurídico 10 - segunda venta */
(19.00, NULL, 'Compra comercializadora zeta', NULL, NULL, 11, NULL, 1, NULL),      /** Venta 71: Cliente jurídico 11 - primera venta */
(18.00, NULL, 'Venta corporativa', NULL, NULL, 11, NULL, 1, NULL),                /** Venta 72: Cliente jurídico 11 - segunda venta */
(68.00, NULL, 'Pedido omega plus', NULL, NULL, 12, NULL, 1, NULL),                /** Venta 73: Cliente jurídico 12 - primera venta */
(14.00, NULL, 'Compra especial', NULL, NULL, 12, NULL, 1, NULL),                 /** Venta 74: Cliente jurídico 12 - segunda venta */
(59.00, NULL, 'Venta corporación alpha', NULL, NULL, 13, NULL, 1, NULL),           /** Venta 75: Cliente jurídico 13 - primera venta */
(19.00, NULL, 'Pedido empresarial', NULL, NULL, 13, NULL, 1, NULL),               /** Venta 76: Cliente jurídico 13 - segunda venta */
(47.00, NULL, 'Compra servicios bravo', NULL, NULL, 14, NULL, 1, NULL),            /** Venta 77: Cliente jurídico 14 - primera venta */
(29.00, NULL, 'Venta regular', NULL, NULL, 14, NULL, 1, NULL),                     /** Venta 78: Cliente jurídico 14 - segunda venta */
(49.00, NULL, 'Pedido constructora charlie', NULL, NULL, 15, NULL, 1, NULL),      /** Venta 79: Cliente jurídico 15 - primera venta */
(27.00, NULL, 'Compra obra grande', NULL, NULL, 15, NULL, 1, NULL),              /** Venta 80: Cliente jurídico 15 - segunda venta */
(59.00, NULL, 'Venta logística delta', NULL, NULL, 16, NULL, 1, NULL),             /** Venta 81: Cliente jurídico 16 - primera venta */
(29.00, NULL, 'Pedido transporte', NULL, NULL, 16, NULL, 1, NULL),                /** Venta 82: Cliente jurídico 16 - segunda venta */
(43.00, NULL, 'Compra importadora echo', NULL, NULL, 17, NULL, 1, NULL),           /** Venta 83: Cliente jurídico 17 - primera venta */
(19.00, NULL, 'Venta comercial', NULL, NULL, 17, NULL, 1, NULL),                   /** Venta 84: Cliente jurídico 17 - segunda venta */
(57.00, NULL, 'Pedido comercial foxtrot', NULL, NULL, 18, NULL, 1, NULL),          /** Venta 85: Cliente jurídico 18 - primera venta */
(10.00, NULL, 'Compra regular', NULL, NULL, 18, NULL, 1, NULL),                    /** Venta 86: Cliente jurídico 18 - segunda venta */
(33.00, NULL, 'Venta distribuidora golf', NULL, NULL, 19, NULL, 1, NULL),         /** Venta 87: Cliente jurídico 19 - primera venta */
(59.00, NULL, 'Pedido mayorista', NULL, NULL, 19, NULL, 1, NULL),                /** Venta 88: Cliente jurídico 19 - segunda venta */
(23.00, NULL, 'Compra exportadora hotel', NULL, NULL, 20, NULL, 1, NULL),        /** Venta 89: Cliente jurídico 20 - primera venta */
(39.00, NULL, 'Venta internacional', NULL, NULL, 20, NULL, 1, NULL);            /** Venta 90: Cliente jurídico 20 - segunda venta */

/**
 * Inserción de datos para la tabla detalle_presentacion  
 * Almacena los detalles de las presentaciones de productos en cada venta
 * Cada venta contiene una cantidad total de 10 productos (suma de cantidades)
 * @param cantidad - Cantidad de productos vendidos (tipo: INTEGER)
 * @param precio_unitario - Precio por unidad del producto (tipo: DECIMAL)
 * @param fk_inventario_1 - Primera clave foránea del inventario - SKU (tipo: VARCHAR)
 * @param fk_inventario_2 - Segunda clave foránea del inventario - ID cerveza (tipo: INTEGER)
 * @param fk_inventario_3 - Tercera clave foránea del inventario - ID almacén (tipo: INTEGER)
 * @param fk_venta - Clave foránea que referencia la venta (tipo: INTEGER)
 */
INSERT INTO detalle_presentacion (cantidad, precio_unitario, fk_presentacion, fk_cerveza, fk_venta) VALUES
/** Venta 1: 5 botellas + 3 latas + 2 growlers = 10 productos */
(5, 1.00, 1, 1, 1),       /** 5 botellas 330ml cerveza 1 */
(3, 1.00, 3, 3, 1),       /** 3 latas 330ml cerveza 3 */
(2, 1.00, 9, 9, 1),       /** 2 growlers 1L cerveza 9 */

/** Venta 2: 4 botellas 500ml + 2 six-packs + 4 latas = 10 productos */
(4, 1.00, 2, 2, 2),       /** 4 botellas 500ml cerveza 2 */
(2, 5.00, 4, 4, 2),     /** 2 six-packs 330ml cerveza 4 */
(4, 1.00, 3, 3, 2),       /** 4 latas 330ml cerveza 3 */

/** Venta 3: 6 botellas + 2 botellas 500ml + 1 caja + 1 lata = 10 productos */
(6, 1.00, 1, 1, 3),       /** 6 botellas 330ml cerveza 1 */
(2, 1.00, 2, 2, 3),       /** 2 botellas 500ml cerveza 2 */
(1, 20.00, 5, 5, 3),    /** 1 caja 24 unidades cerveza 5 */
(1, 1.00, 3, 3, 3),       /** 1 lata 330ml cerveza 3 */

/** Venta 4: 3 botellas + 2 latas + 1 barril + 4 botellas 330ml cerveza 11 = 10 productos */
(3, 1.00, 1, 1, 4),       /** 3 botellas 330ml cerveza 1 */
(2, 1.00, 3, 3, 4),       /** 2 latas 330ml cerveza 3 */
(1, 30.00, 6, 6, 4),       /** 1 barril 20L cerveza 6 */
(4, 1.00, 1, 11, 4),      /** 4 botellas 330ml cerveza 11 */

/** Venta 5: 5 botellas 500ml + 3 latas + 2 growlers = 10 productos */
(5, 1.00, 2, 12, 5),      /** 5 botellas 500ml cerveza 12 */
(3, 1.00, 3, 13, 5),      /** 3 latas 330ml cerveza 13 */
(2, 1.00, 9, 9, 5),       /** 2 growlers 1L cerveza 9 */

/** Venta 6: 4 botellas + 1 six-pack + 3 latas + 2 cajas 12 unidades = 10 productos */
(4, 1.00, 1, 1, 6),       /** 4 botellas 330ml cerveza 1 */
(1, 5.00, 4, 14, 6),    /** 1 six-pack 330ml cerveza 14 */
(3, 1.00, 3, 3, 6),       /** 3 latas 330ml cerveza 3 */
(2, 10.00, 10, 10, 6),   /** 2 cajas 12 unidades 500ml cerveza 10 */

/** Venta 7: 7 botellas + 1 barril + 2 latas = 10 productos */
(7, 1.00, 1, 11, 7),      /** 7 botellas 330ml cerveza 11 */
(1, 40.00, 7, 7, 7),      /** 1 barril 30L cerveza 7 */
(2, 1.00, 3, 13, 7),      /** 2 latas 330ml cerveza 13 */

/** Venta 8: 6 botellas + 1 caja + 3 latas = 10 productos */
(6, 1.00, 1, 1, 8),       /** 6 botellas 330ml cerveza 1 */
(1, 20.00, 5, 15, 8),   /** 1 caja 24 unidades cerveza 15 */
(3, 1.00, 3, 3, 8),       /** 3 latas 330ml cerveza 3 */

/** Venta 9: 5 botellas 500ml + 2 six-packs + 3 latas = 10 productos */
(5, 1.00, 2, 2, 9),       /** 5 botellas 500ml cerveza 2 */
(2, 5.00, 4, 4, 9),     /** 2 six-packs 330ml cerveza 4 */
(3, 1.00, 3, 13, 9),      /** 3 latas 330ml cerveza 13 */

/** Venta 10: 4 botellas + 1 barril + 2 growlers + 3 latas = 10 productos */
(4, 1.00, 1, 11, 10),     /** 4 botellas 330ml cerveza 11 */
(1, 50.00, 8, 8, 10),     /** 1 barril 50L cerveza 8 */
(2, 1.00, 9, 9, 10),      /** 2 growlers 1L cerveza 9 */
(3, 1.00, 3, 3, 10),      /** 3 latas 330ml cerveza 3 */

/** Venta 11: 8 botellas + 1 barril + 1 lata = 10 productos */
(8, 1.00, 1, 1, 11),      /** 8 botellas 330ml cerveza 1 */
(1, 30.00, 6, 16, 11),     /** 1 barril 20L cerveza 16 */
(1, 1.00, 3, 3, 11),      /** 1 lata 330ml cerveza 3 */

/** Venta 12: 3 botellas + 1 six-pack + 2 botellas 500ml + 4 latas = 10 productos */
(3, 1.00, 1, 1, 12),      /** 3 botellas 330ml cerveza 1 */
(1, 5.00, 4, 4, 12),    /** 1 six-pack 330ml cerveza 4 */
(2, 1.00, 2, 12, 12),     /** 2 botellas 500ml cerveza 12 */
(4, 1.00, 3, 3, 12),      /** 4 latas 330ml cerveza 3 */

/** Venta 13: 6 latas + 1 barril + 3 botellas 500ml = 10 productos */
(6, 1.00, 3, 13, 13),     /** 6 latas 330ml cerveza 13 */
(1, 40.00, 7, 17, 13),    /** 1 barril 30L cerveza 17 */
(3, 1.00, 2, 2, 13),      /** 3 botellas 500ml cerveza 2 */

/** Venta 14: 5 botellas + 1 caja + 4 latas = 10 productos */
(5, 1.00, 1, 11, 14),     /** 5 botellas 330ml cerveza 11 */
(1, 20.00, 5, 5, 14),   /** 1 caja 24 unidades cerveza 5 */
(4, 1.00, 3, 13, 14),     /** 4 latas 330ml cerveza 13 */

/** Venta 15: 4 botellas + 2 botellas 500ml + 1 six-pack + 3 latas = 10 productos */
(4, 1.00, 1, 1, 15),      /** 4 botellas 330ml cerveza 1 */
(2, 1.00, 2, 2, 15),      /** 2 botellas 500ml cerveza 2 */
(1, 5.00, 4, 14, 15),   /** 1 six-pack 330ml cerveza 14 */
(3, 1.00, 3, 3, 15),      /** 3 latas 330ml cerveza 3 */

/** Venta 16: 7 botellas + 1 barril + 2 latas = 10 productos */
(7, 1.00, 1, 11, 16),     /** 7 botellas 330ml cerveza 11 */
(1, 50.00, 8, 18, 16),    /** 1 barril 50L cerveza 18 */
(2, 1.00, 3, 13, 16),     /** 2 latas 330ml cerveza 13 */

/** Venta 17: 3 botellas + 2 six-packs + 1 caja + 4 latas = 10 productos */
(3, 1.00, 1, 1, 17),      /** 3 botellas 330ml cerveza 1 */
(2, 5.00, 4, 4, 17),    /** 2 six-packs 330ml cerveza 4 */
(1, 10.00, 10, 10, 17),  /** 1 caja 12 unidades 500ml cerveza 10 */
(4, 1.00, 3, 3, 17),      /** 4 latas 330ml cerveza 3 */

/** Venta 18: 6 botellas 500ml + 2 growlers + 2 latas = 10 productos */
(6, 1.00, 2, 12, 18),     /** 6 botellas 500ml cerveza 12 */
(2, 1.00, 9, 9, 18),      /** 2 growlers 1L cerveza 9 */
(2, 1.00, 3, 13, 18),     /** 2 latas 330ml cerveza 13 */

/** Venta 19: 5 latas + 1 barril + 4 botellas = 10 productos */
(5, 1.00, 3, 3, 19),      /** 5 latas 330ml cerveza 3 */
(1, 30.00, 6, 6, 19),      /** 1 barril 20L cerveza 6 */
(4, 1.00, 1, 11, 19),     /** 4 botellas 330ml cerveza 11 */

/** Venta 20: 8 botellas + 1 caja + 1 lata = 10 productos */
(8, 1.00, 1, 1, 20),      /** 8 botellas 330ml cerveza 1 */
(1, 20.00, 5, 15, 20),  /** 1 caja 24 unidades cerveza 15 */
(1, 1.00, 3, 3, 20),      /** 1 lata 330ml cerveza 3 */

/** Ventas 21-40: Combinaciones adicionales usando todos los productos del inventario */
/** Venta 21: 4 botellas + 3 latas + 2 six-packs + 1 growler = 10 productos */
(4, 1.00, 1, 1, 21),      /** 4 botellas 330ml cerveza 1 */
(3, 1.00, 3, 3, 21),      /** 3 latas 330ml cerveza 3 */
(2, 5.00, 4, 14, 21),   /** 2 six-packs 330ml cerveza 14 */
(1, 1.00, 9, 9, 21),      /** 1 growler 1L cerveza 9 */

/** Venta 22: 6 botellas 500ml + 2 latas + 1 caja + 1 botella = 10 productos */
(6, 1.00, 2, 12, 22),     /** 6 botellas 500ml cerveza 12 */
(2, 1.00, 3, 13, 22),     /** 2 latas 330ml cerveza 13 */
(1, 10.00, 10, 10, 22),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 1.00, 1, 11, 22),     /** 1 botella 330ml cerveza 11 */

/** Venta 23: 5 botellas + 1 barril + 3 latas + 1 six-pack = 10 productos */
(5, 1.00, 1, 1, 23),      /** 5 botellas 330ml cerveza 1 */
(1, 40.00, 7, 17, 23),    /** 1 barril 30L cerveza 17 */
(3, 1.00, 3, 3, 23),      /** 3 latas 330ml cerveza 3 */
(1, 5.00, 4, 4, 23),    /** 1 six-pack 330ml cerveza 4 */

/** Venta 24: 7 latas + 2 botellas 500ml + 1 growler = 10 productos */
(7, 1.00, 3, 13, 24),     /** 7 latas 330ml cerveza 13 */
(2, 1.00, 2, 2, 24),      /** 2 botellas 500ml cerveza 2 */
(1, 1.00, 9, 9, 24),      /** 1 growler 1L cerveza 9 */

/** Venta 25: 3 botellas + 1 caja + 2 six-packs + 4 latas = 10 productos */
(3, 1.00, 1, 11, 25),     /** 3 botellas 330ml cerveza 11 */
(1, 20.00, 5, 15, 25),  /** 1 caja 24 unidades cerveza 15 */
(2, 5.00, 4, 14, 25),   /** 2 six-packs 330ml cerveza 14 */
(4, 1.00, 3, 3, 25),      /** 4 latas 330ml cerveza 3 */

/** Venta 26: 8 botellas + 1 barril + 1 lata = 10 productos */
(8, 1.00, 1, 1, 26),      /** 8 botellas 330ml cerveza 1 */
(1, 50.00, 8, 18, 26),    /** 1 barril 50L cerveza 18 */
(1, 1.00, 3, 13, 26),     /** 1 lata 330ml cerveza 13 */

/** Venta 27: 4 botellas 500ml + 3 latas + 2 growlers + 1 six-pack = 10 productos */
(4, 1.00, 2, 12, 27),     /** 4 botellas 500ml cerveza 12 */
(3, 1.00, 3, 3, 27),      /** 3 latas 330ml cerveza 3 */
(2, 1.00, 9, 9, 27),      /** 2 growlers 1L cerveza 9 */
(1, 5.00, 4, 4, 27),    /** 1 six-pack 330ml cerveza 4 */

/** Venta 28: 6 botellas + 1 caja + 2 latas + 1 botella 500ml = 10 productos */
(6, 1.00, 1, 11, 28),     /** 6 botellas 330ml cerveza 11 */
(1, 10.00, 10, 10, 28),  /** 1 caja 12 unidades 500ml cerveza 10 */
(2, 1.00, 3, 13, 28),     /** 2 latas 330ml cerveza 13 */
(1, 1.00, 2, 2, 28),      /** 1 botella 500ml cerveza 2 */

/** Venta 29: 5 latas + 1 barril + 3 botellas + 1 six-pack = 10 productos */
(5, 1.00, 3, 3, 29),      /** 5 latas 330ml cerveza 3 */
(1, 30.00, 6, 16, 29),     /** 1 barril 20L cerveza 16 */
(3, 1.00, 1, 1, 29),      /** 3 botellas 330ml cerveza 1 */
(1, 5.00, 4, 14, 29),   /** 1 six-pack 330ml cerveza 14 */

/** Venta 30: 7 botellas + 1 caja + 2 latas = 10 productos */
(7, 1.00, 1, 11, 30),     /** 7 botellas 330ml cerveza 11 */
(1, 20.00, 5, 5, 30),   /** 1 caja 24 unidades cerveza 5 */
(2, 1.00, 3, 13, 30),     /** 2 latas 330ml cerveza 13 */

/** Continuando con ventas 31-50 usando más productos del inventario */
/** Venta 31: 4 botellas + 2 botellas 500ml + 1 barril + 3 latas = 10 productos */
(4, 1.00, 1, 1, 31),      /** 4 botellas 330ml cerveza 1 */
(2, 1.00, 2, 12, 31),     /** 2 botellas 500ml cerveza 12 */
(1, 40.00, 7, 7, 31),     /** 1 barril 30L cerveza 7 */
(3, 1.00, 3, 3, 31),      /** 3 latas 330ml cerveza 3 */

/** Venta 32: 8 latas + 1 six-pack + 1 growler = 10 productos */
(8, 1.00, 3, 13, 32),     /** 8 latas 330ml cerveza 13 */
(1, 5.00, 4, 4, 32),    /** 1 six-pack 330ml cerveza 4 */
(1, 1.00, 9, 9, 32),      /** 1 growler 1L cerveza 9 */

/** Venta 33: 5 botellas + 1 caja + 2 botellas 500ml + 2 latas = 10 productos */
(5, 1.00, 1, 11, 33),     /** 5 botellas 330ml cerveza 11 */
(1, 10.00, 10, 10, 33),  /** 1 caja 12 unidades 500ml cerveza 10 */
(2, 1.00, 2, 2, 33),      /** 2 botellas 500ml cerveza 2 */
(2, 1.00, 3, 3, 33),      /** 2 latas 330ml cerveza 3 */

/** Venta 34: 6 botellas + 1 barril + 2 six-packs + 1 lata = 10 productos */
(6, 1.00, 1, 1, 34),      /** 6 botellas 330ml cerveza 1 */
(1, 50.00, 8, 8, 34),     /** 1 barril 50L cerveza 8 */
(2, 5.00, 4, 14, 34),   /** 2 six-packs 330ml cerveza 14 */
(1, 1.00, 3, 13, 34),     /** 1 lata 330ml cerveza 13 */

/** Venta 35: 3 botellas 500ml + 4 latas + 2 growlers + 1 caja = 10 productos */
(3, 1.00, 2, 12, 35),     /** 3 botellas 500ml cerveza 12 */
(4, 1.00, 3, 3, 35),      /** 4 latas 330ml cerveza 3 */
(2, 1.00, 9, 9, 35),      /** 2 growlers 1L cerveza 9 */
(1, 20.00, 5, 15, 35),  /** 1 caja 24 unidades cerveza 15 */

/** Venta 36: 9 botellas + 1 lata = 10 productos */
(9, 1.00, 1, 11, 36),     /** 9 botellas 330ml cerveza 11 */
(1, 1.00, 3, 13, 36),     /** 1 lata 330ml cerveza 13 */

/** Venta 37: 5 latas + 1 barril + 2 botellas 500ml + 2 six-packs = 10 productos */
(5, 1.00, 3, 3, 37),      /** 5 latas 330ml cerveza 3 */
(1, 40.00, 7, 17, 37),    /** 1 barril 30L cerveza 17 */
(2, 1.00, 2, 2, 37),      /** 2 botellas 500ml cerveza 2 */
(2, 5.00, 4, 4, 37),    /** 2 six-packs 330ml cerveza 4 */

/** Venta 38: 4 botellas + 1 caja + 3 latas + 2 growlers = 10 productos */
(4, 1.00, 1, 1, 38),      /** 4 botellas 330ml cerveza 1 */
(1, 10.00, 10, 10, 38),  /** 1 caja 12 unidades 500ml cerveza 10 */
(3, 1.00, 3, 13, 38),     /** 3 latas 330ml cerveza 13 */
(2, 1.00, 9, 9, 38),      /** 2 growlers 1L cerveza 9 */

/** Venta 39: 7 botellas + 1 barril + 1 six-pack + 1 lata = 10 productos */
(7, 1.00, 1, 11, 39),     /** 7 botellas 330ml cerveza 11 */
(1, 30.00, 6, 6, 39),      /** 1 barril 20L cerveza 6 */
(1, 5.00, 4, 14, 39),   /** 1 six-pack 330ml cerveza 14 */
(1, 1.00, 3, 3, 39),      /** 1 lata 330ml cerveza 3 */

/** Venta 40: 6 latas + 2 botellas 500ml + 1 caja + 1 botella = 10 productos */
(6, 1.00, 3, 13, 40),     /** 6 latas 330ml cerveza 13 */
(2, 1.00, 2, 12, 40),     /** 2 botellas 500ml cerveza 12 */
(1, 20.00, 5, 5, 40),   /** 1 caja 24 unidades cerveza 5 */
(1, 1.00, 1, 1, 40),      /** 1 botella 330ml cerveza 1 */

/** Ventas 41-90: Completando todas las ventas con variedad de productos */
/** Venta 41: 5 botellas + 2 six-packs + 3 latas = 10 productos */
(5, 1.00, 1, 1, 41),      /** 5 botellas 330ml cerveza 1 */
(2, 5.00, 4, 4, 41),    /** 2 six-packs 330ml cerveza 4 */
(3, 1.00, 3, 3, 41),      /** 3 latas 330ml cerveza 3 */

/** Venta 42: 4 botellas + 3 botellas 500ml + 2 growlers + 1 lata = 10 productos */
(4, 1.00, 1, 11, 42),     /** 4 botellas 330ml cerveza 11 */
(3, 1.00, 2, 12, 42),     /** 3 botellas 500ml cerveza 12 */
(2, 1.00, 9, 9, 42),      /** 2 growlers 1L cerveza 9 */
(1, 1.00, 3, 13, 42),     /** 1 lata 330ml cerveza 13 */

/** Venta 43: 6 latas + 1 barril + 2 botellas + 1 six-pack = 10 productos */
(6, 1.00, 3, 3, 43),      /** 6 latas 330ml cerveza 3 */
(1, 30.00, 6, 16, 43),     /** 1 barril 20L cerveza 16 */
(2, 1.00, 1, 1, 43),      /** 2 botellas 330ml cerveza 1 */
(1, 5.00, 4, 14, 43),   /** 1 six-pack 330ml cerveza 14 */

/** Venta 44: 7 botellas + 1 caja + 2 latas = 10 productos */
(7, 1.00, 1, 11, 44),     /** 7 botellas 330ml cerveza 11 */
(1, 20.00, 5, 15, 44),  /** 1 caja 24 unidades cerveza 15 */
(2, 1.00, 3, 13, 44),     /** 2 latas 330ml cerveza 13 */

/** Venta 45: 3 botellas 500ml + 4 latas + 1 barril + 2 six-packs = 10 productos */
(3, 1.00, 2, 2, 45),      /** 3 botellas 500ml cerveza 2 */
(4, 1.00, 3, 3, 45),      /** 4 latas 330ml cerveza 3 */
(1, 40.00, 7, 17, 45),    /** 1 barril 30L cerveza 17 */
(2, 5.00, 4, 4, 45),    /** 2 six-packs 330ml cerveza 4 */

/** Venta 46: 8 botellas + 1 caja + 1 growler = 10 productos */
(8, 1.00, 1, 1, 46),      /** 8 botellas 330ml cerveza 1 */
(1, 10.00, 10, 10, 46),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 1.00, 9, 9, 46),      /** 1 growler 1L cerveza 9 */

/** Venta 47: 5 latas + 2 botellas 500ml + 1 barril + 2 botellas = 10 productos */
(5, 1.00, 3, 13, 47),     /** 5 latas 330ml cerveza 13 */
(2, 1.00, 2, 12, 47),     /** 2 botellas 500ml cerveza 12 */
(1, 50.00, 8, 18, 47),    /** 1 barril 50L cerveza 18 */
(2, 1.00, 1, 11, 47),     /** 2 botellas 330ml cerveza 11 */

/** Venta 48: 6 botellas + 2 six-packs + 2 latas = 10 productos */
(6, 1.00, 1, 1, 48),      /** 6 botellas 330ml cerveza 1 */
(2, 5.00, 4, 14, 48),   /** 2 six-packs 330ml cerveza 14 */
(2, 1.00, 3, 3, 48),      /** 2 latas 330ml cerveza 3 */

/** Venta 49: 4 botellas + 1 caja + 3 growlers + 2 latas = 10 productos */
(4, 1.00, 1, 11, 49),     /** 4 botellas 330ml cerveza 11 */
(1, 20.00, 5, 5, 49),   /** 1 caja 24 unidades cerveza 5 */
(3, 1.00, 9, 9, 49),      /** 3 growlers 1L cerveza 9 */
(2, 1.00, 3, 13, 49),     /** 2 latas 330ml cerveza 13 */

/** Venta 50: 9 latas + 1 botellas 500ml = 10 productos */
(9, 1.00, 3, 3, 50),      /** 9 latas 330ml cerveza 3 */
(1, 1.00, 2, 2, 50),      /** 1 botella 500ml cerveza 2 */

/** Continuando ventas 51-70 con más variedad */
/** Venta 51: 3 botellas + 1 barril + 2 six-packs + 4 latas = 10 productos */
(3, 1.00, 1, 1, 51),      /** 3 botellas 330ml cerveza 1 */
(1, 30.00, 6, 6, 51),      /** 1 barril 20L cerveza 6 */
(2, 5.00, 4, 4, 51),    /** 2 six-packs 330ml cerveza 4 */
(4, 1.00, 3, 3, 51),      /** 4 latas 330ml cerveza 3 */

/** Venta 52: 5 botellas 500ml + 1 caja + 3 latas + 1 growler = 10 productos */
(5, 1.00, 2, 12, 52),     /** 5 botellas 500ml cerveza 12 */
(1, 10.00, 10, 10, 52),  /** 1 caja 12 unidades 500ml cerveza 10 */
(3, 1.00, 3, 13, 52),     /** 3 latas 330ml cerveza 13 */
(1, 1.00, 9, 9, 52),      /** 1 growler 1L cerveza 9 */

/** Venta 53: 7 botellas + 1 barril + 1 six-pack + 1 lata = 10 productos */
(7, 1.00, 1, 11, 53),     /** 7 botellas 330ml cerveza 11 */
(1, 40.00, 7, 7, 53),     /** 1 barril 30L cerveza 7 */
(1, 5.00, 4, 14, 53),   /** 1 six-pack 330ml cerveza 14 */
(1, 1.00, 3, 3, 53),      /** 1 lata 330ml cerveza 3 */

/** Venta 54: 6 latas + 2 botellas 500ml + 1 caja + 1 botella = 10 productos */
(6, 1.00, 3, 13, 54),     /** 6 latas 330ml cerveza 13 */
(2, 1.00, 2, 2, 54),      /** 2 botellas 500ml cerveza 2 */
(1, 20.00, 5, 15, 54),  /** 1 caja 24 unidades cerveza 15 */
(1, 1.00, 1, 1, 54),      /** 1 botella 330ml cerveza 1 */

/** Venta 55: 4 botellas + 1 barril + 2 growlers + 3 latas = 10 productos */
(4, 1.00, 1, 11, 55),     /** 4 botellas 330ml cerveza 11 */
(1, 50.00, 8, 8, 55),     /** 1 barril 50L cerveza 8 */
(2, 1.00, 9, 9, 55),      /** 2 growlers 1L cerveza 9 */
(3, 1.00, 3, 3, 55),      /** 3 latas 330ml cerveza 3 */

/** Venta 56: 8 botellas + 1 six-pack + 1 lata = 10 productos */
(8, 1.00, 1, 1, 56),      /** 8 botellas 330ml cerveza 1 */
(1, 5.00, 4, 4, 56),    /** 1 six-pack 330ml cerveza 4 */
(1, 1.00, 3, 13, 56),     /** 1 lata 330ml cerveza 13 */

/** Venta 57: 5 latas + 3 botellas 500ml + 1 caja + 1 six-pack = 10 productos */
(5, 1.00, 3, 3, 57),      /** 5 latas 330ml cerveza 3 */
(3, 1.00, 2, 12, 57),     /** 3 botellas 500ml cerveza 12 */
(1, 10.00, 10, 10, 57),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 5.00, 4, 14, 57),   /** 1 six-pack 330ml cerveza 14 */

/** Venta 58: 6 botellas + 1 barril + 2 latas + 1 growler = 10 productos */
(6, 1.00, 1, 11, 58),     /** 6 botellas 330ml cerveza 11 */
(1, 30.00, 6, 16, 58),     /** 1 barril 20L cerveza 16 */
(2, 1.00, 3, 13, 58),     /** 2 latas 330ml cerveza 13 */
(1, 1.00, 9, 9, 58),      /** 1 growler 1L cerveza 9 */

/** Venta 59: 7 botellas + 1 caja + 1 six-pack + 1 lata = 10 productos */
(7, 1.00, 1, 1, 59),      /** 7 botellas 330ml cerveza 1 */
(1, 20.00, 5, 5, 59),   /** 1 caja 24 unidades cerveza 5 */
(1, 5.00, 4, 4, 59),    /** 1 six-pack 330ml cerveza 4 */
(1, 1.00, 3, 3, 59),      /** 1 lata 330ml cerveza 3 */

/** Venta 60: 4 botellas 500ml + 3 latas + 1 barril + 2 botellas = 10 productos */
(4, 1.00, 2, 2, 60),      /** 4 botellas 500ml cerveza 2 */
(3, 1.00, 3, 13, 60),     /** 3 latas 330ml cerveza 13 */
(1, 40.00, 7, 17, 60),    /** 1 barril 30L cerveza 17 */
(2, 1.00, 1, 11, 60),     /** 2 botellas 330ml cerveza 11 */

/** Continuando ventas 61-90 para completar todas */
/** Venta 61: 9 botellas + 1 growler = 10 productos */
(9, 1.00, 1, 1, 61),      /** 9 botellas 330ml cerveza 1 */
(1, 1.00, 9, 9, 61),      /** 1 growler 1L cerveza 9 */

/** Venta 62: 5 latas + 2 six-packs + 1 caja + 2 botellas = 10 productos */
(5, 1.00, 3, 3, 62),      /** 5 latas 330ml cerveza 3 */
(2, 5.00, 4, 14, 62),   /** 2 six-packs 330ml cerveza 14 */
(1, 10.00, 10, 10, 62),  /** 1 caja 12 unidades 500ml cerveza 10 */
(2, 1.00, 1, 11, 62),     /** 2 botellas 330ml cerveza 11 */

/** Venta 63: 6 botellas + 1 barril + 2 botellas 500ml + 1 lata = 10 productos */
(6, 1.00, 1, 1, 63),      /** 6 botellas 330ml cerveza 1 */
(1, 50.00, 8, 18, 63),    /** 1 barril 50L cerveza 18 */
(2, 1.00, 2, 12, 63),     /** 2 botellas 500ml cerveza 12 */
(1, 1.00, 3, 13, 63),     /** 1 lata 330ml cerveza 13 */

/** Venta 64: 7 latas + 1 caja + 1 six-pack + 1 growler = 10 productos */
(7, 1.00, 3, 3, 64),      /** 7 latas 330ml cerveza 3 */
(1, 20.00, 5, 15, 64),  /** 1 caja 24 unidades cerveza 15 */
(1, 5.00, 4, 4, 64),    /** 1 six-pack 330ml cerveza 4 */
(1, 1.00, 9, 9, 64),      /** 1 growler 1L cerveza 9 */

/** Venta 65: 4 botellas + 3 botellas 500ml + 1 barril + 2 latas = 10 productos */
(4, 1.00, 1, 11, 65),     /** 4 botellas 330ml cerveza 11 */
(3, 1.00, 2, 2, 65),      /** 3 botellas 500ml cerveza 2 */
(1, 30.00, 6, 6, 65),     /** 1 barril 20L cerveza 6 */
(2, 1.00, 3, 13, 65),     /** 2 latas 330ml cerveza 13 */

/** Venta 66: 8 botellas + 1 caja + 1 lata = 10 productos */
(8, 1.00, 1, 1, 66),      /** 8 botellas 330ml cerveza 1 */
(1, 10.00, 10, 10, 66),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 1.00, 3, 3, 66),      /** 1 lata 330ml cerveza 3 */

/** Venta 67: 5 botellas + 2 six-packs + 1 barril + 2 latas = 10 productos */
(5, 1.00, 1, 11, 67),     /** 5 botellas 330ml cerveza 11 */
(2, 5.00, 4, 14, 67),   /** 2 six-packs 330ml cerveza 14 */
(1, 40.00, 7, 17, 67),    /** 1 barril 30L cerveza 17 */
(2, 1.00, 3, 13, 67),     /** 2 latas 330ml cerveza 13 */

/** Venta 68: 6 latas + 2 botellas 500ml + 1 caja + 1 growler = 10 productos */
(6, 1.00, 3, 3, 68),      /** 6 latas 330ml cerveza 3 */
(2, 1.00, 2, 12, 68),     /** 2 botellas 500ml cerveza 12 */
(1, 20.00, 5, 5, 68),   /** 1 caja 24 unidades cerveza 5 */
(1, 1.00, 9, 9, 68),      /** 1 growler 1L cerveza 9 */

/** Venta 69: 7 botellas + 1 barril + 1 six-pack + 1 lata = 10 productos */
(7, 1.00, 1, 1, 69),      /** 7 botellas 330ml cerveza 1 */
(1, 30.00, 6, 16, 69),    /** 1 barril 20L cerveza 16 */
(1, 5.00, 4, 4, 69),    /** 1 six-pack 330ml cerveza 4 */
(1, 1.00, 3, 13, 69),     /** 1 lata 330ml cerveza 13 */

/** Venta 70: 4 botellas + 3 latas + 1 barril + 2 botellas 500ml = 10 productos */
(4, 1.00, 1, 11, 70),     /** 4 botellas 330ml cerveza 11 */
(3, 1.00, 3, 3, 70),      /** 3 latas 330ml cerveza 3 */
(1, 50.00, 8, 8, 70),     /** 1 barril 50L cerveza 8 */
(2, 1.00, 2, 2, 70),      /** 2 botellas 500ml cerveza 2 */

/** Ventas finales 71-90 */
/** Venta 71: 9 latas + 1 caja = 10 productos */
(9, 1.00, 3, 13, 71),     /** 9 latas 330ml cerveza 13 */
(1, 10.00, 10, 10, 71),  /** 1 caja 12 unidades 500ml cerveza 10 */

/** Venta 72: 5 botellas + 2 six-packs + 2 growlers + 1 lata = 10 productos */
(5, 1.00, 1, 1, 72),      /** 5 botellas 330ml cerveza 1 */
(2, 5.00, 4, 14, 72),   /** 2 six-packs 330ml cerveza 14 */
(2, 1.00, 9, 9, 72),      /** 2 growlers 1L cerveza 9 */
(1, 1.00, 3, 3, 72),      /** 1 lata 330ml cerveza 3 */

/** Venta 73: 6 botellas + 1 barril + 1 caja + 2 latas = 10 productos */
(6, 1.00, 1, 11, 73),     /** 6 botellas 330ml cerveza 11 */
(1, 40.00, 7, 17, 73),    /** 1 barril 30L cerveza 17 */
(1, 20.00, 5, 15, 73),  /** 1 caja 24 unidades cerveza 15 */
(2, 1.00, 3, 13, 73),     /** 2 latas 330ml cerveza 13 */

/** Venta 74: 7 botellas + 2 botellas 500ml + 1 six-pack = 10 productos */
(7, 1.00, 1, 1, 74),      /** 7 botellas 330ml cerveza 1 */
(2, 1.00, 2, 12, 74),     /** 2 botellas 500ml cerveza 12 */
(1, 5.00, 4, 4, 74),    /** 1 six-pack 330ml cerveza 4 */

/** Venta 75: 4 latas + 1 barril + 3 botellas + 2 growlers = 10 productos */
(4, 1.00, 3, 3, 75),      /** 4 latas 330ml cerveza 3 */
(1, 50.00, 8, 18, 75),    /** 1 barril 50L cerveza 18 */
(3, 1.00, 1, 11, 75),     /** 3 botellas 330ml cerveza 11 */
(2, 1.00, 9, 9, 75),      /** 2 growlers 1L cerveza 9 */

/** Venta 76: 8 botellas + 1 caja + 1 lata = 10 productos */
(8, 1.00, 1, 1, 76),      /** 8 botellas 330ml cerveza 1 */
(1, 10.00, 10, 10, 76),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 1.00, 3, 13, 76),     /** 1 lata 330ml cerveza 13 */

/** Venta 77: 5 botellas + 1 barril + 2 six-packs + 2 latas = 10 productos */
(5, 1.00, 1, 11, 77),     /** 5 botellas 330ml cerveza 11 */
(1, 30.00, 6, 6, 77),     /** 1 barril 20L cerveza 6 */
(2, 5.00, 4, 14, 77),   /** 2 six-packs 330ml cerveza 14 */
(2, 1.00, 3, 3, 77),      /** 2 latas 330ml cerveza 3 */

/** Venta 78: 6 latas + 3 botellas 500ml + 1 caja = 10 productos */
(6, 1.00, 3, 13, 78),     /** 6 latas 330ml cerveza 13 */
(3, 1.00, 2, 2, 78),      /** 3 botellas 500ml cerveza 2 */
(1, 20.00, 5, 5, 78),   /** 1 caja 24 unidades cerveza 5 */

/** Venta 79: 7 botellas + 1 barril + 1 growler + 1 lata = 10 productos */
(7, 1.00, 1, 1, 79),      /** 7 botellas 330ml cerveza 1 */
(1, 40.00, 7, 7, 79),     /** 1 barril 30L cerveza 7 */
(1, 1.00, 9, 9, 79),      /** 1 growler 1L cerveza 9 */
(1, 1.00, 3, 3, 79),      /** 1 lata 330ml cerveza 3 */

/** Venta 80: 4 botellas + 2 six-packs + 1 caja + 3 latas = 10 productos */
(4, 1.00, 1, 11, 80),     /** 4 botellas 330ml cerveza 11 */
(2, 5.00, 4, 4, 80),    /** 2 six-packs 330ml cerveza 4 */
(1, 10.00, 10, 10, 80),  /** 1 caja 12 unidades 500ml cerveza 10 */
(3, 1.00, 3, 13, 80),     /** 3 latas 330ml cerveza 13 */

/** Ventas finales 81-90 */
/** Venta 81: 8 latas + 1 barril + 1 botella = 10 productos */
(8, 1.00, 3, 3, 81),      /** 8 latas 330ml cerveza 3 */
(1, 50.00, 8, 18, 81),    /** 1 barril 50L cerveza 18 */
(1, 1.00, 1, 1, 81),      /** 1 botella 330ml cerveza 1 */

/** Venta 82: 5 botellas + 2 botellas 500ml + 1 caja + 2 growlers = 10 productos */
(5, 1.00, 1, 11, 82),     /** 5 botellas 330ml cerveza 11 */
(2, 1.00, 2, 12, 82),     /** 2 botellas 500ml cerveza 12 */
(1, 20.00, 5, 15, 82),  /** 1 caja 24 unidades cerveza 15 */
(2, 1.00, 9, 9, 82),      /** 2 growlers 1L cerveza 9 */

/** Venta 83: 6 botellas + 1 six-pack + 1 barril + 2 latas = 10 productos */
(6, 1.00, 1, 1, 83),      /** 6 botellas 330ml cerveza 1 */
(1, 5.00, 4, 14, 83),   /** 1 six-pack 330ml cerveza 14 */
(1, 30.00, 6, 16, 83),    /** 1 barril 20L cerveza 16 */
(2, 1.00, 3, 13, 83),     /** 2 latas 330ml cerveza 13 */

/** Venta 84: 7 latas + 2 botellas 500ml + 1 caja = 10 productos */
(7, 1.00, 3, 3, 84),      /** 7 latas 330ml cerveza 3 */
(2, 1.00, 2, 2, 84),      /** 2 botellas 500ml cerveza 2 */
(1, 10.00, 10, 10, 84),  /** 1 caja 12 unidades 500ml cerveza 10 */

/** Venta 85: 4 botellas + 1 barril + 2 six-packs + 3 latas = 10 productos */
(4, 1.00, 1, 11, 85),     /** 4 botellas 330ml cerveza 11 */
(1, 40.00, 7, 17, 85),    /** 1 barril 30L cerveza 17 */
(2, 5.00, 4, 4, 85),    /** 2 six-packs 330ml cerveza 4 */
(3, 1.00, 3, 13, 85),     /** 3 latas 330ml cerveza 13 */

/** Venta 86: 9 botellas + 1 growler = 10 productos */
(9, 1.00, 1, 1, 86),      /** 9 botellas 330ml cerveza 1 */
(1, 1.00, 9, 9, 86),      /** 1 growler 1L cerveza 9 */

/** Venta 87: 5 latas + 3 botellas 500ml + 1 caja + 1 six-pack = 10 productos */
(5, 1.00, 3, 3, 87),      /** 5 latas 330ml cerveza 3 */
(3, 1.00, 2, 12, 87),     /** 3 botellas 500ml cerveza 12 */
(1, 20.00, 5, 5, 87),   /** 1 caja 24 unidades cerveza 5 */
(1, 5.00, 4, 14, 87),   /** 1 six-pack 330ml cerveza 14 */

/** Venta 88: 6 botellas + 1 barril + 2 latas + 1 botella 500ml = 10 productos */
(6, 1.00, 1, 11, 88),     /** 6 botellas 330ml cerveza 11 */
(1, 50.00, 8, 8, 88),     /** 1 barril 50L cerveza 8 */
(2, 1.00, 3, 13, 88),     /** 2 latas 330ml cerveza 13 */
(1, 1.00, 2, 2, 88),      /** 1 botella 500ml cerveza 2 */

/** Venta 89: 7 botellas + 1 caja + 1 six-pack + 1 growler = 10 productos */
(7, 1.00, 1, 1, 89),      /** 7 botellas 330ml cerveza 1 */
(1, 10.00, 10, 10, 89),  /** 1 caja 12 unidades 500ml cerveza 10 */
(1, 5.00, 4, 4, 89),    /** 1 six-pack 330ml cerveza 4 */
(1, 1.00, 9, 9, 89),      /** 1 growler 1L cerveza 9 */

/** Venta 90: 8 latas + 1 barril + 1 botella = 10 productos */
(8, 1.00, 3, 13, 90),     /** 8 latas 330ml cerveza 13 */
(1, 30.00, 6, 6, 90),     /** 1 barril 20L cerveza 6 */
(1, 1.00, 1, 11, 90);     /** 1 botella 330ml cerveza 11 */

 
INSERT INTO miembro_presentacion_cerveza (monto_proveedor, fk_miembro_1, fk_miembro_2, fk_presentacion_cerveza_1, fk_presentacion_cerveza_2) VALUES
(2.50, 123456789, 'J', 1, 1),      /** Empresa ABC provee botella 330ml por $2.50 */
(4.25, 987654321, 'V', 2, 2),      /** Empresa XYZ provee botella 500ml por $4.25 */
(1.80, 234567890, 'J', 3, 3),      /** Delta Distrib provee lata 330ml por $1.80 */
(13.75, 345678901, 'V', 4, 4),    /** Omega Imports provee six-pack 330ml por $13.75 */
(45.30, 456789012, 'J', 5, 5),   /** Epsilon Trade provee caja 24 unidades por $45.30 */
(65.80, 567890123, 'V', 6, 6),      /** Beta Stores provee barril 20L por $65.80 */
(95.50, 678901234, 'J', 7, 7),      /** Gamma Dist provee barril 30L por $95.50 */
(155.75, 789012345, 'V', 8, 8),     /** Sigma Com provee barril 50L por $155.75 */
(8.90, 890123456, 'J', 9, 9),       /** Theta Imports provee growler 1L por $8.90 */
(42.60, 901234567, 'V', 10, 10),  /** Lambda Stores provee caja 12 unidades 500ml por $42.60 */
-- Nuevos registros para igualar la cantidad de presentacion_cerveza
(1.20, 123456789, 'J', 1, 11),      /** Empresa ABC provee Rogue American Amber - Botella 330ml por $1.20 */
(2.00, 987654321, 'V', 2, 12),      /** Empresa XYZ provee La Chouffe - Botella 500ml por $2.00 */
(1.50, 234567890, 'J', 3, 13),      /** Delta Distrib provee Orval - Lata 330ml por $1.50 */
(10.00, 345678901, 'V', 4, 14),     /** Omega Imports provee Chimay - Six-pack 330ml por $10.00 */
(38.00, 456789012, 'J', 5, 15),     /** Epsilon Trade provee Leffe Blonde - Caja 24 unidades 330ml por $38.00 */
(70.00, 567890123, 'V', 6, 16),     /** Beta Stores provee Hoegaarden - Barril 20L por $70.00 */
(100.00, 678901234, 'J', 7, 17),    /** Gamma Dist provee Pilsner Urquell - Barril 30L por $100.00 */
(160.00, 789012345, 'V', 8, 18);    /** Sigma Com provee Samuel Adams - Barril 50L por $160.00 */

 
INSERT INTO venta_evento (
    monto_total,
    fk_cliente_juridico,
    fk_cliente_natural
) VALUES
    (450.00, 1, NULL),        /** Venta a cliente jurídico */
    (280.50, NULL, 1),        /** Venta a cliente natural */
    (650.75, 2, NULL),        /** Venta a cliente jurídico */
    (320.25, 2, NULL),        /** Venta a cliente natural */
    (890.00, 3, NULL),        /** Venta a cliente jurídico */
    (150.00, 3, NULL),        /** Venta a cliente natural */
    (750.50, 4, NULL),        /** Venta a cliente jurídico */
    (420.75, 4, NULL),        /** Venta a cliente natural */
    (580.25, 5, NULL),        /** Venta a cliente jurídico */
    (290.00, 5, NULL);        /** Venta a cliente natural */

/**
 * Inserción de órdenes de compra
 * @param id - Se genera automáticamente con SERIAL
 * @param fecha_solicitud - Fecha de solicitud de la orden
 * @param fecha_entrega - Fecha estimada de entrega (opcional)
 * @param observacion - Observaciones adicionales (opcional)
 * @param fk_empleado - Referencia al empleado que hace la orden
 * @param fk_presentacion_cerveza_1 - Referencia al ID de cerveza
 * @param fk_presentacion_cerveza_2 - Referencia al SKU de presentación
 * @param unidades - Cantidad de unidades a ordenar
 */
INSERT INTO orden_de_compra (
    fecha_solicitud,
    fecha_entrega,
    observacion,
    fk_usuario,
    fk_presentacion_cerveza_1,
    fk_presentacion_cerveza_2,
    unidades,
    fk_miembro_1,
    fk_miembro_2
) VALUES
    ('2024-05-10', '2024-05-17', 'Orden antigua - evento pasado', 22, 1, 1, 10000, 123456789, 'J'),      -- ID 1
    ('2024-06-12', '2024-06-20', 'Pedido histórico', 22, 2, 2, 10000, 234567890, 'J'),                           -- ID 2
    ('2024-07-13', '2024-07-22', 'Promoción especial pasada', 9, 5, 5, 10000, 345678901, 'V'),     -- ID 3
    ('2024-08-15', '2024-08-23', 'Pedido anterior', 22, 6, 6, 10000, 567890123, 'V'),                             -- ID 4
    ('2024-09-16', '2024-09-25', 'Bar asociado - pedido pasado', 22, 7, 7, 10000, 678901234, 'J'),              -- ID 5
    ('2024-10-17', '2024-10-27', 'Evento especial anterior', 22, 8, 8, 10000, 789012345, 'V'),                -- ID 6
    ('2024-11-18', '2024-11-28', 'Pedido regular pasado', 22, 9, 9, 10000, 890123456, 'J'),                            -- ID 7
    ('2025-06-20', NULL, 'URGENTE - Stock crítico Zona Refrigerada', 22, 6, 16, 10000, 987654321, 'V'),                 -- ID 8
    ('2025-06-22', NULL, 'CRÍTICO - Zona Barriles sin stock', 22, 7, 17, 10000, 456789012, 'J'),            -- ID 9
    ('2025-06-24', NULL, 'URGENTE - Pasillo Salida agotado', 22, 8, 18, 10000, 901234567, 'V');           -- ID 10

 
INSERT INTO detalle_evento (
    cantidad,
    precio_unitario,
    fk_stock_miembro_1,      /** evento (INTEGER) - 1º en clave primaria stock_miembro */
    fk_stock_miembro_2,      /** rif (INTEGER) - 2º en clave primaria stock_miembro */
    fk_stock_miembro_3,      /** naturaleza_rif (CHAR) - 3º en clave primaria stock_miembro */
    fk_venta_evento,         /** id_venta (INTEGER) */
    fk_stock_miembro_4,      /** sku (VARCHAR) - 4º en clave primaria stock_miembro */
    fk_stock_miembro_5       /** id_cerveza (INTEGER) - 5º en clave primaria stock_miembro */
) VALUES
    (50, 4.50, 1, 123456789, 'J', 1, 1, 1),      /** 50 botellas 330ml del stock de miembro evento 1, RIF 123456789-J → venta_evento ID 1 */
    (25, 6.50, 1, 987654321, 'V', 2, 2, 2),      /** 25 botellas 500ml del stock de miembro evento 1, RIF 987654321-V → venta_evento ID 2 */
    (30, 3.50, 2, 234567890, 'J', 3, 3, 3),      /** 30 latas 330ml del stock de miembro evento 2, RIF 234567890-J → venta_evento ID 3 */
    (10, 18.00, 3, 345678901, 'V', 4, 4, 4),    /** 10 six-packs del stock de miembro evento 3, RIF 345678901-V → venta_evento ID 4 */
    (5, 55.00, 4, 456789012, 'J', 5, 5, 5),    /** 5 cajas 24 unidades del stock de miembro evento 4, RIF 456789012-J → venta_evento ID 5 */
    (3, 75.00, 5, 567890123, 'V', 6, 6, 6),       /** 3 barriles 20L del stock de miembro evento 5, RIF 567890123-V → venta_evento ID 6 */
    (2, 110.00, 6, 678901234, 'J', 7, 7, 7),      /** 2 barriles 30L del stock de miembro evento 6, RIF 678901234-J → venta_evento ID 7 */
    (1, 170.00, 7, 789012345, 'V', 8, 8, 8),      /** 1 barril 50L del stock de miembro evento 7, RIF 789012345-V → venta_evento ID 8 */
    (15, 12.00, 8, 890123456, 'J', 9, 9, 9),      /** 15 growlers 1L del stock de miembro evento 8, RIF 890123456-J → venta_evento ID 9 */
    (8, 48.00, 9, 901234567, 'V', 10, 10, 10),  /** 8 cajas 12 unidades del stock de miembro evento 9, RIF 901234567-V → venta_evento ID 10 */
    (40, 4.50, 10, 123456780, 'V', 1, 1, 1);     /** 40 botellas 330ml del stock de miembro evento 10, RIF 123456780-V → venta_evento ID 1 */ 

 

-- Insert data into afiliacion
INSERT INTO afiliacion (monto_mensual, fecha_inicio) VALUES
(100.00, '2023-01-15'),
(150.00, '2023-03-22'),
(200.00, '2023-05-10'),
(250.00, '2023-06-30'),
(300.00, '2023-08-05'),
(350.00, '2023-09-12'),
(400.00, '2023-10-25'),
(450.00, '2023-11-18'),
(500.00, '2023-12-01'),
(550.00, '2024-01-05'),
(600.00, '2024-01-20');

-- Insert data into mensualidad
INSERT INTO mensualidad (fecha_máxima_pago, fk_afiliacion, fk_miembro_1, fk_miembro_2) VALUES
('2024-01-31', 1, 'J', 123456789),
('2024-01-31', 2, 'V', 987654321),
('2024-01-31', 3, 'J', 234567890),
('2024-01-31', 4, 'V', 345678901),
('2024-01-31', 5, 'J', 456789012),
('2024-01-31', 6, 'V', 567890123),
('2024-01-31', 7, 'J', 678901234),
('2024-01-31', 8, 'V', 789012345),
('2024-01-31', 9, 'J', 890123456),
('2024-01-31', 10, 'V', 901234567),
('2024-01-31', 11, 'J', 12345678);


-- Insert data into método_pago
-- 100 Points for the first 10 natural clients (10 points each)
INSERT INTO metodo_pago (tipo, denominación, tipo_tarjeta, número, banco, fecha_vencimiento, numero_cheque, fecha_adquisicion, fecha_canjeo) VALUES
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '28 days'),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '28 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),
('punto', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_DATE - INTERVAL '25 days', NULL),

-- Original Payment Methods (Cards, Cash, etc.) starting from ID 101
('tarjeta_credito', NULL, 'Visa', 1234567890, 'Banco Mercantil', '2025-12-31', NULL, NULL, NULL),
('tarjeta_credito', NULL, 'MasterCard', 2345678901, 'Banesco', '2024-11-30', NULL, NULL, NULL),
('tarjeta_debito', NULL, NULL, 3456789012, 'Banco de Venezuela', '2026-08-31', NULL, NULL, NULL),
('tarjeta_debito', NULL, NULL, 4567890123, 'BBVA Provincial', '2025-06-30', NULL, NULL, NULL),
('cheque', NULL, NULL, 1001, 'Banco Mercantil', NULL, 5678, NULL, NULL),
('cheque', NULL, NULL, 1002, 'Banesco', NULL, 6789, NULL, NULL),
('efectivo', '1 USD', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('efectivo', '5 USD', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('efectivo', '20 USD', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('efectivo', '100 USD', NULL, NULL, NULL, NULL, NULL, NULL, NULL),

/** Tarjetas adicionales para completar 40 clientes distintos (tipos: VARCHAR, INTEGER, DATE) */
('tarjeta_credito', NULL, 'Visa', 5678901234, 'Banco Activo', '2025-03-31', NULL, NULL, NULL),          /** Tarjeta 5 - Visa */
('tarjeta_debito', NULL, NULL, 6789012345, 'Banco del Tesoro', '2026-01-31', NULL, NULL, NULL),        /** Tarjeta 6 - Débito */
('tarjeta_credito', NULL, 'MasterCard', 7890123456, 'BOD', '2025-07-31', NULL, NULL, NULL),           /** Tarjeta 7 - MasterCard */
('tarjeta_debito', NULL, NULL, 8901234567, 'Bicentenario', '2024-12-31', NULL, NULL, NULL),           /** Tarjeta 8 - Débito */
('tarjeta_credito', NULL, 'American Express', 9012345678, 'Exterior', '2026-05-31', NULL, NULL, NULL), /** Tarjeta 9 - American Express */
('tarjeta_debito', NULL, NULL, 1123456789, 'Sofitasa', '2025-09-30', NULL, NULL, NULL),               /** Tarjeta 10 - Débito */
('tarjeta_credito', NULL, 'Visa', 2234567890, 'Plaza', '2025-11-30', NULL, NULL, NULL),               /** Tarjeta 11 - Visa */
('tarjeta_debito', NULL, NULL, 3345678901, 'Mi Banco', '2026-02-28', NULL, NULL, NULL),               /** Tarjeta 12 - Débito */
('tarjeta_credito', NULL, 'MasterCard', 4456789012, 'Venezolano de Crédito', '2025-04-30', NULL, NULL, NULL), /** Tarjeta 13 - MasterCard */
('tarjeta_debito', NULL, NULL, 5567890123, 'Caroni', '2026-07-31', NULL, NULL, NULL),                 /** Tarjeta 14 - Débito */
('tarjeta_credito', NULL, 'Visa', 6678901234, 'Nacional de Crédito', '2025-08-31', NULL, NULL, NULL), /** Tarjeta 15 - Visa */
('tarjeta_debito', NULL, NULL, 7789012345, 'Federal', '2024-10-31', NULL, NULL, NULL),                /** Tarjeta 16 - Débito */
('tarjeta_credito', NULL, 'MasterCard', 8890123456, 'Fondo Común', '2026-03-31', NULL, NULL, NULL),   /** Tarjeta 17 - MasterCard */
('tarjeta_debito', NULL, NULL, 9901234567, 'BFC', '2025-12-31', NULL, NULL, NULL),                    /** Tarjeta 18 - Débito */
('tarjeta_credito', NULL, 'American Express', 1012345678, 'Bancrecer', '2025-01-31', NULL, NULL, NULL), /** Tarjeta 19 - American Express */
('tarjeta_debito', NULL, NULL, 2123456789, 'Banplus', '2026-06-30', NULL, NULL, NULL),                /** Tarjeta 20 - Débito */
('tarjeta_credito', NULL, 'Visa', 3234567890, 'BBVA Provincial', '2025-10-31', NULL, NULL, NULL),     /** Tarjeta 21 - Visa */
('tarjeta_debito', NULL, NULL, 4345678901, 'Banco Mercantil', '2026-04-30', NULL, NULL, NULL),        /** Tarjeta 22 - Débito */
('tarjeta_credito', NULL, 'MasterCard', 5456789012, 'Banesco', '2025-02-28', NULL, NULL, NULL),       /** Tarjeta 23 - MasterCard */
('tarjeta_debito', NULL, NULL, 6567890123, 'Banco de Venezuela', '2026-08-31', NULL, NULL, NULL),     /** Tarjeta 24 - Débito */
('tarjeta_credito', NULL, 'Visa', 7678901234, 'Banco Activo', '2025-05-31', NULL, NULL, NULL),        /** Tarjeta 25 - Visa */
('tarjeta_debito', NULL, NULL, 8789012345, 'Banco del Tesoro', '2024-11-30', NULL, NULL, NULL),       /** Tarjeta 26 - Débito */
('tarjeta_credito', NULL, 'MasterCard', 9890123456, 'BOD', '2026-09-30', NULL, NULL, NULL),           /** Tarjeta 27 - MasterCard */
('tarjeta_debito', NULL, NULL, 1901234567, 'Bicentenario', '2025-06-30', NULL, NULL, NULL),           /** Tarjeta 28 - Débito */
('tarjeta_credito', NULL, 'American Express', 2012345678, 'Exterior', '2026-10-31', NULL, NULL, NULL), /** Tarjeta 29 - American Express */
('tarjeta_debito', NULL, NULL, 3123456789, 'Sofitasa', '2025-03-31', NULL, NULL, NULL),               /** Tarjeta 30 - Débito */
('tarjeta_credito', NULL, 'Visa', 4234567890, 'Plaza', '2026-11-30', NULL, NULL, NULL),               /** Tarjeta 31 - Visa */
('tarjeta_debito', NULL, NULL, 5345678901, 'Mi Banco', '2025-07-31', NULL, NULL, NULL),               /** Tarjeta 32 - Débito */
('tarjeta_credito', NULL, 'MasterCard', 6456789012, 'Venezolano de Crédito', '2026-12-31', NULL, NULL, NULL), /** Tarjeta 33 - MasterCard */
('tarjeta_debito', NULL, NULL, 7567890123, 'Caroni', '2025-04-30', NULL, NULL, NULL),                 /** Tarjeta 34 - Débito */
('tarjeta_credito', NULL, 'Visa', 8678901234, 'Nacional de Crédito', '2026-01-31', NULL, NULL, NULL), /** Tarjeta 35 - Visa */
('tarjeta_debito', NULL, NULL, 9789012345, 'Federal', '2025-08-31', NULL, NULL, NULL),                /** Tarjeta 36 - Débito */
('tarjeta_credito', NULL, 'MasterCard', 1890123456, 'Fondo Común', '2026-05-31', NULL, NULL, NULL),   /** Tarjeta 37 - MasterCard */
('tarjeta_debito', NULL, NULL, 2901234567, 'BFC', '2025-09-30', NULL, NULL, NULL),                    /** Tarjeta 38 - Débito */
('tarjeta_credito', NULL, 'American Express', 3012345678, 'Bancrecer', '2026-02-28', NULL, NULL, NULL), /** Tarjeta 39 - American Express */
('tarjeta_debito', NULL, NULL, 4123456789, 'Banplus', '2025-10-31', NULL, NULL, NULL);                /** Tarjeta 40 - Débito */

-- Insert data into cliente_método_pago
INSERT INTO cliente_metodo_pago (fk_metodo_pago, fk_cliente_natural, fk_cliente_juridico) VALUES
(1, 1, NULL), (2, 1, NULL), (3, 1, NULL), (4, 1, NULL), (5, 1, NULL), (6, 1, NULL), (7, 1, NULL), (8, 1, NULL), (9, 1, NULL), (10, 1, NULL),
(11, 2, NULL), (12, 2, NULL), (13, 2, NULL), (14, 2, NULL), (15, 2, NULL), (16, 2, NULL), (17, 2, NULL), (18, 2, NULL), (19, 2, NULL), (20, 2, NULL),
(21, 3, NULL), (22, 3, NULL), (23, 3, NULL), (24, 3, NULL), (25, 3, NULL), (26, 3, NULL), (27, 3, NULL), (28, 3, NULL), (29, 3, NULL), (30, 3, NULL),
(31, 4, NULL), (32, 4, NULL), (33, 4, NULL), (34, 4, NULL), (35, 4, NULL), (36, 4, NULL), (37, 4, NULL), (38, 4, NULL), (39, 4, NULL), (40, 4, NULL),
(41, 5, NULL), (42, 5, NULL), (43, 5, NULL), (44, 5, NULL), (45, 5, NULL), (46, 5, NULL), (47, 5, NULL), (48, 5, NULL), (49, 5, NULL), (50, 5, NULL),
(51, 6, NULL), (52, 6, NULL), (53, 6, NULL), (54, 6, NULL), (55, 6, NULL), (56, 6, NULL), (57, 6, NULL), (58, 6, NULL), (59, 6, NULL), (60, 6, NULL),
(61, 7, NULL), (62, 7, NULL), (63, 7, NULL), (64, 7, NULL), (65, 7, NULL), (66, 7, NULL), (67, 7, NULL), (68, 7, NULL), (69, 7, NULL), (70, 7, NULL),
(71, 8, NULL), (72, 8, NULL), (73, 8, NULL), (74, 8, NULL), (75, 8, NULL), (76, 8, NULL), (77, 8, NULL), (78, 8, NULL), (79, 8, NULL), (80, 8, NULL),
(81, 9, NULL), (82, 9, NULL), (83, 9, NULL), (84, 9, NULL), (85, 9, NULL), (86, 9, NULL), (87, 9, NULL), (88, 9, NULL), (89, 9, NULL), (90, 9, NULL),
(91, 10, NULL), (92, 10, NULL), (93, 10, NULL), (94, 10, NULL), (95, 10, NULL), (96, 10, NULL), (97, 10, NULL), (98, 10, NULL), (99, 10, NULL), (100, 10, NULL),
(101, 1, NULL),   /** Cliente natural 1 - Tarjeta crédito Visa */
(102, 2, NULL),   /** Cliente natural 2 - Tarjeta crédito MasterCard */
(103, 3, NULL),   /** Cliente natural 3 - Tarjeta débito */
(104, 4, NULL),   /** Cliente natural 4 - Tarjeta débito */
(105, 5, NULL),   /** Cliente natural 5 - Cheque */
(106, NULL, 1),   /** Cliente jurídico 1 - Cheque */
(107, NULL, 2),   /** Cliente jurídico 2 - Efectivo 1 USD */
(108, NULL, 3),   /** Cliente jurídico 3 - Efectivo 5 USD */
(109, NULL, 4),   /** Cliente jurídico 4 - Efectivo 20 USD */
(110, NULL, 5),   /** Cliente jurídico 5 - Efectivo 100 USD */

/** Asignación de tarjetas adicionales a clientes naturales (6-20) */
(111, 6, NULL),   /** Cliente natural 6 - Tarjeta crédito Visa */
(112, 7, NULL),   /** Cliente natural 7 - Tarjeta débito */
(113, 8, NULL),   /** Cliente natural 8 - Tarjeta crédito MasterCard */
(114, 9, NULL),   /** Cliente natural 9 - Tarjeta débito */
(115, 10, NULL),  /** Cliente natural 10 - Tarjeta crédito American Express */
(116, 11, NULL),  /** Cliente natural 11 - Tarjeta débito */
(117, 12, NULL),  /** Cliente natural 12 - Tarjeta crédito Visa */
(118, 13, NULL),  /** Cliente natural 13 - Tarjeta débito */
(119, 14, NULL),  /** Cliente natural 14 - Tarjeta crédito MasterCard */
(120, 15, NULL),  /** Cliente natural 15 - Tarjeta débito */
(121, 16, NULL),  /** Cliente natural 16 - Tarjeta crédito Visa */
(122, 17, NULL),  /** Cliente natural 17 - Tarjeta débito */
(123, 18, NULL),  /** Cliente natural 18 - Tarjeta crédito MasterCard */
(124, 19, NULL),  /** Cliente natural 19 - Tarjeta débito */
(125, 20, NULL),  /** Cliente natural 20 - Tarjeta crédito American Express */

/** Asignación de tarjetas adicionales a clientes jurídicos (6-20) */
(126, NULL, 6),   /** Cliente jurídico 6 - Tarjeta débito */
(127, NULL, 7),   /** Cliente jurídico 7 - Tarjeta crédito Visa */
(128, NULL, 8),   /** Cliente jurídico 8 - Tarjeta débito */
(129, NULL, 9),   /** Cliente jurídico 9 - Tarjeta crédito MasterCard */
(130, NULL, 10),  /** Cliente jurídico 10 - Tarjeta débito */
(131, NULL, 11),  /** Cliente jurídico 11 - Tarjeta crédito Visa */
(132, NULL, 12),  /** Cliente jurídico 12 - Tarjeta débito */
(133, NULL, 13),  /** Cliente jurídico 13 - Tarjeta crédito MasterCard */
(134, NULL, 14),  /** Cliente jurídico 14 - Tarjeta débito */
(135, NULL, 15),  /** Cliente jurídico 15 - Tarjeta crédito American Express */
(136, NULL, 16),  /** Cliente jurídico 16 - Tarjeta débito */
(137, NULL, 17),  /** Cliente jurídico 17 - Tarjeta crédito Visa */
(138, NULL, 18),  /** Cliente jurídico 18 - Tarjeta débito */
(139, NULL, 19),  /** Cliente jurídico 19 - Tarjeta crédito MasterCard */
(140, NULL, 20);  /** Cliente jurídico 20 - Tarjeta débito */


-- Datos de ejemplo para desarrollo (se puede ejecutar el script específico)
-- \i sql/pago/insert/08_insert_tasa_inicial.sql

/**
 * Insertar historial de tasas del BCV para los últimos 30 días
 * Simula el comportamiento del cron job con datos históricos
 * Las tasas reflejan una evolución realista del tipo de cambio USD/Bs
 */
INSERT INTO tasa (moneda, monto_equivalencia, fecha_inicio, fecha_fin)
VALUES 
    ('Punto', 1, CURRENT_DATE - INTERVAL '30 days', NULL),
    -- Hace 30 días hasta hace 25 días
    ('USD', 95.20, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE - INTERVAL '29 days'),
    ('USD', 95.45, CURRENT_DATE - INTERVAL '29 days', CURRENT_DATE - INTERVAL '28 days'),
    ('USD', 95.68, CURRENT_DATE - INTERVAL '28 days', CURRENT_DATE - INTERVAL '27 days'),
    ('USD', 95.90, CURRENT_DATE - INTERVAL '27 days', CURRENT_DATE - INTERVAL '26 days'),
    ('USD', 96.12, CURRENT_DATE - INTERVAL '26 days', CURRENT_DATE - INTERVAL '25 days'),
    ('USD', 96.35, CURRENT_DATE - INTERVAL '25 days', CURRENT_DATE - INTERVAL '24 days'),
    
    -- Hace 24 días hasta hace 20 días
    ('USD', 96.58, CURRENT_DATE - INTERVAL '24 days', CURRENT_DATE - INTERVAL '23 days'),
    ('USD', 96.80, CURRENT_DATE - INTERVAL '23 days', CURRENT_DATE - INTERVAL '22 days'),
    ('USD', 97.02, CURRENT_DATE - INTERVAL '22 days', CURRENT_DATE - INTERVAL '21 days'),
    ('USD', 97.25, CURRENT_DATE - INTERVAL '21 days', CURRENT_DATE - INTERVAL '20 days'),
    ('USD', 97.48, CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE - INTERVAL '19 days'),
    
    -- Hace 19 días hasta hace 15 días
    ('USD', 97.70, CURRENT_DATE - INTERVAL '19 days', CURRENT_DATE - INTERVAL '18 days'),
    ('USD', 97.92, CURRENT_DATE - INTERVAL '18 days', CURRENT_DATE - INTERVAL '17 days'),
    ('USD', 98.15, CURRENT_DATE - INTERVAL '17 days', CURRENT_DATE - INTERVAL '16 days'),
    ('USD', 98.38, CURRENT_DATE - INTERVAL '16 days', CURRENT_DATE - INTERVAL '15 days'),
    ('USD', 98.60, CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE - INTERVAL '14 days'),
    
    -- Hace 14 días hasta hace 10 días
    ('USD', 98.82, CURRENT_DATE - INTERVAL '14 days', CURRENT_DATE - INTERVAL '13 days'),
    ('USD', 99.05, CURRENT_DATE - INTERVAL '13 days', CURRENT_DATE - INTERVAL '12 days'),
    ('USD', 99.28, CURRENT_DATE - INTERVAL '12 days', CURRENT_DATE - INTERVAL '11 days'),
    ('USD', 99.50, CURRENT_DATE - INTERVAL '11 days', CURRENT_DATE - INTERVAL '10 days'),
    ('USD', 99.72, CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE - INTERVAL '9 days'),
    
    -- Hace 9 días hasta hace 5 días
    ('USD', 99.95, CURRENT_DATE - INTERVAL '9 days', CURRENT_DATE - INTERVAL '8 days'),
    ('USD', 100.18, CURRENT_DATE - INTERVAL '8 days', CURRENT_DATE - INTERVAL '7 days'),
    ('USD', 100.40, CURRENT_DATE - INTERVAL '7 days', CURRENT_DATE - INTERVAL '6 days'),
    ('USD', 100.62, CURRENT_DATE - INTERVAL '6 days', CURRENT_DATE - INTERVAL '5 days'),
    ('USD', 100.85, CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE - INTERVAL '4 days'),
    
    -- Últimos 4 días
    ('USD', 101.08, CURRENT_DATE - INTERVAL '4 days', CURRENT_DATE - INTERVAL '3 days'),
    ('USD', 101.30, CURRENT_DATE - INTERVAL '3 days', CURRENT_DATE - INTERVAL '2 days'),
    ('USD', 101.52, CURRENT_DATE - INTERVAL '2 days', CURRENT_DATE - INTERVAL '1 day'),
    ('USD', 101.75, CURRENT_DATE - INTERVAL '1 day', CURRENT_DATE),
    ('USD', 106.86, CURRENT_DATE, NULL),
    ('EUR', 125.12, CURRENT_DATE, NULL),
    ('VES', 1.00, CURRENT_DATE, NULL);

/**
 * Inserts para la tabla pago - PAGOS CON TARJETAS PARA LAS 90 VENTAS
 * Cada pago corresponde exactamente a una venta con:
 * - Monto igual al monto_total de la venta
 * - Fecha igual a la fecha de finalización de la venta (status_venta)
 * - Cliente igual al cliente de la venta  
 * - Solo métodos de pago con TARJETAS (crédito/débito)
 */
INSERT INTO pago (
    monto,
    fecha_pago,
    fk_tasa,
    fk_mensualidad_1,
    fk_mensualidad_2,
    fk_mensualidad_3,
    fk_venta,
    fk_orden_de_compra,
    fk_venta_evento,
    fk_miembro_metodo_pago_1,
    fk_cliente_metodo_pago_1
) VALUES
    /** VENTAS 1-10: Ventas iniciales con clientes mixtos */
    (10.00, CURRENT_DATE - INTERVAL '30 days' + TIME '09:20:00', 2, NULL, NULL, NULL, 1, NULL, NULL, NULL, 126),  /** Venta 1: Cliente jurídico 1 - Tarjeta débito */
    (18.00, CURRENT_DATE - INTERVAL '30 days' + TIME '10:35:00', 2, NULL, NULL, NULL, 2, NULL, NULL, NULL, 101),  /** Venta 2: Cliente natural 1 - Tarjeta crédito Visa */
    (29.00, CURRENT_DATE - INTERVAL '30 days' + TIME '14:30:00', 2, NULL, NULL, NULL, 3, NULL, NULL, NULL, 101),  /** Venta 3: Usuario web (cliente natural 1) - Tarjeta crédito Visa */
    (39.00, CURRENT_DATE - INTERVAL '30 days' + TIME '12:50:00', 2, NULL, NULL, NULL, 4, NULL, NULL, NULL, 127),  /** Venta 4: Cliente jurídico 2 - Tarjeta crédito Visa */
    (10.00, CURRENT_DATE - INTERVAL '30 days' + TIME '14:25:00', 2, NULL, NULL, NULL, 5, NULL, NULL, NULL, 102),  /** Venta 5: Cliente natural 2 - Tarjeta crédito MasterCard */
    (32.00, CURRENT_DATE - INTERVAL '29 days' + TIME '12:00:00', 3, NULL, NULL, NULL, 6, NULL, NULL, NULL, 102),  /** Venta 6: Usuario web (cliente natural 2) - Tarjeta crédito MasterCard */
    (49.00, CURRENT_DATE - INTERVAL '29 days' + TIME '09:50:00', 3, NULL, NULL, NULL, 7, NULL, NULL, NULL, 128),  /** Venta 7: Cliente jurídico 3 - Tarjeta débito */
    (29.00, CURRENT_DATE - INTERVAL '29 days' + TIME '10:20:00', 3, NULL, NULL, NULL, 8, NULL, NULL, NULL, 103),  /** Venta 8: Cliente natural 3 - Tarjeta débito */
    (18.00, CURRENT_DATE - INTERVAL '29 days' + TIME '15:00:00', 3, NULL, NULL, NULL, 9, NULL, NULL, NULL, 103),  /** Venta 9: Usuario web (cliente natural 3) - Tarjeta débito */
    (59.00, CURRENT_DATE - INTERVAL '29 days' + TIME '13:05:00', 3, NULL, NULL, NULL, 10, NULL, NULL, NULL, 129), /** Venta 10: Cliente jurídico 4 - Tarjeta crédito MasterCard */

    /** VENTAS 11-50: Clientes naturales (2 ventas por cada cliente natural 1-20) */
    (39.00, CURRENT_DATE - INTERVAL '28 days' + TIME '09:05:00', 4, NULL, NULL, NULL, 11, NULL, NULL, NULL, 101), /** Venta 11: Cliente natural 1 - Tarjeta crédito Visa */
    (13.00, CURRENT_DATE - INTERVAL '28 days' + TIME '13:50:00', 4, NULL, NULL, NULL, 12, NULL, NULL, NULL, 101), /** Venta 12: Cliente natural 1 - Tarjeta crédito Visa */
    (1.00, CURRENT_DATE - INTERVAL '28 days' + TIME '13:50:00', 1, NULL, NULL, NULL, 12, NULL, NULL, NULL, 1), /** Venta 12: Cliente natural 1 -Puntos */
    (48.00, CURRENT_DATE - INTERVAL '28 days' + TIME '11:50:00', 4, NULL, NULL, NULL, 13, NULL, NULL, NULL, 102), /** Venta 13: Cliente natural 2 - Tarjeta crédito MasterCard */
    (1.00, CURRENT_DATE - INTERVAL '28 days' + TIME '11:50:00', 1, NULL, NULL, NULL, 13, NULL, NULL, NULL, 11), /** Venta 13: Cliente natural 2 - Punto */
    (29.00, CURRENT_DATE - INTERVAL '28 days' + TIME '14:35:00', 4, NULL, NULL, NULL, 14, NULL, NULL, NULL, 102), /** Venta 14: Cliente natural 2 - Tarjeta crédito MasterCard */
    (13.00, CURRENT_DATE - INTERVAL '28 days' + TIME '18:30:00', 4, NULL, NULL, NULL, 15, NULL, NULL, NULL, 103), /** Venta 15: Cliente natural 3 - Tarjeta débito */
    (1.00, CURRENT_DATE - INTERVAL '28 days' + TIME '18:30:00', 1, NULL, NULL, NULL, 15, NULL, NULL, NULL, 21), /** Venta 15: Cliente natural 3 - punto */
    (59.00, CURRENT_DATE - INTERVAL '25 days' + TIME '08:20:00', 7, NULL, NULL, NULL, 16, NULL, NULL, NULL, 103), /** Venta 16: Cliente natural 3 - Tarjeta débito */
    (27.00, CURRENT_DATE - INTERVAL '25 days' + TIME '09:35:00', 7, NULL, NULL, NULL, 17, NULL, NULL, NULL, 104), /** Venta 17: Cliente natural 4 - Tarjeta débito */
    (10.00, CURRENT_DATE - INTERVAL '25 days' + TIME '13:30:00', 7, NULL, NULL, NULL, 18, NULL, NULL, NULL, 104), /** Venta 18: Cliente natural 4 - Tarjeta débito */
    (39.00, CURRENT_DATE - INTERVAL '25 days' + TIME '11:20:00', 7, NULL, NULL, NULL, 19, NULL, NULL, NULL, 111), /** Venta 19: Cliente natural 5 - Tarjeta crédito Visa */
    (29.00, CURRENT_DATE - INTERVAL '25 days' + TIME '14:05:00', 7, NULL, NULL, NULL, 20, NULL, NULL, NULL, 111), /** Venta 20: Cliente natural 5 - Tarjeta crédito Visa */
    (18.00, CURRENT_DATE - INTERVAL '20 days' + TIME '13:15:00', 12, NULL, NULL, NULL, 21, NULL, NULL, NULL, 112), /** Venta 21: Cliente natural 6 - Tarjeta débito */
    (19.00, CURRENT_DATE - INTERVAL '20 days' + TIME '10:35:00', 12, NULL, NULL, NULL, 22, NULL, NULL, NULL, 112), /** Venta 22: Cliente natural 6 - Tarjeta débito */
    (53.00, CURRENT_DATE - INTERVAL '20 days' + TIME '11:05:00', 12, NULL, NULL, NULL, 23, NULL, NULL, NULL, 113), /** Venta 23: Cliente natural 7 - Tarjeta crédito MasterCard */
    (10.00, CURRENT_DATE - INTERVAL '20 days' + TIME '15:45:00', 12, NULL, NULL, NULL, 24, NULL, NULL, NULL, 113), /** Venta 24: Cliente natural 7 - Tarjeta crédito MasterCard */
    (37.00, CURRENT_DATE - INTERVAL '20 days' + TIME '13:35:00', 12, NULL, NULL, NULL, 25, NULL, NULL, NULL, 114), /** Venta 25: Cliente natural 8 - Tarjeta débito */
    (59.00, CURRENT_DATE - INTERVAL '15 days' + TIME '08:05:00', 17, NULL, NULL, NULL, 26, NULL, NULL, NULL, 114), /** Venta 26: Cliente natural 8 - Tarjeta débito */
    (14.00, CURRENT_DATE - INTERVAL '15 days' + TIME '12:45:00', 17, NULL, NULL, NULL, 27, NULL, NULL, NULL, 115), /** Venta 27: Cliente natural 9 - Tarjeta crédito American Express */
    (19.00, CURRENT_DATE - INTERVAL '15 days' + TIME '10:35:00', 17, NULL, NULL, NULL, 28, NULL, NULL, NULL, 115), /** Venta 28: Cliente natural 9 - Tarjeta crédito American Express */
    (43.00, CURRENT_DATE - INTERVAL '15 days' + TIME '11:50:00', 17, NULL, NULL, NULL, 29, NULL, NULL, NULL, 116), /** Venta 29: Cliente natural 10 - Tarjeta débito */
    (29.00, CURRENT_DATE - INTERVAL '15 days' + TIME '17:30:00', 17, NULL, NULL, NULL, 30, NULL, NULL, NULL, 116), /** Venta 30: Cliente natural 10 - Tarjeta débito */
    (49.00, CURRENT_DATE - INTERVAL '10 days' + TIME '09:05:00', 22, NULL, NULL, NULL, 31, NULL, NULL, NULL, 117), /** Venta 31: Cliente natural 11 - Tarjeta crédito Visa */
    (14.00, CURRENT_DATE - INTERVAL '10 days' + TIME '10:20:00', 22, NULL, NULL, NULL, 32, NULL, NULL, NULL, 117), /** Venta 32: Cliente natural 11 - Tarjeta crédito Visa */
    (19.00, CURRENT_DATE - INTERVAL '10 days' + TIME '15:00:00', 22, NULL, NULL, NULL, 33, NULL, NULL, NULL, 118), /** Venta 33: Cliente natural 12 - Tarjeta débito */
    (67.00, CURRENT_DATE - INTERVAL '10 days' + TIME '12:50:00', 22, NULL, NULL, NULL, 34, NULL, NULL, NULL, 118), /** Venta 34: Cliente natural 12 - Tarjeta débito */
    (29.00, CURRENT_DATE - INTERVAL '10 days' + TIME '14:05:00', 22, NULL, NULL, NULL, 35, NULL, NULL, NULL, 119), /** Venta 35: Cliente natural 13 - Tarjeta crédito MasterCard */
    (10.00, CURRENT_DATE - INTERVAL '7 days' + TIME '12:00:00', 25, NULL, NULL, NULL, 36, NULL, NULL, NULL, 119), /** Venta 36: Cliente natural 13 - Tarjeta crédito MasterCard */
    (57.00, CURRENT_DATE - INTERVAL '7 days' + TIME '09:50:00', 25, NULL, NULL, NULL, 37, NULL, NULL, NULL, 120), /** Venta 37: Cliente natural 14 - Tarjeta débito */
    (19.00, CURRENT_DATE - INTERVAL '7 days' + TIME '10:05:00', 25, NULL, NULL, NULL, 38, NULL, NULL, NULL, 120), /** Venta 38: Cliente natural 14 - Tarjeta débito */
    (43.00, CURRENT_DATE - INTERVAL '7 days' + TIME '14:45:00', 25, NULL, NULL, NULL, 39, NULL, NULL, NULL, 121), /** Venta 39: Cliente natural 15 - Tarjeta crédito Visa */
    (29.00, CURRENT_DATE - INTERVAL '7 days' + TIME '13:05:00', 25, NULL, NULL, NULL, 40, NULL, NULL, NULL, 121), /** Venta 40: Cliente natural 15 - Tarjeta crédito Visa */
    (18.00, CURRENT_DATE - INTERVAL '5 days' + TIME '09:05:00', 27, NULL, NULL, NULL, 41, NULL, NULL, NULL, 122), /** Venta 41: Cliente natural 16 - Tarjeta débito */
    (10.00, CURRENT_DATE - INTERVAL '5 days' + TIME '14:00:00', 27, NULL, NULL, NULL, 42, NULL, NULL, NULL, 122), /** Venta 42: Cliente natural 16 - Tarjeta débito */
    (43.00, CURRENT_DATE - INTERVAL '5 days' + TIME '11:50:00', 27, NULL, NULL, NULL, 43, NULL, NULL, NULL, 123), /** Venta 43: Cliente natural 17 - Tarjeta crédito MasterCard */
    (29.00, CURRENT_DATE - INTERVAL '5 days' + TIME '13:05:00', 27, NULL, NULL, NULL, 44, NULL, NULL, NULL, 123), /** Venta 44: Cliente natural 17 - Tarjeta crédito MasterCard */
    (57.00, CURRENT_DATE - INTERVAL '5 days' + TIME '18:00:00', 27, NULL, NULL, NULL, 45, NULL, NULL, NULL, 124), /** Venta 45: Cliente natural 18 - Tarjeta débito */
    (19.00, CURRENT_DATE - INTERVAL '3 days' + TIME '08:20:00', 29, NULL, NULL, NULL, 46, NULL, NULL, NULL, 124), /** Venta 46: Cliente natural 18 - Tarjeta débito */
    (59.00, CURRENT_DATE - INTERVAL '3 days' + TIME '09:35:00', 29, NULL, NULL, NULL, 47, NULL, NULL, NULL, 125), /** Venta 47: Cliente natural 19 - Tarjeta crédito American Express */
    (18.00, CURRENT_DATE - INTERVAL '3 days' + TIME '13:30:00', 29, NULL, NULL, NULL, 48, NULL, NULL, NULL, 125), /** Venta 48: Cliente natural 19 - Tarjeta crédito American Express */
    (29.00, CURRENT_DATE - INTERVAL '3 days' + TIME '11:20:00', 29, NULL, NULL, NULL, 49, NULL, NULL, NULL, 126), /** Venta 49: Cliente natural 20 - Tarjeta débito */
    (10.00, CURRENT_DATE - INTERVAL '3 days' + TIME '14:05:00', 29, NULL, NULL, NULL, 50, NULL, NULL, NULL, 126), /** Venta 50: Cliente natural 20 - Tarjeta débito */

    /** VENTAS 51-90: Clientes jurídicos (2 ventas por cada cliente jurídico 1-20) */
    (47.00, CURRENT_DATE - INTERVAL '1 day' + TIME '12:00:00', 31, NULL, NULL, NULL, 51, NULL, NULL, NULL, 127), /** Venta 51: Cliente jurídico 1 - Tarjeta crédito Visa */
    (19.00, CURRENT_DATE - INTERVAL '1 day' + TIME '09:05:00', 31, NULL, NULL, NULL, 52, NULL, NULL, NULL, 127), /** Venta 52: Cliente jurídico 1 - Tarjeta crédito Visa */
    (53.00, CURRENT_DATE - INTERVAL '1 day' + TIME '09:50:00', 31, NULL, NULL, NULL, 53, NULL, NULL, NULL, 128), /** Venta 53: Cliente jurídico 2 - Tarjeta débito */
    (29.00, CURRENT_DATE - INTERVAL '1 day' + TIME '13:45:00', 31, NULL, NULL, NULL, 54, NULL, NULL, NULL, 128), /** Venta 54: Cliente jurídico 2 - Tarjeta débito */
    (59.00, CURRENT_DATE - INTERVAL '1 day' + TIME '11:05:00', 31, NULL, NULL, NULL, 55, NULL, NULL, NULL, 129), /** Venta 55: Cliente jurídico 3 - Tarjeta crédito MasterCard */
    (14.00, CURRENT_DATE - INTERVAL '1 day' + TIME '11:35:00', 31, NULL, NULL, NULL, 56, NULL, NULL, NULL, 129), /** Venta 56: Cliente jurídico 3 - Tarjeta crédito MasterCard */
    (23.00, CURRENT_DATE - INTERVAL '1 day' + TIME '15:30:00', 31, NULL, NULL, NULL, 57, NULL, NULL, NULL, 130), /** Venta 57: Cliente jurídico 4 - Tarjeta débito */
    (39.00, CURRENT_DATE - INTERVAL '1 day' + TIME '13:20:00', 31, NULL, NULL, NULL, 58, NULL, NULL, NULL, 130), /** Venta 58: Cliente jurídico 4 - Tarjeta débito */
    (33.00, CURRENT_DATE - INTERVAL '1 day' + TIME '14:05:00', 31, NULL, NULL, NULL, 59, NULL, NULL, NULL, 131), /** Venta 59: Cliente jurídico 5 - Tarjeta crédito Visa */
    (49.00, CURRENT_DATE - INTERVAL '1 day' + TIME '18:00:00', 31, NULL, NULL, NULL, 60, NULL, NULL, NULL, 131), /** Venta 60: Cliente jurídico 5 - Tarjeta crédito Visa */
    (10.00, CURRENT_DATE + TIME '08:05:00', 31, NULL, NULL, NULL, 61, NULL, NULL, NULL, 132), /** Venta 61: Cliente jurídico 6 - Tarjeta débito */
    (27.00, CURRENT_DATE + TIME '08:35:00', 31, NULL, NULL, NULL, 62, NULL, NULL, NULL, 132), /** Venta 62: Cliente jurídico 6 - Tarjeta débito */
    (59.00, CURRENT_DATE + TIME '12:30:00', 31, NULL, NULL, NULL, 63, NULL, NULL, NULL, 133), /** Venta 63: Cliente jurídico 7 - Tarjeta crédito MasterCard */
    (33.00, CURRENT_DATE + TIME '09:20:00', 31, NULL, NULL, NULL, 64, NULL, NULL, NULL, 133), /** Venta 64: Cliente jurídico 7 - Tarjeta crédito MasterCard */
    (39.00, CURRENT_DATE + TIME '09:50:00', 31, NULL, NULL, NULL, 65, NULL, NULL, NULL, 134), /** Venta 65: Cliente jurídico 8 - Tarjeta débito */
    (19.00, CURRENT_DATE + TIME '13:30:00', 31, NULL, NULL, NULL, 66, NULL, NULL, NULL, 134), /** Venta 66: Cliente jurídico 8 - Tarjeta débito */
    (57.00, CURRENT_DATE + TIME '10:35:00', 31, NULL, NULL, NULL, 67, NULL, NULL, NULL, 135), /** Venta 67: Cliente jurídico 9 - Tarjeta crédito American Express */
    (29.00, CURRENT_DATE + TIME '11:05:00', 31, NULL, NULL, NULL, 68, NULL, NULL, NULL, 135), /** Venta 68: Cliente jurídico 9 - Tarjeta crédito American Express */
    (43.00, CURRENT_DATE + TIME '14:45:00', 31, NULL, NULL, NULL, 69, NULL, NULL, NULL, 136), /** Venta 69: Cliente jurídico 10 - Tarjeta débito */
    (59.00, CURRENT_DATE + TIME '11:50:00', 31, NULL, NULL, NULL, 70, NULL, NULL, NULL, 136), /** Venta 70: Cliente jurídico 10 - Tarjeta débito */
    (19.00, CURRENT_DATE + TIME '12:05:00', 31, NULL, NULL, NULL, 71, NULL, NULL, NULL, 137), /** Venta 71: Cliente jurídico 11 - Tarjeta crédito Visa */
    (18.00, CURRENT_DATE + TIME '16:00:00', 31, NULL, NULL, NULL, 72, NULL, NULL, NULL, 137), /** Venta 72: Cliente jurídico 11 - Tarjeta crédito Visa */
    (68.00, CURRENT_DATE + TIME '13:05:00', 31, NULL, NULL, NULL, 73, NULL, NULL, NULL, 138), /** Venta 73: Cliente jurídico 12 - Tarjeta débito */
    (14.00, CURRENT_DATE + TIME '13:35:00', 31, NULL, NULL, NULL, 74, NULL, NULL, NULL, 138), /** Venta 74: Cliente jurídico 12 - Tarjeta débito */
    (59.00, CURRENT_DATE + TIME '17:30:00', 31, NULL, NULL, NULL, 75, NULL, NULL, NULL, 139), /** Venta 75: Cliente jurídico 13 - Tarjeta crédito MasterCard */
    (19.00, CURRENT_DATE + TIME '14:20:00', 31, NULL, NULL, NULL, 76, NULL, NULL, NULL, 139), /** Venta 76: Cliente jurídico 13 - Tarjeta crédito MasterCard */
    (47.00, CURRENT_DATE + TIME '14:50:00', 31, NULL, NULL, NULL, 77, NULL, NULL, NULL, 140), /** Venta 77: Cliente jurídico 14 - Tarjeta débito */
    (29.00, CURRENT_DATE + TIME '18:30:00', 31, NULL, NULL, NULL, 78, NULL, NULL, NULL, 140), /** Venta 78: Cliente jurídico 14 - Tarjeta débito */
    (49.00, CURRENT_DATE + TIME '15:35:00', 31, NULL, NULL, NULL, 79, NULL, NULL, NULL, 126), /** Venta 79: Cliente jurídico 15 - Tarjeta débito */
    (27.00, CURRENT_DATE + TIME '16:05:00', 31, NULL, NULL, NULL, 80, NULL, NULL, NULL, 126), /** Venta 80: Cliente jurídico 15 - Tarjeta débito */
    
    /** VENTAS 81-90: Ventas pendientes aún en proceso */
    (59.00, CURRENT_DATE + TIME '16:30:00', 31, NULL, NULL, NULL, 81, NULL, NULL, NULL, 127), /** Venta 81: Cliente jurídico 16 - Tarjeta crédito Visa */
    (29.00, CURRENT_DATE + TIME '17:00:00', 31, NULL, NULL, NULL, 82, NULL, NULL, NULL, 127), /** Venta 82: Cliente jurídico 16 - Tarjeta crédito Visa */
    (43.00, CURRENT_DATE + TIME '17:15:00', 31, NULL, NULL, NULL, 83, NULL, NULL, NULL, 128), /** Venta 83: Cliente jurídico 17 - Tarjeta débito */
    (19.00, CURRENT_DATE + TIME '17:30:00', 31, NULL, NULL, NULL, 84, NULL, NULL, NULL, 128), /** Venta 84: Cliente jurídico 17 - Tarjeta débito */
    (57.00, CURRENT_DATE + TIME '17:45:00', 31, NULL, NULL, NULL, 85, NULL, NULL, NULL, 129), /** Venta 85: Cliente jurídico 18 - Tarjeta crédito MasterCard */
    (10.00, CURRENT_DATE + TIME '18:00:00', 31, NULL, NULL, NULL, 86, NULL, NULL, NULL, 129), /** Venta 86: Cliente jurídico 18 - Tarjeta crédito MasterCard */
    (33.00, CURRENT_DATE + TIME '18:15:00', 31, NULL, NULL, NULL, 87, NULL, NULL, NULL, 130), /** Venta 87: Cliente jurídico 19 - Tarjeta débito */
    (59.00, CURRENT_DATE + TIME '18:30:00', 31, NULL, NULL, NULL, 88, NULL, NULL, NULL, 130), /** Venta 88: Cliente jurídico 19 - Tarjeta débito */
    (23.00, CURRENT_DATE + TIME '18:45:00', 31, NULL, NULL, NULL, 89, NULL, NULL, NULL, 131), /** Venta 89: Cliente jurídico 20 - Tarjeta crédito Visa */
    (39.00, CURRENT_DATE + TIME '19:00:00', 31, NULL, NULL, NULL, 90, NULL, NULL, NULL, 131); /** Venta 90: Cliente jurídico 20 - Tarjeta crédito Visa */

INSERT INTO miembro_metodo_pago (fk_metodo_pago, fk_miembro_1, fk_miembro_2) VALUES
(140,12345678,'J'),
(139,111222333, 'J' ),
(138,444555666, 'V'),
(137,777888999, 'J'),
(136,111333555, 'V'),
(135,222444666, 'J'),
(134,333555777, 'V'),
(133,444666888, 'J'),
(132,555777999, 'V'),
(131,666888000, 'J');

 
INSERT INTO status (id, nombre) VALUES
    (1, 'Pendiente'),
    (2, 'En Proceso'),
    (3, 'Aprobado'),
    (4, 'Rechazado'),
    (5, 'Completado'),
    (6, 'Cancelado'),
    (7, 'En Revisión'),
    (8, 'Devuelto'),
    (9, 'En Espera'),
    (10, 'Finalizado');

/**
 * Actualiza el valor de la secuencia para la tabla status.
 * Esto es necesario después de insertar manualmente los valores de ID
 * para asegurar que las futuras inserciones automáticas no creen conflictos.
 * La secuencia se establece al valor máximo de ID existente en la tabla.
 */
SELECT setval('status_id_seq', (SELECT MAX(id) FROM status));
 
/**
 * Inserts para la tabla status_mensualidad
 * Relaciona los estados con las mensualidades existentes
 * Usa fechas dinámicas más recientes
 */
INSERT INTO status_mensualidad (fecha_actualización, fecha_fin, fk_status, fk_mensualidad_1, fk_mensualidad_2, fk_mensualidad_3) VALUES
    (CURRENT_DATE - INTERVAL '30 days', NULL, 1, 1, 123456789, 'J'),
    (CURRENT_DATE - INTERVAL '29 days', NULL, 2, 2, 987654321, 'V'),
    (CURRENT_DATE - INTERVAL '28 days', NULL, 3, 3, 234567890, 'J'),
    (CURRENT_DATE - INTERVAL '27 days', NULL, 4, 4, 345678901, 'V'),
    (CURRENT_DATE - INTERVAL '26 days', NULL, 5, 5, 456789012, 'J'),
    (CURRENT_DATE - INTERVAL '25 days', NULL, 6, 6, 567890123, 'V'),
    (CURRENT_DATE - INTERVAL '24 days', NULL, 7, 7, 678901234, 'J'),
    (CURRENT_DATE - INTERVAL '23 days', NULL, 8, 8, 789012345, 'V'),
    (CURRENT_DATE - INTERVAL '22 days', NULL, 9, 9, 890123456, 'J'),
    (CURRENT_DATE - INTERVAL '21 days', NULL, 10, 10, 901234567, 'V'),
    (CURRENT_DATE - INTERVAL '20 days', NULL, 10, 11, 12345678, 'J');

 
/**
 * Inserts para la tabla status_orden
 * Relaciona los estados con las órdenes de compra y reposición
 * Cada orden debe tener o fk_orden_de_compra o fk_orden_reposicion, no ambos
 * Todas las órdenes inician con status "Pendiente" (ID 1) en la fecha de creación
 */
INSERT INTO status_orden (fecha_actualización, fecha_fin, fk_orden_de_compra, fk_status, fk_orden_de_reposicion) VALUES
    -- Orden de Compra (nueva ID 1), creada en 2024-05-10
    ('2024-05-10', '2024-05-12', 1, 1, NULL),    -- Pendiente
    ('2024-05-12', '2024-05-17', 1, 3, NULL),    -- Aprobado
    ('2024-05-17', NULL,         1, 10, NULL),   -- Finalizado

    -- Orden de Reposición (nueva ID 1), creada en 2024-05-10
    ('2024-05-10', '2024-05-11', NULL, 1, 1),    -- Pendiente
    ('2024-05-11', '2024-05-16', NULL, 3, 1),    -- Aprobado
    ('2024-05-16', NULL,         NULL, 10, 1),   -- Finalizado

    -- Orden de Reposición (nueva ID 2), creada en 2024-05-11
    ('2024-05-11', '2024-05-13', NULL, 1, 2),    -- Pendiente
    ('2024-05-13', '2024-05-18', NULL, 3, 2),    -- Aprobado
    ('2024-05-18', NULL,         NULL, 10, 2),   -- Finalizado

    -- Orden de Reposición (nueva ID 3), creada en 2024-05-12
    ('2024-05-12', '2024-05-14', NULL, 1, 3),    -- Pendiente
    ('2024-05-14', '2024-05-19', NULL, 3, 3),    -- Aprobado
    ('2024-05-19', NULL,         NULL, 10, 3),   -- Finalizado

    -- Orden de Compra (nueva ID 2), creada en 2024-06-12
    ('2024-06-12', '2024-06-14', 2, 1, NULL),    -- Pendiente
    ('2024-06-14', '2024-06-20', 2, 3, NULL),    -- Aprobado
    ('2024-06-20', NULL,         2, 10, NULL),   -- Finalizado

    -- Orden de Compra (nueva ID 3), creada en 2024-07-13
    ('2024-07-13', '2024-07-15', 3, 1, NULL),    -- Pendiente
    ('2024-07-15', '2024-07-22', 3, 3, NULL),    -- Aprobado
    ('2024-07-22', NULL,         3, 10, NULL),   -- Finalizado

    -- Orden de Compra (nueva ID 4), creada en 2024-08-15
    ('2024-08-15', '2024-08-17', 4, 1, NULL),    -- Pendiente
    ('2024-08-17', '2024-08-23', 4, 3, NULL),    -- Aprobado
    ('2024-08-23', NULL,         4, 10, NULL),   -- Finalizado

    -- Orden de Reposición (nueva ID 4), creada en 2024-08-15
    ('2024-08-15', '2024-08-18', NULL, 1, 4),    -- Pendiente
    ('2024-08-18', '2024-08-25', NULL, 3, 4),    -- Aprobado
    ('2024-08-25', NULL,         NULL, 10, 4),   -- Finalizado

    -- Orden de Compra (nueva ID 5), creada en 2024-09-16
    ('2024-09-16', '2024-09-18', 5, 1, NULL),    -- Pendiente
    ('2024-09-18', '2024-09-25', 5, 3, NULL),    -- Aprobado
    ('2024-09-25', NULL,         5, 10, NULL),   -- Finalizado

    -- Orden de Reposición (nueva ID 5), creada en 2024-09-16
    ('2024-09-16', '2024-09-19', NULL, 1, 5),    -- Pendiente
    ('2024-09-19', '2024-09-26', NULL, 3, 5),    -- Aprobado
    ('2024-09-26', NULL,         NULL, 10, 5),   -- Finalizado

    -- Orden de Compra (nueva ID 6), creada en 2024-10-17
    ('2024-10-17', '2024-10-20', 6, 1, NULL),    -- Pendiente
    ('2024-10-20', '2024-10-27', 6, 3, NULL),    -- Aprobado
    ('2024-10-27', NULL,         6, 10, NULL),   -- Finalizado

    -- Orden de Reposición (nueva ID 6), creada en 2024-10-17
    ('2024-10-17', '2024-10-19', NULL, 1, 6),    -- Pendiente
    ('2024-10-19', '2024-10-26', NULL, 3, 6),    -- Aprobado
    ('2024-10-26', NULL,         NULL, 10, 6),   -- Finalizado

    -- Orden de Compra (nueva ID 7), creada en 2024-11-18
    ('2024-11-18', '2024-11-20', 7, 1, NULL),    -- Pendiente
    ('2024-11-20', '2024-11-28', 7, 3, NULL),    -- Aprobado
    ('2024-11-28', NULL,         7, 10, NULL),   -- Finalizado

    -- Orden de Reposición (nueva ID 7), creada en 2024-11-18
    ('2024-11-18', '2024-11-21', NULL, 1, 7),    -- Pendiente
    ('2024-11-21', '2024-11-29', NULL, 3, 7),    -- Aprobado
    ('2024-11-29', NULL,         NULL, 10, 7),   -- Finalizado

    -- Órdenes de 2025 (solo pendientes, con sus nuevas IDs)
    ('2025-06-20', NULL, 8, 1, NULL),    -- Orden compra (nueva ID 8)
    ('2025-06-21', NULL, NULL, 1, 8),    -- Orden reposición (nueva ID 8)
    ('2025-06-22', NULL, 9, 1, NULL),    -- Orden compra (nueva ID 9)
    ('2025-06-23', NULL, NULL, 1, 9),    -- Orden reposición (nueva ID 9)
    ('2025-06-24', NULL, 10, 1, NULL),   -- Orden compra (nueva ID 10)
    ('2025-06-25', NULL, NULL, 1, 10);   -- Orden reposición (nueva ID 10)

-- =============================================================================
-- 4. INSERTS PARA LA TABLA STATUS_VENTA
-- =============================================================================

/**
 * Inserts para la tabla status_venta
 * Relaciona los estados con las ventas regulares
 * Cada venta tiene dos registros: En Proceso (2) y Completado (5)
 * Para ventas de tienda física el tiempo de proceso es de 5 minutos
 * Para ventas web el tiempo puede ser de varias horas
 */
INSERT INTO status_venta (fecha_actualización, fecha_fin, fk_status, fk_venta, fk_venta_evento) VALUES
    -- Ventas del último mes distribuidas de manera realista
    -- Ventas más antiguas (hace 30 días)
    (CURRENT_DATE - INTERVAL '30 days' + TIME '09:15:00', CURRENT_DATE - INTERVAL '30 days' + TIME '09:20:00', 2, 1, NULL),    -- Venta 1 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '30 days' + TIME '10:30:00', CURRENT_DATE - INTERVAL '30 days' + TIME '10:35:00', 2, 2, NULL),    -- Venta 2 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '30 days' + TIME '11:00:00', CURRENT_DATE - INTERVAL '30 days' + TIME '14:30:00', 2, 3, NULL),    -- Venta 3 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '30 days' + TIME '12:45:00', CURRENT_DATE - INTERVAL '30 days' + TIME '12:50:00', 2, 4, NULL),    -- Venta 4 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '30 days' + TIME '14:20:00', CURRENT_DATE - INTERVAL '30 days' + TIME '14:25:00', 2, 5, NULL),    -- Venta 5 - Tienda física (5 min)
    
    -- Ventas de hace 29 días
    (CURRENT_DATE - INTERVAL '29 days' + TIME '08:30:00', CURRENT_DATE - INTERVAL '29 days' + TIME '12:00:00', 2, 6, NULL),    -- Venta 6 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '29 days' + TIME '09:45:00', CURRENT_DATE - INTERVAL '29 days' + TIME '09:50:00', 2, 7, NULL),    -- Venta 7 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '29 days' + TIME '10:15:00', CURRENT_DATE - INTERVAL '29 days' + TIME '10:20:00', 2, 8, NULL),    -- Venta 8 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '29 days' + TIME '11:30:00', CURRENT_DATE - INTERVAL '29 days' + TIME '15:00:00', 2, 9, NULL),    -- Venta 9 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '29 days' + TIME '13:00:00', CURRENT_DATE - INTERVAL '29 days' + TIME '13:05:00', 2, 10, NULL),   -- Venta 10 - Tienda física (5 min)
    
    -- Ventas de hace 28 días
    (CURRENT_DATE - INTERVAL '28 days' + TIME '09:00:00', CURRENT_DATE - INTERVAL '28 days' + TIME '09:05:00', 2, 11, NULL),   -- Venta 11 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '28 days' + TIME '10:20:00', CURRENT_DATE - INTERVAL '28 days' + TIME '13:50:00', 2, 12, NULL),   -- Venta 12 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '28 days' + TIME '11:45:00', CURRENT_DATE - INTERVAL '28 days' + TIME '11:50:00', 2, 13, NULL),   -- Venta 13 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '28 days' + TIME '14:30:00', CURRENT_DATE - INTERVAL '28 days' + TIME '14:35:00', 2, 14, NULL),   -- Venta 14 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '28 days' + TIME '15:00:00', CURRENT_DATE - INTERVAL '28 days' + TIME '18:30:00', 2, 15, NULL),   -- Venta 15 - Web (3.5 horas)
    
    -- Ventas de hace 25 días
    (CURRENT_DATE - INTERVAL '25 days' + TIME '08:15:00', CURRENT_DATE - INTERVAL '25 days' + TIME '08:20:00', 2, 16, NULL),   -- Venta 16 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '25 days' + TIME '09:30:00', CURRENT_DATE - INTERVAL '25 days' + TIME '09:35:00', 2, 17, NULL),   -- Venta 17 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '25 days' + TIME '10:00:00', CURRENT_DATE - INTERVAL '25 days' + TIME '13:30:00', 2, 18, NULL),   -- Venta 18 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '25 days' + TIME '11:15:00', CURRENT_DATE - INTERVAL '25 days' + TIME '11:20:00', 2, 19, NULL),   -- Venta 19 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '25 days' + TIME '14:00:00', CURRENT_DATE - INTERVAL '25 days' + TIME '14:05:00', 2, 20, NULL),   -- Venta 20 - Tienda física (5 min)
    
    -- Ventas de hace 20 días
    (CURRENT_DATE - INTERVAL '20 days' + TIME '09:45:00', CURRENT_DATE - INTERVAL '20 days' + TIME '13:15:00', 2, 21, NULL),   -- Venta 21 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '20 days' + TIME '10:30:00', CURRENT_DATE - INTERVAL '20 days' + TIME '10:35:00', 2, 22, NULL),   -- Venta 22 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '20 days' + TIME '11:00:00', CURRENT_DATE - INTERVAL '20 days' + TIME '11:05:00', 2, 23, NULL),   -- Venta 23 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '20 days' + TIME '12:15:00', CURRENT_DATE - INTERVAL '20 days' + TIME '15:45:00', 2, 24, NULL),   -- Venta 24 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '20 days' + TIME '13:30:00', CURRENT_DATE - INTERVAL '20 days' + TIME '13:35:00', 2, 25, NULL),   -- Venta 25 - Tienda física (5 min)
    
    -- Ventas de hace 15 días
    (CURRENT_DATE - INTERVAL '15 days' + TIME '08:00:00', CURRENT_DATE - INTERVAL '15 days' + TIME '08:05:00', 2, 26, NULL),   -- Venta 26 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '15 days' + TIME '09:15:00', CURRENT_DATE - INTERVAL '15 days' + TIME '12:45:00', 2, 27, NULL),   -- Venta 27 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '15 days' + TIME '10:30:00', CURRENT_DATE - INTERVAL '15 days' + TIME '10:35:00', 2, 28, NULL),   -- Venta 28 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '15 days' + TIME '11:45:00', CURRENT_DATE - INTERVAL '15 days' + TIME '11:50:00', 2, 29, NULL),   -- Venta 29 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '15 days' + TIME '14:00:00', CURRENT_DATE - INTERVAL '15 days' + TIME '17:30:00', 2, 30, NULL),   -- Venta 30 - Web (3.5 horas)
    
    -- Ventas de hace 10 días
    (CURRENT_DATE - INTERVAL '10 days' + TIME '09:00:00', CURRENT_DATE - INTERVAL '10 days' + TIME '09:05:00', 2, 31, NULL),   -- Venta 31 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '10 days' + TIME '10:15:00', CURRENT_DATE - INTERVAL '10 days' + TIME '10:20:00', 2, 32, NULL),   -- Venta 32 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '10 days' + TIME '11:30:00', CURRENT_DATE - INTERVAL '10 days' + TIME '15:00:00', 2, 33, NULL),   -- Venta 33 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '10 days' + TIME '12:45:00', CURRENT_DATE - INTERVAL '10 days' + TIME '12:50:00', 2, 34, NULL),   -- Venta 34 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '10 days' + TIME '14:00:00', CURRENT_DATE - INTERVAL '10 days' + TIME '14:05:00', 2, 35, NULL),   -- Venta 35 - Tienda física (5 min)
    
    -- Ventas de hace 7 días
    (CURRENT_DATE - INTERVAL '7 days' + TIME '08:30:00', CURRENT_DATE - INTERVAL '7 days' + TIME '12:00:00', 2, 36, NULL),    -- Venta 36 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '7 days' + TIME '09:45:00', CURRENT_DATE - INTERVAL '7 days' + TIME '09:50:00', 2, 37, NULL),    -- Venta 37 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '7 days' + TIME '10:00:00', CURRENT_DATE - INTERVAL '7 days' + TIME '10:05:00', 2, 38, NULL),    -- Venta 38 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '7 days' + TIME '11:15:00', CURRENT_DATE - INTERVAL '7 days' + TIME '14:45:00', 2, 39, NULL),    -- Venta 39 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '7 days' + TIME '13:00:00', CURRENT_DATE - INTERVAL '7 days' + TIME '13:05:00', 2, 40, NULL),    -- Venta 40 - Tienda física (5 min)
    
    -- Ventas de hace 5 días
    (CURRENT_DATE - INTERVAL '5 days' + TIME '09:00:00', CURRENT_DATE - INTERVAL '5 days' + TIME '09:05:00', 2, 41, NULL),    -- Venta 41 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '5 days' + TIME '10:30:00', CURRENT_DATE - INTERVAL '5 days' + TIME '14:00:00', 2, 42, NULL),    -- Venta 42 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '5 days' + TIME '11:45:00', CURRENT_DATE - INTERVAL '5 days' + TIME '11:50:00', 2, 43, NULL),    -- Venta 43 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '5 days' + TIME '13:00:00', CURRENT_DATE - INTERVAL '5 days' + TIME '13:05:00', 2, 44, NULL),    -- Venta 44 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '5 days' + TIME '14:30:00', CURRENT_DATE - INTERVAL '5 days' + TIME '18:00:00', 2, 45, NULL),    -- Venta 45 - Web (3.5 horas)
    
    -- Ventas de hace 3 días
    (CURRENT_DATE - INTERVAL '3 days' + TIME '08:15:00', CURRENT_DATE - INTERVAL '3 days' + TIME '08:20:00', 2, 46, NULL),    -- Venta 46 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '3 days' + TIME '09:30:00', CURRENT_DATE - INTERVAL '3 days' + TIME '09:35:00', 2, 47, NULL),    -- Venta 47 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '3 days' + TIME '10:00:00', CURRENT_DATE - INTERVAL '3 days' + TIME '13:30:00', 2, 48, NULL),    -- Venta 48 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '3 days' + TIME '11:15:00', CURRENT_DATE - INTERVAL '3 days' + TIME '11:20:00', 2, 49, NULL),    -- Venta 49 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '3 days' + TIME '14:00:00', CURRENT_DATE - INTERVAL '3 days' + TIME '14:05:00', 2, 50, NULL),    -- Venta 50 - Tienda física (5 min)
    
    -- Ventas de ayer
    (CURRENT_DATE - INTERVAL '1 day' + TIME '08:30:00', CURRENT_DATE - INTERVAL '1 day' + TIME '12:00:00', 2, 51, NULL),     -- Venta 51 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '09:00:00', CURRENT_DATE - INTERVAL '1 day' + TIME '09:05:00', 2, 52, NULL),     -- Venta 52 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '09:45:00', CURRENT_DATE - INTERVAL '1 day' + TIME '09:50:00', 2, 53, NULL),     -- Venta 53 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '10:15:00', CURRENT_DATE - INTERVAL '1 day' + TIME '13:45:00', 2, 54, NULL),     -- Venta 54 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '11:00:00', CURRENT_DATE - INTERVAL '1 day' + TIME '11:05:00', 2, 55, NULL),     -- Venta 55 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '11:30:00', CURRENT_DATE - INTERVAL '1 day' + TIME '11:35:00', 2, 56, NULL),     -- Venta 56 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '12:00:00', CURRENT_DATE - INTERVAL '1 day' + TIME '15:30:00', 2, 57, NULL),     -- Venta 57 - Web (3.5 horas)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '13:15:00', CURRENT_DATE - INTERVAL '1 day' + TIME '13:20:00', 2, 58, NULL),     -- Venta 58 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '14:00:00', CURRENT_DATE - INTERVAL '1 day' + TIME '14:05:00', 2, 59, NULL),     -- Venta 59 - Tienda física (5 min)
    (CURRENT_DATE - INTERVAL '1 day' + TIME '14:30:00', CURRENT_DATE - INTERVAL '1 day' + TIME '18:00:00', 2, 60, NULL),     -- Venta 60 - Web (3.5 horas)
    
    -- Ventas de hoy (más recientes)
    (CURRENT_DATE + TIME '08:00:00', CURRENT_DATE + TIME '08:05:00', 2, 61, NULL),     -- Venta 61 - Tienda física (5 min)
    (CURRENT_DATE + TIME '08:30:00', CURRENT_DATE + TIME '08:35:00', 2, 62, NULL),     -- Venta 62 - Tienda física (5 min)
    (CURRENT_DATE + TIME '09:00:00', CURRENT_DATE + TIME '12:30:00', 2, 63, NULL),     -- Venta 63 - Web (3.5 horas)
    (CURRENT_DATE + TIME '09:15:00', CURRENT_DATE + TIME '09:20:00', 2, 64, NULL),     -- Venta 64 - Tienda física (5 min)
    (CURRENT_DATE + TIME '09:45:00', CURRENT_DATE + TIME '09:50:00', 2, 65, NULL),     -- Venta 65 - Tienda física (5 min)
    (CURRENT_DATE + TIME '10:00:00', CURRENT_DATE + TIME '13:30:00', 2, 66, NULL),     -- Venta 66 - Web (3.5 horas)
    (CURRENT_DATE + TIME '10:30:00', CURRENT_DATE + TIME '10:35:00', 2, 67, NULL),     -- Venta 67 - Tienda física (5 min)
    (CURRENT_DATE + TIME '11:00:00', CURRENT_DATE + TIME '11:05:00', 2, 68, NULL),     -- Venta 68 - Tienda física (5 min)
    (CURRENT_DATE + TIME '11:15:00', CURRENT_DATE + TIME '14:45:00', 2, 69, NULL),     -- Venta 69 - Web (3.5 horas)
    (CURRENT_DATE + TIME '11:45:00', CURRENT_DATE + TIME '11:50:00', 2, 70, NULL),     -- Venta 70 - Tienda física (5 min)
    (CURRENT_DATE + TIME '12:00:00', CURRENT_DATE + TIME '12:05:00', 2, 71, NULL),     -- Venta 71 - Tienda física (5 min)
    (CURRENT_DATE + TIME '12:30:00', CURRENT_DATE + TIME '16:00:00', 2, 72, NULL),     -- Venta 72 - Web (3.5 horas)
    (CURRENT_DATE + TIME '13:00:00', CURRENT_DATE + TIME '13:05:00', 2, 73, NULL),     -- Venta 73 - Tienda física (5 min)
    (CURRENT_DATE + TIME '13:30:00', CURRENT_DATE + TIME '13:35:00', 2, 74, NULL),     -- Venta 74 - Tienda física (5 min)
    (CURRENT_DATE + TIME '14:00:00', CURRENT_DATE + TIME '17:30:00', 2, 75, NULL),     -- Venta 75 - Web (3.5 horas)
    (CURRENT_DATE + TIME '14:15:00', CURRENT_DATE + TIME '14:20:00', 2, 76, NULL),     -- Venta 76 - Tienda física (5 min)
    (CURRENT_DATE + TIME '14:45:00', CURRENT_DATE + TIME '14:50:00', 2, 77, NULL),     -- Venta 77 - Tienda física (5 min)
    (CURRENT_DATE + TIME '15:00:00', CURRENT_DATE + TIME '18:30:00', 2, 78, NULL),     -- Venta 78 - Web (3.5 horas)
    (CURRENT_DATE + TIME '15:30:00', CURRENT_DATE + TIME '15:35:00', 2, 79, NULL),     -- Venta 79 - Tienda física (5 min)
    (CURRENT_DATE + TIME '16:00:00', CURRENT_DATE + TIME '16:05:00', 2, 80, NULL),     -- Venta 80 - Tienda física (5 min)
    
    -- Ventas pendientes de completar (aún en proceso)
    (CURRENT_DATE + TIME '16:30:00', NULL, 2, 81, NULL),     -- Venta 81 - Web (pendiente)
    (CURRENT_DATE + TIME '17:00:00', NULL, 2, 82, NULL),     -- Venta 82 - Tienda física (pendiente)
    (CURRENT_DATE + TIME '17:15:00', NULL, 2, 83, NULL),     -- Venta 83 - Tienda física (pendiente)
    (CURRENT_DATE + TIME '17:30:00', NULL, 2, 84, NULL),     -- Venta 84 - Web (pendiente)
    (CURRENT_DATE + TIME '17:45:00', NULL, 2, 85, NULL),     -- Venta 85 - Tienda física (pendiente)
    (CURRENT_DATE + TIME '18:00:00', NULL, 2, 86, NULL),     -- Venta 86 - Tienda física (pendiente)
    (CURRENT_DATE + TIME '18:15:00', NULL, 2, 87, NULL),     -- Venta 87 - Web (pendiente)
    (CURRENT_DATE + TIME '18:30:00', NULL, 2, 88, NULL),     -- Venta 88 - Tienda física (pendiente)
    (CURRENT_DATE + TIME '18:45:00', NULL, 2, 89, NULL),     -- Venta 89 - Tienda física (pendiente)
    (CURRENT_DATE + TIME '19:00:00', NULL, 2, 90, NULL),     -- Venta 90 - Web (pendiente)

    -- Registros de status Completado (5) para las ventas que ya se completaron
    -- Ventas completadas del último mes
    (CURRENT_DATE - INTERVAL '30 days' + TIME '09:20:00', NULL, 5, 1, NULL),    -- Venta 1 - Completado
    (CURRENT_DATE - INTERVAL '30 days' + TIME '10:35:00', NULL, 5, 2, NULL),    -- Venta 2 - Completado
    (CURRENT_DATE - INTERVAL '30 days' + TIME '14:30:00', NULL, 5, 3, NULL),    -- Venta 3 - Completado
    (CURRENT_DATE - INTERVAL '30 days' + TIME '12:50:00', NULL, 5, 4, NULL),    -- Venta 4 - Completado
    (CURRENT_DATE - INTERVAL '30 days' + TIME '14:25:00', NULL, 5, 5, NULL),    -- Venta 5 - Completado
    (CURRENT_DATE - INTERVAL '29 days' + TIME '12:00:00', NULL, 5, 6, NULL),    -- Venta 6 - Completado
    (CURRENT_DATE - INTERVAL '29 days' + TIME '09:50:00', NULL, 5, 7, NULL),    -- Venta 7 - Completado
    (CURRENT_DATE - INTERVAL '29 days' + TIME '10:20:00', NULL, 5, 8, NULL),    -- Venta 8 - Completado
    (CURRENT_DATE - INTERVAL '29 days' + TIME '15:00:00', NULL, 5, 9, NULL),    -- Venta 9 - Completado
    (CURRENT_DATE - INTERVAL '29 days' + TIME '13:05:00', NULL, 5, 10, NULL),   -- Venta 10 - Completado
    (CURRENT_DATE - INTERVAL '28 days' + TIME '09:05:00', NULL, 5, 11, NULL),   -- Venta 11 - Completado
    (CURRENT_DATE - INTERVAL '28 days' + TIME '13:50:00', NULL, 5, 12, NULL),   -- Venta 12 - Completado
    (CURRENT_DATE - INTERVAL '28 days' + TIME '11:50:00', NULL, 5, 13, NULL),   -- Venta 13 - Completado
    (CURRENT_DATE - INTERVAL '28 days' + TIME '14:35:00', NULL, 5, 14, NULL),   -- Venta 14 - Completado
    (CURRENT_DATE - INTERVAL '28 days' + TIME '18:30:00', NULL, 5, 15, NULL),   -- Venta 15 - Completado
    (CURRENT_DATE - INTERVAL '25 days' + TIME '08:20:00', NULL, 5, 16, NULL),   -- Venta 16 - Completado
    (CURRENT_DATE - INTERVAL '25 days' + TIME '09:35:00', NULL, 5, 17, NULL),   -- Venta 17 - Completado
    (CURRENT_DATE - INTERVAL '25 days' + TIME '13:30:00', NULL, 5, 18, NULL),   -- Venta 18 - Completado
    (CURRENT_DATE - INTERVAL '25 days' + TIME '11:20:00', NULL, 5, 19, NULL),   -- Venta 19 - Completado
    (CURRENT_DATE - INTERVAL '25 days' + TIME '14:05:00', NULL, 5, 20, NULL),   -- Venta 20 - Completado
    (CURRENT_DATE - INTERVAL '20 days' + TIME '13:15:00', NULL, 5, 21, NULL),   -- Venta 21 - Completado
    (CURRENT_DATE - INTERVAL '20 days' + TIME '10:35:00', NULL, 5, 22, NULL),   -- Venta 22 - Completado
    (CURRENT_DATE - INTERVAL '20 days' + TIME '11:05:00', NULL, 5, 23, NULL),   -- Venta 23 - Completado
    (CURRENT_DATE - INTERVAL '20 days' + TIME '15:45:00', NULL, 5, 24, NULL),   -- Venta 24 - Completado
    (CURRENT_DATE - INTERVAL '20 days' + TIME '13:35:00', NULL, 5, 25, NULL),   -- Venta 25 - Completado
    (CURRENT_DATE - INTERVAL '15 days' + TIME '08:05:00', NULL, 5, 26, NULL),   -- Venta 26 - Completado
    (CURRENT_DATE - INTERVAL '15 days' + TIME '12:45:00', NULL, 5, 27, NULL),   -- Venta 27 - Completado
    (CURRENT_DATE - INTERVAL '15 days' + TIME '10:35:00', NULL, 5, 28, NULL),   -- Venta 28 - Completado
    (CURRENT_DATE - INTERVAL '15 days' + TIME '11:50:00', NULL, 5, 29, NULL),   -- Venta 29 - Completado
    (CURRENT_DATE - INTERVAL '15 days' + TIME '17:30:00', NULL, 5, 30, NULL),   -- Venta 30 - Completado
    (CURRENT_DATE - INTERVAL '10 days' + TIME '09:05:00', NULL, 5, 31, NULL),   -- Venta 31 - Completado
    (CURRENT_DATE - INTERVAL '10 days' + TIME '10:20:00', NULL, 5, 32, NULL),   -- Venta 32 - Completado
    (CURRENT_DATE - INTERVAL '10 days' + TIME '15:00:00', NULL, 5, 33, NULL),   -- Venta 33 - Completado
    (CURRENT_DATE - INTERVAL '10 days' + TIME '12:50:00', NULL, 5, 34, NULL),   -- Venta 34 - Completado
    (CURRENT_DATE - INTERVAL '10 days' + TIME '14:05:00', NULL, 5, 35, NULL),   -- Venta 35 - Completado
    (CURRENT_DATE - INTERVAL '7 days' + TIME '12:00:00', NULL, 5, 36, NULL),    -- Venta 36 - Completado
    (CURRENT_DATE - INTERVAL '7 days' + TIME '09:50:00', NULL, 5, 37, NULL),    -- Venta 37 - Completado
    (CURRENT_DATE - INTERVAL '7 days' + TIME '10:05:00', NULL, 5, 38, NULL),    -- Venta 38 - Completado
    (CURRENT_DATE - INTERVAL '7 days' + TIME '14:45:00', NULL, 5, 39, NULL),    -- Venta 39 - Completado
    (CURRENT_DATE - INTERVAL '7 days' + TIME '13:05:00', NULL, 5, 40, NULL),    -- Venta 40 - Completado
    (CURRENT_DATE - INTERVAL '5 days' + TIME '09:05:00', NULL, 5, 41, NULL),    -- Venta 41 - Completado
    (CURRENT_DATE - INTERVAL '5 days' + TIME '14:00:00', NULL, 5, 42, NULL),    -- Venta 42 - Completado
    (CURRENT_DATE - INTERVAL '5 days' + TIME '11:50:00', NULL, 5, 43, NULL),    -- Venta 43 - Completado
    (CURRENT_DATE - INTERVAL '5 days' + TIME '13:05:00', NULL, 5, 44, NULL),    -- Venta 44 - Completado
    (CURRENT_DATE - INTERVAL '5 days' + TIME '18:00:00', NULL, 5, 45, NULL),    -- Venta 45 - Completado
    (CURRENT_DATE - INTERVAL '3 days' + TIME '08:20:00', NULL, 5, 46, NULL),    -- Venta 46 - Completado
    (CURRENT_DATE - INTERVAL '3 days' + TIME '09:35:00', NULL, 5, 47, NULL),    -- Venta 47 - Completado
    (CURRENT_DATE - INTERVAL '3 days' + TIME '13:30:00', NULL, 5, 48, NULL),    -- Venta 48 - Completado
    (CURRENT_DATE - INTERVAL '3 days' + TIME '11:20:00', NULL, 5, 49, NULL),    -- Venta 49 - Completado
    (CURRENT_DATE - INTERVAL '3 days' + TIME '14:05:00', NULL, 5, 50, NULL),    -- Venta 50 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '12:00:00', NULL, 5, 51, NULL),     -- Venta 51 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '09:05:00', NULL, 5, 52, NULL),     -- Venta 52 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '09:50:00', NULL, 5, 53, NULL),     -- Venta 53 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '13:45:00', NULL, 5, 54, NULL),     -- Venta 54 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '11:05:00', NULL, 5, 55, NULL),     -- Venta 55 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '11:35:00', NULL, 5, 56, NULL),     -- Venta 56 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '15:30:00', NULL, 5, 57, NULL),     -- Venta 57 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '13:20:00', NULL, 5, 58, NULL),     -- Venta 58 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '14:05:00', NULL, 5, 59, NULL),     -- Venta 59 - Completado
    (CURRENT_DATE - INTERVAL '1 day' + TIME '18:00:00', NULL, 5, 60, NULL),     -- Venta 60 - Completado
    (CURRENT_DATE + TIME '08:05:00', NULL, 5, 61, NULL),     -- Venta 61 - Completado
    (CURRENT_DATE + TIME '08:35:00', NULL, 5, 62, NULL),     -- Venta 62 - Completado
    (CURRENT_DATE + TIME '12:30:00', NULL, 5, 63, NULL),     -- Venta 63 - Completado
    (CURRENT_DATE + TIME '09:20:00', NULL, 5, 64, NULL),     -- Venta 64 - Completado
    (CURRENT_DATE + TIME '09:50:00', NULL, 5, 65, NULL),     -- Venta 65 - Completado
    (CURRENT_DATE + TIME '13:30:00', NULL, 5, 66, NULL),     -- Venta 66 - Completado
    (CURRENT_DATE + TIME '10:35:00', NULL, 5, 67, NULL),     -- Venta 67 - Completado
    (CURRENT_DATE + TIME '11:05:00', NULL, 5, 68, NULL),     -- Venta 68 - Completado
    (CURRENT_DATE + TIME '14:45:00', NULL, 5, 69, NULL),     -- Venta 69 - Completado
    (CURRENT_DATE + TIME '11:50:00', NULL, 5, 70, NULL),     -- Venta 70 - Completado
    (CURRENT_DATE + TIME '12:05:00', NULL, 5, 71, NULL),     -- Venta 71 - Completado
    (CURRENT_DATE + TIME '16:00:00', NULL, 5, 72, NULL),     -- Venta 72 - Completado
    (CURRENT_DATE + TIME '13:05:00', NULL, 5, 73, NULL),     -- Venta 73 - Completado
    (CURRENT_DATE + TIME '13:35:00', NULL, 5, 74, NULL),     -- Venta 74 - Completado
    (CURRENT_DATE + TIME '17:30:00', NULL, 5, 75, NULL),     -- Venta 75 - Completado
    (CURRENT_DATE + TIME '14:20:00', NULL, 5, 76, NULL),     -- Venta 76 - Completado
    (CURRENT_DATE + TIME '14:50:00', NULL, 5, 77, NULL),     -- Venta 77 - Completado
    (CURRENT_DATE + TIME '18:30:00', NULL, 5, 78, NULL),     -- Venta 78 - Completado
    (CURRENT_DATE + TIME '15:35:00', NULL, 5, 79, NULL),     -- Venta 79 - Completado
    (CURRENT_DATE + TIME '16:05:00', NULL, 5, 80, NULL);     -- Venta 80 - Completado
    -- Las ventas 81-90 aún no tienen registro de completado porque siguen en proceso
