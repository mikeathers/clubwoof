import {Function, FunctionCode, OriginAccessIdentity} from 'aws-cdk-lib/aws-cloudfront'
import {CanonicalUserPrincipal, PolicyStatement} from 'aws-cdk-lib/aws-iam'
import {IBucket} from 'aws-cdk-lib/aws-s3'
import {Construct} from 'constructs'
import {join} from 'path'
import CONFIG from '../../../config'

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

export const handleAccessIdentity = (scope: Construct, bucket: IBucket) => {
  const cloudfrontOriginAccessIdentity = new OriginAccessIdentity(
    scope,
    `${CONFIG.STACK_PREFIX}-cloud-front-origin-access-identity`,
  )

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

export const getRewriteFunction = (scope: Construct, env: 'prod' | 'dev') => {
  return new Function(scope, `ViewerResponseFunction-${env}`, {
    functionName: `RedirectURIFunction-${env}`,
    code: FunctionCode.fromFile({
      filePath: join(__dirname, '..', '..', 'functions', 'mapping-function.js'),
    }),
    comment: 'adds index.html to requests',
  })
}
