/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createExtension('postgis', { ifNotExists: true })
  pgm.createExtension('postgis_topology', { ifNotExists: true })
}

exports.down = pgm => {
  pgm.dropExtension('postgis', { ifExists: true })
  pgm.dropExtension('postgis_topology', { ifExists: true })
}
