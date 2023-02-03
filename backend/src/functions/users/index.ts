import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import {DynamoDB} from 'aws-sdk'
import {addCorsHeader, errorHasMessage} from '../../utils'
import {createUser} from './create-user'
import {getUserById} from './get-user-by-id'
import {getAllUsers} from './get-all-users'

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
          result.body = await getUserById({id: event.pathParameters.id, dbClient})
        } else {
          result.body = await getAllUsers({dbClient})
        }
        break
      case 'POST':
        await createUser({event, dbClient})
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

export {handler}
