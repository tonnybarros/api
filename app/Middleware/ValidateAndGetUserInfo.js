'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const UserTenant = use('App/Models/UserTenant')
const Cache = use('Cache')

class ValidateAndGetUserInfo {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, request, response }, next) {

    const token = request.header('Authorization')
    const key = token.slice(7, 20)
    const user_info = await Cache.get(key)

    if (user_info != null) {
      request.user = user_info.user
      request.tenant = user_info.tenant
      request.role = user_info.role
      await next()
      return
    }

    // Get the authenticated user
    const user = await auth.getUser()
    const tenant_id = request.header('x_tenant_id')

    let user_tenant = await UserTenant.query().where('tenant_id', '=', tenant_id)
      .where('user_id', '=', user.id)
      .with('role')
      .with('tenant')
      .limit(1)
      .fetch()

    user_tenant = user_tenant.toJSON()

    if (user_tenant[0] == undefined) {
      return response
        .status(401)
        .send([{ "message": "User is not assigned" }])
    }

    // cache user info for 10 minutes
    await Cache.put(key, JSON.stringify({ user: user, tenant: user_tenant[0].tenant, role: user_tenant[0].role }), 10) // 10 minutes

    request.user = user
    request.tenant = user_tenant[0].tenant
    request.role = user_tenant[0].role
    await next()
  }

}

module.exports = ValidateAndGetUserInfo
