import { HeadersFrameOption, HeadersReferrerPolicy, ResponseHeadersPolicy } from 'aws-cdk-lib/aws-cloudfront'
import { Duration, Stack } from 'aws-cdk-lib'

export const getSecurityHeader = (scope: Stack) => {
  return new ResponseHeadersPolicy(scope, 'security-headers-response-header-policy', {
    comment: 'Security headers response header policy',
    securityHeadersBehavior: {
      contentSecurityPolicy: {
        override: true,
        contentSecurityPolicy: "default-src 'self'",
      },
      strictTransportSecurity: {
        override: true,
        accessControlMaxAge: Duration.days(2 * 365),
        includeSubdomains: true,
        preload: true,
      },
      contentTypeOptions: {
        override: true,
      },
      referrerPolicy: {
        override: true,
        referrerPolicy: HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
      },
      xssProtection: {
        override: true,
        protection: true,
        modeBlock: true,
      },
      frameOptions: {
        override: true,
        frameOption: HeadersFrameOption.DENY,
      },
    },
  })
}
