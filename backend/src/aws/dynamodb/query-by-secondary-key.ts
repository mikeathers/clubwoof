import {DynamoDB} from 'aws-sdk'
import {ItemList} from 'aws-sdk/clients/dynamodb'

interface GetByPrimaryKeyProps {
  queryKey: string
  queryValue: string
  tableName: string
  dbClient: DynamoDB.DocumentClient
}

export const queryBySecondaryKey = async (
  props: GetByPrimaryKeyProps,
): Promise<ItemList | undefined> => {
  const {queryKey, queryValue, tableName, dbClient} = props
  const params = {
    TableName: tableName,
    IndexName: queryKey,
    KeyConditionExpression: '#zz = :zzzz',
    ExpressionAttributeNames: {
      '#zz': queryKey,
    },
    ExpressionAttributeValues: {
      ':zzzz': queryValue,
    },
  }
  const queryResponse = await dbClient.query(params).promise()
  return queryResponse.Items
}
