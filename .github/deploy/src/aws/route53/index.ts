import { Stack } from 'aws-cdk-lib'
import { ARecord, HostedZone, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53'
import { IDistribution } from 'aws-cdk-lib/aws-cloudfront'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'

export interface GetHostedZoneProps {
  scope: Stack
  domainName: string
}

export const getHostedZone = (props: GetHostedZoneProps): IHostedZone => {
  const { scope, domainName } = props

  return HostedZone.fromLookup(scope, 'HostedZone', { domainName: domainName })
}

export interface CreateARecordForDistributionProps {
  scope: Stack
  hostedZone: IHostedZone
  domainName: string
  distribution: IDistribution
}

export const createARecordForDistribution = (props: CreateARecordForDistributionProps): ARecord => {
  const { scope, hostedZone, domainName, distribution } = props

  return new ARecord(scope, 'ARecord', {
    recordName: domainName,
    target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    zone: hostedZone,
  })
}
