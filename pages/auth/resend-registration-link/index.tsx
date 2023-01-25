/* eslint-disable */
import {ResendRegistrationLink} from '@clubwoof-domains'
import {useTranslation} from 'next-export-i18n'

function ResendRegistrationLinkPage() {
  const {t} = useTranslation()

  return <ResendRegistrationLink i18n={t('pages.auth.resendRegistrationLinkPage')} />
}

export default ResendRegistrationLinkPage
