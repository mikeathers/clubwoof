import {HiAtSymbol} from 'react-icons/hi'
import {BiLockAlt} from 'react-icons/bi'
import {object, string} from 'yup'

export const formSchema = (i18n: i18nLoginPage) =>
  object({
    email: string().email(i18n.validation.emailFormat).required(i18n.validation.email),
    password: string().required(i18n.validation.password),
  })

export const inputs = (i18n: i18nLoginPage) => {
  return [
    {
      icon: HiAtSymbol,
      ariaLabel: i18n.inputs.email,
      name: 'email',
      type: 'email',
      placeholder: i18n.inputs.email,
    },
    {
      icon: BiLockAlt,
      ariaLabel: i18n.inputs.password,
      name: 'password',
      type: 'password',
      placeholder: i18n.inputs.password,
    },
  ]
}
