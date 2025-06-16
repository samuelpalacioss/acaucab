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