import {join} from 'path'
import {CanonicalUserPrincipal, PolicyStatement} from 'aws-cdk-lib/aws-iam'
import {IBucket} from 'aws-cdk-lib/aws-s3'
import {Construct} from 'constructs'
import {
  Function,
  FunctionCode,
  IFunction,
  OriginAccessIdentity,
} from 'aws-cdk-lib/aws-cloudfront'

import {DeploymentEnvironment} from '../../types'
import CONFIG from '../../config'

export const isMasterBranch = (branchName: string): boolean => {
  return branchName === 'main'
}

export interface GetSubDomainNameProps {
  subDomainName: string
  branchName: string
}

export interface GetUrlProps {
  domainName: string
  branchedSubDomainName: string
}

interface GetReWriteFunctionProps {
  scope: Construct
  stage: DeploymentEnvironment
}

export const getBranchedSubDomainName = (props: GetSubDomainNameProps): string => {
  const {subDomainName, branchName} = props
  return isMasterBranch(branchName) ? subDomainName : `${subDomainName}-${branchName}`
}

export const getUrl = (props: GetUrlProps): string => {
  const {domainName, branchedSubDomainName} = props
  return `${branchedSubDomainName}.${domainName}`
}

export const getGithubRepositoryName = (githubRepository: string): string => {
  /*
    The GITHUB_REPOSITORY env var provided by GitHub Actions includes the owner
    of the repository and the repository name.

    We only want the repository name.

    E.g. tylangesmith-organisation/nextjs-serverless-static-site
          ==> nextjs-serverless-static-site
  */
  return githubRepository.split('/')[1]
}

export interface GetStackNameProps {
  githubRepository: string
  branchName: string
}

export const getStackName = (props: GetStackNameProps): string => {
  const {githubRepository, branchName} = props
  const githubRepositoryName = getGithubRepositoryName(githubRepository)
  return `${githubRepositoryName}-${branchName}`
}

interface HandleAccessIdentityProps {
  scope: Construct
  bucket: IBucket
  name: string
}
export const handleAccessIdentity = (
  props: HandleAccessIdentityProps,
): OriginAccessIdentity => {
  const {scope, bucket, name} = props
  const cloudfrontOriginAccessIdentity = new OriginAccessIdentity(scope, name)

  bucket.grantRead(cloudfrontOriginAccessIdentity)

  bucket.addToResourcePolicy(
    new PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [bucket.arnForObjects('*')],
      principals: [
        new CanonicalUserPrincipal(
          cloudfrontOriginAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId,
        ),
      ],
    }),
  )

  return cloudfrontOriginAccessIdentity
}

export const getRewriteFunction = (props: GetReWriteFunctionProps): IFunction => {
  const {scope, stage} = props
  return new Function(scope, `${CONFIG.STACK_PREFIX}ViewerResponseFunction-${stage}`, {
    functionName: `${CONFIG.STACK_PREFIX}RedirectURIFunction-${stage}`,
    code: FunctionCode.fromFile({
      filePath: join(__dirname, './mapping-function.js'),
    }),
    comment: 'adds index.html to requests',
  })
}
