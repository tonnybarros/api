const Suite = use('Test/Suite')('Customer')

Suite.trait('Test/ApiClient')
Suite.trait('Auth/Client')
const User = use('App/Models/User')
const Tenant = use('App/Models/Tenant')
const UserTenant = use('App/Models/UserTenant')
const Role = use('App/Models/Role')

Suite.before(async () => {

  await Tenant.create({
    id: 1,
    name: 'Tenant 1'
  })

  await Role.create({
    id: 1,
    role: 'Role 1'
  })

  await UserTenant.create({
    role_id: 1,
    tenant_id: 1,
    user_id: 1
  })

})

Suite.test('Cannot create a customer if not authenticated', async ({ assert, client }) => {

  const response = await client.post('/api/v1/customer')
    .accept('json')
    .send({ name: 'Customer test' })
    .end()

  response.assertStatus(401)

}).timeout(0)

Suite.test('Cannot create a customer to a tenant where user is not related', async ({ assert, client }) => {

  const user = await User.find(1)

  const response = await client.post('/api/v1/customer')
    .accept('json')
    .loginVia(user, 'jwt')
    .header('X_TENANT_ID', 2)
    .send({ name: 'Customer test' })
    .end()

  response.assertStatus(401)

}).timeout(0)

Suite.test('It should create a customer if authenticated', async ({ assert, client }) => {

  const user = await User.find(1)

  const response = await client.post('/api/v1/customer')
    .accept('json')
    .loginVia(user, 'jwt')
    .header('X_TENANT_ID', 1)
    .send({ name: 'Customer test' })
    .end()

  response.assertStatus(200)
  assert.equal(response.body.name, 'Customer test')

}).timeout(0)

Suite.test('It should be able to retriave a customer', async ({ assert, client }) => {

  const user = await User.find(1)

  const response = await client.get('/api/v1/customer/1')
    .accept('json')
    .loginVia(user, 'jwt')
    .header('X_TENANT_ID', 1)
    .end()

  response.assertStatus(200)
  assert.equal(response.body.name, 'Customer test')

}).timeout(0)

Suite.test('It should be able to update a customer', async ({ assert, client }) => {

  const user = await User.find(1)

  const response = await client.put('/api/v1/customer/1')
    .accept('json')
    .loginVia(user, 'jwt')
    .header('X_TENANT_ID', 1)
    .send({ name: 'Customer updated' })
    .end()

  response.assertStatus(200)
  assert.equal(response.body.name, 'Customer updated')

}).timeout(0)

Suite.test('It should be able to delete a customer', async ({ assert, client }) => {

  const user = await User.find(1)

  const response = await client.delete('/api/v1/customer/1')
    .accept('json')
    .loginVia(user, 'jwt')
    .header('X_TENANT_ID', 1)
    .end()

  response.assertStatus(200)

}).timeout(0)