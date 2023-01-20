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
    submitButton: string
    signIn: string
    signInAction: string
    goHome: string
    goHomeAction: string
    terribleError: string
    registrationSuccessful: string
    checkYourEmail: string
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
    thanksForRegistering: string
    fillInYourDetails: string
    weWillBeInTouch: string
  }

  type i18nLoginPage = {
    heading: string
    subHeading: string
    submitButton: string
    forgotYourPassword: string
    forgotYourPasswordAction: string
    signUp: string
    signUpAction: string
    inputs: {
      email: string
      password: string
    }
    validation: {
      email: string
      emailFormat: string
      password: string
    }
  }
}

export {}
