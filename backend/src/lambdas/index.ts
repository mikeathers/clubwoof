import {Construct} from 'constructs'
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {LambdaIntegration} from 'aws-cdk-lib/aws-apigateway'

import {DeploymentEnvironment} from '../types'
import {createAccountLambdaIntegrationV1, createAccountLambdaV1} from './account'
import {createEventsLambdaIntegrationV1, createEventsLambdaV1} from './events'

interface HandlersProps {
  usersTable: ITable
  eventsTable: ITable
  deploymentEnvironment: DeploymentEnvironment
}

export class Lambdas extends Construct {
  public readonly accountLambdaV1: NodejsFunction
  public accountLambdaIntegrationV1: LambdaIntegration
  public readonly eventsLambdaV1: NodejsFunction
  public eventsLambdaIntegrationV1: LambdaIntegration

  constructor(scope: Construct, id: string, props: HandlersProps) {
    super(scope, id)
    const {usersTable, eventsTable, deploymentEnvironment} = props

    this.accountLambdaV1 = createAccountLambdaV1({
      scope: this,
      table: usersTable,
      deploymentEnvironment,
    })

    this.accountLambdaIntegrationV1 = createAccountLambdaIntegrationV1({
      scope: this,
      lambda: this.accountLambdaV1,
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
  }
}
