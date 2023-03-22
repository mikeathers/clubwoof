import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import {DynamoDB} from 'aws-sdk'

import {addCorsHeader, errorHasMessage} from '../../utils'
import {createAccount} from './create-account'
import {getAccountById} from './get-account-by-id'
import {getAllAccounts} from './get-all-accounts'
import {updateAccount} from './update-account'
import {deleteAccount} from './delete-account'
import {HttpStatusCode} from '../../types'

const dbClient = new DynamoDB.DocumentClient()

async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  console.log('request:', JSON.stringify(event, undefined, 2))

  const result: APIGatewayProxyResult = {
    statusCode: HttpStatusCode.OK,
    body: '',
  }

  addCorsHeader(event)

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const authenticatedUserId = event.requestContext.authorizer?.claims['sub'] as string

    switch (event.httpMethod) {
      case 'GET':
        if (event.pathParameters?.id) {
          const response = await getAccountById({id: event.pathParameters.id, dbClient})
          result.body = JSON.stringify(response.body)
          result.statusCode = response.statusCode
        } else {
          const response = await getAllAccounts({dbClient})
          result.body = JSON.stringify(response.body)
          result.statusCode = response.statusCode
        }
        break
      case 'POST': {
        const response = await createAccount({event, dbClient, authenticatedUserId})
        result.body = JSON.stringify(response.body)
        result.statusCode = response.statusCode
        break
      }
      case 'PUT': {
        const response = await updateAccount({event, dbClient})
        result.body = JSON.stringify(response.body)
        result.statusCode = response.statusCode
        break
      }
      case 'DELETE': {
        if (event.pathParameters?.id) {
          const response = await deleteAccount({
            dbClient,
            id: event.pathParameters?.id,
            authenticatedUserId,
          })
          result.body = JSON.stringify(response.body)
          result.statusCode = response.statusCode
        } else {
          throw new Error('An account Id is missing from the request.')
        }
        break
      }
      default:
        throw new Error(`Unsupported route: "${event.httpMethod}"`)
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
