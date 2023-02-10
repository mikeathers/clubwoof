import {Stack} from 'aws-cdk-lib'
import {IHostedZone} from 'aws-cdk-lib/aws-route53'
import {ResponseHeadersPolicy} from 'aws-cdk-lib/aws-cloudfront'

import {
  createARecordForDistribution,
  createBucket,
  createBucketDeployment,
  createCertificate,
  createDistribution,
  handleAccessIdentity,
} from '../aws'
import CONFIG from '../config'

interface StorybookDeploymentProps {
  scope: Stack
  hostedZone: IHostedZone
  responseHeadersPolicy: ResponseHeadersPolicy
}

export const storybookDeployment = (props: StorybookDeploymentProps): void => {
  const {scope, hostedZone, responseHeadersPolicy} = props
  const deploymentEnvironment = 'Dev'
  const url = CONFIG.STORYBOOK_URL

  const bucket = createBucket({
    bucketName: `${CONFIG.STACK_PREFIX}StorybookBucket`,
    scope,
    stage: deploymentEnvironment,
  })

  createBucketDeployment({
    scope,
    bucket,
    filePath: './storybook-build',
    stage: deploymentEnvironment,
    deploymentName: `${CONFIG.STACK_PREFIX}StorybookBucketDeployment`,
  })

  const accessIdentity = handleAccessIdentity({
    scope,
    bucket,
    name: `${CONFIG.STACK_PREFIX}StorybookCloudFrontOriginAccessIdentity`,
  })

  const certificate = createCertificate({
    scope,
    url,
    hostedZone,
    name: `${CONFIG.STACK_PREFIX}StorybookCertificate`,
  })

  const distribution = createDistribution({
    scope,
    bucket,
    url,
    certificate,
    accessIdentity,
    responseHeadersPolicy,
    stage: deploymentEnvironment,
    distributionName: `${CONFIG.STACK_PREFIX}StorybookCloudfrontDistribution`,
  })

  createARecordForDistribution({
    scope,
    hostedZone,
    url,
    distribution,
    name: `${CONFIG.STACK_PREFIX}StorybookARecord`,
  })
}
