/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.sql`
      CREATE TABLE IF NOT EXISTS messages
      (
          id          SERIAL PRIMARY KEY,
          message     TEXT NOT NULL,
          sender_id   INT  NOT NULL REFERENCES users (id),
          receiver_id INT  NOT NULL REFERENCES users (id)
      )
  `
}

exports.down = pgm => {
  pgm.sql`
      DROP TABLE IF EXISTS messages
  `
}
