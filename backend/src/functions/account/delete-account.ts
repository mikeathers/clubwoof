import {DynamoDB} from 'aws-sdk'
import {HttpStatusCode, QueryResult} from '../../types'
import {publishDeleteAccountEvent} from '../../event-bus'

interface DeleteAccountProps {
  id: string
  dbClient: DynamoDB.DocumentClient
  authenticatedUserId: string
}

export const deleteAccount = async (props: DeleteAccountProps): Promise<QueryResult> => {
  const tableName = process.env.TABLE_NAME ?? ''
  const {dbClient, id, authenticatedUserId} = props

  const params = {
    TableName: tableName,
    Key: {id},
    ReturnValues: 'ALL_OLD',
  }

  const result = await dbClient.delete(params).promise()
  if (result.Attributes) {
    await publishDeleteAccountEvent({
      id,
      userWhoDeletedAccountId: authenticatedUserId,
    })

    return {
      body: {
        message: `Account ${id} has been deleted successfully.`,
        result,
      },
      statusCode: HttpStatusCode.OK,
    }
  }

  return {
    body: {
      message: `Account ${id} was not deleted because it does not exist.`,
    },
    statusCode: HttpStatusCode.BAD_REQUEST,
  }
}
