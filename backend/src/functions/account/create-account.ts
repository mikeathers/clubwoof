import {APIGatewayProxyEvent} from 'aws-lambda'
import {v4 as uuidv4} from 'uuid'
import {DynamoDB} from 'aws-sdk'

import {CreateAccountRequest} from '../../types'
import {validateCreateAccountRequest} from '../../validators'

interface CreateAccountProps {
  event: APIGatewayProxyEvent
  dbClient: DynamoDB.DocumentClient
}
export const createAccount = async (props: CreateAccountProps) => {
  const {event, dbClient} = props
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const authId = event.requestContext.authorizer?.claims['sub'] as string
    if (event.body) {
      const item = JSON.parse(event.body) as CreateAccountRequest
      item.id = uuidv4()
      item.authId = authId
      validateCreateAccountRequest(item)
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
