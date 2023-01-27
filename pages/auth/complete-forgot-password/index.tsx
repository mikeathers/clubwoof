/* eslint-disable */

import {useTranslation} from 'next-export-i18n'
import {CompleteForgotPassword} from '@clubwoof-domains'

function CompleteForgotPasswordPage() {
  const {t} = useTranslation()

  return <CompleteForgotPassword i18n={t('pages.auth.completeForgotPasswordPage')} />
}

export default CompleteForgotPasswordPage
