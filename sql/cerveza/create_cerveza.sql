/**
 * Tabla que almacena los colores de cerveza según escala SRM
 * @param srm - Valor SRM (Standard Reference Method) del color
 * @param cod_hexadecimal - Código hexadecimal del color
 */
CREATE TABLE color (
    srm             INTEGER,
    cod_hexadecimal VARCHAR(7) NOT NULL,
    CONSTRAINT color_pk PRIMARY KEY (srm)
);

/**
 * Tabla que almacena las características que pueden tener las cervezas
 * @param id - Identificador único de la característica
 * @param nombre - Nombre de la característica
 * @param tipo - Tipo de característica
 */
CREATE TABLE caracteristica (
    id     SERIAL,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    tipo   VARCHAR(50) NOT NULL CHECK (tipo IN ('numerica', 'textual')),
    CONSTRAINT caracteristica_pk PRIMARY KEY (id)
);

/**
 * Tabla que almacena los ingredientes utilizados en las cervezas
 * @param id - Identificador único del ingrediente
 * @param nombre - Nombre del ingrediente
 * @param descripcion - Descripción del ingrediente
 * @param medida - Unidad de medida del ingrediente
 * @param fk_ingrediente - ID del ingrediente padre (para jerarquía)
 */
CREATE TABLE ingrediente (
    id             SERIAL,
    nombre         VARCHAR(255) NOT NULL UNIQUE,
    descripcion    TEXT,
    medida         CHAR(5) NOT NULL,
    fk_ingrediente INTEGER,
    CONSTRAINT ingrediente_pk PRIMARY KEY (id),
    CONSTRAINT ingrediente_fk_ingrediente FOREIGN KEY (fk_ingrediente) REFERENCES ingrediente(id)  DEFERRABLE INITIALLY DEFERRED
);  

/**
 * Tabla que almacena los tipos de cerveza
 * @param id - Identificador único del tipo de cerveza
 * @param nombre - Nombre del tipo de cerveza
 * @param id1 - ID del tipo de cerveza padre (para jerarquía)
 * @param fk_color_superior - ID del color superior del rango
 * @param fk_color_inferior - ID del color inferior del rango
 */
CREATE TABLE tipo_cerveza (
    id                SERIAL,
    nombre            VARCHAR(255) NOT NULL UNIQUE,
    fk_tipo_cerveza   INTEGER,
    fk_color_superior INTEGER,
    fk_color_inferior INTEGER,
    CONSTRAINT tipo_cerveza_pk PRIMARY KEY (id),
    CONSTRAINT tipo_cerveza_fk_color_inferior FOREIGN KEY (fk_color_inferior) REFERENCES color(srm),
    CONSTRAINT tipo_cerveza_fk_color_superior FOREIGN KEY (fk_color_superior) REFERENCES color(srm),
    CONSTRAINT tipo_cerveza_fk_tipo_cerveza FOREIGN KEY (fk_tipo_cerveza) REFERENCES tipo_cerveza(id)
);

/**
 * Tabla que almacena las cervezas específicas
 * @param id - Identificador único de la cerveza
 * @param nombre - Nombre de la cerveza
 * @param fk_tipo_cerveza - ID del tipo de cerveza al que pertenece
 */
CREATE TABLE cerveza (
    id              SERIAL,
    nombre          VARCHAR(255) NOT NULL,
    fk_tipo_cerveza INTEGER NOT NULL,
    CONSTRAINT cerveza_pk PRIMARY KEY (id),
    CONSTRAINT cerveza_fk_tipo_cerveza FOREIGN KEY (fk_tipo_cerveza) REFERENCES tipo_cerveza(id)
);

/**
 * Tabla que relaciona las características con las cervezas
 * Almacena los valores específicos de cada característica para cada cerveza
 * @param valor_rango_inferior - Valor mínimo del rango de la característica
 * @param valor_rango_superior - Valor máximo del rango de la característica
 * @param descripcion - Descripción adicional de la característica
 * @param fk_cerveza - ID de la cerveza
 * @param fk_tipo_cerveza - ID del tipo de cerveza
 * @param fk_caracteristica - ID de la característica
 */
CREATE TABLE cerveza_caracteristica (
    id SERIAL,
    valor_rango_inferior DECIMAL(10,2),
    valor_rango_superior DECIMAL(10,2),
    descripcion          TEXT,
    fk_cerveza           INTEGER,
    fk_tipo_cerveza      INTEGER,
    fk_caracteristica    INTEGER NOT NULL,
    -- Pk compuesta
    CONSTRAINT cerveza_caracteristica_pk PRIMARY KEY (id),
    -- Fk
    CONSTRAINT cerveza_caracteristica_fk_caracteristica FOREIGN KEY (fk_caracteristica) REFERENCES caracteristica(id),
    CONSTRAINT cerveza_caracteristica_fk_cerveza FOREIGN KEY (fk_cerveza) REFERENCES cerveza(id),
    CONSTRAINT cerveza_caracteristica_fk_tipo_cerveza FOREIGN KEY (fk_tipo_cerveza) REFERENCES tipo_cerveza(id),

    CONSTRAINT chk_arc_cerveza_caracteristica CHECK (
        (fk_cerveza IS NOT NULL AND fk_tipo_cerveza IS NULL) OR
        (fk_cerveza IS NULL AND fk_tipo_cerveza IS NOT NULL)
    )

    -- NOTA: La validación de que características numéricas no tengan descripción
    -- debe manejarse a nivel de aplicación, ya que PostgreSQL no permite
    -- subqueries en check constraints
);

/**
 * Tabla que relaciona los ingredientes con los tipos de cerveza
 * @param cantidad - Cantidad del ingrediente necesaria
 * @param fk_ingrediente - ID del ingrediente
 * @param fk_tipo_cerveza - ID del tipo de cerveza
 */
CREATE TABLE tipo_cerveza_ingrediente (
    cantidad        INTEGER,
    fk_ingrediente  INTEGER NOT NULL,
    fk_tipo_cerveza INTEGER NOT NULL,
    CONSTRAINT tipo_cerveza_ingrediente_pk PRIMARY KEY (fk_ingrediente, fk_tipo_cerveza),
    CONSTRAINT tipo_cerveza_ingrediente_fk_ingrediente FOREIGN KEY (fk_ingrediente) REFERENCES ingrediente(id),
    CONSTRAINT tipo_cerveza_ingrediente_fk_tipo_cerveza FOREIGN KEY (fk_tipo_cerveza) REFERENCES tipo_cerveza(id)
);

/**
 * Tabla que almacena los períodos de descuento disponibles
 * @param id - Identificador único del período de descuento
 * @param fecha_inicio - Fecha de inicio del período de descuento
 * @param fecha_fin - Fecha de fin del período de descuento
 */
CREATE TABLE periodo_descuento (
    id           SERIAL,
    fecha_inicio DATE NOT NULL,
    fecha_fin    DATE NOT NULL,
    CONSTRAINT periodo_descuento_pk PRIMARY KEY (id)
);

/**
 * Tabla que almacena las presentaciones de productos
 * @param sku - Código SKU único de la presentación
 * @param nombre - Nombre de la presentación
 * @param descripcion - Descripción de la presentación
 * @param monto - Monto o precio de la presentación
 */
CREATE TABLE presentacion (
    id          SERIAL,
    nombre      VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    unidades    INTEGER NOT NULL,
    CONSTRAINT presentacion_pk PRIMARY KEY (id)
);

/**
 * Tabla que relaciona las presentaciones con las cervezas
 * @param id - Identificador único de la relación
 * @param sku - SKU de la presentación
 * @param fk_cerveza - ID de la cerveza
 */
CREATE TABLE presentacion_cerveza (
    sku           VARCHAR(20) UNIQUE,
    precio        DECIMAL(10,2) NOT NULL,
    fk_presentacion INTEGER NOT NULL,
    fk_cerveza      INTEGER NOT NULL,
    imagen          VARCHAR(2083), -- URL de la imagen
    CONSTRAINT presentacion_cerveza_pk PRIMARY KEY (fk_presentacion, fk_cerveza),
    CONSTRAINT presentacion_cerveza_fk_presentacion FOREIGN KEY (fk_presentacion) REFERENCES presentacion(id),
    CONSTRAINT presentacion_cerveza_fk_cerveza FOREIGN KEY (fk_cerveza) REFERENCES cerveza(id)
);

/**
 * Tabla que almacena los descuentos aplicables
 * @param monto - Monto fijo del descuento
 * @param porcentaje - Porcentaje de descuento
 * @param id - ID del período de descuento
 * @param id1 - ID de la presentación-cerveza
 * @param sku - SKU de la presentación
 */
CREATE TABLE descuento (
    monto       INTEGER NOT NULL,
    porcentaje  INTEGER NOT NULL,
    fk_descuento          INTEGER NOT NULL,
    fk_presentacion_cerveza_1 INTEGER NOT NULL,
    fk_presentacion_cerveza_2 INTEGER NOT NULL,
    CONSTRAINT descuento_pk PRIMARY KEY (fk_descuento, fk_presentacion_cerveza_1, fk_presentacion_cerveza_2),
    CONSTRAINT descuento_fk_periodo_descuento FOREIGN KEY (fk_descuento) REFERENCES periodo_descuento(id),
    CONSTRAINT descuento_fk_presentacion_cerveza FOREIGN KEY (fk_presentacion_cerveza_1, fk_presentacion_cerveza_2) REFERENCES presentacion_cerveza(fk_presentacion, fk_cerveza)
);

