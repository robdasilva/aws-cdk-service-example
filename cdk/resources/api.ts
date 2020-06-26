import { RestApi } from '@aws-cdk/aws-apigateway'
import { stack, stage } from '../stack'

const restApiName =
  stack.stackName + '-rest-api' + (stage === 'prod' ? '' : `-${stage}`)

export const restApi = new RestApi(stack, 'BlueprintServiceRestApi', {
  deployOptions: {
    stageName: stage,
  },
  endpointExportName: `${restApiName}-url`,
  restApiName,
})
