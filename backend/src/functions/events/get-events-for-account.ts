import {DynamoDB} from 'aws-sdk'
import {QueryResult} from '../../types'
import {queryBySecondaryKey} from '../../aws'

interface GetEventsForAccountProps {
  id: string
  dbClient: DynamoDB.DocumentClient
}
export const getEventsForAccount = async (
  props: GetEventsForAccountProps,
): Promise<QueryResult> => {
  const {id, dbClient} = props
  const tableName = process.env.TABLE_NAME ?? ''
  const queryKey = 'accountId'
  const queryValue = id

  const queryResponse = await queryBySecondaryKey({
    queryKey,
    queryValue,
    tableName,
    dbClient,
  })

  if (queryResponse && queryResponse.length > 0) {
    return {
      message: 'Events have been found.',
      result: queryResponse,
    }
  }

  return {
    message: `No events for account with id: ${id} exist.`,
  }
}
