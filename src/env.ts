import 'dotenv/config'
import * as env from 'env-var'

export const client_id = env.get('CLIENT_ID').required().asString()
export const client_secret = env.get('CLIENT_SECRET').required().asString()
export const port = env.get('PORT').required().asPortNumber()
export const sessionSecret = env.get('SESSION_SECRET').required().asString()
export const corsOrigin = env.get('CORS_ORIGIN').asString()
