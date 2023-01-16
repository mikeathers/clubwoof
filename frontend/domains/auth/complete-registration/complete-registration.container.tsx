import {useCompleteRegistrationHook} from './use-complete-registration.hook'
import {CompleteRegistrationComponent} from './complete-registration.component'

export const CompleteRegistration: React.FC = () => {
  const {loginSuccessful} = useCompleteRegistrationHook()

  return <CompleteRegistrationComponent loginSuccessful={loginSuccessful} />
}
