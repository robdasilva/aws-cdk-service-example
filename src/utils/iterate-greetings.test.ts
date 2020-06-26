import iterateGreetings from './iterate-greetings'

describe('hello-world', () => {
  it('yields a greeting message once', async () => {
    const iterable = iterateGreetings()

    await expect(iterable.next()).resolves.toStrictEqual({
      done: false,
      value: 'Hello World!',
    })

    await expect(iterable.next()).resolves.toStrictEqual({
      done: true,
      value: undefined,
    })
  })
})
