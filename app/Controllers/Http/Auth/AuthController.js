'use strict'
const { validateAll } = use('Validator')
const User = use('App/Models/User')

class AuthController {

  async signup({ request, response }) {

    const data = request.only(['name', 'username', 'email', 'phone', 'password'])
    const user = await User.create(data)
    return user

  }

  async login({ request, auth, response }) {

    const { username, password } = request.all()
    try {

      const result = await auth.withRefreshToken().attempt(username, password)
      return { token: result.token, refresh_token: result.refreshToken }

    } catch (err) {
      response
        .status(400)
        .json({ type: 'error', message: err })
    }
  }

  async logout({ request, auth, response }) {

    try {
      
      const refresh_token = request.only('refresh_token')

      await auth.authenticator('jwt').revokeTokens([refresh_token])
      return response.status(200).send()
    } catch (err) {
      response
        .status(400)
        .json({ type: 'error', message: err })
    }

  }

}

module.exports = AuthController
