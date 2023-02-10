import {Construct} from 'constructs'
import * as events from 'aws-cdk-lib/aws-events'
import {DeploymentEnvironment} from '../types'
import CONFIG from '../config'

interface EventsProps {
  stage: DeploymentEnvironment
  account: string
}

export class EventBus extends Construct {
  public eventBus: events.IEventBus
  public eventRule: events.Rule

  constructor(scope: Construct, id: string, props: EventsProps) {
    super(scope, id)
    const {account, stage} = props
    const eventBusName = `${CONFIG.STACK_PREFIX}EventBus-${stage}`

    this.eventBus = new events.EventBus(scope, eventBusName, {
      eventBusName,
    })

    new events.CfnEventBusPolicy(this, 'EventBusResourcePolicy', {
      statementId: 'CustomerSubscriptionSid',
      eventBusName: this.eventBus.eventBusName,
      statement: {
        Effect: 'Allow',
        Action: ['events:PutEvents'],
        Principal: {
          AWS: account,
        },
        Resource: this.eventBus.eventBusArn,
      },
    })

    this.eventRule = new events.Rule(this, 'EventRule', {
      eventBus: this.eventBus,
      eventPattern: {
        source: ['Account'],
        detailType: ['Create', 'Update', 'Delete'],
      },
    })
  }
}
