import {APIGatewayProxyEvent} from 'aws-lambda'
import {DynamoDB} from 'aws-sdk'
import {v4 as uuidv4} from 'uuid'

import {CreateAccountRequest, QueryResult} from '../../types'
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
        message: 'Account created successfully!',
        result: item,
      }
    } else {
      return {
        message: 'Account details already exist for the authenticated user',
      }
    }
  }
  return {
    message: 'The event is missing a body and cannot be parsed.',
  }
}
