/**
 * Inserts for miembro_usuario table
 * Links members with their respective users
 */

INSERT INTO miembro_usuario (
    fk_usuario,
    fk_miembro_1,
    fk_miembro_2
) VALUES
    (4, 123456789, 'J'),     -- Links ABC Corp with user 4
    (5, 987654321, 'V'),     -- Links XYZ Inc with user 5
    (6, 234567890, 'J'),     -- Links Delta Distrib with user 6
    (7, 345678901, 'V'),     -- Links Omega Imports with user 7
    (8, 456789012, 'J'),     -- Links Epsilon Trade with user 8
    (9, 567890123, 'V'),     -- Links Beta Stores with user 9
    (10, 678901234, 'J'),    -- Links Gamma Dist with user 10
    (11, 789012345, 'V'),    -- Links Sigma Com with user 11
    (12, 890123456, 'J'),    -- Links Theta Imports with user 12
    (13, 901234567, 'V');    -- Links Lambda Stores with user 13
