import {Construct} from 'constructs'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {DeploymentEnvironment} from '../types'
import {createAccountsTable} from './users'
import {createEventsTable} from './events'

export class Databases extends Construct {
  public readonly accountsTable: ITable
  public readonly eventsTable: ITable
  private readonly deploymentEnvironment: DeploymentEnvironment

  constructor(
    scope: Construct,
    id: string,
    deploymentEnvironment: DeploymentEnvironment,
  ) {
    super(scope, id)

    this.deploymentEnvironment = deploymentEnvironment
    this.accountsTable = createAccountsTable({scope: this, deploymentEnvironment})
    this.eventsTable = createEventsTable({scope: this, deploymentEnvironment})
  }
}
