import {EventBridge} from 'aws-sdk'
import {CreateAccountRequest, UpdateAccountRequest} from '../../../types'

const ebClient = new EventBridge()

export const publishCreateAccountEvent = async (requestDetails: CreateAccountRequest) => {
  const params = {
    Entries: [
      {
        Source: 'Account',
        Detail: JSON.stringify(requestDetails),
        DetailType: 'Create',
        Time: new Date(),
        EventBusName: process.env.EVENT_BUS_NAME,
      },
    ],
  }
  await ebClient.putEvents(params).promise()
}

export const publishUpdateAccountEvent = async (requestDetails: UpdateAccountRequest) => {
  const params = {
    Entries: [
      {
        Source: 'Account',
        Detail: JSON.stringify(requestDetails),
        DetailType: 'Update',
        Time: new Date(),
        EventBusName: process.env.EVENT_BUS_NAME,
      },
    ],
  }

  await ebClient.putEvents(params).promise()
}

interface DeleteAccountEventProps {
  idOfDeletedAccount: string
  idOFUserWhoTriggerEvent: string
}

export const publishDeleteAccountEvent = async (
  requestDetails: DeleteAccountEventProps,
) => {
  const params = {
    Entries: [
      {
        Source: 'Account',
        Detail: JSON.stringify(requestDetails),
        DetailType: 'Delete',
        Time: new Date(),
        EventBusName: process.env.EVENT_BUS_NAME,
      },
    ],
  }

  await ebClient.putEvents(params).promise()
}
