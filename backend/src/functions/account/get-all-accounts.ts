import {DynamoDB} from 'aws-sdk'
import {HttpStatusCode, QueryResult} from '../../types'

interface GetAllAccountsProps {
  dbClient: DynamoDB.DocumentClient
}

export const getAllAccounts = async (
  props: GetAllAccountsProps,
): Promise<QueryResult> => {
  const {dbClient} = props
  console.log('DBCLIENT: ', dbClient)
  const queryResponse = await dbClient
    .scan({
      TableName: process.env.TABLE_NAME ?? '',
    })
    .promise()

  return {
    body: {
      result: queryResponse.Items,
    },
    statusCode: HttpStatusCode.OK,
  }
}
