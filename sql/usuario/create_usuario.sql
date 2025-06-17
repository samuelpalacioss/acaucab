/** 
 * Script de creación de tablas para el módulo de usuario en PostgreSQL
 * Este archivo contiene la definición de todas las tablas relacionadas con usuarios, clientes, miembros y permisos
 */

/** 
 * Tabla: rol
 * Propósito: Catálogo de roles del sistema
 * Tipos: id (SERIAL), nombre (VARCHAR)
 */
CREATE TABLE rol (
    id     SERIAL,
    nombre VARCHAR(50) NOT NULL UNIQUE,

    /** Primary key constraint */
    CONSTRAINT rol_pk PRIMARY KEY (id)
);

/** 
 * Tabla: miembro
 * Propósito: Información de miembros de la organización
 * Tipos: rif (INTEGER), naturaleza_rif (CHAR), razón_social (VARCHAR), etc.
 * Nota: Primary key compuesta por rif y naturaleza_rif
 */
CREATE TABLE miembro (
    rif                    INTEGER NOT NULL,
    naturaleza_rif         CHAR(1) NOT NULL CHECK (naturaleza_rif IN ('J', 'V', 'P', 'E')),
    razón_social           VARCHAR(50) NOT NULL,
    denominación_comercial VARCHAR(50) NOT NULL,
    dirección_fiscal       VARCHAR(255) NOT NULL,
    dirección_física       VARCHAR(255) NOT NULL,
    dominio_web            VARCHAR(50),
    plazo_entrega          INTERVAL NOT NULL,
    fk_lugar_1             INTEGER NOT NULL,
    fk_lugar_2             INTEGER NOT NULL,
    
    /** Primary key constraint compuesta */
    CONSTRAINT miembro_pk PRIMARY KEY (rif, naturaleza_rif),
    
    /** Foreign key constraints */
    CONSTRAINT miembro_fk_lugar_1 FOREIGN KEY (fk_lugar_1) REFERENCES lugar(id),
    CONSTRAINT miembro_fk_lugar_2 FOREIGN KEY (fk_lugar_2) REFERENCES lugar(id),
    /**
     * Constraint: Verifica que no existan miembros duplicados
     * Tipos: rif (INTEGER), naturaleza_rif (CHAR)
     * Propósito: Asegura que la combinación de rif y naturaleza_rif sea única
     */
    CONSTRAINT chk_miembro_unico UNIQUE (rif, naturaleza_rif)
);

/** 
 * Tabla: correo
 * Propósito: Almacena direcciones de correo electrónico vinculadas a miembros
 * Tipos: id (SERIAL), dirección_correo (VARCHAR), fk_miembro_1 (INTEGER), fk_miembro_2 (CHAR)
 */
CREATE TABLE correo (
    id               SERIAL,
    dirección_correo VARCHAR(255) NOT NULL UNIQUE,
    fk_miembro_1     INTEGER,
    fk_miembro_2     CHAR(1),
    
    /** Primary key constraint */
    CONSTRAINT correo_pk PRIMARY KEY (id),
    
    /** Foreign key constraints */
    CONSTRAINT correo_fk_miembro FOREIGN KEY (fk_miembro_1, fk_miembro_2) REFERENCES miembro(rif, naturaleza_rif)
);

/** 
 * Tabla: usuario
 * Propósito: Usuarios del sistema con credenciales y roles
 * Tipos: id (SERIAL), contraseña (VARCHAR), fk_rol (INTEGER), fk_correo (INTEGER)
 */
CREATE TABLE usuario (
    id         SERIAL,
    contraseña VARCHAR(25) NOT NULL,
    fk_rol     INTEGER NOT NULL,
    fk_correo  INTEGER NOT NULL UNIQUE,
    
    /** Primary key constraint */
    CONSTRAINT usuario_pk PRIMARY KEY (id),
    
    /** Foreign key constraints */
    CONSTRAINT usuario_fk_rol FOREIGN KEY (fk_rol) REFERENCES rol(id),
    CONSTRAINT usuario_fk_correo FOREIGN KEY (fk_correo) REFERENCES correo(id)
);

/** 
 * Tabla: cliente_natural
 * Propósito: Información de personas naturales
 * Tipos: id (INTEGER), ci (INTEGER), nacionalidad (CHAR), nombres y apellidos (VARCHAR), etc.
 */
CREATE TABLE cliente_natural (
    id SERIAL,
    ci INTEGER NOT NULL,
    nacionalidad CHAR(1) NOT NULL CHECK (nacionalidad IN ('E', 'V')),
    primer_nombre VARCHAR(50) NOT NULL,
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    segundo_apellido VARCHAR(50),
    rif INTEGER NOT NULL,
    naturaleza_rif CHAR(1) NOT NULL CHECK (naturaleza_rif IN ('J', 'V', 'P', 'E')),
    dirección VARCHAR(255) NOT NULL,
    fk_lugar INTEGER NOT NULL,
    
    /** Primary key constraint */
    CONSTRAINT cliente_natural_pk PRIMARY KEY (id),    

    CONSTRAINT chk_cliente_natural_unico_1 UNIQUE (ci, nacionalidad),
    CONSTRAINT chk_cliente_natural_unico_2 UNIQUE (rif, naturaleza_rif),
    
    /** Foreign key constraints */
    CONSTRAINT cliente_natural_fk_lugar FOREIGN KEY (fk_lugar) REFERENCES lugar(id)
);

/**
 * Tabla: cliente_juridico
 * Propósito: Almacena la información de personas jurídicas/empresas
 * Tipos: id (INTEGER), denominación_comercial (VARCHAR), razón_social (VARCHAR), 
 *        capital_disponible (DECIMAL), dirección_fiscal (VARCHAR), etc.
 */
CREATE TABLE cliente_juridico (
    id                     SERIAL,
    denominación_comercial VARCHAR(50) NOT NULL,
    razón_social           VARCHAR(50) NOT NULL,
    capital_disponible     FLOAT(2) NOT NULL,
    dirección_fiscal       VARCHAR(255),
    dominio_web            VARCHAR(255) UNIQUE,
    rif                    INTEGER NOT NULL,
    naturaleza_rif         CHAR(1) NOT NULL CHECK (naturaleza_rif IN ('J', 'V', 'P', 'E')),
    dirección              VARCHAR(255) NOT NULL,
    fk_lugar_1             INTEGER NOT NULL,
    fk_lugar_2             INTEGER NOT NULL,

    /** Primary key constraint */
    CONSTRAINT cliente_juridico_pk PRIMARY KEY (id),

    CONSTRAINT chk_cliente_juridico_unico UNIQUE (rif, naturaleza_rif),

    /** Foreign key constraints */
    CONSTRAINT cliente_juridico_lugar_1_fk FOREIGN KEY (fk_lugar_1) REFERENCES lugar(id),
    CONSTRAINT cliente_juridico_lugar_2_fk FOREIGN KEY (fk_lugar_2) REFERENCES lugar(id)
);

/** 
 * Tabla: cliente_usuario
 * Propósito: Relaciona usuarios con clientes (naturales o jurídicos)
 * Tipos: fk_cliente_juridico (INTEGER), fk_usuario (INTEGER NOT NULL), fk_cliente_natural (INTEGER)
 */
CREATE TABLE cliente_usuario (
    fk_cliente_juridico INTEGER,
    fk_usuario          INTEGER NOT NULL,
    fk_cliente_natural  INTEGER,
    
    /** Primary key constraint */
    CONSTRAINT cliente_usuario_pk PRIMARY KEY (fk_usuario),
    
    /** Constraint: Verifica que solo uno de los dos tipos de cliente esté presente */
    CONSTRAINT chk_arc_cliente_usuario CHECK ( ( ( fk_cliente_juridico IS NOT NULL )
                  AND ( fk_cliente_natural IS NULL ) )
                OR ( ( fk_cliente_natural IS NOT NULL )
                     AND ( fk_cliente_juridico IS NULL ) ) ),
                     
    /** Foreign key constraints */
    CONSTRAINT cliente_usuario_fk_cliente_juridico FOREIGN KEY (fk_cliente_juridico) REFERENCES cliente_juridico(id),
    CONSTRAINT cliente_usuario_fk_cliente_natural FOREIGN KEY (fk_cliente_natural) REFERENCES cliente_natural(id),
    CONSTRAINT cliente_usuario_fk_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

/** 
 * Tabla: telefono
 * Propósito: Números telefónicos asociados a diferentes entidades
 * Tipos: id (SERIAL), codigo_área (INTEGER), número (INTEGER), referencias a entidades
 */
CREATE TABLE telefono (
    id                  SERIAL,
    codigo_área         INTEGER NOT NULL,
    número              INTEGER NOT NULL,
    fk_miembro_1        INTEGER,
    fk_miembro_2        CHAR(1),
    fk_empleado         INTEGER,
    fk_cliente_juridico INTEGER,
    fk_cliente_natural  INTEGER,
    
    /** Primary key constraint */
    CONSTRAINT telefono_pk PRIMARY KEY (id),
    
    /** Check constraint: Verifica que el telefono pertenezca a cliente juridico o natural */
    CONSTRAINT chk_arc_telefono CHECK (
        (fk_miembro_1 IS NOT NULL AND fk_miembro_2 IS NOT NULL AND fk_empleado IS NULL AND fk_cliente_juridico IS NULL AND fk_cliente_natural IS NULL) OR
        (fk_miembro_1 IS NULL AND fk_miembro_2 IS NULL AND fk_empleado IS NOT NULL AND fk_cliente_juridico IS NULL AND fk_cliente_natural IS NULL) OR
        (fk_miembro_1 IS NULL AND fk_miembro_2 IS NULL AND fk_empleado IS NULL AND fk_cliente_juridico IS NOT NULL AND fk_cliente_natural IS NULL) OR
        (fk_miembro_1 IS NULL AND fk_miembro_2 IS NULL AND fk_empleado IS NULL AND fk_cliente_juridico IS NULL AND fk_cliente_natural IS NOT NULL)
    ),

    /** 
     * Constraint: Verifica que no existan telefonos duplicados
     * Tipos: codigo_área (INTEGER), número (INTEGER)
     * Propósito: Asegura que la combinación de código de área y número sea única
     */
    CONSTRAINT chk_telefono_unico UNIQUE (codigo_área, número),
                     
    /** Foreign key constraints */
    CONSTRAINT telefono_fk_empleado FOREIGN KEY (fk_empleado) REFERENCES empleado(id),
    CONSTRAINT telefono_fk_cliente_juridico FOREIGN KEY (fk_cliente_juridico) REFERENCES cliente_juridico(id),
    CONSTRAINT telefono_fk_miembro FOREIGN KEY (fk_miembro_1, fk_miembro_2) REFERENCES miembro(rif, naturaleza_rif),
    CONSTRAINT telefono_fk_cliente_natural FOREIGN KEY (fk_cliente_natural) REFERENCES cliente_natural(id)
);

/** 
 * Tabla: persona_contacto
 * Propósito: Información de contacto de personas
 * Tipos: id (SERIAL), datos personales (INTEGER/CHAR/VARCHAR), referencias a otras tablas
 */
CREATE TABLE persona_contacto (
    id                  SERIAL,
    ci                  INTEGER NOT NULL,
    nacionalidad        CHAR(1) NOT NULL CHECK (nacionalidad IN ('E', 'V')),
    primer_nombre       VARCHAR(50) NOT NULL,
    primer_apellido     VARCHAR(50) NOT NULL,
    segundo_nombre      VARCHAR(50),
    segundo_apellido    VARCHAR(50),
    fk_miembro_1        INTEGER,
    fk_miembro_2        CHAR(1),
    fk_telefono         INTEGER NOT NULL,
    fk_correo           INTEGER NOT NULL,
    fk_cliente_juridico INTEGER,
    
    /** Primary key constraint */
    CONSTRAINT persona_contacto_pk PRIMARY KEY (id),
    
    /** Check constraints */
    CONSTRAINT persona_contacto_nacionalidad_check CHECK ( nacionalidad IN ( 'E', 'V' ) ),

    CONSTRAINT chk_persona_contacto_unico UNIQUE (ci, nacionalidad),
    
    CONSTRAINT chk_arc_persona_contacto CHECK ( ( ( fk_miembro_1 IS NOT NULL )
                  AND ( fk_miembro_2 IS NOT NULL )
                  AND ( fk_cliente_juridico IS NULL ) )
                OR ( ( fk_cliente_juridico IS NOT NULL )
                     AND ( fk_miembro_1 IS NULL )
                     AND ( fk_miembro_2 IS NULL ) ) ),
                     
    /** Foreign key constraints */
    CONSTRAINT persona_contacto_fk_correo FOREIGN KEY (fk_correo) REFERENCES correo(id),
    CONSTRAINT persona_contacto_fk_cliente_juridico FOREIGN KEY (fk_cliente_juridico) REFERENCES cliente_juridico(id),
    CONSTRAINT persona_contacto_fk_miembro FOREIGN KEY (fk_miembro_1, fk_miembro_2) REFERENCES miembro(rif, naturaleza_rif),
    CONSTRAINT persona_contacto_fk_telefono FOREIGN KEY (fk_telefono) REFERENCES telefono(id)
);

/** 
 * Tabla: empleado_usuario
 * Propósito: Relaciona empleados con usuarios del sistema
 * Tipos: fk_empleado (INTEGER NOT NULL), fk_usuario (INTEGER NOT NULL)
 */
CREATE TABLE empleado_usuario (
    fk_empleado INTEGER NOT NULL,
    fk_usuario  INTEGER NOT NULL,
    
    /** Primary key constraint */
    CONSTRAINT empleado_usuario_pk PRIMARY KEY (fk_empleado, fk_usuario),
    
    /** Foreign key constraints */
    CONSTRAINT empleado_usuario_fk_empleado FOREIGN KEY (fk_empleado) REFERENCES empleado(id),
    CONSTRAINT empleado_usuario_fk_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

/** 
 * Tabla: miembro_usuario
 * Propósito: Relaciona usuarios con miembros
 * Tipos: fk_usuario (INTEGER), fk_miembro_1 (INTEGER), fk_miembro_2 (CHAR)
 */
CREATE TABLE miembro_usuario (
    fk_usuario   INTEGER NOT NULL,
    fk_miembro_1 INTEGER NOT NULL,
    fk_miembro_2 CHAR(1) NOT NULL,
    
    /** Primary key constraint */
    CONSTRAINT miembro_usuario_pk PRIMARY KEY (fk_usuario, fk_miembro_1, fk_miembro_2),
    
    /** Foreign key constraints */
    CONSTRAINT miembro_usuario_fk_miembro FOREIGN KEY (fk_miembro_1, fk_miembro_2) REFERENCES miembro(rif, naturaleza_rif),
    CONSTRAINT miembro_usuario_fk_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

/** 
 * Tabla: permiso
 * Propósito: Catálogo de permisos del sistema
 * Tipos: id (SERIAL), nombre (VARCHAR), descripción (VARCHAR)
 */
CREATE TABLE permiso (
    id          SERIAL,
    nombre      VARCHAR(50) NOT NULL UNIQUE,
    descripción VARCHAR(255) NOT NULL,
    
    /** Primary key constraint */
    CONSTRAINT permiso_pk PRIMARY KEY (id)
);

/** 
 * Tabla: permiso_rol
 * Propósito: Relaciona permisos con roles (many-to-many)
 * Tipos: fk_rol (INTEGER), fk_permiso (INTEGER)
 */
CREATE TABLE permiso_rol (
    fk_rol     INTEGER NOT NULL,
    fk_permiso INTEGER NOT NULL,
    
    /** Primary key constraint compuesta */
    CONSTRAINT permiso_rol_pk PRIMARY KEY (fk_rol, fk_permiso),
    
    /** Foreign key constraints */
    CONSTRAINT permiso_rol_fk_permiso FOREIGN KEY (fk_permiso) REFERENCES permiso(id),
    CONSTRAINT permiso_rol_fk_rol FOREIGN KEY (fk_rol) REFERENCES rol(id)
);


