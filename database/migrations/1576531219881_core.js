'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CoreSchema extends Schema {
  up() {

    this.create('logs', (table) => {
      table.increments()
      table.string('activity', 200).notNullable()
      table.string('user', 50).notNullable()
      table.string('ip', 15).notNullable()
      table.integer('tenant_id').unsigned().references('id').inTable('tenants')
      table.timestamps()
    })

    this.create('settings', (table) => {
      table.increments()
      table.string('setting', 50).notNullable()
      table.string('value', 50).notNullable()
      table.string('description', 150).notNullable()
      table.integer('tenant_id').unsigned().references('id').inTable('tenants')
      table.timestamps()
    })

  }

  down() {
    this.drop('logs')
    this.drop('settings')
  }
}

module.exports = CoreSchema
