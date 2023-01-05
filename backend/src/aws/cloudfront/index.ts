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
import CONFIG from '../../../config'

export interface CreateDistributionProps {
  scope: Stack
  bucket: IBucket
  url: string
  certificate: ICertificate
  accessIdentity: OriginAccessIdentity
  responseHeaderPolicy: ResponseHeadersPolicy
  functionAssociation: IFunction
  env: 'prod' | 'dev'
}

export const createDistribution = (props: CreateDistributionProps): IDistribution => {
  const {
    scope,
    bucket,
    url,
    certificate,
    accessIdentity,
    responseHeaderPolicy,
    functionAssociation,
    env,
  } = props

  return new Distribution(
    scope,
    `${CONFIG.STACK_PREFIX}-cloudfront-distribution-${env}`,
    {
      certificate,
      domainNames: [url],
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new S3Origin(bucket, {
          originAccessIdentity: accessIdentity,
        }),
        functionAssociations: [
          {
            function: functionAssociation,
            eventType: FunctionEventType.VIEWER_REQUEST,
          },
        ],
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        responseHeadersPolicy: responseHeaderPolicy,
      },
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
        },
      ],
    },
  )
}
