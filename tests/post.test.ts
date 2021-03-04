import { createTestClient } from 'apollo-server-testing'

import { server } from '../src/app'
import { ADD_POST, POSTS } from './queries'

const { query, mutate } = createTestClient(server)

const post = {
  title: 'Testing is really fun'
}

test('mutation addPost', async () => {
  const { data } = await mutate({ mutation: ADD_POST, variables: post })
  expect(data.addPost).toBeTruthy()
})

test('query posts', async () => {
  const { data } = await query({ query: POSTS })
  expect(data.posts).toEqual([{ title: post.title, body: null }])
})
