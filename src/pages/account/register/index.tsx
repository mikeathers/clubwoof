/* eslint-disable */
import {Register} from '@clubwoof-components'
import {useLanguageQuery, useTranslation} from 'next-export-i18n'

function RegisterPage() {
  const {t} = useTranslation()
  const [query] = useLanguageQuery()
  console.log(t('registerPage'))
  return <Register i18n={t('registerPage')} />
}

export default RegisterPage
