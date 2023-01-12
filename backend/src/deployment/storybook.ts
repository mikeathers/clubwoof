import {CfnOutput, Stack} from 'aws-cdk-lib'

import {
  createARecordForDistribution,
  createBucket,
  createBucketDeployment,
  createCertificate,
  createDistribution,
  getHostedZone,
  getSecurityHeader,
  handleAccessIdentity,
} from '@clubwoof-backend-aws'
import CONFIG from '@clubwoof-backend-config'

export const storybookDeployment = (scope: Stack) => {
  const domainName = CONFIG.DOMAIN_NAME
  const url = CONFIG.STORYBOOK_URL

  new CfnOutput(scope, 'storybookUrl', {
    value: url,
  })

  const assetsBucket = createBucket({
    bucketName: `${CONFIG.STACK_PREFIX}-bucket`,
    scope,
    env: 'dev',
  })

  createBucketDeployment({
    scope,
    bucket: assetsBucket,
    filePath: './storybook-build',
    env: 'dev',
  })

  const cloudfrontOriginAccessIdentity = handleAccessIdentity(scope, assetsBucket)

  const zone = getHostedZone({scope, domainName})

  const certificate = createCertificate({
    scope,
    url,
    hostedZone: zone,
  })

  const responseHeaderPolicy = getSecurityHeader(scope)

  const cloudfrontDistribution = createDistribution({
    scope,
    bucket: assetsBucket,
    url,
    certificate,
    accessIdentity: cloudfrontOriginAccessIdentity,
    responseHeaderPolicy,
    env: 'dev',
  })

  createARecordForDistribution({
    scope,
    hostedZone: zone,
    url,
    distribution: cloudfrontDistribution,
  })
}
