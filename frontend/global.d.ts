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
    subHeading: string
    submitButtonText: string
    signInQuestion: string
    signInText: string
    goHomeQuestion: string
    goHomeText: string
    terribleError: string
    registrationSuccessfulText: string
    checkYourEmailText: string
    validation: {
      firstName: string
      lastName: string
      email: string
      emailFormat: string
      password: string
      confirmPassword: string
      passwordsDoNotMatch: string
      passwordFormat: string
      passwordTooShort: string
      passwordTooLong: string
    }
    inputs: {
      firstName: string
      lastName: string
      email: string
      password: string
      confirmPassword: string
    }
  }

  type i18nCompleteRegistrationPage = {
    thanksForRegisteringText: string
    fillInYourDetailsText: string
  }
}

export {}
