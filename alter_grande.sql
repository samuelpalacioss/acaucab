
/**
 * Reinicia la secuencia de la tabla vacacion
 */
ALTER SEQUENCE vacacion_id_seq RESTART WITH 1;

/**
 * Reinicia la secuencia de la tabla registro_biometrico
 */
ALTER SEQUENCE registro_biometrico_id_seq RESTART WITH 1;

/**
 * Reinicia la secuencia de la tabla nomina
 */
ALTER SEQUENCE nomina_id_seq RESTART WITH 1;

/**
 * Reinicia la secuencia de la tabla horario
 */
ALTER SEQUENCE horario_id_seq RESTART WITH 1;

/**
 * Reinicia la secuencia de la tabla empleado
 */
ALTER SEQUENCE empleado_id_seq RESTART WITH 1;

/**
 * Reinicia la secuencia de la tabla departamento
 */
ALTER SEQUENCE departamento_id_seq RESTART WITH 1;

/**
 * Reinicia la secuencia de la tabla cargo
 */
ALTER SEQUENCE cargo_id_seq RESTART WITH 1;

/**
 * Reinicia la secuencia de la tabla beneficio
 */
ALTER SEQUENCE beneficio_id_seq RESTART WITH 1;

/**
* Reinicia la secuencia de lugar
*/
ALTER SEQUENCE lugar_id_seq RESTART WITH 1;

/**
 * Reinicia la secuencia de la tabla rol
 */
ALTER SEQUENCE rol_id_seq RESTART WITH 1;

/**
 * Reinicia la secuencia de la tabla correo
 */
ALTER SEQUENCE correo_id_seq RESTART WITH 1;

-- Reiniciar secuencia de usuario
ALTER SEQUENCE usuario_id_seq RESTART WITH 1;

-- Reiniciar secuencia de cliente_natural
ALTER SEQUENCE cliente_natural_id_seq RESTART WITH 1;

-- Reiniciar secuencia de cliente_juridico
ALTER SEQUENCE cliente_juridico_id_seq RESTART WITH 1;

-- Reiniciar secuencia de telefono
ALTER SEQUENCE telefono_id_seq RESTART WITH 1;

-- Reiniciar secuencia de persona_contacto
ALTER SEQUENCE persona_contacto_id_seq RESTART WITH 1;

-- Reiniciar secuencia de permiso
ALTER SEQUENCE permiso_id_seq RESTART WITH 1; 

/** Reinicio de secuencia para tabla tipo_cerveza */
ALTER SEQUENCE tipo_cerveza_id_seq RESTART WITH 1;

/** Reinicio de secuencia para tabla cerveza */
ALTER SEQUENCE cerveza_id_seq RESTART WITH 1;

/** Reinicio de secuencia para tabla caracteristica */
ALTER SEQUENCE caracteristica_id_seq RESTART WITH 1;

/** Reinicio de secuencia para tabla ingrediente */
ALTER SEQUENCE ingrediente_id_seq RESTART WITH 1;

/** Reinicio de secuencia para tabla periodo_descuento */
ALTER SEQUENCE periodo_descuento_id_seq RESTART WITH 1;

/** Reinicio de secuencia para tabla presentacion */
ALTER SEQUENCE presentacion_id_seq RESTART WITH 1;

/** Reinicio de secuencia para tabla cerveza_caracteristica */
ALTER SEQUENCE cerveza_caracteristica_id_seq RESTART WITH 1;

/**
 * Script para reiniciar las secuencias de las tablas de eventos
 */

ALTER SEQUENCE tipo_evento_id_seq RESTART WITH 1;
ALTER SEQUENCE tipo_invitado_id_seq RESTART WITH 1;
ALTER SEQUENCE invitado_id_seq RESTART WITH 1;
ALTER SEQUENCE evento_id_seq RESTART WITH 1;
ALTER SEQUENCE evento_cliente_id_seq RESTART WITH 1;

/**
 * Reinicia la secuencia de la tabla tienda_fisica
 */
ALTER SEQUENCE tienda_fisica_id_seq  RESTART WITH 1;
ALTER SEQUENCE tienda_web_id_seq     RESTART WITH 1;
ALTER SEQUENCE almacen_id_seq        RESTART WITH 1;
ALTER SEQUENCE lugar_tienda_id_seq   RESTART WITH 1;
ALTER SEQUENCE orden_de_reposicion_id_seq RESTART WITH 1;

/**
 * Venta 1
 */
ALTER SEQUENCE venta_id_seq RESTART WITH 1; 

/**
 * Venta 2
 */
ALTER SEQUENCE venta_evento_id_seq RESTART WITH 1;
ALTER SEQUENCE orden_de_compra_id_seq RESTART WITH 1;

/**
 * Pago
 */

ALTER SEQUENCE metodo_pago_id_seq RESTART WITH 1;
ALTER SEQUENCE afiliacion_id_seq RESTART WITH 1;
ALTER SEQUENCE tasa_id_seq RESTART WITH 1;
ALTER SEQUENCE pago_id_seq RESTART WITH 1;

/**
 * Status
 */

ALTER SEQUENCE status_id_seq RESTART WITH 1;
