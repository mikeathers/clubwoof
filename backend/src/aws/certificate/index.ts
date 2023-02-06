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

interface Certificate {
  url: string
  name: string
}
export interface CreateApiCertificatesProps {
  scope: Stack
  hostedZone: IHostedZone
  certificates: Certificate[]
  region?: 'eu-west-2' | 'us-east-1'
}

export interface CreatedCertificates {
  accountCertificate: ICertificate
  authCertificate: ICertificate
}
export const createApiCertificates = (
  props: CreateApiCertificatesProps,
): CreatedCertificates => {
  const {scope, hostedZone, certificates, region} = props

  const createdCerts = certificates.map((certificate) => {
    return createCertificate({
      scope,
      url: certificate.url,
      hostedZone,
      name: certificate.name,
      region,
    })
  })

  return {accountCertificate: createdCerts[0], authCertificate: createdCerts[1]}
}
