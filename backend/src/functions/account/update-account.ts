import {CreateAccountRequest, QueryResult} from '../../types'
import {DynamoDB} from 'aws-sdk'
import {APIGatewayProxyEvent} from 'aws-lambda'

type UpdateAccount = Pick<
  CreateAccountRequest,
  | 'id'
  | 'address'
  | 'postCode'
  | 'numberOfDogs'
  | 'numberOfWalksRequired'
  | 'lastName'
  | 'firstName'
  | 'emailAddress'
>

interface UpdateAccountProps {
  event: APIGatewayProxyEvent
  dbClient: DynamoDB.DocumentClient
}

export const updateAccount = async (props: UpdateAccountProps): Promise<QueryResult> => {
  const tableName = process.env.TABLE_NAME ?? ''
  const {dbClient, event} = props

  if (event.body) {
    console.log('EVENT BODY: ', event.body)
    const updateAccountData = JSON.parse(event.body) as UpdateAccount
    const {
      id,
      address,
      postCode,
      numberOfWalksRequired,
      numberOfDogs,
      firstName,
      lastName,
      emailAddress,
    } = updateAccountData

    const params = {
      TableName: tableName,
      Key: {id},
      UpdateExpression:
        'SET address = :address, postCode = :postCode, numberOfWalksRequired = :numberOfWalksRequired, ' +
        'numberOfDogs = :numberOfDogs, lastName = :lastName, firstName = :firstName, emailAddress = :emailAddress',
      ExpressionAttributeValues: {
        ':address': address,
        ':postCode': postCode,
        ':numberOfWalksRequired': numberOfWalksRequired,
        ':numberOfDogs': numberOfDogs,
        ':lastName': lastName,
        ':firstName': firstName,
        ':emailAddress': emailAddress,
      },
      ReturnValues: 'UPDATED_NEW',
    }

    const result = await dbClient.update(params).promise()
    console.log('RESULT: ', result)
    return {
      message: 'Account updated successfully.',
      result,
    }
  }

  return {
    message: 'Event has no body so account cannot be updated.',
  }
}
