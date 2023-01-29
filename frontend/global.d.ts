import {FieldValues} from 'react-hook-form'

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

  interface FormDetails extends FieldValues {
    email?: string
    password?: string
    firstName?: string
    lastName?: string
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

  type i18nResendRegistrationLinkPage = {
    heading: string
    subHeading: string
    submitButton: string
    successMessage: string
    inputs: {
      email: string
    }
    validation: {
      email: string
      emailFormat: string
    }
  }

  type i18nForgotPasswordPage = {
    heading: string
    subHeading: string
    submitButton: string
    successMessage: string
    login: string
    loginAction: string
    inputs: {
      email: string
    }
    validation: {
      email: string
      emailFormat: string
    }
  }

  type i18nCompleteForgotPasswordPage = {
    heading: string
    subHeading: string
    submitButton: string
    inputs: {
      password: string
      confirmPassword: string
    }
    validation: {
      password: string
      confirmPassword: string
      passwordsDoNotMatch: string
      passwordFormat: string
      passwordTooShort: string
      passwordTooLong: string
    }
  }

  type i18nErrorPage = {
    heading: string
    subHeading: string
    goHome: string
  }
}

export {}
