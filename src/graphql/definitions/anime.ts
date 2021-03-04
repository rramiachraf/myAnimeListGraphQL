import {
  arg,
  enumType,
  intArg,
  mutationField,
  objectType,
  queryField
} from '@nexus/schema'
import { getSelections } from '../getSelections'

export const Anime = objectType({
  name: 'Anime',
  definition(t) {
    t.id('id', { nullable: false })
    t.string('title', { nullable: false })
    t.field('main_picture', { type: 'Picture', nullable: false })
    t.string('synopsis')
    t.float('mean')
    t.int('num_episodes')
    t.string('media_type')
    t.string('status')
    t.field('genres', { type: 'Genre', list: true })
    t.int('rank')
    t.int('num_scoring_users')
    t.int('num_list_users')
    t.int('popularity')
    t.date('start_date')
    t.date('end_date')
    t.string('source')
    t.field('studios', { list: true, type: 'Studio' })
    t.field('my_list_status', { type: 'MyListStatusAnime' })
  }
})

export const MyListStatusAnime = objectType({
  name: 'MyListStatusAnime',
  definition(t) {
    t.field('status', { type: 'AnimeStatus' })
    t.float('score')
    t.int('num_episodes_watched')
    t.boolean('is_rewatching')
    t.dateTime('updated_at')
  }
})

export const Studio = objectType({
  name: 'Studio',
  definition(t) {
    t.id('id')
    t.string('name')
  }
})

export const AnimeStatus = enumType({
  name: 'AnimeStatus',
  members: [
    { name: 'watching', value: 'watching' },
    { name: 'completed', value: 'completed' },
    { name: 'onHold', value: 'on_hold' },
    { name: 'dropped', value: 'dropped' },
    { name: 'planToWatch', value: 'plan_to_watch' }
  ]
})

export const getAnimeList = queryField('getAnimeList', {
  type: 'Anime',
  args: { status: arg({ type: AnimeStatus, required: true }) },
  list: true,
  resolve(_, { status }, { dataSources: { MAL_API } }) {
    return MAL_API.getAnimeList(status)
  }
})

export const anime = queryField('anime', {
  type: 'Anime',
  args: { animeID: intArg({ required: true }) },
  resolve(_, { animeID }, { dataSources: { MAL_API } }, infos) {
    return MAL_API.getAnimeById(animeID, getSelections(infos))
  }
})

export const updateAnimeStatus = mutationField('updateAnimeStatus', {
  type: 'Boolean',
  args: {
    animeID: intArg({ required: true }),
    status: arg({ required: true, type: 'AnimeStatus' })
  },
  resolve(_, { animeID, status }, { dataSources: { MAL_API } }) {
    return MAL_API.updateAnimeStatus(animeID, status)
  }
})

export const updateAnimeEpisodes = mutationField('updateAnimeEpisodes', {
  type: 'Boolean',
  args: {
    animeID: intArg({ required: true }),
    watchedEpisodes: intArg({ required: true })
  },
  resolve(_, { animeID, watchedEpisodes }, { dataSources: { MAL_API } }) {
    return MAL_API.updateAnimeEpisodes(animeID, watchedEpisodes)
  }
})
