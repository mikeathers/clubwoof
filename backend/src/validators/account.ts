import {CreateAccountRequest} from '../types'

export class MissingFieldError extends Error {}

// eslint-disable-next-line
export const validateCreateAccountRequest = (arg: CreateAccountRequest): void => {
  if (!arg.doorNumber) {
    throw new MissingFieldError('Value for doorNumber required!')
  }
  if (!arg.townCity) {
    throw new MissingFieldError('Value for townCity required!')
  }
  if (!arg.addressLineOne) {
    throw new MissingFieldError('Value for addressLineOne required!')
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
  if (!arg.authenticatedUserId) {
    throw new MissingFieldError('Value for authenticatedUserId required!')
  }
}
