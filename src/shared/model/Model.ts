import { Database } from '@db'
import * as snakecaseKeys from 'snakecase-keys'

export default class Model<T> {
  protected table: string

  protected database: Database<T>

  constructor(database, table) {
    this.table = table
    this.database = database
  }

  all() {
    return this.database(this.table).select()
  }

  find(conditions) {
    return this.database(this.table)
      .where(conditions)
      .select()
  }

  findOne(conditions) {
    return this.database(this.table)
      .where(conditions)
      .first()
  }

  findById(id) {
    return (
      this.database(this.table)
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        .where({ id })
        .select()
        .first()
    )
  }

  insert(values) {
    return this.database(this.table).insert(snakecaseKeys(values))
  }
}
