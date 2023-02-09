import {EventBridge} from 'aws-sdk'
import {CreateAccountRequest, UpdateAccountRequest} from '../../../types'

const ebClient = new EventBridge()

const updateIdToAccountId = (
  event: CreateAccountRequest | UpdateAccountRequest | DeleteAccountEventProps,
) => {
  const accountId = event.id
  const {id, ...rest} = event
  const updatedEvent = {
    ...rest,
    accountId,
  }
  return updatedEvent
}

export const publishCreateAccountEvent = async (requestDetails: CreateAccountRequest) => {
  const updatedEvent = updateIdToAccountId(requestDetails)
  const params = {
    Entries: [
      {
        Source: 'Account',
        Detail: JSON.stringify(updatedEvent),
        DetailType: 'Create',
        Time: new Date(),
        EventBusName: process.env.EVENT_BUS_NAME,
      },
    ],
  }

  await ebClient.putEvents(params).promise()
}

export const publishUpdateAccountEvent = async (requestDetails: UpdateAccountRequest) => {
  const updatedEvent = updateIdToAccountId(requestDetails)
  const params = {
    Entries: [
      {
        Source: 'Account',
        Detail: JSON.stringify(updatedEvent),
        DetailType: 'Update',
        Time: new Date(),
        EventBusName: process.env.EVENT_BUS_NAME,
      },
    ],
  }

  await ebClient.putEvents(params).promise()
}

interface DeleteAccountEventProps {
  id: string
  userWhoDeletedAccountId: string
}

export const publishDeleteAccountEvent = async (
  requestDetails: DeleteAccountEventProps,
) => {
  const updatedEvent = updateIdToAccountId(requestDetails)
  const params = {
    Entries: [
      {
        Source: 'Account',
        Detail: JSON.stringify(updatedEvent),
        DetailType: 'Delete',
        Time: new Date(),
        EventBusName: process.env.EVENT_BUS_NAME,
      },
    ],
  }

  await ebClient.putEvents(params).promise()
}
