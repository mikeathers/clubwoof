/* eslint-disable */
import {DynamoDB} from 'aws-sdk'
import {v4 as uuidv4} from 'uuid'
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import {addCorsHeader, errorHasMessage} from '../../utils'
import {getAllAccounts} from '../account/get-all-accounts'
import {createAccount} from '../account/create-account'
import {updateAccount} from '../account/update-account'
import {deleteAccount} from '../account/delete-account'

const dbClient = new DynamoDB.DocumentClient()

async function handler(event: any) {
  const isSqsEvent = event.Records && event.Records.length > 0
  const isEventBridgeEvent = event['detail-type'] !== undefined

  if (isSqsEvent) {
    await handleSqsEvent(event)
    return
  }

  if (isEventBridgeEvent) {
    await handleEventBridgeEvent(event)
    return
  }

  handleApiGatewayEvent(event)
}

const handleApiGatewayEvent = async (event: APIGatewayProxyEvent) => {
  console.log('request:', JSON.stringify(event, undefined, 2))

  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: '',
  }

  addCorsHeader(event)

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const authenticatedUserId = event.requestContext.authorizer?.claims['sub'] as string

    switch (event.httpMethod) {
      case 'GET':
        if (event.path.includes('get-events-for-account') && event.pathParameters?.id) {
          result.body = JSON.stringify(
            await getEventsForAccount({id: event.pathParameters.id, dbClient}),
          )
        } else {
          result.body = JSON.stringify(await getAllAccounts({dbClient}))
        }
        break
      case 'POST': {
        const res = await createAccount({event, dbClient, authenticatedUserId})
        result.body = JSON.stringify(res)
        break
      }
      case 'PUT': {
        const res = await updateAccount({event, dbClient})
        result.body = JSON.stringify(res)
        break
      }
      case 'DELETE': {
        if (event.pathParameters?.id) {
          const res = await deleteAccount({
            dbClient,
            id: event.pathParameters?.id,
            authenticatedUserId,
          })
          result.body = JSON.stringify(res)
        } else {
          throw new Error('An account Id is missing from the request.')
        }
        break
      }
    }
  } catch (err) {
    console.error(err)
    result.statusCode = 500

    if (errorHasMessage(err)) result.body = err.message
    else result.body = 'Something went very wrong.'
  }
  return result
}

const handleSqsEvent = async (event: any) => {
  for (const record of event.Records) {
    const item = {
      id: uuidv4(),
      ...JSON.parse(record.body),
    }

    await dbClient
      .put({
        TableName: process.env.TABLE_NAME ?? '',
        Item: item,
      })
      .promise()
  }
}

const handleEventBridgeEvent = async (event: any) => {
  const item = {
    id: uuidv4(),
    ...event,
  }

  await dbClient
    .put({
      TableName: process.env.TABLE_NAME ?? '',
      Item: item,
    })
    .promise()
}

export {handler}
