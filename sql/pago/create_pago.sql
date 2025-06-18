/**
 * Tabla que almacena todos los metodos de pago disponibles
 * @param id - Identificador único del metodo de pago
 * @param tipo - Tipo de metodo de pago (efectivo, tarjeta_credito, punto, cheque, tarjeta_debito)
 * @param denominación - Denominación del billete o moneda (para efectivo)
 * @param tipo_tarjeta - Tipo de tarjeta (para tarjetas)
 * @param número - Número de tarjeta o cuenta
 * @param banco - Banco emisor (para tarjetas y cheques)
 * @param fecha_vencimiento - Fecha de vencimiento (para tarjetas)
 * @param número_cheque - Número del cheque (para cheques)
 * @param fecha_adquisicion - Fecha de adquisición (para puntos)
 * @param fecha_canjeo - Fecha de canjeo (para puntos)
 */
CREATE TABLE metodo_pago (
    id                SERIAL,
    tipo              VARCHAR(50) NOT NULL CHECK (tipo IN ('efectivo', 'tarjeta_credito', 'punto', 'cheque', 'tarjeta_debito')),
    denominación      VARCHAR(50),
    tipo_tarjeta      VARCHAR(50),
    número            INTEGER UNIQUE,
    banco             VARCHAR(50),
    fecha_vencimiento DATE,
    número_cheque     INTEGER UNIQUE,
    fecha_adquisicion DATE,
    fecha_canjeo      DATE,
    CONSTRAINT metodo_pago_pk PRIMARY KEY (id),
    CONSTRAINT chk_efectivo CHECK (
        (tipo = 'efectivo' AND denominación IS NOT NULL AND 
         tipo_tarjeta IS NULL AND número IS NULL AND banco IS NULL AND 
         fecha_vencimiento IS NULL AND número_cheque IS NULL AND 
         fecha_adquisicion IS NULL AND fecha_canjeo IS NULL) OR
        (tipo != 'efectivo')
    ),
    CONSTRAINT chk_tarjeta_credito CHECK (
        (tipo = 'tarjeta_credito' AND tipo_tarjeta IS NOT NULL AND 
         número IS NOT NULL AND banco IS NOT NULL AND 
         fecha_vencimiento IS NOT NULL AND denominación IS NULL AND 
         número_cheque IS NULL AND fecha_adquisicion IS NULL AND 
         fecha_canjeo IS NULL) OR
        (tipo != 'tarjeta_credito')
    ),
    CONSTRAINT chk_punto CHECK (
        (tipo = 'punto' AND fecha_adquisicion IS NOT NULL AND 
         denominación IS NULL AND tipo_tarjeta IS NULL AND 
         número IS NULL AND banco IS NULL AND 
         fecha_vencimiento IS NULL AND número_cheque IS NULL) OR
        (tipo != 'punto')
    ),
    CONSTRAINT chk_cheque CHECK (
        (tipo = 'cheque' AND número_cheque IS NOT NULL AND 
         banco IS NOT NULL AND número IS NOT NULL AND 
         denominación IS NULL AND tipo_tarjeta IS NULL AND 
         fecha_vencimiento IS NULL AND fecha_adquisicion IS NULL AND 
         fecha_canjeo IS NULL) OR
        (tipo != 'cheque')
    ),
    CONSTRAINT chk_tarjeta_debito CHECK (
        (tipo = 'tarjeta_debito' AND número IS NOT NULL AND 
         banco IS NOT NULL AND fecha_vencimiento IS NOT NULL AND 
         denominación IS NULL AND tipo_tarjeta IS NULL AND 
         número_cheque IS NULL AND fecha_adquisicion IS NULL AND 
         fecha_canjeo IS NULL) OR
        (tipo != 'tarjeta_debito')
    )
); 

CREATE TABLE afiliacion (
    id            SERIAL,
    monto_mensual DECIMAL(10,2) NOT NULL,
    fecha_inicio  DATE NOT NULL,
    CONSTRAINT afiliacion_pk PRIMARY KEY (id)
);

/**
 * Tabla que almacena las mensualidades de los miembros
 * @param fecha_máxima_pago - Fecha límite para realizar el pago de la mensualidad
 * @param fk_afiliacion - Referencia a la afiliación
 * @param fk_miembro_1 - Referencia a la naturaleza del RIF del miembro
 * @param fk_miembro_2 - Referencia al RIF del miembro
 */
CREATE TABLE mensualidad (
    fecha_máxima_pago DATE NOT NULL,
    fk_afiliacion     INTEGER NOT NULL,
    fk_miembro_1      CHAR(1) NOT NULL,
    fk_miembro_2      INTEGER NOT NULL,
    CONSTRAINT mensualidad_pk PRIMARY KEY (fk_afiliacion, fk_miembro_2, fk_miembro_1),
    CONSTRAINT mensualidad_afiliacion_fk FOREIGN KEY (fk_afiliacion)
        REFERENCES afiliacion(id),
    CONSTRAINT mensualidad_miembro_fk FOREIGN KEY (fk_miembro_2, fk_miembro_1)
        REFERENCES miembro(rif, naturaleza_rif)
);

/**
 * Tabla que almacena los metodos de pago asociados a cada miembro
 * @param rif - RIF del miembro
 * @param naturaleza_rif - Naturaleza del RIF del miembro
 * @param id - Identificador del metodo de pago
 */
CREATE TABLE miembro_metodo_pago (
    rif            INTEGER NOT NULL,
    naturaleza_rif CHAR(1) NOT NULL,
    id             INTEGER NOT NULL,
    /* Primary key Constraint */
    CONSTRAINT miembro_metodo_pago_pk 
        PRIMARY KEY (rif, naturaleza_rif, id),
    /* Foreign key Constraints */
    CONSTRAINT miembro_metodo_pago_miembro_fk 
        FOREIGN KEY (rif, naturaleza_rif)
            REFERENCES miembro (rif, naturaleza_rif),
    CONSTRAINT miembro_metodo_pago_metodo_fk 
        FOREIGN KEY (id)
            REFERENCES metodo_pago (id)
);

/**
 * Tabla que almacena los metodos de pago asociados a cada cliente
 * @param fk_metodo_pago - Referencia al metodo de pago
 * @param fk_cliente_natural - Referencia al cliente natural (debe ser NULL si hay cliente jurídico)
 * @param fk_cliente_juridico - Referencia al cliente jurídico (debe ser NULL si hay cliente natural)
 */
CREATE TABLE cliente_metodo_pago (
    fk_metodo_pago       INTEGER NOT NULL,
    fk_cliente_natural   INTEGER,
    fk_cliente_juridico  INTEGER,
    CONSTRAINT cliente_metodo_pago_pk PRIMARY KEY (fk_metodo_pago),
    CONSTRAINT cliente_metodo_pago_metodo_fk FOREIGN KEY (fk_metodo_pago)
        REFERENCES metodo_pago(id),
    CONSTRAINT cliente_metodo_pago_natural_fk FOREIGN KEY (fk_cliente_natural)
        REFERENCES cliente_natural(id),
    CONSTRAINT cliente_metodo_pago_juridico_fk FOREIGN KEY (fk_cliente_juridico)
        REFERENCES cliente_juridico(id),
    CONSTRAINT chk_arc_cliente_metodo_pago CHECK (
        (fk_cliente_natural IS NOT NULL AND fk_cliente_juridico IS NULL) OR
        (fk_cliente_juridico IS NOT NULL AND fk_cliente_natural IS NULL)
    )
);

/**
 * Tabla que almacena las tasas de cambio de monedas
 * @param id - Identificador único de la tasa
 * @param moneda - Nombre de la moneda
 * @param monto_equivalencia - Monto equivalente en bolívares
 * @param fecha_inicio - Fecha en que inicia la vigencia de la tasa
 * @param fecha_fin - Fecha en que finaliza la vigencia de la tasa (NULL si está vigente)
 */
CREATE TABLE tasa (
    id                 SERIAL,
    moneda             VARCHAR(25) NOT NULL,
    monto_equivalencia DECIMAL(10,2) NOT NULL,
    fecha_inicio       DATE NOT NULL,
    fecha_fin          DATE,
    CONSTRAINT tasa_pk PRIMARY KEY (id)
);

CREATE UNIQUE INDEX idx_tasa_unica_por_dia ON tasa (moneda, fecha_inicio);

/**
 * Tabla que almacena los pagos realizados en el sistema
 * @param id - Identificador único del pago
 * @param monto - Monto del pago
 * @param fecha_pago - Fecha en que se realizó el pago
 * @param fk_tasa - Referencia a la tasa de cambio utilizada
 * @param fk_mensualidad_1 - Referencia a la afiliación de la mensualidad
 * @param fk_mensualidad_2 - Referencia al RIF del miembro en la mensualidad
 * @param fk_mensualidad_3 - Referencia a la naturaleza del RIF del miembro en la mensualidad
 * @param fk_venta - Referencia a la venta asociada
 * @param fk_orden_de_compra - Referencia a la orden de compra
 * @param fk_venta_evento - Referencia a la venta de evento
 * @param fk_miembro_metodo_pago_3 - Referencia al RIF del miembro en el método de pago
 * @param fk_miembro_metodo_pago_2 - Referencia a la naturaleza del RIF del miembro en el método de pago
 * @param fk_miembro_metodo_pago_1 - Referencia al ID del método de pago del miembro
 * @param fk_cliente_metodo_pago_1 - Referencia al ID del método de pago del cliente
 * @param fk_cliente_metodo_pago_2 - Referencia al ID adicional del método de pago del cliente
 */
CREATE TABLE pago (
    id                       SERIAL,
    monto                    FLOAT(2) NOT NULL,
    fecha_pago               DATE NOT NULL,
    fk_tasa                  INTEGER NOT NULL,
    fk_mensualidad_1         INTEGER NOT NULL,
    fk_mensualidad_2         INTEGER NOT NULL,
    fk_mensualidad_3         CHAR(1) NOT NULL,
    fk_venta                 INTEGER NOT NULL,
    fk_orden_de_compra       INTEGER NOT NULL,
    fk_venta_evento          INTEGER NOT NULL,
    fk_miembro_metodo_pago_3 INTEGER,
    fk_miembro_metodo_pago_2 CHAR(1),
    fk_miembro_metodo_pago_1 INTEGER,
    fk_cliente_metodo_pago_1 INTEGER,
    fk_cliente_metodo_pago_2 INTEGER,
    CONSTRAINT pago_pk PRIMARY KEY (id),
    CONSTRAINT chk_arc_pago CHECK (
        ((fk_miembro_metodo_pago_3 IS NOT NULL AND 
          fk_miembro_metodo_pago_2 IS NOT NULL AND 
          fk_miembro_metodo_pago_1 IS NOT NULL AND 
          fk_cliente_metodo_pago_1 IS NULL AND 
          fk_cliente_metodo_pago_2 IS NULL) OR
         (fk_cliente_metodo_pago_1 IS NOT NULL AND 
          fk_cliente_metodo_pago_2 IS NOT NULL AND 
          fk_miembro_metodo_pago_3 IS NULL AND 
          fk_miembro_metodo_pago_2 IS NULL AND 
          fk_miembro_metodo_pago_1 IS NULL))
    ),
    CONSTRAINT pago_fk_cliente_metodo_pago FOREIGN KEY (fk_cliente_metodo_pago_1)
        REFERENCES cliente_metodo_pago (fk_metodo_pago),
    CONSTRAINT pago_fk_mensualidad FOREIGN KEY (fk_mensualidad_1, fk_mensualidad_2, fk_mensualidad_3)
        REFERENCES mensualidad (fk_afiliacion, fk_miembro_2, fk_miembro_1),
    CONSTRAINT pago_fk_miembro_metodo_pago FOREIGN KEY (fk_miembro_metodo_pago_3, fk_miembro_metodo_pago_2, fk_miembro_metodo_pago_1)
        REFERENCES miembro_metodo_pago (rif, naturaleza_rif, id),
    CONSTRAINT pago_fk_orden_de_compra FOREIGN KEY (fk_orden_de_compra)
        REFERENCES orden_de_compra (id),
    CONSTRAINT pago_fk_tasa FOREIGN KEY (fk_tasa)
        REFERENCES tasa (id),
    CONSTRAINT pago_fk_venta_evento FOREIGN KEY (fk_venta_evento)
        REFERENCES venta_evento (id),
    CONSTRAINT pago_fk_venta FOREIGN KEY (fk_venta)
        REFERENCES venta (id)
);