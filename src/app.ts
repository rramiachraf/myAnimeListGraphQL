import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import session from 'express-session'
import redis from 'redis'
import connectRedis from 'connect-redis'
import { nanoid } from 'nanoid'
import { RedisCache } from 'apollo-server-cache-redis'

import { MyAnimeListAPI } from './dataSource'
import { corsOrigin, sessionSecret } from './env'
import { schema } from './graphql/schema'

const redisClient = redis.createClient()
const RedisStore = connectRedis(session)

export const app = express()

app.use(
  session({
    secret: sessionSecret,
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
    genid: () => nanoid(),
    cookie: {
      maxAge: 2_678_400_000 // 31 Days
    }
  })
)

export const server = new ApolloServer({
  schema,
  context: ({ req: { session } }) => ({ session }),
  dataSources: () => ({ MAL_API: new MyAnimeListAPI() }),
  playground: { settings: { 'request.credentials': 'include' } },
  cache: new RedisCache({ host: 'localhost' })
})

server.applyMiddleware({
  app,
  path: '/api',
  cors: { origin: corsOrigin, credentials: true }
})
