import {Construct} from 'constructs'
import {CfnOutput, Stack, StackProps} from 'aws-cdk-lib'

import {DeploymentEnvironment} from './types'
import {
  IdentityPoolConstruct,
  UserPoolClientConstruct,
  UserPoolConstruct,
} from './aws/cognito'
import {createCertificate, getHostedZone} from './aws'
import CONFIG from './config'
import {UserPool} from 'aws-cdk-lib/aws-cognito'

interface BackendStackProps extends StackProps {
  deploymentEnvironment: DeploymentEnvironment
}

export class CognitoStack extends Stack {
  public userPool: UserPool

  constructor(scope: Construct, id: string, props: BackendStackProps) {
    super(scope, id, props)

    const hostedZone = getHostedZone({scope: this, domainName: CONFIG.DOMAIN_NAME})

    const certificate = createCertificate({
      scope: this,
      url: CONFIG.DOMAIN_NAME,
      hostedZone,
      name: 'WebsiteCertificate',
    })

    const {userPool} = new UserPoolConstruct(
      this,
      props.deploymentEnvironment,
      certificate,
    )
    this.userPool = userPool

    const {userPoolClient} = new UserPoolClientConstruct(
      this,
      userPool,
      props.deploymentEnvironment,
    )

    const {identityPool} = new IdentityPoolConstruct(
      this,
      userPool,
      userPoolClient,
      props.deploymentEnvironment,
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
