'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonSchema extends Schema {
  up() {

    this.create('persons', (table) => {
      table.increments()
      table.string('name', 250).notNullable()
      table.string('corporate_name', 250)
      table.enu('person_type', ['F', 'J']).defaultTo('F')
      table.string('document', 30)
      table.string('state_regist', 30)
      table.string('municipal_regist', 30)
      table.string('suframa_regist', 30)
      table.string('email', 250);
      table.string('phone', 20)
      table.string('celphone', 20)
      table.string('website', 120)
      table.boolean('customer').defaultTo(1)
      table.boolean('employee').defaultTo(0)
      table.boolean('shipping_company').defaultTo(0)
      table.boolean('fornecedor').defaultTo(0)
      table.boolean('provider').defaultTo(0)
      table.text('obs')
      table.boolean('status').defaultTo(1)
      table.integer('tenant_id').unsigned().references('id').inTable('tenants')
      table.timestamps()
    })

    this.create('addresses', (table) => {
      table.increments()
      table.string('zip_code', 12)
      table.string('street', 200).notNullable()
      table.string('number', 10).notNullable()
      table.string('complement', 50)
      table.string('district', 80)
      table.string('city', 80)
      table.string('state', 50)
      table.integer('addressable_id')
      table.string('addressable_type', 15)
      table.integer('tenant_id').unsigned().references('id').inTable('tenants')
      table.timestamps()
    })

    this.create('positions', (table) => {
      table.increments()
      table.string('position', 250).notNullable()
      table.integer('cbo')
      table.integer('tenant_id').unsigned().references('id').inTable('tenants')
      table.timestamps()
    })

    this.create('employees', (table) => {
      table.increments()
      table.decimal('salary', 15, 2)
      table.decimal('commission', 5, 2)
      table.boolean('status').defaultTo(1)
      table.integer('person_id').unsigned().references('id').inTable('persons')
      table.integer('position_id').unsigned().references('id').inTable('positions')
      table.integer('tenant_id').unsigned().references('id').inTable('tenants')
      table.timestamps()
    })

  }

  down() {
    this.drop('employees')
    this.drop('positions')
    this.drop('addresses')
    this.drop('persons')
  }
}

module.exports = PersonSchema
