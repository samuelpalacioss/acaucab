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