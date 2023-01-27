import {completeSignup, resendRegistrationLink} from './email-messages'

export type CustomMessageReturnValue = {
  emailSubject: string
  emailMessage: string
}

export type CustomMessageProps = {
  codeParameter: string
  userAttributes: {
    // eslint-disable-next-line camelcase
    given_name: string
    // eslint-disable-next-line camelcase
    family_name: string
    email: string
  }
  usernameParameter: string
}

class CustomMessage {
  FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL
  FRONTEND_LINKS: {
    SEND_CODE_POST_SIGN_UP: string
    SEND_CODE_FORGOT_PASSWORD: string
    SEND_CODE_VERIFY_NEW_EMAIL: string
    SEND_TEMPORARY_PASSWORD: string
    RESEND_CONFIRMATION_CODE: string
  }

  private userAttributes: {
    // eslint-disable-next-line camelcase
    given_name: string
    // eslint-disable-next-line camelcase
    family_name: string
    email: string
  }

  private readonly codeParameter: string
  private usernameParameter: string

  constructor(props: CustomMessageProps) {
    this.userAttributes = props.userAttributes
    this.codeParameter = props.codeParameter
    this.usernameParameter = props.usernameParameter

    this.FRONTEND_LINKS = {
      SEND_CODE_POST_SIGN_UP: `${this.FRONTEND_BASE_URL}/auth/complete-registration?code=${this.codeParameter}&email=${this.userAttributes.email}`,
      SEND_CODE_FORGOT_PASSWORD: `${this.FRONTEND_BASE_URL}/auth/complete-forgot-password?code=${this.codeParameter}&email=${this.userAttributes.email}`,
      SEND_CODE_VERIFY_NEW_EMAIL: `${this.FRONTEND_BASE_URL}/auth/complete-forgot-password?code=${this.codeParameter}&email=${this.userAttributes.email}`,
      SEND_TEMPORARY_PASSWORD: `${this.FRONTEND_BASE_URL}/auth/login`,
      RESEND_CONFIRMATION_CODE: `${this.FRONTEND_BASE_URL}/auth/complete-registration?code=${this.codeParameter}&email=${this.userAttributes.email}`,
    }
  }

  sendCodePostSignUp(): CustomMessageReturnValue {
    return {...completeSignup(this, this.userAttributes.given_name)}
  }

  sendCodeForgotPassword(): CustomMessageReturnValue {
    return {
      emailSubject: `Reset your password for ${
        this.FRONTEND_BASE_URL
      } | ${new Date().toLocaleString()}`,
      emailMessage: `Hi <b>${this.userAttributes.given_name} ${this.userAttributes.family_name}</b>!
      
      <br />
      Please click on the link to update your password: <a href="${this.FRONTEND_LINKS.SEND_CODE_FORGOT_PASSWORD}">${this.FRONTEND_BASE_URL}</a>.
      `,
    }
  }

  sendCodeVerifyNewEmail(): CustomMessageReturnValue {
    return {
      emailSubject: `Validate your new email for ${
        this.FRONTEND_BASE_URL
      } | ${new Date().toLocaleString()}`,
      emailMessage: `Hi <b>${this.userAttributes.given_name} ${this.userAttributes.family_name}</b>!
      <br />
      
      Please click on the link to update your email address: <a href="${this.FRONTEND_LINKS.SEND_CODE_VERIFY_NEW_EMAIL}">${this.FRONTEND_BASE_URL}</a>.
      `,
    }
  }

  sendTemporaryPassword(): CustomMessageReturnValue {
    return {
      emailSubject: `Your account for ${
        this.FRONTEND_BASE_URL
      } | ${new Date().toLocaleString()}`,
      emailMessage: `Hi User!<br>An administrator has created your credentials for ${this.FRONTEND_BASE_URL}.<br>Your username is <b>${this.usernameParameter}</b> and your temporary password is <b>${this.codeParameter}</b><br>You can paste them in the form at <a href="${this.FRONTEND_LINKS.SEND_TEMPORARY_PASSWORD}">${this.FRONTEND_BASE_URL}</a> in order to log in.`,
    }
  }

  resendConfirmationCode(): CustomMessageReturnValue {
    return {
      ...resendRegistrationLink(this, this.userAttributes.given_name),
    }
  }
}

export default CustomMessage
