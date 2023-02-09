import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import {DynamoDB} from 'aws-sdk'
import {addCorsHeader, errorHasMessage} from '../../utils'
import {createAccount} from './create-account'
import {getAccountById} from './get-account-by-id'
import {getAllAccounts} from './get-all-accounts'
import {updateAccount} from './update-account'
import {deleteAccount} from './delete-account'

const dbClient = new DynamoDB.DocumentClient()

async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
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
        if (event.pathParameters?.id) {
          result.body = JSON.stringify(
            await getAccountById({id: event.pathParameters.id, dbClient}),
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

export {handler}
