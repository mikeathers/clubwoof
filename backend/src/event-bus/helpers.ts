import {Construct} from 'constructs'
import {EventBus, IEventBus} from 'aws-cdk-lib/aws-events'
import {IQueue, Queue} from 'aws-cdk-lib/aws-sqs'

interface EventBusProps {
  scope: Construct
  region: string
  account: string
  eventBusName: string
}

export const getEventBusByName = (props: EventBusProps): IEventBus => {
  const {scope, region, account, eventBusName} = props
  return EventBus.fromEventBusArn(
    scope,
    `${eventBusName}-${region}-${account}`,
    `arn:aws:events:${region}:${account}:event-bus/${eventBusName}`,
  )
}

interface QueueProps {
  scope: Construct
  region: string
  account: string
  queueName: string
}

export const getQueueByName = (props: QueueProps): IQueue => {
  const {scope, region, account, queueName} = props
  return Queue.fromQueueArn(
    scope,
    `${queueName}-${region}-${account}`,
    `arn:aws:sqs:${region}:${account}:${queueName}`,
  )
}
