import {Stack} from 'aws-cdk-lib'
import {ARecord, HostedZone, IHostedZone, RecordTarget} from 'aws-cdk-lib/aws-route53'
import {IDistribution} from 'aws-cdk-lib/aws-cloudfront'
import {CloudFrontTarget} from 'aws-cdk-lib/aws-route53-targets'
import CONFIG from '../../config'

export interface GetHostedZoneProps {
  scope: Stack
  domainName: string
}

export const getHostedZone = (props: GetHostedZoneProps): IHostedZone => {
  const {scope, domainName} = props

  return HostedZone.fromLookup(scope, `${CONFIG.STACK_PREFIX}HostedZone`, {domainName})
}

export interface CreateARecordForDistributionProps {
  scope: Stack
  hostedZone: IHostedZone
  url: string
  distribution: IDistribution
  name: string
}

export const createARecordForDistribution = (
  props: CreateARecordForDistributionProps,
): ARecord => {
  const {scope, hostedZone, url, distribution, name} = props

  return new ARecord(scope, name, {
    recordName: url,
    target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    zone: hostedZone,
  })
}
