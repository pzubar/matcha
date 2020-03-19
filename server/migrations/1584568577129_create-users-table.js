/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createExtension('citext', {ifNotExists: true})
  pgm.sql`
      CREATE TABLE IF NOT EXISTS users
      (
          id        SERIAL PRIMARY KEY,
          name      VARCHAR(255)                        NOT NULL,
          createdAt TIMESTAMP DEFAULT current_timestamp NOT NULL,
          email     citext UNIQUE                       NOT NULL
      )
  `
}

exports.down = pgm => {
  pgm.dropTable('users', { ifExists: true })
}
