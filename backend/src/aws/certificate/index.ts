import {Stack} from 'aws-cdk-lib'
import {IHostedZone} from 'aws-cdk-lib/aws-route53'
import {DnsValidatedCertificate, ICertificate} from 'aws-cdk-lib/aws-certificatemanager'

export interface CreateCertificateProps {
  scope: Stack
  hostedZone: IHostedZone
  url: string
  name: string
  region?: 'eu-west-2' | 'us-east-1'
}

export const createCertificate = (props: CreateCertificateProps): ICertificate => {
  const {scope, hostedZone, url, name, region} = props

  return new DnsValidatedCertificate(scope, name, {
    domainName: url,
    hostedZone,
    region: region || 'us-east-1', // Cloudfront only checks this region for certificates.
  })
}
