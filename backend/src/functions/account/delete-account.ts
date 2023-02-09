import {DynamoDB} from 'aws-sdk'
import {QueryResult} from '../../types'
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
      idOfDeletedAccount: id,
      idOFUserWhoTriggerEvent: authenticatedUserId,
    })

    return {
      message: `Account ${id} has been deleted successfully.`,
      result,
    }
  }

  return {
    message: `Account ${id} was not deleted because it does not exist.`,
    result,
  }
}
