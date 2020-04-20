import * as Knex from 'knex'
import { DATABASE_CONNECTION } from '@shared/constants'

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: () => {
      console.log('DATABASE_CONNECTION', process.env.DATABASE_URL_LOCAL)
      return Knex({
        client: 'pg',
        connection: process.env.DATABASE_URL_LOCAL,
        searchPath: ['knex', 'public']
      })
    }
  }
]
