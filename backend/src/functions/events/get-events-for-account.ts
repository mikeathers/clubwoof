import {DynamoDB} from 'aws-sdk'
import {QueryResult} from '../../types'
import {getByPrimaryKey} from '../../aws'

interface GetEventsForAccountProps {
  id: string
  dbClient: DynamoDB.DocumentClient
}
export const getEventsForAccount = async (
  props: GetEventsForAccountProps,
): Promise<QueryResult> => {
  const {id, dbClient} = props
  const tableName = process.env.TABLE_NAME ?? ''
  const queryKey = 'id'
  const queryValue = id

  const queryResponse = await getByPrimaryKey({
    queryKey,
    queryValue,
    tableName,
    dbClient,
  })

  if (queryResponse.Item) {
    return {
      message: 'Account has been found.',
      result: queryResponse.Item,
    }
  }

  return {
    message: `Account with Id: ${id} does not exist.`,
  }
}
