import {Construct} from 'constructs'
import {IQueue, Queue} from 'aws-cdk-lib/aws-sqs'
import {Duration, RemovalPolicy} from 'aws-cdk-lib'
import CONFIG from '../config'
import {DeploymentEnvironment} from '../types'

interface EventQueueProps {
  stage: DeploymentEnvironment
}

export class EventQueue extends Construct {
  public eventQueue: IQueue
  public deadLetterQueue: IQueue

  constructor(scope: Construct, id: string, props: EventQueueProps) {
    super(scope, id)
    const {stage} = props

    const queueName = `${CONFIG.STACK_PREFIX}EventsQueue-${stage}`
    const deadLetterQueueName = `${CONFIG.STACK_PREFIX}DeadLetterQueue-${stage}`

    this.deadLetterQueue = new Queue(scope, deadLetterQueueName, {
      retentionPeriod: Duration.days(14),
      removalPolicy: RemovalPolicy.DESTROY,
    })

    this.eventQueue = new Queue(scope, queueName, {
      queueName,
      visibilityTimeout: Duration.seconds(30),
      deadLetterQueue: {
        queue: this.deadLetterQueue,
        maxReceiveCount: 100,
      },
    })
  }
}
