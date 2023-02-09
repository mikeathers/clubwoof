import {AttributeType, BillingMode, ITable, Table} from 'aws-cdk-lib/aws-dynamodb'
import {RemovalPolicy} from 'aws-cdk-lib'
import {DeploymentEnvironment} from '../types'
import {Construct} from 'constructs'
import CONFIG from '../config'

interface CreateAccountsTableProps {
  scope: Construct
  deploymentEnvironment: DeploymentEnvironment
}

export function createAccountsTable(props: CreateAccountsTableProps): ITable {
  const {scope, deploymentEnvironment} = props
  const tableName = `${CONFIG.STACK_PREFIX}-Accounts-${deploymentEnvironment}`
  const accountsTable = new Table(scope, tableName, {
    partitionKey: {
      name: 'id',
      type: AttributeType.STRING,
    },
    tableName: tableName,
    removalPolicy: RemovalPolicy.DESTROY,
    billingMode: BillingMode.PAY_PER_REQUEST,
  })

  accountsTable.addGlobalSecondaryIndex({
    indexName: 'authenticatedUserId',
    partitionKey: {
      name: 'authenticatedUserId',
      type: AttributeType.STRING,
    },
  })

  return accountsTable
}
