import { makeSchema } from '@nexus/schema'
import { join } from 'path'

import * as typDefs from './definitions/index'

export const schema = makeSchema({
  types: [typDefs],
  outputs: {
    schema: join(__dirname, 'generated', 'schema.graphql'),
    typegen: join(__dirname, 'generated', 'typeGen.ts')
  },
  typegenAutoConfig: {
    sources: [{ source: join(__dirname, 'types.ts'), alias: 'ContextModule' }],
    contextType: 'ContextModule.Context'
  }
})
