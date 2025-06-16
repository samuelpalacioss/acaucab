/**
 * Inserts for empleado_usuario table
 * Links employees with their respective users
 */

INSERT INTO empleado_usuario (
    fk_empleado,
    fk_usuario
) VALUES
    (1, 2),     -- Links employee 1 (Juan Pérez) with user 2 (employee user)
    (2, 15),    -- Links employee 2 (María Rodríguez) with user 15
    (3, 16),    -- Links employee 3 (Pedro García) with user 16
    (4, 17),    -- Links employee 4 (Ana Martínez) with user 17
    (5, 18),    -- Links employee 5 (Carlos López) with user 18
    (6, 19),    -- Links employee 6 (Laura Sánchez) with user 19
    (7, 20),    -- Links employee 7 (Roberto Torres) with user 20
    (8, 21),    -- Links employee 8 (Sofía Díaz) with user 21
    (9, 22),    -- Links employee 9 (Miguel Morales) with user 22
    (10, 23);   -- Links employee 10 (Carmen Ortiz) with user 23 