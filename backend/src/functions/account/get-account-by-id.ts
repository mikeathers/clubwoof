import {DynamoDB} from 'aws-sdk'

interface GetAccountByIdProps {
  id: string
  dbClient: DynamoDB.DocumentClient
}
export const getAccountById = async (props: GetAccountByIdProps) => {
  const {id, dbClient} = props
  try {
    const TableName = process.env.TABLE_NAME
    const Key = 'id'
    const Value = id

    const queryResponse = await dbClient
      .query({
        TableName: TableName ?? '',
        IndexName: Key,
        KeyConditionExpression: '#zz = :zzzz',
        ExpressionAttributeNames: {
          '#zz': Key,
        },
        ExpressionAttributeValues: {
          ':zzzz': Value,
        },
      })
      .promise()
    return JSON.stringify(queryResponse.Items)
  } catch (err) {
    console.log(err)
    throw err
  }
}
