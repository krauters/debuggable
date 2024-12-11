import { log } from '@krauters/logger'

// eslint-disable-next-line @typescript-eslint/naming-convention
log.updateInstance({ configOptions: { ENVIRONMENT_PREFIX: 'DEBUGGABLE_', LOG_PREFIX: '[DEBUGGABLE] ' } })

export * from './decorators'
export * from './duration-tracker'
export type * from './structures'
export * from './utils'
