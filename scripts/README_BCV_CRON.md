# Sistema de Actualización Automática de Tasas BCV

Este sistema obtiene automáticamente la tasa de cambio del BCV desde la API de [PyDolarVenezuela](https://docs.pydolarve.org/operations/get-api-v2-tipo-cambio.html) y la almacena en la tabla `tasa` de la base de datos.

## 📋 Requisitos Previos

1. **PostgreSQL 12+** con permisos de superusuario
2. **Extensiones PostgreSQL:**
   - `http` - Para hacer peticiones HTTP
   - `pg_cron` - Para programar tareas
   - `plpython3u` (opcional) - Para la versión Python

## 🚀 Instalación

### 1. Configurar pg_cron en PostgreSQL

Editar `postgresql.conf`:
```conf
shared_preload_libraries = 'pg_cron'
cron.database_name = 'acaucab'  # Tu base de datos
```

Reiniciar PostgreSQL después de los cambios.

### 2. Ejecutar Scripts de Instalación

```sql
-- Conectar como superusuario a tu base de datos
\c acaucab

-- Ejecutar el script principal
\i scripts/procedures/refresh_bcv.sql

-- Ejecutar el script de configuración
\i scripts/procedures/setup_bcv_cron.sql
```

### 3. Verificar Instalación

```sql
-- Probar la conexión con la API
SELECT * FROM test_bcv_api();

-- Ver jobs programados
SELECT * FROM cron.job;
```

## 📊 Estructura de la Tabla Tasa

```sql
CREATE TABLE tasa (
    id                 SERIAL PRIMARY KEY,
    moneda             VARCHAR(25) NOT NULL,      -- 'USD'
    monto_equivalencia DECIMAL(10,2) NOT NULL,   -- Tasa en Bs.
    fecha_inicio       DATE NOT NULL,             -- Fecha de vigencia
    fecha_fin          DATE                      -- NULL = vigente
);
```

## 🔧 Funciones Disponibles

### 1. `refresh_bcv_rates()`
Función principal que actualiza las tasas del BCV.

```sql
-- Ejecutar manualmente
SELECT refresh_bcv_rates();
```

### 2. `test_bcv_api()`
Prueba la conexión con la API sin modificar datos.

```sql
SELECT * FROM test_bcv_api();
-- Resultado: moneda | tasa | fecha_consulta
```

### 3. `get_tasa_usd_actual()`
Obtiene la tasa USD vigente.

```sql
SELECT get_tasa_usd_actual();
-- Resultado: 36.50 (ejemplo)
```

### 4. `refresh_bcv_rates_with_log()`
Versión con logging para monitoreo.

```sql
SELECT refresh_bcv_rates_with_log();

-- Ver logs
SELECT * FROM bcv_update_log ORDER BY fecha_ejecucion DESC LIMIT 10;
```

## ⏰ Programación del Cron Job

El sistema ejecuta automáticamente:
- **11:59 PM** - Actualización principal diaria
- **6:00 AM** - Respaldo (solo si no hay tasa del día)

### Modificar Horarios

```sql
-- Eliminar job existente
SELECT cron.unschedule('refresh-bcv-daily');

-- Crear nuevo horario (ejemplo: 10:00 PM)
SELECT cron.schedule(
    'refresh-bcv-daily',
    '0 22 * * *',
    'SELECT refresh_bcv_rates_with_log();'
);
```

## 📈 Monitoreo

### Ver Últimas Tasas
```sql
SELECT * FROM v_tasa_actual;

-- O directamente
SELECT * FROM tasa 
WHERE moneda = 'USD' 
ORDER BY fecha_inicio DESC 
LIMIT 10;
```

### Ver Logs de Actualización
```sql
SELECT 
    fecha_ejecucion,
    exitoso,
    mensaje,
    tasa_obtenida
FROM bcv_update_log 
ORDER BY fecha_ejecucion DESC 
LIMIT 20;
```

### Alertas de Fallos
```sql
-- Ver últimos fallos
SELECT * FROM bcv_update_log 
WHERE exitoso = false 
ORDER BY fecha_ejecucion DESC;
```

## 🛠️ Mantenimiento

### Limpiar Logs Antiguos
```sql
-- Mantener solo últimos 30 días
DELETE FROM bcv_update_log 
WHERE fecha_ejecucion < CURRENT_DATE - INTERVAL '30 days';
```

### Actualización Manual de Emergencia
```sql
-- Si la API falla, insertar manualmente
INSERT INTO tasa (moneda, monto_equivalencia, fecha_inicio, fecha_fin)
VALUES ('USD', 36.50, CURRENT_DATE, NULL);

-- No olvidar cerrar la tasa anterior
UPDATE tasa 
SET fecha_fin = CURRENT_DATE 
WHERE moneda = 'USD' 
  AND fecha_fin IS NULL 
  AND fecha_inicio < CURRENT_DATE;
```

## 🐛 Solución de Problemas

### Error: "could not find function http_get"
```sql
CREATE EXTENSION IF NOT EXISTS http;
```

### Error: "pg_cron not found"
1. Verificar `shared_preload_libraries` en `postgresql.conf`
2. Reiniciar PostgreSQL
3. `CREATE EXTENSION pg_cron;`

### La tasa no se actualiza
1. Verificar logs: `SELECT * FROM bcv_update_log ORDER BY fecha_ejecucion DESC;`
2. Probar API: `SELECT * FROM test_bcv_api();`
3. Verificar jobs: `SELECT * FROM cron.job;`

## 📝 Notas Importantes

1. **Zona Horaria**: Los cron jobs usan la zona horaria del servidor PostgreSQL
2. **Duplicados**: El sistema cierra automáticamente tasas anteriores
3. **API Caída**: El sistema registra errores pero no interrumpe operaciones
4. **Respaldo**: Siempre mantener un backup de las tasas históricas

## 🔗 Referencias

- [API PyDolarVenezuela](https://docs.pydolarve.org/operations/get-api-v2-tipo-cambio.html)
- [pg_cron Documentation](https://github.com/citusdata/pg_cron)
- [PostgreSQL HTTP Extension](https://github.com/pramsey/pgsql-http) 