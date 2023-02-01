import {Construct} from 'constructs'
import {AttributeType, BillingMode, ITable, Table} from 'aws-cdk-lib/aws-dynamodb'
import {RemovalPolicy} from 'aws-cdk-lib'
import {DeploymentEnvironment} from '../types'

export class Database extends Construct {
  public readonly usersTable: ITable
  public readonly eventsTable: ITable
  private readonly deploymentEnvironment: DeploymentEnvironment

  constructor(
    scope: Construct,
    id: string,
    deploymentEnvironment: DeploymentEnvironment,
  ) {
    super(scope, id)

    this.deploymentEnvironment = deploymentEnvironment
    this.usersTable = this.createUsersTable()
    this.eventsTable = this.createEventsTable()
  }

  private createUsersTable(): ITable {
    const tableName = `Users-${this.deploymentEnvironment}`
    const usersTable = new Table(this, tableName, {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
      tableName: tableName,
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
    })
    return usersTable
  }

  private createEventsTable(): ITable {
    const tableName = `Events-${this.deploymentEnvironment}`

    const eventsTable = new Table(this, tableName, {
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
}
