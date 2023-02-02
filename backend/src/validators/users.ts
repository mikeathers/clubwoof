import {CreateUserRequest} from '../types'

export class MissingFieldError extends Error {}

// eslint-disable-next-line
export const validateCreateUserRequest = (arg: any): void => {
  if (!(arg as CreateUserRequest).address) {
    throw new MissingFieldError('Value for address required!')
  }
  if (!(arg as CreateUserRequest).postCode) {
    throw new MissingFieldError('Value for postCode required!')
  }
  if (!(arg as CreateUserRequest).id) {
    throw new MissingFieldError('Value for id required!')
  }
  if (!(arg as CreateUserRequest).numberOfDogs) {
    throw new MissingFieldError('Value for numberOfDogs required!')
  }
  if (!(arg as CreateUserRequest).numberOfWalksRequired) {
    throw new MissingFieldError('Value for numberOfWalksRequired required!')
  }
  if (!(arg as CreateUserRequest).comment) {
    throw new MissingFieldError('Value for comment required!')
  }
  if (!(arg as CreateUserRequest).authId) {
    throw new MissingFieldError('Value for authId required!')
  }
}
