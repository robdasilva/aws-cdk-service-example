import middy from '@middy/core'
import {
  clear as logClear,
  debug as logDebug,
  error as logError,
  tag,
  untag,
} from 'lesslog'

export default function log() {
  return {
    after({ response }: middy.HandlerLambda, next: middy.NextFunction) {
      logDebug('Response', { response })
      logClear()
      untag()
      next()
    },
    before({ context, event }: middy.HandlerLambda, next: middy.NextFunction) {
      tag(context.awsRequestId)
      logDebug('Request', { context, event })
      next()
    },
    onError({ error }: middy.HandlerLambda, next: middy.NextFunction) {
      if (error) {
        const { message, stack, ...details } = error

        logError(message, { error: { ...details, message, stack } })
        untag()

        next(error)
      } else {
        next()
      }
    },
  }
}
