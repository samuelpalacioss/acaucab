 /** 
 * Tabla venta
 * Almacena la información principal de las ventas realizadas
 * Contiene datos de entrega, montos y referencias a clientes y tiendas
 */
CREATE TABLE venta (
    id                  SERIAL,                          /** Identificador único de la venta (tipo: SERIAL - auto incremental) */
    monto_total         DECIMAL(10,2),                   /** Monto total de la venta (tipo: DECIMAL) */
    dirección_entrega   VARCHAR(255),                    /** Dirección donde se entrega el pedido (tipo: VARCHAR) */
    observación         VARCHAR(255),                    /** Observaciones adicionales de la venta (tipo: VARCHAR) */
    fk_usuario          INTEGER,                         /** Clave foránea del usuario (tipo: INTEGER) */
    fk_lugar            INTEGER,                         /** Clave foránea del lugar de entrega (tipo: INTEGER) */
    fk_cliente_juridico INTEGER,                         /** Clave foránea del cliente jurídico (tipo: INTEGER) */
    fk_cliente_natural  INTEGER,                         /** Clave foránea del cliente natural (tipo: INTEGER) */
    fk_tienda_fisica    INTEGER,                /** Clave foránea de la tienda física (tipo: INTEGER) */
    fk_tienda_web       INTEGER,                /** Clave foránea de la tienda web (tipo: INTEGER) */
    
    /** Clave primaria de la tabla venta */
    CONSTRAINT venta_pk PRIMARY KEY (id),
    
    /** Constraint para asegurar que ventas en tienda física no tengan dirección de entrega */
    CONSTRAINT venta_tienda_fisica_direccion CHECK (
        (fk_tienda_fisica IS NULL) OR (dirección_entrega IS NULL)
    ),
    
    /** Constraint de arco integral: relación entre tipo de tienda y tipo de comprador */
    /** Asegura que cada venta tenga exactamente un tipo de comprador según el tipo de tienda */
    CONSTRAINT venta_arc_tienda_comprador CHECK (
        /** CASO 1: Tienda física con cliente jurídico */
        ((fk_tienda_fisica IS NOT NULL) AND (fk_tienda_web IS NULL) AND
         (fk_cliente_juridico IS NOT NULL) AND (fk_cliente_natural IS NULL) AND (fk_usuario IS NULL)) OR
        /** CASO 2: Tienda física con cliente natural */
        ((fk_tienda_fisica IS NOT NULL) AND (fk_tienda_web IS NULL) AND
         (fk_cliente_natural IS NOT NULL) AND (fk_cliente_juridico IS NULL) AND (fk_usuario IS NULL)) OR
        /** CASO 3: Tienda web con usuario */
        ((fk_tienda_web IS NOT NULL) AND (fk_tienda_fisica IS NULL) AND
         (fk_usuario IS NOT NULL) AND (fk_cliente_juridico IS NULL) AND (fk_cliente_natural IS NULL))
    ),
    
    /** Constraint de exclusión entre tienda física y lugar de entrega */
    /** Si la venta es en tienda física, no debe tener lugar de entrega separado */
    /** porque la entrega se realiza en la misma tienda física */
    CONSTRAINT venta_tienda_fisica_lugar_exclusion CHECK (
        (fk_tienda_fisica IS NULL) OR (fk_lugar IS NULL)
    ),
    
    /** Clave foránea que referencia la tabla usuario */
    CONSTRAINT venta_fk_usuario FOREIGN KEY (fk_usuario) 
        REFERENCES usuario (id),
    
    /** Clave foránea que referencia la tabla lugar */
    CONSTRAINT venta_fk_lugar FOREIGN KEY (fk_lugar) 
        REFERENCES lugar (id),
    
    /** Clave foránea que referencia la tabla juridico */
    CONSTRAINT venta_fk_juridico FOREIGN KEY (fk_cliente_juridico) 
        REFERENCES cliente_juridico (id),
    
    /** Clave foránea que referencia la tabla natural */
    CONSTRAINT venta_fk_natural FOREIGN KEY (fk_cliente_natural) 
        REFERENCES cliente_natural (id),
    
    /** Clave foránea que referencia la tabla tienda_fisica */
    CONSTRAINT venta_fk_tienda_fisica FOREIGN KEY (fk_tienda_fisica) 
        REFERENCES tienda_fisica (id),
    
    /** Clave foránea que referencia la tabla tienda_web */
    CONSTRAINT venta_fk_tienda_web FOREIGN KEY (fk_tienda_web) 
        REFERENCES tienda_web (id)
);



/** 
 * Tabla detalle_presentación
 * Almacena los detalles de las presentaciones de productos en cada venta
 * Incluye cantidad, precio unitario y referencias a inventario y venta
 */
CREATE TABLE detalle_presentacion (
    cantidad        INTEGER NOT NULL,                    /** Cantidad de productos vendidos (tipo: INTEGER) */
    precio_unitario DECIMAL(10,2),                      /** Precio por unidad del producto (tipo: DECIMAL) */
    fk_inventario_1 VARCHAR(20) NOT NULL,                   /** Primera clave foránea del inventario (tipo: INTEGER) */
    fk_inventario_2 INTEGER NOT NULL,               /** Segunda clave foránea del inventario - SKU (tipo: VARCHAR) */
    fk_inventario_3 INTEGER NOT NULL,                   /** Tercera clave foránea del inventario (tipo: INTEGER) */
    fk_venta        INTEGER NOT NULL,                   /** Clave foránea que referencia la venta (tipo: INTEGER) */
    
    /** Definición de clave primaria compuesta */
    CONSTRAINT detalle_presentacion_pk PRIMARY KEY (fk_inventario_1, fk_inventario_2, fk_inventario_3, fk_venta),
    
    /** Clave foránea que referencia la tabla inventario */
    CONSTRAINT detalle_presentacion_fk_inventario FOREIGN KEY (fk_inventario_1, fk_inventario_2, fk_inventario_3) 
        REFERENCES inventario (fk_presentacion_cerveza_1, fk_presentacion_cerveza_2, fk_almacen),
    
    /** Clave foránea que referencia la tabla venta */
    CONSTRAINT detalle_presentacion_fk_venta FOREIGN KEY (fk_venta) 
        REFERENCES venta (id)
);

/** 
 * Tabla miembro_presentación_cerveza
 * Relaciona miembros con presentaciones de cerveza y su monto de proveedor
 * Tabla de relación muchos a muchos con atributo adicional
 */
CREATE TABLE miembro_presentacion_cerveza (
    monto_proveedor           DECIMAL(10,2) NOT NULL,    /** Monto que paga el proveedor (tipo: DECIMAL) */
    fk_miembro_1              INTEGER NOT NULL,          /** Primera clave foránea del miembro - RIF (tipo: INTEGER) */
    fk_miembro_2              CHAR(1) NOT NULL,           /** Segunda clave foránea del miembro - naturaleza RIF (tipo: CHAR) */
    fk_presentacion_cerveza_1 VARCHAR(20) NOT NULL,          /** Primera clave foránea de presentación cerveza - ID (tipo: INTEGER) */
    fk_presentacion_cerveza_2 INTEGER NOT NULL,      /** Segunda clave foránea de presentación cerveza - SKU (tipo: VARCHAR) */
    
    /** Clave primaria compuesta de la tabla de relación */
    CONSTRAINT miembro_presentacion_cerveza_pk PRIMARY KEY (fk_miembro_1, fk_miembro_2, fk_presentacion_cerveza_1, fk_presentacion_cerveza_2),
    
    /** Clave foránea que referencia la tabla miembro */
    CONSTRAINT miembro_presentacion_cerveza_fk_miembro FOREIGN KEY (fk_miembro_1, fk_miembro_2) 
        REFERENCES miembro (rif, naturaleza_rif),
    
    /** Clave foránea que referencia la tabla presentacion_cerveza */
    CONSTRAINT miembro_presentacion_cerveza_fk_presentacion FOREIGN KEY (fk_presentacion_cerveza_1, fk_presentacion_cerveza_2) 
        REFERENCES presentacion_cerveza (fk_presentacion, fk_cerveza)
);