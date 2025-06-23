/**
 * Crea una nueva venta en el sistema manejando los diferentes tipos de tiendas
 * y compradores según las reglas de negocio establecidas.
 */
CREATE OR REPLACE FUNCTION fn_create_venta(
    p_monto_total DECIMAL(10,2),
    p_direccion_entrega VARCHAR(255) DEFAULT NULL,
    p_observacion VARCHAR(255) DEFAULT NULL,
    p_fk_usuario INTEGER DEFAULT NULL,
    p_fk_lugar INTEGER DEFAULT NULL,
    p_fk_cliente_juridico INTEGER DEFAULT NULL,
    p_fk_cliente_natural INTEGER DEFAULT NULL,
    p_fk_tienda_fisica INTEGER DEFAULT NULL,
    p_fk_tienda_web INTEGER DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    v_venta_id INTEGER;
BEGIN
    /**
     * Función para crear una nueva venta en el sistema.
     * 
     * @param p_monto_total Monto total de la venta
     * @param p_direccion_entrega Dirección de entrega (opcional para tienda física)
     * @param p_observacion Observaciones adicionales (opcional)
     * @param p_fk_usuario ID del usuario (para ventas web)
     * @param p_fk_lugar ID del lugar de entrega (para ventas web)
     * @param p_fk_cliente_juridico ID del cliente jurídico (para ventas físicas)
     * @param p_fk_cliente_natural ID del cliente natural (para ventas físicas)
     * @param p_fk_tienda_fisica ID de la tienda física
     * @param p_fk_tienda_web ID de la tienda web
     * @return ID de la venta creada
     */

    /** Insertar la nueva venta - Los constraints de la DB manejan todas las validaciones */
    INSERT INTO venta (
        monto_total,
        dirección_entrega,
        observación,
        fk_usuario,
        fk_lugar,
        fk_cliente_juridico,
        fk_cliente_natural,
        fk_tienda_fisica,
        fk_tienda_web
    ) VALUES (
        p_monto_total,
        p_direccion_entrega,
        p_observacion,
        p_fk_usuario,
        p_fk_lugar,
        p_fk_cliente_juridico,
        p_fk_cliente_natural,
        p_fk_tienda_fisica,
        p_fk_tienda_web
    ) RETURNING id INTO v_venta_id;

    /** Retornar el ID de la venta creada */
    RETURN v_venta_id;

EXCEPTION
    WHEN OTHERS THEN
        /** La DB maneja constraints y FK automáticamente */
        RAISE;
END;
$$ LANGUAGE plpgsql;
