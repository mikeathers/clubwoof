import CustomMessage from './custom-message'
import _ from 'lodash'
import {colors} from '@clubwoof-styles'

export const completeSignup = (props: CustomMessage, firstName: string) => {
  return {
    emailSubject: `Confirm your clubwoof account! 🐶`,
    emailMessage: `
    <div>
      <div>
        <h1>Hi ${_.startCase(_.camelCase(firstName))} 👋</h1>
        <p>Thanks for signing up!</p>
        <p>Click on the link to activate your account and get started.</p>
        <br />
        <br />
        <a style="border-radius: 6px; text-decoration: none; font-weight: 500; padding: 12px; background-color:${
          colors.lightBlue
        }; color: ${colors.pureWhite} " href="${
      props.FRONTEND_LINKS.SEND_CODE_POST_SIGN_UP
    }">Activate my account!</a>
      </div>
      <br />
      <br />
      <br />
      <br />
       <img          
        alt="logo"
        src='https://clubwoof.co.uk/logo.png'
        height="160"
        width="160"
      />
    </div>`,
  }
}

export const resendRegistrationLink = (props: CustomMessage, firstName: string) => {
  return {
    emailSubject: `Your new link! 🐶`,
    emailMessage: `
    <div>
      <div>
        <h1>Hi ${_.startCase(_.camelCase(firstName))} 👋</h1>
        <p>It looks like something went wrong!</p>
        <p>We've got you a new link to use to activate your account.</p>
        <br />
        <br />
        <a style="border-radius: 6px; text-decoration: none; font-weight: 500; padding: 12px; background-color:${
          colors.lightBlue
        }; color: ${colors.pureWhite} " href="${
      props.FRONTEND_LINKS.RESEND_CONFIRMATION_CODE
    }">Activate my account!</a>
      </div>
      <br />
      <br />
      <br />
      <br />
       <img          
        alt="logo"
        src='https://clubwoof.co.uk/logo.png'
        height="160"
        width="160"
      />
    </div>`,
  }
}
