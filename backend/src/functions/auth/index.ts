import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'

import {addCorsHeader, errorHasMessage} from '../../utils'
import {getAccountInfo} from './get-account-info'
import {login} from './login'
import {register} from './register'

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
        if (event.path.includes('get-account-info')) {
          result.body = JSON.stringify(await getAccountInfo())
        }
        break
      case 'POST':
        if (event.path.includes('login')) {
          result.body = JSON.stringify(await login(JSON.parse(event.body ?? '')))
        }
        if (event.path.includes('register')) {
          result.body = JSON.stringify(await register(JSON.parse(event.body ?? '')))
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

export {handler}
