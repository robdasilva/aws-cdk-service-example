import { Runtime } from '@aws-cdk/aws-lambda'
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs'
import { Duration } from '@aws-cdk/core'
// import { greetingsTable } from '../resources/table'
import { stack, stage } from '../stack'

const functionName =
  stack.stackName + '-http-get-greeting' + (stage === 'prod' ? '' : `-${stage}`)

export const getGreeting = new NodejsFunction(
  stack,
  'BlueprintServiceDeleteComment',
  {
    bundling: {
      sourceMap: true,
    },
    entry: 'src/http/get-greeting.ts',
    // environment: {
    //   DDB_TABLE_NAME: greetingsTable.tableName,
    // },
    functionName,
    handler: 'index.default',
    logRetention: 7,
    memorySize: 128,
    runtime: Runtime.NODEJS_12_X,
    timeout: Duration.seconds(30),
  }
)
