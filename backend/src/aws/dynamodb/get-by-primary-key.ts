import {DynamoDB} from 'aws-sdk'
import {AttributeMap} from 'aws-sdk/clients/dynamodb'

interface GetByPrimaryKeyProps {
  queryKey: string
  queryValue: string
  tableName: string
  dbClient: DynamoDB.DocumentClient
}

export const getByPrimaryKey = async (
  props: GetByPrimaryKeyProps,
): Promise<AttributeMap | undefined> => {
  const {queryKey, queryValue, tableName, dbClient} = props
  const queryResponse = await dbClient
    .get({
      TableName: tableName,
      Key: {[queryKey]: queryValue},
    })
    .promise()
  return queryResponse.Item
}
