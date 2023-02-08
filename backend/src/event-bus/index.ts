import {Construct} from 'constructs'
import {CfnEventBusPolicy, EventBus, IEventBus, Rule} from 'aws-cdk-lib/aws-events'
import {DeploymentEnvironment} from '../types'
import CONFIG from '../config'

interface EventsProps {
  deploymentEnvironment: DeploymentEnvironment
  account: string
}

export class EventBridge extends Construct {
  public eventBus: IEventBus
  public eventRule: Rule

  constructor(scope: Construct, id: string, props: EventsProps) {
    super(scope, id)
    const {account, deploymentEnvironment} = props
    const eventBusName = `${CONFIG.STACK_PREFIX}EventBus-${deploymentEnvironment}`

    this.eventBus = new EventBus(scope, eventBusName, {
      eventBusName,
    })

    new CfnEventBusPolicy(this, 'EventBusResourcePolicy', {
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

    this.eventRule = new Rule(this, 'EventRule', {
      eventBus: this.eventBus,
      eventPattern: {
        source: ['Account'],
        detailType: ['Account'],
      },
    })
  }
}
