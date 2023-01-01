import { Construct } from 'constructs'
import { Stack, StackProps } from 'aws-cdk-lib'
import { Function, FunctionCode } from 'aws-cdk-lib/aws-cloudfront'
import { join } from 'path'
import { createBucket, createBucketDeployment } from './aws/s3/index'
import CONFIG from '../config'
import { handleAccessIdentity } from './aws/helpers/index'
import { createARecordForDistribution, getHostedZone } from './aws/route53/index'
import { createCertificate } from './aws/certificate/index'
import { getSecurityHeader } from './aws/headers'
import { createDistribution } from './aws/cloudfront/index'

export class StaticSiteInfraDemoStack extends Stack {
  constructor(scope: Construct, id: string, deploymentEnvironment: 'dev' | 'prod', props?: StackProps) {
    super(scope, id, props)
    const isProduction = deploymentEnvironment === 'prod'
    const domainName = isProduction ? 'clubwoof.co.uk' : 'dev.clubwoof.co.uk'

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
      domainName,
      hostedZone: zone,
    })

    const rewriteFunction = new Function(this, 'ViewerResponseFunction', {
      functionName: 'RedirectURIFunction',
      code: FunctionCode.fromFile({ filePath: join(__dirname, 'functions', 'mapping-function.js') }),
      comment: 'adds index.html to requests',
    })

    const responseHeaderPolicy = getSecurityHeader(this)

    const cloudfrontDistribution = createDistribution({
      scope: this,
      bucket: assetsBucket,
      domainName: domainName,
      certificate: certificate,
      functionAssociation: rewriteFunction,
      accessIdentity: cloudfrontOriginAccessIdentity,
      responseHeaderPolicy: responseHeaderPolicy,
      env: deploymentEnvironment,
    })
    createARecordForDistribution({
      scope: this,
      hostedZone: zone,
      domainName,
      distribution: cloudfrontDistribution,
    })
  }
}
