import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'
import { stringify as qsStringify } from 'qs'

const getNodes = (nodes: any) => {
  return nodes.map(({ node }: any) => node)
}

export class MyAnimeListAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.myanimelist.net/v2'
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set(
      'Authorization',
      'Bearer ' + this.context.session.accessToken
    )
  }

  // User

  async getToken(body: string) {
    try {
      const data = await this.post(
        'https://myanimelist.net/v1/oauth2/token',
        {},
        {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          body
        }
      )
      this.context.session.accessToken = data.access_token
      this.context.session.refreshToken = data.refresh_token

      return true
    } catch (e) {
      return false
    }
  }

  async getMe() {
    const data = await this.get('/users/@me')
    return data
  }

  // Anime

  async getAnimeList(status: string) {
    const params = qsStringify({ status, limit: 10 })
    const { data } = await this.get(`/users/@me/animelist?${params}`)
    return getNodes(data)
  }

  async searchAnime(query: string) {
    const data = await this.get(`/anime?q=${query}`)
    return data
  }

  async getAnimeById(animeID: number, fields: string) {
    const params = qsStringify({ fields })
    const data = await this.get(`/anime/${animeID}?${params}`)
    return data
  }

  async updateAnimeStatus(animeID: number, status: string) {
    try {
      await this.patch(
        `/anime/${animeID}/my_list_status`,
        {},
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          body: qsStringify({ status })
        }
      )

      return true
    } catch (e) {
      return false
    }
  }

  async updateAnimeEpisodes(animeID: number, watchedEpisodes: number) {
    try {
      await this.patch(
        `/anime/${animeID}/my_list_status`,
        {},
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          body: qsStringify({ num_watched_episodes: watchedEpisodes })
        }
      )
      return true
    } catch (e) {
      return false
    }
  }

  // Manga

  async getMangaList(status: string) {
    const params = qsStringify({ status, limit: 10 })
    const { data } = await this.get(`/users/@me/mangalist?${params}`)
    return getNodes(data)
  }

  async getMangaById(mangaID: number, fields: string) {
    const params = qsStringify({ fields })
    const data = await this.get(`/manga/${mangaID}?${params}`)
    return {
      ...data,
      authors:
        data.authors &&
        data.authors.map(({ node, role }: any) => ({
          ...node,
          role
        }))
    }
  }

  async updateMangaStatus(mangaID: number, status: string) {
    try {
      await this.patch(
        `/manga/${mangaID}/my_list_status`,
        {},
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          body: qsStringify({ status })
        }
      )
      return true
    } catch (e) {
      return false
    }
  }
}
