/**
 * Tabla que almacena los diferentes estados que puede tener una orden
 * @param id - Identificador único del estado
 * @param nombre - Nombre descriptivo del estado
 */
CREATE TABLE status (
    id     SERIAL,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    CONSTRAINT status_pk PRIMARY KEY (id)
);

/**
 * Tabla que relaciona los estados con las mensualidades
 * @param fecha_actualización - Fecha en que se actualizó el estado
 * @param fecha_fin - Fecha en que finaliza el estado (opcional)
 * @param fk_status - Referencia al estado
 * @param fk_mensualidad_1 - Referencia a la afiliación de la mensualidad
 * @param fk_mensualidad_2 - Referencia al RIF del miembro
 * @param fk_mensualidad_3 - Referencia a la naturaleza del RIF del miembro
 */
CREATE TABLE status_mensualidad (
    fecha_actualización DATE NOT NULL,
    fecha_fin           DATE,
    fk_status           INTEGER NOT NULL,
    fk_mensualidad_1    INTEGER NOT NULL,
    fk_mensualidad_2    INTEGER NOT NULL,
    fk_mensualidad_3    CHAR(1) NOT NULL,
    /* Primary key Constraint */
    CONSTRAINT status_mensualidad_pk 
        PRIMARY KEY (fk_status, fk_mensualidad_1, fk_mensualidad_2, fk_mensualidad_3),
    /* Foreign key Constraints */
    CONSTRAINT status_mensualidad_mensualidad_fk
        FOREIGN KEY (fk_mensualidad_1, fk_mensualidad_2, fk_mensualidad_3)
            REFERENCES mensualidad (fk_afiliacion, fk_miembro_2, fk_miembro_1),
    CONSTRAINT status_mensualidad_status_fk 
        FOREIGN KEY (fk_status)
            REFERENCES status (id)
);

/**
 * Tabla que relaciona los estados con las órdenes de compra y reposición
 * @param fec-- Reset sequences for status tables
ALTER SEQUENCE status_id_seq RESTART WITH 1;

-- Note: Only status table has a SERIAL column (id)
-- Other tables use foreign keys or composite primary keys 
 * @param fecha_fin - Fecha en que finaliza el estado (opcional)
 * @param fk_orden_compra - Referencia a la orden de compra
 * @param fk_status - Referencia al estado
 * @param fk_orden_reposicion - Referencia a la orden de reposición
 */
CREATE TABLE status_orden (
    fecha_actualización DATE NOT NULL,
    fecha_fin           DATE,
    fk_orden_de_compra  INTEGER,
    fk_status           INTEGER NOT NULL,
    fk_orden_de_reposicion INTEGER,
    /* Primary key Constraint */
    CONSTRAINT status_orden_pk 
        PRIMARY KEY (fk_status),
    /* Foreign key Constraints */
    CONSTRAINT status_orden_compra_fk 
        FOREIGN KEY (fk_orden_de_compra)
            REFERENCES orden_de_compra (id),
    CONSTRAINT status_orden_reposicion_fk 
        FOREIGN KEY (fk_orden_de_reposicion)
            REFERENCES orden_de_reposicion (id),
    CONSTRAINT status_orden_status_fk 
        FOREIGN KEY (fk_status)
            REFERENCES status (id),
    /* Arc relationship constraint - ensures exactly onestatus_orden_arc_check order type is specified */
    CONSTRAINT chk_arc_status_orden
        CHECK (
            (fk_orden_de_compra IS NOT NULL AND fk_orden_de_reposicion IS NULL) OR
            (fk_orden_de_compra IS NULL AND fk_orden_de_reposicion IS NOT NULL)
        )
);

/**
 * Tabla que relaciona los estados con las ventas y eventos
 * @param fecha_actualización - Fecha en que se actualizó el estado
 * @param fecha_fin - Fecha en que finaliza el estado (opcional)
 * @param fk_status - Referencia al estado
 * @param fk_venta - Referencia a la venta
 * @param fk_venta_evento - Referencia a la venta de evento
 */
CREATE TABLE status_venta (
    fecha_actualización DATE NOT NULL,
    fecha_fin           DATE,
    fk_status          INTEGER NOT NULL,
    fk_venta           INTEGER, 
    fk_venta_evento    INTEGER,
    /* Primary key Constraint */
    CONSTRAINT status_venta_pk 
        PRIMARY KEY (fk_status),
    /* Foreign key Constraints */
    CONSTRAINT status_venta_status_fk 
        FOREIGN KEY (fk_status)
            REFERENCES status (id),
    CONSTRAINT status_venta_venta_fk
        FOREIGN KEY (fk_venta)
            REFERENCES venta (id),
    CONSTRAINT status_venta_venta_evento_fk
        FOREIGN KEY (fk_venta_evento)
            REFERENCES venta_evento (id),
    /* Arc relationship constraint - ensures exactly one of fk_venta or fk_venta_evento is specified */
    CONSTRAINT chk_arc_status_venta
        CHECK (
            (fk_venta IS NOT NULL AND fk_venta_evento IS NULL) OR
            (fk_venta IS NULL AND fk_venta_evento IS NOT NULL)
        )
);