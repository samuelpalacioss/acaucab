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
    (NULL, 3, 1),     -- Links natural client 1 with user 3 (cli123)
    (NULL, 15, 2),    -- Links natural client 2 with user 15 (maria2024)
    (NULL, 16, 3),    -- Links natural client 3 with user 16 (pedro2024)
    (NULL, 17, 4),    -- Links natural client 4 with user 17 (ana2024)
    (NULL, 18, 5),    -- Links natural client 5 with user 18 (carlos2024)
    (NULL, 19, 6),    -- Links natural client 6 with user 19 (laura2024)
    
    -- Legal clients
    (1, 4, NULL),     -- Links legal client 1 with user 4 (mem123)
    (2, 5, NULL),     -- Links legal client 2 with user 5 (delta2024)
    (3, 6, NULL),     -- Links legal client 3 with user 6 (omega2024)
    (4, 7, NULL),     -- Links legal client 4 with user 7 (epsilon2024)
    (5, 8, NULL),     -- Links legal client 5 with user 8 (beta2024)
    (6, 9, NULL);     -- Links legal client 6 with user 9 (gamma2024)