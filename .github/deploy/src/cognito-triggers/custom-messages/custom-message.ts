type CustomMessageReturnValue = {
  emailSubject: string
  emailMessage: string
}

type CustomMessageProps = {
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
      SEND_CODE_FORGOT_PASSWORD: `${this.FRONTEND_BASE_URL}/auth/complete-password-reset?code=${this.codeParameter}&email=${this.userAttributes.email}`,
      SEND_CODE_VERIFY_NEW_EMAIL: `${this.FRONTEND_BASE_URL}/auth/complete-password-reset?code=${this.codeParameter}&email=${this.userAttributes.email}`,
      SEND_TEMPORARY_PASSWORD: `${this.FRONTEND_BASE_URL}/auth/login`,
      RESEND_CONFIRMATION_CODE: `${this.FRONTEND_BASE_URL}/auth/complete-registration?code=${this.codeParameter}&email=${this.userAttributes.email}`,
    }
  }

  sendCodePostSignUp(): CustomMessageReturnValue {
    return {
      emailSubject: `Validate your account for ${this.FRONTEND_BASE_URL} | ${new Date().toLocaleString()}`,
      emailMessage: `Hi <b>${this.userAttributes.given_name} ${this.userAttributes.family_name}</b>!<br>Thank you for signing up.
      <br />
      Please click on the link to activate your account: <a href="${this.FRONTEND_LINKS.SEND_CODE_POST_SIGN_UP}">${this.FRONTEND_BASE_URL}</a>.
      `,
    }
  }
}

export default CustomMessage
