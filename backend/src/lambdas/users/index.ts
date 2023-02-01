/* eslint-disable */

import {v4 as uuidv4} from 'uuid'
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import {DynamoDB} from '/opt/nodejs/aws-sdk'

import {CreateUserRequest} from '../../types'
import {validateCreateUserRequest} from '../../validators/validators'
import {addCorsHeader, errorHasMessage} from '../../utils'

const dbClient = new DynamoDB.DocumentClient()

async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  console.log('request:', JSON.stringify(event, undefined, 2))

  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: '',
  }

  addCorsHeader(event)

  try {
    switch (event.httpMethod) {
      case 'GET':
        if (event.pathParameters !== null && event.pathParameters.id) {
          result.body = await getUserById(event.pathParameters.id)
        } else {
          result.body = await getAllUsers()
        }
        break
      case 'POST':
        await createUser(event)
        result.body = 'User has been created successfully.'
        break
    }
  } catch (err) {
    console.error(err)
    result.statusCode = 500

    if (errorHasMessage(err)) result.body = err.message
    else result.body = 'Something went very wrong.'
  }
  return result
}

const getUserById = async (id: string) => {
  try {
    const TableName = process.env.TABLE_NAME
    const Key = id

    const queryResponse = await dbClient
      .query({
        TableName: TableName ?? '',
        IndexName: Key,
        KeyConditionExpression: '#zz = :zzzz',
        ExpressionAttributeNames: {
          '#zz': process.env.PRIMARY_KEY ?? '',
        },
        ExpressionAttributeValues: {
          ':zzzz': Key,
        },
      })
      .promise()
    return JSON.stringify(queryResponse.Items)
  } catch (err) {
    console.log(err)
    throw err
  }
}

const getAllUsers = async () => {
  const queryResponse = await dbClient
    .scan({
      TableName: process.env.TABLE_NAME ?? '',
    })
    .promise()
  return JSON.stringify(queryResponse.Items)
}

const createUser = async (event: APIGatewayProxyEvent) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const authId = event.requestContext.authorizer?.claims['sub'] as string
    if (event.body) {
      const item = JSON.parse(event.body) as CreateUserRequest
      item.id = uuidv4()
      item.authId = authId
      validateCreateUserRequest(item)
      const result = await dbClient
        .put({
          TableName: process.env.TABLE_NAME ?? '',
          Item: item,
        })
        .promise()
      return result
    }
    return null
  } catch (err) {
    console.log(err)
    throw err
  }
}

export {handler}
