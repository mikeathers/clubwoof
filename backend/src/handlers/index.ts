import {Construct} from 'constructs'
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {LambdaIntegration} from 'aws-cdk-lib/aws-apigateway'

import {DeploymentEnvironment} from '../types'
import {createUsersHandler, createUsersHandlerIntegration} from './users'
import {createEventsHandler, createEventsHandlerIntegration} from './events'

interface HandlersProps {
  usersTable: ITable
  eventsTable: ITable
  deploymentEnvironment: DeploymentEnvironment
}

export class Handlers extends Construct {
  public readonly usersHandler: NodejsFunction
  public usersLambdaIntegration: LambdaIntegration
  public readonly eventsHandler: NodejsFunction
  public persistEventsLambdaIntegration: LambdaIntegration

  constructor(scope: Construct, id: string, props: HandlersProps) {
    super(scope, id)
    const {usersTable, eventsTable, deploymentEnvironment} = props

    this.usersHandler = createUsersHandler({
      scope: this,
      table: usersTable,
      deploymentEnvironment,
    })

    this.eventsHandler = createEventsHandler({
      scope: this,
      table: eventsTable,
      deploymentEnvironment,
    })

    this.usersLambdaIntegration = createUsersHandlerIntegration(this.usersHandler)
    this.persistEventsLambdaIntegration = createEventsHandlerIntegration(
      this.eventsHandler,
    )
  }
}
