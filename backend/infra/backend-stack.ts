import { Construct } from 'constructs'
import {CfnOutput, Stack, StackProps} from 'aws-cdk-lib'

import { IdentityPoolConstruct, UserPoolClientConstruct, UserPoolConstruct } from './cognito'
import {WebAppDeployment} from "./web-app-deployment";

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const { userPool } = new UserPoolConstruct(this)
    const { userPoolClient } = new UserPoolClientConstruct(this, userPool)
    const { identityPool } = new IdentityPoolConstruct(this, userPool, userPoolClient)

    new WebAppDeployment(this);


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
