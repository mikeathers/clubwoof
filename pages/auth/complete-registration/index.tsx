/* eslint-disable */

import {useTranslation} from 'next-export-i18n'
import {CompleteRegistration} from '@clubwoof-domains'

function CompleteRegistrationPage() {
  const {t} = useTranslation()

  return <CompleteRegistration i18n={t('pages.auth.completeRegistrationPage')} />
}

export default CompleteRegistrationPage
