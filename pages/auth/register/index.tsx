/* eslint-disable */
import {Register} from '@clubwoof-domains'
import {useTranslation} from 'next-export-i18n'

function RegisterPage() {
  const {t} = useTranslation()
  return <Register i18n={t('pages.auth.registerPage')} />
}

export default RegisterPage
