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
    fk_cliente_natural
) VALUES
    (212, 5551234, 123456789, 'J', NULL, NULL, NULL),    -- Member phone
    (212, 5555678, NULL, NULL, NULL, 1, NULL),           -- Legal client phone
    (212, 5559012, NULL, NULL, NULL, NULL, 1),           -- Natural client phone
    (212, 5553456, NULL, NULL, 1, NULL, NULL),           -- Employee phone
    
    (412, 1234567, 234567890, 'J', NULL, NULL, NULL),    -- Delta Distrib
    (414, 2345678, 345678901, 'V', NULL, NULL, NULL),    -- Omega Imports
    (424, 3456789, 456789012, 'J', NULL, NULL, NULL),    -- Epsilon Trade
    
    (412, 4567890, NULL, NULL, NULL, 2, NULL),           -- Global Services
    (414, 5678901, NULL, NULL, NULL, 3, NULL),           -- Constructora Delta
    (424, 6789012, NULL, NULL, NULL, 4, NULL),           -- Distribuidora Omega
    
    
    (412, 7890123, NULL, NULL, NULL, NULL, 2),           -- Natural client 2
    (414, 8901234, NULL, NULL, NULL, NULL, 3),           -- Natural client 3
    (424, 9012345, NULL, NULL, NULL, NULL, 4),           -- Natural client 4
 
    (412, 0123456, NULL, NULL, 2, NULL, NULL),           -- Employee 2
    (414, 1234567, NULL, NULL, 3, NULL, NULL),           -- Employee 3
    (424, 2345678, NULL, NULL, 4, NULL, NULL),           -- Employee 4
    (412, 3456789, NULL, NULL, 5, NULL, NULL);           -- Employee 5 