/**
 * Crea un nuevo detalle de presentación de cerveza asociado a una venta específica.
 * Valida los parámetros de entrada y maneja las reglas de negocio establecidas.
 */
CREATE OR REPLACE FUNCTION fn_create_detalle_presentacion(
    p_cantidad INTEGER,
    p_precio_unitario DECIMAL(10,2),
    p_fk_presentacion INTEGER,
    p_fk_cerveza INTEGER,
    p_fk_venta INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
BEGIN
    /**
     * Función para crear un detalle de presentación en una venta.
     * 
     * @param p_cantidad Cantidad de productos vendidos (debe ser mayor a 0)
     * @param p_precio_unitario Precio por unidad del producto (debe ser mayor a 0)
     * @param p_fk_presentacion ID de la presentación de cerveza
     * @param p_fk_cerveza ID de la cerveza
     * @param p_fk_venta ID de la venta a la que pertenece este detalle
     * @return TRUE si el detalle se creó exitosamente
     */


    /** Insertar el nuevo detalle de presentación */
    INSERT INTO detalle_presentacion (
        cantidad,
        precio_unitario,
        fk_presentacion,
        fk_cerveza,
        fk_venta
    ) VALUES (
        p_cantidad,
        p_precio_unitario,
        p_fk_presentacion,
        p_fk_cerveza,
        p_fk_venta
    );

    /** Retornar TRUE indicando éxito en la creación */
    RETURN TRUE;

EXCEPTION
    WHEN OTHERS THEN
        /** La DB maneja constraints y FK automáticamente */
        RAISE;
END;
$$ LANGUAGE plpgsql;
