import {APIGatewayProxyEvent} from 'aws-lambda'
import {DynamoDB} from 'aws-sdk'
import {v4 as uuidv4} from 'uuid'

import {CreateAccountRequest, HttpStatusCode, QueryResult} from '../../types'
import {validateCreateAccountRequest} from '../../validators'
import {queryBySecondaryKey} from '../../aws'
import {publishCreateAccountEvent} from '../../event-bus'

interface CreateAccountProps {
  event: APIGatewayProxyEvent
  dbClient: DynamoDB.DocumentClient
  authenticatedUserId: string
}

export const createAccount = async (props: CreateAccountProps): Promise<QueryResult> => {
  const {event, dbClient, authenticatedUserId} = props

  const tableName = process.env.TABLE_NAME ?? ''

  if (event.body) {
    const item = JSON.parse(event.body) as CreateAccountRequest
    item.id = uuidv4()
    item.authenticatedUserId = authenticatedUserId ?? ''
    validateCreateAccountRequest(item)

    const accountExists = await queryBySecondaryKey({
      queryKey: 'authenticatedUserId',
      queryValue: authenticatedUserId,
      tableName,
      dbClient,
    })

    console.log('ACCOUNT EXISTS: ', accountExists)

    if (accountExists && accountExists.length < 1) {
      await dbClient
        .put({
          TableName: tableName,
          Item: item,
        })
        .promise()

      await publishCreateAccountEvent(item)

      return {
        body: {
          message: 'Account created successfully!',
          result: item,
        },
        statusCode: HttpStatusCode.CREATED,
      }
    } else {
      return {
        body: {
          message: 'Account details already exist for the authenticated user',
        },
        statusCode: HttpStatusCode.BAD_REQUEST,
      }
    }
  }
  return {
    body: {
      message: 'The event is missing a body and cannot be parsed.',
    },
    statusCode: HttpStatusCode.INTERNAL_SERVER,
  }
}
