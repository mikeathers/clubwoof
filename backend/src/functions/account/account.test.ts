import {v4 as uuidv4} from 'uuid'
import {sampleAPIGatewayEvent} from '../../test-utils/__mocks__'
import {HttpStatusCode} from '../../types'
import {getByPrimaryKey} from '../../aws'
import {mocked} from 'jest-mock'
import {DynamoDB} from 'aws-sdk'
import {queryBySecondaryKey} from '../../aws'

jest.mock('../../aws')
jest.mock('../../event-bus')
jest.mock('uuid')

const mockGetByPrimaryKey = mocked(getByPrimaryKey)
const mockQueryBySecondaryKey = mocked(queryBySecondaryKey)
const mockUuid = mocked(uuidv4)
const mockedScan = jest.fn()
const mockedPut = jest.fn()

let optionsUsedToConstructDocumentClient: DynamoDB.Types.ClientConfiguration
jest.doMock('aws-sdk', () => ({
  EventBridge: jest.fn(),
  DynamoDB: {
    DocumentClient: jest.fn((options) => {
      optionsUsedToConstructDocumentClient = options

      return {
        scan: mockedScan,
        put: mockedPut,
      }
    }),
  },
}))

import {handler} from './index'

const result = {
  townCity: 'Melling',
  lastName: 'Bloggs',
  numberOfDogs: 3,
  firstName: 'Mike',
  addressLineOne: 'Artisan Drive',
  emailAddress: 'mikeatherton06@gmail.com',
  postCode: 'L31 1FL',
  comment: 'Great commets',
  numberOfWalksRequired: 13,
  doorNumber: '12',
  id: '8f9e060d-3028-411a-9a00-d3b00966638b',
  authenticatedUserId: '12345',
}

const body = {
  townCity: 'Melling',
  lastName: 'Bloggs',
  numberOfDogs: 3,
  firstName: 'Mike',
  addressLineOne: 'Artisan Drive',
  emailAddress: 'mikeatherton06@gmail.com',
  postCode: 'L31 1FL',
  comment: 'Great commets',
  numberOfWalksRequired: 13,
  doorNumber: '12',
}

describe('Account handler', () => {
  beforeEach(() => {
    process.env.TABLE_NAME = 'Clubwoof-Accounts-Dev'
    jest.resetAllMocks()
  })
  describe('GET getAccountById', () => {
    it('should return a 200 (OK) if the account is found with the provided id', async () => {
      mockGetByPrimaryKey.mockResolvedValue({
        Item: result as AWS.DynamoDB.DocumentClient.AttributeValue,
      })
      await expect(
        handler({
          ...sampleAPIGatewayEvent,
          httpMethod: 'GET',
          pathParameters: {id: '1234'},
        }),
      ).resolves.toEqual({
        statusCode: HttpStatusCode.OK,
        body: JSON.stringify({message: 'Account has been found.', result}),
      })
    })

    it('should return a 400 (Bad Request) if the account is not found using the provided id', async () => {
      const id = '1234'
      mockGetByPrimaryKey.mockResolvedValue({})
      await expect(
        handler({
          ...sampleAPIGatewayEvent,
          httpMethod: 'GET',
          pathParameters: {id},
        }),
      ).resolves.toEqual({
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: JSON.stringify({message: `Account with Id: ${id} does not exist.`}),
      })
    })
  })
  describe('GET allAccounts', () => {
    it('should return a 200 (OK) if accounts are found', async () => {
      mockedScan.mockImplementation(() => {
        return {
          promise: () => ({
            Items: [result, result, result],
          }),
        }
      })

      await expect(
        handler({
          ...sampleAPIGatewayEvent,
          httpMethod: 'GET',
          pathParameters: null,
        }),
      ).resolves.toEqual({
        statusCode: HttpStatusCode.OK,
        body: JSON.stringify({result: [result, result, result]}),
      })
    })
    it('should return a 200 (OK) if no results are found', async () => {
      mockedScan.mockImplementation(() => {
        return {
          promise: () => ({
            Items: [],
          }),
        }
      })
      await expect(
        handler({
          ...sampleAPIGatewayEvent,
          httpMethod: 'GET',
          pathParameters: null,
        }),
      ).resolves.toEqual({
        statusCode: HttpStatusCode.OK,
        body: JSON.stringify({result: []}),
      })
    })
  })
  describe('POST createAccount', () => {
    it('should return a 200 (OK) if account is created', async () => {
      mockQueryBySecondaryKey.mockResolvedValue([])
      mockUuid.mockReturnValue('8f9e060d-3028-411a-9a00-d3b00966638b')
      mockedPut.mockImplementation(() => {
        return {
          promise: () => ({
            Item: result,
          }),
        }
      })

      await expect(
        handler({
          ...sampleAPIGatewayEvent,
          httpMethod: 'POST',
          pathParameters: null,
          body: JSON.stringify(body),
        }),
      ).resolves.toEqual({
        statusCode: HttpStatusCode.CREATED,
        body: JSON.stringify({
          message: 'Account created successfully!',
          result,
        }),
      })
    })
  })
})
