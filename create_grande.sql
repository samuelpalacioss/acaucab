/**
 * Tabla que almacena los diferentes tipos de beneficios disponibles
 * @param id - Identificador único del beneficio
 * @param nombre - Nombre del beneficio
 */
CREATE TABLE beneficio (
    id     SERIAL,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    CONSTRAINT beneficio_pk PRIMARY KEY (id)
);

/**
 * Tabla que almacena los diferentes cargos en la empresa
 * @param id - Identificador único del cargo
 * @param nombre - Nombre del cargo
 * @param salario_base - Salario base del cargo
 */
CREATE TABLE cargo (
    id           SERIAL,
    nombre       VARCHAR(255) NOT NULL UNIQUE,
    salario_base DECIMAL(10,2) NOT NULL,
    CONSTRAINT cargo_pk PRIMARY KEY (id)
);

/**
 * Tabla que almacena los departamentos de la empresa
 * @param id - Identificador único del departamento
 * @param nombre - Nombre del departamento
 */
CREATE TABLE departamento (
    id     SERIAL,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    CONSTRAINT departamento_pk PRIMARY KEY (id)
);

/**
 * Tabla que almacena la información de los empleados
 * @param id - Identificador único del empleado
 * @param ci - Número de cédula de identidad
 * @param nacionalidad - Nacionalidad del empleado (1 carácter)
 * @param primer_nombre - Primer nombre del empleado
 * @param primer_apellido - Primer apellido del empleado
 * @param segundo_nombre - Segundo nombre del empleado (opcional)
 * @param segundo_apellido - Segundo apellido del empleado (opcional)
 * @param fecha_nacimiento - Fecha de nacimiento del empleado
 */
CREATE TABLE empleado (
    id               SERIAL,
    ci               INTEGER NOT NULL,
    nacionalidad     CHAR(1) NOT NULL CHECK (nacionalidad IN ('V', 'E')),
    primer_nombre    VARCHAR(25) NOT NULL,
    primer_apellido  VARCHAR(25) NOT NULL,
    segundo_nombre   VARCHAR(25),
    segundo_apellido VARCHAR(25),
    fecha_nacimiento DATE NOT NULL,
    CONSTRAINT empleado_pk PRIMARY KEY (id)
);

/**
 * Tabla que almacena los horarios disponibles
 * @param id - Identificador único del horario
 * @param dia - Día de la semana
 * @param hora_entrada - Hora de entrada
 * @param hora_salida - Hora de salida
 */
CREATE TABLE horario (
    id           SERIAL,
    dia          VARCHAR(10) NOT NULL CHECK (dia IN ('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo')),
    hora_entrada TIME NOT NULL,
    hora_salida  TIME NOT NULL,
    CONSTRAINT horario_pk PRIMARY KEY (id)
);

/**
 * Tabla que almacena las nóminas de los empleados
 * @param id - Identificador único de la nómina
 * @param fecha_inicio - Fecha de inicio del período de pago
 * @param fecha_fin - Fecha de fin del período de pago
 * @param fk_cargo - ID del cargo del empleado
 * @param fk_departamento - ID del departamento
 * @param fk_empleado - ID del empleado
 */
CREATE TABLE nomina (
    id              SERIAL,
    fecha_inicio    DATE NOT NULL,
    fecha_fin       DATE,
    fk_cargo        INTEGER NOT NULL,
    fk_departamento INTEGER NOT NULL,
    fk_empleado     INTEGER NOT NULL,
    CONSTRAINT nomina_pk PRIMARY KEY (id, fk_empleado),
    CONSTRAINT nomina_fk_cargo FOREIGN KEY (fk_cargo) REFERENCES cargo(id),
    CONSTRAINT nomina_fk_departamento FOREIGN KEY (fk_departamento) REFERENCES departamento(id),
    CONSTRAINT nomina_fk_empleado FOREIGN KEY (fk_empleado) REFERENCES empleado(id)
);

/**
 * Tabla que relaciona los beneficios con las nóminas
 * @param monto - Monto del beneficio
 * @param fecha_asignacion - Fecha cuando se asignó el beneficio
 * @param fk_nomina_1 - ID de la nómina
 * @param fk_nomina_2 - ID del empleado en la nómina
 * @param fk_beneficio - ID del beneficio asignado
 */
CREATE TABLE beneficio_nomina (
    monto            DECIMAL(10,2) NOT NULL,
    fecha_asignacion DATE NOT NULL,
    fk_nomina_1      INTEGER NOT NULL,
    fk_nomina_2      INTEGER NOT NULL,
    fk_beneficio     INTEGER NOT NULL,
    CONSTRAINT beneficio_nomina_pk PRIMARY KEY (fk_nomina_1, fk_nomina_2, fk_beneficio),
    CONSTRAINT beneficio_nomina_fk_beneficio FOREIGN KEY (fk_beneficio) REFERENCES beneficio(id),
    CONSTRAINT beneficio_nomina_fk_nomina FOREIGN KEY (fk_nomina_1, fk_nomina_2) REFERENCES nomina(id, fk_empleado)
);

/**
 * Tabla que relaciona los horarios con las nóminas
 * @param fk_horario - ID del horario
 * @param fk_nomina_1 - ID de la nómina
 * @param fk_nomina_2 - ID del empleado en la nómina
 */
CREATE TABLE horario_nomina (
    fk_horario  INTEGER NOT NULL,
    fk_nomina_1 INTEGER NOT NULL,
    fk_nomina_2 INTEGER NOT NULL,
    CONSTRAINT horario_nomina_pk PRIMARY KEY (fk_horario, fk_nomina_1, fk_nomina_2),
    CONSTRAINT horario_nomina_fk_horario FOREIGN KEY (fk_horario) REFERENCES horario(id),
    CONSTRAINT horario_nomina_fk_nomina FOREIGN KEY (fk_nomina_1, fk_nomina_2) REFERENCES nomina(id, fk_empleado)
);

/**
 * Tabla que almacena los registros biométricos de los empleados
 * @param id - Identificador único del registro
 * @param fecha_hora_entrada - Fecha y hora de entrada
 * @param fecha_hora_salida - Fecha y hora de salida
 * @param fk_empleado - ID del empleado
 */
CREATE TABLE registro_biometrico (
    id                 SERIAL,
    fecha_hora_entrada TIMESTAMP NOT NULL,
    fecha_hora_salida  TIMESTAMP NOT NULL,
    fk_empleado        INTEGER NOT NULL,
    CONSTRAINT registro_biometrico_pk PRIMARY KEY (id, fk_empleado),
    CONSTRAINT registro_biometrico_fk_empleado FOREIGN KEY (fk_empleado) REFERENCES empleado(id)
);

/**
 * Tabla que almacena las vacaciones de los empleados
 * @param id - Identificador único de la vacación
 * @param nombre - Nombre o tipo de vacación
 * @param fecha_inicio - Fecha de inicio de la vacación
 * @param fecha_fin - Fecha de fin de la vacación
 * @param fk_nomina_1 - ID de la nómina
 * @param fk_nomina_2 - ID del empleado en la nómina
 */
CREATE TABLE vacacion (
    id           SERIAL,
    nombre       VARCHAR(255) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin    DATE NOT NULL,
    fk_nomina_1  INTEGER NOT NULL,
    fk_nomina_2  INTEGER NOT NULL,
    CONSTRAINT vacacion_pk PRIMARY KEY (id),
    CONSTRAINT vacacion_fk_nomina FOREIGN KEY (fk_nomina_1, fk_nomina_2) REFERENCES nomina(id, fk_empleado)
);

/** 
 * Script de creación de tablas para el módulo de usuario en PostgreSQL
 * Este archivo contiene la definición de todas las tablas relacionadas con usuarios, clientes, miembros y permisos
 */

 /**
 * Tabla que almacena los lugares (países, estados, ciudades, etc.)
 * Permite una estructura jerárquica donde un lugar puede pertenecer a otro
 * @param id - Identificador único del lugar
 * @param nombre - Nombre del lugar
 * @param tipo - Tipo de lugar (país, estado, ciudad, etc.)
 * @param id1 - ID del lugar padre (para jerarquía)
 */
CREATE TABLE lugar (
    id     SERIAL,
    nombre VARCHAR(255) NOT NULL,
    tipo   VARCHAR(25) NOT NULL CHECK (tipo IN ('Estado', 'Municipio', 'Parroquia')),
    fk_lugar    INTEGER,
    CONSTRAINT lugar_pk PRIMARY KEY (id),
    CONSTRAINT lugar_fk_lugar FOREIGN KEY (fk_lugar) REFERENCES lugar(id)
);

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
    
    /** Primary key constraint */
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

    /** Check constraints */
    --!DESCOMENTAR ESTO CUANDO SE CAMBIE LAS CEDULAS DE LOS INSERTS
    -- CONSTRAINT chk_cliente_natural_ci_length CHECK (LENGTH(ci::TEXT) BETWEEN 7 AND 8),

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
    CONSTRAINT cliente_juridico_fk_lugar_1 FOREIGN KEY (fk_lugar_1) REFERENCES lugar(id),
    CONSTRAINT cliente_juridico_fk_lugar_2 FOREIGN KEY (fk_lugar_2) REFERENCES lugar(id)
);

/** 
 * Tabla: persona_contacto
 * Propósito: Información de contacto de personas
 * Tipos: id (SERIAL), datos personales (INTEGER/CHAR/VARCHAR), referencias a otras tablas
 */
CREATE TABLE persona_contacto (
    id                  SERIAL,
    ci                  INTEGER NOT NULL,
    nacionalidad        CHAR(1) NOT NULL,
    primer_nombre       VARCHAR(50) NOT NULL,
    primer_apellido     VARCHAR(50) NOT NULL,
    segundo_nombre      VARCHAR(50),
    segundo_apellido    VARCHAR(50),
    fk_miembro_1        INTEGER,
    fk_miembro_2        CHAR(1),
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
    CONSTRAINT persona_contacto_fk_cliente_juridico FOREIGN KEY (fk_cliente_juridico) REFERENCES cliente_juridico(id),
    CONSTRAINT persona_contacto_fk_miembro FOREIGN KEY (fk_miembro_1, fk_miembro_2) REFERENCES miembro(rif, naturaleza_rif)
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
    fk_persona_contacto INTEGER,
    
    /** Primary key constraint */
    CONSTRAINT correo_pk PRIMARY KEY (id),
    
    /** Foreign key constraints */
    CONSTRAINT correo_fk_miembro FOREIGN KEY (fk_miembro_1, fk_miembro_2) REFERENCES miembro(rif, naturaleza_rif),
    CONSTRAINT correo_fk_persona_contacto FOREIGN KEY (fk_persona_contacto) REFERENCES persona_contacto(id)
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
    fk_persona_contacto INTEGER,
    
    /** Primary key constraint */
    CONSTRAINT telefono_pk PRIMARY KEY (id),
    
    /** Check constraint: Verifica que el telefono pertenezca a cliente juridico o natural */
    CONSTRAINT chk_arc_telefono CHECK (
        (fk_miembro_1 IS NOT NULL AND fk_miembro_2 IS NOT NULL AND fk_empleado IS NULL AND fk_cliente_juridico IS NULL AND fk_cliente_natural IS NULL) OR
        (fk_miembro_1 IS NULL AND fk_miembro_2 IS NULL AND fk_empleado IS NOT NULL AND fk_cliente_juridico IS NULL AND fk_cliente_natural IS NULL) OR
        (fk_miembro_1 IS NULL AND fk_miembro_2 IS NULL AND fk_empleado IS NULL AND fk_cliente_juridico IS NOT NULL AND fk_cliente_natural IS NULL) OR
        (fk_miembro_1 IS NULL AND fk_miembro_2 IS NULL AND fk_empleado IS NULL AND fk_cliente_juridico IS NULL AND fk_cliente_natural IS NOT NULL) OR
        (fk_miembro_1 IS NULL AND fk_miembro_2 IS NULL AND fk_empleado IS NULL AND fk_cliente_juridico IS NULL AND fk_cliente_natural IS NULL AND fk_persona_contacto IS NOT NULL)
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
    CONSTRAINT telefono_fk_cliente_natural FOREIGN KEY (fk_cliente_natural) REFERENCES cliente_natural(id),
    CONSTRAINT telefono_fk_persona_contacto FOREIGN KEY (fk_persona_contacto) REFERENCES persona_contacto(id)
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
    CONSTRAINT tienda_fisica_fk_lugar FOREIGN KEY (fk_lugar) REFERENCES lugar(id)
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
    CONSTRAINT almacen_fk_lugar FOREIGN KEY (fk_lugar) REFERENCES lugar(id),
    CONSTRAINT almacen_fk_tienda_fisica FOREIGN KEY (fk_tienda_fisica) REFERENCES tienda_fisica(id),
    CONSTRAINT almacen_fk_tienda_web FOREIGN KEY (fk_tienda_web) REFERENCES tienda_web(id),

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
    CONSTRAINT inventario_fk_almacen FOREIGN KEY (fk_almacen) REFERENCES almacen(id),
    CONSTRAINT inventario_fk_presentacion_cerveza FOREIGN KEY (fk_presentacion_cerveza_1, fk_presentacion_cerveza_2) 
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
    CONSTRAINT lugar_tienda_pk PRIMARY KEY (id, fk_tienda_fisica),
    CONSTRAINT lugar_tienda_fk_tienda_fisica FOREIGN KEY (fk_tienda_fisica) REFERENCES tienda_fisica(id),
    CONSTRAINT lugar_tienda_fk_lugar_tienda FOREIGN KEY (fk_lugar_tienda_1, fk_lugar_tienda_2) 
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
    cantidad INTEGER,
    fk_lugar_tienda_1 INTEGER NOT NULL,
    fk_lugar_tienda_2 INTEGER NOT NULL,
    fk_inventario_1 INTEGER NOT NULL,
    fk_inventario_2 INTEGER NOT NULL,
    fk_inventario_3 INTEGER NOT NULL,
    CONSTRAINT lugar_tienda_inventario_pk PRIMARY KEY (fk_lugar_tienda_1, fk_lugar_tienda_2, fk_inventario_1, fk_inventario_2, fk_inventario_3),
    CONSTRAINT lugar_tienda_inventario_fk_lugar_tienda FOREIGN KEY (fk_lugar_tienda_1, fk_lugar_tienda_2) 
        REFERENCES lugar_tienda(id, fk_tienda_fisica),
    CONSTRAINT lugar_tienda_inventario_fk_inventario FOREIGN KEY (fk_inventario_1, fk_inventario_2, fk_inventario_3) 
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
    observacion     TEXT,
    unidades        INTEGER,
    fk_lugar_tienda_1 INTEGER NOT NULL,
    fk_lugar_tienda_2 INTEGER NOT NULL,
    fk_inventario_1   INTEGER NOT NULL,
    fk_inventario_2   INTEGER NOT NULL,
    fk_inventario_3   INTEGER NOT NULL,
    fk_usuario     INTEGER,
    /* Primary key Constraint */
    CONSTRAINT orden_de_reposicion_pk 
        PRIMARY KEY (id),
    /* Foreign key Constraints */
    CONSTRAINT orden_de_reposicion_fk_usuario 
        FOREIGN KEY (fk_usuario)
            REFERENCES usuario (id),
    CONSTRAINT orden_de_reposicion_fk_inventario
        FOREIGN KEY (fk_lugar_tienda_1, fk_lugar_tienda_2, fk_inventario_1, fk_inventario_2, fk_inventario_3)
            REFERENCES lugar_tienda_inventario (fk_lugar_tienda_1, fk_lugar_tienda_2, fk_inventario_1, fk_inventario_2, fk_inventario_3)
);

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
    CONSTRAINT invitado_fk_tipo_invitado FOREIGN KEY (fk_tipo_invitado) REFERENCES tipo_invitado(id)
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
    CONSTRAINT evento_fk_tipo_evento FOREIGN KEY (fk_tipo_evento) REFERENCES tipo_evento(id),
    CONSTRAINT evento_fk_lugar FOREIGN KEY (fk_lugar) REFERENCES lugar(id)
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
    CONSTRAINT invitado_evento_fk_evento FOREIGN KEY (fk_evento) REFERENCES evento(id),
    CONSTRAINT invitado_evento_fk_invitado FOREIGN KEY (fk_invitado) REFERENCES invitado(id)
);

/**
 * Tabla que almacena la relación entre eventos y sus clientes (naturales o jurídicos)
 * @param fk_evento - Referencia al evento
 * @param fk_cliente_juridico - Referencia al cliente jurídico (debe ser NULL si hay cliente natural)
 * @param fk_cliente_natural - Referencia al cliente natural (debe ser NULL si hay cliente jurídico)
 */
CREATE TABLE evento_cliente (
    fk_evento           INTEGER NOT NULL,
    fk_cliente_juridico INTEGER,
    fk_cliente_natural  INTEGER,
    CONSTRAINT evento_cliente_pk PRIMARY KEY (fk_evento),
    CONSTRAINT evento_cliente_fk_evento FOREIGN KEY (fk_evento) REFERENCES evento(id),
    CONSTRAINT evento_cliente_fk_cliente_juridico FOREIGN KEY (fk_cliente_juridico) REFERENCES cliente_juridico(id),
    CONSTRAINT evento_cliente_fk_cliente_natural FOREIGN KEY (fk_cliente_natural) REFERENCES cliente_natural(id),
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
    CONSTRAINT stock_miembro_fk_evento FOREIGN KEY (fk_evento) 
        REFERENCES evento(id),
    CONSTRAINT stock_miembro_fk_miembro FOREIGN KEY (fk_miembro_1, fk_miembro_2) 
        REFERENCES miembro(rif, naturaleza_rif),
    CONSTRAINT stock_miembro_fk_presentacion_cerveza FOREIGN KEY (
        fk_presentacion_cerveza_1,
        fk_presentacion_cerveza_2
    ) REFERENCES presentacion_cerveza(fk_presentacion, fk_cerveza)
);

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
    fk_empleado         INTEGER,                         /** Clave foránea del empleado (tipo: INTEGER) */
    fk_tienda_fisica    INTEGER,                /** Clave foránea de la tienda física (tipo: INTEGER) */
    fk_tienda_web       INTEGER,                /** Clave foránea de la tienda web (tipo: INTEGER) */
    
    /** Clave primaria de la tabla venta */
    CONSTRAINT venta_pk PRIMARY KEY (id),
    
    /** Constraint para asegurar que ventas en tienda física no tengan dirección de entrega */
    CONSTRAINT venta_tienda_fisica_direccion CHECK (
        (fk_tienda_fisica IS NULL) OR (dirección_entrega IS NULL)
    ),
    
    /** Constraint para asegurar que el empleado solo se asigne en ventas de tienda física */
    CONSTRAINT venta_empleado_tienda_fisica_check CHECK (
        (fk_empleado IS NULL) OR (fk_tienda_fisica IS NOT NULL)
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
 * Incluye cantidad, precio unitario y referencias a presentación_cerveza y venta
 */
CREATE TABLE detalle_presentacion (
    cantidad        INTEGER NOT NULL CHECK (cantidad > 0),  /** Cantidad de productos vendidos (tipo: INTEGER, debe ser positivo) */
    precio_unitario DECIMAL(10,2) CHECK (precio_unitario > 0),                      /** Precio por unidad del producto (tipo: DECIMAL) */
    fk_presentacion INTEGER NOT NULL,               /** Primera clave foránea de presentación_cerveza - SKU (tipo: VARCHAR) */
    fk_cerveza      INTEGER NOT NULL,                   /** Segunda clave foránea de presentación_cerveza - ID cerveza (tipo: INTEGER) */
    fk_venta        INTEGER NOT NULL,                   /** Clave foránea que referencia la venta (tipo: INTEGER) */
    
    /** Definición de clave primaria compuesta */
    CONSTRAINT detalle_presentacion_pk PRIMARY KEY (fk_presentacion, fk_cerveza, fk_venta),
    
    /** Clave foránea que referencia la tabla presentacion_cerveza */
    CONSTRAINT detalle_presentacion_fk_presentacion_cerveza FOREIGN KEY (fk_presentacion, fk_cerveza) 
        REFERENCES presentacion_cerveza (fk_presentacion, fk_cerveza),
    
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
    fk_presentacion_cerveza_1 INTEGER NOT NULL,          /** Primera clave foránea de presentación cerveza - ID (tipo: INTEGER) */
    fk_presentacion_cerveza_2 INTEGER NOT NULL,      /** Segunda clave foránea de presentación cerveza - SKU (tipo: VARCHAR) */
    
    /** Clave primaria compuesta de la tabla de relación */
    CONSTRAINT miembro_presentacion_cerveza_pk PRIMARY KEY (fk_miembro_1, fk_miembro_2, fk_presentacion_cerveza_1, fk_presentacion_cerveza_2),
    
    /** Clave foránea que referencia la tabla miembro */
    CONSTRAINT miembro_presentacion_cerveza_fk_miembro FOREIGN KEY (fk_miembro_1, fk_miembro_2) 
        REFERENCES miembro (rif, naturaleza_rif),
    
    /** Clave foránea que referencia la tabla presentacion_cerveza */
    CONSTRAINT miembro_presentacion_cerveza_fk_presentacion_cerveza FOREIGN KEY (fk_presentacion_cerveza_1, fk_presentacion_cerveza_2) 
        REFERENCES presentacion_cerveza (fk_presentacion, fk_cerveza)
);

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
    CONSTRAINT venta_evento_fk_cliente_juridico FOREIGN KEY (fk_cliente_juridico)
        REFERENCES cliente_juridico (id),
    
    /** Constraint de clave foránea hacia cliente natural */
    CONSTRAINT venta_evento_fk_cliente_natural FOREIGN KEY (fk_cliente_natural)
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
    fk_usuario               INTEGER,                      /** Referencia al empleado que hace ela orden */
    fk_presentacion_cerveza_1 INTEGER NOT NULL,             /** Referencia a presentación cerveza - campo 1 */
    fk_presentacion_cerveza_2 INTEGER NOT NULL,         /** Referencia a presentación cerveza - campo 2 */
    unidades                  INTEGER NOT NULL,             /** Cantidad de unidades a ordenar */
    fk_miembro_1              INTEGER NOT NULL,             /** Referencia al miembro 1 */
    fk_miembro_2              CHAR(1) NOT NULL,             /** Referencia al miembro 2 */
    
    /** Constraint de clave primaria */
    CONSTRAINT orden_de_compra_pk PRIMARY KEY (id),
    
    /** Constraint de clave foránea hacia empleado */
    CONSTRAINT orden_de_compra_fk_usuario FOREIGN KEY (fk_usuario)
        REFERENCES usuario (id),
    
    /** Constraint de clave foránea hacia presentacion_cerveza */
    CONSTRAINT orden_de_compra_fk_presentacion_cerveza FOREIGN KEY (
        fk_presentacion_cerveza_1,
        fk_presentacion_cerveza_2
    ) REFERENCES presentacion_cerveza (
        fk_presentacion,
        fk_cerveza
    ),

    CONSTRAINT orden_de_compra_fk_miembro FOREIGN KEY (
        fk_miembro_1,
        fk_miembro_2
    ) REFERENCES miembro (
        rif,
        naturaleza_rif
    )
);  

/**
 * Tabla que almacena todos los metodos de pago disponibles
 * @param id - Identificador único del metodo de pago
 * @param tipo - Tipo de metodo de pago (efectivo, tarjeta_credito, punto, cheque, tarjeta_debito)
 * @param denominación - Denominación del billete o moneda (para efectivo)
 * @param tipo_tarjeta - Tipo de tarjeta (para tarjetas)
 * @param número - Número de tarjeta o cuenta
 * @param banco - Banco emisor (para tarjetas y cheques)
 * @param fecha_vencimiento - Fecha de vencimiento (para tarjetas)
 * @param numero_cheque - Número del cheque (para cheques)
 * @param fecha_adquisicion - Fecha de adquisición (para puntos)
 * @param fecha_canjeo - Fecha de canjeo (para puntos)
 */
CREATE TABLE metodo_pago (
    id                SERIAL,
    tipo              VARCHAR(50) NOT NULL CHECK (tipo IN ('efectivo', 'tarjeta_credito', 'punto', 'cheque', 'tarjeta_debito')),
    denominación      VARCHAR(50),
    tipo_tarjeta      VARCHAR(50),
    número            BIGINT UNIQUE,
    banco             VARCHAR(50),
    fecha_vencimiento DATE,
    numero_cheque     BIGINT UNIQUE,
    fecha_adquisicion DATE,
    fecha_canjeo      DATE,
    CONSTRAINT metodo_pago_pk PRIMARY KEY (id),
    CONSTRAINT chk_efectivo CHECK (
        (tipo = 'efectivo' AND denominación IS NOT NULL AND 
         tipo_tarjeta IS NULL AND número IS NULL AND banco IS NULL AND 
         fecha_vencimiento IS NULL AND numero_cheque IS NULL AND
         fecha_adquisicion IS NULL AND fecha_canjeo IS NULL) OR
        (tipo != 'efectivo')
    ),
    CONSTRAINT chk_tarjeta_credito CHECK (
        (tipo = 'tarjeta_credito' AND tipo_tarjeta IS NOT NULL AND 
         número IS NOT NULL AND banco IS NOT NULL AND 
         fecha_vencimiento IS NOT NULL AND denominación IS NULL AND 
         numero_cheque IS NULL AND fecha_adquisicion IS NULL AND 
         fecha_canjeo IS NULL) OR
        (tipo != 'tarjeta_credito')
    ),
    CONSTRAINT chk_punto CHECK (
        (tipo = 'punto' AND fecha_adquisicion IS NOT NULL AND 
         denominación IS NULL AND tipo_tarjeta IS NULL AND 
         número IS NULL AND banco IS NULL AND 
         fecha_vencimiento IS NULL AND numero_cheque IS NULL) OR
        (tipo != 'punto')
    ),
    CONSTRAINT chk_tarjeta_debito CHECK (
        (tipo = 'tarjeta_debito' AND número IS NOT NULL AND 
         banco IS NOT NULL AND fecha_vencimiento IS NOT NULL AND 
         denominación IS NULL AND tipo_tarjeta IS NULL AND 
         numero_cheque IS NULL AND fecha_adquisicion IS NULL AND 
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
    CONSTRAINT mensualidad_fk_afiliacion FOREIGN KEY (fk_afiliacion)
        REFERENCES afiliacion(id),
    CONSTRAINT mensualidad_fk_miembro FOREIGN KEY (fk_miembro_2, fk_miembro_1)
        REFERENCES miembro(rif, naturaleza_rif)
);

/**
 * Tabla que almacena los metodos de pago asociados a cada miembro
 * @param id - Identificador del metodo de pago
 * @param fk_miembro_1 - Referencia a la naturaleza del RIF del miembro
 * @param fk_miembro_2 - Referencia al RIF del miembro
 * @param fk_metodo_pago - Referencia al metodo de pago
 */
CREATE TABLE miembro_metodo_pago (
    id             SERIAL,
    fk_miembro_1      INTEGER NOT NULL,
    fk_miembro_2      CHAR(1) NOT NULL,
    fk_metodo_pago    INTEGER NOT NULL,
    /* Primary key Constraint */
    CONSTRAINT miembro_metodo_pago_pk 
        PRIMARY KEY (id),
    /* Foreign key Constraints */
    CONSTRAINT miembro_metodo_pago_fk_miembro 
        FOREIGN KEY (fk_miembro_1, fk_miembro_2)
            REFERENCES miembro (rif, naturaleza_rif),
    CONSTRAINT miembro_metodo_pago_fk_metodo_pago 
        FOREIGN KEY (fk_metodo_pago)
            REFERENCES metodo_pago (id)
);

/**
 * Tabla que almacena los metodos de pago asociados a cada cliente
 * @param fk_metodo_pago - Referencia al metodo de pago
 * @param fk_cliente_natural - Referencia al cliente natural (debe ser NULL si hay cliente jurídico)
 * @param fk_cliente_juridico - Referencia al cliente jurídico (debe ser NULL si hay cliente natural)
 */
CREATE TABLE cliente_metodo_pago (
    id                   SERIAL,
    fk_metodo_pago       INTEGER NOT NULL,
    fk_cliente_natural   INTEGER,
    fk_cliente_juridico  INTEGER,
    CONSTRAINT cliente_metodo_pago_pk PRIMARY KEY (id),
    CONSTRAINT cliente_metodo_pago_fk_metodo_pago FOREIGN KEY (fk_metodo_pago)
        REFERENCES metodo_pago(id),
    CONSTRAINT cliente_metodo_pago_fk_cliente_natural FOREIGN KEY (fk_cliente_natural)
        REFERENCES cliente_natural(id),
    CONSTRAINT cliente_metodo_pago_fk_cliente_juridico FOREIGN KEY (fk_cliente_juridico)
        REFERENCES cliente_juridico(id),
    CONSTRAINT chk_arc_cliente_metodo_pago CHECK (
        (fk_cliente_natural IS NOT NULL AND fk_cliente_juridico IS NULL) OR
        (fk_cliente_juridico IS NOT NULL AND fk_cliente_natural IS NULL)
    ),
    CONSTRAINT unq_cliente_metodo_pago_natural_metodo UNIQUE(fk_cliente_natural, fk_metodo_pago),
    CONSTRAINT unq_cliente_metodo_pago_juridico_metodo UNIQUE(fk_cliente_juridico, fk_metodo_pago)
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
    monto                    DECIMAL(10,2) NOT NULL CHECK (monto > 0),
    fecha_pago               TIMESTAMP NOT NULL,
    fk_tasa                  INTEGER NOT NULL,
    fk_mensualidad_1         INTEGER,
    fk_mensualidad_2         INTEGER,
    fk_mensualidad_3         CHAR(1),
    fk_venta                 INTEGER,
    fk_orden_de_compra       INTEGER,
    fk_venta_evento          INTEGER,
    fk_miembro_metodo_pago_1 INTEGER,
    fk_cliente_metodo_pago_1 INTEGER,

    
    CONSTRAINT pago_pk PRIMARY KEY (id),
    /** Constraint que asegura que solo un tipo de transacción esté presente por pago */
    CONSTRAINT chk_arc_tipo_transaccion CHECK (
        ((fk_mensualidad_1 IS NOT NULL AND fk_mensualidad_2 IS NOT NULL AND fk_mensualidad_3 IS NOT NULL AND 
          fk_venta IS NULL AND fk_orden_de_compra IS NULL AND fk_venta_evento IS NULL) OR
         (fk_venta IS NOT NULL AND 
          fk_mensualidad_1 IS NULL AND fk_mensualidad_2 IS NULL AND fk_mensualidad_3 IS NULL AND 
          fk_orden_de_compra IS NULL AND fk_venta_evento IS NULL) OR
         (fk_orden_de_compra IS NOT NULL AND 
          fk_mensualidad_1 IS NULL AND fk_mensualidad_2 IS NULL AND fk_mensualidad_3 IS NULL AND 
          fk_venta IS NULL AND fk_venta_evento IS NULL) OR
         (fk_venta_evento IS NOT NULL AND 
          fk_mensualidad_1 IS NULL AND fk_mensualidad_2 IS NULL AND fk_mensualidad_3 IS NULL AND 
          fk_venta IS NULL AND fk_orden_de_compra IS NULL))
    ),
    /** Constraint que asegura que solo un tipo de método de pago esté presente por pago */
    CONSTRAINT chk_arc_pago CHECK (
        ((fk_miembro_metodo_pago_1 IS NOT NULL AND 
          fk_cliente_metodo_pago_1 IS NULL) OR
         (fk_cliente_metodo_pago_1 IS NOT NULL AND 
          fk_miembro_metodo_pago_1 IS NULL))
    ),
    CONSTRAINT pago_fk_cliente_metodo_pago FOREIGN KEY (fk_cliente_metodo_pago_1)
        REFERENCES cliente_metodo_pago (id),
    CONSTRAINT pago_fk_mensualidad FOREIGN KEY (fk_mensualidad_1, fk_mensualidad_2, fk_mensualidad_3)
        REFERENCES mensualidad (fk_afiliacion, fk_miembro_2, fk_miembro_1),
    CONSTRAINT pago_fk_miembro_metodo_pago FOREIGN KEY (fk_miembro_metodo_pago_1)
        REFERENCES miembro_metodo_pago (id),
    CONSTRAINT pago_fk_orden_de_compra FOREIGN KEY (fk_orden_de_compra)
        REFERENCES orden_de_compra (id),
    CONSTRAINT pago_fk_tasa FOREIGN KEY (fk_tasa)
        REFERENCES tasa (id),
    CONSTRAINT pago_fk_venta_evento FOREIGN KEY (fk_venta_evento)
        REFERENCES venta_evento (id),
    CONSTRAINT pago_fk_venta FOREIGN KEY (fk_venta)
        REFERENCES venta (id)
);

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
    fecha_actualización TIMESTAMP NOT NULL,
    fecha_fin           TIMESTAMP,
    fk_status           INTEGER NOT NULL,
    fk_mensualidad_1    INTEGER NOT NULL,
    fk_mensualidad_2    INTEGER NOT NULL,
    fk_mensualidad_3    CHAR(1) NOT NULL,
    /* Primary key Constraint */
    CONSTRAINT status_mensualidad_pk 
        PRIMARY KEY (fk_status, fk_mensualidad_1, fk_mensualidad_2, fk_mensualidad_3),
    /* Foreign key Constraints */
    CONSTRAINT status_mensualidad_fk_mensualidad
        FOREIGN KEY (fk_mensualidad_1, fk_mensualidad_2, fk_mensualidad_3)
            REFERENCES mensualidad (fk_afiliacion, fk_miembro_2, fk_miembro_1),
    CONSTRAINT status_mensualidad_fk_status 
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
 * @param fk_orden_de_reposicion - Referencia a la orden de reposición
 */
CREATE TABLE status_orden (
    id     SERIAL,
    fecha_actualización TIMESTAMP NOT NULL,
    fecha_fin           TIMESTAMP,
    fk_orden_de_compra  INTEGER,
    fk_status           INTEGER NOT NULL,
    fk_orden_de_reposicion INTEGER,
    /* Primary key Constraint */
    CONSTRAINT status_orden_pk 
        PRIMARY KEY (id),
    /* Foreign key Constraints */
    CONSTRAINT status_orden_fk_orden_de_compra 
        FOREIGN KEY (fk_orden_de_compra)
            REFERENCES orden_de_compra (id),
    CONSTRAINT status_orden_fk_orden_de_reposicion 
        FOREIGN KEY (fk_orden_de_reposicion)
            REFERENCES orden_de_reposicion (id),
    CONSTRAINT status_orden_fk_status 
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
    id     SERIAL,
    fecha_actualización TIMESTAMP NOT NULL,
    fecha_fin           TIMESTAMP,
    fk_status          INTEGER NOT NULL,
    fk_venta           INTEGER, 
    fk_venta_evento    INTEGER,
    /* Primary key Constraint */
    CONSTRAINT status_venta_pk 
        PRIMARY KEY (id),
    /* Foreign key Constraints */
    CONSTRAINT status_venta_fk_status 
        FOREIGN KEY (fk_status)
            REFERENCES status (id),
    CONSTRAINT status_venta_fk_venta
        FOREIGN KEY (fk_venta)
            REFERENCES venta (id),
    CONSTRAINT status_venta_fk_venta_evento
        FOREIGN KEY (fk_venta_evento)
            REFERENCES venta_evento (id),
    /* Arc relationship constraint - ensures exactly one of fk_venta or fk_venta_evento is specified */
    CONSTRAINT chk_arc_status_venta
        CHECK (
            (fk_venta IS NOT NULL AND fk_venta_evento IS NULL) OR
            (fk_venta IS NULL AND fk_venta_evento IS NOT NULL)
        ) 
);