import { SessionData } from 'express-session'

declare module 'express-session' {
  export interface SessionData extends SessionData {
    accessToken: string
    refreshToken: string
  }
}
