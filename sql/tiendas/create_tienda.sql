/**
 * Tabla para almacenar información de las tiendas físicas
 * @param id - Identificador único de la tienda física (SERIAL)
 * @param direccion - Dirección física de la tienda
 * @param fk_lugar - Referencia a la ubicación de la tienda
 */
CREATE TABLE tienda_fisica (
    id SERIAL,
    direccion VARCHAR(255) NOT NULL,
    fk_lugar INTEGER NOT NULL,
    CONSTRAINT tienda_fisica_pk PRIMARY KEY (id),
    CONSTRAINT tienda_fisica_lugar_fk FOREIGN KEY (fk_lugar) REFERENCES lugar(id)
);

/**
 * Tabla para almacenar información de las tiendas web
 * @param id - Identificador único de la tienda web (SERIAL)
 * @param dominio_web - Dominio web de la tienda
 */
CREATE TABLE tienda_web (
    id SERIAL,
    dominio_web VARCHAR(255) NOT NULL,
    CONSTRAINT tienda_web_pk PRIMARY KEY (id)
);

/**
 * Tabla para almacenar información de los almacenes
 * @param id - Identificador único del almacén (SERIAL)
 * @param direccion - Dirección física del almacén
 * @param fk_tienda_fisica - Referencia a la tienda física asociada
 * @param fk_tienda_web - Referencia a la tienda web asociada
 * @param fk_lugar - Referencia a la ubicación del almacén
 */
CREATE TABLE almacen (
    id SERIAL,
    direccion VARCHAR(255) NOT NULL,
    fk_tienda_fisica INTEGER,
    fk_tienda_web INTEGER,
    fk_lugar INTEGER NOT NULL,
    CONSTRAINT almacen_pk PRIMARY KEY (id),
    CONSTRAINT almacen_lugar_fk FOREIGN KEY (fk_lugar) REFERENCES lugar(id),
    CONSTRAINT almacen_tienda_fisica_fk FOREIGN KEY (fk_tienda_fisica) REFERENCES tienda_fisica(id),
    CONSTRAINT almacen_tienda_web_fk FOREIGN KEY (fk_tienda_web) REFERENCES tienda_web(id),

    CONSTRAINT chk_arc_almacen CHECK (
        (fk_tienda_fisica IS NOT NULL AND fk_tienda_web IS NULL) OR
        (fk_tienda_fisica IS NULL AND fk_tienda_web IS NOT NULL)
    )
);

/**
 * Tabla para gestionar el inventario de los almacenes
 * @param cantidad_almacen - Cantidad de productos en el almacén
 * @param fk_presentacion_cerveza_1 - Primera parte de la clave foránea compuesta
 * @param fk_presentacion_cerveza_2 - Segunda parte de la clave foránea compuesta
 * @param fk_almacen - Referencia al almacén
 */
CREATE TABLE inventario (
    cantidad_almacen INTEGER NOT NULL,
    fk_presentacion_cerveza_1 INTEGER NOT NULL,
    fk_presentacion_cerveza_2 INTEGER NOT NULL,
    fk_almacen INTEGER NOT NULL,
    CONSTRAINT inventario_pk PRIMARY KEY (fk_presentacion_cerveza_1, fk_presentacion_cerveza_2, fk_almacen),
    CONSTRAINT inventario_almacen_fk FOREIGN KEY (fk_almacen) REFERENCES almacen(id),
    CONSTRAINT inventario_presentacion_cerveza_fk FOREIGN KEY (fk_presentacion_cerveza_1, fk_presentacion_cerveza_2) 
        REFERENCES presentacion_cerveza(fk_presentacion, fk_cerveza)
);

/**
 * Tabla para gestionar los lugares dentro de las tiendas
 * @param id - Identificador único del lugar
 * @param nombre - Nombre del lugar
 * @param tipo - Tipo de lugar
 * @param fk_tienda_fisica - Referencia a la tienda física
 * @param fk_lugar_tienda_1 - Primera parte de la clave foránea compuesta para auto-referencia
 * @param fk_lugar_tienda_2 - Segunda parte de la clave foránea compuesta para auto-referencia
 */
CREATE TABLE lugar_tienda (
    id SERIAL,
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(25) NOT NULL CHECK (tipo IN ('anaquel', 'zona_pasillo', 'pasillo')),
    fk_tienda_fisica INTEGER NOT NULL,
    fk_lugar_tienda_1 INTEGER,
    fk_lugar_tienda_2 INTEGER,
    CONSTRAINT lugar_tienda_pk PRIMARY KEY (id),
    CONSTRAINT lugar_tienda_tienda_fisica_fk FOREIGN KEY (fk_tienda_fisica) REFERENCES tienda_fisica(id),
    CONSTRAINT lugar_tienda_lugar_tienda_fk FOREIGN KEY (fk_lugar_tienda_1, fk_tienda_fisica) 
        REFERENCES lugar_tienda(id, fk_tienda_fisica) DEFERRABLE INITIALLY DEFERRED
);

/**
 * Tabla para gestionar el inventario en los lugares de las tiendas
 * @param cantidad - Cantidad de productos en el lugar
 * @param id - Identificador del lugar
 * @param id1 - Identificador de la tienda física
 * @param id2 - Primera parte de la clave foránea compuesta del inventario
 * @param sku - Segunda parte de la clave foránea compuesta del inventario
 * @param id11 - Tercera parte de la clave foránea compuesta del inventario
 */
CREATE TABLE lugar_tienda_inventario (
    cantidad INTEGER NOT NULL,
    fk_lugar_tienda_1 INTEGER NOT NULL,
    fk_lugar_tienda_2 INTEGER NOT NULL,
    fk_inventario_1 INTEGER NOT NULL,
    fk_inventario_2 INTEGER NOT NULL,
    fk_inventario_3 INTEGER NOT NULL,
    CONSTRAINT lugar_tienda_inventario_pk PRIMARY KEY (fk_lugar_tienda_1, fk_lugar_tienda_2, fk_inventario_1, fk_inventario_2, fk_inventario_3),
    CONSTRAINT lugar_tienda_inventario_lugar_tienda_fk FOREIGN KEY (fk_lugar_tienda_1) 
        REFERENCES lugar_tienda(id),
    CONSTRAINT lugar_tienda_inventario_inventario_fk FOREIGN KEY (fk_inventario_1, fk_inventario_2, fk_inventario_3) 
        REFERENCES inventario(fk_presentacion_cerveza_1, fk_presentacion_cerveza_2, fk_almacen)
);

/**
 * Tabla que almacena las órdenes de reposición de inventario
 * @param id - Identificador único de la orden
 * @param fecha_orden - Fecha en que se realizó la orden
 * @param observacion - Observaciones adicionales sobre la orden
 * @param unidades - Cantidad de unidades solicitadas
 * @param fk_lugar_tienda_1 - Referencia a la primera parte de la clave del lugar en la tienda
 * @param fk_lugar_tienda_2 - Referencia a la segunda parte de la clave del lugar en la tienda
 * @param fk_inventario_1 - Referencia a la primera parte de la clave del inventario (presentación)
 * @param fk_inventario_2 - Referencia a la segunda parte de la clave del inventario (cerveza)
 * @param fk_inventario_3 - Referencia a la tercera parte de la clave del inventario (almacén)
 * @param fk_empleado - Referencia al empleado que realizó la orden
 */
CREATE TABLE orden_de_reposicion (
    id              SERIAL,
    fecha_orden     DATE NOT NULL,
    observacion     VARCHAR(100),
    unidades        INTEGER NOT NULL,
    fk_lugar_tienda_1 INTEGER NOT NULL,
    fk_lugar_tienda_2 INTEGER NOT NULL,
    fk_inventario_1   INTEGER NOT NULL,
    fk_inventario_2   INTEGER NOT NULL,
    fk_inventario_3   INTEGER NOT NULL,
    fk_empleado     INTEGER,
    /* Primary key Constraint */
    CONSTRAINT orden_reposicion_pk 
        PRIMARY KEY (id),
    /* Foreign key Constraints */
    CONSTRAINT orden_reposicion_empleado_fk 
        FOREIGN KEY (fk_empleado)
            REFERENCES empleado (id),
    CONSTRAINT orden_reposicion_inventario_fk
        FOREIGN KEY (fk_lugar_tienda_1, fk_lugar_tienda_2, fk_inventario_1, fk_inventario_2, fk_inventario_3)
            REFERENCES lugar_tienda_inventario (fk_lugar_tienda_1, fk_lugar_tienda_2, fk_inventario_1, fk_inventario_2, fk_inventario_3)
);