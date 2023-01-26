import CustomMessage from './custom-message'
import _ from 'lodash'

export const completeSignup = (props: CustomMessage, firstName: string) => {
  return {
    emailSubject: `Confirm your clubwoof account!`,
    emailMessage: `<div style={{height: '100vh'}}>
      <div
        style='display: flex, justifyContent: center, flex-direction: column,
          padding: 16px'       
      >
        <img          
          alt="logo"
          src='https://clubwoof.co.uk/logo.png'
          height="140px"
          width="140px"
        />

        <h1>Hi ${_.startCase(_.camelCase(firstName))} 👋</h1>
        <p>Thanks for signing up!</p>
        <p>Click on the link to activate your account and get started.</p>
        <a href="${props.FRONTEND_LINKS.SEND_CODE_POST_SIGN_UP}">Activate my account!</a>
      </div>
    </div>`,
  }
}
