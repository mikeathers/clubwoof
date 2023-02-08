import {APIGatewayProxyEvent} from 'aws-lambda'
import {DynamoDB, EventBridge} from 'aws-sdk'

import {CreateAccountRequest, QueryResult} from '../../types'
import {validateCreateAccountRequest} from '../../validators'
import {v4 as uuidv4} from 'uuid'

interface CreateAccountProps {
  event: APIGatewayProxyEvent
  dbClient: DynamoDB.DocumentClient
}

interface CheckAccountDetailsAlreadyExistProps {
  authId: string
  tableName: string
  dbClient: DynamoDB.DocumentClient
}

const publishCreateUserEvent = async (requestDetails: CreateAccountRequest) => {
  const params = {
    Entries: [
      {
        Source: 'Account',
        Detail: JSON.stringify({action: 'CreateAccount', data: requestDetails}),
        DetailType: 'Account',
        Time: new Date(),
        EventBusName: process.env.EVENT_BUS_NAME,
      },
    ],
  }
  const ebClient = new EventBridge()
  await ebClient.putEvents(params).promise()
}

export const createAccount = async (props: CreateAccountProps): Promise<QueryResult> => {
  const {event, dbClient} = props
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const authId = event.requestContext.authorizer?.claims['sub'] as string

  const tableName = process.env.TABLE_NAME ?? ''

  if (event.body) {
    const item = JSON.parse(event.body) as CreateAccountRequest
    item.id = uuidv4()
    item.authId = authId ?? ''
    validateCreateAccountRequest(item)

    const accountExists = await checkAccountDetailsAlreadyExists({
      authId,
      tableName,
      dbClient,
    })

    if (!accountExists) {
      const result = await dbClient
        .put({
          TableName: tableName,
          Item: item,
        })
        .promise()

      await publishCreateUserEvent(item)

      return {
        message: 'Account created successfully!',
        result,
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

const checkAccountDetailsAlreadyExists = async (
  props: CheckAccountDetailsAlreadyExistProps,
): Promise<boolean> => {
  const {authId, tableName, dbClient} = props
  try {
    const queryKey = 'authId'
    const queryValue = authId

    const queryResponse = await dbClient
      .query({
        TableName: tableName ?? '',
        IndexName: queryKey,
        KeyConditionExpression: '#zz = :zzzz',
        ExpressionAttributeNames: {
          '#zz': queryKey,
        },
        ExpressionAttributeValues: {
          ':zzzz': queryValue,
        },
      })
      .promise()
    if (queryResponse.Items && queryResponse.Items.length > 0) {
      return true
    }
    return false
  } catch (err) {
    console.log(err)
    throw err
  }
}
