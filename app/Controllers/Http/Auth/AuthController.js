'use strict'

class AuthController {

  async signup({ request, response, session }) {

    const data = request.only(['name', 'username', 'email', 'phone', 'password'])
    const user = await User.create(data)
    return user

  }

  async login({ request }) {

    const { username, password } = request.all()
    const token = await auth.attempt(username, password)
    return token

  }

  async logout({ request, response }) {

    const user = await User.find(1)
    await auth
      .authenticator('jwt')
      .revokeTokensForUser(user)

    response.status(200).send()

  }

}

module.exports = AuthController
