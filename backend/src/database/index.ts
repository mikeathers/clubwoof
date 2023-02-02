import {Construct} from 'constructs'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {DeploymentEnvironment} from '../types'
import {createUsersTable} from './users'
import {createEventsTable} from './events'

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
    this.usersTable = createUsersTable({scope: this, deploymentEnvironment})
    this.eventsTable = createEventsTable({scope: this, deploymentEnvironment})
  }
}
