/**
 * Inserts for permiso_rol table
 * Assigns permissions to different roles
 */

-- Administrador gets all permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 1, id FROM permiso;

-- Empleado gets basic permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 2, id FROM permiso 
WHERE nombre IN ('ver_usuarios', 'gestionar_clientes');

-- Cliente gets minimal permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 3, id FROM permiso 
WHERE nombre IN ('ver_usuarios');

-- Miembro gets member-specific permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 4, id FROM permiso 
WHERE nombre IN ('ver_usuarios', 'gestionar_miembros');

-- Jefe de Compras gets purchase management permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 5, id FROM permiso 
WHERE nombre IN (
    'ver_usuarios',
    'aceptar_orden_compra',
    'rechazar_orden_compra',
    'ver_ordenes_compra',
    'gestionar_proveedores',
    'ver_historial_compras'
);

-- Asistente de Compras gets limited purchase permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 6, id FROM permiso 
WHERE nombre IN (
    'ver_usuarios',
    'ver_ordenes_compra',
    'ver_historial_compras'
);

-- Jefe de Pasillos gets aisle management permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 7, id FROM permiso 
WHERE nombre IN (
    'ver_usuarios',
    'aceptar_orden_reposición'
);

-- Cajero gets sales-related permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 8, id FROM permiso 
WHERE nombre IN (
    'ver_usuarios',
    'iniciar_venta',
    'procesar_pago',
    'anular_venta',
    'imprimir_factura',
    'cerrar_caja',
    'ver_historial_ventas'
);

-- Jefe de Logística gets logistics management permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 9, id FROM permiso 
WHERE nombre IN (
    'ver_usuarios',
    'ver_pedidos'
);

-- Auxiliar de Logística gets limited logistics permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 10, id FROM permiso 
WHERE nombre IN (
    'ver_usuarios',
    'ver_pedidos',
    'ver_ordenes_compra'
);

-- Jefe de Marketing gets marketing management permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT 11, id FROM permiso 
WHERE nombre IN (
    'ver_usuarios',
    'gestionar_clientes'
); 