/**
 * Tabla que almacena los diferentes tipos de eventos que se pueden realizar
 * @param id - Identificador único del tipo de evento
 * @param nombre - Nombre del tipo de evento
 */
CREATE TABLE tipo_evento (
    id     SERIAL,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    CONSTRAINT tipo_evento_pk PRIMARY KEY (id)
);

/**
 * Tabla que almacena los diferentes tipos de invitados que pueden asistir a un evento
 * @param id - Identificador único del tipo de invitado
 * @param nombre - Nombre del tipo de invitado
 */
CREATE TABLE tipo_invitado (
    id     SERIAL,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    CONSTRAINT tipo_invitado_pk PRIMARY KEY (id)
);

/**
 * Tabla que almacena la información de los invitados a los eventos
 * @param id - Identificador único del invitado
 * @param ci - Número de cédula de identidad del invitado
 * @param primer_nombre - Primer nombre del invitado
 * @param primer_apellido - Primer apellido del invitado
 * @param fk_tipo_invitado - Referencia al tipo de invitado
 */
CREATE TABLE invitado (
    id               SERIAL,
    ci               INTEGER NOT NULL,
    nacionalidad     VARCHAR(1) NOT NULL CHECK (nacionalidad IN ('V', 'E')),
    primer_nombre    VARCHAR(50) NOT NULL,
    primer_apellido  VARCHAR(50) NOT NULL,
    fk_tipo_invitado INTEGER NOT NULL,

    CONSTRAINT chk_invitado_unico UNIQUE (ci, nacionalidad),

    CONSTRAINT invitado_pk PRIMARY KEY (id),
    CONSTRAINT invitado_tipo_invitado_fk FOREIGN KEY (fk_tipo_invitado) REFERENCES tipo_invitado(id)
);

/**
 * Tabla que almacena la información de los eventos
 * @param id - Identificador único del evento
 * @param nombre - Nombre del evento
 * @param descripción - Descripción detallada del evento
 * @param dirección - Dirección donde se realizará el evento
 * @param fecha_hora_inicio - Fecha y hora de inicio del evento
 * @param fecha_hora_fin - Fecha y hora de finalización del evento
 * @param precio_entrada - Precio de la entrada al evento
 * @param fk_tipo_evento - Referencia al tipo de evento
 * @param fk_lugar - Referencia al lugar donde se realizará el evento
 */
CREATE TABLE evento (
    id                SERIAL,
    nombre            VARCHAR(100) NOT NULL,
    descripción       VARCHAR(500) NOT NULL,
    dirección         VARCHAR(255) NOT NULL,
    fecha_hora_inicio DATE NOT NULL,
    fecha_hora_fin    DATE NOT NULL,
    precio_entrada    FLOAT(2),
    fk_tipo_evento    INTEGER NOT NULL,
    fk_lugar          INTEGER NOT NULL,
    CONSTRAINT evento_pk PRIMARY KEY (id),
    /**
     * Constraint: Verifica que no existan eventos duplicados
     * Tipos: nombre (VARCHAR), fecha_hora_inicio (DATE)
     * Propósito: Asegura que la combinación de nombre y fecha_hora_inicio sea única
     */
    CONSTRAINT chk_evento_unico UNIQUE (nombre, fecha_hora_inicio), 
    CONSTRAINT evento_tipo_evento_fk FOREIGN KEY (fk_tipo_evento) REFERENCES tipo_evento(id),
    CONSTRAINT evento_lugar_fk FOREIGN KEY (fk_lugar) REFERENCES lugar(id)
);

/**
 * Tabla que almacena la relación entre invitados y eventos
 * @param fecha_hora_entrada - Fecha y hora en que el invitado ingresó al evento
 * @param fecha_hora_salida - Fecha y hora en que el invitado salió del evento
 * @param fk_evento - Referencia al evento
 * @param fk_invitado - Referencia al invitado
 */
CREATE TABLE invitado_evento (
    fecha_hora_entrada DATE,
    fecha_hora_salida  DATE,
    fk_evento          INTEGER NOT NULL,
    fk_invitado        INTEGER NOT NULL,
    CONSTRAINT invitado_evento_pk PRIMARY KEY (fk_evento, fk_invitado),
    CONSTRAINT invitado_evento_evento_fk FOREIGN KEY (fk_evento) REFERENCES evento(id),
    CONSTRAINT invitado_evento_invitado_fk FOREIGN KEY (fk_invitado) REFERENCES invitado(id)
);

/**
 * Tabla que almacena la relación entre eventos y sus clientes (naturales o jurídicos)
 * @param fk_evento - Referencia al evento
 * @param fk_cliente_juridico - Referencia al cliente jurídico (debe ser NULL si hay cliente natural)
 * @param fk_cliente_natural - Referencia al cliente natural (debe ser NULL si hay cliente jurídico)
 */
CREATE TABLE evento_cliente (
    id SERIAL,
    fk_evento           INTEGER NOT NULL,
    fk_cliente_juridico INTEGER,
    fk_cliente_natural  INTEGER,
    CONSTRAINT evento_cliente_pk PRIMARY KEY (id,fk_evento),
    CONSTRAINT evento_cliente_evento_fk FOREIGN KEY (fk_evento) REFERENCES evento(id),
    CONSTRAINT evento_cliente_juridico_fk FOREIGN KEY (fk_cliente_juridico) REFERENCES cliente_juridico(id),
    CONSTRAINT evento_cliente_natural_fk FOREIGN KEY (fk_cliente_natural) REFERENCES cliente_natural(id),
    CONSTRAINT chk_arc_evento_cliente_tipo_cliente CHECK (
        (fk_cliente_juridico IS NOT NULL AND fk_cliente_natural IS NULL) OR
        (fk_cliente_natural IS NOT NULL AND fk_cliente_juridico IS NULL)
    )
);

/**
 * Tabla que almacena el stock de cervezas por miembro en cada evento
 * @param cantidad - Cantidad de cervezas en stock
 * @param fk_miembro_1 - Referencia al RIF del miembro
 * @param fk_miembro_2 - Referencia a la naturaleza del RIF del miembro
 * @param fk_evento - Referencia al evento
 * @param fk_presentación_cerveza_1 - Referencia a la cerveza
 * @param fk_presentación_cerveza_2 - Referencia a la presentación
 */
CREATE TABLE stock_miembro (
    cantidad                  INTEGER NOT NULL,
    fk_miembro_1              INTEGER NOT NULL,
    fk_miembro_2              CHAR(1) NOT NULL,
    fk_evento                 INTEGER NOT NULL,
    fk_presentacion_cerveza_1 INTEGER NOT NULL,
    fk_presentacion_cerveza_2 INTEGER NOT NULL,
    CONSTRAINT stock_miembro_pk PRIMARY KEY (
        fk_evento,
        fk_miembro_1,
        fk_miembro_2,
        fk_presentacion_cerveza_1,
        fk_presentacion_cerveza_2
    ),
    CONSTRAINT stock_miembro_evento_fk FOREIGN KEY (fk_evento) 
        REFERENCES evento(id),
    CONSTRAINT stock_miembro_miembro_fk FOREIGN KEY (fk_miembro_1, fk_miembro_2) 
        REFERENCES miembro(rif, naturaleza_rif),
    CONSTRAINT stock_miembro_pres_cerveza_fk FOREIGN KEY (
        fk_presentacion_cerveza_1,
        fk_presentacion_cerveza_2
    ) REFERENCES presentacion_cerveza(fk_presentacion, fk_cerveza)
);