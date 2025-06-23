/**
 * Crea un nuevo pago en el sistema manejando diferentes tipos de transacciones
 * y métodos de pago según las reglas de negocio establecidas.
 */
CREATE OR REPLACE FUNCTION fn_create_pago(
    p_monto DECIMAL(10,2),
    p_fecha_pago TIMESTAMP,
    p_fk_tasa INTEGER,
    p_tipo_transaccion VARCHAR(20),
    p_tipo_metodo_pago VARCHAR(10),
    p_fk_mensualidad_1 INTEGER DEFAULT NULL,
    p_fk_mensualidad_2 INTEGER DEFAULT NULL,
    p_fk_mensualidad_3 CHAR(1) DEFAULT NULL,
    p_fk_venta INTEGER DEFAULT NULL,
    p_fk_orden_de_compra INTEGER DEFAULT NULL,
    p_fk_venta_evento INTEGER DEFAULT NULL,
    p_fk_miembro_metodo_pago_1 INTEGER DEFAULT NULL,
    p_fk_cliente_metodo_pago_1 INTEGER DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    v_pago_id INTEGER;
BEGIN
    /** Configurar valores según tipo de transacción */
    IF p_tipo_transaccion = 'MENSUALIDAD' THEN
        IF p_fk_mensualidad_1 IS NULL OR p_fk_mensualidad_2 IS NULL OR p_fk_mensualidad_3 IS NULL THEN
            RAISE EXCEPTION 'Para pagos de mensualidad se requieren los tres campos de mensualidad';
        END IF;
    ELSIF p_tipo_transaccion = 'VENTA' THEN
        IF p_fk_venta IS NULL THEN
            RAISE EXCEPTION 'Para pagos de venta se requiere el ID de la venta';
        END IF;
    ELSIF p_tipo_transaccion = 'ORDEN_COMPRA' THEN
        IF p_fk_orden_de_compra IS NULL THEN
            RAISE EXCEPTION 'Para pagos de orden de compra se requiere el ID de la orden';
        END IF;
    ELSIF p_tipo_transaccion = 'VENTA_EVENTO' THEN
        IF p_fk_venta_evento IS NULL THEN
            RAISE EXCEPTION 'Para pagos de venta de evento se requiere el ID de la venta de evento';
        END IF;
    ELSE
        RAISE EXCEPTION 'Tipo de transacción inválido: %. Debe ser MENSUALIDAD, VENTA, ORDEN_COMPRA o VENTA_EVENTO', p_tipo_transaccion;
    END IF;

    /** Configurar valores según tipo de método de pago */
    IF p_tipo_metodo_pago = 'MIEMBRO' THEN
        IF p_fk_miembro_metodo_pago_1 IS NULL THEN
            RAISE EXCEPTION 'Para métodos de pago de miembro se requiere el ID del método de pago del miembro';
        END IF;
    ELSIF p_tipo_metodo_pago = 'CLIENTE' THEN
        IF p_fk_cliente_metodo_pago_1 IS NULL THEN
            RAISE EXCEPTION 'Para métodos de pago de cliente se requiere el ID del método de pago del cliente';
        END IF;
    ELSE
        RAISE EXCEPTION 'Tipo de método de pago inválido: %. Debe ser MIEMBRO o CLIENTE', p_tipo_metodo_pago;
    END IF;

    /** Insertar el nuevo pago - La DB maneja constraints automáticamente */
    INSERT INTO pago (
        monto,
        fecha_pago,
        fk_tasa,
        fk_mensualidad_1,
        fk_mensualidad_2,
        fk_mensualidad_3,
        fk_venta,
        fk_orden_de_compra,
        fk_venta_evento,
        fk_miembro_metodo_pago_1,
        fk_cliente_metodo_pago_1
    ) VALUES (
        p_monto,
        p_fecha_pago,
        p_fk_tasa,
        p_fk_mensualidad_1,
        p_fk_mensualidad_2,
        p_fk_mensualidad_3,
        p_fk_venta,
        p_fk_orden_de_compra,
        p_fk_venta_evento,
        p_fk_miembro_metodo_pago_1,
        p_fk_cliente_metodo_pago_1
    ) RETURNING id INTO v_pago_id; -- Guarda el ID del pago creado en la variable v_pago_id

    /** Retornar el ID del pago creado */
    RETURN v_pago_id;

EXCEPTION
    WHEN OTHERS THEN
        /** La DB maneja constraints y FK automáticamente con mensajes */
        RAISE;
END;
$$ LANGUAGE plpgsql;
