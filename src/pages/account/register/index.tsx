import {Register} from '@clubwoof-components'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {useTranslation} from 'next-i18next'

function RegisterPage() {
  const {t} = useTranslation(['register'])
  return <Register i18n={t} />
}

export async function getStaticProps({locale}: {locale: string}) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['register'])),
      // Will be passed to the page component as props
    },
  }
}

export default RegisterPage
