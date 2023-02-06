import {DynamoDB} from 'aws-sdk'

interface GetAccountByIdProps {
  id: string
  dbClient: DynamoDB.DocumentClient
}
export const getAccountById = async (props: GetAccountByIdProps) => {
  const {id, dbClient} = props
  try {
    const TableName = process.env.TABLE_NAME
    const Key = id

    const queryResponse = await dbClient
      .query({
        TableName: TableName ?? '',
        IndexName: Key,
        KeyConditionExpression: '#zz = :zzzz',
        ExpressionAttributeNames: {
          '#zz': process.env.PRIMARY_KEY ?? '',
        },
        ExpressionAttributeValues: {
          ':zzzz': Key,
        },
      })
      .promise()
    return JSON.stringify(queryResponse.Items)
  } catch (err) {
    console.log(err)
    throw err
  }
}
