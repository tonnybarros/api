'use strict'
const { validateAll } = use('Validator')
const User = use('App/Models/User')

class AuthController {

  async signup({ request, response }) {

    const data = request.only(['name', 'username', 'email', 'phone', 'password'])
    const user = await User.create(data)
    return user

  }

  async login({ request, auth }) {

    const { username, password } = request.all()
    const token = await auth.attempt(username, password)
    return { token }
  }

  async logout({ request, auth, response }) {

    try {
      await auth.check()
      const token = auth.getAuthHeader()
      return await auth.authenticator('jwt').revokeTokens([token], true)
    } catch (err) {
      response
        .status(400)
        .json({ type: 'error', message: err })
    }

  }

}

module.exports = AuthController
