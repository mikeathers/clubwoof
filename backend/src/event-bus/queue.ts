import {Construct} from 'constructs'
import {IQueue, Queue} from 'aws-cdk-lib/aws-sqs'
import {Duration} from 'aws-cdk-lib'
import CONFIG from '../config'
import {DeploymentEnvironment} from '../types'

interface EventQueueProps {
  deploymentEnvironment: DeploymentEnvironment
}

export class EventQueue extends Construct {
  public eventQueue: IQueue
  constructor(scope: Construct, id: string, props: EventQueueProps) {
    super(scope, id)
    const {deploymentEnvironment} = props

    const queueName = `${CONFIG.STACK_PREFIX}EventsQueue-${deploymentEnvironment}`

    this.eventQueue = new Queue(scope, queueName, {
      queueName,
      visibilityTimeout: Duration.seconds(30),
    })
  }
}
