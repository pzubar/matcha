/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.sql`
      ALTER TABLE users
          ADD COLUMN location GEOGRAPHY(POINT, 4326)
  `
}

exports.down = pgm => {
  pgm.sql`
      ALTER TABLE users
          DROP COLUMN IF EXISTS location
  `
}
