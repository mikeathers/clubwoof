import {RemovalPolicy, Stack} from 'aws-cdk-lib'
import {
  Bucket,
  BucketAccessControl,
  BucketEncryption,
  IBucket,
  ObjectOwnership,
} from 'aws-cdk-lib/aws-s3'
import {BucketDeployment, Source} from 'aws-cdk-lib/aws-s3-deployment'
import {DeploymentEnvironment} from '@clubwoof-backend-types'

export interface CreateBucketProps {
  scope: Stack
  bucketName: string
  env: DeploymentEnvironment
}

export interface CreateBucketDeploymentProps {
  scope: Stack
  bucket: IBucket
  filePath: string
  env: DeploymentEnvironment
}

export const createBucket = (props: CreateBucketProps): IBucket => {
  const {scope, bucketName, env} = props

  return new Bucket(scope, `${bucketName}-${env}`, {
    bucketName: `${bucketName}-${env}`,
    publicReadAccess: false,
    autoDeleteObjects: true,
    removalPolicy: RemovalPolicy.DESTROY,
    accessControl: BucketAccessControl.PRIVATE,
    objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,
    encryption: BucketEncryption.S3_MANAGED,
  })
}

export const createBucketDeployment = (
  props: CreateBucketDeploymentProps,
): BucketDeployment => {
  const {scope, bucket, filePath, env} = props

  return new BucketDeployment(scope, `${env}-bucket-deployment`, {
    destinationBucket: bucket,
    sources: [Source.asset(filePath)],
  })
}
