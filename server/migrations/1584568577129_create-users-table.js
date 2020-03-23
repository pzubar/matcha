/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createExtension('citext', { ifNotExists: true })
  pgm.sql`CREATE TYPE gender AS ENUM ('male', 'female', 'other');`
  pgm.sql`
      CREATE TABLE IF NOT EXISTS users
      (
          id        SERIAL PRIMARY KEY,
          name      VARCHAR(255)                        NOT NULL,
          createdAt TIMESTAMP DEFAULT current_timestamp NOT NULL,
          email     citext UNIQUE                       NOT NULL,
          gender    gender,
          birthday  date
      )
  `
}

exports.down = pgm => {
  pgm.dropType('gender', { ifExists: true })
  pgm.dropTable('users', { ifExists: true })
}
