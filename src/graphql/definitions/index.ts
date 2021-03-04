import { asNexusMethod, mutationField, objectType, queryField, stringArg } from '@nexus/schema'
import pkceChallenge from 'pkce-challenge'
import { stringify as qsStringify } from 'qs'
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'

import { client_id, client_secret } from '../../env'

export const GQLDate = asNexusMethod(GraphQLDate, 'date')
export const GQLDateTime = asNexusMethod(GraphQLDateTime, 'dateTime')

const { code_verifier } = pkceChallenge()

export const Picture = objectType({
  name: 'Picture',
  definition(t) {
    t.string('medium')
    t.string('large')
  }
})

export const Genre = objectType({
  name: 'Genre',
  definition(t) {
    t.id('id')
    t.string('name')
  }
})

export const getOauthLink = queryField('getOauthLink', {
  type: 'String',
  resolve() {
    const qsParams = qsStringify({
      response_type: 'code',
      client_id,
      code_challenge: code_verifier,
      state: 'RequestID42'
    })

    const url = `https://myanimelist.net/v1/oauth2/authorize?${qsParams}`

    return url
  }
})

export const getToken = mutationField('getToken', {
  type: 'Boolean',
  args: { code: stringArg({ required: true }) },
  resolve(_, { code }, { dataSources: { MAL_API } }) {
    const body = qsStringify({
      client_id,
      client_secret,
      code,
      code_verifier,
      grant_type: 'authorization_code'
    })

    return MAL_API.getToken(body)
  }
})

export * as user from './user'
export * as anime from './anime'
export * as manga from './manga'
