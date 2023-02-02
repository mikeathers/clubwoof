import {DynamoDB} from 'aws-sdk'

interface GetAllUsersProps {
  dbClient: DynamoDB.DocumentClient
}

export const getAllUsers = async (props: GetAllUsersProps) => {
  const {dbClient} = props
  const queryResponse = await dbClient
    .scan({
      TableName: process.env.TABLE_NAME ?? '',
    })
    .promise()
  return JSON.stringify(queryResponse.Items)
}
