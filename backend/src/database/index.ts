import {Construct} from 'constructs'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {DeploymentEnvironment} from '../types'
import {createAccountsTable} from './accounts'
import {createEventsTable} from './events'

export class Databases extends Construct {
  public readonly accountsTable: ITable
  public readonly eventsTable: ITable

  constructor(
    scope: Construct,
    id: string,
    deploymentEnvironment: DeploymentEnvironment,
  ) {
    super(scope, id)
    this.accountsTable = createAccountsTable({scope: this, deploymentEnvironment})
    this.eventsTable = createEventsTable({scope: this, deploymentEnvironment})
  }
}
