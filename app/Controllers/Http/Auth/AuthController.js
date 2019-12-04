'use strict'
const { validateAll } = use('Validator')
const User = use('App/Models/User')

class AuthController {

  async signup({ request, response }) {

    const rules = {
      name: 'required',
      username: 'required|unique:users,username',
      email: 'required|email|unique:users,email',
      password: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return response
        .status(400)
        .send(validation.messages())
    }

    const data = request.only(['name', 'username', 'email', 'phone', 'password'])
    const user = await User.create(data)
    return user

  }

  async login({ request, auth }) {

    const rules = {
      username: 'required',
      password: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return response
        .status(400)
        .send(validation.messages())
    }

    const { username, password } = request.all()
    const token = await auth.attempt(username, password)
    return token

  }

  async logout({ request, response }) {

    const user = await User.find(1)
    await auth
      .authenticator('jwt')
      .revokeTokensForUser(user)

    return response.status(200).send()

  }

}

module.exports = AuthController
