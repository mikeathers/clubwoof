import {Construct} from 'constructs'
import {CfnOutput, Stack, StackProps} from 'aws-cdk-lib'
import {DeploymentEnvironment} from '@clubwoof-backend-types'

import {
  IdentityPoolConstruct,
  UserPoolClientConstruct,
  UserPoolConstruct,
} from './cognito'

interface BackendStackProps extends StackProps {
  deploymentEnvironment: DeploymentEnvironment
}

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props: BackendStackProps) {
    super(scope, id, props)

    const {userPool} = new UserPoolConstruct(this, props.deploymentEnvironment)
    const {userPoolClient} = new UserPoolClientConstruct(this, userPool)
    const {identityPool} = new IdentityPoolConstruct(this, userPool, userPoolClient)

    // Outputs
    new CfnOutput(this, 'userPoolId', {
      value: userPool.userPoolId,
    })

    new CfnOutput(this, 'userPoolClientId', {
      value: userPoolClient.userPoolClientId,
    })

    new CfnOutput(this, 'identityPoolId', {
      value: identityPool.ref,
    })

    new CfnOutput(this, 'region', {
      value: Stack.of(this).region,
    })
  }
}
