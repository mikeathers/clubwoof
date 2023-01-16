declare global {
  type User = {
    email: string
    familyName: string
    givenName: string
    numberOfDogs?: string
    picture?: string
    phoneNumber?: string
    address?: string
    isAdmin?: boolean
  }

  type CognitoError = {
    name: string
    code: string
    message: string
  }

  /**** Internationalisation *****/

  type i18nRegisterPage = {
    heading: string
  }
}

export {}
