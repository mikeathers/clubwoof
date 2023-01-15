import {useCompleteRegistrationHook} from './use-complete-registration.hook'
import {CompleteRegistrationComponent} from './complete-registration.component'

export const CompleteRegistration = () => {
  const {loginSuccessful} = useCompleteRegistrationHook()

  return <CompleteRegistrationComponent loginSuccessful={loginSuccessful} />
}
