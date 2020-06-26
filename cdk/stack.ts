import { App, Stack } from '@aws-cdk/core'
import { name } from '../package.json'

export const { region = undefined, stage = 'dev' } = process.env
  .CDK_CONTEXT_JSON
  ? JSON.parse(process.env.CDK_CONTEXT_JSON)
  : {}

export const app = new App()
export const stack = new Stack(app, 'BlueprintServiceStack', {
  env: { region },
  stackName: name + (stage === 'prod' ? '' : `-${stage}`),
})
