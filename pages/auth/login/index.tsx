/* eslint-disable */
import {useTranslation} from 'next-export-i18n'

import {Login} from '@clubwoof-domains'

function LoginPage() {
  const {t} = useTranslation()
  return <Login i18n={t('pages.auth.loginPage')} />
}

export default LoginPage
