import {RemovalPolicy, Stack} from 'aws-cdk-lib'
import {
  Bucket,
  BucketAccessControl,
  BucketEncryption,
  IBucket,
  ObjectOwnership,
} from 'aws-cdk-lib/aws-s3'
import {BucketDeployment, Source} from 'aws-cdk-lib/aws-s3-deployment'
import {DeploymentEnvironment} from '../../types'

export interface CreateBucketProps {
  scope: Stack
  bucketName: string
  deploymentEnvironment: DeploymentEnvironment
}

export interface CreateBucketDeploymentProps {
  scope: Stack
  bucket: IBucket
  filePath: string
  deploymentEnvironment: DeploymentEnvironment
  deploymentName: string
}

export const createBucket = (props: CreateBucketProps): IBucket => {
  const {scope, bucketName, deploymentEnvironment} = props

  return new Bucket(scope, `${bucketName}-${deploymentEnvironment}`, {
    bucketName: `${bucketName}-${deploymentEnvironment}`,
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
  const {scope, bucket, filePath, deploymentEnvironment, deploymentName} = props

  return new BucketDeployment(scope, `${deploymentName}-${deploymentEnvironment}`, {
    destinationBucket: bucket,
    sources: [Source.asset(filePath)],
  })
}
