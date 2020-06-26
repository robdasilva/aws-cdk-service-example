import { LambdaIntegration } from '@aws-cdk/aws-apigateway'
import { getGreeting } from './functions/http'
import { restApi } from './resources/api'
// import { greetingsTable } from './resources/table'
import { app } from './stack'

const greetings = restApi.root.addResource('greetings')

greetings.addMethod('GET', new LambdaIntegration(getGreeting))

// greetingsTable.grantReadData(getGreeting)

app.synth()
