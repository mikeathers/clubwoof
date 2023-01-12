import {CfnOutput, Stack} from 'aws-cdk-lib'
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

export const storybookDeployment = (props: StorybookDeploymentProps) => {
  const {scope, hostedZone, responseHeadersPolicy} = props
  const deploymentEnvironment = 'dev'
  const url = CONFIG.STORYBOOK_URL

  new CfnOutput(scope, 'storybookUrl', {
    value: url,
  })

  const bucket = createBucket({
    bucketName: `${CONFIG.STACK_PREFIX}-storybook-bucket`,
    scope,
    deploymentEnvironment,
  })

  createBucketDeployment({
    scope,
    bucket,
    filePath: './storybook-build',
    deploymentEnvironment,
    deploymentName: `${CONFIG.STACK_PREFIX}-storybook-bucket-deployment`,
  })

  const accessIdentity = handleAccessIdentity({
    scope,
    bucket,
    name: `${CONFIG.STACK_PREFIX}-storybook-cloud-front-origin-access-identity`,
  })

  const certificate = createCertificate({
    scope,
    url,
    hostedZone,
    name: 'StorybookCertificate',
  })

  const distribution = createDistribution({
    scope,
    bucket,
    url,
    certificate,
    accessIdentity,
    responseHeadersPolicy,
    deploymentEnvironment,
    distributionName: `${CONFIG.STACK_PREFIX}-storybook-cloudfront-distribution`,
  })

  createARecordForDistribution({
    scope,
    hostedZone,
    url,
    distribution,
    name: 'StorybookARecord',
  })
}
