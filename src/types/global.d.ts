declare global {
  interface User {
    email: string
    familyName: string
    givenName: string
    numberOfDogs?: string
    picture?: string
    phoneNumber?: string
    address?: string
    isAdmin?: boolean
  }

  interface CognitoError {
    name: string
    code: string
    message: string
  }
}

export {}
