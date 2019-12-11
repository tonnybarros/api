const { test, trait } = use('Test/Suite')('Authentication')
const suite = use('Test/Suite')('Authentication')

const User = use('App/Models/User')

suite.before(() => {
    
    const user = User.create({
        name: 'Ramon',
        username: 'ramon.silva',
        email: 'teste@test.com',
        password: '123456'
    })

})

trait('Test/ApiClient')
trait('Auth/Client')

test('It should return JWT token when authenticate', async ({ assert, client }) => {

    const response = await client.post('/login')
        .header('accept', 'application/json')
        .send({ username: 'ramon.silva', password: '123456' })
        .end()

    response.assertStatus(200)
    assert.exists(response.body.token)
})


test('It should revoke user\'s JWT token', async ({ assert, client }) => {

    const login_response = await client.post('/login')
        .header('accept', 'application/json')
        .send({ username: 'ramon.silva', password: '123456' })
        .end()

    const response = await client.post('/logout')
        .header('accept', 'application/json')
        .header('Authorization', login_response.body.token)
        .end()

    response.assertStatus(200)
})
