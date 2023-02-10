import {DynamoDB} from 'aws-sdk'
import {QueryResult} from '../../types'

interface GetAllEventsProps {
  dbClient: DynamoDB.DocumentClient
}

export const getAllEvents = async (props: GetAllEventsProps): Promise<QueryResult> => {
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
