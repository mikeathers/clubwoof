import {Construct} from 'constructs'
import {Stack, StackProps} from 'aws-cdk-lib'

import {DeploymentEnvironment} from './types'
import {storybookDeployment, websiteDeployment} from './deployment'
import {getHostedZone, getSecurityHeader} from './aws'
import CONFIG from './config'

interface StaticSiteStackProps extends StackProps {
  stage: DeploymentEnvironment
}

export class StaticSiteStack extends Stack {
  constructor(scope: Construct, id: string, props: StaticSiteStackProps) {
    super(scope, id, props)
    const {stage} = props

    const hostedZone = getHostedZone({scope: this, domainName: CONFIG.DOMAIN_NAME})

    const responseHeadersPolicy = getSecurityHeader(this)

    if (stage === 'Dev') {
      storybookDeployment({
        scope: this,
        hostedZone,
        responseHeadersPolicy,
      })
    }
    websiteDeployment({
      scope: this,
      stage,
      hostedZone,
      responseHeadersPolicy,
    })
  }
}
