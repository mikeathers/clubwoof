import { Callback, Context, PostConfirmationTriggerEvent } from 'aws-lambda'
import { addUserToGroup } from './add-user-to-group'

export async function main(event: PostConfirmationTriggerEvent, _context: Context, callback: Callback): Promise<void> {
  const { userPoolId, userName: username } = event

  try {
    await addUserToGroup({
      userPoolId,
      username,
      groupName: 'Users',
    })
    return callback(null, event)
  } catch (error: any) {
    return callback(error as Error, event)
  }
}
