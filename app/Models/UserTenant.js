'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserTenant extends Model {

  static get table() {
    return 'users_tenants'
  }

  role() {
    return this.hasOne('App/Models/Role', 'role_id', 'id')
  }

  tenant() {
    return this.hasOne('App/Models/Tenant', 'tenant_id', 'id')
  }

  user() {
    return this.hasOne('App/Models/User', 'user_id', 'id')
  }
}

module.exports = UserTenant
