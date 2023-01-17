import {object, ref, string} from 'yup'
import {HiUser} from 'react-icons/hi2'
import {HiAtSymbol} from 'react-icons/hi'
import {BiLockAlt, BiLockOpenAlt} from 'react-icons/bi'
import {passwordValidation} from '@clubwoof-utils'

export const formSchema = (i18n: i18nRegisterPage) =>
  object({
    firstName: string().required(i18n.validation.firstName),
    lastName: string().required(i18n.validation.lastName),
    email: string().email(i18n.validation.emailFormat).required(i18n.validation.email),
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

export const inputs = (i18n: i18nRegisterPage) => {
  return [
    {
      icon: HiUser,
      ariaLabel: i18n.inputs.firstName,
      name: 'firstName',
      type: 'name',
      placeholder: i18n.inputs.firstName,
    },
    {
      icon: HiUser,
      ariaLabel: i18n.inputs.lastName,
      name: 'lastName',
      type: 'name',
      placeholder: i18n.inputs.lastName,
    },
    {
      icon: HiAtSymbol,
      ariaLabel: i18n.inputs.email,
      name: 'email',
      type: 'email',
      placeholder: i18n.inputs.email,
    },
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
