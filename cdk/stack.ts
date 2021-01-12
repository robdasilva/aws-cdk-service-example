import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway'
// import { AttributeType, BillingMode, Table } from '@aws-cdk/aws-dynamodb'
import { Runtime } from '@aws-cdk/aws-lambda'
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs'
import { App, Duration, Stack, StackProps } from '@aws-cdk/core'

interface IBlueprintStackProps extends StackProps {
  stage: string
}
export default class BlueprintStack extends Stack {
  constructor(app: App, id: string, { stage, ...props }: IBlueprintStackProps) {
    super(app, id, props)

    const restApiName = this.stackName + '-rest-api'
    const restApi = new RestApi(this, id + 'RestApi', {
      deployOptions: {
        stageName: stage,
      },
      endpointExportName: `${restApiName}-url`,
      restApiName,
    })

    const getGreeting = new NodejsFunction(this, id + 'DeleteComment', {
      bundling: {
        sourceMap: true,
      },
      entry: 'src/http/get-greeting.ts',
      // environment: {
      //   DDB_TABLE_NAME: greetingsTable.tableName,
      // },
      functionName: this.stackName + '-http-get-greeting',
      handler: 'index.default',
      logRetention: 7,
      memorySize: 128,
      runtime: Runtime.NODEJS_12_X,
      timeout: Duration.seconds(30),
    })

    // const greetingsTable = new Table(this, id + 'Table', {
    //   billingMode: BillingMode.PAY_PER_REQUEST,
    //   partitionKey: { name: 'id', type: AttributeType.STRING },
    //   tableName: this.stackName + '-greetings',
    // })

    // greetingsTable.grantReadData(getGreeting)

    const restApiRouteGreetings = restApi.root.addResource('greetings')
    restApiRouteGreetings.addMethod('GET', new LambdaIntegration(getGreeting))
  }
}
