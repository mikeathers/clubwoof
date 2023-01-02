import { Construct } from 'constructs'
import { Stack, StackProps } from 'aws-cdk-lib'
import { createBucket, createBucketDeployment } from './aws/s3/index'
import CONFIG from '../config'
import { handleAccessIdentity } from './aws/helpers/index'
import { createARecordForDistribution, getHostedZone } from './aws/route53/index'
import { createCertificate } from './aws/certificate/index'
import { getSecurityHeader } from './aws/headers'
import { createDistribution } from './aws/cloudfront/index'
import { Function, FunctionCode } from 'aws-cdk-lib/aws-cloudfront'
import { join } from 'path'

interface StaticSiteStackProps extends StackProps {
  deploymentEnvironment: 'prod' | 'dev'
}

export class StaticSiteStack extends Stack {
  constructor(scope: Construct, id: string, props: StaticSiteStackProps) {
    super(scope, id, props)
    const { deploymentEnvironment } = props
    const isProduction = deploymentEnvironment === 'prod'
    const domainName = 'clubwoof.co.uk'
    const url = isProduction ? 'clubwoof.co.uk' : 'dev.clubwoof.co.uk'

    const assetsBucket = createBucket({
      bucketName: `${CONFIG.STACK_PREFIX}-bucket`,
      scope: this,
      env: deploymentEnvironment,
    })

    createBucketDeployment({
      scope: this,
      bucket: assetsBucket,
      filePath: './out',
      env: deploymentEnvironment,
    })

    const cloudfrontOriginAccessIdentity = handleAccessIdentity(this, assetsBucket)

    const zone = getHostedZone({ scope: this, domainName })

    const certificate = createCertificate({
      scope: this,
      url,
      hostedZone: zone,
    })

    const responseHeaderPolicy = getSecurityHeader(this)

    const rewriteFunction = new Function(this, 'ViewerResponseFunction2', {
      functionName: 'RedirectURIFunction2',
      code: FunctionCode.fromFile({ filePath: join(__dirname, 'functions', 'mapping-function.js') }),
      comment: 'adds index.html to requests',
    })

    const cloudfrontDistribution = createDistribution({
      scope: this,
      bucket: assetsBucket,
      url,
      certificate: certificate,
      accessIdentity: cloudfrontOriginAccessIdentity,
      responseHeaderPolicy: responseHeaderPolicy,
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
