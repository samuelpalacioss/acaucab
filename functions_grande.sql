DROP FUNCTION IF EXISTS fn_actualizar_precio_detalle_venta(INTEGER, INTEGER, DECIMAL);

CREATE OR REPLACE FUNCTION fn_actualizar_precio_detalle_venta(
    p_fk_venta INTEGER,
    p_fk_presentacion INTEGER,
    p_precio_unitario DECIMAL
)
RETURNS VOID AS $$
BEGIN
    /**
     * Actualiza el precio unitario de un registro específico en 'detalle_presentacion'.
     * Esta función se llama cuando se finaliza una venta para establecer los precios finales,
     * lo que a su vez, activará el trigger para recalcular el monto total de la venta.
     */
    UPDATE detalle_presentacion
    SET precio_unitario = p_precio_unitario
    WHERE fk_venta = p_fk_venta AND fk_presentacion = p_fk_presentacion;
END;
$$ LANGUAGE plpgsql; 

/**
 * @name fn_anexar_cliente_metodo_pago
 * @description Función para asociar un método de pago a un cliente, ya sea natural o jurídico.
 *              La función verifica si la asociación ya existe antes de crearla para evitar duplicados.
 *
 * @param p_fk_metodo_pago - ID del método de pago a asociar.
 * @param p_id_cliente - ID del cliente (natural o jurídico).
 * @param p_tipo_cliente - Tipo de cliente ('natural' o 'juridico').
 *
 * @returns - El ID del nuevo registro en cliente_metodo_pago
 *
 * @exceptions Lanza una excepción si el p_tipo_cliente no es 'natural' ni 'juridico'.
 */
DROP FUNCTION IF EXISTS fn_anexar_cliente_metodo_pago(INTEGER, INTEGER, VARCHAR(10));

CREATE OR REPLACE FUNCTION fn_anexar_cliente_metodo_pago(
    p_fk_metodo_pago INTEGER,
    p_id_cliente INTEGER,
    p_tipo_cliente VARCHAR(10)
)
RETURNS INTEGER AS $$
DECLARE
    v_fk_cliente_natural INTEGER;
    v_fk_cliente_juridico INTEGER;
    v_nuevo_id INTEGER;
BEGIN
    -- Se verifica si el tipo de cliente es 'natural'.
    IF p_tipo_cliente = 'natural' THEN
        -- Se comprueba si la asociación entre el método de pago y el cliente natural ya existe.
        IF NOT EXISTS (
            SELECT 1
            FROM cliente_metodo_pago
            WHERE fk_metodo_pago = p_fk_metodo_pago
              AND fk_cliente_natural = p_id_cliente
        ) THEN
            -- Si no existe, se inserta la nueva asociación en la tabla cliente_metodo_pago.
            INSERT INTO cliente_metodo_pago (fk_metodo_pago, fk_cliente_natural)
            VALUES (p_fk_metodo_pago, p_id_cliente) RETURNING id INTO v_nuevo_id;
        END IF;
    -- Se verifica si el tipo de cliente es 'juridico'.
    ELSIF p_tipo_cliente = 'juridico' THEN
        -- Se comprueba si la asociación entre el método de pago y el cliente jurídico ya existe.
        IF NOT EXISTS (
            SELECT 1
            FROM cliente_metodo_pago
            WHERE fk_metodo_pago = p_fk_metodo_pago
              AND fk_cliente_juridico = p_id_cliente
        ) THEN
            -- Si no existe, se inserta la nueva asociación en la tabla cliente_metodo_pago.
            INSERT INTO cliente_metodo_pago (fk_metodo_pago, fk_cliente_juridico)
            VALUES (p_fk_metodo_pago, p_id_cliente) RETURNING id INTO v_nuevo_id;
        END IF;
    ELSE
        -- Si el tipo de cliente no es válido, se lanza una excepción.
        RAISE EXCEPTION 'Tipo de cliente no válido: %. Debe ser ''natural'' o ''juridico''', p_tipo_cliente;
    END IF;

    RETURN v_nuevo_id;
END;
$$ LANGUAGE plpgsql; 

/**
 * Crea un nuevo detalle de presentación de cerveza asociado a una venta específica.
 * Valida los parámetros de entrada y maneja las reglas de negocio establecidas.
 */
CREATE OR REPLACE FUNCTION fn_create_detalle_presentacion(
    p_cantidad INTEGER,
    p_precio_unitario DECIMAL(10,2),
    p_fk_presentacion INTEGER,
    p_fk_cerveza INTEGER,
    p_fk_venta INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
BEGIN
    /**
     * Función para crear un detalle de presentación en una venta.
     * 
     * @param p_cantidad Cantidad de productos vendidos (debe ser mayor a 0)
     * @param p_precio_unitario Precio por unidad del producto (debe ser mayor a 0)
     * @param p_fk_presentacion ID de la presentación de cerveza
     * @param p_fk_cerveza ID de la cerveza
     * @param p_fk_venta ID de la venta a la que pertenece este detalle
     * @return TRUE si el detalle se creó exitosamente
     */


    /** Insertar el nuevo detalle de presentación */
    INSERT INTO detalle_presentacion (
        cantidad,
        precio_unitario,
        fk_presentacion,
        fk_cerveza,
        fk_venta
    ) VALUES (
        p_cantidad,
        p_precio_unitario,
        p_fk_presentacion,
        p_fk_cerveza,
        p_fk_venta
    );

    /** Retornar TRUE indicando éxito en la creación */
    RETURN TRUE;

EXCEPTION
    WHEN OTHERS THEN
        /** La DB maneja constraints y FK automáticamente */
        RAISE;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fn_create_email(
    p_direccion_correo VARCHAR,
    p_miembro_rif INT DEFAULT NULL,
    p_miembro_naturaleza CHAR(1) DEFAULT NULL,
    p_persona_contacto_id INT DEFAULT NULL
)
RETURNS INT AS $$
DECLARE
    v_correo_id INT;
BEGIN
    /**
     * Inserta una nueva dirección de correo electrónico en la tabla 'correo'.
     *
     * Esta función puede opcionalmente asociar el correo a un 'miembro' o
     * a una 'persona_contacto'. Si no se proporcionan los IDs de estas
     * entidades, el correo se crea sin asociación directa, lo cual es útil
     * para crear usuarios para entidades como 'cliente_natural'.
     *
     * @param p_direccion_correo La dirección de correo electrónico a insertar.
     * @param p_miembro_rif El RIF del miembro (opcional).
     * @param p_miembro_naturaleza La naturaleza del RIF del miembro (opcional).
     * @param p_persona_contacto_id El ID de la persona de contacto (opcional).
     * @return El ID del nuevo registro de correo.
     */

    -- Validar que no se intenten insertar múltiples asociaciones a la vez
    IF (p_miembro_rif IS NOT NULL AND p_persona_contacto_id IS NOT NULL) THEN
        RAISE EXCEPTION 'Un correo solo puede ser asociado a una entidad (miembro o persona de contacto), no a ambas.';
    END IF;

    -- Validar que si se provee un RIF, también se provea la naturaleza
    IF (p_miembro_rif IS NOT NULL AND p_miembro_naturaleza IS NULL) OR (p_miembro_rif IS NULL AND p_miembro_naturaleza IS NOT NULL) THEN
        RAISE EXCEPTION 'Para asociar un correo a un miembro, debe proporcionar tanto el RIF como la naturaleza.';
    END IF;

    -- Insertar el nuevo correo electrónico en la tabla 'correo'
    INSERT INTO correo (
        dirección_correo, 
        fk_miembro_1, 
        fk_miembro_2, 
        fk_persona_contacto
    )
    VALUES (
        p_direccion_correo, 
        p_miembro_rif, 
        p_miembro_naturaleza, 
        p_persona_contacto_id
    )
    RETURNING id INTO v_correo_id;

    -- Devolver el ID del correo recién creado
    RETURN v_correo_id;

EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'El correo electrónico "%" ya existe en el sistema.', p_direccion_correo;
    WHEN others THEN
        RAISE EXCEPTION 'Ocurrió un error inesperado al intentar crear el correo: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS fn_create_metodo_pago_cheque(INTEGER, VARCHAR, BIGINT, BIGINT, VARCHAR);

CREATE OR REPLACE FUNCTION fn_create_metodo_pago_cheque(
  p_id_cliente INTEGER,
  p_tipo_cliente VARCHAR,
  p_numero_cheque BIGINT,
  p_banco VARCHAR
)
RETURNS TABLE(nuevo_metodo_id INTEGER) AS $$
DECLARE
  metodo_id INTEGER;
  cliente_metodo_pago_id INTEGER;
BEGIN
  -- Siempre crea un nuevo método de pago de tipo 'cheque'.
  -- La constraint UNIQUE en 'numero_cheque' previene la inserción de un cheque duplicado.
  INSERT INTO metodo_pago(tipo, numero_cheque, banco)
  VALUES ('cheque', p_numero_cheque, p_banco) RETURNING id INTO metodo_id;

  -- Anexar el método de pago al cliente y capturar el ID de la tabla de enlace.
  cliente_metodo_pago_id := fn_anexar_cliente_metodo_pago(metodo_id, p_id_cliente, p_tipo_cliente);

  RETURN QUERY SELECT cliente_metodo_pago_id as nuevo_metodo_id;
END 
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS fn_create_metodo_pago_efectivo(INTEGER, VARCHAR, VARCHAR);

CREATE OR REPLACE FUNCTION fn_create_metodo_pago_efectivo(
  p_id_cliente INTEGER,
  p_tipo_cliente VARCHAR,
  p_denominacion VARCHAR
)
RETURNS TABLE(nuevo_metodo_id INTEGER) AS $$ 
DECLARE 
  metodo_id INTEGER;
BEGIN
  -- Intenta encontrar un método de pago existente
  SELECT id INTO metodo_id 
  FROM metodo_pago 
  WHERE tipo = 'efectivo' AND denominación = p_denominacion;

  -- Si no existe, crea uno nuevo
  IF metodo_id IS NULL THEN
    INSERT INTO metodo_pago(tipo, denominación)
    VALUES ('efectivo', p_denominacion) 
    RETURNING id INTO metodo_id;
  END IF;

  -- Anexar el método de pago al cliente.
  PERFORM fn_anexar_cliente_metodo_pago(metodo_id, p_id_cliente, p_tipo_cliente);

  RETURN QUERY SELECT metodo_id as nuevo_metodo_id;

END;
$$ language plpgsql;

DROP FUNCTION IF EXISTS fn_create_metodo_pago_punto(INTEGER, VARCHAR);

CREATE OR REPLACE FUNCTION fn_create_metodo_pago_punto(
  p_id_cliente INTEGER,
  p_tipo_cliente VARCHAR
)
RETURNS TABLE(nuevo_metodo_id INTEGER) AS $$
DECLARE
  metodo_id INTEGER;
  cliente_metodo_pago_id INTEGER;
BEGIN
  -- Siempre se crea un nuevo método de pago de tipo 'punto'
  INSERT INTO metodo_pago(tipo, fecha_adquisicion, fecha_canjeo)
  VALUES ('punto', CURRENT_DATE, NULL)
  RETURNING id INTO metodo_id;

  -- Anexar el método de pago al cliente y capturar el ID de la tabla de enlace.
  cliente_metodo_pago_id := fn_anexar_cliente_metodo_pago(metodo_id, p_id_cliente, p_tipo_cliente);

  RETURN QUERY SELECT cliente_metodo_pago_id as nuevo_metodo_id;
END 
$$ language plpgsql;


DROP FUNCTION IF EXISTS fn_create_metodo_pago_tarjeta_credito(INTEGER, VARCHAR, VARCHAR, BIGINT, VARCHAR, DATE);

CREATE OR REPLACE FUNCTION fn_create_metodo_pago_tarjeta_credito(
  p_id_cliente INTEGER,
  p_tipo_cliente VARCHAR,
  p_tipo_tarjeta VARCHAR,
  p_numero BIGINT,
  p_banco VARCHAR,
  p_fecha_vencimiento DATE
)
RETURNS TABLE(nuevo_metodo_id INTEGER) AS $$ 
DECLARE 
  metodo_id INTEGER;
  cliente_metodo_pago_id INTEGER;
BEGIN
  -- Primero, intenta encontrar un método de pago existente con el mismo número de tarjeta.
  SELECT id INTO metodo_id FROM metodo_pago WHERE número = p_numero;

  -- Si no se encuentra un método de pago existente, crea uno nuevo.
  IF metodo_id IS NULL THEN
    INSERT INTO metodo_pago(tipo, tipo_tarjeta, número, banco, fecha_vencimiento)
    VALUES ('tarjeta_credito', p_tipo_tarjeta, p_numero, p_banco, p_fecha_vencimiento)
    RETURNING id INTO metodo_id;
  END IF;

  -- Anexar el método de pago al cliente y capturar el ID de la tabla de enlace.
  cliente_metodo_pago_id := fn_anexar_cliente_metodo_pago(metodo_id, p_id_cliente, p_tipo_cliente);

  RETURN QUERY SELECT cliente_metodo_pago_id as nuevo_metodo_id;
END;
$$ language plpgsql;

DROP FUNCTION IF EXISTS fn_create_metodo_pago_tarjeta_debito(INTEGER, VARCHAR, BIGINT, VARCHAR, DATE);

CREATE OR REPLACE FUNCTION fn_create_metodo_pago_tarjeta_debito(
  p_id_cliente INTEGER,
  p_tipo_cliente VARCHAR,
  p_numero BIGINT,
  p_banco VARCHAR,
  p_fecha_vencimiento DATE
)
RETURNS TABLE(nuevo_metodo_id INTEGER) AS $$
DECLARE
  metodo_id INTEGER;
  cliente_metodo_pago_id INTEGER;
BEGIN
  -- Primero, intenta encontrar un método de pago existente con el mismo número de tarjeta.
  SELECT id INTO metodo_id FROM metodo_pago WHERE número = p_numero;

  -- Si no se encuentra un método de pago existente, crea uno nuevo.
  IF metodo_id IS NULL THEN
    INSERT INTO metodo_pago(tipo, número, banco, fecha_vencimiento)
    VALUES ('tarjeta_debito', p_numero, p_banco, p_fecha_vencimiento) RETURNING id into metodo_id;
  END IF;

  -- Anexar el método de pago al cliente y capturar el ID de la tabla de enlace.
  cliente_metodo_pago_id := fn_anexar_cliente_metodo_pago(metodo_id, p_id_cliente, p_tipo_cliente);

  RETURN QUERY SELECT cliente_metodo_pago_id as nuevo_metodo_id;
END 
$$ language plpgsql;


/**
 * Crea un nuevo pago en el sistema para un cliente
 * @param p_monto DECIMAL - Monto del pago
 * @param p_fecha_pago TIMESTAMP - Fecha y hora del pago
 * @param p_fk_tasa INTEGER - ID de la tasa de cambio aplicada
 * @param p_fk_venta INTEGER - ID de la venta asociada
 * @param p_fk_cliente_metodo_pago_1 INTEGER - ID del método de pago del cliente
 */
CREATE OR REPLACE FUNCTION fn_create_pago_cliente(
    p_monto DECIMAL,
    p_fecha_pago TIMESTAMP,
    p_fk_tasa INTEGER,
    p_fk_venta INTEGER,
    p_fk_cliente_metodo_pago_1 INTEGER
)
RETURNS VOID AS $$
BEGIN
    /**
     * Inserta un nuevo registro de pago de cliente en la tabla 'pago'.
     * Los valores se toman directamente de los parámetros de la función.
     * Los campos no relevantes para un pago de cliente (ej. mensualidad) se omiten.
     */
    INSERT INTO pago (
        monto,
        fecha_pago,
        fk_tasa,
        fk_venta,
        fk_cliente_metodo_pago_1
    )
    VALUES (
        p_monto,
        p_fecha_pago,
        p_fk_tasa,
        p_fk_venta,
        p_fk_cliente_metodo_pago_1
    );
END;
$$ LANGUAGE plpgsql;

/*
 Crea un nuevo pago en el sistema (esta funcion maneja los distintos metodos de pago disponibles)
 */
CREATE OR REPLACE FUNCTION fn_create_pago(
    p_monto DECIMAL(10,2),
    p_fecha_pago TIMESTAMP,
    p_fk_tasa INTEGER,
    p_tipo_transaccion VARCHAR(20),
    p_tipo_metodo_pago VARCHAR(10),
    p_fk_mensualidad_1 INTEGER DEFAULT NULL,
    p_fk_mensualidad_2 INTEGER DEFAULT NULL,
    p_fk_mensualidad_3 CHAR(1) DEFAULT NULL,
    p_fk_venta INTEGER DEFAULT NULL,
    p_fk_orden_de_compra INTEGER DEFAULT NULL,
    p_fk_venta_evento INTEGER DEFAULT NULL,
    p_fk_miembro_metodo_pago_1 INTEGER DEFAULT NULL,
    p_fk_cliente_metodo_pago_1 INTEGER DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    v_pago_id INTEGER;
BEGIN
    /** Configurar valores según tipo de transacción */
    IF p_tipo_transaccion = 'MENSUALIDAD' THEN
        IF p_fk_mensualidad_1 IS NULL OR p_fk_mensualidad_2 IS NULL OR p_fk_mensualidad_3 IS NULL THEN
            RAISE EXCEPTION 'Para pagos de mensualidad se requieren los tres campos de mensualidad';
        END IF;
    ELSIF p_tipo_transaccion = 'VENTA' THEN
        IF p_fk_venta IS NULL THEN
            RAISE EXCEPTION 'Para pagos de venta se requiere el ID de la venta';
        END IF;
    ELSIF p_tipo_transaccion = 'ORDEN_COMPRA' THEN
        IF p_fk_orden_de_compra IS NULL THEN
            RAISE EXCEPTION 'Para pagos de orden de compra se requiere el ID de la orden';
        END IF;
    ELSIF p_tipo_transaccion = 'VENTA_EVENTO' THEN
        IF p_fk_venta_evento IS NULL THEN
            RAISE EXCEPTION 'Para pagos de venta de evento se requiere el ID de la venta de evento';
        END IF;
    ELSE
        RAISE EXCEPTION 'Tipo de transacción inválido: %. Debe ser MENSUALIDAD, VENTA, ORDEN_COMPRA o VENTA_EVENTO', p_tipo_transaccion;
    END IF;

    /** Configurar valores según tipo de método de pago */
    IF p_tipo_metodo_pago = 'MIEMBRO' THEN
        IF p_fk_miembro_metodo_pago_1 IS NULL THEN
            RAISE EXCEPTION 'Para métodos de pago de miembro se requiere el ID del método de pago del miembro';
        END IF;
    ELSIF p_tipo_metodo_pago = 'CLIENTE' THEN
        IF p_fk_cliente_metodo_pago_1 IS NULL THEN
            RAISE EXCEPTION 'Para métodos de pago de cliente se requiere el ID del método de pago del cliente';
        END IF;
    ELSE
        RAISE EXCEPTION 'Tipo de método de pago inválido: %. Debe ser MIEMBRO o CLIENTE', p_tipo_metodo_pago;
    END IF;

    INSERT INTO pago (
        monto,
        fecha_pago,
        fk_tasa,
        fk_mensualidad_1,
        fk_mensualidad_2,
        fk_mensualidad_3,
        fk_venta,
        fk_orden_de_compra,
        fk_venta_evento,
        fk_miembro_metodo_pago_1,
        fk_cliente_metodo_pago_1
    ) VALUES (
        p_monto,
        p_fecha_pago,
        p_fk_tasa,
        p_fk_mensualidad_1,
        p_fk_mensualidad_2,
        p_fk_mensualidad_3,
        p_fk_venta,
        p_fk_orden_de_compra,
        p_fk_venta_evento,
        p_fk_miembro_metodo_pago_1,
        p_fk_cliente_metodo_pago_1
    ) RETURNING id INTO v_pago_id; 

    /** Retornar el ID del pago creado */
    RETURN v_pago_id;

EXCEPTION
    WHEN OTHERS THEN
        /** La DB maneja constraints y FK automáticamente con mensajes */
        RAISE;
END;
$$ LANGUAGE plpgsql;

/**
 * create_permission
 *
 * Propósito: Crear un nuevo permiso en el sistema.
 *
 * Parámetros:
 *   - p_nombre (VARCHAR): El nombre del permiso (ej: 'ver_usuarios').
 *   - p_descripcion (VARCHAR): Una descripción detallada de lo que hace el permiso.
 *
 * Retorna:
 *   - INTEGER: El ID del permiso recién creado.
 */
CREATE OR REPLACE FUNCTION fn_create_permission(
    p_nombre VARCHAR(50),
    p_descripcion VARCHAR(255)
)
RETURNS INTEGER AS $$
DECLARE
    new_permission_id INTEGER;
BEGIN
    /**
     * Inserta el nuevo permiso en la tabla 'permiso'
     * y obtiene el ID generado para retornarlo.
     */
    INSERT INTO permiso (nombre, descripción)
    VALUES (p_nombre, p_descripcion)
    RETURNING id INTO new_permission_id;

    RETURN new_permission_id;
EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'Ya existe un permiso con el nombre ''%''.', p_nombre;
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error inesperado al crear el permiso: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

/**
 * create_rol
 *
 * Propósito: Crear un nuevo rol y asignarle un conjunto de permisos.
 *
 * Parámetros:
 *   - p_nombre (VARCHAR): El nombre del nuevo rol (ej: 'Administrador').
 *   - p_permission_ids (INTEGER[]): Un arreglo de IDs de los permisos que se asignarán al rol.
 *
 * Retorna:
 *   - INTEGER: El ID del rol recién creado.
 */
CREATE OR REPLACE FUNCTION fn_create_rol(
    p_nombre VARCHAR(50),
    p_permission_ids INTEGER[]
)
RETURNS INTEGER AS $$
DECLARE
    new_rol_id INTEGER;
    permission_id INTEGER;
BEGIN
    /**
     * Inserta el nuevo rol en la tabla 'rol'
     * y obtiene el ID generado.
     */
    INSERT INTO rol (nombre)
    VALUES (p_nombre)
    RETURNING id INTO new_rol_id;

    /**
     * Si se proporcionó una lista de IDs de permisos,
     * itera sobre ellos y los inserta en la tabla de relación 'permiso_rol'.
     */
    IF p_permission_ids IS NOT NULL AND array_length(p_permission_ids, 1) > 0 THEN
        FOREACH permission_id IN ARRAY p_permission_ids
        LOOP
            INSERT INTO permiso_rol (fk_rol, fk_permiso)
            VALUES (new_rol_id, permission_id);
        END LOOP;
    END IF;

    /**
     * Retorna el ID del nuevo rol creado.
     */
    RETURN new_rol_id;
EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'Ya existe un rol con el nombre ''%''.', p_nombre;
    WHEN foreign_key_violation THEN
        RAISE EXCEPTION 'Uno o más IDs de permisos no son válidos.';
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error inesperado al crear el rol: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fn_create_user(
    p_person_id INT,
    p_person_type VARCHAR,
    p_person_naturaleza CHAR(1),
    p_rol_id INT,
    p_email VARCHAR,
    p_password VARCHAR
)
RETURNS INT AS $$
DECLARE
    v_correo_id INT;
    v_usuario_id INT;
    v_existing_email_id INT;
BEGIN
    /**
     * Crea un nuevo usuario en el sistema.
     *
     * Pasos:
     * 1. Verifica si existe un correo asociado a la persona, sino crea uno nuevo.
     * 2. Crea el registro del usuario en la tabla 'usuario'.
     * 3. Asocia el usuario a la entidad persona correspondiente (cliente, empleado o miembro).
     *
     * @param p_person_id El ID de la persona (ID para cliente/empleado, RIF para miembro).
     * @param p_person_type El tipo de persona: 'Cliente Natural', 'Cliente Jurídico', 'Empleado', 'Miembro'.
     * @param p_person_naturaleza La naturaleza del documento (e.g., 'V', 'J', 'E'). Requerido para 'Miembro'.
     * @param p_rol_id El ID del rol a asignar.
     * @param p_email La dirección de correo electrónico para el nuevo usuario.
     * @param p_password La contraseña para el nuevo usuario.
     * @return El ID del nuevo usuario creado.
     */

    -- Paso 1: Buscar si ya existe un correo con esa dirección
    -- Primero verificar si existe el correo en la tabla
    SELECT id INTO v_existing_email_id
    FROM correo
    WHERE dirección_correo = p_email
    LIMIT 1;

    IF v_existing_email_id IS NOT NULL THEN
        -- Si el correo ya existe, verificar que no esté asociado a otro usuario
        IF EXISTS (SELECT 1 FROM usuario WHERE fk_correo = v_existing_email_id) THEN
            RAISE EXCEPTION 'El correo % ya está asociado a otro usuario', p_email;
        END IF;
        
        -- Verificar que el correo pertenezca a la persona correcta si es miembro o persona_contacto
        IF p_person_type = 'Miembro' THEN
            IF NOT EXISTS (
                SELECT 1 FROM correo 
                WHERE id = v_existing_email_id 
                AND fk_miembro_1 = p_person_id 
                AND fk_miembro_2 = p_person_naturaleza
            ) THEN
                RAISE EXCEPTION 'El correo % no pertenece al miembro especificado', p_email;
            END IF;
        ELSIF EXISTS (
            SELECT 1 FROM correo 
            WHERE id = v_existing_email_id 
            AND fk_persona_contacto IS NOT NULL
        ) THEN
            -- Si el correo está asociado a una persona_contacto, verificar la relación
            DECLARE
                v_pc_id INT;
            BEGIN
                SELECT fk_persona_contacto INTO v_pc_id
                FROM correo 
                WHERE id = v_existing_email_id;
                
                -- Verificar si la persona_contacto está relacionada con el cliente jurídico
                IF p_person_type = 'Cliente Jurídico' AND NOT EXISTS (
                    SELECT 1 FROM persona_contacto 
                    WHERE id = v_pc_id 
                    AND fk_cliente_juridico = p_person_id
                ) THEN
                    RAISE EXCEPTION 'El correo % no pertenece a una persona de contacto del cliente jurídico', p_email;
                END IF;
            END;
        END IF;
        
        v_correo_id := v_existing_email_id;
    ELSE
        -- Si no existe, crear un nuevo registro de correo
        -- Asociar el correo directamente si es un miembro
        IF p_person_type = 'Miembro' THEN
            v_correo_id := fn_create_email(p_email, p_person_id, p_person_naturaleza, NULL);
        ELSE
            -- Para otros tipos, crear sin asociación directa
            v_correo_id := fn_create_email(p_email, NULL, NULL, NULL);
        END IF;
    END IF;

    -- Paso 2: Crear el registro del usuario.
    INSERT INTO usuario (contraseña, fk_rol, fk_correo)
    VALUES (p_password, p_rol_id, v_correo_id)
    RETURNING id INTO v_usuario_id;

    -- Paso 3: Asociar el usuario a la entidad persona correspondiente.
    IF p_person_type = 'Cliente Natural' THEN
        INSERT INTO cliente_usuario (fk_cliente_natural, fk_usuario)
        VALUES (p_person_id, v_usuario_id);

    ELSIF p_person_type = 'Cliente Jurídico' THEN
        INSERT INTO cliente_usuario (fk_cliente_juridico, fk_usuario)
        VALUES (p_person_id, v_usuario_id);

    ELSIF p_person_type = 'Empleado' THEN
        INSERT INTO empleado_usuario (fk_empleado, fk_usuario)
        VALUES (p_person_id, v_usuario_id);
        
    ELSIF p_person_type = 'Miembro' THEN
        INSERT INTO miembro_usuario (fk_usuario, fk_miembro_1, fk_miembro_2)
        VALUES (v_usuario_id, p_person_id, p_person_naturaleza);

    ELSE
        RAISE EXCEPTION 'Tipo de persona inválido: %', p_person_type;
    END IF;

    -- Devolver el ID del usuario creado.
    RETURN v_usuario_id;

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE EXCEPTION 'El rol especificado o la persona no existe.';
    WHEN OTHERS THEN
        -- En caso de cualquier error, se levanta una excepción para asegurar que la transacción se revierta.
        RAISE EXCEPTION 'Error al crear el usuario: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;


/**
 * Crea una nueva venta en el sistema manejando los diferentes tipos de tiendas
 * y compradores según las reglas de negocio establecidas.
 */
CREATE OR REPLACE FUNCTION fn_create_venta(
    p_monto_total DECIMAL(10,2),
    p_direccion_entrega VARCHAR(255) DEFAULT NULL,
    p_observacion VARCHAR(255) DEFAULT NULL,
    p_fk_usuario INTEGER DEFAULT NULL,
    p_fk_lugar INTEGER DEFAULT NULL,
    p_fk_cliente_juridico INTEGER DEFAULT NULL,
    p_fk_cliente_natural INTEGER DEFAULT NULL,
    p_fk_tienda_fisica INTEGER DEFAULT NULL,
    p_fk_tienda_web INTEGER DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    v_venta_id INTEGER;
BEGIN
    /**
     * Función para crear una nueva venta en el sistema.
     * 
     * @param p_monto_total Monto total de la venta
     * @param p_direccion_entrega Dirección de entrega (opcional para tienda física)
     * @param p_observacion Observaciones adicionales (opcional)
     * @param p_fk_usuario ID del usuario (para ventas web)
     * @param p_fk_lugar ID del lugar de entrega (para ventas web)
     * @param p_fk_cliente_juridico ID del cliente jurídico (para ventas físicas)
     * @param p_fk_cliente_natural ID del cliente natural (para ventas físicas)
     * @param p_fk_tienda_fisica ID de la tienda física
     * @param p_fk_tienda_web ID de la tienda web
     * @return ID de la venta creada
     */

    /** Insertar la nueva venta - Los constraints de la DB manejan todas las validaciones */
    INSERT INTO venta (
        monto_total,
        dirección_entrega,
        observación,
        fk_usuario,
        fk_lugar,
        fk_cliente_juridico,
        fk_cliente_natural,
        fk_tienda_fisica,
        fk_tienda_web
    ) VALUES (
        p_monto_total,
        p_direccion_entrega,
        p_observacion,
        p_fk_usuario,
        p_fk_lugar,
        p_fk_cliente_juridico,
        p_fk_cliente_natural,
        p_fk_tienda_fisica,
        p_fk_tienda_web
    ) RETURNING id INTO v_venta_id;

    /** Retornar el ID de la venta creada */
    RETURN v_venta_id;

EXCEPTION
    WHEN OTHERS THEN
        /** La DB maneja constraints y FK automáticamente */
        RAISE;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fn_delete_role(p_id INTEGER)
RETURNS VOID AS $$
BEGIN
    -- Verificar si el rol está en uso por algún usuario
    IF EXISTS (SELECT 1 FROM usuario WHERE fk_rol = p_id) THEN
        RAISE EXCEPTION 'El rol está asignado a uno o más usuarios y no puede ser eliminado.';
    END IF;

    -- Eliminar las relaciones del rol en permiso_rol
    DELETE FROM permiso_rol WHERE fk_rol = p_id;

    -- Eliminar el rol
    DELETE FROM rol WHERE id = p_id;

EXCEPTION
    WHEN OTHERS THEN
        -- Manejo de cualquier otro error
        RAISE NOTICE 'Error al eliminar el rol: %', SQLERRM;
        RAISE;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fn_delete_usuario(p_usuario_id INTEGER)
RETURNS VOID AS $$
/**
 * Función para eliminar un usuario y sus relaciones dependientes.
 *
 * @param p_usuario_id El ID del usuario a eliminar.
 *
 * @dev Esta función elimina las referencias al usuario en las tablas
 *      de relación `empleado_usuario`, `cliente_usuario` y `miembro_usuario`.
 *      Posteriormente, elimina al usuario de la tabla `usuario` y, finalmente,
 *      elimina el correo electrónico asociado de la tabla `correo`.
 *      Se asume que el correo electrónico del usuario es exclusivo para ese usuario.
 */
DECLARE
    v_correo_id INTEGER;
BEGIN
    -- Eliminar pagos asociados a las ventas del usuario
    DELETE FROM pago
    WHERE fk_venta IN (SELECT id FROM venta WHERE fk_usuario = p_usuario_id);
    
    -- Eliminar estados de venta asociados a las ventas del usuario
    DELETE FROM status_venta
    WHERE fk_venta IN (SELECT id FROM venta WHERE fk_usuario = p_usuario_id);
    
    -- Eliminar detalles de presentación asociados a las ventas del usuario
    DELETE FROM detalle_presentacion
    WHERE fk_venta IN (SELECT id FROM venta WHERE fk_usuario = p_usuario_id);

    -- Eliminar ventas asociadas al usuario
    DELETE FROM venta WHERE fk_usuario = p_usuario_id;

    -- Eliminar relaciones del usuario en otras tablas
    DELETE FROM empleado_usuario WHERE fk_usuario = p_usuario_id;
    DELETE FROM cliente_usuario WHERE fk_usuario = p_usuario_id;
    DELETE FROM miembro_usuario WHERE fk_usuario = p_usuario_id;

    -- Obtener el ID del correo antes de eliminar el usuario
    SELECT fk_correo INTO v_correo_id FROM usuario WHERE id = p_usuario_id;

    -- Eliminar el usuario
    DELETE FROM usuario WHERE id = p_usuario_id;

    -- Eliminar el correo asociado si existe
    IF v_correo_id IS NOT NULL THEN
        DELETE FROM correo WHERE id = v_correo_id;
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al eliminar el usuario con ID %: %', p_usuario_id, SQLERRM;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS fn_get_all_ordenes_de_compra;
/**
 * Función que obtiene un resumen de todas las órdenes de compra.
 * @returns tabla con información resumida de las órdenes de compra.
 */
CREATE OR REPLACE FUNCTION fn_get_all_ordenes_de_compra()
RETURNS TABLE (
    orden_id                INTEGER,
    fecha_solicitud         DATE,
    proveedor_rif           INTEGER,
    proveedor_naturaleza_rif CHAR(1),
    proveedor_razon_social  VARCHAR(255),
    usuario_nombre          VARCHAR,
    precio_total            DECIMAL(10,2),
    estado_actual           VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        odc.id AS orden_id,
        odc.fecha_solicitud,
        prov.rif AS proveedor_rif,
        prov.naturaleza_rif AS proveedor_naturaleza_rif,
        prov.razón_social AS proveedor_razon_social,
        COALESCE(
            e.primer_nombre || ' ' || e.primer_apellido,
            cn.primer_nombre || ' ' || cn.primer_apellido,
            cj.razón_social,
            m_user.razón_social
        )::VARCHAR AS usuario_nombre,
        COALESCE(pc.precio * odc.unidades, 0) AS precio_total,
        COALESCE(s.nombre, 'Pendiente')::VARCHAR(50) AS estado_actual
    FROM orden_de_compra odc
    
    -- Joins para obtener información del producto
    LEFT JOIN presentacion_cerveza pc
        ON odc.fk_presentacion_cerveza_1 = pc.fk_presentacion
        AND odc.fk_presentacion_cerveza_2 = pc.fk_cerveza
    
    -- Joins para obtener información del usuario
    LEFT JOIN usuario u 
        ON odc.fk_usuario = u.id
    LEFT JOIN empleado_usuario eu 
        ON u.id = eu.fk_usuario
    LEFT JOIN empleado e 
        ON eu.fk_empleado = e.id
    LEFT JOIN cliente_usuario cu 
        ON u.id = cu.fk_usuario
    LEFT JOIN cliente_natural cn 
        ON cu.fk_cliente_natural = cn.id
    LEFT JOIN cliente_juridico cj 
        ON cu.fk_cliente_juridico = cj.id
    LEFT JOIN miembro_usuario mu
        ON u.id = mu.fk_usuario
    LEFT JOIN miembro m_user 
        ON mu.fk_miembro_1 = m_user.rif AND mu.fk_miembro_2 = m_user.naturaleza_rif
    
    -- Join para obtener información del proveedor (miembro)
    LEFT JOIN miembro prov
        ON odc.fk_miembro_1 = prov.rif
        AND odc.fk_miembro_2 = prov.naturaleza_rif
        
    -- Join para obtener el estado actual de la orden (el más reciente)
    LEFT JOIN LATERAL (
        SELECT fk_status
        FROM status_orden
        WHERE fk_orden_de_compra = odc.id
        ORDER BY fecha_actualización DESC
        LIMIT 1
    ) so_latest ON true
    LEFT JOIN status s
        ON so_latest.fk_status = s.id
        
    ORDER BY odc.fecha_solicitud DESC, odc.id DESC;
    
END;
$$ LANGUAGE plpgsql; 

DROP FUNCTION IF EXISTS fn_get_cliente_by_doc(CHAR, INTEGER);

CREATE OR REPLACE FUNCTION fn_get_cliente_by_doc(
    IN p_doc_type CHAR,
    IN p_doc_number INTEGER
)

RETURNS TABLE (
    id_usuario INTEGER,
    id_cliente INTEGER,
    nombre_completo VARCHAR,
    razon_social VARCHAR,
    denominacion_comercial VARCHAR,
    email VARCHAR,
    telefono VARCHAR,
    rol_nombre VARCHAR,
    id_rol INTEGER,
    tipo_cliente VARCHAR,
    identificacion VARCHAR,
    direccion VARCHAR,
    direccion_fiscal VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    -- Trae la tabla temporal sobre la que se va a trabajar
    WITH user_base AS (
        SELECT
            u.id as user_id,
            COALESCE(cn.id, cj.id) as id_cliente,
            cn.id as cliente_natural_id,
            cj.id as cliente_juridico_id,
      
            c.dirección_correo,
            r.nombre as rol_nombre,
            r.id as id_rol,
            CASE
                WHEN cn.id IS NOT NULL THEN 'natural'
                ELSE 'juridico'
            END as tipo_cliente_val,
            cn, cj
        FROM
            usuario u
        JOIN cliente_usuario cu ON u.id = cu.fk_usuario
        LEFT JOIN cliente_natural cn ON cu.fk_cliente_natural = cn.id
        LEFT JOIN cliente_juridico cj ON cu.fk_cliente_juridico = cj.id
        JOIN rol r ON u.fk_rol = r.id
        JOIN correo c ON u.fk_correo = c.id
        WHERE
            (cn.nacionalidad = p_doc_type AND cn.ci = p_doc_number) OR
            (cj.naturaleza_rif = p_doc_type AND cj.rif = p_doc_number)
    )
    SELECT
        ub.user_id,
        ub.id_cliente,
        -- Trae el nombre completo o la razon social del cliente (el primero que no sea null)
        COALESCE(
            (ub.cn).primer_nombre || ' ' || (ub.cn).primer_apellido,
            (ub.cj).razón_social
        )::VARCHAR,
        (ub.cj).razón_social::VARCHAR,
        (ub.cj).denominación_comercial::VARCHAR,
        ub.dirección_correo::VARCHAR,
        COALESCE(
            (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_cliente_natural = ub.cliente_natural_id LIMIT 1),
            (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_cliente_juridico = ub.cliente_juridico_id LIMIT 1)
        )::VARCHAR,
        ub.rol_nombre::VARCHAR,
        ub.id_rol::INTEGER,
        ub.tipo_cliente_val::VARCHAR,
        COALESCE(
            (ub.cn).nacionalidad || '-' || (ub.cn).ci,
            (ub.cj).naturaleza_rif || '-' || (ub.cj).rif
        )::VARCHAR,
        COALESCE(
            (ub.cn).dirección,
            (ub.cj).dirección
        )::VARCHAR,
        (ub.cj).dirección_fiscal::VARCHAR
    FROM user_base ub;
END;
$$;


CREATE OR REPLACE FUNCTION fn_get_empleado_by_cedula(p_cedula INTEGER)
RETURNS TABLE (
    id INTEGER,
    nombre_completo VARCHAR,
    rol VARCHAR,
    permisos INTEGER[] -- Array de fks de permisos
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        u.id,
        (e.primer_nombre || ' ' || e.primer_apellido)::VARCHAR,
        r.nombre as rol,
        ARRAY_AGG(p.id) as permisos
    FROM usuario u
    JOIN rol r ON u.fk_rol = r.id
    JOIN permiso_rol pr ON r.id = pr.fk_rol
    JOIN permiso p ON pr.fk_permiso = p.id
    JOIN empleado_usuario eu ON u.id = eu.fk_usuario
    JOIN empleado e ON eu.fk_empleado = e.id
    WHERE e.ci = p_cedula
    GROUP BY 1, 2, 3;

END;
$$;

/**
 * fn_get_empleado_info_by_id
 * 
 */
CREATE OR REPLACE FUNCTION fn_get_empleado_info_by_id(p_empleado_id INTEGER)
RETURNS TABLE (
    id_empleado INTEGER,
    nombre_completo VARCHAR,
    identificacion VARCHAR,
    fecha_nacimiento DATE,
    cargo VARCHAR,
    departamento VARCHAR,
    salario_base DECIMAL,
    fecha_inicio_nomina DATE,
    fecha_fin_nomina DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.id,
        (e.primer_nombre || ' ' || e.primer_apellido)::VARCHAR,
        (e.nacionalidad || '-' || e.ci)::VARCHAR,
        e.fecha_nacimiento,
        c.nombre::VARCHAR,
        d.nombre::VARCHAR,
        c.salario_base,
        n.fecha_inicio,
        n.fecha_fin
    FROM
        empleado e
    LEFT JOIN (
        -- Subconsulta para obtener la nómina más reciente
        SELECT *
        FROM nomina
        WHERE fk_empleado = p_empleado_id
        ORDER BY fecha_inicio DESC
        LIMIT 1
    ) AS n ON e.id = n.fk_empleado
    LEFT JOIN cargo c ON n.fk_cargo = c.id
    LEFT JOIN departamento d ON n.fk_departamento = d.id
    WHERE e.id = p_empleado_id;
END;
$$;

DROP FUNCTION IF EXISTS fn_get_inventory();

/**
 * @name fn_get_inventory
 * @description Obtiene un resumen del inventario de productos, detallando el stock en almacén y en anaquel.
 * @returns TABLE - Devuelve una tabla con las siguientes columnas:
 *   - "SKU": El SKU único de la presentación de la cerveza. Si es nulo, se muestra la combinación de los IDs de presentación y cerveza.
 *   - "Nombre": El nombre de la cerveza.
 *   - "Categoría": El tipo o categoría de la cerveza.
 *   - "Stock Total": La suma del stock en almacén y en anaquel.
 *   - "En Almacén": La cantidad de unidades en todos los almacenes.
 *   - "En Anaquel": La cantidad de unidades en todas las tiendas físicas (anaqueles).
 */
CREATE OR REPLACE FUNCTION fn_get_inventory()
RETURNS TABLE (
    "SKU" VARCHAR(25), -- Aumentado para acomodar la combinación de FKs
    "Nombre" VARCHAR(255),
    "Categoría" VARCHAR(255),
    "Stock Total" BIGINT,
    "En Almacén" BIGINT,
    "En Anaquel" BIGINT
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        COALESCE(pc.sku, pc.fk_presentacion::VARCHAR || '-' || pc.fk_cerveza::VARCHAR),
        c.nombre,
        tc.nombre,
        (COALESCE(sa.total_almacen, 0) + COALESCE(san.total_anaquel, 0))::BIGINT,
        COALESCE(sa.total_almacen, 0)::BIGINT,
        COALESCE(san.total_anaquel, 0)::BIGINT
    FROM
        presentacion_cerveza pc
    JOIN
        cerveza c ON pc.fk_cerveza = c.id
    JOIN
        tipo_cerveza tc ON c.fk_tipo_cerveza = tc.id
    LEFT JOIN (
        SELECT
            i.fk_presentacion_cerveza_1,
            i.fk_presentacion_cerveza_2,
            SUM(i.cantidad_almacen) AS total_almacen
        FROM
            inventario i
        GROUP BY
            i.fk_presentacion_cerveza_1,
            i.fk_presentacion_cerveza_2
    ) sa ON pc.fk_presentacion = sa.fk_presentacion_cerveza_1 AND pc.fk_cerveza = sa.fk_presentacion_cerveza_2
    LEFT JOIN (
        SELECT
            lti.fk_inventario_1,
            lti.fk_inventario_2,
            SUM(lti.cantidad) AS total_anaquel
        FROM
            lugar_tienda_inventario lti
        GROUP BY
            lti.fk_inventario_1,
            lti.fk_inventario_2
    ) san ON pc.fk_presentacion = san.fk_inventario_1 AND pc.fk_cerveza = san.fk_inventario_2
    ORDER BY
        1;
END;
$$;

DROP FUNCTION IF EXISTS fn_get_orden_de_compra_by_id(INTEGER);
DROP FUNCTION IF EXISTS fn_get_ordenes_de_compra();

/**
 * Función que obtiene una orden de compra específica por su ID con información detallada
 * @param p_id - ID de la orden de compra
 * @returns tabla con información completa de la orden de compra
 * Incluye: orden, producto, usuario solicitante, proveedor, precios, fechas y estado
 */
CREATE OR REPLACE FUNCTION fn_get_orden_de_compra_by_id(p_id INTEGER)
RETURNS TABLE (
    orden_id                INTEGER,
    fecha_solicitud         DATE,
    fecha_entrega           DATE,
    observacion             VARCHAR(255),
    unidades_solicitadas    INTEGER,
    -- Información del producto
    sku                     VARCHAR(20),
    nombre_cerveza          VARCHAR(255),
    nombre_presentacion     VARCHAR(50),
    precio_unitario         DECIMAL(10,2),
    precio_total            DECIMAL(10,2),
    -- Información del usuario que solicita
    usuario_nombre          VARCHAR,
    -- Información del proveedor
    proveedor_rif           INTEGER,
    proveedor_naturaleza_rif CHAR(1),
    proveedor_razon_social  VARCHAR(255),
    -- Estado actual de la orden
    estado_actual           VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        -- Información básica de la orden
        odc.id AS orden_id,
        odc.fecha_solicitud,
        odc.fecha_entrega,
        odc.observacion,
        odc.unidades AS unidades_solicitadas,
        
        -- Información del producto
        pc.sku,
        c.nombre AS nombre_cerveza,
        p.nombre AS nombre_presentacion,
        pc.precio AS precio_unitario,
        (pc.precio * odc.unidades) AS precio_total,
        
        -- Información del usuario
        COALESCE(
            e.primer_nombre || ' ' || e.primer_apellido,
            cn.primer_nombre || ' ' || cn.primer_apellido,
            cj.razón_social,
            m_user.razón_social
        )::VARCHAR AS usuario_nombre,
        
        -- Información del proveedor (miembro)
        prov.rif AS proveedor_rif,
        prov.naturaleza_rif AS proveedor_naturaleza_rif,
        prov.razón_social AS proveedor_razon_social,
        
        -- Estado actual de la orden
        COALESCE(s.nombre, 'Pendiente')::VARCHAR(50) AS estado_actual
        
    FROM orden_de_compra odc
    
    -- Joins para obtener información del producto
    INNER JOIN presentacion_cerveza pc
        ON odc.fk_presentacion_cerveza_1 = pc.fk_presentacion
        AND odc.fk_presentacion_cerveza_2 = pc.fk_cerveza
    INNER JOIN presentacion p
        ON pc.fk_presentacion = p.id
    INNER JOIN cerveza c
        ON pc.fk_cerveza = c.id
        
    -- Joins para obtener información del usuario
    LEFT JOIN usuario u 
        ON odc.fk_usuario = u.id
    LEFT JOIN empleado_usuario eu 
        ON u.id = eu.fk_usuario
    LEFT JOIN empleado e 
        ON eu.fk_empleado = e.id
    LEFT JOIN cliente_usuario cu 
        ON u.id = cu.fk_usuario
    LEFT JOIN cliente_natural cn 
        ON cu.fk_cliente_natural = cn.id
    LEFT JOIN cliente_juridico cj 
        ON cu.fk_cliente_juridico = cj.id
    LEFT JOIN miembro_usuario mu
        ON u.id = mu.fk_usuario
    LEFT JOIN miembro m_user 
        ON mu.fk_miembro_1 = m_user.rif AND mu.fk_miembro_2 = m_user.naturaleza_rif
    
    -- Join para obtener información del proveedor (miembro)
    LEFT JOIN miembro prov
        ON odc.fk_miembro_1 = prov.rif
        AND odc.fk_miembro_2 = prov.naturaleza_rif
        
    -- Join para obtener el estado actual de la orden (el más reciente)
    LEFT JOIN LATERAL (
        SELECT fk_status
        FROM status_orden
        WHERE fk_orden_de_compra = odc.id
        ORDER BY fecha_actualización DESC
        LIMIT 1
    ) so_latest ON true
    LEFT JOIN status s
        ON so_latest.fk_status = s.id
        
    WHERE odc.id = p_id;
    
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS fn_get_orden_de_reposicion_by_id(INTEGER);

/**
 * @name fn_get_orden_de_reposicion_by_id
 * @description Obtiene el detalle de una orden de reposición de inventario específica.
 * @param p_order_id - ID de la orden de reposición a buscar.
 * @returns TABLE - Devuelve una tabla con las siguientes columnas:
 *   - "ID de Orden": Identificador único de la orden de reposición.
 *   - "Producto": Nombre del producto y su presentación (ej: "Zulia (Botella 330ml)").
 *   - "SKU": SKU del producto.
 *   - "Unidades Solicitadas": Cantidad de unidades solicitadas en la orden.
 *   - "Fecha de Orden": Fecha en que se creó la orden.
 *   - "Lugar de Reposición": Nombre del lugar en la tienda donde se debe reponer el producto.
 *   - "Estado": Estado actual de la orden de reposición (ej: "Pendiente", "En Proceso", "Completada").
 *   - "Fecha de Estado": Fecha del último estado de la orden de reposición.
 *   - "Empleado": Nombre y apellido del empleado que solicitó la reposición.
 *   - "Observación": Observaciones adicionales de la orden.
 */
CREATE OR REPLACE FUNCTION fn_get_orden_de_reposicion_by_id(p_order_id INTEGER)
RETURNS TABLE (
    "ID de Orden" INTEGER,
    "Producto" VARCHAR,
    "SKU" VARCHAR(20),
    "Unidades Solicitadas" INTEGER,
    "Fecha de Orden" DATE,
    "Lugar de Reposición" VARCHAR(255),
    "Estado" VARCHAR(50),
    "Fecha de Estado" DATE,
    "Empleado" VARCHAR,
    "Observación" VARCHAR(100)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        o.id AS "ID de Orden",
        (c.nombre || ' (' || pr.nombre || ' ' || pr.unidades || ' unidades)') ::VARCHAR AS "Producto",
        pc.sku AS "SKU",
        o.unidades AS "Unidades Solicitadas",
        o.fecha_orden AS "Fecha de Orden",
        lt.nombre AS "Lugar de Reposición",
        s.nombre AS "Estado",
        so_latest.fecha_actualización::DATE AS "Fecha de Estado",
        (e.primer_nombre || ' ' || e.primer_apellido)::VARCHAR AS "Empleado",
        o.observacion AS "Observación"
    FROM
        orden_de_reposicion o
    LEFT JOIN LATERAL (
        SELECT fecha_actualización, fk_status
        FROM status_orden
        WHERE fk_orden_de_reposicion = o.id
        ORDER BY fecha_actualización DESC
        LIMIT 1
    ) so_latest ON true
    LEFT JOIN
        status s ON so_latest.fk_status = s.id
    LEFT JOIN
        empleado e ON o.fk_empleado = e.id
    LEFT JOIN
        lugar_tienda lt ON o.fk_lugar_tienda_1 = lt.id
    LEFT JOIN
        presentacion_cerveza pc ON o.fk_inventario_1 = pc.fk_presentacion AND o.fk_inventario_2 = pc.fk_cerveza
    LEFT JOIN
        cerveza c ON pc.fk_cerveza = c.id
    LEFT JOIN
        presentacion pr ON pc.fk_presentacion = pr.id
    WHERE
        o.id = p_order_id;
END;
$$; 


DROP FUNCTION IF EXISTS fn_get_ordenes_de_reposicion();

/**
 * @name fn_get_ordenes_de_reposicion
 * @description Obtiene un listado detallado de todas las órdenes de reposición de inventario.
 * @returns TABLE - Devuelve una tabla con las siguientes columnas:
 *   - "ID de Orden": Identificador único de la orden de reposición.
 *   - "Producto": Nombre del producto y su presentación (ej: "Zulia (Botella 330ml)").
 *   - "SKU": SKU del producto.
 *   - "Unidades Solicitadas": Cantidad de unidades solicitadas en la orden.
 *   - "Fecha de Orden": Fecha en que se creó la orden.
 *   - "Lugar de Reposición": Nombre del lugar en la tienda donde se debe reponer el producto.
 *   - "Estado": Estado actual de la orden de reposición (ej: "Pendiente", "En Proceso", "Completada").
 *   - "Fecha de Estado": Fecha del último estado de la orden de reposición.
 *   - "Empleado": Nombre y apellido del empleado que solicitó la reposición.
 *   - "Observación": Observaciones adicionales de la orden.
 *   - "Cantidad en Almacén": Cantidad disponible en el almacén para el producto.
 */
CREATE OR REPLACE FUNCTION fn_get_ordenes_de_reposicion()
RETURNS TABLE (
    "ID de Orden" INTEGER,
    "Producto" VARCHAR,
    "SKU" VARCHAR(20),
    "Unidades Solicitadas" INTEGER,
    "Fecha de Orden" DATE,
    "Lugar de Reposición" VARCHAR(255),
    "Estado" VARCHAR(50),
    "Fecha de Estado" DATE,
    "Usuario" VARCHAR,
    "Observación" TEXT,
    "Cantidad en Almacén" INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        o.id AS "ID de Orden",
        (c.nombre || ' (' || pr.nombre || ' ' || pr.unidades || ' unidades)') ::VARCHAR AS "Producto",
        pc.sku AS "SKU",
        o.unidades AS "Unidades Solicitadas",
        o.fecha_orden AS "Fecha de Orden",
        lt.nombre AS "Lugar de Reposición",
        s.nombre AS "Estado",
        so_latest.fecha_actualización::DATE AS "Fecha de Estado",
        COALESCE(
            e.primer_nombre || ' ' || e.primer_apellido,
            cn.primer_nombre || ' ' || cn.primer_apellido,
            cj.razón_social,
            m.razón_social
        )::VARCHAR AS "Usuario",
        o.observacion AS "Observación",
        i.cantidad_almacen AS "Cantidad en Almacén"
    FROM
        orden_de_reposicion o
    LEFT JOIN LATERAL (
        SELECT fecha_actualización, fk_status
        FROM status_orden
        WHERE fk_orden_de_reposicion = o.id
        ORDER BY fecha_actualización DESC
        LIMIT 1
    ) so_latest ON true
    LEFT JOIN
        status s ON so_latest.fk_status = s.id
    LEFT JOIN
        usuario u ON o.fk_usuario = u.id
    LEFT JOIN
        empleado_usuario eu ON u.id = eu.fk_usuario
    LEFT JOIN
        empleado e ON eu.fk_empleado = e.id
    LEFT JOIN
        cliente_usuario cu ON u.id = cu.fk_usuario
    LEFT JOIN
        cliente_natural cn ON cu.fk_cliente_natural = cn.id
    LEFT JOIN
        cliente_juridico cj ON cu.fk_cliente_juridico = cj.id
    LEFT JOIN
        miembro_usuario mu ON u.id = mu.fk_usuario
    LEFT JOIN
        miembro m ON mu.fk_miembro_1 = m.rif AND mu.fk_miembro_2 = m.naturaleza_rif
    LEFT JOIN
        lugar_tienda lt ON o.fk_lugar_tienda_1 = lt.id
    LEFT JOIN
        inventario i ON o.fk_inventario_1 = i.fk_presentacion_cerveza_1 
            AND o.fk_inventario_2 = i.fk_presentacion_cerveza_2 
            AND o.fk_inventario_3 = i.fk_almacen
    LEFT JOIN
        presentacion_cerveza pc ON o.fk_inventario_1 = pc.fk_presentacion AND o.fk_inventario_2 = pc.fk_cerveza
    LEFT JOIN
        cerveza c ON pc.fk_cerveza = c.id
    LEFT JOIN
        presentacion pr ON pc.fk_presentacion = pr.id
    ORDER BY
        o.fecha_orden DESC, o.id DESC;
END;
$$;

/**
 * Obtiene todos los pagos asociados a una venta específica.
 *
 * @param p_venta_id - El ID de la venta a consultar.
 * @returns TABLE - Una tabla con los detalles de cada pago asociado a la venta.
 */
CREATE OR REPLACE FUNCTION fn_get_pagos_by_venta(p_venta_id INTEGER)
RETURNS TABLE (
    monto DECIMAL,
    fecha_pago TIMESTAMP,
    metodo_pago VARCHAR,
    referencia VARCHAR,
    tasa_bcv DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.monto,
        p.fecha_pago,
        (mp.tipo || COALESCE(' ' || mp.tipo_tarjeta, ''))::VARCHAR as metodo_pago,
        CASE
            WHEN mp.número IS NOT NULL THEN '**** ' || SUBSTRING(mp.número::TEXT, LENGTH(mp.número::TEXT) - 3)
            ELSE 'N/A'
        END::VARCHAR as referencia,
        t.monto_equivalencia as tasa_bcv
    FROM pago p
    LEFT JOIN cliente_metodo_pago cmp ON p.fk_cliente_metodo_pago_1 = cmp.id
    LEFT JOIN metodo_pago mp ON cmp.fk_metodo_pago = mp.id
    LEFT JOIN tasa t ON p.fk_tasa = t.id
    WHERE p.fk_venta = p_venta_id;
END;
$$; 

/**
 * @name fn_get_permisos
 * @description Obtiene todos los permisos del sistema con información adicional sobre su uso.
 * @returns TABLE - Una tabla con la información de los permisos.
 *          id: Identificador único del permiso.
 *          nombre: Nombre del permiso.
 *          descripcion: Descripción detallada del permiso.
 *          cantidad_roles: Número de roles que tienen asignado este permiso.
 */
CREATE OR REPLACE FUNCTION fn_get_permisos()
RETURNS TABLE (
    id INT,
    nombre VARCHAR,
    descripcion VARCHAR,
    cantidad_roles BIGINT
) AS $$
BEGIN
    /**
     * @dev Realiza una consulta a la tabla 'permiso' y utiliza una subconsulta
     *      para contar la cantidad de roles que tienen cada permiso asignado.
     */
    RETURN QUERY
    SELECT
        p.id,
        p.nombre,
        p.descripción AS descripcion,
        (SELECT COUNT(*) FROM permiso_rol pr WHERE pr.fk_permiso = p.id) AS cantidad_roles
    FROM
        permiso p
    ORDER BY
        p.id DESC;
END;
$$ LANGUAGE plpgsql;

/**
 * Función: fn_get_personas
 * Propósito: Obtiene todas las personas (empleados, clientes naturales, clientes jurídicos y miembros) que NO tienen un usuario asociado
 * Retorna: Tabla con información básica, correo y teléfono de las personas sin usuario
 */
DROP FUNCTION IF EXISTS fn_get_personas();

CREATE OR REPLACE FUNCTION fn_get_personas()
RETURNS TABLE (
    tipo_persona VARCHAR(20),
    id INTEGER,
    documento VARCHAR(15),
    nacionalidad_naturaleza CHAR(1),
    nombre_completo VARCHAR(255),
    email VARCHAR(255),
    telefono VARCHAR(20)
) AS $$
BEGIN
    RETURN QUERY
    
    -- Empleados sin usuario
    SELECT 
        'Empleado'::VARCHAR(20) AS tipo_persona,
        e.id::INTEGER,
        e.ci::VARCHAR(15) AS documento,
        e.nacionalidad AS nacionalidad_naturaleza,
        CONCAT(e.primer_nombre, 
               CASE WHEN e.segundo_nombre IS NOT NULL THEN ' ' || e.segundo_nombre ELSE '' END,
               ' ', e.primer_apellido,
               CASE WHEN e.segundo_apellido IS NOT NULL THEN ' ' || e.segundo_apellido ELSE '' END
        )::VARCHAR(255) AS nombre_completo,
        NULL::VARCHAR(255) AS email,
        (SELECT CONCAT(t.codigo_área, '-', t.número) FROM telefono t WHERE t.fk_empleado = e.id LIMIT 1)::VARCHAR(20) as telefono
    FROM empleado e
    LEFT JOIN empleado_usuario eu ON e.id = eu.fk_empleado
    WHERE eu.fk_usuario IS NULL
    
    UNION ALL
    
    -- Clientes naturales sin usuario
    SELECT 
        'Cliente Natural'::VARCHAR(20) AS tipo_persona,
        cn.id::INTEGER,
        cn.ci::VARCHAR(15) AS documento,
        cn.nacionalidad AS nacionalidad_naturaleza,
        CONCAT(cn.primer_nombre,
               CASE WHEN cn.segundo_nombre IS NOT NULL THEN ' ' || cn.segundo_nombre ELSE '' END,
               ' ', cn.primer_apellido,
               CASE WHEN cn.segundo_apellido IS NOT NULL THEN ' ' || cn.segundo_apellido ELSE '' END
        )::VARCHAR(255) AS nombre_completo,
        NULL::VARCHAR(255) AS email,
        (SELECT CONCAT(t.codigo_área, '-', t.número) FROM telefono t WHERE t.fk_cliente_natural = cn.id LIMIT 1)::VARCHAR(20) as telefono
    FROM cliente_natural cn
    LEFT JOIN cliente_usuario cu ON cn.id = cu.fk_cliente_natural
    WHERE cu.fk_usuario IS NULL
    
    UNION ALL
    
    -- Clientes jurídicos sin usuario
    SELECT 
        'Cliente Jurídico'::VARCHAR(20) AS tipo_persona,
        cj.id::INTEGER,
        cj.rif::VARCHAR(15) AS documento,
        cj.naturaleza_rif AS nacionalidad_naturaleza,
        cj.razón_social::VARCHAR(255) AS nombre_completo,
        (SELECT c.dirección_correo FROM correo c JOIN persona_contacto pc ON c.fk_persona_contacto = pc.id WHERE pc.fk_cliente_juridico = cj.id LIMIT 1)::VARCHAR(255) as email,
        (SELECT CONCAT(t.codigo_área, '-', t.número) FROM telefono t WHERE t.fk_cliente_juridico = cj.id LIMIT 1)::VARCHAR(20) as telefono
    FROM cliente_juridico cj
    LEFT JOIN cliente_usuario cu ON cj.id = cu.fk_cliente_juridico
    WHERE cu.fk_usuario IS NULL
    
    UNION ALL
    
    -- Miembros sin usuario
    SELECT 
        'Miembro'::VARCHAR(20) AS tipo_persona,
        m.rif::INTEGER AS id,
        m.rif::VARCHAR(15) AS documento,
        m.naturaleza_rif AS nacionalidad_naturaleza,
        m.razón_social::VARCHAR(255) AS nombre_completo,
        (SELECT c.dirección_correo FROM correo c 
         LEFT JOIN persona_contacto pc on c.fk_persona_contacto = pc.id
         WHERE (c.fk_miembro_1 = m.rif AND c.fk_miembro_2 = m.naturaleza_rif) 
         OR (pc.fk_miembro_1 = m.rif AND pc.fk_miembro_2 = m.naturaleza_rif)
         LIMIT 1
        )::VARCHAR(255) as email,
        (SELECT CONCAT(t.codigo_área, '-', t.número) FROM telefono t WHERE t.fk_miembro_1 = m.rif AND t.fk_miembro_2 = m.naturaleza_rif LIMIT 1)::VARCHAR(20) as telefono
    FROM miembro m
    LEFT JOIN miembro_usuario mu ON m.rif = mu.fk_miembro_1 AND m.naturaleza_rif = mu.fk_miembro_2
    WHERE mu.fk_usuario IS NULL
    
    ORDER BY 
        -- Priorizar registros con email (columna 6) (0 si tiene email, 1 si es NULL)
        6 NULLS LAST,
        -- Priorizar registros con teléfono (columna 7) (0 si tiene teléfono, 1 si es NULL)
        7 NULLS LAST,
        -- Luego ordenar por tipo de persona (columna 1)
        1,
        -- Luego por nombre completo (columna 5)
        5,
        -- Finalmente por ID (columna 2)
        2;
    
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS fn_get_presentaciones_disponibles_tienda(INTEGER);

CREATE OR REPLACE FUNCTION fn_get_presentaciones_disponibles_tienda(
    p_id_tienda_fisica INTEGER DEFAULT 1
)
RETURNS TABLE (
    sku VARCHAR,              -- SKU de la presentación
    nombre_cerveza VARCHAR,   -- Nombre de la cerveza 
    presentacion VARCHAR,   -- Nombre de la presentación
    precio DECIMAL,            -- Precio de la presentación
    id_tipo_cerveza INTEGER,  -- ID del tipo de cerveza
    tipo_cerveza VARCHAR,     -- Nombre del tipo de cerveza
    stock_total INTEGER,      -- Stock total (cantidad en lugares de la tienda física)
    marca VARCHAR,            -- Marca (denominación comercial del miembro)
    imagen VARCHAR,            -- URL de la imagen
    presentacion_id INTEGER,
    cerveza_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pc.sku, -- SKU de la presentación
        c.nombre, -- Nombre de la cerveza 
        pr.nombre, -- Nombre de la presentación
        pc.precio::DECIMAL, -- Precio de la presentación
        tc.id, -- ID del tipo de cerveza
        tc.nombre, -- Nombre del tipo de cerveza
        -- Stock total es solo la cantidad en tienda
        COALESCE(lti.cantidad, 0) AS stock_total,
        m.denominación_comercial, -- Marca (denominación comercial del miembro)
        pc.imagen, -- URL de la imagen
        pr.id as presentacion_id,
        c.id as cerveza_id
    FROM tienda_fisica tf
    -- Unir almacenes de la tienda física
    JOIN almacen a ON tf.id = a.fk_tienda_fisica
    -- Unir inventario de cada almacén
    JOIN inventario i ON a.id = i.fk_almacen
    -- Unir presentacion_cerveza
    JOIN presentacion_cerveza pc ON i.fk_presentacion_cerveza_1 = pc.fk_presentacion 
    AND i.fk_presentacion_cerveza_2 = pc.fk_cerveza
    -- Unir presentacion
    JOIN presentacion pr ON pc.fk_presentacion = pr.id
    -- Unir cerveza
    JOIN cerveza c ON pc.fk_cerveza = c.id
    -- Unir tipo_cerveza
    JOIN tipo_cerveza tc ON c.fk_tipo_cerveza = tc.id
    -- Unir miembro_presentacion_cerveza para obtener la marca
    LEFT JOIN miembro_presentacion_cerveza mpc ON 
        pc.fk_presentacion = mpc.fk_presentacion_cerveza_1 AND 
        pc.fk_cerveza = mpc.fk_presentacion_cerveza_2
    -- Unir miembro para obtener la denominación comercial
    LEFT JOIN miembro m ON mpc.fk_miembro_1 = m.rif AND mpc.fk_miembro_2 = m.naturaleza_rif
    -- Unir lugar_tienda_inventario para stock en tienda
    LEFT JOIN lugar_tienda_inventario lti ON 
        lti.fk_inventario_1 = i.fk_presentacion_cerveza_1 AND 
        lti.fk_inventario_2 = i.fk_presentacion_cerveza_2 AND 
        lti.fk_inventario_3 = i.fk_almacen
    -- Trae todas las presentaciones o solo las de un determinado tipo de cerveza
    WHERE 
        tf.id = p_id_tienda_fisica 
        -- Stock total debe ser mayor o igual a 1
        AND COALESCE(lti.cantidad, 0) >= 1
    ORDER BY c.nombre; -- Ordenar por nombre_cerveza
END;
$$;


DROP FUNCTION IF EXISTS fn_get_role_by_id(INT);

CREATE OR REPLACE FUNCTION fn_get_role_by_id(p_id INT)
RETURNS TABLE (
    id INT,
    nombre VARCHAR,
    cantidad_usuarios BIGINT,
    permiso_id INT,
    permiso_nombre VARCHAR,
    permiso_descripcion VARCHAR
) AS $$
BEGIN
    /**
     * @dev Realiza una consulta a la tabla 'rol' y la une con las tablas de permisos
     *      para obtener todos los permisos de un rol.
     *      Usa un LEFT JOIN para asegurar que el rol se devuelva incluso si no tiene permisos.
     */
    RETURN QUERY
    SELECT
        r.id,
        r.nombre,
        (SELECT COUNT(*) FROM usuario u WHERE u.fk_rol = r.id) AS cantidad_usuarios,
        p.id AS permiso_id,
        p.nombre AS permiso_nombre,
        p.descripción AS permiso_descripcion
    FROM
        rol r
    LEFT JOIN permiso_rol pr ON r.id = pr.fk_rol
    LEFT JOIN permiso p ON pr.fk_permiso = p.id
    WHERE
        r.id = p_id;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS fn_get_roles();

CREATE OR REPLACE FUNCTION fn_get_roles()
RETURNS TABLE (
    id INT,
    nombre VARCHAR,
    cantidad_usuarios BIGINT,
    cantidad_permisos BIGINT
) AS $$
BEGIN
    /**
     * @dev Realiza una consulta a la tabla 'rol' y utiliza subconsultas para contar
     *      los usuarios y permisos de cada rol.
     */
    RETURN QUERY
    SELECT
        r.id,
        r.nombre,
        (SELECT COUNT(*) FROM usuario u WHERE u.fk_rol = r.id) AS cantidad_usuarios,
        (SELECT COUNT(*) FROM permiso_rol pr WHERE pr.fk_rol = r.id) AS cantidad_permisos
    FROM
        rol r
    ORDER BY
        r.id DESC;
END;
$$ LANGUAGE plpgsql;

-- Handmade function to get the status id by the status name

DROP FUNCTION IF EXISTS fn_get_status_by_nombre(VARCHAR);

CREATE OR REPLACE FUNCTION fn_get_status_by_nombre(s_nombre VARCHAR)
RETURNS TABLE (
  id INTEGER,
  p_nombre VARCHAR
)
LANGUAGE plpgsql
AS $$
begin
  RETURN query
  SELECT s.id, s.nombre 
  FROM status as s 
  WHERE TRIM(LOWER(s.nombre)) = TRIM(LOWER(s_nombre));
END;
$$;

DROP FUNCTION IF EXISTS fn_get_status();

CREATE OR REPLACE FUNCTION fn_get_status()
RETURNS TABLE (
    id INTEGER,
    nombre VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    /**
     * Retorna todos los status ordenados por ID
     * @return TABLE - Registros de la tabla status
     */
    RETURN QUERY
    SELECT 
        s.id,
        s.nombre
    FROM status s
    ORDER BY s.id;
END;
$$;

DROP FUNCTION IF EXISTS fn_get_ultima_tasa_by_moneda(VARCHAR);

CREATE OR REPLACE FUNCTION fn_get_ultima_tasa_by_moneda(p_moneda VARCHAR)
RETURNS TABLE (
    id INTEGER,
    moneda VARCHAR,
    monto_equivalencia DECIMAL,
    fecha_inicio DATE
) AS $$
BEGIN
 
    RETURN QUERY
    SELECT 
        t.id, 
        t.moneda, 
        t.monto_equivalencia, 
        t.fecha_inicio
    FROM tasa t
    WHERE UPPER(t.moneda) = UPPER(p_moneda) AND t.fecha_fin IS NULL
    ORDER BY t.fecha_inicio DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS fn_get_user_by_doc(CHAR, INTEGER);

CREATE OR REPLACE FUNCTION fn_get_user_by_doc(
    p_doc_type CHAR,
    p_doc_number INTEGER
)
RETURNS TABLE (
    id_usuario INTEGER,
    nombre_completo VARCHAR,
    email VARCHAR,
    telefono VARCHAR,
    rol_nombre VARCHAR,
    id_rol INTEGER,
    tipo_usuario VARCHAR,
    identificacion VARCHAR,
    direccion VARCHAR,
    -- Detalles de Empleado
    cargo VARCHAR,
    departamento VARCHAR,
    salario_base DECIMAL,
    fecha_inicio_nomina DATE,
    fecha_fin_nomina DATE,
    -- Detalles de Cliente Juridico / Miembro
    razon_social VARCHAR,
    denominacion_comercial VARCHAR,
    -- Detalles de Cliente Natural
    fecha_nacimiento DATE,
    -- Persona de Contacto
    pc_nombre_completo VARCHAR,
    pc_identificacion VARCHAR,
    pc_email VARCHAR,
    pc_telefono VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN

    RETURN QUERY
    WITH found_user AS (
        SELECT COALESCE(
            (SELECT eu.fk_usuario FROM empleado e JOIN empleado_usuario eu ON e.id = eu.fk_empleado WHERE e.nacionalidad = p_doc_type AND e.ci = p_doc_number LIMIT 1),
            (SELECT cu.fk_usuario FROM cliente_natural cn JOIN cliente_usuario cu ON cn.id = cu.fk_cliente_natural WHERE cn.nacionalidad = p_doc_type AND cn.ci = p_doc_number LIMIT 1),
            (SELECT cu.fk_usuario FROM cliente_juridico cj JOIN cliente_usuario cu ON cj.id = cu.fk_cliente_juridico WHERE cj.naturaleza_rif = p_doc_type AND cj.rif = p_doc_number LIMIT 1),
            (SELECT mu.fk_usuario FROM miembro m JOIN miembro_usuario mu ON m.rif = mu.fk_miembro_1 AND m.naturaleza_rif = mu.fk_miembro_2 WHERE m.naturaleza_rif = p_doc_type AND m.rif = p_doc_number LIMIT 1)
        ) AS user_id
    )
    SELECT user_details.*
    FROM found_user fu
    -- Lateral se usa para ejecutar la función fn_get_user_by_id para la fila que trae found_user
    CROSS JOIN LATERAL fn_get_user_by_id(fu.user_id) user_details
    WHERE fu.user_id IS NOT NULL;
END;
$$;

DROP FUNCTION IF EXISTS fn_get_user_by_id(INTEGER);

CREATE OR REPLACE FUNCTION fn_get_user_by_id(p_user_id INTEGER)
RETURNS TABLE (
    id_usuario INTEGER,
    nombre_completo VARCHAR,
    email VARCHAR,
    telefono VARCHAR,
    rol_nombre VARCHAR,
    id_rol INTEGER,
    tipo_usuario VARCHAR,
    identificacion VARCHAR,
    direccion VARCHAR,
    -- Detalles de Empleado
    cargo VARCHAR,
    departamento VARCHAR,
    salario_base DECIMAL,
    fecha_inicio_nomina DATE,
    fecha_fin_nomina DATE,
    -- Detalles de Cliente Juridico / Miembro
    razon_social VARCHAR,
    denominacion_comercial VARCHAR,
    -- Detalle de Empleado
    fecha_nacimiento DATE,
    -- Persona de Contacto
    pc_nombre_completo VARCHAR,
    pc_identificacion VARCHAR,
    pc_email VARCHAR,
    pc_telefono VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    WITH user_base AS (
        SELECT
            u.id AS user_id,
            u.fk_rol,
            c.dirección_correo,
            r.nombre AS rol_nombre_val,
            r.id AS id_rol_val,
            e.id as empleado_id,
            cn.id as cliente_natural_id,
            cj.id as cliente_juridico_id,
            m.rif as miembro_rif,
            m.naturaleza_rif as miembro_naturaleza_rif,
            CASE
                WHEN cn.id IS NOT NULL THEN 'Cliente Natural'
                WHEN cj.id IS NOT NULL THEN 'Cliente Juridico'
                WHEN e.id IS NOT NULL THEN 'Empleado'
                WHEN m.rif IS NOT NULL THEN 'Miembro'
                ELSE 'Indefinido'
            END AS tipo_usuario_val,
            e, cn, cj, m 
        FROM usuario u
        JOIN correo c ON u.fk_correo = c.id
        JOIN rol r ON u.fk_rol = r.id
        LEFT JOIN empleado_usuario eu ON u.id = eu.fk_usuario
        LEFT JOIN empleado e ON eu.fk_empleado = e.id
        LEFT JOIN cliente_usuario cu ON u.id = cu.fk_usuario
        LEFT JOIN cliente_natural cn ON cu.fk_cliente_natural = cn.id
        LEFT JOIN cliente_juridico cj ON cu.fk_cliente_juridico = cj.id
        LEFT JOIN miembro_usuario mu ON u.id = mu.fk_usuario
        LEFT JOIN miembro m ON mu.fk_miembro_1 = m.rif AND mu.fk_miembro_2 = m.naturaleza_rif
        WHERE u.id = p_user_id
    )
    SELECT
        ub.user_id,
        COALESCE(
            (ub.e).primer_nombre || ' ' || (ub.e).primer_apellido,
            (ub.cn).primer_nombre || ' ' || (ub.cn).primer_apellido,
            (ub.cj).denominación_comercial,
            (ub.m).denominación_comercial
        )::VARCHAR,
        ub.dirección_correo::VARCHAR,
        COALESCE(
            (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_empleado = ub.empleado_id LIMIT 1),
            (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_cliente_natural = ub.cliente_natural_id LIMIT 1),
            (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_cliente_juridico = ub.cliente_juridico_id LIMIT 1),
            (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_miembro_1 = ub.miembro_rif AND t.fk_miembro_2 = ub.miembro_naturaleza_rif LIMIT 1)
        )::VARCHAR,
        ub.rol_nombre_val::VARCHAR,
        ub.id_rol_val::INTEGER,
        ub.tipo_usuario_val::VARCHAR,
        COALESCE(
            (ub.e).nacionalidad || '-' || (ub.e).ci,
            (ub.cn).nacionalidad || '-' || (ub.cn).ci,
            (ub.cj).naturaleza_rif || '-' || (ub.cj).rif,
            (ub.m).naturaleza_rif || '-' || (ub.m).rif
        )::VARCHAR,
        COALESCE(
            (ub.cn).dirección,
            (ub.cj).dirección,
            (ub.m).dirección_física
        )::VARCHAR,
        emp_info.cargo,
        emp_info.departamento,
        emp_info.salario_base,
        emp_info.fecha_inicio_nomina,
        emp_info.fecha_fin_nomina,
        COALESCE((ub.cj).razón_social, (ub.m).razón_social)::VARCHAR,
        COALESCE((ub.cj).denominación_comercial, (ub.m).denominación_comercial)::VARCHAR,
        emp_info.fecha_nacimiento,
        cp.pc_nombre_completo,
        cp.pc_identificacion,
        cp.pc_email,
        cp.pc_telefono
    FROM 
        user_base ub
    LEFT JOIN 
        fn_get_empleado_info_by_id(ub.empleado_id) emp_info ON ub.empleado_id IS NOT NULL
    LEFT JOIN (
        SELECT
            pc_details.fk_cliente_juridico,
            pc_details.fk_miembro_1,
            pc_details.fk_miembro_2,
            (array_agg(pc_details.primer_nombre || ' ' || pc_details.primer_apellido ORDER BY pc_details.id))[1]::VARCHAR as pc_nombre_completo,
            (array_agg(pc_details.nacionalidad || '-' || pc_details.ci ORDER BY pc_details.id))[1]::VARCHAR as pc_identificacion,
            (array_agg(pc_details.email ORDER BY pc_details.id))[1]::VARCHAR as pc_email,
            (array_agg(pc_details.telefono ORDER BY pc_details.id))[1]::VARCHAR as pc_telefono
        FROM (
            SELECT
                pc.*,
                (SELECT c.dirección_correo FROM correo c WHERE c.fk_persona_contacto = pc.id LIMIT 1) as email,
                (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_persona_contacto = pc.id LIMIT 1) as telefono
            FROM persona_contacto pc
        ) pc_details
        GROUP BY pc_details.fk_cliente_juridico, pc_details.fk_miembro_1, pc_details.fk_miembro_2
    ) cp ON (cp.fk_cliente_juridico = ub.cliente_juridico_id) OR (cp.fk_miembro_1 = ub.miembro_rif AND cp.fk_miembro_2 = ub.miembro_naturaleza_rif);
END;
$$;

DROP FUNCTION IF EXISTS fn_get_user_info(INTEGER);

CREATE OR REPLACE FUNCTION fn_get_user_info(p_user_id INTEGER)
RETURNS TABLE (
    usuario_id INTEGER,
    correo VARCHAR,
    rol VARCHAR,
    nombre_completo VARCHAR,
    tipo_usuario VARCHAR
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id as usuario_id,
        c.dirección_correo as correo,
        r.nombre as rol,
        -- Información del empleado si existe
        COALESCE(
            e.primer_nombre || ' ' || e.primer_apellido,
            -- Información del miembro si existe
            m.razón_social,
            -- Información del cliente si existe
            COALESCE(
                cj.denominación_comercial,
                cn.primer_nombre || ' ' || cn.primer_apellido
            )
        )::VARCHAR as nombre_completo,
        -- Tipo de usuario
        CASE 
            WHEN eu.fk_empleado IS NOT NULL THEN 'Empleado'
            WHEN mu.fk_miembro_1 IS NOT NULL THEN 'Miembro'
            WHEN cu.fk_cliente_juridico IS NOT NULL THEN 'Cliente Jurídico'
            WHEN cu.fk_cliente_natural IS NOT NULL THEN 'Cliente Natural'
        END::VARCHAR as tipo_usuario
    FROM usuario u
    LEFT JOIN correo c ON u.fk_correo = c.id
    LEFT JOIN rol r ON u.fk_rol = r.id
    -- Joins para empleado
    LEFT JOIN empleado_usuario eu ON u.id = eu.fk_usuario
    LEFT JOIN empleado e ON eu.fk_empleado = e.id
    -- Joins para miembro
    LEFT JOIN miembro_usuario mu ON u.id = mu.fk_usuario
    LEFT JOIN miembro m ON mu.fk_miembro_1 = m.rif AND mu.fk_miembro_2 = m.naturaleza_rif
    -- Joins para cliente
    LEFT JOIN cliente_usuario cu ON u.id = cu.fk_usuario
    LEFT JOIN cliente_juridico cj ON cu.fk_cliente_juridico = cj.id
    LEFT JOIN cliente_natural cn ON cu.fk_cliente_natural = cn.id
    WHERE u.id = p_user_id;
END;
$$;

DROP FUNCTION IF EXISTS fn_get_users_by_role(INT);
CREATE OR REPLACE FUNCTION fn_get_users_by_role(p_role_id INT)
RETURNS TABLE (
    id INT,
    correo VARCHAR,
    tipo_persona VARCHAR,
    nombre_completo VARCHAR
) AS $$
BEGIN
    /**
     * @dev Realiza una consulta a la tabla 'usuario' unida con las tablas de personas
     *      para obtener información completa de los usuarios con un rol específico.
     */
    RETURN QUERY
    SELECT DISTINCT
        u.id::INT,
        c.dirección_correo::VARCHAR,
        (CASE 
            WHEN cn.id IS NOT NULL THEN 'Natural'
            WHEN cj.id IS NOT NULL THEN 'Jurídico'
            WHEN e.id IS NOT NULL THEN 'Empleado'
            WHEN m.rif IS NOT NULL THEN 'Miembro'
            ELSE 'No definido'
        END)::VARCHAR AS tipo_persona,
        COALESCE(
            CASE 
                WHEN cn.id IS NOT NULL THEN 
                    CONCAT(COALESCE(cn.primer_nombre, ''), ' ', COALESCE(cn.primer_apellido, ''))
                WHEN cj.id IS NOT NULL THEN 
                    COALESCE(cj.razón_social, 'Sin razón social')
                WHEN e.id IS NOT NULL THEN 
                    CONCAT(COALESCE(e.primer_nombre, ''), ' ', COALESCE(e.primer_apellido, ''))
                WHEN m.rif IS NOT NULL THEN 
                    COALESCE(m.razón_social, 'Sin razón social')
                ELSE 'Usuario sin nombre'
            END,
            'Usuario sin nombre'
        )::VARCHAR AS nombre_completo
    FROM
        usuario u
    INNER JOIN correo c ON u.fk_correo = c.id
    LEFT JOIN cliente_usuario cu ON u.id = cu.fk_usuario
    LEFT JOIN cliente_natural cn ON cu.fk_cliente_natural = cn.id
    LEFT JOIN cliente_juridico cj ON cu.fk_cliente_juridico = cj.id
    LEFT JOIN empleado_usuario eu ON u.id = eu.fk_usuario
    LEFT JOIN empleado e ON eu.fk_empleado = e.id
    LEFT JOIN miembro_usuario mu ON u.id = mu.fk_usuario
    LEFT JOIN miembro m ON mu.fk_miembro_1 = m.rif AND mu.fk_miembro_2 = m.naturaleza_rif
    WHERE
        u.fk_rol = p_role_id
    ORDER BY
        nombre_completo;
END;
$$ LANGUAGE plpgsql; 

DROP FUNCTION IF EXISTS fn_get_users();

-- Creamos la función fn_get_users para obtener la información de todos los usuarios.
CREATE OR REPLACE FUNCTION fn_get_users()
RETURNS TABLE (
    id_usuario INTEGER,
    nombre_completo VARCHAR,
    email VARCHAR,
    telefono VARCHAR,
    rol_nombre VARCHAR,
    id_rol INTEGER,
    tipo_usuario VARCHAR,
    puntos INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    WITH usuarios_completos AS (
        SELECT
            u.id AS id_usuario,
            -- Obtenemos el nombre completo. COALESCE devuelve el primer valor no nulo.
            -- Como cada usuario es solo de un tipo, solo una de estas columnas tendrá valor.
            COALESCE(
                e.primer_nombre || ' ' || e.primer_apellido, -- Si es empleado
                cn.primer_nombre || ' ' || cn.primer_apellido, -- Si es cliente natural
                cj.denominación_comercial, -- Si es cliente jurídico
                m.denominación_comercial -- Si es miembro
            ) AS nombre_completo_calc,
            
            c.dirección_correo AS email_calc,

            -- De forma similar, obtenemos el teléfono usando subconsultas con COALESCE.
            COALESCE(
                (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_empleado = e.id LIMIT 1),
                (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_cliente_natural = cn.id LIMIT 1),
                (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_cliente_juridico = cj.id LIMIT 1),
                (SELECT t.codigo_área || '-' || t.número FROM telefono t WHERE t.fk_miembro_1 = m.rif AND t.fk_miembro_2 = m.naturaleza_rif LIMIT 1)
            ) AS telefono_calc,
            
            r.nombre AS rol_nombre_calc,
            r.id AS id_rol_calc,

            -- Determinamos el tipo de usuario basado en la tabla de origen de sus datos
            CASE 
                WHEN e.id IS NOT NULL THEN 'Empleado'
                WHEN cn.id IS NOT NULL OR cj.id IS NOT NULL THEN 'Cliente'
                WHEN m.rif IS NOT NULL THEN 'Miembro'
                ELSE 'Indefinido'
            END AS tipo_usuario_calc,
            
            -- Calculamos los puntos para los clientes, contando los 'metodo_pago' de tipo 'punto'
            -- que no han sido canjeados (fecha_canjeo IS NULL).
            CASE
                WHEN cn.id IS NOT NULL OR cj.id IS NOT NULL THEN (
                    SELECT COUNT(*)::INTEGER
                    FROM cliente_metodo_pago cmp
                    JOIN metodo_pago mp ON cmp.fk_metodo_pago = mp.id
                    WHERE mp.tipo = 'punto'
                      AND mp.fecha_canjeo IS NULL
                      AND (cmp.fk_cliente_natural = cn.id OR cmp.fk_cliente_juridico = cj.id)
                )
                ELSE 0
            END AS puntos_calc
        FROM usuario u
        -- Unimos con tablas básicas que todo usuario tiene
        JOIN correo c ON u.fk_correo = c.id
        JOIN rol r ON u.fk_rol = r.id
        
        -- Usamos LEFT JOIN para "intentar" unir con cada tipo de entidad posible.
        -- Solo una de estas cadenas de JOINs tendrá éxito por cada usuario.
        LEFT JOIN empleado_usuario eu ON u.id = eu.fk_usuario
        LEFT JOIN empleado e ON eu.fk_empleado = e.id
        
        LEFT JOIN cliente_usuario cu ON u.id = cu.fk_usuario
        LEFT JOIN cliente_natural cn ON cu.fk_cliente_natural = cn.id
        LEFT JOIN cliente_juridico cj ON cu.fk_cliente_juridico = cj.id
        
        LEFT JOIN miembro_usuario mu ON u.id = mu.fk_usuario
        LEFT JOIN miembro m ON mu.fk_miembro_1 = m.rif AND mu.fk_miembro_2 = m.naturaleza_rif
    )
    SELECT
        uc.id_usuario,
        uc.nombre_completo_calc::VARCHAR AS nombre_completo,
        uc.email_calc::VARCHAR AS email,
        uc.telefono_calc::VARCHAR AS telefono,
        uc.rol_nombre_calc::VARCHAR AS rol_nombre,
        uc.id_rol_calc AS id_rol,
        uc.tipo_usuario_calc::VARCHAR AS tipo_usuario,
        uc.puntos_calc AS puntos
    FROM usuarios_completos uc
    ORDER BY
        -- Priorizamos que tengan nombre, luego teléfono, y finalmente por id.
        CASE WHEN uc.nombre_completo_calc IS NULL THEN 1 ELSE 0 END,
        CASE WHEN uc.telefono_calc IS NULL THEN 1 ELSE 0 END,
        uc.id_usuario;
END;
$$;

DROP FUNCTION IF EXISTS fn_get_venta_by_id(INTEGER);

 
CREATE OR REPLACE FUNCTION fn_get_venta_by_id(p_venta_id INTEGER)
RETURNS TABLE (
    id INTEGER,
    monto_total DECIMAL,
    direccion_entrega VARCHAR,
    observacion VARCHAR,
    tipo_cliente VARCHAR,
    nombre_cliente VARCHAR,
    tipo_tienda VARCHAR,
    lugar_entrega VARCHAR,
    estado_entrega VARCHAR,
    fecha_ultimo_estado TIMESTAMP,
    producto_nombre VARCHAR,
    producto_cantidad INTEGER,
    producto_precio_unitario DECIMAL,
    pagos JSONB
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id,
        v.monto_total,
        CASE 
            WHEN v.fk_tienda_fisica IS NOT NULL THEN tf.direccion
            ELSE v.dirección_entrega
        END::VARCHAR as direccion_entrega,
        v.observación,
        CASE 
            WHEN v.fk_cliente_juridico IS NOT NULL THEN 'Jurídico'
            WHEN v.fk_cliente_natural IS NOT NULL THEN 'Natural'
            WHEN v.fk_usuario IS NOT NULL THEN 'Usuario'
        END::VARCHAR as tipo_cliente,
        COALESCE(
            cj.denominación_comercial, 
            cn.primer_nombre, 
            (SELECT nombre_completo FROM fn_get_user_info(v.fk_usuario))
        )::VARCHAR as nombre_cliente,
        CASE 
            WHEN v.fk_tienda_fisica IS NOT NULL THEN 'Física'
            WHEN v.fk_tienda_web IS NOT NULL THEN 'Web'
        END::VARCHAR as tipo_tienda,
        l.nombre::VARCHAR as lugar_entrega,
        s.nombre::VARCHAR as estado_entrega,
        sv_ultimo.fecha_actualización as fecha_ultimo_estado,
        -- Detalles del producto
        (c.nombre || ' - ' || p.nombre)::VARCHAR as producto_nombre,
        dp.cantidad as producto_cantidad,
        dp.precio_unitario as producto_precio_unitario,
        -- Llamada a la función de pagos para obtener un JSON agregado
        (SELECT jsonb_agg(p.*) FROM fn_get_pagos_by_venta(v.id) p) as pagos
    FROM venta v
    -- Join para obtener los detalles de los productos de la venta
    JOIN detalle_presentacion dp ON v.id = dp.fk_venta
    JOIN presentacion_cerveza pc ON dp.fk_presentacion = pc.fk_presentacion AND dp.fk_cerveza = pc.fk_cerveza
    JOIN presentacion p ON pc.fk_presentacion = p.id
    JOIN cerveza c ON pc.fk_cerveza = c.id
    -- Joins para obtener información general de la venta
    LEFT JOIN cliente_juridico cj ON v.fk_cliente_juridico = cj.id
    LEFT JOIN cliente_natural cn ON v.fk_cliente_natural = cn.id
    LEFT JOIN tienda_fisica tf ON v.fk_tienda_fisica = tf.id
    LEFT JOIN tienda_web tw ON v.fk_tienda_web = tw.id
    LEFT JOIN lugar l ON 
        CASE 
            WHEN v.fk_tienda_fisica IS NOT NULL THEN tf.fk_lugar = l.id
            ELSE v.fk_lugar = l.id
        END
    LEFT JOIN LATERAL (
        SELECT 
            sv.fk_status,
            sv.fecha_actualización
        FROM status_venta sv
        WHERE sv.fk_venta = v.id
        ORDER BY sv.fecha_actualización DESC
        LIMIT 1
    ) sv_ultimo ON true
    LEFT JOIN status s ON sv_ultimo.fk_status = s.id
    WHERE v.id = p_venta_id;
END;
$$;

DROP FUNCTION IF EXISTS fn_get_ventas();

-- CreateStoredProcedure
CREATE OR REPLACE FUNCTION fn_get_ventas()
RETURNS TABLE (
    id INTEGER,
    monto_total DECIMAL,
    dirección_entrega VARCHAR,
    observación VARCHAR,
    tipo_cliente VARCHAR,
    nombre_cliente VARCHAR,
    tipo_tienda VARCHAR,
    lugar_entrega VARCHAR,
    estado_entrega VARCHAR,
    fecha_ultimo_estado TIMESTAMP
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id,
        v.monto_total,
        -- Mostrar dirección de tienda física cuando aplique, sino la dirección de entrega
        CASE 
            WHEN v.fk_tienda_fisica IS NOT NULL THEN tf.direccion
            ELSE v.dirección_entrega
        END::VARCHAR as dirección_entrega,
        v.observación,
        -- Información del cliente
        CASE 
            WHEN v.fk_cliente_juridico IS NOT NULL THEN 'Jurídico'
            WHEN v.fk_cliente_natural IS NOT NULL THEN 'Natural'
            WHEN v.fk_usuario IS NOT NULL THEN 'Usuario'
        END::VARCHAR as tipo_cliente,
        -- Datos del cliente según el tipo
        COALESCE(
            cj.denominación_comercial, 
            cn.primer_nombre, 
            (SELECT nombre_completo FROM fn_get_user_info(v.fk_usuario))
        )::VARCHAR as nombre_cliente,
        -- Información de la tienda
        CASE 
            WHEN v.fk_tienda_fisica IS NOT NULL THEN 'Física'
            WHEN v.fk_tienda_web IS NOT NULL THEN 'Web'
        END::VARCHAR as tipo_tienda,
        -- Información del lugar de entrega
        l.nombre::VARCHAR as lugar_entrega,
        -- Estado de entrega (último estado de la venta)
        s.nombre::VARCHAR as estado_entrega,
        -- Fecha del último estado
        sv_ultimo.fecha_actualización as fecha_ultimo_estado
    FROM venta v
    LEFT JOIN cliente_juridico cj ON v.fk_cliente_juridico = cj.id
    LEFT JOIN cliente_natural cn ON v.fk_cliente_natural = cn.id
    LEFT JOIN tienda_fisica tf ON v.fk_tienda_fisica = tf.id
    LEFT JOIN tienda_web tw ON v.fk_tienda_web = tw.id
    -- Información del lugar de entrega
    LEFT JOIN lugar l ON 
        CASE 
            WHEN v.fk_tienda_fisica IS NOT NULL THEN tf.fk_lugar = l.id
            ELSE v.fk_lugar = l.id
        END
    -- Subconsulta para obtener el último estado de cada venta
    LEFT JOIN LATERAL (
        SELECT 
            sv.fk_status,
            sv.fecha_actualización
        FROM status_venta sv
        WHERE sv.fk_venta = v.id
        ORDER BY sv.fecha_actualización DESC
        LIMIT 1
    ) sv_ultimo ON true
    -- JOIN con la tabla status para obtener el nombre del estado
    LEFT JOIN status s ON sv_ultimo.fk_status = s.id
    ORDER BY v.id DESC;
END;
$$; 

DROP FUNCTION IF EXISTS fn_limpiar_detalles_venta(INTEGER);

CREATE OR REPLACE FUNCTION fn_limpiar_detalles_venta(p_venta_id INTEGER)
RETURNS VOID AS $$
BEGIN
    DELETE FROM detalle_presentacion WHERE fk_venta = p_venta_id;
END;
$$ LANGUAGE plpgsql; 

DROP FUNCTION IF EXISTS fn_login (VARCHAR, VARCHAR);

CREATE OR REPLACE FUNCTION fn_login (
    p_email    VARCHAR,
    p_password VARCHAR
)
RETURNS TABLE (
  id_usuario INTEGER,
  direccion_correo VARCHAR,
  rol VARCHAR,
  nombre_usuario VARCHAR,
  permiso VARCHAR,
  miembro_rif INTEGER,
  miembro_naturaleza_rif CHAR(1),
  miembro_razon_social VARCHAR(50)
)
language plpgsql
AS $$
DECLARE
    user_record RECORD;
BEGIN
    -- Primero, verificamos si el correo existe y obtenemos los datos del usuario
    SELECT u.*, c.dirección_correo
    INTO user_record
    FROM usuario u
    JOIN correo c ON u.fk_correo = c.id
    WHERE c.dirección_correo = p_email;

    -- Si no se encuentra ningún registro, el correo no existe.
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Correo no registrado.';
    END IF;

    -- Si el correo existe, pero la contraseña no coincide, lanzamos otro error.
    IF user_record.contraseña != p_password THEN
        RAISE EXCEPTION 'Contraseña incorrecta.';
    END IF;

    -- Si todo es correcto, devolvemos los datos del usuario y sus permisos.
    RETURN QUERY
    SELECT
        u.id::INTEGER,
        c.dirección_correo,
        r.nombre,
        coalesce(
            e.primer_nombre,
            cn.primer_nombre,
            cj.denominación_comercial,
            m.razón_social
        ),
        p.nombre,
        m.rif,
        m.naturaleza_rif,
        m.razón_social
    FROM usuario u
    JOIN correo AS c ON u.fk_correo = c.id
    JOIN rol AS r ON u.fk_rol = r.id
    JOIN permiso_rol pr ON pr.fk_rol = r.id
    JOIN permiso p ON p.id = pr.fk_permiso
    LEFT JOIN empleado_usuario AS eu ON u.id = eu.fk_usuario
    LEFT JOIN empleado AS e ON eu.fk_empleado = e.id
    LEFT JOIN cliente_usuario AS cu ON u.id = cu.fk_usuario
    LEFT JOIN cliente_natural AS cn ON cn.id = cu.fk_cliente_natural
    LEFT JOIN cliente_juridico AS cj ON cj.id = cu.fk_cliente_juridico
    LEFT JOIN miembro_usuario AS mu ON mu.fk_usuario = u.id
    LEFT JOIN miembro m ON mu.fk_miembro_1 = m.rif AND mu.fk_miembro_2 = m.naturaleza_rif
    WHERE c.dirección_correo = p_email AND u.contraseña = p_password;
END;
$$;

DROP FUNCTION IF EXISTS fn_registrar_detalle_presentacion_en_proceso(INTEGER, INTEGER, INTEGER, INTEGER);

CREATE OR REPLACE FUNCTION fn_registrar_detalle_presentacion_en_proceso(
  p_presentacion_id INTEGER,
  p_cerveza_id INTEGER,
  p_venta_id INTEGER,
  p_cantidad INTEGER
)
RETURNS BOOLEAN AS $$ 
DECLARE 
  existe_venta BOOLEAN;
BEGIN  
  SELECT EXISTS (SELECT FROM venta v WHERE v.id = p_venta_id LIMIT 1) INTO existe_venta;

  IF existe_venta THEN
    INSERT INTO detalle_presentacion(fk_venta, fk_presentacion, fk_cerveza, cantidad)
    VALUES (p_venta_id, p_presentacion_id, p_cerveza_id, p_cantidad);
    
    RETURN TRUE;
  ELSE 
    RAISE EXCEPTION 'No existe venta con el id: %', p_venta_id;
  END IF;
END  
$$ language plpgsql;
    
DROP FUNCTION IF EXISTS fn_registrar_venta_en_proceso(INTEGER, INTEGER);

CREATE OR REPLACE FUNCTION fn_registrar_venta_en_proceso(
  p_cliente_id INTEGER,
  p_tienda_fisica_id INTEGER DEFAULT 1
)
RETURNS TABLE(
  id_venta INTEGER
) 
AS $$
DECLARE
  nueva_venta_id INTEGER;
  is_natural BOOLEAN;
  v_status_id INTEGER;
BEGIN

  /** Verificar si el cliente es natural  (retorna booleano) */
  SELECT EXISTS(SELECT id FROM cliente_natural cn WHERE cn.id = p_cliente_id LIMIT 1) INTO is_natural;

  IF is_natural THEN
    /* Creatr venta nueva asociada a la tienda y al cliente*/
    INSERT INTO venta(fk_tienda_fisica, fk_cliente_natural) 
    VALUES (p_tienda_fisica_id, p_cliente_id)
    RETURNING id INTO nueva_venta_id;
  ELSE
      /* Creatr venta nueva asociada a la tienda y al cliente*/
    INSERT INTO venta(fk_tienda_fisica, fk_cliente_juridico) 
    VALUES (p_tienda_fisica_id, p_cliente_id)
    RETURNING id INTO nueva_venta_id;
  END IF;
  /* Asociar estado en progreso para la venta */
  SELECT id INTO v_status_id FROM status WHERE status.nombre = 'En Proceso';

  INSERT INTO status_venta(fk_venta, fk_status, fecha_actualización)
  VALUES(nueva_venta_id, v_status_id, NOW());


  RETURN QUERY SELECT nueva_venta_id;
END;
$$ language plpgsql;

DROP FUNCTION IF EXISTS fn_update_rol(INT, VARCHAR, INT[]);

CREATE OR REPLACE FUNCTION fn_update_rol(
    p_rol_id INT,
    p_nuevo_nombre VARCHAR,
    p_permisos_ids INT[]
)
RETURNS BOOLEAN AS $$
DECLARE
    rol_existe INT;
    permiso_id INT;
BEGIN
    -- Verificar si el rol existe
    SELECT COUNT(*) INTO rol_existe FROM rol WHERE id = p_rol_id;
    IF rol_existe = 0 THEN
        RAISE EXCEPTION 'El rol con ID % no existe.', p_rol_id;
    END IF;

    -- 1. Actualizar el nombre del rol
    UPDATE rol
    SET nombre = p_nuevo_nombre
    WHERE id = p_rol_id;

    -- 2. Eliminar todos los permisos existentes para este rol
    DELETE FROM permiso_rol
    WHERE fk_rol = p_rol_id;

    -- 3. Insertar la nueva lista de permisos usando un bucle
    -- Este enfoque es más explícito y fácil de leer que usar unnest.
    IF p_permisos_ids IS NOT NULL THEN
        FOREACH permiso_id IN ARRAY p_permisos_ids
        LOOP
            INSERT INTO permiso_rol (fk_rol, fk_permiso)
            VALUES (p_rol_id, permiso_id);
        END LOOP;
    END IF;

    -- Devolver true para indicar que la operación fue exitosa
    RETURN TRUE;
EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'El nuevo nombre de rol ''%'' ya está en uso.', p_nuevo_nombre;
    WHEN foreign_key_violation THEN
        RAISE EXCEPTION 'Uno o más IDs de permisos proporcionados no son válidos.';
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error inesperado al actualizar el rol: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

/**
 * Actualiza el estado de una orden de compra.
 *
 * Esta función se encarga de:
 * 1. Validar la transición de estado según el flujo: Pendiente -> aprobado/cancelado -> En Proceso/cancelado -> finalizado/cancelado.
 * 2. Finalizar el estado actual de la orden de compra, estableciendo la `fecha_fin`.
 * 3. Insertar un nuevo registro para reflejar el nuevo estado de la orden.
 * 4. Si el nuevo estado es "finalizado", actualiza la observación de la orden.
 *
 * @param p_orden_id - El ID de la orden de compra que se va a actualizar.
 * @param p_nuevo_status_nombre - El nombre del nuevo estado que se le asignará a la orden.
 * @param p_usuario_id - El ID del usuario que realiza la acción.
 * @param p_observacion_final - (Opcional) Una observación sobre la finalización de la orden.
 */
CREATE OR REPLACE FUNCTION fn_update_status_orden_compra(
    p_orden_id INTEGER,
    p_nuevo_status_nombre VARCHAR,
    p_usuario_id INTEGER,
    p_observacion_final TEXT DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
    v_fecha_actual TIMESTAMP := NOW();
    v_current_status_nombre VARCHAR;
    v_new_status_id INTEGER;
BEGIN
    /**
     * Obtenemos el ID del nuevo estado a partir de su nombre.
     */
    SELECT id INTO v_new_status_id 
    FROM status
    WHERE TRIM(LOWER(nombre)) = TRIM(LOWER(p_nuevo_status_nombre));

    IF v_new_status_id IS NULL THEN
        RAISE EXCEPTION 'El estado "%" no es un estado válido.', p_nuevo_status_nombre;
    END IF;

    /**
     * Obtenemos el nombre del estado actual de la orden.
     */
    SELECT s.nombre INTO v_current_status_nombre
    FROM status_orden so
    JOIN status s ON so.fk_status = s.id
    WHERE so.fk_orden_de_compra = p_orden_id AND so.fecha_fin IS NULL;

    IF v_current_status_nombre IS NULL THEN
        RAISE EXCEPTION 'La orden de compra ID % no tiene un estado actual para actualizar o no existe.', p_orden_id;
    END IF;

    /**
     * Lógica de transición de estados.
     */
    CASE TRIM(LOWER(v_current_status_nombre))
        WHEN 'pendiente' THEN
            IF TRIM(LOWER(p_nuevo_status_nombre)) NOT IN ('aprobado', 'cancelado') THEN
                RAISE EXCEPTION 'Una orden "Pendiente" solo puede cambiar a "aprobado" o "cancelado", no a "%".', p_nuevo_status_nombre;
            END IF;
        WHEN 'aprobado' THEN
            IF TRIM(LOWER(p_nuevo_status_nombre)) NOT IN ('en proceso', 'cancelado') THEN
                RAISE EXCEPTION 'Una orden "aprobado" solo puede cambiar a "En Proceso" o "cancelado", no a "%".', p_nuevo_status_nombre;
            END IF;
        WHEN 'en proceso' THEN
            IF TRIM(LOWER(p_nuevo_status_nombre)) NOT IN ('finalizado', 'cancelado') THEN
                RAISE EXCEPTION 'Una orden "En Proceso" solo puede cambiar a "finalizado" o "cancelado", no a "%".', p_nuevo_status_nombre;
            END IF;
        WHEN 'finalizado', 'cancelado' THEN
            RAISE EXCEPTION 'La orden ya está en un estado terminal ("%") y no se puede cambiar.', v_current_status_nombre;
        ELSE
            RAISE EXCEPTION 'El estado actual de la orden ("%") no permite la transición a "%".', v_current_status_nombre, p_nuevo_status_nombre;
    END CASE;

    /**
     * Si el nuevo estado es 'finalizado', actualizamos la orden con la observación.
     */
    IF TRIM(LOWER(p_nuevo_status_nombre)) = 'finalizado' THEN
        UPDATE orden_de_compra
        SET observacion = p_observacion_final
        WHERE id = p_orden_id;
    END IF;

    /**
     * Asignamos el usuario a la orden si no tiene uno.
     */
    UPDATE orden_de_compra
    SET fk_usuario = p_usuario_id
    WHERE id = p_orden_id AND fk_usuario IS NULL;
    
    /**
     * Actualizamos el estado actual, poniéndole una fecha de fin.
     */
    UPDATE status_orden
    SET fecha_fin = v_fecha_actual
    WHERE fk_orden_de_compra = p_orden_id AND fecha_fin IS NULL;

    /**
     * Insertamos el nuevo estado para la orden de compra.
     */
    INSERT INTO status_orden (fecha_actualización, fecha_fin, fk_status, fk_orden_de_compra, fk_orden_de_reposicion)
    VALUES (v_fecha_actual, NULL, v_new_status_id, p_orden_id, NULL);
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS fn_update_status_orden_reposicion(INTEGER, VARCHAR, INTEGER, INTEGER, TEXT);

CREATE OR REPLACE FUNCTION fn_update_status_orden_reposicion(
    p_orden_id INTEGER,
    p_nuevo_status_nombre VARCHAR,
    p_usuario_id INTEGER,
    p_unidades_finalizadas INTEGER DEFAULT NULL,
    p_observacion_final TEXT DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
    v_fecha_actual TIMESTAMP := NOW();
    v_current_status_nombre VARCHAR;
    v_new_status_id INTEGER;
BEGIN
    /**
     * Obtenemos el ID del nuevo estado a partir de su nombre.
     * La función fn_get_status_by_nombre ya usa TRIM y LOWER.
     */
    SELECT id INTO v_new_status_id 
    FROM fn_get_status_by_nombre(p_nuevo_status_nombre);

    IF v_new_status_id IS NULL THEN
        RAISE EXCEPTION 'El estado "%" no es un estado válido.', p_nuevo_status_nombre;
    END IF;

    /**
     * Obtenemos el nombre del estado actual de la orden.
     */
    SELECT s.nombre INTO v_current_status_nombre
    FROM status_orden so
    JOIN status s ON so.fk_status = s.id
    WHERE so.fk_orden_de_reposicion = p_orden_id AND so.fecha_fin IS NULL;

    IF v_current_status_nombre IS NULL THEN
        RAISE EXCEPTION 'La orden ID % no tiene un estado actual para actualizar.', p_orden_id;
    END IF;

    /**
     * Lógica de transición de estados.
     * Usamos TRIM y LOWER para una comparación a prueba de errores.
     */
    CASE TRIM(LOWER(v_current_status_nombre))
        WHEN 'pendiente' THEN
            IF TRIM(LOWER(p_nuevo_status_nombre)) NOT IN ('aprobado', 'cancelado') THEN
                RAISE EXCEPTION 'Una orden "Pendiente" solo puede cambiar a "Aprobado" o "Cancelado", no a "%".', p_nuevo_status_nombre;
            END IF;
        WHEN 'aprobado' THEN
            IF TRIM(LOWER(p_nuevo_status_nombre)) NOT IN ('finalizado', 'cancelado') THEN
                RAISE EXCEPTION 'Una orden "Aprobado" solo puede cambiar a "Finalizado" o "Cancelado", no a "%".', p_nuevo_status_nombre;
            END IF;
        WHEN 'finalizado', 'cancelado' THEN
            RAISE EXCEPTION 'La orden ya está en un estado terminal ("%") y no se puede cambiar.', v_current_status_nombre;
        ELSE
            RAISE EXCEPTION 'El estado actual de la orden ("%") no permite la transición a "%".', v_current_status_nombre, p_nuevo_status_nombre;
    END CASE;

    /**
     * Si el nuevo estado es 'Finalizado', actualizamos la orden con las unidades y observación.
     */
    IF TRIM(LOWER(p_nuevo_status_nombre)) = 'finalizado' THEN
        IF p_unidades_finalizadas IS NULL THEN
            RAISE EXCEPTION 'Se requieren las unidades finalizadas para marcar una orden como "Finalizado".';
        END IF;
        
        UPDATE orden_de_reposicion
        SET
            unidades = p_unidades_finalizadas,
            observacion = p_observacion_final
        WHERE id = p_orden_id;
    END IF;

    /**
     * Si la transición es válida, asignamos el usuario a la orden si no tiene uno.
     * Esto es útil para saber qué usuario realizó la primera acción importante (aprobar/cancelar).
     */
    UPDATE orden_de_reposicion
    SET fk_usuario = p_usuario_id
    WHERE id = p_orden_id AND fk_usuario IS NULL;
    
    /**
     * Si la transición es válida, procedemos a actualizar el estado.
     */
    UPDATE status_orden
    SET fecha_fin = v_fecha_actual
    WHERE fk_orden_de_reposicion = p_orden_id AND fecha_fin IS NULL;

    /**
     * Finalmente, insertamos el nuevo estado para la orden.
     */
    INSERT INTO status_orden (fecha_actualización, fecha_fin, fk_status, fk_orden_de_reposicion, fk_orden_de_compra)
    VALUES (v_fecha_actual, NULL, v_new_status_id, p_orden_id, NULL);
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS fn_update_status_venta_a_completado(INTEGER);

CREATE OR REPLACE FUNCTION fn_update_status_venta_a_completado(
  p_venta_id INTEGER
)
RETURNS VOID AS $$
DECLARE
  v_status_completado_id INTEGER;
  v_fecha_actual TIMESTAMP := NOW();
BEGIN
  -- Primero, obtener el ID para el status 'Completado' desde la tabla 'status'
  SELECT id INTO v_status_completado_id FROM status WHERE nombre = 'Completado';

  -- Si no se encuentra el status, lanzar una excepción
  IF v_status_completado_id IS NULL THEN
    RAISE EXCEPTION 'El status ''Completado'' no se encontró en la tabla status.';
  END IF;

  -- Actualizar el estado anterior de la venta, estableciendo la fecha de finalización
  UPDATE status_venta
  SET fecha_fin = v_fecha_actual
  WHERE fk_venta = p_venta_id AND fecha_fin IS NULL;

  -- Insertar el nuevo estado 'Completado' para la venta
  INSERT INTO status_venta (fecha_actualización, fecha_fin, fk_status, fk_venta)
  VALUES (v_fecha_actual, NULL, v_status_completado_id, p_venta_id);

END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS fn_update_status_venta(INTEGER, INTEGER);

/**
 * Actualiza el estado de una venta.
 *
 * Esta función se encarga de dos cosas:
 * 1. Finaliza el estado actual de la venta, estableciendo la `fecha_final`.
 * 2. Inserta un nuevo registro para reflejar el nuevo estado de la venta.
 */
CREATE OR REPLACE FUNCTION fn_update_status_venta(
  p_venta_id INTEGER,
  p_status_id INTEGER
)
RETURNS VARCHAR AS $$
DECLARE
  v_estado_actual VARCHAR;
  v_nuevo_estado VARCHAR;
BEGIN
  -- Encuentra el nombre del estado actual de la venta (el que no tiene fecha final)
  SELECT s.nombre INTO v_estado_actual
  FROM status_venta sv
  JOIN status s ON sv.fk_status = s.id
  WHERE sv.fk_venta = p_venta_id AND sv.fecha_final IS NULL;

  -- Si no se encuentra un estado actual, es un error porque toda venta debe tener uno
  IF v_estado_actual IS NULL THEN
    RAISE EXCEPTION 'La venta de ID % no tiene un estado actual para actualizar.', p_venta_id;
  END IF;

  -- Encuentra el nombre del nuevo estado que va a ser asignado a la venta
  SELECT s.nombre INTO v_nuevo_estado
  FROM status s
  WHERE s.id = p_status_id;

  -- Si el ID del nuevo estado no existe en la tabla status, es un error
  IF v_nuevo_estado IS NULL THEN
    RAISE EXCEPTION 'El estado con ID % no fue encontrado en la tabla `status`.', p_status_id;
  END IF;

  -- Una venta en estado cancelado ya llego a su fin, lanzar error
  IF upper(v_estado_actual) = 'CANCELADO' THEN
      RAISE EXCEPTION 'La venta ya está en un estado final ("%") y no puede cambiar.', v_estado_actual;
  END IF;

  -- Una venta con estado pendiente solo puede cambiar a completado o cancelado
  IF upper(v_estado_actual) = 'PENDIENTE' AND upper(v_nuevo_estado) NOT IN ('COMPLETADO', 'CANCELADO') THEN
    RAISE EXCEPTION 'Una venta en estado "Pendiente" solo puede cambiar a "Completado" o "Cancelado", no a "%".', v_nuevo_estado;
  END IF;

  -- Actualiza el estado anterior asignándole una fecha final
  UPDATE status_venta
  SET fecha_final = NOW()
  WHERE fk_venta = p_venta_id AND fecha_final IS NULL;

  -- Crear nuevo estado de la venta con fecha inicial igual a la fecha final del estado anterior
  INSERT INTO status_venta(fk_venta, fk_status, fecha_inicial, fecha_final)
  VALUES (p_venta_id, p_status_id, NOW(), NULL);

  RETURN 'Estado de la venta ' || p_venta_id || ' actualizado de "' || v_estado_actual || '" a "' || v_nuevo_estado || '".';
END;
$$ LANGUAGE plpgsql;

/**
 * @name fn_update_user_role
 * @description Actualiza el rol de cualquier usuario del sistema.
 * @param p_id_usuario - ID del usuario a actualizar.
 * @param p_id_nuevo_rol - ID del nuevo rol a asignar.
 * @returns BOOLEAN - Verdadero si la actualización fue exitosa, falso en caso contrario.
 * @throws EXCEPTION - Si el rol de destino no está permitido.
 */
CREATE OR REPLACE FUNCTION fn_update_user_role(
    p_id_usuario INT,
    p_id_nuevo_rol INT
)
RETURNS BOOLEAN AS $$
DECLARE
    v_new_role_name VARCHAR;
BEGIN
    /**
     * @dev Obtiene el nombre del nuevo rol para validar si está permitido.
     */
    SELECT nombre INTO v_new_role_name
    FROM rol
    WHERE id = p_id_nuevo_rol;
    /**
     * @dev Si todas las validaciones pasan, actualiza el rol del usuario.
     */
    UPDATE usuario
    SET fk_rol = p_id_nuevo_rol
    WHERE id = p_id_usuario;

    RETURN TRUE;

EXCEPTION
    WHEN no_data_found THEN
        RAISE EXCEPTION 'El rol con ID % no existe.', p_id_nuevo_rol;
    WHEN check_violation THEN
        RAISE EXCEPTION '%', SQLERRM;
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Ocurrió un error inesperado al actualizar el rol: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fn_retencion_clientes(p_fecha_inicio DATE, p_fecha_fin DATE)
RETURNS NUMERIC AS $$
DECLARE
    v_clientes_recurrentes INTEGER;
    v_total_clientes       INTEGER;
    v_tasa_retencion       NUMERIC;
BEGIN
    /**
     * Tarea: Tasa de Retención de Clientes
     * Mide el porcentaje de clientes que realizan más de una compra en un período determinado.
     *
     * Fórmula utilizada:
     * Tasa de Retención = (Clientes que compraron más de una vez / Total de clientes únicos) * 100
     */

    /**
     * Pasos 1 y 2: Se realizan en una única consulta para mayor eficiencia.
     * Se identifican compras, se unifican clientes, se cuentan las compras por cliente,
     * y se calcula el total de clientes y clientes recurrentes.
     */
    WITH ventas_con_cliente AS (
        SELECT DISTINCT
            v.id AS venta_id,
            -- Se crea un ID de cliente unificado para rastrear compras de forma consistente
            COALESCE(
                'natural_' || v.fk_cliente_natural::TEXT,
                'juridico_' || v.fk_cliente_juridico::TEXT,
                'natural_' || cu.fk_cliente_natural::TEXT,
                'juridico_' || cu.fk_cliente_juridico::TEXT
            ) AS cliente_id_unificado
        FROM venta v
        JOIN status_venta sv ON v.id = sv.fk_venta
        -- Se une con cliente_usuario para resolver los clientes de ventas web
        LEFT JOIN cliente_usuario cu ON v.fk_usuario = cu.fk_usuario
        WHERE sv.fecha_actualización::date BETWEEN p_fecha_inicio AND p_fecha_fin
    ),
    compras_por_cliente AS (
        SELECT
            cliente_id_unificado,
            COUNT(venta_id) AS numero_de_compras
        FROM ventas_con_cliente
        WHERE cliente_id_unificado IS NOT NULL
        GROUP BY cliente_id_unificado
    )
    SELECT
        COUNT(*),
        COUNT(*) FILTER (WHERE numero_de_compras > 1)
    INTO
        v_total_clientes,
        v_clientes_recurrentes
    FROM compras_por_cliente;

    /**
     * Paso 3: Calcular la tasa de retención.
     * Si no hay clientes en el período, la tasa es 0 para evitar la división por cero.
     */
    IF v_total_clientes > 0 THEN
        v_tasa_retencion := (v_clientes_recurrentes::NUMERIC / v_total_clientes::NUMERIC) * 100;
    ELSE
        v_tasa_retencion := 0;
    END IF;

    /**
     * Paso 4: Retornar el valor calculado.
     */
    RETURN v_tasa_retencion;

END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fn_rotacion_inventario(p_fecha_inicio DATE, p_fecha_fin DATE)
RETURNS NUMERIC AS $$
DECLARE
    v_valor_promedio_inventario NUMERIC;
    v_costo_productos_vendidos  NUMERIC;
    v_rotacion_inventario       NUMERIC;
BEGIN
    /**
     * Tarea: Rotación de Inventario
     * Mide la rapidez con la que se vende y reemplaza el inventario.
     *
     * Fórmula utilizada (según solicitud):
     * Rotación de inventario = Valor promedio del inventario / Costo de los productos vendidos
     *
     * Nota sobre el cálculo del "Valor promedio del inventario":
     * El esquema de la base de datos actual no almacena un historial de niveles de inventario,
     * lo cual es necesario para calcular un promedio de inventario verdadero (ej. (valor_inicial + valor_final) / 2).
     * Como una aproximación práctica, esta función utiliza el VALOR ACTUAL TOTAL del inventario como
     * el "valor promedio". Este valor se calcula sumando el valor de todo el stock existente en
     * todos los almacenes.
     */

    /**
     * Paso 1: Calcular el "Valor promedio del inventario".
     * Se utiliza el valor actual total del inventario.
     * Se multiplica la cantidad de cada producto en el inventario de los almacenes (`inventario.cantidad_almacen`)
     * por su precio de venta (`presentacion_cerveza.precio`).
     */
    SELECT COALESCE(SUM(i.cantidad_almacen * pc.precio), 0)
    INTO v_valor_promedio_inventario
    FROM inventario i
    JOIN presentacion_cerveza pc 
      ON i.fk_presentacion_cerveza_1 = pc.fk_presentacion 
     AND i.fk_presentacion_cerveza_2 = pc.fk_cerveza;

    /**
     * Paso 2: Calcular el "Costo de los productos vendidos" (COGS) en el período especificado.
     * Se suma el valor de todos los productos vendidos en el rango de fechas.
     * Se utiliza `detalle_presentacion` para obtener la cantidad y el precio de cada item vendido,
     * y se une con la tabla `pago` a través de `venta` para filtrar por la fecha de pago (`pago.fecha_pago`).
     */
    SELECT COALESCE(SUM(dp.cantidad * dp.precio_unitario), 0)
    INTO v_costo_productos_vendidos
    FROM detalle_presentacion dp
    JOIN venta v ON dp.fk_venta = v.id
    JOIN pago p ON p.fk_venta = v.id
    WHERE p.fecha_pago::date BETWEEN p_fecha_inicio AND p_fecha_fin;

    /**
     * Paso 3: Calcular la rotación de inventario.
     * Se divide el valor del inventario entre el costo de los productos vendidos.
     * Si el costo de los productos vendidos es cero, la rotación es cero para evitar división por cero.
     */
    IF v_costo_productos_vendidos > 0 THEN
        v_rotacion_inventario := v_valor_promedio_inventario / v_costo_productos_vendidos;
    ELSE
        v_rotacion_inventario := 0;
    END IF;

    /**
     * Paso 4: Retornar el valor calculado.
     */
    RETURN v_rotacion_inventario;

END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS fn_calcular_tasa_ruptura_stock;
DROP FUNCTION IF EXISTS fn_tasa_ruptura_global;
DROP FUNCTION IF EXISTS fn_tasa_ruptura_por_tienda;

CREATE OR REPLACE FUNCTION fn_calcular_tasa_ruptura_stock(
    p_tienda_id INTEGER DEFAULT NULL,
    p_tipo_calculo VARCHAR(20) DEFAULT 'global'
) RETURNS TABLE(
    tipo_calculo VARCHAR(20),
    tienda_id INTEGER,
    total_ordenes INTEGER,
    total_productos_monitoreados INTEGER,
    dias_total INTEGER,
    oportunidades_stock BIGINT,
    tasa_ruptura_global_porcentaje DECIMAL(8,4),
    fecha_primera_orden DATE,
    fecha_ultima_orden DATE
) AS $$
DECLARE
    v_total_ordenes INTEGER;
    v_total_productos_monitoreados INTEGER;
    v_tasa_ruptura_global DECIMAL(8,4);
    v_dias_periodo INTEGER;
    v_fecha_inicio DATE;
    v_fecha_fin DATE;
    v_oportunidades_stock BIGINT;
BEGIN
    /** Calcular período histórico completo */
    SELECT MIN(odr.fecha_orden), MAX(odr.fecha_orden)
    INTO v_fecha_inicio, v_fecha_fin
    FROM orden_de_reposicion odr
    WHERE (p_tienda_id IS NULL OR odr.fk_lugar_tienda_2 = p_tienda_id);
    
    /** Si no hay datos, establecer valores por defecto */
    IF v_fecha_inicio IS NULL THEN
        v_fecha_inicio := CURRENT_DATE - INTERVAL '1 day';
        v_fecha_fin := CURRENT_DATE;
    END IF;
    
    v_dias_periodo := v_fecha_fin - v_fecha_inicio + 1;
    
    /** Calcular según el tipo de cálculo solicitado */
    IF p_tipo_calculo = 'global' THEN
        /** Tasa de ruptura global usando la fórmula: (∑Si / N × D) × 100% */
        
        -- Contar órdenes de reposición históricas (∑Si)
        SELECT COUNT(*)
        INTO v_total_ordenes
        FROM orden_de_reposicion odr
        WHERE (p_tienda_id IS NULL OR odr.fk_lugar_tienda_2 = p_tienda_id);
        
        -- Contar productos únicos monitoreados en tiendas (N)
        SELECT COUNT(DISTINCT (lti.fk_inventario_1, lti.fk_inventario_2))
        INTO v_total_productos_monitoreados
        FROM lugar_tienda_inventario lti
        WHERE (p_tienda_id IS NULL OR lti.fk_lugar_tienda_2 = p_tienda_id);
        
        -- Calcular oportunidades de stock (N × D)
        v_oportunidades_stock := v_total_productos_monitoreados::BIGINT * v_dias_periodo;
        
        -- Calcular tasa de ruptura global usando la fórmula
        IF v_oportunidades_stock > 0 THEN
            v_tasa_ruptura_global := (v_total_ordenes::DECIMAL / v_oportunidades_stock) * 100;
        ELSE
            v_tasa_ruptura_global := 0;
        END IF;
        
        -- Retornar fila con resultado global
        RETURN QUERY SELECT 
            'global'::VARCHAR(20) as tipo_calculo,
            p_tienda_id as tienda_id,
            v_total_ordenes as total_ordenes,
            v_total_productos_monitoreados as total_productos_monitoreados,
            v_dias_periodo as dias_total,
            v_oportunidades_stock as oportunidades_stock,
            v_tasa_ruptura_global as tasa_ruptura_global_porcentaje,
            v_fecha_inicio as fecha_primera_orden,
            v_fecha_fin as fecha_ultima_orden;
        
    ELSIF p_tipo_calculo = 'tienda' THEN
        /** Tasa de ruptura por tienda usando la fórmula global */
        
        -- Retornar filas con resultado por tienda
        RETURN QUERY 
        SELECT 
            'tienda'::VARCHAR(20) as tipo_calculo,
            subq.tienda_id as tienda_id,
            subq.total_ordenes as total_ordenes,
            subq.productos_monitoreados as total_productos_monitoreados,
            v_dias_periodo as dias_total,
            subq.oportunidades_stock as oportunidades_stock,
            subq.tasa_ruptura_global as tasa_ruptura_global_porcentaje,
            subq.fecha_primera_orden as fecha_primera_orden,
            subq.fecha_ultima_orden as fecha_ultima_orden
        FROM (
            SELECT 
                odr.fk_lugar_tienda_2 as tienda_id,
                COUNT(*) as total_ordenes,
                (SELECT COUNT(DISTINCT (lti.fk_inventario_1, lti.fk_inventario_2))
                 FROM lugar_tienda_inventario lti
                 WHERE lti.fk_lugar_tienda_2 = odr.fk_lugar_tienda_2) as productos_monitoreados,
                ((SELECT COUNT(DISTINCT (lti.fk_inventario_1, lti.fk_inventario_2))
                  FROM lugar_tienda_inventario lti
                  WHERE lti.fk_lugar_tienda_2 = odr.fk_lugar_tienda_2)::BIGINT * v_dias_periodo) as oportunidades_stock,
                CASE 
                    WHEN ((SELECT COUNT(DISTINCT (lti.fk_inventario_1, lti.fk_inventario_2))
                          FROM lugar_tienda_inventario lti
                          WHERE lti.fk_lugar_tienda_2 = odr.fk_lugar_tienda_2) * v_dias_periodo) > 0 THEN
                        (COUNT(*)::DECIMAL / 
                         ((SELECT COUNT(DISTINCT (lti.fk_inventario_1, lti.fk_inventario_2))
                           FROM lugar_tienda_inventario lti
                           WHERE lti.fk_lugar_tienda_2 = odr.fk_lugar_tienda_2) * v_dias_periodo)) * 100
                    ELSE 0
                END as tasa_ruptura_global,
                MIN(odr.fecha_orden) as fecha_primera_orden,
                MAX(odr.fecha_orden) as fecha_ultima_orden
            FROM orden_de_reposicion odr
            WHERE (p_tienda_id IS NULL OR odr.fk_lugar_tienda_2 = p_tienda_id)
            GROUP BY odr.fk_lugar_tienda_2
            ORDER BY COUNT(*) DESC
        ) subq;
        
    ELSE
        /** Tipo de cálculo no válido - retornar fila con error */
        RETURN QUERY SELECT 
            'error'::VARCHAR(20) as tipo_calculo,
            NULL::INTEGER as tienda_id,
            NULL::INTEGER as total_ordenes,
            NULL::INTEGER as total_productos_monitoreados,
            NULL::INTEGER as dias_total,
            NULL::BIGINT as oportunidades_stock,
            NULL::DECIMAL(8,4) as tasa_ruptura_global_porcentaje,
            NULL::DATE as fecha_primera_orden,
            NULL::DATE as fecha_ultima_orden;
    END IF;
    
    RETURN;
    
EXCEPTION
    WHEN OTHERS THEN
        /** Manejo de errores - retornar fila con error */
        RETURN QUERY SELECT 
            'error'::VARCHAR(20) as tipo_calculo,
            NULL::INTEGER as tienda_id,
            NULL::INTEGER as total_ordenes,
            NULL::INTEGER as total_productos_monitoreados,
            NULL::INTEGER as dias_total,
            NULL::BIGINT as oportunidades_stock,
            NULL::DECIMAL(8,4) as tasa_ruptura_global_porcentaje,
            NULL::DATE as fecha_primera_orden,
            NULL::DATE as fecha_ultima_orden;
        RETURN;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fn_tasa_ruptura_global(
    p_tienda_id INTEGER DEFAULT NULL
) RETURNS TABLE(
    tipo_calculo VARCHAR(20),
    tienda_id INTEGER,
    total_ordenes INTEGER,
    total_productos_monitoreados INTEGER,
    dias_total INTEGER,
    oportunidades_stock BIGINT,
    tasa_ruptura_global_porcentaje DECIMAL(8,4),
    fecha_primera_orden DATE,
    fecha_ultima_orden DATE
) AS $$
BEGIN
    /** Calcular tasa de ruptura global */
    RETURN QUERY SELECT * FROM fn_calcular_tasa_ruptura_stock(
        p_tienda_id,
        'global'
    );
END;
$$ LANGUAGE plpgsql;

/**
 * fn_get_stats_tienda_empleado
 * Obtiene estadísticas de ventas por empleado
 * 
 * @returns TABLE con estadísticas de ventas por empleado
 */
CREATE OR REPLACE FUNCTION fn_get_stats_tienda_empleado()
RETURNS TABLE (
    fk_empleado INTEGER,
    total_ventas BIGINT,
    nombre_empleado VARCHAR,
    identificacion VARCHAR,
    cargo VARCHAR,
    departamento VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Manejo de errores básico
    BEGIN
        RETURN QUERY
        SELECT 
            v.fk_empleado,
            COUNT(*)::BIGINT AS total_ventas,
            (e.primer_nombre || ' ' || e.primer_apellido)::VARCHAR AS nombre_empleado,
            (e.nacionalidad || '-' || e.ci)::VARCHAR AS identificacion,
            COALESCE(c.nombre, 'Sin cargo')::VARCHAR AS cargo,
            COALESCE(d.nombre, 'Sin departamento')::VARCHAR AS departamento
        FROM venta v
        LEFT JOIN empleado e ON v.fk_empleado = e.id
        LEFT JOIN (
            -- Subconsulta para obtener la nómina más reciente de cada empleado
            SELECT DISTINCT ON (nom.fk_empleado) 
                nom.fk_empleado AS id_empleado_nomina,
                nom.fk_cargo, 
                nom.fk_departamento
            FROM nomina nom
            ORDER BY nom.fk_empleado, nom.fecha_inicio DESC
        ) AS n ON e.id = n.id_empleado_nomina
        LEFT JOIN cargo c ON n.fk_cargo = c.id
        LEFT JOIN departamento d ON n.fk_departamento = d.id
        WHERE v.fk_empleado IS NOT NULL
        GROUP BY 
            v.fk_empleado,
            e.primer_nombre, 
            e.primer_apellido, 
            e.nacionalidad, 
            e.ci, 
            c.nombre, 
            d.nombre
        ORDER BY total_ventas DESC;
        
    EXCEPTION
        WHEN OTHERS THEN
            RAISE EXCEPTION 'Error al obtener estadísticas de ventas por empleado: %', SQLERRM;
    END;
END;
$$;


CREATE OR REPLACE FUNCTION fn_get_total_generado_tienda()
RETURNS TABLE (
    tienda_nombre VARCHAR,
    tipo_tienda VARCHAR,
    total_generado DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    -- Ventas en tiendas físicas
    SELECT
        l.nombre AS tienda_nombre,
        'Física' AS tipo_tienda,
        SUM(v.monto_total) AS total_generado
    FROM venta v
    JOIN tienda_fisica tf ON v.fk_tienda_fisica = tf.id
    JOIN lugar l ON tf.fk_lugar = l.id
    GROUP BY l.nombre

    UNION ALL

    -- Ventas en tienda web
    SELECT
        tw.dominio_web AS tienda_nombre,
        'Web' AS tipo_tienda,
        SUM(v.monto_total) AS total_generado
    FROM venta v
    JOIN tienda_web tw ON v.fk_tienda_web = tw.id
    GROUP BY tw.dominio_web;
END;
$$;

DROP FUNCTION IF EXISTS fn_get_crecimiento_ventas(DATE, VARCHAR);

CREATE OR REPLACE FUNCTION fn_get_crecimiento_ventas(
    fecha_referencia DATE,
    tipo_comparacion VARCHAR
)
RETURNS TABLE (
    periodo TEXT,
    ventas_totales DECIMAL,
    crecimiento_abs DECIMAL,
    crecimiento_pct DECIMAL
)
LANGUAGE plpgsql
AS $$
DECLARE
    ventas_actual DECIMAL;
    ventas_anterior DECIMAL;
    fecha_inicio_actual DATE;
    fecha_fin_actual DATE;
    fecha_inicio_anterior DATE;
    fecha_fin_anterior DATE;
BEGIN
    -- Determinar los rangos de fecha según el tipo de comparación
    IF tipo_comparacion = 'mensual' THEN
        fecha_inicio_actual   := DATE_TRUNC('month', fecha_referencia)::DATE;
        fecha_fin_actual     := (DATE_TRUNC('month', fecha_referencia) + INTERVAL '1 month' - INTERVAL '1 day')::DATE;
        fecha_inicio_anterior := (DATE_TRUNC('month', fecha_referencia) - INTERVAL '1 month')::DATE;
        fecha_fin_anterior   := (DATE_TRUNC('month', fecha_referencia) - INTERVAL '1 day')::DATE;
    ELSIF tipo_comparacion = 'anual' THEN
        fecha_inicio_actual   := DATE_TRUNC('year', fecha_referencia)::DATE;
        fecha_fin_actual     := (DATE_TRUNC('year', fecha_referencia) + INTERVAL '1 year' - INTERVAL '1 day')::DATE;
        fecha_inicio_anterior := (DATE_TRUNC('year', fecha_referencia) - INTERVAL '1 year')::DATE;
        fecha_fin_anterior   := (DATE_TRUNC('year', fecha_referencia) - INTERVAL '1 day')::DATE;
    ELSE
        RAISE EXCEPTION 'El tipo de comparación debe ser ''mensual'' o ''anual''.';
    END IF;

    -- Calcular ventas para el período actual
    SELECT COALESCE(SUM(v.monto_total), 0)
    INTO ventas_actual
    FROM venta v
    WHERE v.id IN (
        SELECT sv.fk_venta
        FROM status_venta sv
        JOIN status s ON sv.fk_status = s.id
        JOIN venta v_check ON sv.fk_venta = v_check.id
        WHERE sv.fk_venta IS NOT NULL
          AND (
                (v_check.fk_tienda_web IS NOT NULL AND s.nombre = 'Despachando')
                OR
                (v_check.fk_tienda_fisica IS NOT NULL AND s.nombre = 'Completado')
          )
          AND sv.fecha_actualización::DATE BETWEEN fecha_inicio_actual AND fecha_fin_actual
    );

    -- Calcular ventas para el período anterior
    SELECT COALESCE(SUM(v.monto_total), 0)
    INTO ventas_anterior
    FROM venta v
    WHERE v.id IN (
        SELECT sv.fk_venta
        FROM status_venta sv
        JOIN status s ON sv.fk_status = s.id
        JOIN venta v_check ON sv.fk_venta = v_check.id
        WHERE sv.fk_venta IS NOT NULL
          AND (
                (v_check.fk_tienda_web IS NOT NULL AND s.nombre = 'Despachando')
                OR
                (v_check.fk_tienda_fisica IS NOT NULL AND s.nombre = 'Completado')
          )
          AND sv.fecha_actualización::DATE BETWEEN fecha_inicio_anterior AND fecha_fin_anterior
    );

    -- Devolver los resultados
    RETURN QUERY
    SELECT
        'Periodo Actual' AS periodo,
        ventas_actual AS ventas_totales,
        ventas_actual - ventas_anterior AS crecimiento_abs,
        CASE
            WHEN ventas_anterior = 0 THEN NULL
            ELSE ((ventas_actual - ventas_anterior) / ventas_anterior) * 100
        END AS crecimiento_pct
    UNION ALL
    SELECT
        'Periodo Anterior' AS periodo,
        ventas_anterior AS ventas_totales,
        NULL AS crecimiento_abs,
        NULL AS crecimiento_pct;
END;
$$;

DROP FUNCTION IF EXISTS fn_get_ticket_promedio();

CREATE OR REPLACE FUNCTION fn_get_ticket_promedio()
RETURNS DECIMAL
LANGUAGE plpgsql
AS $$
DECLARE
    ticket_promedio_total DECIMAL;
BEGIN
    -- Calcular el valor promedio de todas las ventas completadas
    SELECT COALESCE(AVG(v.monto_total), 0)
    INTO ticket_promedio_total
    FROM venta v
    WHERE v.id IN (
        SELECT sv.fk_venta
        FROM status_venta sv
        JOIN status s ON sv.fk_status = s.id
        JOIN venta v_check ON sv.fk_venta = v_check.id
        WHERE sv.fk_venta IS NOT NULL
          AND (
                (v_check.fk_tienda_web IS NOT NULL AND s.nombre = 'Despachando')
                OR
                (v_check.fk_tienda_fisica IS NOT NULL AND s.nombre = 'Completado')
          )
    );

    RETURN ticket_promedio_total;
END;
$$; 