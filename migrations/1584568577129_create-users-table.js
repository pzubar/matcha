/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createExtension('citext', { ifNotExists: true })
  pgm.sql`CREATE TYPE gender AS ENUM ('male', 'female', 'other');`
  pgm.sql`CREATE TYPE sexual_preferences AS ENUM ('heterosexual', 'homosexual', 'bisexual', 'other');`
  pgm.sql`
      CREATE TABLE IF NOT EXISTS users
      (
          id          SERIAL PRIMARY KEY,
          username    VARCHAR(255) UNIQUE                          NOT NULL,
          first_name  VARCHAR(100)                                 NOT NULL,
          last_name   VARCHAR(100)                                 NOT NULL,
          created_at  TIMESTAMP          DEFAULT current_timestamp NOT NULL,
          email       citext UNIQUE                                NOT NULL,
          password    VARCHAR(255)                                 NOT NULL,
          gender      gender,
          birthday    DATE,
          is_verified BOOLEAN            DEFAULT FALSE,
          biography   TEXT,
          orientation sexual_preferences DEFAULT 'bisexual',
          fame_rating INT4
      )
  `
}

exports.down = pgm => {
  pgm.dropTable('users', { ifExists: true })
  pgm.dropType('gender', { ifExists: true })
  pgm.dropType('sexual_preferences', { ifExists: true })
}
