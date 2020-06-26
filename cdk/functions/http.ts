import { Code, Function, Runtime } from '@aws-cdk/aws-lambda'
import { Duration } from '@aws-cdk/core'
// import { greetingsTable } from '../resources/table'
import { stack, stage } from '../stack'

const functionName =
  stack.stackName + '-http-get-greeting' + (stage === 'prod' ? '' : `-${stage}`)

export const getGreeting = new Function(
  stack,
  'BlueprintServiceDeleteComment',
  {
    code: Code.fromAsset('./dist/http/get-greeting'),
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
