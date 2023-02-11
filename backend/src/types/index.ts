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
  body: {
    message?: string
    result?:
      | PromiseResult<DynamoDB.DocumentClient.PutItemOutput, AWSError>
      | string
      | DynamoDB.DocumentClient.AttributeMap
  }
  statusCode: number
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  MULTI_STATUS = 207,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER = 500,
}
