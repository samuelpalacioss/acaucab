/**
 * Inserts for rol table
 * Contains basic system roles
 */

INSERT INTO rol (nombre) VALUES
    ('Administrador'),
    ('Cliente'),
    ('Miembro'),
    ('Jefe de Compras'),
    ('Asistente de Compras'),
    ('Jefe de Pasillos'),
    ('Cajero'),
    ('Jefe de Recursos Humanos'),
    ('Auxiliar Recursos Humanos'),
    ('Jefe de Marketing');

INSERT INTO permiso (nombre, descripción) VALUES
/* Gestión de afiliacion */
('crear_afiliacion',   'Permite crear nuevas afiliaciones en el sistema'),
('editar_afiliacion',  'Permite modificar afiliaciones existentes'),
('eliminar_afiliacion','Permite eliminar afiliaciones del sistema'),
('leer_afiliacion',    'Permite ver las afiliaciones'),
/* Gestión de almacen */
('crear_almacen',      'Permite crear nuevos almacenes en el sistema'),
('editar_almacen',     'Permite modificar almacenes existentes'),
('eliminar_almacen',   'Permite eliminar almacenes del sistema'),
('leer_almacen',       'Permite ver los almacenes'),
/* Gestión de beneficio */
('crear_beneficio',    'Permite crear nuevos beneficios en el sistema'),
('editar_beneficio',   'Permite modificar beneficios existentes'),
('eliminar_beneficio', 'Permite eliminar beneficios del sistema'),
('leer_beneficio',     'Permite ver los beneficios'),
/* Gestión de beneficio_nomina */
('crear_beneficio_nomina',    'Permite crear relaciones beneficio-nómina'),
('editar_beneficio_nomina',   'Permite modificar relaciones beneficio-nómina'),
('eliminar_beneficio_nomina', 'Permite eliminar relaciones beneficio-nómina'),
('leer_beneficio_nomina',     'Permite ver las relaciones beneficio-nómina'),
/* Gestión de caracteristica */
('crear_caracteristica',   'Permite crear nuevas características'),
('editar_caracteristica',  'Permite modificar características existentes'),
('eliminar_caracteristica','Permite eliminar características'),
('leer_caracteristica',    'Permite ver las características'),
/* Gestión de cargo */
('crear_cargo',    'Permite crear nuevos cargos'),
('editar_cargo',   'Permite modificar cargos existentes'),
('eliminar_cargo', 'Permite eliminar cargos'),
('leer_cargo',     'Permite ver los cargos'),
/* Gestión de cerveza */
('crear_cerveza',    'Permite crear nuevas cervezas'),
('editar_cerveza',   'Permite modificar cervezas existentes'),
('eliminar_cerveza', 'Permite eliminar cervezas'),
('leer_cerveza',     'Permite ver las cervezas'),
/* Gestión de cerveza_caracteristica */
('crear_cerveza_caracteristica',    'Permite crear vínculos cerveza-característica'),
('editar_cerveza_caracteristica',   'Permite modificar vínculos cerveza-característica'),
('eliminar_cerveza_caracteristica', 'Permite eliminar vínculos cerveza-característica'),
('leer_cerveza_caracteristica',     'Permite ver los vínculos cerveza-característica'),
/* Gestión de cliente_juridico */
('crear_cliente_juridico',    'Permite crear clientes jurídicos'),
('editar_cliente_juridico',   'Permite modificar clientes jurídicos'),
('eliminar_cliente_juridico', 'Permite eliminar clientes jurídicos'),
('leer_cliente_juridico',     'Permite ver los clientes jurídicos'),
/* Gestión de cliente_metodo_pago */
('crear_cliente_metodo_pago',    'Permite registrar métodos de pago de clientes'),
('editar_cliente_metodo_pago',   'Permite modificar métodos de pago de clientes'),
('eliminar_cliente_metodo_pago', 'Permite eliminar métodos de pago de clientes'),
('leer_cliente_metodo_pago',     'Permite ver los métodos de pago de clientes'),
/* Gestión de cliente_natural */
('crear_cliente_natural',    'Permite crear clientes naturales'),
('editar_cliente_natural',   'Permite modificar clientes naturales'),
('eliminar_cliente_natural', 'Permite eliminar clientes naturales'),
('leer_cliente_natural',     'Permite ver los clientes naturales'),
/* Gestión de cliente_usuario */
('crear_cliente_usuario',    'Permite asociar clientes a usuarios'),
('editar_cliente_usuario',   'Permite modificar asociaciones cliente-usuario'),
('eliminar_cliente_usuario', 'Permite eliminar asociaciones cliente-usuario'),
('leer_cliente_usuario',     'Permite ver las asociaciones cliente-usuario'),
/* Gestión de color */
('crear_color',    'Permite crear colores'),
('editar_color',   'Permite modificar colores'),
('eliminar_color', 'Permite eliminar colores'),
('leer_color',     'Permite ver los colores'),
/* Gestión de correo */
('crear_correo',    'Permite registrar correos electrónicos'),
('editar_correo',   'Permite modificar correos electrónicos'),
('eliminar_correo', 'Permite eliminar correos electrónicos'),
('leer_correo',     'Permite ver los correos electrónicos'),
/* Gestión de departamento */
('crear_departamento',    'Permite crear departamentos'),
('editar_departamento',   'Permite modificar departamentos'),
('eliminar_departamento', 'Permite eliminar departamentos'),
('leer_departamento',     'Permite ver los departamentos'),
/* Gestión de descuento */
('crear_descuento',    'Permite crear descuentos de presentación'),
('editar_descuento',   'Permite modificar descuentos de presentación'),
('eliminar_descuento', 'Permite eliminar descuentos de presentación'),
('leer_descuento',     'Permite ver los descuentos de presentación'),
/* Gestión de detalle_evento */
('crear_detalle_evento',    'Permite registrar detalles de venta en eventos'),
('editar_detalle_evento',   'Permite modificar detalles de venta en eventos'),
('eliminar_detalle_evento', 'Permite eliminar detalles de venta en eventos'),
('leer_detalle_evento',     'Permite ver los detalles de venta en eventos'),
/* Gestión de detalle_presentacion */
('crear_detalle_presentacion',    'Permite registrar detalles de venta de presentaciones'),
('editar_detalle_presentacion',   'Permite modificar detalles de venta de presentaciones'),
('eliminar_detalle_presentacion', 'Permite eliminar detalles de venta de presentaciones'),
('leer_detalle_presentacion',     'Permite ver los detalles de venta de presentaciones'),
/* Gestión de empleado */
('crear_empleado',    'Permite crear empleados'),
('editar_empleado',   'Permite modificar empleados'),
('eliminar_empleado', 'Permite eliminar empleados'),
('leer_empleado',     'Permite ver los empleados'),
/* Gestión de empleado_usuario */
('crear_empleado_usuario',    'Permite vincular empleados a usuarios'),
('editar_empleado_usuario',   'Permite modificar vínculos empleado-usuario'),
('eliminar_empleado_usuario', 'Permite eliminar vínculos empleado-usuario'),
('leer_empleado_usuario',     'Permite ver los vínculos empleado-usuario'),
/* Gestión de evento */
('crear_evento',    'Permite crear eventos'),
('editar_evento',   'Permite modificar eventos'),
('eliminar_evento', 'Permite eliminar eventos'),
('leer_evento',     'Permite ver los eventos'),
/* Gestión de evento_cliente */
('crear_evento_cliente',    'Permite asociar clientes a eventos'),
('editar_evento_cliente',   'Permite modificar asociaciones evento-cliente'),
('eliminar_evento_cliente', 'Permite eliminar asociaciones evento-cliente'),
('leer_evento_cliente',     'Permite ver las asociaciones evento-cliente'),
/* Gestión de horario */
('crear_horario',    'Permite crear horarios'),
('editar_horario',   'Permite modificar horarios'),
('eliminar_horario', 'Permite eliminar horarios'),
('leer_horario',     'Permite ver los horarios'),
/* Gestión de horario_nomina */
('crear_horario_nomina',    'Permite vincular horarios a nómina'),
('editar_horario_nomina',   'Permite modificar vínculos horario-nómina'),
('eliminar_horario_nomina', 'Permite eliminar vínculos horario-nómina'),
('leer_horario_nomina',     'Permite ver los vínculos horario-nómina'),
/* Gestión de ingrediente */
('crear_ingrediente',    'Permite crear ingredientes'),
('editar_ingrediente',   'Permite modificar ingredientes'),
('eliminar_ingrediente', 'Permite eliminar ingredientes'),
('leer_ingrediente',     'Permite ver los ingredientes'),
/* Gestión de inventario */
('crear_inventario',    'Permite crear registros de inventario'),
('editar_inventario',   'Permite modificar registros de inventario'),
('eliminar_inventario', 'Permite eliminar registros de inventario'),
('leer_inventario',     'Permite ver el inventario'),
/* Gestión de invitado */
('crear_invitado',    'Permite crear invitados'),
('editar_invitado',   'Permite modificar invitados'),
('eliminar_invitado', 'Permite eliminar invitados'),
('leer_invitado',     'Permite ver los invitados'),
/* Gestión de invitado_evento */
('crear_invitado_evento',    'Permite registrar asistencia de invitados a eventos'),
('editar_invitado_evento',   'Permite modificar asistencia de invitados a eventos'),
('eliminar_invitado_evento', 'Permite eliminar asistencia de invitados a eventos'),
('leer_invitado_evento',     'Permite ver la asistencia de invitados a eventos'),
/* Gestión de lugar */
('crear_lugar',    'Permite crear lugares'),
('editar_lugar',   'Permite modificar lugares'),
('eliminar_lugar', 'Permite eliminar lugares'),
('leer_lugar',     'Permite ver los lugares'),
/* Gestión de lugar_tienda */
('crear_lugar_tienda',    'Permite crear zonas internas de tienda'),
('editar_lugar_tienda',   'Permite modificar zonas internas de tienda'),
('eliminar_lugar_tienda', 'Permite eliminar zonas internas de tienda'),
('leer_lugar_tienda',     'Permite ver las zonas internas de tienda'),
/* Gestión de lugar_tienda_inventario */
('crear_lugar_tienda_inventario',    'Permite asignar inventario a zonas de tienda'),
('editar_lugar_tienda_inventario',   'Permite modificar asignaciones de inventario en tienda'),
('eliminar_lugar_tienda_inventario', 'Permite eliminar asignaciones de inventario en tienda'),
('leer_lugar_tienda_inventario',     'Permite ver las asignaciones de inventario en tienda'),
/* Gestión de mensualidad */
('crear_mensualidad',    'Permite crear mensualidades'),
('editar_mensualidad',   'Permite modificar mensualidades'),
('eliminar_mensualidad', 'Permite eliminar mensualidades'),
('leer_mensualidad',     'Permite ver las mensualidades'),
/* Gestión de metodo_pago */
('crear_metodo_pago',    'Permite crear métodos de pago'),
('editar_metodo_pago',   'Permite modificar métodos de pago'),
('eliminar_metodo_pago', 'Permite eliminar métodos de pago'),
('leer_metodo_pago',     'Permite ver los métodos de pago'),
/* Gestión de miembro */
('crear_miembro',    'Permite crear miembros/proveedores'),
('editar_miembro',   'Permite modificar miembros/proveedores'),
('eliminar_miembro', 'Permite eliminar miembros/proveedores'),
('leer_miembro',     'Permite ver los miembros/proveedores'),
/* Gestión de miembro_metodo_pago */
('crear_miembro_metodo_pago',    'Permite asignar métodos de pago a miembros'),
('editar_miembro_metodo_pago',   'Permite modificar métodos de pago de miembros'),
('eliminar_miembro_metodo_pago', 'Permite eliminar métodos de pago de miembros'),
('leer_miembro_metodo_pago',     'Permite ver los métodos de pago de miembros'),
/* Gestión de miembro_presentacion_cerveza */
('crear_miembro_presentacion_cerveza',    'Permite asociar presentaciones a miembros'),
('editar_miembro_presentacion_cerveza',   'Permite modificar asociaciones presentaciones-miembros'),
('eliminar_miembro_presentacion_cerveza', 'Permite eliminar asociaciones presentaciones-miembros'),
('leer_miembro_presentacion_cerveza',     'Permite ver las asociaciones presentaciones-miembros'),
/* Gestión de miembro_usuario */
('crear_miembro_usuario',    'Permite vincular miembros a usuarios'),
('editar_miembro_usuario',   'Permite modificar vínculos miembro-usuario'),
('eliminar_miembro_usuario', 'Permite eliminar vínculos miembro-usuario'),
('leer_miembro_usuario',     'Permite ver los vínculos miembro-usuario'),
/* Gestión de nomina */
('crear_nomina',    'Permite crear nóminas'),
('editar_nomina',   'Permite modificar nóminas'),
('eliminar_nomina', 'Permite eliminar nóminas'),
('leer_nomina',     'Permite ver las nóminas'),
/* Gestión de orden_de_compra */
('crear_orden_de_compra',    'Permite crear órdenes de compra'),
('editar_orden_de_compra',   'Permite modificar órdenes de compra'),
('eliminar_orden_de_compra', 'Permite eliminar órdenes de compra'),
('leer_orden_de_compra',     'Permite ver las órdenes de compra'),
/* Gestión de orden_de_compra_proveedor */
('leer_orden_de_compra_proveedor',     'Permite ver las órdenes de compra de proveedores'),
('editar_orden_de_compra_proveedor',   'Permite modificar las órdenes de compra de proveedores'),
/* Gestión de orden_de_reposicion */
('crear_orden_de_reposicion',    'Permite crear órdenes de reposición'),
('editar_orden_de_reposicion',   'Permite modificar órdenes de reposición'),
('eliminar_orden_de_reposicion', 'Permite eliminar órdenes de reposición'),
('leer_orden_de_reposicion',     'Permite ver las órdenes de reposición'),
/* Gestión de pago */
('crear_pago',    'Permite registrar pagos'),
('editar_pago',   'Permite modificar pagos'),
('eliminar_pago', 'Permite eliminar pagos'),
('leer_pago',     'Permite ver los pagos'),
/* Gestión de periodo_descuento */
('crear_periodo_descuento',    'Permite crear periodos de descuento'),
('editar_periodo_descuento',   'Permite modificar periodos de descuento'),
('eliminar_periodo_descuento', 'Permite eliminar periodos de descuento'),
('leer_periodo_descuento',     'Permite ver los periodos de descuento'),
/* Gestión de permiso */
('crear_permiso',    'Permite crear permisos'),
('editar_permiso',   'Permite modificar permisos'),
('eliminar_permiso', 'Permite eliminar permisos'),
('leer_permiso',     'Permite ver los permisos'),
/* Gestión de permiso_rol */
('crear_permiso_rol',    'Permite asignar permisos a roles'),
('editar_permiso_rol',   'Permite modificar permisos de roles'),
('eliminar_permiso_rol', 'Permite eliminar permisos de roles'),
('leer_permiso_rol',     'Permite ver los permisos asignados a roles'),
/* Gestión de persona_contacto */
('crear_persona_contacto',    'Permite crear personas contacto'),
('editar_persona_contacto',   'Permite modificar personas contacto'),
('eliminar_persona_contacto', 'Permite eliminar personas contacto'),
('leer_persona_contacto',     'Permite ver las personas contacto'),
/* Gestión de presentacion */
('crear_presentacion',    'Permite crear presentaciones de producto'),
('editar_presentacion',   'Permite modificar presentaciones de producto'),
('eliminar_presentacion', 'Permite eliminar presentaciones de producto'),
('leer_presentacion',     'Permite ver las presentaciones de producto'),
/* Gestión de presentacion_cerveza */
('crear_presentacion_cerveza',    'Permite vincular cervezas a presentaciones'),
('editar_presentacion_cerveza',   'Permite modificar vínculos cerveza-presentación'),
('eliminar_presentacion_cerveza', 'Permite eliminar vínculos cerveza-presentación'),
('leer_presentacion_cerveza',     'Permite ver los vínculos cerveza-presentación'),
/* Gestión de registro_biometrico */
('crear_registro_biometrico',    'Permite crear registros biométricos'),
('editar_registro_biometrico',   'Permite modificar registros biométricos'),
('eliminar_registro_biometrico', 'Permite eliminar registros biométricos'),
('leer_registro_biometrico',     'Permite ver los registros biométricos'),
/* Gestión de rol */
('crear_rol',    'Permite crear roles'),
('editar_rol',   'Permite modificar roles'),
('eliminar_rol', 'Permite eliminar roles'),
('leer_rol',     'Permite ver los roles'),
/* Gestión de status */
('crear_status',    'Permite crear estados'),
('editar_status',   'Permite modificar estados'),
('eliminar_status', 'Permite eliminar estados'),
('leer_status',     'Permite ver los estados'),
/* Gestión de status_mensualidad */
('crear_status_mensualidad',    'Permite crear estados de mensualidad'),
('editar_status_mensualidad',   'Permite modificar estados de mensualidad'),
('eliminar_status_mensualidad', 'Permite eliminar estados de mensualidad'),
('leer_status_mensualidad',     'Permite ver los estados de mensualidad'),
/* Gestión de status_orden */
('crear_status_orden',    'Permite crear estados de orden'),
('editar_status_orden',   'Permite modificar estados de orden'),
('eliminar_status_orden', 'Permite eliminar estados de orden'),
('leer_status_orden',     'Permite ver los estados de orden'),
/* Gestión de status_venta */
('crear_status_venta',    'Permite crear estados de venta'),
('editar_status_venta',   'Permite modificar estados de venta'),
('eliminar_status_venta', 'Permite eliminar estados de venta'),
('leer_status_venta',     'Permite ver los estados de venta'),
/* Gestión de stock_miembro */
('crear_stock_miembro',    'Permite registrar stock de miembros'),
('editar_stock_miembro',   'Permite modificar stock de miembros'),
('eliminar_stock_miembro', 'Permite eliminar stock de miembros'),
('leer_stock_miembro',     'Permite ver el stock de miembros'),
/* Gestión de tasa */
('crear_tasa',    'Permite crear tasas de cambio'),
('editar_tasa',   'Permite modificar tasas de cambio'),
('eliminar_tasa', 'Permite eliminar tasas de cambio'),
('leer_tasa',     'Permite ver las tasas de cambio'),
/* Gestión de telefono */
('crear_telefono',    'Permite registrar teléfonos'),
('editar_telefono',   'Permite modificar teléfonos'),
('eliminar_telefono', 'Permite eliminar teléfonos'),
('leer_telefono',     'Permite ver los teléfonos'),
/* Gestión de tienda_fisica */
('crear_tienda_fisica',    'Permite crear tiendas físicas'),
('editar_tienda_fisica',   'Permite modificar tiendas físicas'),
('eliminar_tienda_fisica', 'Permite eliminar tiendas físicas'),
('leer_tienda_fisica',     'Permite ver las tiendas físicas'),
/* Gestión de tienda_web */
('crear_tienda_web',    'Permite crear tiendas web'),
('editar_tienda_web',   'Permite modificar tiendas web'),
('eliminar_tienda_web', 'Permite eliminar tiendas web'),
('leer_tienda_web',     'Permite ver las tiendas web'),
/* Gestión de tipo_cerveza */
('crear_tipo_cerveza',    'Permite crear tipos de cerveza'),
('editar_tipo_cerveza',   'Permite modificar tipos de cerveza'),
('eliminar_tipo_cerveza', 'Permite eliminar tipos de cerveza'),
('leer_tipo_cerveza',     'Permite ver los tipos de cerveza'),
/* Gestión de tipo_cerveza_ingrediente */
('crear_tipo_cerveza_ingrediente',    'Permite asociar ingredientes a tipos de cerveza'),
('editar_tipo_cerveza_ingrediente',   'Permite modificar asociaciones tipo-cerveza-ingrediente'),
('eliminar_tipo_cerveza_ingrediente', 'Permite eliminar asociaciones tipo-cerveza-ingrediente'),
('leer_tipo_cerveza_ingrediente',     'Permite ver las asociaciones tipo-cerveza-ingrediente'),
/* Gestión de tipo_evento */
('crear_tipo_evento',    'Permite crear tipos de evento'),
('editar_tipo_evento',   'Permite modificar tipos de evento'),
('eliminar_tipo_evento', 'Permite eliminar tipos de evento'),
('leer_tipo_evento',     'Permite ver los tipos de evento'),
/* Gestión de tipo_invitado */
('crear_tipo_invitado',    'Permite crear tipos de invitado'),
('editar_tipo_invitado',   'Permite modificar tipos de invitado'),
('eliminar_tipo_invitado', 'Permite eliminar tipos de invitado'),
('leer_tipo_invitado',     'Permite ver los tipos de invitado'),
/* Gestión de usuario */
('crear_usuario',    'Permite crear usuarios'),
('editar_usuario',   'Permite modificar usuarios'),
('eliminar_usuario', 'Permite eliminar usuarios'),
('leer_usuario',     'Permite ver los usuarios'),
/* Gestión de vacacion */
('crear_vacacion',    'Permite registrar vacaciones'),
('editar_vacacion',   'Permite modificar vacaciones'),
('eliminar_vacacion', 'Permite eliminar vacaciones'),
('leer_vacacion',     'Permite ver las vacaciones'),
/* Gestión de venta */
('crear_venta',    'Permite crear ventas'),
('editar_venta',   'Permite modificar ventas'),
('eliminar_venta', 'Permite eliminar ventas'),
('leer_venta',     'Permite ver las ventas'),
/* Gestión de venta_evento */
('crear_venta_evento',    'Permite crear ventas en eventos'),
('editar_venta_evento',   'Permite modificar ventas en eventos'),
('eliminar_venta_evento', 'Permite eliminar ventas en eventos'),
('leer_venta_evento',     'Permite ver las ventas en eventos');

    
-- Administrador gets all permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Administrador'), p.id 
FROM permiso p;


-- Cliente gets minimal permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Cliente'), p.id 
FROM permiso p
WHERE p.nombre IN ('crear_venta', 'crear_venta_evento', 'leer_presentacion_cerveza');

-- Miembro gets member-specific permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Miembro'), p.id 
FROM permiso p
WHERE p.nombre IN ('leer_orden_de_compra_proveedor', 'editar_orden_de_compra_proveedor');

-- Jefe de Compras gets purchase management permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Jefe de Compras'), p.id 
FROM permiso p
WHERE p.nombre IN (
    'leer_orden_de_compra',
    'editar_orden_de_compra',
    'crear_orden_de_compra',
    'eliminar_orden_de_compra',
    'leer_inventario',
    'editar_inventario',
    'crear_inventario',
    'eliminar_inventario'
);

-- Asistente de Compras gets limited purchase permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Asistente de Compras'), p.id 
FROM permiso p
WHERE p.nombre IN (
    'leer_orden_de_compra',
    'editar_orden_de_compra'
    'leer_inventario',
    'editar_inventario'
);

-- Jefe de Pasillos gets aisle management permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Jefe de Pasillos'), p.id 
FROM permiso p
WHERE p.nombre IN (
    'leer_orden_de_reposicion',
    'editar_orden_de_reposicion'
    'crear_orden_de_reposicion'
    'eliminar_orden_de_reposicion',
    'leer_lugar_tienda_inventario',
    'editar_lugar_tienda_inventario',
    'crear_lugar_tienda_inventario',
    'eliminar_lugar_tienda_inventario',
    'leer_inventario',
    'editar_inventario',
    'crear_inventario',
    'eliminar_inventario'
);

-- Cajero gets sales-related permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Cajero'), p.id 
FROM permiso p
WHERE p.nombre IN (
    'crear_venta', 'crear_venta_evento', 'leer_presentacion_cerveza', 'leer_inventario', 'leer_lugar_tienda_inventario'
);

-- Jefe de Recursos Humanos gets HR management permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Jefe de Recursos Humanos'), p.id 
FROM permiso p
WHERE p.nombre IN (
    'crear_empleado',
    'editar_empleado',
    'eliminar_empleado',
    'leer_empleado',
    'crear_nomina',
    'editar_nomina',
    'eliminar_nomina',
    'leer_nomina',
    'crear_cargo',
    'editar_cargo',
    'eliminar_cargo',
    'leer_cargo',
    'crear_departamento',
    'editar_departamento',
    'eliminar_departamento',
    'leer_departamento',
    'crear_beneficio',
    'editar_beneficio',
    'eliminar_beneficio',
    'leer_beneficio',
    'crear_vacacion',
    'editar_vacacion',
    'eliminar_vacacion',
    'leer_vacacion',
    'leer_usuario'
);

-- Auxiliar de Recursos Humanos gets limited HR permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Auxiliar Recursos Humanos'), p.id 
FROM permiso p
WHERE p.nombre IN (
    'leer_empleado',
    'leer_nomina',
    'leer_cargo',
    'leer_departamento',
    'leer_beneficio',
    'leer_vacacion',
    'crear_registro_biometrico',
    'editar_registro_biometrico',
    'leer_registro_biometrico',
    'leer_usuario'
);

-- Jefe de Marketing gets marketing management permissions
INSERT INTO permiso_rol (fk_rol, fk_permiso)
SELECT (SELECT id FROM rol WHERE nombre = 'Jefe de Marketing'), p.id 
FROM permiso p
WHERE p.nombre IN (
    'crear_evento',
    'editar_evento',
    'eliminar_evento',
    'leer_evento',
    'crear_cliente_natural',
    'editar_cliente_natural',
    'leer_cliente_natural',
    'crear_cliente_juridico',
    'editar_cliente_juridico',
    'leer_cliente_juridico',
    'leer_venta',
    'leer_usuario',
    'crear_descuento',
    'editar_descuento',
    'eliminar_descuento',
    'leer_descuento'
); 

/**
 * Inserts for miembro table
 * Contains example members of the organization
 */

INSERT INTO miembro (
    rif, 
    naturaleza_rif, 
    razón_social, 
    denominación_comercial, 
    dirección_fiscal, 
    dirección_física, 
    dominio_web, 
    plazo_entrega, 
    fk_lugar_1, 
    fk_lugar_2
) VALUES
    (123456789, 'J', 'Empresa ABC C.A.', 'ABC Corp', 'Av. Principal #123', 'Av. Principal #123', 'abc.com', INTERVAL '24 hours', 361, 362),
    (987654321, 'V', 'Empresa XYZ S.A.', 'XYZ Inc', 'Calle Comercial #456', 'Calle Comercial #456', 'xyz.com', INTERVAL '2 days', 363, 364),
    (234567890, 'J', 'Distribuidora Comercial Delta C.A.', 'Delta Distrib', 'Av. Bolívar Norte #789', 'Av. Bolívar Norte #789', 'deltadistrib.com', INTERVAL '12 hours', 365, 366),
    (345678901, 'V', 'Importadora Omega S.A.', 'Omega Imports', 'Calle Los Mangos #234', 'Calle Los Mangos #234', 'omegaimports.com', INTERVAL '3 days', 367, 368),
    (456789012, 'J', 'Comercializadora Epsilon C.A.', 'Epsilon Trade', 'Av. Libertador #567', 'Av. Libertador #567', 'epsilontrade.com', INTERVAL '48 hours', 369, 370),
    (567890123, 'V', 'Almacenes Beta S.A.', 'Beta Stores', 'Calle Principal #890', 'Calle Principal #890', 'betastores.com', INTERVAL '1 day', 371, 372),
    (678901234, 'J', 'Distribuidora Gamma C.A.', 'Gamma Dist', 'Av. Universidad #345', 'Av. Universidad #345', 'gammadist.com', INTERVAL '36 hours', 373, 374),
    (789012345, 'V', 'Comercializadora Sigma S.A.', 'Sigma Com', 'Calle Bolívar #678', 'Calle Bolívar #678', 'sigmacom.com', INTERVAL '1 week', 375, 376),
    (890123456, 'J', 'Importadora Theta C.A.', 'Theta Imports', 'Av. Carabobo #901', 'Av. Carabobo #901', 'thetaimports.com', INTERVAL '18 hours', 377, 378),
    (901234567, 'V', 'Almacenes Lambda S.A.', 'Lambda Stores', 'Calle Miranda #234', 'Calle Miranda #234', 'lambdastores.com', INTERVAL '5 days', 379, 380),
    (12345678, 'J', 'Distribuidora Zeta C.A.', 'Zeta Dist', 'Av. Sucre #567', 'Av. Sucre #567', 'zetadist.com', INTERVAL '2 weeks', 381, 382),
    (123456780, 'V', 'Comercializadora Omega S.A.', 'Omega Com', 'Calle Principal #890', 'Calle Principal #890', 'omegacom.com', INTERVAL '72 hours', 383, 384),
    /** Nuevos registros agregados */
    (111222333, 'J', 'Corporación Alfa Industrial C.A.', 'Alfa Industrial', 'Av. 23 de Enero #100', 'Av. 23 de Enero #100', 'alfaindustrial.com', INTERVAL '6 hours', 385, 386),
    (444555666, 'V', 'Comercial Bravo S.A.', 'Bravo Comercial', 'Calle Altagracia #200', 'Calle Altagracia #200', 'bravocomercial.com', INTERVAL '4 days', 387, 388),
    (777888999, 'J', 'Distribuidora Charlie C.A.', 'Charlie Dist', 'Av. Antímano #300', 'Av. Antímano #300', 'charliedist.com', INTERVAL '30 hours', 389, 390),
    (111333555, 'V', 'Importadora Delta S.A.', 'Delta Imports', 'Calle Caricuao #400', 'Calle Caricuao #400', 'deltaimports.com', INTERVAL '10 days', 391, 392),
    (222444666, 'J', 'Almacenes Echo C.A.', 'Echo Stores', 'Av. Catedral #500', 'Av. Catedral #500', 'echostores.com', INTERVAL '8 hours', 393, 394),
    (333555777, 'V', 'Comercializadora Foxtrot S.A.', 'Foxtrot Trade', 'Calle Coche #600', 'Calle Coche #600', 'foxtrrottrade.com', INTERVAL '3 weeks', 395, 396),
    (444666888, 'J', 'Distribuidora Golf C.A.', 'Golf Dist', 'Av. El Junquito #700', 'Av. El Junquito #700', 'golfdist.com', INTERVAL '7 days', 397, 398),
    (555777999, 'V', 'Importadora Hotel S.A.', 'Hotel Imports', 'Calle El Paraíso #800', 'Calle El Paraíso #800', 'hotelimports.com', INTERVAL '15 hours', 399, 400),
    (666888000, 'J', 'Corporación India C.A.', 'India Corp', 'Av. El Recreo #900', 'Av. El Recreo #900', 'indiacorp.com', INTERVAL '6 days', 401, 402); 

/**
 * Inserts for cliente_natural table
 * Contains example natural clients (persons)
 */

INSERT INTO cliente_natural (
    ci,
    nacionalidad,
    primer_nombre,
    primer_apellido,
    segundo_nombre,
    segundo_apellido,
    rif,
    naturaleza_rif,
    dirección,
    fk_lugar
) VALUES
    (12345678, 'V', 'Juan', 'Pérez', 'Carlos', 'González', 87654321, 'V', 'Av. Principal #789', 361),
    (87654321, 'E', 'María', 'Rodríguez', 'Ana', 'Martínez', 12345678, 'V', 'Calle Secundaria #321', 362),
    (23456789, 'V', 'José', 'García', 'Luis', 'Hernández', 98765432, 'V', 'Av. Bolívar #456', 363),
    (34567890, 'V', 'Ana', 'López', 'María', 'Sánchez', 23456789, 'V', 'Calle Miranda #789', 364),
    (45678901, 'E', 'Carlos', 'Martínez', 'José', 'Torres', 34567890, 'V', 'Av. Sucre #123', 365),
    (56789012, 'V', 'Valeria', 'González', 'Isabel', 'Ramírez', 45678901, 'V', 'Calle Principal #567', 366),
    (67890123, 'V', 'Pedro', 'Sánchez', 'Antonio', 'Díaz', 56789012, 'V', 'Av. Carabobo #890', 367),
    (78901234, 'E', 'Sophia', 'Torres', 'Isabella', 'Morales', 67890123, 'V', 'Calle Bolívar #234', 368),
    (89012345, 'V', 'Miguel', 'Ramírez', 'Francisco', 'Rojas', 78901234, 'V', 'Av. Universidad #567', 369),
    (90123456, 'V', 'Carmen', 'Díaz', 'Rosa', 'Vargas', 89012345, 'V', 'Calle Los Mangos #890', 370),
    (01234567, 'V', 'Francisco', 'Morales', 'Miguel', 'Castro', 90123456, 'V', 'Av. Libertador #123', 371),
    (12345670, 'E', 'Lorella', 'Stortti', 'Valentina', 'Rojas', 01234567, 'V', 'Calle Principal #456', 372),
    /** Nuevos registros agregados */
    (11223344, 'V', 'Roberto', 'Silva', 'Antonio', 'Mendoza', 11223344, 'V', 'Av. 23 de Enero #100', 373),
    (22334455, 'E', 'Isabella', 'Fernández', 'Sofía', 'Herrera', 22334455, 'V', 'Calle Altagracia #200', 374),
    (33445566, 'V', 'Diego', 'Méndez', 'Alejandro', 'Jiménez', 33445566, 'V', 'Av. Antímano #300', 375),
    (44556677, 'V', 'Camila', 'Ruiz', 'Andrea', 'Vásquez', 44556677, 'V', 'Calle Caricuao #400', 376),
    (55667788, 'E', 'Andrés', 'Guerrero', 'Manuel', 'Ramos', 55667788, 'V', 'Av. Catedral #500', 377),
    (66778899, 'V', 'Valentina', 'Ortega', 'Natalia', 'Aguilar', 66778899, 'V', 'Calle Coche #600', 378),
    (77889900, 'V', 'Sebastián', 'Navarro', 'Joaquín', 'Molina', 77889900, 'V', 'Av. El Junquito #700', 379),
    (88990011, 'E', 'Mariana', 'Campos', 'Alejandra', 'Rivera', 88990011, 'V', 'Calle El Paraíso #800', 380),
    (99001122, 'V', 'Daniel', 'Peña', 'Emilio', 'Cruz', 99001122, 'V', 'Av. El Recreo #900', 381); 

/**
 * Inserts for cliente_juridico table
 * Contains example legal clients (companies)
 */

INSERT INTO cliente_juridico (
    denominación_comercial,
    razón_social,
    capital_disponible,
    dirección_fiscal,
    dominio_web,
    rif,
    naturaleza_rif,
    dirección,
    fk_lugar_1,
    fk_lugar_2
) VALUES
    ('Tech Solutions', 'Tech Solutions C.A.', 1000000.00, 'Av. Tecnológica #123', 'techsolutions.com', 234567890, 'J', 'Av. Tecnológica #123', 382, 383),
    ('Global Services', 'Global Services S.A.', 2000000.00, 'Calle Global #456', 'globalservices.com', 345678901, 'J', 'Calle Global #456', 384, 385),
    ('Constructora Delta', 'Constructora Delta C.A.', 5000000.00, 'Av. Principal #789', 'constructoradelta.com', 456789012, 'J', 'Av. Principal #789', 386, 387),
    ('Distribuidora Omega', 'Distribuidora Omega S.A.', 3000000.00, 'Calle Comercial #234', 'distribuidoraomega.com', 567890123, 'J', 'Calle Comercial #234', 388, 389),
    ('Importadora Epsilon', 'Importadora Epsilon C.A.', 4000000.00, 'Av. Bolívar #567', 'importadoraepsilon.com', 678901234, 'J', 'Av. Bolívar #567', 390, 391),
    ('Almacenes Beta', 'Almacenes Beta S.A.', 2500000.00, 'Calle Miranda #890', 'almacenesbeta.com', 789012345, 'J', 'Calle Miranda #890', 392, 393),
    ('Comercializadora Gamma', 'Comercializadora Gamma C.A.', 3500000.00, 'Av. Sucre #123', 'comercializadoragamma.com', 890123456, 'J', 'Av. Sucre #123', 394, 395),
    ('Distribuidora Sigma', 'Distribuidora Sigma S.A.', 2800000.00, 'Calle Principal #456', 'distribuidorasigma.com', 901234567, 'J', 'Calle Principal #456', 396, 397),
    ('Importadora Theta', 'Importadora Theta C.A.', 4500000.00, 'Av. Carabobo #789', 'importadoratheta.com', 012345678, 'J', 'Av. Carabobo #789', 398, 399),
    ('Almacenes Lambda', 'Almacenes Lambda S.A.', 2200000.00, 'Calle Bolívar #012', 'almaceneslambda.com', 123456780, 'J', 'Calle Bolívar #012', 400, 401),
    ('Comercializadora Zeta', 'Comercializadora Zeta C.A.', 3200000.00, 'Av. Universidad #345', 'comercializadorazeta.com', 234567801, 'J', 'Av. Universidad #345', 402, 403),
    ('Distribuidora Omega Plus', 'Distribuidora Omega Plus S.A.', 3800000.00, 'Calle Los Mangos #678', 'omegaplus.com', 345678012, 'J', 'Calle Los Mangos #678', 404, 405),
    /** Nuevos registros agregados */
    ('Corporación Alpha', 'Corporación Alpha C.A.', 6000000.00, 'Av. Empresarial #100', 'corpralpha.com', 111222333, 'J', 'Av. Empresarial #100', 406, 407),
    ('Servicios Bravo', 'Servicios Bravo S.A.', 1800000.00, 'Calle Servicios #200', 'serviciosbravo.com', 222333444, 'J', 'Calle Servicios #200', 408, 409),
    ('Constructora Charlie', 'Constructora Charlie C.A.', 7500000.00, 'Av. Construcción #300', 'constructoracharlie.com', 333444555, 'J', 'Av. Construcción #300', 410, 411),
    ('Logística Delta', 'Logística Delta S.A.', 2700000.00, 'Calle Logística #400', 'logisticadelta.com', 444555666, 'J', 'Calle Logística #400', 412, 413),
    ('Importadora Echo', 'Importadora Echo C.A.', 4200000.00, 'Av. Importación #500', 'importadoraecho.com', 555666777, 'J', 'Av. Importación #500', 414, 415),
    ('Comercial Foxtrot', 'Comercial Foxtrot S.A.', 3100000.00, 'Calle Comercial #600', 'comercialfoxtrot.com', 666777888, 'J', 'Calle Comercial #600', 416, 417),
    ('Distribuidora Golf', 'Distribuidora Golf C.A.', 2900000.00, 'Av. Distribución #700', 'distribuidoragolf.com', 777888999, 'J', 'Av. Distribución #700', 418, 419),
    ('Exportadora Hotel', 'Exportadora Hotel S.A.', 5200000.00, 'Calle Exportación #800', 'exportadorahotel.com', 888999000, 'J', 'Calle Exportación #800', 420, 421),
    ('Corporación India', 'Corporación India C.A.', 6800000.00, 'Av. Corporativa #900', 'corpindia.com', 999000111, 'J', 'Av. Corporativa #900', 422, 423); 

/**
 * Inserts for persona_contacto table
 * Contains example contact persons for different entities
 */

INSERT INTO persona_contacto (
    ci,
    nacionalidad,
    primer_nombre,
    primer_apellido,
    segundo_nombre,
    segundo_apellido,
    fk_miembro_1,
    fk_miembro_2,
    fk_cliente_juridico
) VALUES
    (11223344, 'V', 'Pedro', 'González', 'José', 'Martínez', 123456789, 'J', NULL),  -- Member contact
    (44332211, 'V', 'Ana', 'López', 'María', 'Sánchez', NULL, NULL, 1),              -- Legal client contact
    (22334455, 'V', 'Ricardo', 'Blanco', 'Alberto', 'Pérez', 234567890, 'J', NULL),  -- Delta Distrib contact
    (33445566, 'E', 'Sofía', 'Ramírez', 'Valentina', 'Mendoza', 345678901, 'V', NULL),     -- Omega Imports contact
    (44556677, 'V', 'Daniel', 'Suárez', 'Roberto', 'Núñez', 456789012, 'J', NULL),        -- Epsilon Trade contact
    (55667788, 'V', 'Gabriela', 'Fernández', 'Patricia', 'Silva', NULL, NULL, 2),             -- Global Services contact
    (66778899, 'E', 'Alejandro', 'Mendoza', 'Felipe', 'Rivas', NULL, NULL, 3),           -- Constructora Delta contact
    (77889900, 'V', 'Valeria', 'Paredes', 'Camila', 'Brito', NULL, NULL, 4),          -- Distribuidora Omega contact
    (88990011, 'V', 'Eduardo', 'Rivas', 'Manuel', 'Quintero', NULL, NULL, 5),       -- Legal client 5 contact
    (99001122, 'E', 'Carolina', 'Brito', 'Daniela', 'Paredes', NULL, NULL, 6),              -- Legal client 6 contact
    (00112233, 'V', 'Roberto', 'Quintero', 'Alberto', 'Blanco', NULL, NULL, 7),           -- Legal client 7 contact
    (11223300, 'V', 'Daniela', 'Silva', 'Gabriela', 'Fernández', NULL, NULL, 8);               -- Legal client 8 contact 

/**
 * Inserts for correo table
 * Contains example email addresses for members and users
 */

INSERT INTO correo (
    dirección_correo,
    fk_miembro_1,
    fk_miembro_2,
    fk_persona_contacto
) VALUES
    -- Member company emails
    ('contacto@abc.com', 123456789, 'J', NULL),
    ('contacto@xyz.com', 987654321, 'V', NULL),
    ('distribucion@deltadistrib.com', 234567890, 'J', NULL),
    ('importaciones@omegaimports.com', 345678901, 'V', NULL),
    ('comercial@epsilontrade.com', 456789012, 'J', NULL),
    ('ventas@betastores.com', 567890123, 'V', NULL),
    ('distribucion@gammadist.com', 678901234, 'J', NULL),
    ('ventas@sigmacom.com', 789012345, 'V', NULL),
    ('importaciones@thetaimports.com', 890123456, 'J', NULL),
    ('ventas@lambdastores.com', 901234567, 'V', NULL),
    ('distribucion@zetadist.com', 12345678, 'J', NULL),
    ('ventas@omegacom.com', 123456780, 'V', NULL),
    ('omega-importaciones@omegacom.com', 123456780, 'V', NULL),
    ('contacto@alfaindustrial.com', 111222333, 'J', NULL),
    ('contacto@bravocomercial.com', 444555666, 'V', NULL),
    ('contacto@charliedist.com', 777888999, 'J', NULL),
    ('contacto@deltaimports.com', 111333555, 'V', NULL),
    ('contacto@echostores.com', 222444666, 'J', NULL),
    ('contacto@foxtrrottrade.com', 333555777, 'V', NULL),
    ('contacto@golfdist.com', 444666888, 'J', NULL),
    ('contacto@hotelimports.com', 555777999, 'V', NULL),
    ('contacto@indiacorp.com', 666888000, 'J', NULL),

    -- Additional emails for user (not members)
    ('admin@acaucab.com', NULL, NULL, NULL),
    ('empleados@acaucab.com', NULL, NULL, NULL),
    ('clientes@acaucab.com', NULL, NULL, NULL),
    ('miembros@acaucab.com', NULL, NULL, NULL),
    ('maria.rodriguez@acaucab.com', NULL, NULL, NULL),
    ('pedro.garcia@acaucab.com', NULL, NULL, NULL),
    ('ana.martinez@acaucab.com', NULL, NULL, NULL),
    ('carlos.lopez@acaucab.com', NULL, NULL, NULL),
    ('laura.sanchez@acaucab.com', NULL, NULL, NULL),
    ('roberto.torres@acaucab.com', NULL, NULL, NULL),
    ('sofia.diaz@acaucab.com', NULL, NULL, NULL),
    ('miguel.morales@acaucab.com', NULL, NULL, NULL),
    ('carmen.ortiz@acaucab.com', NULL, NULL, NULL),
    
    -- Emails para persona_contacto
    ('contacto@deltadistrib.com', NULL, NULL, 1),
    ('contacto@omegaimports.com', NULL, NULL, 2),
    ('contacto@epsilontrade.com', NULL, NULL, 3),
    ('contacto@betastores.com', NULL, NULL, 4),
    ('contacto@gammadist.com', NULL, NULL, 5),
    ('contacto@sigmacom.com', NULL, NULL, 6),

    -- Emails for client users
    ('cliente.natural.2@acaucab.com', NULL, NULL, NULL),
    ('cliente.natural.3@acaucab.com', NULL, NULL, NULL),
    ('cliente.natural.4@acaucab.com', NULL, NULL, NULL),
    ('cliente.natural.5@acaucab.com', NULL, NULL, NULL),
    ('cliente.natural.6@acaucab.com', NULL, NULL, NULL),
    ('cliente.juridico.1@acaucab.com', NULL, NULL, NULL),
    ('cliente.juridico.2@acaucab.com', NULL, NULL, NULL),
    ('cliente.juridico.3@acaucab.com', NULL, NULL, NULL),
    ('cliente.juridico.4@acaucab.com', NULL, NULL, NULL),
    ('cliente.juridico.5@acaucab.com', NULL, NULL, NULL),
    ('cliente.juridico.6@acaucab.com', NULL, NULL, NULL);

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
    ('admin123', 1, 23),
    
    -- Member company users (all with role 3 - Miembro)
    ('abc2024', 3, 1),
    ('xyz2024', 3, 2),
    ('delta2024', 3, 3),
    ('omega2024', 3, 4),
    ('epsilon2024', 3, 5),
    ('beta2024', 3, 6),
    ('gamma2024', 3, 7),
    ('sigma2024', 3, 8),
    ('theta2024', 3, 9),
    ('lambda2024', 3, 10),
    ('zeta2024', 3, 11),
    ('omegacom2024', 3, 12),
    ('alfa2024', 3, 14),
    ('bravo2024', 3, 15),
    ('charlie2024', 3, 16),
    ('deltaimp2024', 3, 17),
    ('echo2024', 3, 18),
    ('foxtrot2024', 3, 19),
    ('golf2024', 3, 20),
    ('hotel2024', 3, 21),
    ('india2024', 3, 22),

    -- Employee users
    ('maria2024', 7, 27),
    ('pedro2024', 8, 28),
    ('ana2024', 9, 29),
    ('carlos2024', 7, 30),
    ('laura2024', 10, 31),
    ('roberto2024', 9, 32),
    ('sofia2024', 9, 33),
    ('miguel2024', 4, 34), 
    ('carmen2024', 6, 35),
    
    -- Users for clients
    ('cliente_natural_2', 2, 42),
    ('cliente_natural_3', 2, 43),
    ('cliente_natural_4', 2, 44),
    ('cliente_natural_5', 2, 45),
    ('cliente_natural_6', 2, 46),
    ('cliente_juridico_1', 2, 47),
    ('cliente_juridico_2', 2, 48),
    ('cliente_juridico_3', 2, 49),
    ('cliente_juridico_4', 2, 50),
    ('cliente_juridico_5', 2, 51),
    ('cliente_juridico_6', 2, 52);

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
    (NULL, 3, 1),
    (NULL, 32, 2),
    (NULL, 33, 3),
    (NULL, 34, 4),
    (NULL, 35, 5),
    (NULL, 36, 6),
    
    -- Legal clients
    (1, 37, NULL),
    (2, 38, NULL),
    (3, 39, NULL),
    (4, 40, NULL),
    (5, 41, NULL),
    (6, 42, NULL);

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
    fk_cliente_natural,
    fk_persona_contacto
) VALUES
    (212, 5551234, 123456789, 'J', NULL, NULL, NULL, NULL),    -- Member phone
    (212, 5555678, NULL, NULL, NULL, 1, NULL, NULL),           -- Legal client phone
    (212, 5559012, NULL, NULL, NULL, NULL, 1, NULL),           -- Natural client phone
    (212, 5553456, NULL, NULL, 1, NULL, NULL, NULL),           -- Employee phone
    
    (412, 1234567, 234567890, 'J', NULL, NULL, NULL, NULL),    -- Delta Distrib
    (414, 2345678, 345678901, 'V', NULL, NULL, NULL, NULL),    -- Omega Imports
    (424, 3456789, 456789012, 'J', NULL, NULL, NULL, NULL),    -- Epsilon Trade
    
    (412, 4567890, NULL, NULL, NULL, 2, NULL, NULL),           -- Global Services
    (414, 5678901, NULL, NULL, NULL, 3, NULL, NULL),           -- Constructora Delta
    (424, 6789012, NULL, NULL, NULL, 4, NULL, NULL),           -- Distribuidora Omega
    
    
    (412, 7890123, NULL, NULL, NULL, NULL, 2, NULL),           -- Natural client 2
    (414, 8901234, NULL, NULL, NULL, NULL, 3, NULL),           -- Natural client 3
    (424, 9012345, NULL, NULL, NULL, NULL, 4, NULL),           -- Natural client 4
 
    (412, 0123456, NULL, NULL, 2, NULL, NULL, NULL),           -- Employee 2
    (414, 1234567, NULL, NULL, 3, NULL, NULL, NULL),           -- Employee 3
    (424, 2345678, NULL, NULL, 4, NULL, NULL, NULL),           -- Employee 4
    (412, 3456789, NULL, NULL, 5, NULL, NULL, NULL),           -- Employee 5 

    -- Telefonos para persona_contacto
    (212, 5559876, NULL, NULL, NULL, NULL, NULL, 1),
    (212, 5558765, NULL, NULL, NULL, NULL, NULL, 2),
    (212, 5557654, NULL, NULL, NULL, NULL, NULL, 3),
    (212, 5556543, NULL, NULL, NULL, NULL, NULL, 4),
    (412, 9876543, NULL, NULL, NULL, NULL, NULL, 5),
    (414, 8765432, NULL, NULL, NULL, NULL, NULL, 6);

/**
 * Inserts for miembro_usuario table
 * Links members with their respective users
 */

INSERT INTO miembro_usuario (
    fk_usuario,
    fk_miembro_1,
    fk_miembro_2
) VALUES
    (2, 123456789, 'J'),
    (3, 987654321, 'V'),
    (4, 234567890, 'J'),
    (5, 345678901, 'V'),
    (6, 456789012, 'J'),
    (7, 567890123, 'V'),
    (8, 678901234, 'J'),
    (9, 789012345, 'V'),
    (10, 890123456, 'J'),
    (11, 901234567, 'V'),
    (12, 12345678, 'J'),
    (13, 123456780, 'V'),
    (14, 111222333, 'J'),
    (15, 444555666, 'V'),
    (16, 777888999, 'J'),
    (17, 111333555, 'V'),
    (18, 222444666, 'J'),
    (19, 333555777, 'V'),
    (20, 444666888, 'J'),
    (21, 555777999, 'V'),
    (22, 666888000, 'J');


/**
 * Inserts for empleado_usuario table
 * Links employees with their respective users
 */

INSERT INTO empleado_usuario (
    fk_empleado,
    fk_usuario
) VALUES
    (1, 2),     -- Links employee 1 (Juan Pérez) with user 2 (employee user)
    (2, 23),    -- Links employee 2 (María Rodríguez) with user 15
    (3, 24),    -- Links employee 3 (Pedro García) with user 16
    (4, 25),    -- Links employee 4 (Ana Martínez) with user 17
    (5, 26),    -- Links employee 5 (Carlos López) with user 18
    (6, 27),    -- Links employee 6 (Laura Sánchez) with user 19
    (7, 28),    -- Links employee 7 (Roberto Torres) with user 20
    (8, 29),    -- Links employee 8 (Sofía Díaz) with user 21
    (9, 30),    -- Links employee 9 (Miguel Morales) with user 22
    (10, 31);   -- Links employee 10 (Carmen Ortiz) with user 23 