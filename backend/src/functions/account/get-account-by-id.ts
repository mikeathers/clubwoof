import {DynamoDB} from 'aws-sdk'
import {HttpStatusCode, QueryResult} from '../../types'
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
      body: {
        message: 'Account has been found.',
        result: queryResponse.Item,
      },
      statusCode: HttpStatusCode.OK,
    }
  }

  return {
    body: {
      message: `Account with Id: ${id} does not exist.`,
    },
    statusCode: HttpStatusCode.BAD_REQUEST,
  }
}
