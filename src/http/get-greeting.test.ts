import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import httpEventNormalizer from '@middy/http-event-normalizer'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import iterateGreetings from '../utils/iterate-greetings'
import log from '../utils/middleware/log'
import handler from './get-greeting'

jest.mock('@middy/core', () =>
  jest.fn(() => ({ use: jest.fn().mockReturnThis() }))
)
jest.mock('@middy/http-error-handler')
jest.mock('@middy/http-event-normalizer')
jest.mock('@middy/http-header-normalizer')
jest.mock('../utils/middleware/log')
jest.mock('../utils/iterate-greetings')

describe('getGreeting', () => {
  const getGreeting = (middy as jest.Mock).mock.calls[0][0]

  beforeAll(() => {
    jest.spyOn(JSON, 'stringify')
  })

  afterAll(() => {
    ;(JSON.stringify as jest.Mock).mockRestore()
  })

  afterEach(() => {
    ;(middy as jest.Mock).mockClear()
    ;(httpErrorHandler as jest.Mock).mockClear()
    ;(httpEventNormalizer as jest.Mock).mockClear()
    ;(httpHeaderNormalizer as jest.Mock).mockClear()
    ;(log as jest.Mock).mockClear()
    ;(iterateGreetings as jest.Mock).mockReset()
  })

  it('attaches required middlewares', () => {
    expect(middy).toHaveBeenCalledTimes(1)

    expect(handler).toBe((middy as jest.Mock).mock.results[0].value)

    expect(handler.use).toHaveBeenCalledTimes(4)
    expect(handler.use).toHaveBeenNthCalledWith(
      1,
      (log as jest.Mock).mock.results[0].value
    )
    expect(handler.use).toHaveBeenNthCalledWith(
      2,
      (httpErrorHandler as jest.Mock).mock.results[0].value
    )
    expect(handler.use).toHaveBeenNthCalledWith(
      3,
      (httpEventNormalizer as jest.Mock).mock.results[0].value
    )
    expect(handler.use).toHaveBeenNthCalledWith(
      4,
      (httpHeaderNormalizer as jest.Mock).mock.results[0].value
    )
  })

  it('returns a greeting', async () => {
    const greeting = Symbol('greeting')
    const iterable = {
      next: jest
        .fn()
        .mockResolvedValueOnce({ done: false, value: greeting })
        .mockResolvedValueOnce({ done: true }),
      [Symbol.asyncIterator]: jest.fn().mockReturnThis(),
    }
    ;(iterateGreetings as jest.Mock).mockReturnValueOnce(iterable)

    const body = Symbol('body')
    ;(JSON.stringify as jest.Mock).mockReturnValueOnce(body)

    await expect(getGreeting()).resolves.toStrictEqual({
      body,
      statusCode: 200,
    })

    expect(JSON.stringify).toHaveBeenCalledTimes(1)
    expect(JSON.stringify).toHaveBeenCalledWith(greeting)
  })
})
