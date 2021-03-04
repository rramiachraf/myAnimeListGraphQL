import {
  enumType,
  arg,
  queryField,
  objectType,
  intArg,
  mutationField
} from '@nexus/schema'
import { getSelections } from '../getSelections'

export const Manga = objectType({
  name: 'Manga',
  definition(t) {
    t.id('id', { nullable: false })
    t.string('title', { nullable: false })
    t.field('main_picture', { type: 'Picture', nullable: false })
    t.string('media_type')
    t.int('num_chapters')
    t.string('status')
    t.float('mean')
    t.field('genres', { list: true, type: 'Genre' })
    t.string('synopsis')
    t.int('rank')
    t.int('num_scoring_users')
    t.int('num_list_users')
    t.int('popularity')
    t.int('num_volumes')
    t.field('authors', { list: true, type: 'Author' })
    t.date('start_date')
    t.date('end_date')
  }
})

export const Author = objectType({
  name: 'Author',
  definition(t) {
    t.id('id')
    t.string('first_name')
    t.string('last_name')
    t.string('role')
  }
})

export const MangaStatus = enumType({
  name: 'MangaStatus',
  members: [
    { name: 'reading', value: 'reading' },
    { name: 'completed', value: 'completed' },
    { name: 'onHold', value: 'on_hold' },
    { name: 'dropped', value: 'dropped' },
    { name: 'planToRead', value: 'plan_to_read' }
  ]
})

export const getMangaList = queryField('getMangaList', {
  type: 'Manga',
  args: { status: arg({ type: MangaStatus, required: true }) },
  list: true,
  resolve(_, { status }, { dataSources: { MAL_API } }) {
    return MAL_API.getMangaList(status)
  }
})

export const manga = queryField('manga', {
  type: 'Manga',
  args: { mangaID: intArg({ required: true }) },
  resolve(_, { mangaID }, { dataSources: { MAL_API } }, infos) {
    return MAL_API.getMangaById(mangaID, getSelections(infos))
  }
})

export const updateMangaStatus = mutationField('updateMangaStatus', {
  type: 'Boolean',
  args: {
    mangaID: intArg({ required: true }),
    status: arg({ type: 'MangaStatus', required: true })
  },
  resolve(_, { mangaID, status }, { dataSources: { MAL_API } }) {
    return MAL_API.updateMangaStatus(mangaID, status)
  }
})
