/**
 * Inserts for correo table
 * Contains example email addresses for members and users
 */

INSERT INTO correo (
    dirección_correo,
    fk_miembro_1,
    fk_miembro_2
) VALUES
    -- Member company emails
    ('contacto@abc.com', 123456789, 'J'),
    ('contacto@xyz.com', 987654321, 'V'),
    ('distribucion@deltadistrib.com', 234567890, 'J'),
    ('importaciones@omegaimports.com', 345678901, 'V'),
    ('comercial@epsilontrade.com', 456789012, 'J'),
    ('ventas@betastores.com', 567890123, 'V'),
    ('distribucion@gammadist.com', 678901234, 'J'),
    ('ventas@sigmacom.com', 789012345, 'V'),
    ('importaciones@thetaimports.com', 890123456, 'J'),
    ('ventas@lambdastores.com', 901234567, 'V'),
    ('distribucion@zetadist.com', 012345678, 'J'),
    ('ventas@omegacom.com', 123456780, 'V'),
    ('omega-importaciones@omegacom.com', 123456780, 'V'),

    -- Additional emails for user (not members)
    ('admin@acaucab.com', NULL, NULL),
    ('empleados@acaucab.com', NULL, NULL),
    ('clientes@acaucab.com', NULL, NULL),
    ('miembros@acaucab.com', NULL, NULL),
    ('maria.rodriguez@acaucab.com', NULL, NULL),
    ('pedro.garcia@acaucab.com', NULL, NULL),
    ('ana.martinez@acaucab.com', NULL, NULL),
    ('carlos.lopez@acaucab.com', NULL, NULL),
    ('laura.sanchez@acaucab.com', NULL, NULL),
    ('roberto.torres@acaucab.com', NULL, NULL),
    ('sofia.diaz@acaucab.com', NULL, NULL),
    ('miguel.morales@acaucab.com', NULL, NULL),
    ('carmen.ortiz@acaucab.com', NULL, NULL);