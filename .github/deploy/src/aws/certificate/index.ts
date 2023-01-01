import { Stack } from 'aws-cdk-lib'
import { IHostedZone } from 'aws-cdk-lib/aws-route53'
import { DnsValidatedCertificate, ICertificate } from 'aws-cdk-lib/aws-certificatemanager'

export interface CreateCertificateProps {
  scope: Stack
  hostedZone: IHostedZone
  url: string
}

export const createCertificate = (props: CreateCertificateProps): ICertificate => {
  const { scope, hostedZone, url } = props

  return new DnsValidatedCertificate(scope, 'SiteCertificate', {
    domainName: url,
    hostedZone: hostedZone,
    region: 'us-east-1', // Cloudfront only checks this region for certificates.
  })
}
