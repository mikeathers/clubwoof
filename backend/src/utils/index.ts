import {APIGatewayProxyEvent} from 'aws-lambda'

export function addCorsHeader(result: APIGatewayProxyEvent): void {
  result.headers = {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  }
}

// eslint-disable-next-line
export const errorHasMessage = (obj: any): obj is Error => {
  return typeof obj === 'object' && 'message' in obj
}

export function isIncludedInGroup(group: string, event: APIGatewayProxyEvent): boolean {
  // eslint-disable-next-line
  const groups = event.requestContext.authorizer?.claims['cognito:groups']
  if (groups) {
    return (groups as string).includes(group)
  } else {
    return false
  }
}
