import { Stack } from 'aws-cdk-lib'
import {
  Distribution,
  Function,
  FunctionCode,
  FunctionEventType,
  IDistribution,
  IFunction,
  OriginAccessIdentity,
  ResponseHeadersPolicy,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront'
import { IBucket } from 'aws-cdk-lib/aws-s3'
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager'
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins'
import CONFIG from '../../../config'

export interface CreateFunctionProps {
  scope: Stack
  functionName: string
  filePath: string
}

export const createFunction = (props: CreateFunctionProps): IFunction => {
  const { scope, functionName, filePath } = props

  return new Function(scope, 'mappingFunction', {
    functionName: functionName,
    code: FunctionCode.fromFile({
      filePath,
    }),
  })
}

export interface CreateDistributionProps {
  scope: Stack
  bucket: IBucket
  domainName: string
  certificate: ICertificate
  functionAssociation: IFunction
  accessIdentity: OriginAccessIdentity
  responseHeaderPolicy: ResponseHeadersPolicy
  env: 'prod' | 'dev'
}

export const createDistribution = (props: CreateDistributionProps): IDistribution => {
  const { scope, bucket, domainName, certificate, functionAssociation, accessIdentity, responseHeaderPolicy, env } =
    props

  return new Distribution(scope, `${CONFIG.STACK_PREFIX}-cloudfront-distribution-${env}`, {
    certificate: certificate,
    enableLogging: true,
    domainNames: [domainName],
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
  })
}
