/**
 * Inserts for permiso table
 * Contains basic system permissions
 */

INSERT INTO permiso (nombre, descripción) VALUES
/* Gestion de usuarios */
    ('crear_usuario', 'Permite crear nuevos usuarios en el sistema'),
    ('editar_usuario', 'Permite modificar información de usuarios existentes'),
    ('eliminar_usuario', 'Permite eliminar usuarios del sistema'),
    ('ver_usuarios', 'Permite ver la lista de usuarios'),
    ('gestionar_roles', 'Permite gestionar roles y sus permisos'),
    ('gestionar_miembros', 'Permite gestionar miembros de la organización'),
    ('gestionar_clientes', 'Permite gestionar clientes del sistema'),
    /* Gestion de ventas */
    ('iniciar_venta', 'Permite iniciar una nueva venta física'),
    ('procesar_pago', 'Permite procesar el pago de una venta'),
    ('anular_venta', 'Permite anular una venta en proceso'),
    ('imprimir_factura', 'Permite imprimir la factura de una venta'),
    ('cerrar_caja', 'Permite realizar el cierre de caja diario'),
    ('ver_historial_ventas', 'Permite consultar el historial de ventas realizadas'),
    /* Gestion de compras (Jefe de Compras)*/
    ('aceptar_orden_compra', 'Permite aceptar una orden de compra'),
    ('rechazar_orden_compra', 'Permite rechazar una orden de compra'),
    ('ver_ordenes_compra', 'Permite ver las ordenes de compra'),
    ('gestionar_proveedores', 'Permite gestionar proveedores'),
    ('ver_historial_compras', 'Permite consultar el historial de compras realizadas'),
    ('ver_pedidos', 'Permite ver todos los pedidos'),
    /* Gestion de Pasillos (Jefe de Pasillos)*/
    ('aceptar_orden_reposición', 'Permite aceptar una orden de reposición');
    
