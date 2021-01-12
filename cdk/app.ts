import { App } from '@aws-cdk/core'
import { name } from '../package.json'
import BlueprintStack from './stack'

const app = new App()
const region = app.node.tryGetContext('region')
const stage = app.node.tryGetContext('stage') || 'dev'

new BlueprintStack(app, 'BlueprintService', {
  env: { region },
  stackName: name + (stage === 'prod' ? '' : `-${stage}`),
  stage,
})

app.synth()
