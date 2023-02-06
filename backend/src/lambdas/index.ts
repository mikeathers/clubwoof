import {Construct} from 'constructs'
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {LambdaIntegration} from 'aws-cdk-lib/aws-apigateway'

import {DeploymentEnvironment} from '../types'
import {createAccountLambdaIntegrationV1, createAccountLambdaV1} from './account'
import {createEventsLambdaIntegrationV1, createEventsLambdaV1} from './events'
import {createAuthLambdaIntegrationV1, createAuthLambdaV1} from './auth'

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
  public readonly authLambdaV1: NodejsFunction
  public authLambdaIntegrationV1: LambdaIntegration

  constructor(scope: Construct, id: string, props: HandlersProps) {
    super(scope, id)
    const {usersTable, eventsTable, deploymentEnvironment} = props

    this.usersLambdaV1 = createAccountLambdaV1({
      scope: this,
      table: usersTable,
      deploymentEnvironment,
    })

    this.usersLambdaIntegrationV1 = createAccountLambdaIntegrationV1({
      scope: this,
      lambda: this.usersLambdaV1,
      deploymentEnvironment,
    })

    this.eventsLambdaV1 = createEventsLambdaV1({
      scope: this,
      table: eventsTable,
      deploymentEnvironment,
    })

    this.eventsLambdaIntegrationV1 = createEventsLambdaIntegrationV1({
      scope: this,
      lambda: this.eventsLambdaV1,
      deploymentEnvironment,
    })

    this.authLambdaV1 = createAuthLambdaV1({
      scope: this,
      deploymentEnvironment,
    })

    this.authLambdaIntegrationV1 = createAuthLambdaIntegrationV1({
      scope: this,
      lambda: this.authLambdaV1,
      deploymentEnvironment,
    })
  }
}
