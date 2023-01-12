import {CfnOutput, Stack} from 'aws-cdk-lib'
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

export const websiteDeployment = (props: WebsiteDeploymentProps) => {
  const {scope, deploymentEnvironment, hostedZone, responseHeadersPolicy} = props
  const isProduction = deploymentEnvironment === 'prod'
  const url = isProduction ? CONFIG.DOMAIN_NAME : CONFIG.DEV_URL

  new CfnOutput(scope, 'urlBase', {
    value: url,
  })

  const bucket = createBucket({
    bucketName: `${CONFIG.STACK_PREFIX}-website-bucket`,
    scope,
    deploymentEnvironment,
  })

  createBucketDeployment({
    scope,
    bucket,
    filePath: isProduction ? './frontend-build/prod' : './frontend-build/dev',
    deploymentEnvironment,
    deploymentName: `${CONFIG.STACK_PREFIX}-website-bucket-deployment`,
  })

  const accessIdentity = handleAccessIdentity({
    scope,
    bucket,
    name: `${CONFIG.STACK_PREFIX}-website-cloud-front-origin-access-identity`,
  })

  const certificate = createCertificate({
    scope,
    url,
    hostedZone,
    name: 'WebsiteCertificate',
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
    distributionName: `${CONFIG.STACK_PREFIX}-website-cloudfront-distribution`,
  })

  createARecordForDistribution({
    scope,
    hostedZone,
    url,
    distribution,
    name: 'WebsiteARecord',
  })
}
