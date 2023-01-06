import {object, ref, string} from 'yup'
import {HiUser} from 'react-icons/hi2'
import {HiAtSymbol} from 'react-icons/hi'
import {BiLockAlt} from 'react-icons/bi'

const PASSWORD_TOO_SHORT = 'Password length should be at least 4 characters.'
const PASSWORD_TOO_LONG = 'Password cannot exceed more than 12 characters.'
const PASSWORD_INVALID =
  'Password must contain at least one lowercase and uppercase character, a number and a special character.'

const passwordValidation = (value: string | undefined) => {
  if (!value) return false
  const hasUpperCase = /[A-Z]/.test(value)
  const hasLowerCase = /[a-z]/.test(value)
  const hasNumber = /[0-9]/.test(value)
  const hasSymbol = /[!@#$%&*]/.test(value)
  let validConditions = 0
  const numberOfMustBeValidConditions = 4
  const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbol]
  conditions.forEach((condition) => (condition ? (validConditions += 1) : null))
  return validConditions >= numberOfMustBeValidConditions
}
export const formSchema = object({
  firstName: string().required('First name is required.'),
  lastName: string().required('Last name is required.'),
  email: string()
    .email('Please enter a valid email address e.g. joe@gmail.com.')
    .required('Email is required.'),
  password: string()
    .required('Password is required.')
    .min(6, PASSWORD_TOO_SHORT)
    .max(12, PASSWORD_TOO_LONG)
    .test('isValidPassword', PASSWORD_INVALID, (value) => passwordValidation(value)),
  confirmPassword: string()
    .required('Confirm password is required.')
    .min(6, PASSWORD_TOO_SHORT)
    .max(12, PASSWORD_TOO_LONG)
    .test('isValidPassword', PASSWORD_INVALID, (value) => passwordValidation(value))
    .oneOf([ref('password')], 'Passwords do not match.'),
})

export const inputs = [
  {
    icon: HiUser,
    ariaLabel: 'First name',
    name: 'firstName',
    type: 'name',
    placeholder: 'First name',
  },
  {
    icon: HiUser,
    ariaLabel: 'Last name',
    name: 'lastName',
    type: 'name',
    placeholder: 'Last name',
  },
  {
    icon: HiAtSymbol,
    ariaLabel: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Email',
  },
  {
    icon: BiLockAlt,
    ariaLabel: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  },
  {
    icon: BiLockAlt,
    ariaLabel: 'Confirm password',
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm password',
  },
]
