import {DynamoDB} from 'aws-sdk'
import {QueryResult} from '../../types'

interface DeleteAccountProps {
  id: string
  dbClient: DynamoDB.DocumentClient
}

export const deleteAccount = async (props: DeleteAccountProps): Promise<QueryResult> => {
  const tableName = process.env.TABLE_NAME ?? ''
  const {dbClient, id} = props

  const params = {
    TableName: tableName,
    Key: {id},
  }

  const result = await dbClient.delete(params).promise()
  console.log('RESULT: ', result)
  return {
    message: 'Account updated successfully.',
    result,
  }
}
