import {PromiseResult} from 'aws-sdk/lib/request'
import {AWSError, DynamoDB} from 'aws-sdk'

export type DeploymentEnvironment = 'Dev' | 'Prod'

export type CreateAccountRequest = {
  id: string
  addressLineOne: string
  doorNumber: string
  townCity: string
  postCode: string
  numberOfDogs: number
  authenticatedUserId: string
  comment: string
  numberOfWalksRequired: number
  firstName: string
  lastName: string
  emailAddress: string
}

export type UpdateAccountRequest = Pick<
  CreateAccountRequest,
  | 'id'
  | 'doorNumber'
  | 'addressLineOne'
  | 'townCity'
  | 'postCode'
  | 'numberOfDogs'
  | 'numberOfWalksRequired'
  | 'lastName'
  | 'firstName'
  | 'emailAddress'
>

export type QueryResult = {
  message?: string
  result?:
    | PromiseResult<DynamoDB.DocumentClient.PutItemOutput, AWSError>
    | string
    | DynamoDB.DocumentClient.AttributeMap
}
