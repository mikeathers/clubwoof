export type DeploymentEnvironment = 'dev' | 'prod'

export type CreateUserRequest = {
  id: string
  address: string
  postCode: string
  numberOfDogs: number
  authId: string
  comment: string
  numberOfWalksRequired: number
}
