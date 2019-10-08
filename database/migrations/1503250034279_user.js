'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {

    this.create('tenants', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('city', 80)
      table.string('state', 50)
      table.string('zip_code', 15)
      table.string('logo', 254)
      table.boolean('status').notNullable().defaultTo(1)
      table.timestamps()
    })

    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('phone', 20).notNullable()
      table.string('password', 80).notNullable()
      table.boolean('status').notNullable().defaultTo(1)
      table.timestamps()
    })

    this.create('roles', (table) => {
      table.increments()
      table.string('role', 80).notNullable().unique()
      table.text('permissions')
      table.boolean('status').notNullable().defaultTo(1)
      table.integer('tenant_id').unsigned().references('id').inTable('tenants')
      table.timestamps()
    })

    this.create('users_tenants', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('tenant_id').unsigned().references('id').inTable('tenants')
      table.integer('role_id').unsigned().references('id').inTable('roles')
      table.boolean('status').notNullable().defaultTo(1)
      table.boolean('default_tenant').notNullable().defaultTo(1)
      table.timestamps()
    })
  }

  down() {
    this.drop('users_tenants')
    this.drop('users')
    this.drop('roles')
    this.drop('tenants')
  }
}

module.exports = UserSchema
