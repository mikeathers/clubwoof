export type DeploymentEnvironment = 'Dev' | 'Prod'

export type CreateAccountRequest = {
  id: string
  address: string
  postCode: string
  numberOfDogs: number
  authId: string
  comment: string
  numberOfWalksRequired: number
}
