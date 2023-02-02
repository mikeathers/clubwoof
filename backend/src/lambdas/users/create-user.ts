import {APIGatewayProxyEvent} from 'aws-lambda'
import {v4 as uuidv4} from 'uuid'
import {DynamoDB} from 'aws-sdk'

import {CreateUserRequest} from '../../types'
import {validateCreateUserRequest} from '../../validators/users'

interface CreateUserProps {
  event: APIGatewayProxyEvent
  dbClient: DynamoDB.DocumentClient
}
export const createUser = async (props: CreateUserProps) => {
  const {event, dbClient} = props
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
