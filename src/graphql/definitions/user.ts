import { objectType, queryField } from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('name')
    t.string('location')
    t.dateTime('joined_at')
    t.string('picture')
  }
})

export const me = queryField('me', {
  type: 'User',
  resolve(_, __, { dataSources: {MAL_API} }) {
    return MAL_API.getMe()
  }
})