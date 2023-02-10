import {CreateAccountRequest, UpdateAccountRequest} from '../types'

export type CreateAccountEvent = CreateAccountRequest

export type UpdateAccountEvent = UpdateAccountRequest

export type DeleteAccountEvent = {
  id: string
  userWhoDeletedAccountId: string
}
