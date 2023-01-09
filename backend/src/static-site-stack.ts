import {Construct} from 'constructs'
import {CfnOutput, Stack, StackProps} from 'aws-cdk-lib'
import {createBucket, createBucketDeployment} from './aws/s3/index'
import CONFIG from '../config'
import {getRewriteFunction, handleAccessIdentity} from './aws/helpers/index'
import {createARecordForDistribution, getHostedZone} from './aws/route53/index'
import {createCertificate} from './aws/certificate/index'
import {getSecurityHeader} from './aws/headers'
import {createDistribution} from './aws/cloudfront/index'
import {DeploymentEnvironment} from './types'

interface StaticSiteStackProps extends StackProps {
  deploymentEnvironment: DeploymentEnvironment
}

export class StaticSiteStack extends Stack {
  constructor(scope: Construct, id: string, props: StaticSiteStackProps) {
    super(scope, id, props)
    const {deploymentEnvironment} = props
    const isProduction = deploymentEnvironment === 'prod'
    const domainName = 'clubwoof.co.uk'
    const url = isProduction ? 'clubwoof.co.uk' : 'dev.clubwoof.co.uk'

    new CfnOutput(this, 'urlBase', {
      value: url,
    })

    const assetsBucket = createBucket({
      bucketName: `${CONFIG.STACK_PREFIX}-bucket`,
      scope: this,
      env: deploymentEnvironment,
    })

    createBucketDeployment({
      scope: this,
      bucket: assetsBucket,
      filePath: isProduction ? './frontend-build/prod' : './frontend-build/dev',
      env: deploymentEnvironment,
    })

    const cloudfrontOriginAccessIdentity = handleAccessIdentity(this, assetsBucket)

    const zone = getHostedZone({scope: this, domainName})

    const certificate = createCertificate({
      scope: this,
      url,
      hostedZone: zone,
    })

    const responseHeaderPolicy = getSecurityHeader(this)

    const rewriteFunction = getRewriteFunction(this, deploymentEnvironment)

    const cloudfrontDistribution = createDistribution({
      scope: this,
      bucket: assetsBucket,
      url,
      certificate,
      accessIdentity: cloudfrontOriginAccessIdentity,
      responseHeaderPolicy,
      functionAssociation: rewriteFunction,
      env: deploymentEnvironment,
    })

    createARecordForDistribution({
      scope: this,
      hostedZone: zone,
      url,
      distribution: cloudfrontDistribution,
    })
  }
}
