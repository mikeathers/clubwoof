import {Stack} from 'aws-cdk-lib'
import {IHostedZone} from 'aws-cdk-lib/aws-route53'
import {ResponseHeadersPolicy} from 'aws-cdk-lib/aws-cloudfront'

import CONFIG from '../config'
import {DeploymentEnvironment} from '../types'
import {
  createARecordForDistribution,
  createBucket,
  createBucketDeployment,
  createCertificate,
  createDistribution,
  getRewriteFunction,
  handleAccessIdentity,
} from '../aws'

interface WebsiteDeploymentProps {
  scope: Stack
  deploymentEnvironment: DeploymentEnvironment
  hostedZone: IHostedZone
  responseHeadersPolicy: ResponseHeadersPolicy
}

export const websiteDeployment = (props: WebsiteDeploymentProps): void => {
  const {scope, deploymentEnvironment, hostedZone, responseHeadersPolicy} = props
  const isProduction = deploymentEnvironment === 'Prod'
  const url = isProduction ? CONFIG.DOMAIN_NAME : CONFIG.DEV_URL

  const bucket = createBucket({
    bucketName: `${CONFIG.STACK_PREFIX}WebsiteBucket`,
    scope,
    deploymentEnvironment,
  })

  createBucketDeployment({
    scope,
    bucket,
    filePath: isProduction ? './frontend-build/prod' : './frontend-build/dev',
    deploymentEnvironment,
    deploymentName: `${CONFIG.STACK_PREFIX}WebsiteBucketDeployment`,
  })

  const accessIdentity = handleAccessIdentity({
    scope,
    bucket,
    name: `${CONFIG.STACK_PREFIX}WebsiteCloudFrontOriginAccessIdentity`,
  })

  const certificate = createCertificate({
    scope,
    url,
    hostedZone,
    name: `${CONFIG.STACK_PREFIX}WebsiteCertificate`,
  })

  const rewriteFunction = getRewriteFunction({
    scope,
    deploymentEnvironment,
  })

  const distribution = createDistribution({
    scope,
    bucket,
    url,
    certificate,
    accessIdentity,
    responseHeadersPolicy,
    functionAssociation: rewriteFunction,
    deploymentEnvironment,
    distributionName: `${CONFIG.STACK_PREFIX}WebsiteCloudfrontDistribution`,
  })

  createARecordForDistribution({
    scope,
    hostedZone,
    url,
    distribution,
    name: `${CONFIG.STACK_PREFIX}WebsiteARecord`,
  })
}
