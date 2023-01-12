import {Construct} from 'constructs'
import {Stack, StackProps} from 'aws-cdk-lib'

import {DeploymentEnvironment} from '@clubwoof-backend-types'
import {storybookDeployment, websiteDeployment} from '@clubwoof-backend-deployment'

interface StaticSiteStackProps extends StackProps {
  deploymentEnvironment: DeploymentEnvironment
}

export class StaticSiteStack extends Stack {
  constructor(scope: Construct, id: string, props: StaticSiteStackProps) {
    super(scope, id, props)
    const {deploymentEnvironment} = props

    if (deploymentEnvironment === 'dev') storybookDeployment(this)
    websiteDeployment(this, deploymentEnvironment)
  }
}
