import { Pool, QueryConfig } from 'pg'
import * as Knex from 'knex'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.DATABASE_URL_LOCAL,
  ssl: !!process.env.DATABASE_URL
})

export const query = async (text: string | QueryConfig, values?: any) => {
  const start = Date.now()
  const result = await pool.query(text, values)
  const duration = Date.now() - start

  console.log('executed query', { text, duration, rows: result.rowCount })
  return result
}

export type Database<T> = Knex<T>

console.log("process.env.DATABASE_URL_LOCAL", process.env.DATABASE_URL_LOCAL)

const database = (connection) => Knex({
  client: 'pg',
  connection,
  searchPath: ['knex', 'public']
})

export default database
