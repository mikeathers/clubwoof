import {useCompleteRegistrationHook} from './use-complete-registration.hook'
import {Layout} from "../../shared";

export const CompleteRegistration: React.FC = () => {
  const {loginSuccessful} = useCompleteRegistrationHook()

  if (loginSuccessful) {
    return (
      <Layout bubbleOnePositioning={} bubbleTwoPositioning={}
    )
  }
  return <div>complete reg</div>
}
