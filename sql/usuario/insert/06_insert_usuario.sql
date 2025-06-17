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
    ('admin123', 1, 1),  -- Admin user
    ('emp123', 2, 2),    -- Employee user
    ('cli123', 3, 3),    -- Client user
    ('mem123', 4, 4),    -- Member user
    
    -- Member company users (all with role 4 - Miembro)
    ('delta2024', 4, 5),     -- Delta Distrib
    ('omega2024', 4, 6),     -- Omega Imports
    ('epsilon2024', 4, 7),   -- Epsilon Trade
    ('beta2024', 4, 8),      -- Beta Stores
    ('gamma2024', 4, 9),     -- Gamma Dist
    ('sigma2024', 4, 10),    -- Sigma Com
    ('theta2024', 4, 11),    -- Theta Imports
    ('lambda2024', 4, 12),   -- Lambda Stores
    ('zeta2024', 4, 13),     -- Zeta Dist
    ('omegacom2024', 4, 14), -- Omega Com

    -- Employee users (all with role 2 - Empleado)
    ('maria2024', 2, 15),    -- María Rodríguez
    ('pedro2024', 2, 16),    -- Pedro García
    ('ana2024', 2, 17),      -- Ana Martínez
    ('carlos2024', 2, 18),   -- Carlos López
    ('laura2024', 2, 19),    -- Laura Sánchez
    ('roberto2024', 2, 20),  -- Roberto Torres
    ('sofia2024', 2, 21),    -- Sofía Díaz
    ('miguel2024', 2, 22),   -- Miguel Morales
    ('carmen2024', 2, 23);   -- Carmen Ortiz 