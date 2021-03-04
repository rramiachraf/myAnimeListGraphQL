import { MyAnimeListAPI } from '../dataSource'

export interface Context {
  dataSources: {
    MAL_API: MyAnimeListAPI
  }
  session: Session
}

interface Session {
  accessToken: string
}
