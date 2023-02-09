import {DynamoDB} from 'aws-sdk'
import {QueryResult} from '../../types'

interface GetAllUsersProps {
  dbClient: DynamoDB.DocumentClient
}

export const getAllAccounts = async (props: GetAllUsersProps): Promise<QueryResult> => {
  const {dbClient} = props
  const queryResponse = await dbClient
    .scan({
      TableName: process.env.TABLE_NAME ?? '',
    })
    .promise()
  return {
    result: queryResponse.Items,
  }
}
