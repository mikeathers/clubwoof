import {PromiseResult} from 'aws-sdk/lib/request'
import {AWSError, DynamoDB} from 'aws-sdk'

export type DeploymentEnvironment = 'Dev' | 'Prod'

export type CreateAccountRequest = {
  id: string
  address: string
  postCode: string
  numberOfDogs: number
  authId: string
  comment: string
  numberOfWalksRequired: number
  firstName: string
  lastName: string
  emailAddress: string
}

export type QueryResult = {
  message: string
  result?: PromiseResult<DynamoDB.DocumentClient.PutItemOutput, AWSError>
}
