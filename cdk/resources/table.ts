import { AttributeType, BillingMode, Table } from '@aws-cdk/aws-dynamodb'
import { stack, stage } from '../stack'

const tableName =
  stack.stackName + '-greetings' + (stage === 'prod' ? '' : `-${stage}`)

export const greetingsTable = new Table(stack, 'BlueprintDynamoDBTable', {
  billingMode: BillingMode.PAY_PER_REQUEST,
  partitionKey: { name: 'id', type: AttributeType.STRING },
  tableName,
})
