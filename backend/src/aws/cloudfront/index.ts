import {Stack} from 'aws-cdk-lib'
import {
  Distribution,
  FunctionEventType,
  IDistribution,
  IFunction,
  OriginAccessIdentity,
  ResponseHeadersPolicy,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront'
import {IBucket} from 'aws-cdk-lib/aws-s3'
import {ICertificate} from 'aws-cdk-lib/aws-certificatemanager'
import {S3Origin} from 'aws-cdk-lib/aws-cloudfront-origins'

import {DeploymentEnvironment} from '../../types'

export interface CreateDistributionProps {
  scope: Stack
  bucket: IBucket
  url: string
  certificate: ICertificate
  accessIdentity: OriginAccessIdentity
  responseHeadersPolicy: ResponseHeadersPolicy
  functionAssociation?: IFunction
  deploymentEnvironment: DeploymentEnvironment
  distributionName: string
}

export const createDistribution = (props: CreateDistributionProps): IDistribution => {
  const {
    scope,
    bucket,
    url,
    certificate,
    accessIdentity,
    responseHeadersPolicy,
    functionAssociation,
    deploymentEnvironment,
    distributionName,
  } = props

  const distributionProps = {
    certificate,
    domainNames: [url],
    defaultRootObject: 'index.html',
    defaultBehavior: {
      origin: new S3Origin(bucket, {
        originAccessIdentity: accessIdentity,
      }),
      viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      responseHeadersPolicy,
    },
    errorResponses: [
      {
        httpStatus: 404,
        responseHttpStatus: 404,
        responsePagePath: '/404.html',
      },
    ],
  }

  const functionAssociates = [
    {
      function: functionAssociation,
      eventType: FunctionEventType.VIEWER_REQUEST,
    },
  ]

  const parsedProps = functionAssociation
    ? {
        ...distributionProps,
        defaultBehaviour: {
          ...distributionProps.defaultBehavior,
          functionAssociation: functionAssociates,
        },
      }
    : distributionProps

  const name = `${distributionName}-${deploymentEnvironment}`
  return new Distribution(scope, name, parsedProps)
}
