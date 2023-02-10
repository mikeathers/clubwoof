import {DynamoDB} from 'aws-sdk'
import {QueryResult} from '../../types'

interface GetAllAccountsProps {
  dbClient: DynamoDB.DocumentClient
}

export const getAllAccounts = async (
  props: GetAllAccountsProps,
): Promise<QueryResult> => {
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
