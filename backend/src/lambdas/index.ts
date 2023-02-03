import {Construct} from 'constructs'
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {LambdaIntegration} from 'aws-cdk-lib/aws-apigateway'

import {DeploymentEnvironment} from '../types'
import {createUsersLambdaIntegrationV1, createUsersLambdaV1} from './users'
import {createEventsLambda, createEventsLambdaIntegrationV1} from './events'

interface HandlersProps {
  usersTable: ITable
  eventsTable: ITable
  deploymentEnvironment: DeploymentEnvironment
}

export class Lambdas extends Construct {
  public readonly usersLambdaV1: NodejsFunction
  public usersLambdaIntegrationV1: LambdaIntegration
  public readonly eventsLambdaV1: NodejsFunction
  public eventsLambdaIntegrationV1: LambdaIntegration

  constructor(scope: Construct, id: string, props: HandlersProps) {
    super(scope, id)
    const {usersTable, eventsTable, deploymentEnvironment} = props

    this.usersLambdaV1 = createUsersLambdaV1({
      scope: this,
      table: usersTable,
      deploymentEnvironment,
    })

    this.eventsLambdaV1 = createEventsLambda({
      scope: this,
      table: eventsTable,
      deploymentEnvironment,
    })

    this.usersLambdaIntegrationV1 = createUsersLambdaIntegrationV1({
      scope: this,
      lambda: this.usersLambdaV1,
      deploymentEnvironment,
    })

    this.eventsLambdaIntegrationV1 = createEventsLambdaIntegrationV1({
      scope: this,
      lambda: this.eventsLambdaV1,
      deploymentEnvironment,
    })
  }
}
