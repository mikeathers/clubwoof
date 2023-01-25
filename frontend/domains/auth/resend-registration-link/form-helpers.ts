import {HiAtSymbol} from 'react-icons/hi'
import {object, string} from 'yup'

export const formSchema = (i18n: i18nResendRegistrationLink) =>
  object({
    email: string().email(i18n.validation.emailFormat).required(i18n.validation.email),
  })

export const inputs = (i18n: i18nResendRegistrationLink) => {
  return [
    {
      icon: HiAtSymbol,
      ariaLabel: i18n.inputs.email,
      name: 'email',
      type: 'email',
      placeholder: i18n.inputs.email,
    },
  ]
}
