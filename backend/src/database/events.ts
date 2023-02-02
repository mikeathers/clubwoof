import {AttributeType, BillingMode, ITable, Table} from 'aws-cdk-lib/aws-dynamodb'
import {RemovalPolicy} from 'aws-cdk-lib'
import {DeploymentEnvironment} from '../types'
import {Construct} from 'constructs'

interface CreateEventsTableProps {
  scope: Construct
  deploymentEnvironment: DeploymentEnvironment
}

export function createEventsTable(props: CreateEventsTableProps): ITable {
  const {scope, deploymentEnvironment} = props
  const tableName = `Events-${deploymentEnvironment}`

  const eventsTable = new Table(scope, tableName, {
    partitionKey: {
      name: 'id',
      type: AttributeType.STRING,
    },
    tableName: tableName,
    removalPolicy: RemovalPolicy.DESTROY,
    billingMode: BillingMode.PAY_PER_REQUEST,
  })
  return eventsTable
}
