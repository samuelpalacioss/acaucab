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