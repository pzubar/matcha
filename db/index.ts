import { Pool, QueryConfig } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.DATABASE_URL_LOCAL,
  ssl: !!process.env.DATABASE_URL,
})

export const query = async (text: string | QueryConfig, values?: any) => {
  const start = Date.now()
  const result = await pool.query(text, values);
  const duration = Date.now() - start

  console.log('executed query', { text, duration, rows: result.rowCount })
  return result;
}
