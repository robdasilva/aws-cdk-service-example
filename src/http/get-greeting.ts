import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import httpEventNormalizer from '@middy/http-event-normalizer'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import log from 'middy-lesslog'
import 'source-map-support/register'
import iterateGreetings from '../utils/iterate-greetings'

async function main() {
  let message

  for await (const greeting of iterateGreetings()) {
    message = greeting
  }

  return {
    body: JSON.stringify(message),
    statusCode: 200,
  }
}

export default middy(main)
  .use(log())
  .use(httpErrorHandler())
  .use(httpEventNormalizer())
  .use(httpHeaderNormalizer())
