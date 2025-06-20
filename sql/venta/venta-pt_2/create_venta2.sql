/**
 * Tabla venta_evento - Registra las ventas realizadas en eventos
 * Puede estar asociada a clientes jurídicos o naturales (exclusivo)
 */
CREATE TABLE venta_evento (
    id                  SERIAL,                           /** Identificador único de la venta */
    monto_total         DECIMAL(10,2) NOT NULL,           /** Monto total de la venta */
    fk_cliente_juridico INTEGER,                          /** Referencia a cliente jurídico (opcional) */
    fk_cliente_natural  INTEGER,                          /** Referencia a cliente natural (opcional) */
    
    /** Constraint de clave primaria */
    CONSTRAINT venta_evento_pk PRIMARY KEY (id),
    
    /** Constraint de verificación - solo uno de los dos tipos de cliente puede estar presente */
    CONSTRAINT venta_evento_check_cliente CHECK (
        (fk_cliente_juridico IS NOT NULL AND fk_cliente_natural IS NULL) OR
        (fk_cliente_natural IS NOT NULL AND fk_cliente_juridico IS NULL)
    ),
    
    /** Constraint de clave foránea hacia cliente jurídico */
    CONSTRAINT venta_evento_fk_juridico FOREIGN KEY (fk_cliente_juridico)
        REFERENCES cliente_juridico (id),
    
    /** Constraint de clave foránea hacia cliente natural */
    CONSTRAINT venta_evento_fk_natural FOREIGN KEY (fk_cliente_natural)
        REFERENCES cliente_natural (id)
);




/**
 * Tabla detalle_evento - Almacena los detalles de productos vendidos en eventos
 * Maneja la relación entre stock de miembros y ventas de eventos
 */
CREATE TABLE detalle_evento (
    cantidad           INTEGER NOT NULL,                    /** Cantidad de productos vendidos */
    precio_unitario    DECIMAL(10,2),                      /** Precio por unidad del producto */
    fk_stock_miembro_1 INTEGER NOT NULL,                   /** Referencia al stock del miembro - campo 1 */
    fk_stock_miembro_2 INTEGER NOT NULL,                   /** Referencia al stock del miembro - campo 2 */
    fk_stock_miembro_3 CHAR(1) NOT NULL,                   /** Referencia al stock del miembro - campo 3 */
    fk_venta_evento    INTEGER NOT NULL,                   /** Referencia a la venta del evento */
    fk_stock_miembro_4 INTEGER NOT NULL,                   /** Referencia al stock del miembro - campo 4 */
    fk_stock_miembro_5 INTEGER NOT NULL,               /** Referencia al stock del miembro - campo 5 */
    
    /** Constraint de clave primaria compuesta */
    CONSTRAINT detalle_evento_pk PRIMARY KEY (
        fk_stock_miembro_1,
        fk_stock_miembro_2,
        fk_stock_miembro_3,
        fk_stock_miembro_4,
        fk_stock_miembro_5,
        fk_venta_evento
    ),
    
    /** Constraint de clave foránea hacia stock_miembro */
    CONSTRAINT detalle_evento_fk_stock_miembro FOREIGN KEY (
        fk_stock_miembro_1,
        fk_stock_miembro_2,
        fk_stock_miembro_3,
        fk_stock_miembro_4,
        fk_stock_miembro_5
    ) REFERENCES stock_miembro (
        fk_evento,
        fk_miembro_1,
        fk_miembro_2,
        fk_presentacion_cerveza_1,
        fk_presentacion_cerveza_2
    ),
    
    /** Constraint de clave foránea hacia venta_evento */
    CONSTRAINT detalle_evento_fk_venta_evento FOREIGN KEY (fk_venta_evento)
        REFERENCES venta_evento (id)
);

/**
 * Tabla orden_de_compra - Gestiona las órdenes de compra de presentaciones de cerveza
 * Relaciona empleados con productos a ordenar
 */
CREATE TABLE orden_de_compra (
    id                        SERIAL,                       /** Identificador único de la orden */
    fecha_solicitud           DATE NOT NULL,                /** Fecha cuando se solicita la orden */
    fecha_entrega             DATE,                         /** Fecha estimada/real de entrega */
    observacion               VARCHAR(255),                 /** Observaciones adicionales de la orden */
    fk_empleado               INTEGER,                      /** Referencia al empleado que hace la orden */
    fk_presentacion_cerveza_1 INTEGER NOT NULL,             /** Referencia a presentación cerveza - campo 1 */
    fk_presentacion_cerveza_2 INTEGER NOT NULL,         /** Referencia a presentación cerveza - campo 2 */
    unidades                  INTEGER NOT NULL,             /** Cantidad de unidades a ordenar */
    
    /** Constraint de clave primaria */
    CONSTRAINT orden_de_compra_pk PRIMARY KEY (id),
    
    /** Constraint de clave foránea hacia empleado */
    CONSTRAINT orden_de_compra_fk_empleado FOREIGN KEY (fk_empleado)
        REFERENCES empleado (id),
    
    /** Constraint de clave foránea hacia presentacion_cerveza */
    CONSTRAINT orden_de_compra_fk_presentacion_cerveza FOREIGN KEY (
        fk_presentacion_cerveza_1,
        fk_presentacion_cerveza_2
    ) REFERENCES presentacion_cerveza (
        fk_presentacion,
        fk_cerveza
    )
);
