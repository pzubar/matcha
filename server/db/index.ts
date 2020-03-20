import { Pool, QueryConfig } from 'pg'

const pool = new Pool()

export const query = async (text: string | QueryConfig, values?: any) => {
  const start = Date.now()
  const result = await pool.query(text, values);
  const duration = Date.now() - start

  console.log('executed query', { text, duration, rows: result.rowCount })
  return result;
}
