export default class Model<T> {
  private table: string

  private database: any

  constructor(table, database) {
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
    return this.database(this.table)
      .where({ id })
      .select()
      .first()
  }

  insert(values) {
    return this.database(this.table).insert(values)
  }
}
