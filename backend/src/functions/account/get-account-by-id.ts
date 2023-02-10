import {DynamoDB} from 'aws-sdk'
import {QueryResult} from '../../types'
import {getByPrimaryKey} from '../../aws'

interface GetAccountByIdProps {
  id: string
  dbClient: DynamoDB.DocumentClient
}
export const getAccountById = async (
  props: GetAccountByIdProps,
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

  if (queryResponse && queryResponse.Item) {
    return {
      message: 'Account has been found.',
      result: queryResponse.Item,
    }
  }

  return {
    message: `Account with Id: ${id} does not exist.`,
  }
}
