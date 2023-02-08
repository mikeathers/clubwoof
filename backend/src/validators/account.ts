import {CreateAccountRequest} from '../types'

export class MissingFieldError extends Error {}

// eslint-disable-next-line
export const validateCreateAccountRequest = (arg: CreateAccountRequest): void => {
  if (!arg.address) {
    throw new MissingFieldError('Value for address required!')
  }
  if (!arg.postCode) {
    throw new MissingFieldError('Value for postCode required!')
  }
  if (!arg.id) {
    throw new MissingFieldError('Value for id required!')
  }
  if (!arg.numberOfDogs) {
    throw new MissingFieldError('Value for numberOfDogs required!')
  }
  if (!arg.numberOfWalksRequired) {
    throw new MissingFieldError('Value for numberOfWalksRequired required!')
  }
  if (!arg.comment) {
    throw new MissingFieldError('Value for comment required!')
  }
  if (!arg.authId) {
    throw new MissingFieldError('Value for authId required!')
  }
}
