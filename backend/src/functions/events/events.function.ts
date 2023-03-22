/* eslint-disable */
import {DynamoDB} from 'aws-sdk'
import {v4 as uuidv4} from 'uuid'
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import {addCorsHeader, errorHasMessage} from '../../utils'
import {getEventsForAccount} from './get-events-for-account'
import {getAllEvents} from './get-all-events'

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
  return await handleApiGatewayEvent(event)
}

const handleApiGatewayEvent = async (event: APIGatewayProxyEvent) => {
  console.log('request:', JSON.stringify(event, undefined, 2))

  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: '',
  }

  addCorsHeader(event)

  try {
    switch (event.httpMethod) {
      case 'GET':
        if (event.path.includes('get-events-for-account') && event.pathParameters?.id) {
          const events = JSON.stringify(
            await getEventsForAccount({id: event.pathParameters.id, dbClient}),
          )
          console.log('EVENTS FOR ACCOUNT: ', events)
          result.body = events
        } else {
          const events = JSON.stringify(await getAllEvents({dbClient}))
          console.log('ALL EVENTS: ', events)
          result.body = events
        }
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

const handleSqsEvent = async (event: any) => {
  for (const record of event.Records) {
    if (!record.body.detail) return

    const item = {
      id: uuidv4(),
      accountId: record.body.detail.accountId,
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
    accountId: event.detail.accountId,
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
