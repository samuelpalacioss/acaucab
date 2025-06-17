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