import {join} from 'path'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {NodejsFunction, NodejsFunctionProps} from 'aws-cdk-lib/aws-lambda-nodejs'
import {Alias, Runtime, Version} from 'aws-cdk-lib/aws-lambda'
import {LambdaIntegration} from 'aws-cdk-lib/aws-apigateway'
import {Construct} from 'constructs'

import {DeploymentEnvironment} from '../../types'
import CONFIG from '../../config'
import {PolicyStatement} from 'aws-cdk-lib/aws-iam'

interface AccountLambdaProps {
  scope: Construct
  table: ITable
  stage: DeploymentEnvironment
  eventBusName: string
}

export class AccountLambda {
  public accountLambdaV1: NodejsFunction
  constructor(props: AccountLambdaProps) {
    this.accountLambdaV1 = this.createAccountLambdaV1(props)
  }

  private createAccountLambdaV1(props: AccountLambdaProps): NodejsFunction {
    const {scope, stage, table, eventBusName} = props
    const lambdaName = `${CONFIG.STACK_PREFIX}AccountLambda-${stage}`

    const lambdaProps: NodejsFunctionProps = {
      functionName: lambdaName,
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        PRIMARY_KEY: 'id',
        TABLE_NAME: table.tableName,
        EVENT_BUS_NAME: eventBusName,
      },
      runtime: Runtime.NODEJS_14_X,
    }

    const accountLambda = new NodejsFunction(scope, lambdaName, {
      entry: join(__dirname, '../../functions/account/index.ts'),
      ...lambdaProps,
    })

    table.grantReadWriteData(accountLambda)
    accountLambda.addToRolePolicy(
      new PolicyStatement({
        actions: ['dynamodb:Query'],
        resources: ['*'],
      }),
    )

    return accountLambda
  }
}

interface AccountLambdaIntegrationProps {
  scope: Construct
  lambda: NodejsFunction
  stage: DeploymentEnvironment
}

export class AccountLambdaIntegration {
  public accountLambdaIntegrationV1: LambdaIntegration
  constructor(props: AccountLambdaIntegrationProps) {
    this.accountLambdaIntegrationV1 = this.createAccountLambdaIntegrationV1(props)
  }

  private createAccountLambdaIntegrationV1(
    props: AccountLambdaIntegrationProps,
  ): LambdaIntegration {
    const {scope, lambda, stage} = props

    const accountLambdaV1 = new Version(
      scope,
      `${CONFIG.STACK_PREFIX}AccountLambda${stage}V1`,
      {
        lambda,
      },
    )

    const accountLambdaV1Alias = new Alias(
      scope,
      `${CONFIG.STACK_PREFIX}AccountLambda${stage}V1Alias`,
      {
        aliasName: `${CONFIG.STACK_PREFIX}AccountLambdaV1`,
        version: accountLambdaV1,
      },
    )
    return new LambdaIntegration(accountLambdaV1Alias)
  }
}
