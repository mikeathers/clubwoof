import { Callback, Context } from 'aws-lambda'
import CustomMessage from './custom-message'

if (!process.env.FRONTEND_BASE_URL) {
  throw new Error('Environment variable FRONTEND_BASE_URL is required.')
}

type Event = {
  triggerSource: string
  request: {
    codeParameter: string
    userAttributes: {
      'cognito:user_status': string
      // eslint-disable-next-line camelcase
      given_name: string
      // eslint-disable-next-line camelcase
      family_name: string
      email: string
    }
    usernameParameter: string
  }
  response: {
    emailSubject: string
    emailMessage: string
  }
}

export function main(event: Event, _context: Context, callback: Callback): void {
  const {
    triggerSource,
    request: { codeParameter, userAttributes, usernameParameter },
  } = event

  const customMessage = new CustomMessage({
    userAttributes,
    codeParameter,
    usernameParameter,
  })

  if (triggerSource === 'CustomMessage_SignUp' && userAttributes['cognito:user_status'] === 'UNCONFIRMED') {
    event.response = customMessage.sendCodePostSignUp()
  }

  // Return to Amazon Cognito
  callback(null, event)
}
