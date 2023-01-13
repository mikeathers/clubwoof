/* eslint-disable */
import {Register} from '@clubwoof-components'
import {useTranslation} from 'next-export-i18n'

function RegisterPage() {
  const {t} = useTranslation()

  return <Register i18n={t('registerPage')} />
}

export default RegisterPage
