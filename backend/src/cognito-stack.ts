import {Construct} from 'constructs'
import {CfnOutput, Stack, StackProps} from 'aws-cdk-lib'

import {DeploymentEnvironment} from './types'
import {
  IdentityPoolConstruct,
  UserPoolClientConstruct,
  UserPoolConstruct,
} from './aws/cognito'
import {UserPool} from 'aws-cdk-lib/aws-cognito'

interface BackendStackProps extends StackProps {
  stage: DeploymentEnvironment
}

export class CognitoStack extends Stack {
  public userPool: UserPool

  constructor(scope: Construct, id: string, props: BackendStackProps) {
    super(scope, id, props)
    const {stage} = props

    const {userPool} = new UserPoolConstruct(this, stage)
    this.userPool = userPool

    const {userPoolClient} = new UserPoolClientConstruct(this, userPool, stage)

    const {identityPool} = new IdentityPoolConstruct(
      this,
      userPool,
      userPoolClient,
      stage,
    )

    // Outputs
    new CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
    })

    new CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
    })

    new CfnOutput(this, 'IdentityPoolId', {
      value: identityPool.ref,
    })

    new CfnOutput(this, 'Region', {
      value: Stack.of(this).region,
    })
  }
}
