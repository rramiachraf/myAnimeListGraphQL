import { createTestClient } from 'apollo-server-testing'

import { server } from '../src/app'
import { CREATE_ACCOUNT, ME, LOGIN } from './queries'

const { query, mutate } = createTestClient(server)

const user = {
  username: 'luke',
  email: 'luke@example.com',
  password: 'password'
}

test('createAccount mutation', async () => {
  const { data } = await mutate({
    mutation: CREATE_ACCOUNT,
    variables: user
  })
  expect(data.createAccount).toBeTruthy()
})

test('login mutation', async () => {
  const { username, password } = user
  const { data } = await mutate({
    mutation: LOGIN,
    variables: { username, password }
  })
  expect(data.login).toBeTruthy()
})

test('me query', async () => {
  const { username, email } = user
  const { data } = await query({ query: ME })
  expect(data.me).toEqual({ username, email })
})
