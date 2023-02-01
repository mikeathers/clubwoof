import {Construct} from 'constructs'
import {NodejsFunction, NodejsFunctionProps} from 'aws-cdk-lib/aws-lambda-nodejs'
import {ITable} from 'aws-cdk-lib/aws-dynamodb'
import {LayerVersion, Runtime} from 'aws-cdk-lib/aws-lambda'
import {join} from 'path'
import {DeploymentEnvironment} from '../types'

interface HandlersProps {
  usersTable: ITable
  eventsTable: ITable
  deploymentEnvironment: DeploymentEnvironment
  awsSdkLayer: LayerVersion
}

export class Handlers extends Construct {
  public readonly usersHandler: NodejsFunction
  public readonly persistEventsHandler: NodejsFunction
  private readonly deploymentEnvironment: DeploymentEnvironment
  private readonly awsSdkLayer: LayerVersion

  constructor(scope: Construct, id: string, props: HandlersProps) {
    super(scope, id)
    this.awsSdkLayer = props.awsSdkLayer
    this.deploymentEnvironment = props.deploymentEnvironment
    this.usersHandler = this.createUsersHandler(props.usersTable)
    this.persistEventsHandler = this.createPersistEventsHandler(props.eventsTable)
  }

  private createUsersHandler(usersTable: ITable): NodejsFunction {
    const lambdaName = `UsersLambdaFunction-${this.deploymentEnvironment}`

    const handleProps: NodejsFunctionProps = {
      functionName: lambdaName,
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        PRIMARY_KEY: 'id',
        TABLE_NAME: usersTable.tableName,
      },
      runtime: Runtime.NODEJS_14_X,
      layers: [this.awsSdkLayer],
    }

    const usersFunction = new NodejsFunction(this, lambdaName, {
      entry: join(__dirname, '../lambdas/users/index.ts'),
      ...handleProps,
    })

    usersTable.grantReadWriteData(usersFunction)

    return usersFunction
  }

  private createPersistEventsHandler(eventsTable: ITable): NodejsFunction {
    const lambdaName = `PersistEventsLambdaFunction-${this.deploymentEnvironment}`

    const handleProps: NodejsFunctionProps = {
      functionName: lambdaName,
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        PRIMARY_KEY: 'id',
        TABLE_NAME: eventsTable.tableName,
      },
      runtime: Runtime.NODEJS_18_X,
    }

    const usersFunction = new NodejsFunction(this, 'persistEventsLambdaFunction', {
      entry: join(__dirname, '../lambdas/persist-events/index.ts'),
      ...handleProps,
    })

    eventsTable.grantReadWriteData(usersFunction)

    return usersFunction
  }
}
