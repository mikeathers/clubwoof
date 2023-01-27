/* eslint-disable */
import {useTranslation} from 'next-export-i18n'

import {ForgotPassword} from '@clubwoof-domains'

function ForgotPasswordPage() {
  const {t} = useTranslation()
  return <ForgotPassword i18n={t('pages.auth.forgotPasswordPage')} />
}

export default ForgotPasswordPage
