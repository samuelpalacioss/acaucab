const { createClient } = require('@supabase/supabase-js')
const path = require('path')
const fs = require('fs')
require('dotenv').config({ path: '.env.local' })

// Verificar variables de entorno requeridas
const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY'
]

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`❌ Error: ${envVar} no está definido en .env.local`)
        process.exit(1)
    }
}

// Asegurarnos de que la URL de Supabase sea correcta
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.replace('db.', '')
console.log('🔍 Configuración:')
console.log('URL:', supabaseUrl)
console.log('Service Role Key:', process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 10) + '...')

// Inicializar el cliente de Supabase con configuración adicional
const supabase = createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        },
        db: {
            schema: 'public'
        }
    }
)

/**
 * Ejecuta una consulta SQL usando el cliente de Supabase
 * @param {string} sql - Consulta SQL a ejecutar
 */
async function executeSql(sql) {
    try {
        console.log('📝 Ejecutando SQL...')

        // Primero, verificar la conexión
        const { data: testData, error: testError } = await supabase
            .from('venta')
            .select('id')
            .limit(1)

        if (testError) {
            console.error('❌ Error al conectar con Supabase:', testError.message)
            throw testError
        }

        console.log('✅ Conexión exitosa con Supabase')

        // Ahora ejecutar el SQL
        const { data, error } = await supabase
            .rpc('exec_sql', { sql })

        if (error) {
            console.error('❌ Error en la consulta SQL:', error.message)
            throw error
        }

        return data
    } catch (error) {
        console.error('❌ Error al ejecutar SQL:', error.message)
        if (error.details) console.error('Detalles:', error.details)
        if (error.hint) console.error('Sugerencia:', error.hint)
        throw error
    }
}

/**
 * Sincroniza procedimientos almacenados con Supabase
 * @param {string} specificFile - Archivo específico a sincronizar (opcional)
 * @param {string} specificFolder - Carpeta específica a sincronizar (opcional)
 */
async function syncProcedures(specificFile = null, specificFolder = null) {
    try {
        // Ruta base a la carpeta de procedimientos
        const basePath = path.join(process.cwd(), 'scripts', 'procedures')
        console.log('📁 Ruta base:', basePath)

        if (specificFile) {
            // Sincronizar un archivo específico
            const filePath = path.join(basePath, specificFile)
            if (fs.existsSync(filePath)) {
                console.log(`🔄 Sincronizando procedimiento: ${specificFile}`)
                const sql = fs.readFileSync(filePath, 'utf-8')
                await executeSql(sql)
                console.log(`✅ ${specificFile} sincronizado correctamente`)
            } else {
                console.error(`❌ Archivo ${specificFile} no encontrado en ${basePath}`)
            }
        } else if (specificFolder) {
            // Sincronizar una carpeta específica
            const folderPath = path.join(basePath, specificFolder)
            if (fs.existsSync(folderPath)) {
                await syncFolder(folderPath)
            } else {
                console.error(`❌ Carpeta ${specificFolder} no encontrada en ${basePath}`)
            }
        } else {
            // Sincronizar toda la carpeta de procedimientos
            await syncFolder(basePath)
        }
    } catch (error) {
        console.error('❌ Error al sincronizar procedimientos:', error.message)
        process.exit(1)
    }
}

/**
 * Sincroniza todos los archivos SQL en una carpeta y sus subcarpetas
 * @param {string} folderPath - Ruta de la carpeta a sincronizar
 */
async function syncFolder(folderPath) {
    const items = fs.readdirSync(folderPath)

    for (const item of items) {
        const itemPath = path.join(folderPath, item)
        const stat = fs.statSync(itemPath)

        if (stat.isDirectory()) {
            // Si es una carpeta, sincronizar recursivamente
            await syncFolder(itemPath)
        } else if (item.endsWith('.sql')) {
            // Si es un archivo SQL, sincronizarlo
            console.log(`🔄 Sincronizando procedimiento: ${item}`)
            const sql = fs.readFileSync(itemPath, 'utf-8')
            await executeSql(sql)
            console.log(`✅ ${item} sincronizado correctamente`)
        }
    }
}

// Obtener argumentos de la línea de comandos
const args = process.argv.slice(2)
const specificFile = args[0] || null
const specificFolder = args[1] || null

// Ejecutar la sincronización
syncProcedures(specificFile, specificFolder).catch(error => {
    console.error('❌ Error fatal:', error.message)
    process.exit(1)
}) 