import { HiUser } from 'react-icons/hi2'
import { HiAtSymbol } from 'react-icons/hi'
import { BiLockAlt } from 'react-icons/bi'

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
]
