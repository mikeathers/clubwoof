import {CfnOutput, Stack} from 'aws-cdk-lib'

import CONFIG from '@clubwoof-backend-config'
import {DeploymentEnvironment} from '@clubwoof-backend-types'
import {
  createARecordForDistribution,
  createBucket,
  createBucketDeployment,
  createCertificate,
  createDistribution,
  getHostedZone,
  getRewriteFunction,
  getSecurityHeader,
  handleAccessIdentity,
} from '@clubwoof-backend-aws'

export const websiteDeployment = (
  scope: Stack,
  deploymentEnvironment: DeploymentEnvironment,
) => {
  const isProduction = deploymentEnvironment === 'prod'
  const domainName = CONFIG.DOMAIN_NAME
  const url = isProduction ? domainName : CONFIG.DEV_URL

  new CfnOutput(scope, 'urlBase', {
    value: url,
  })

  const assetsBucket = createBucket({
    bucketName: `${CONFIG.STACK_PREFIX}-bucket`,
    scope,
    env: deploymentEnvironment,
  })

  createBucketDeployment({
    scope,
    bucket: assetsBucket,
    filePath: isProduction ? './frontend-build/prod' : './frontend-build/dev',
    env: deploymentEnvironment,
  })

  const cloudfrontOriginAccessIdentity = handleAccessIdentity(scope, assetsBucket)

  const zone = getHostedZone({scope, domainName})

  const certificate = createCertificate({
    scope,
    url,
    hostedZone: zone,
  })

  const responseHeaderPolicy = getSecurityHeader(scope)

  const rewriteFunction = getRewriteFunction(scope, deploymentEnvironment)

  const cloudfrontDistribution = createDistribution({
    scope,
    bucket: assetsBucket,
    url,
    certificate,
    accessIdentity: cloudfrontOriginAccessIdentity,
    responseHeaderPolicy,
    functionAssociation: rewriteFunction,
    env: deploymentEnvironment,
  })

  createARecordForDistribution({
    scope,
    hostedZone: zone,
    url,
    distribution: cloudfrontDistribution,
  })
}
