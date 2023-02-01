import {Construct} from 'constructs'
import {CfnOutput, Stack, StackProps} from 'aws-cdk-lib'

import {DeploymentEnvironment} from './types'
import {
  IdentityPoolConstruct,
  UserPoolClientConstruct,
  UserPoolConstruct,
} from './cognito'
import {createCertificate, getHostedZone} from './aws'
import CONFIG from './config'
import {CognitoUserPoolsAuthorizer} from 'aws-cdk-lib/aws-apigateway'

interface BackendStackProps extends StackProps {
  deploymentEnvironment: DeploymentEnvironment
}

export class CognitoStack extends Stack {
  public authorizer: CognitoUserPoolsAuthorizer

  constructor(scope: Construct, id: string, props: BackendStackProps) {
    super(scope, id, props)

    const hostedZone = getHostedZone({scope: this, domainName: CONFIG.DOMAIN_NAME})

    const certificate = createCertificate({
      scope: this,
      url: 'clubwoof.co.uk',
      hostedZone,
      name: 'WebsiteCertificate',
    })

    const {userPool, authorizer} = new UserPoolConstruct(
      this,
      props.deploymentEnvironment,
      certificate,
    )
    this.authorizer = authorizer

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
