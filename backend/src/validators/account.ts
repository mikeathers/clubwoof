import {CreateAccountRequest} from '../types'

export class MissingFieldError extends Error {}

// eslint-disable-next-line
export const validateCreateAccountRequest = (arg: any): void => {
  if (!(arg as CreateAccountRequest).address) {
    throw new MissingFieldError('Value for address required!')
  }
  if (!(arg as CreateAccountRequest).postCode) {
    throw new MissingFieldError('Value for postCode required!')
  }
  if (!(arg as CreateAccountRequest).id) {
    throw new MissingFieldError('Value for id required!')
  }
  if (!(arg as CreateAccountRequest).numberOfDogs) {
    throw new MissingFieldError('Value for numberOfDogs required!')
  }
  if (!(arg as CreateAccountRequest).numberOfWalksRequired) {
    throw new MissingFieldError('Value for numberOfWalksRequired required!')
  }
  if (!(arg as CreateAccountRequest).comment) {
    throw new MissingFieldError('Value for comment required!')
  }
  if (!(arg as CreateAccountRequest).authId) {
    throw new MissingFieldError('Value for authId required!')
  }
}
