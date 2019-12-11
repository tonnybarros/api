const { test, trait } = use('Test/Suite')('Authentication')

trait('Test/ApiClient')
trait('Auth/Client')

const User = use('App/Models/User')

test('It should return JWT token when authenticate', async ({ client, assert }) => {

    await User.create({
        name: 'Ramon',
        username: 'ramon',
        email: 'teste@test.com',
        password: '123456'
    })

    const response = await client.post('/login')
        .header('accept', 'application/json')
        .send({ username: 'ramon', password: '123456' })
        .end()

    response.assertStatus(200)
    assert.exists(response.body.token)
}).timeout(0)


test('It should revoke user\'s JWT token when passing refresh token', async ({ assert, client }) => {

    const login_response = await client.post('/login')
        .send({ username: 'ramon', password: '123456' })
        .header('accept', 'application/json')
        .end()

    const response = await client.post('/logout')
        .header('accept', 'application/json')
        .send({refresh_token: login_response.body.refresh_token})
        .end()

    response.assertStatus(200)
}).timeout(0)
