import {object, ref, string} from 'yup'
import {BiLockAlt, BiLockOpenAlt} from 'react-icons/bi'
import {passwordValidation} from '@clubwoof-utils'

export const formSchema = (i18n: i18nCompleteForgotPasswordPage) =>
  object({
    password: string()
      .required(i18n.validation.password)
      .min(6, i18n.validation.passwordTooShort)
      .max(12, i18n.validation.passwordTooLong)
      .test('isValidPassword', i18n.validation.passwordFormat, (value) =>
        passwordValidation(value),
      ),
    confirmPassword: string()
      .required(i18n.validation.confirmPassword)
      .min(6, i18n.validation.passwordTooShort)
      .max(12, i18n.validation.passwordTooLong)
      .oneOf([ref('password')], i18n.validation.passwordsDoNotMatch),
  })

export const inputs = (i18n: i18nCompleteForgotPasswordPage) => {
  return [
    {
      icon: BiLockOpenAlt,
      ariaLabel: i18n.inputs.password,
      name: 'password',
      type: 'password',
      placeholder: i18n.inputs.password,
    },
    {
      icon: BiLockAlt,
      ariaLabel: i18n.inputs.confirmPassword,
      name: 'confirmPassword',
      type: 'password',
      placeholder: i18n.inputs.confirmPassword,
    },
  ]
}
