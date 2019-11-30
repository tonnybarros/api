'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const UserTenant = use('App/Models/UserTenant')

class GetUserInfo {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, request, response }, next) {
    // call next to advance the request

    // // Get the authenticated user
    const user = await auth.getUser()
    const tenant_id = request.headers().x_tenant_id

    let user_tenant = await UserTenant.query()
                                      .where('tenant_id', '=', tenant_id)
                                      .where('user_id', '=', user.id)
                                      .with('role')
                                      .with('tenant')
                                      .limit(1)
                                      .fetch()
    
    user_tenant = user_tenant.toJSON()

    if(user_tenant[0] == undefined){
      return response
          .status(401)
          .send([{"message": "User is not assigned"}])
    }

    request.user = user
    request.tenant = user_tenant[0].tenant
    request.role = user_tenant[0].role
    await next()
  }

}

module.exports = GetUserInfo
