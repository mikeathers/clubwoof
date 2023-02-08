import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import {DynamoDB} from 'aws-sdk'
import {addCorsHeader, errorHasMessage} from '../../utils'
import {createAccount} from './create-account'
import {getAccountById} from './get-account-by-id'
import {getAllAccounts} from './get-all-accounts'

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
          result.body = await getAccountById({id: event.pathParameters.id, dbClient})
        } else {
          result.body = await getAllAccounts({dbClient})
        }
        break
      case 'POST': {
        const res = await createAccount({event, dbClient})
        result.body = JSON.stringify(res)
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
