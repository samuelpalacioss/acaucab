/* db.ts ------------------------------------------------------------- */
import { Pool, types } from 'pg'
import format from 'pg-format'          //  npm i pg-format

/* ------------------------------------------------------------------ */
/* 1️⃣  Parsers: convierte los tipos problemáticos a number            */
/* ------------------------------------------------------------------ */
// NUMERIC / DECIMAL (OID 1700)
types.setTypeParser(1700, (v: string) => parseFloat(v))

// BIGINT            (OID 20)
types.setTypeParser(20, (v: string) => {
  // ⚠️ Number.MAX_SAFE_INTEGER = 9 007 199 254 740 991
  const n = Number(v)
  if (n > Number.MAX_SAFE_INTEGER) {
    throw new RangeError(
      `BIGINT fuera de rango JS: ${v}. Usa BigInt o Decimal.js.`
    )
  }
  return n
})

// MONEY (OID 790) – saca símbolos y separadores de miles
types.setTypeParser(790, (v: string) =>
  parseFloat(v.replace(/[^0-9.-]+/g, ''))
)

/* ------------------------------------------------------------------ */
/* 2️⃣  Pool de conexiones                                             */
/* ------------------------------------------------------------------ */
export const pool = new Pool({
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  user: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'postgres',
  database: process.env.POSTGRES_DATABASE ?? 'acaucab',
  max: 20,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 2_000,
})

/* ------------------------------------------------------------------ */
/* 3️⃣  Ejecuta funciones PL/pgSQL como antes hacías con supabase.rpc  */
/* ------------------------------------------------------------------ */
export async function ejecutarFuncionPostgres<T = unknown>(
  nombreFuncion: string,
  parametros: Record<string, unknown> = {},
): Promise<T[]> {
  // 👉 evita SQL-Injection en el identificador usando pg-format
  const funcIdent = format.ident(nombreFuncion)

  // orden reproducible de los parámetros
  const values = Object.values(parametros)
  const placeholders = values.map((_, i) => `$${i + 1}`).join(', ')

  // si no hay argumentos genera “SELECT * FROM fn()”
  const query =
    values.length === 0
      ? `SELECT * FROM ${funcIdent}()`
      : `SELECT * FROM ${funcIdent}(${placeholders})`

  const client = await pool.connect()
  try {
    const { rows } = await client.query(query, values)
    return rows
  } catch (err) {
    console.error(`❌ Error en ${nombreFuncion}:`, err)
    throw err
  } finally {
    client.release()
  }
}
