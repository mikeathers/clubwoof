/* eslint-disable */
import {DynamoDB} from 'aws-sdk'
import {v4 as uuidv4} from 'uuid'

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
