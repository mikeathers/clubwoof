import {AWSError, DynamoDB} from 'aws-sdk'
import {PromiseResult} from 'aws-sdk/lib/request'

interface GetByPrimaryKeyProps {
  queryKey: string
  queryValue: string
  tableName: string
  dbClient: DynamoDB.DocumentClient
}

export const getByPrimaryKey = async (
  props: GetByPrimaryKeyProps,
): Promise<PromiseResult<DynamoDB.DocumentClient.GetItemOutput, AWSError>> => {
  const {queryKey, queryValue, tableName, dbClient} = props
  const queryResponse = await dbClient
    .get({
      TableName: tableName,
      Key: {[queryKey]: queryValue},
    })
    .promise()
  return queryResponse
}
